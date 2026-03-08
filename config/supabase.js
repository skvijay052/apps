import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://ffhcypfuwcxlpqwoorli.supabase.co",   // Project URL
  "sb_publishable_5jYH0eWaRzy5HlLLLquFVg_fjhGgl1X" // Public API key
)
