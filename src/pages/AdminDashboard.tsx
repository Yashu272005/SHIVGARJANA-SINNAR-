import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Calendar, CalendarDays, CalendarRange, Search, Trash2,
  FileSpreadsheet, FileText, LogOut, Image as ImageIcon, Video, Mail, Upload, X, Check, XCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { translations as t } from '../lib/translations';
import { exportExcel, exportPDF } from '../lib/exportUtils';
import { getMediaType, parseVideoUrl } from '../lib/exportUtils';
import { supabase, GALLERY_BUCKET } from '../lib/supabaseClient';
import type { GalleryImage } from '../lib/types';

type Tab = 'members' | 'gallery' | 'messages';
type MediaType = 'image' | 'video';


function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const EARLIEST_YEAR = 2022;


function getItemYear(item: { date?: unknown; createdAt?: unknown; year?: unknown } | null | undefined): number | null {
  if (!item) return null;

  if (typeof item.year === 'number' && !Number.isNaN(item.year)) return item.year;

  const raw = item.date ?? item.createdAt;
  if (!raw) return null;
  if (raw instanceof Date) return raw.getFullYear();
  if (typeof raw === 'number') return raw;
  if (typeof raw !== 'string') return null;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getFullYear();
}

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { members, deleteMember, updateMemberStatus, stats, gallery, addGalleryImage, deleteGalleryImage, messages, deleteMessage } = useData();
  const [tab, setTab] = useState<Tab>('members');
  const [search, setSearch] = useState('');

  // Gallery upload form
  const [imgUrl, setImgUrl] = useState('');
  const [imgTitle, setImgTitle] = useState('');
  const [imgCategory, setImgCategory] = useState<GalleryImage['category']>('festival');

  const [imgDate, setImgDate] = useState(todayISO());

  const [imgFiles, setImgFiles] = useState<File[]>([]);          // actual files to upload
  const [imgFilePreviews, setImgFilePreviews] = useState<string[]>([]); // base64 previews only
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [uploading, setUploading] = useState(false);
  const [uploadSeconds, setUploadSeconds] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);


  const galleryByYear = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const fromData = gallery
      .map((g) => getItemYear(g as any))
      .filter((y): y is number => y !== null && y >= EARLIEST_YEAR);
    const maxYear = Math.max(currentYear, ...(fromData.length ? fromData : [currentYear]));

    const buckets: { year: number; items: GalleryImage[] }[] = [];
    for (let y = maxYear; y >= EARLIEST_YEAR; y--) {
      buckets.push({ year: y, items: gallery.filter((g) => getItemYear(g as any) === y) });
    }
    return buckets;
  }, [gallery]);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search)
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Supabase Storage's default limit is 50MB per file (raise it in
  // Supabase Dashboard -> Storage -> gallery-media -> settings if needed).
  const MAX_FILE_SIZE_MB = 50;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const oversized: string[] = [];

    for (const file of files) {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_FILE_SIZE_MB) {
        oversized.push(`${file.name} (${sizeMB.toFixed(1)}MB)`);
        continue;
      }
      validFiles.push(file);
      if (sizeMB > 10) {
        // Rough heads-up: at typical home upload speeds (1-5 Mbps), a file
        // this size can realistically take 1-3+ minutes to finish uploading.
        console.info(`Selected file is ${sizeMB.toFixed(1)}MB — upload may take a while depending on your internet speed.`);
      }
    }

    if (oversized.length > 0) {
      alert(
        `These files are over the ${MAX_FILE_SIZE_MB}MB limit and were skipped:\n\n${oversized.join('\n')}\n\n` +
        `Either raise the limit in Supabase (Storage settings), or use a ` +
        `YouTube/Instagram/Vimeo/Drive link in the Video URL field instead.`
      );
    }

    if (validFiles.length === 0) {
      e.target.value = '';
      return;
    }


    const firstIsVideo = validFiles[0].type.startsWith('video/');
    const filesToUse = firstIsVideo ? [validFiles[0]] : validFiles;
    setMediaType(firstIsVideo ? 'video' : 'image');
    setImgFiles(filesToUse);

    Promise.all(
      filesToUse.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      )
    ).then(setImgFilePreviews);
  };

  const removeSelectedFile = (index: number) => {
    setImgFiles((prev) => prev.filter((_, i) => i !== index));
    setImgFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgTitle) {
      alert('Please enter a title.');
      return;
    }
    if (imgFiles.length === 0 && !imgUrl) {
      alert('Please choose one or more files to upload, or paste a URL.');
      return;
    }
    if (!imgDate) {
      alert('Please pick the date this photo/video is from.');
      return;
    }


    if (imgFiles.length > 0) {
      setUploading(true);
      setUploadSeconds(0);
      setUploadProgress({ done: 0, total: imgFiles.length });
      const timer = setInterval(() => setUploadSeconds((s) => s + 1), 1000);

      const failures: string[] = [];

      for (let i = 0; i < imgFiles.length; i++) {
        const file = imgFiles[i];
        const ext = file.name.split('.').pop() || (mediaType === 'video' ? 'mp4' : 'jpg');
        const path = `${mediaType}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(path, file, { cacheControl: '3600', upsert: false });

        if (uploadError) {
          failures.push(`${file.name}: ${uploadError.message}`);
          setUploadProgress({ done: i + 1, total: imgFiles.length });
          continue;
        }

        const { data: publicUrlData } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);
        const title = imgFiles.length > 1 ? `${imgTitle} (${i + 1})` : imgTitle;

        const result = await addGalleryImage({
          url: publicUrlData.publicUrl,
          title,
          category: imgCategory,
          mediaType,
          date: imgDate,
        });

        if (!result.success) {
          failures.push(`${file.name}: ${result.error ?? 'Unknown error'}`);
        }

        setUploadProgress({ done: i + 1, total: imgFiles.length });
      }

      clearInterval(timer);
      setUploading(false);
      setUploadProgress(null);

      if (failures.length > 0) {
        alert(
          `${imgFiles.length - failures.length} of ${imgFiles.length} saved successfully.\n\n` +
          `Failed:\n${failures.join('\n')}`
        );
        // Don't clear the form on partial failure — let the admin retry the rest.
        return;
      }
    } else {
      // Case 2: no local file — a pasted URL only, saved as a single item.
      const result = await addGalleryImage({
        url: imgUrl.trim(),
        title: imgTitle,
        category: imgCategory,
        mediaType,
        date: imgDate,
      });
      if (!result.success) {
        alert('Could not save this item to the database:\n\n' + (result.error ?? 'Unknown error'));
        return;
      }
    }

    setImgUrl(''); setImgTitle(''); setImgFiles([]); setImgFilePreviews([]); setMediaType('image'); setImgDate(todayISO());
    (e.target as HTMLFormElement).reset();
  };

  const statCards = [
    { icon: Users, label: t.admin.totalMembers[lang], value: stats.totalMembers, color: 'from-blue-500 to-indigo-600' },
    { icon: Calendar, label: t.admin.todayJoin[lang], value: stats.todayJoining, color: 'from-emerald-500 to-teal-600' },
    { icon: CalendarDays, label: t.admin.weeklyJoin[lang], value: stats.weeklyJoining, color: 'from-amber-500 to-orange-600' },
    { icon: CalendarRange, label: t.admin.monthlyJoin[lang], value: stats.monthlyJoining, color: 'from-rose-500 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
              <Users size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{t.admin.dashboard[lang]}</h1>
              <p className="text-xs text-gray-500">Shivgarjana Mitra Mandal</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <LogOut size={16} /> {t.admin.logout[lang]}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg`}>
              <div className="flex items-center justify-between mb-2">
                <stat.icon size={24} className="opacity-80" />
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([
            { key: 'members', label: t.admin.memberList[lang], icon: Users },
            { key: 'gallery', label: t.admin.galleryMgmt[lang], icon: ImageIcon },
            { key: 'messages', label: `${t.admin.messages[lang]} (${messages.filter(m => !m.read).length})`, icon: Mail },
          ] as { key: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[]).map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === tb.key ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-orange-50'
                }`}
            >
              <tb.icon size={16} /> {tb.label}
            </button>
          ))}
        </div>

        {/* Members Tab */}
        {tab === 'members' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.admin.searchMember[lang]}
                  className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>
              <button
                onClick={() => exportExcel(filteredMembers)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
              >
                <FileSpreadsheet size={18} /> {t.admin.exportExcel[lang]}
              </button>
              <button
                onClick={() => exportPDF(filteredMembers)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                <FileText size={18} /> {t.admin.exportPdf[lang]}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">#</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">{t.admin.name[lang]}</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">{t.admin.phone[lang]}</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">{t.admin.date[lang]}</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">{t.admin.status[lang]}</th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">{t.admin.actions[lang]}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-8 text-gray-400">{t.admin.noMembers[lang]}</td></tr>
                  ) : (
                    filteredMembers.map((m, i) => (
                      <tr key={m._id} className="border-b border-gray-100 hover:bg-orange-50/50">
                        <td className="py-3 px-2 text-sm text-gray-500">{i + 1}</td>
                        <td className="py-3 px-2 text-sm font-medium text-gray-800">{m.name}</td>
                        <td className="py-3 px-2 text-sm text-gray-600">{m.phone}</td>
                        <td className="py-3 px-2 text-sm text-gray-500">{new Date(m.createdAt).toLocaleDateString('en-IN')}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${m.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                            m.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1.5">
                            {m.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateMemberStatus(m._id, 'approved')}
                                  title={t.admin.approve[lang]}
                                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-xs font-medium"
                                >
                                  <Check size={14} /> {t.admin.approve[lang]}
                                </button>
                                <button
                                  onClick={() => updateMemberStatus(m._id, 'rejected')}
                                  title={t.admin.reject[lang]}
                                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors text-xs font-medium"
                                >
                                  <XCircle size={14} /> {t.admin.reject[lang]}
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => deleteMember(m._id)}
                              title={t.admin.delete[lang]}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {tab === 'gallery' && (
          <div className="space-y-6">
            {/* Upload form */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Upload size={20} /> {t.admin.uploadImage[lang]}
              </h3>

              {/* Media type toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setMediaType('image')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mediaType === 'image' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <ImageIcon size={16} /> Image
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType('video')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mediaType === 'video' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Video size={16} /> Video
                </button>
              </div>

              <form onSubmit={handleAddImage} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.admin.imageTitle[lang]}</label>
                  <input
                    type="text"
                    value={imgTitle}
                    onChange={(e) => setImgTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{t.admin.category[lang]}</label>
                  <select
                    value={imgCategory}
                    onChange={(e) => setImgCategory(e.target.value as GalleryImage['category'])}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  >
                    <option value="festival">{t.gallery.festival[lang]}</option>
                    <option value="blood">{t.gallery.blood[lang]}</option>
                    <option value="health">{t.gallery.health[lang]}</option>
                    <option value="cleaning">{t.gallery.cleaning[lang]}</option>
                    <option value="events">{t.gallery.events[lang]}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {lang === 'mr' ? 'फोटो/व्हिडिओची तारीख' : 'Photo/Video Date'}
                  </label>
                  <input
                    type="date"
                    value={imgDate}
                    onChange={(e) => setImgDate(e.target.value)}
                    max={todayISO()}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    {lang === 'mr'
                      ? 'हा प्रसंग प्रत्यक्षात कधी घडला ती तारीख निवडा (अपलोडची तारीख नाही).'
                      : "Pick when this actually happened, not today's upload date."}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {mediaType === 'video' ? 'Video URL' : 'Image URL'}
                  </label>
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    placeholder={mediaType === 'video' ? 'YouTube, Instagram Reel, Vimeo, Drive, or /videos/x.mp4' : '/images/...'}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  />
                  {mediaType === 'video' && (
                    <p className="mt-1 text-xs text-gray-400">
                      Paste a YouTube/Instagram Reel/Vimeo link, a Google Drive "Anyone with the link" share link, or a direct .mp4 link.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Upload {mediaType === 'video' ? 'Video' : 'Photos'} (max {MAX_FILE_SIZE_MB}MB each)
                  </label>
                  <input
                    type="file"
                    accept={mediaType === 'video' ? 'video/*' : 'image/*'}
                    multiple={mediaType === 'image'}
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  />
                  {mediaType === 'image' && (
                    <p className="mt-1 text-xs text-gray-400">
                      Select multiple photos at once — each will be saved as its own gallery item with the same title, category, and date.
                    </p>
                  )}
                  {mediaType === 'video' && (
                    <p className="mt-1 text-xs text-gray-400">
                      Large videos won't fit — use the Video URL field instead for anything over {MAX_FILE_SIZE_MB}MB.
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2 lg:col-span-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {uploading
                      ? uploadProgress
                        ? `Uploading ${uploadProgress.done}/${uploadProgress.total}... ${uploadSeconds}s`
                        : `Uploading... ${uploadSeconds}s`
                      : t.admin.addImage[lang]}
                  </button>
                </div>
              </form>
              {imgFilePreviews.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {imgFilePreviews.map((preview, i) => (
                    <div key={i} className="inline-block relative">
                      {mediaType === 'video' ? (
                        <video src={preview} className="h-20 rounded-lg" muted controls />
                      ) : (
                        <img src={preview} alt={`Preview ${i + 1}`} className="h-20 rounded-lg" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeSelectedFile(i)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Live preview of a pasted video URL, so you can confirm it
                  actually plays before saving it to the gallery. */}
              {imgFilePreviews.length === 0 && mediaType === 'video' && imgUrl && (() => {
                const preview = parseVideoUrl(imgUrl);
                return (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Preview ({preview.platform === 'direct' ? 'direct file link' : preview.platform}):
                    </p>
                    {preview.platform === 'direct' ? (
                      <video src={preview.embedUrl} className="h-32 rounded-lg" muted controls />
                    ) : (
                      <iframe
                        src={preview.embedUrl}
                        className="w-64 h-36 rounded-lg border border-gray-200"
                        allow="autoplay; encrypted-media; fullscreen"
                        title="Video preview"
                      />
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Gallery grid, organized by year (same grouping as the public page) */}
            <div className="flex gap-5 overflow-x-auto pb-4">
              {galleryByYear.map(({ year: y, items }) => (
                <div key={y} className="flex-shrink-0 w-56 sm:w-64">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h4 className="text-base font-bold text-gray-800">{y}</h4>
                    <span className="text-xs font-medium text-gray-400">{items.length}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {items.length === 0 ? (
                      <div className="rounded-xl border-2 border-dashed border-gray-200 py-8 text-center text-xs text-gray-400">
                        {lang === 'mr' ? 'काहीही नाही' : 'Nothing yet'}
                      </div>
                    ) : (
                      items.map((img) => {
                        const itemType = getMediaType(img);
                        const videoInfo = itemType === 'video' ? parseVideoUrl(img.url) : null;
                        return (
                          <div key={img._id} className="group relative rounded-xl overflow-hidden shadow-md">
                            {itemType === 'video' && videoInfo ? (
                              videoInfo.platform === 'youtube' && videoInfo.thumbnail ? (
                                <img src={videoInfo.thumbnail} alt={img.title} className="w-full h-32 object-cover" loading="lazy" />
                              ) : videoInfo.platform === 'direct' ? (
                                <video src={img.url} className="w-full h-32 object-cover" muted preload="metadata" />
                              ) : (
                                <div className="w-full h-32 bg-gray-800 flex items-center justify-center">
                                  <Video size={24} className="text-gray-400" />
                                </div>
                              )
                            ) : (
                              <img src={img.url} alt={img.title} className="w-full h-32 object-cover" loading="lazy" />
                            )}
                            {itemType === 'video' && (
                              <div className="absolute top-2 left-2 bg-black/60 text-white rounded-full p-1">
                                <Video size={12} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                              <span className="text-white text-xs font-medium px-2 text-center">{img.title}</span>
                              <button
                                onClick={() => deleteGalleryImage(img._id)}
                                className="p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center text-gray-400">
                <Mail size={48} className="mx-auto mb-3 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className={`bg-white rounded-2xl shadow-md p-5 ${!msg.read ? 'border-l-4 border-orange-500' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-800">{msg.name}</span>
                        {!msg.read && <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-medium">New</span>}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                        {msg.email && <span>📧 {msg.email}</span>}
                        {msg.phone && <span>📞 {msg.phone}</span>}
                        <span>🕐 {new Date(msg.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                      {msg.subject && <div className="text-sm font-medium text-gray-700 mb-1">Subject: {msg.subject}</div>}
                      <p className="text-sm text-gray-600">{msg.message}</p>
                    </div>
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}