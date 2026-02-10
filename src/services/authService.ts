import { supabase } from "@/lib/supabaseClient";

export async function loginMember(userId: string, passwordAttempt: string) {
  try {
    // 1. Fetch user and their role
    // Note: We use the public client, so RLS must allow this SELECT
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        user_roles (role_name)
      `)
      .eq('user_id', userId.toLowerCase().trim())
      .single();

    if (error || !profile) {
      return { success: false, message: "UserID not found." };
    }

    // 2. Logic for password check (Same as before)
    const storedPassword = profile.password || profile.dob.replace(/-/g, "");

    if (storedPassword !== passwordAttempt) {
      return { success: false, message: "Incorrect password." };
    }

    // 3. Determine if it's the default DOB password
    const isDefault = passwordAttempt.length === 8 && /^\d+$/.test(passwordAttempt);

    return { 
      success: true, 
      status: profile.status,
      role: profile.user_roles?.[0]?.role_name || 'MEMBER',
      requiresPasswordChange: isDefault,
      user: { 
        userId: profile.user_id, 
        name: profile.first_name,
        id: profile.id // The UUID for internal linking
      } 
    };
  } catch (error) {
    console.error("Auth Error:", error);
    return { success: false, message: "System error." };
  }
}