// js/supabase.js
const supabaseUrl = 'https://SUA_URL_AQUI.supabase.co';        // ← TROQUE
const supabaseAnonKey = 'SUA_ANON_KEY_AQUI';                   // ← TROQUE

const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);

window.supabase = supabase;