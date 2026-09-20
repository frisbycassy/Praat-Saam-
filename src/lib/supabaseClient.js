import { createClient } from "@supabase/supabase-js";

// These two values will come from your own free Supabase project (a
// hosted login + database service) once we set one up together. Until
// then they are empty, and the app uses local browser storage instead
// (see src/context/AuthContext.jsx and ProgressContext.jsx) so the site
// is fully usable while we build it.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
