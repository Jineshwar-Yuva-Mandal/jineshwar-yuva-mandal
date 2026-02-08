import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This "Service Role" client is for Server Actions ONLY. 
// It bypasses RLS so you can register users and update ledgers.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);