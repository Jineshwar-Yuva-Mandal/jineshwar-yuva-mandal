"use server";

import { supabaseAdmin as supabase } from "@/lib/supabase";

/**
 * UPDATE PASSWORD ACTION
 * Replaces the Google Sheets row-finding logic with a direct SQL Update.
 */
export async function updatePasswordAction(userId: string, newPassword: string) {
  try {
    // 1. Update the password field in the profiles table
    // We match by 'user_id' (name.lastname@jym.rajajinagar)
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        password: newPassword,
        // Optional: If you want to track when the password was last changed
        // last_password_change: new Date().toISOString() 
      })
      .eq('user_id', userId.toLowerCase().trim())
      .select();

    if (error) {
      console.error("Supabase Password Update Error:", error);
      return { success: false, message: "Database error during update." };
    }

    // 2. Handle Case: User not found
    if (!data || data.length === 0) {
      return { success: false, message: "User account not found." };
    }

    return { success: true };
  } catch (error) {
    console.error("System Password Update Error:", error);
    return { success: false, message: "A system error occurred." };
  }
}