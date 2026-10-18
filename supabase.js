// Initialize Supabase client for browser use
const SUPABASE_URL = "https://qgdb21em7228bqjmeytms.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_E0YGdLypSl4wh-trkbbtCg_KydlRyfU
";   // Replace with your actual anon key

// Create global Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for modules (optional)
export { supabase };

