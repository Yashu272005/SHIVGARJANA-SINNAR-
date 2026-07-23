import { Member } from './types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportExcel(members: Member[]) {
  const headers = ['Name', 'Phone', 'Date', 'Status'];
  const rows = members.map((m) => [
    m.name,
    m.phone,
    new Date(m.createdAt).toLocaleDateString('en-IN'),
    m.status,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `members_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
/**
 * Detects whether a gallery item's URL is a video or an image.
 * Works for normal file paths (/videos/x.mp4) AND base64 data URLs
 * (data:video/mp4;base64,...) which is what admin file-uploads produce.
 */
export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  if (lower.startsWith('data:video/')) return true;
  if (lower.startsWith('data:image/')) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(lower);
}

/**
 * Returns 'image' or 'video' for a gallery item.
 * Always trusts an explicit `mediaType` field first (set when the admin
 * uploads), and only falls back to URL sniffing for older items that
 * don't have that field saved yet.
 */
export function getMediaType(item: { url: string; mediaType?: 'image' | 'video' }): 'image' | 'video' {
  if (item.mediaType === 'image' || item.mediaType === 'video') return item.mediaType;
  return isVideoUrl(item.url) ? 'video' : 'image';
}



export interface ParsedVideo {

  platform: 'youtube' | 'vimeo' | 'drive' | 'instagram' | 'direct';

  embedUrl: string;

  thumbnail?: string;
}



export function parseVideoUrl(url: string): ParsedVideo {
  if (!url) return { platform: 'direct', embedUrl: url };

  // YouTube: youtube.com/watch?v=ID, youtu.be/ID, or already an embed link
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (yt) {
    const id = yt[1];
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${id}`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // Vimeo: vimeo.com/12345678
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return { platform: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeo[1]}` };
  }

  // Google Drive: drive.google.com/file/d/FILE_ID/view?...
  const drive = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (drive) {
    return { platform: 'drive', embedUrl: `https://drive.google.com/file/d/${drive[1]}/preview` };
  }

  // Instagram Reels / posts: instagram.com/reel/SHORTCODE/, /reels/SHORTCODE/, or /p/SHORTCODE/
  const instagram = url.match(/instagram\.com\/(?:reel|reels|p)\/([a-zA-Z0-9_-]+)/);
  if (instagram) {
    return { platform: 'instagram', embedUrl: `https://www.instagram.com/reel/${instagram[1]}/embed` };
  }

  // Anything else: assume it's a direct video file link (or base64 data URL)
  return { platform: 'direct', embedUrl: url };
}

export function exportPDF(members: Member[]) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setTextColor(124, 45, 18);
  doc.text('Shivgarjana Mitra Mandal Dahihandi Samiti', 14, 18);
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text('Member List Report', 14, 26);
  doc.setFontSize(9);
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 32);
  doc.text(`Total Members: ${members.length}`, 14, 37);

  autoTable(doc, {
    startY: 42,
    head: [['Name', 'Phone', 'Date', 'Status']],
    body: members.map((m) => [
      m.name,
      m.phone,
      new Date(m.createdAt).toLocaleDateString('en-IN'),
      m.status,
    ]),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [249, 115, 22], textColor: 255 },
    alternateRowStyles: { fillColor: [255, 248, 240] },
  });

  doc.save(`members_${new Date().toISOString().split('T')[0]}.pdf`);
}
