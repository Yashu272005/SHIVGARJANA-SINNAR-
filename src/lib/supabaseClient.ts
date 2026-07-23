import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Make sure .env has ' +
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, and restart your dev server.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/** Name of the public storage bucket created in Supabase for gallery uploads. */
export const GALLERY_BUCKET = 'gallery-media';