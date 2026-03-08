import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ffhcypfuwcxlpqwoorli.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5jYH0eWaRzy5HlLLLquFVg_fjhGgl1X';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  } 
);
