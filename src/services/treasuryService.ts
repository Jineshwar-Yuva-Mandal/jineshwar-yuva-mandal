import { supabase } from "@/lib/supabaseClient";

/**
 * FETCH PENDING TRANSACTIONS
 * Now runs client-side. Ensure RLS allows the Koshadhyaksha role to SELECT these.
 */
export async function getPendingTransactions() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, first_name, last_name, mobile, utr_number, status')
      .eq('status', 'PENDING')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(profile => ({
      userId: profile.user_id,
      name: `${profile.first_name} ${profile.last_name}`,
      mobile: profile.mobile,
      utr: profile.utr_number,
      status: profile.status
    }));
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

/**
 * APPROVE MEMBER ACTION
 * Direct client-to-Supabase update.
 */
export async function approveMemberAction(userId: string) {
  try {
    // 1. Get profile for UTR
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('utr_number')
      .eq('user_id', userId)
      .single();

    if (fetchError || !profile) throw new Error("Member not found");

    // 2. Update Profile Status
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ status: 'APPROVED' })
      .eq('user_id', userId);

    if (profileError) throw profileError;

    // 3. Update Ledger Entry
    if (profile.utr_number) {
      const { error: ledgerError } = await supabase
        .from('mandal_ledger')
        .update({ status: 'VERIFIED' })
        .eq('utr_reference', profile.utr_number);
      
      if (ledgerError) console.error("Ledger Update Warning:", ledgerError);
    }

    return { success: true };
  } catch (error) {
    console.error("Approval Error:", error);
    return { success: false, message: "Could not approve member." };
  }
}