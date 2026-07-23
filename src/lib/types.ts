export type Language = 'mr' | 'en';

export interface Member {
  _id: string;
  name: string;
  phone: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface GalleryImage {
  _id: string;
  title: string;
  url: string;
  category: string;
  mediaType: "image" | "video";
  date?: string;
  year?: number;    // explicit year override, takes priority over date/createdAt
  createdAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdminUser {
  username: string;
  passwordHash: string;
}