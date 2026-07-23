import { useMemo, useState } from 'react';
import { Play, Video as VideoIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { translations as t } from '../lib/translations';
import { getMediaType, parseVideoUrl } from '../lib/exportUtils';
import PageHeader from '../components/PageHeader';
import type { GalleryImage } from "../lib/types";

type Category = 'all' | 'festival' | 'blood' | 'health' | 'cleaning' | 'events';
type ViewMode = 'category' | 'year';

const EARLIEST_YEAR = 2022;

/**
 * Best-effort year lookup for a gallery item.
 * `year` (if present and numeric) takes priority over date/createdAt.
 */
function getItemYear(item: GalleryImage | null | undefined): number | null {
  if (!item || typeof item !== 'object') return null;

  // Explicit year takes priority if present
  if (typeof item.year === 'number' && !Number.isNaN(item.year)) return item.year;

  const raw = item.date ?? item.createdAt;
  if (!raw) return null;
  if (raw instanceof Date) return raw.getFullYear();
  if (typeof raw === 'number') return raw;
  if (typeof raw !== 'string') return null;

  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getFullYear();
}

// Moved OUTSIDE Gallery so it's a stable component reference across
// renders — previously this was defined inside Gallery(), which meant a
// brand-new component type was created every render, forcing every visible
// thumbnail (including any playing <video>) to unmount/remount whenever any
// state changed (opening the lightbox, switching category/year, etc).
function Thumbnail({
  img,
  heightClass,
  onSelect,
}: {
  img: GalleryImage;
  heightClass: string;
  onSelect: (url: string, type: 'image' | 'video') => void;
}) {
  const mediaType = getMediaType(img as any);
  const videoInfo = mediaType === 'video' ? parseVideoUrl(img.url) : null;

  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onSelect(img.url, mediaType)}
    >
      {mediaType === 'video' && videoInfo ? (
        <>
          {videoInfo.platform === 'youtube' && videoInfo.thumbnail ? (
            <img
              src={videoInfo.thumbnail}
              alt={img.title}
              className={`w-full ${heightClass} object-cover group-hover:scale-110 transition-transform duration-500`}
              loading="lazy"
            />
          ) : videoInfo.platform === 'direct' ? (
            <video
              src={img.url}
              className={`w-full ${heightClass} object-cover group-hover:scale-110 transition-transform duration-500`}
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <div className={`w-full ${heightClass} bg-gray-800 flex items-center justify-center`}>
              <VideoIcon size={28} className="text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play size={18} className="text-orange-600 ml-0.5" fill="currentColor" />
            </div>
          </div>
        </>
      ) : (
        <img
          src={img.url}
          alt={img.title}
          className={`w-full ${heightClass} object-cover group-hover:scale-110 transition-transform duration-500`}
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
        <span className="text-white text-xs font-medium">{img.title}</span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { lang } = useLanguage();
  const { gallery } = useData();
  const [viewMode, setViewMode] = useState<ViewMode>('year');
  const [category, setCategory] = useState<Category>('all');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t.gallery.all[lang] },
    { key: 'festival', label: t.gallery.festival[lang] },
    { key: 'blood', label: t.gallery.blood[lang] },
    { key: 'health', label: t.gallery.health[lang] },
    { key: 'cleaning', label: t.gallery.cleaning[lang] },
    { key: 'events', label: t.gallery.events[lang] },
  ];

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const fromData = gallery
      .map((g) => getItemYear(g))
      .filter((y): y is number => y !== null && y >= EARLIEST_YEAR);

    const maxYear = Math.max(currentYear, ...(fromData.length ? fromData : [currentYear]));
    const list: number[] = [];
    for (let y = EARLIEST_YEAR; y <= maxYear; y++) list.push(y);
    return list;
  }, [gallery]);

  const byYear = useMemo(() => {
    return years.map((y) => ({
      year: y,
      items: gallery.filter((g) => getItemYear(g) === y),
    }));
  }, [years, gallery]);

  const categoryFiltered =
    category === 'all' ? gallery : gallery.filter((g) => g.category === category);

  const noResultsText = lang === 'mr' ? 'कोणतेही चित्र नाहीत' : 'No images found';
  const noYearItemsText = lang === 'mr' ? 'या वर्षी काही नाही' : 'Nothing yet';

  const openLightbox = (url: string, type: 'image' | 'video') => setLightbox({ url, type });

  return (
    <div>
      <PageHeader title={t.gallery.title[lang]} subtitle={t.gallery.subtitle[lang]} image="/images/festival-aarti.jpg" />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full shadow-sm p-1">
            <button
              onClick={() => setViewMode('category')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${viewMode === 'category' ? 'bg-orange-500 text-white shadow' : 'text-gray-600 hover:text-orange-600'
                }`}
            >
              {lang === 'mr' ? 'प्रकारानुसार' : 'By Category'}
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${viewMode === 'year' ? 'bg-orange-500 text-white shadow' : 'text-gray-600 hover:text-orange-600'
                }`}
            >
              {lang === 'mr' ? 'वर्षानुसार' : 'By Year'}
            </button>
          </div>
        </div>

        {viewMode === 'category' ? (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${category === cat.key
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 shadow-sm'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {categoryFiltered.length === 0 ? (
              <p className="text-center text-gray-500 py-12">{noResultsText}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryFiltered.map((img) => (
                  <Thumbnail key={img._id} img={img} heightClass="h-48" onSelect={openLightbox} />
                ))}
              </div>
            )}
          </>
        ) : selectedYear === null ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {byYear.map(({ year: y, items }) => {
              const cover = items[0];
              const coverType = cover ? getMediaType(cover as any) : null;
              const coverVideoInfo = cover && coverType === 'video' ? parseVideoUrl(cover.url) : null;
              const coverImgSrc =
                cover && coverType === 'video'
                  ? coverVideoInfo?.platform === 'youtube'
                    ? coverVideoInfo.thumbnail
                    : undefined
                  : cover?.url;

              return (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow text-left"
                >
                  <div className="w-full h-40 sm:h-48 bg-gray-200">
                    {coverImgSrc ? (
                      <img
                        src={coverImgSrc}
                        alt={String(y)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <VideoIcon size={28} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-3xl font-bold drop-shadow">{y}</span>
                    <span className="text-xs opacity-90 mt-1">
                      {items.length === 0
                        ? noYearItemsText
                        : `${items.length} ${lang === 'mr' ? 'फोटो/व्हिडिओ' : 'items'}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedYear(null)}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            >
              ← {lang === 'mr' ? 'सर्व वर्षे' : 'All years'}
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{selectedYear}</h3>
            {(() => {
              const items = byYear.find((b) => b.year === selectedYear)?.items ?? [];
              return items.length === 0 ? (
                <p className="text-center text-gray-500 py-12">{noYearItemsText}</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((img) => (
                    <Thumbnail key={img._id} img={img} heightClass="h-48" onSelect={openLightbox} />
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {lightbox.type === 'video' ? (
            (() => {
              const info = parseVideoUrl(lightbox.url);
              if (info.platform === 'direct') {
                return (
                  <video
                    src={info.embedUrl}
                    controls
                    autoPlay
                    className="max-w-full max-h-full rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                );
              }
              return (
                <div
                  className="w-full max-w-4xl aspect-video"
                  onClick={(e) => e.stopPropagation()}
                >
                  <iframe
                    src={info.embedUrl}
                    className="w-full h-full rounded-lg"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Video"
                  />
                </div>
              );
            })()
          ) : (
            <img src={lightbox.url} alt="Full view" className="max-w-full max-h-full rounded-lg" />
          )}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:scale-110 transition-transform"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}