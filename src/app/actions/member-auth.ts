"use server";

import { supabaseAdmin as supabase } from "@/lib/supabase";


export async function loginMemberAction(userId: string, passwordAttempt: string) {
  try {
    // 1. Fetch user and their role in one "cross-table" query
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        user_roles (role_name)
      `)
      .eq('user_id', userId.toLowerCase().trim())
      .single();

    // FAILED: User not found
    if (error || !profile) {
      return { 
        success: false, 
        message: "UserID not found.", 
        status: null, 
        requiresPasswordChange: false, 
        user: null 
      };
    }

    // 2. Check Password (assuming password is in 'password' column)
    // If you're still using DOB as password, use profile.dob.replace(/-/g, "")
    const storedPassword = profile.password || profile.dob.replace(/-/g, "");

    if (storedPassword !== passwordAttempt) {
      return { 
        success: false, 
        message: "Incorrect password.", 
        status: null, 
        requiresPasswordChange: false, 
        user: null 
      };
    }

    // 3. Determine if password is still the default DOB (YYYYMMDD)
    const isDefault = passwordAttempt.length === 8 && /^\d+$/.test(passwordAttempt);

    return { 
      success: true, 
      message: "Login successful",
      status: profile.status, // "APPROVED" or "PENDING"
      role: profile.user_roles?.[0]?.role_name || 'MEMBER',
      requiresPasswordChange: isDefault,
      user: { 
        userId: profile.user_id, 
        firstName: profile.first_name 
      } 
    };
  } catch (error) {
    console.error("Auth Error:", error);
    return { 
      success: false, 
      message: "System error.", 
      status: null, 
      requiresPasswordChange: false, 
      user: null 
    };
  }
}