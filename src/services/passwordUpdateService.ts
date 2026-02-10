import { supabase } from "@/lib/supabaseClient";

/**
 * UPDATE PASSWORD
 * Runs on the member's phone to update their credentials.
 */
export async function updatePassword(userId: string, newPassword: string) {
  try {
    // We target the 'user_id' column
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        password: newPassword 
      })
      .eq('user_id', userId.toLowerCase().trim())
      .select();

    if (error) {
      console.error("Supabase Update Error:", error);
      return { success: false, message: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, message: "User not found or no permission." };
    }

    return { success: true };
  } catch (error) {
    console.error("Client Password Error:", error);
    return { success: false, message: "Failed to update password." };
  }
}