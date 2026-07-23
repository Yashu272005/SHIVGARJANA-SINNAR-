import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Member, GalleryImage, ContactMessage } from '../lib/types';

interface DataContextType {
  members: Member[];
  addMember: (name: string, phone: string) => Promise<Member | null>;
  deleteMember: (id: string) => Promise<void>;
  updateMemberStatus: (id: string, status: Member['status']) => Promise<void>;
  gallery: GalleryImage[];
  addGalleryImage: (img: Omit<GalleryImage, '_id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  deleteGalleryImage: (id: string) => Promise<void>;
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, '_id' | 'createdAt' | 'read'>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
  loading: boolean;
  stats: {
    totalMembers: number;
    todayJoining: number;
    weeklyJoining: number;
    monthlyJoining: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Row <-> app-model mapping -------------------------------------------
// Supabase/Postgres columns are snake_case (created_at, media_type). The
// rest of the app (pages/components) expects camelCase with `_id`. These
// helpers translate both directions so no other file needs to change.
//
// Explicit row shapes (instead of `any`) so mismatched or missing columns
// show up as compile errors here rather than as `undefined` at runtime.

interface MemberRow {
  id: string;
  name: string;
  phone: string;
  created_at: string;
  status: Member['status'];
}

interface GalleryRow {
  id: string;
  url: string;
  title: string;
  category: GalleryImage['category'];
  media_type: GalleryImage['mediaType'];
  date?: string | null;
  created_at: string;
}

interface MessageRow {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
  created_at: string;
  read: boolean;
}

function mapMemberRow(row: MemberRow): Member {
  return { _id: row.id, name: row.name, phone: row.phone, createdAt: row.created_at, status: row.status };
}

function mapGalleryRow(row: GalleryRow): GalleryImage {
  return {
    _id: row.id,
    url: row.url,
    title: row.title,
    category: row.category,
    mediaType: row.media_type,

    date: row.date ?? row.created_at,
    createdAt: row.created_at,
  };
}

function mapMessageRow(row: MessageRow): ContactMessage {
  return {
    _id: row.id,
    name: row.name,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    subject: row.subject ?? undefined,
    message: row.message,
    createdAt: row.created_at,
    read: row.read,
  };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const refetchAll = useCallback(async () => {
    const [membersRes, galleryRes, messagesRes] = await Promise.all([
      supabase.from('members').select('*').order('created_at', { ascending: false }),
      supabase.from('gallery').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
    ]);

    if (membersRes.error) console.error('Failed to load members', membersRes.error);
    else setMembers((membersRes.data ?? []).map(mapMemberRow));

    if (galleryRes.error) console.error('Failed to load gallery', galleryRes.error);
    else setGallery((galleryRes.data ?? []).map(mapGalleryRow));

    if (messagesRes.error) console.error('Failed to load messages', messagesRes.error);
    else setMessages((messagesRes.data ?? []).map(mapMessageRow));
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refetchAll();
      setLoading(false);
    })();
  }, [refetchAll]);

  const addMember = useCallback(async (name: string, phone: string): Promise<Member | null> => {
    const { data, error } = await supabase
      .from('members')
      .insert({ name, phone, status: 'pending' })
      .select()
      .single();
    if (error || !data) {
      console.error('Failed to add member', error);
      return null;
    }
    const newMember = mapMemberRow(data);
    setMembers((prev) => [newMember, ...prev]);
    return newMember;
  }, []);

  const deleteMember = useCallback(async (id: string) => {
    const { error } = await supabase.from('members').delete().eq('id', id);
    if (error) { console.error('Failed to delete member', error); return; }
    setMembers((prev) => prev.filter((m) => m._id !== id));
  }, []);

  const updateMemberStatus = useCallback(async (id: string, status: Member['status']) => {
    const { error } = await supabase.from('members').update({ status }).eq('id', id);
    if (error) { console.error('Failed to update member status', error); return; }
    setMembers((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
  }, []);

  // Returns { success, error } — error is Supabase's actual message so the
  // UI can show *why* a save failed instead of a generic message every time.
  const addGalleryImage = useCallback(async (img: Omit<GalleryImage, '_id' | 'createdAt'>): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase
      .from('gallery')
      .insert({
        url: img.url,
        title: img.title,
        category: img.category,
        media_type: img.mediaType ?? 'image',
        date: img.date, // event date (yyyy-mm-dd), used by the public year-wise gallery
      })
      .select()
      .single();
    if (error || !data) {
      console.error('Failed to add gallery item', error);
      return { success: false, error: error?.message ?? 'Unknown error' };
    }
    setGallery((prev) => [mapGalleryRow(data), ...prev]);
    return { success: true };
  }, []);

  const deleteGalleryImage = useCallback(async (id: string) => {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) { console.error('Failed to delete gallery item', error); return; }
    setGallery((prev) => prev.filter((g) => g._id !== id));
  }, []);

  const addMessage = useCallback(async (msg: Omit<ContactMessage, '_id' | 'createdAt' | 'read'>) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({ ...msg, read: false })
      .select()
      .single();
    if (error || !data) { console.error('Failed to add message', error); return; }
    setMessages((prev) => [mapMessageRow(data), ...prev]);
  }, []);

  const deleteMessage = useCallback(async (id: string) => {
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) { console.error('Failed to delete message', error); return; }
    setMessages((prev) => prev.filter((m) => m._id !== id));
  }, []);

  const markMessageRead = useCallback(async (id: string) => {
    const { error } = await supabase.from('messages').update({ read: true }).eq('id', id);
    if (error) { console.error('Failed to mark message read', error); return; }
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
  }, []);

  const stats = useMemo(() => {
    const now = Date.now();
    const today = new Date(now).toDateString();

    return {
      totalMembers: members.length,
      todayJoining: members.filter((m) => new Date(m.createdAt).toDateString() === today).length,
      weeklyJoining: members.filter((m) => now - new Date(m.createdAt).getTime() < 7 * 86400000).length,
      monthlyJoining: members.filter((m) => now - new Date(m.createdAt).getTime() < 30 * 86400000).length,
    };
  }, [members]);

  return (
    <DataContext.Provider value={{
      members, addMember, deleteMember, updateMemberStatus,
      gallery, addGalleryImage, deleteGalleryImage,
      messages, addMessage, deleteMessage, markMessageRead,
      loading, stats,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}