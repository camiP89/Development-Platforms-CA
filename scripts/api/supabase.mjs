import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const SUPABASE_URL = "https://yyjdhjubukngfqgeqqkl.supabase.co";
export const SUPABASE_KEY = "sb_publishable_w3dN2vK5qlVIq-xgUcLoog_csv23BNi";

export const SUPABASE = createClient(SUPABASE_URL, SUPABASE_KEY);