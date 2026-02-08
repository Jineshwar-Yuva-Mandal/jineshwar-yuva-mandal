"use server";

import { supabaseAdmin as supabase } from "@/lib/supabase";

/**
 * FETCH PENDING TRANSACTIONS
 * Fetches members who have registered but aren't verified yet.
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
      userId: profile.user_id, // This matches your 'name.lastname@...' field
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
 * Triggered by the Koshadhyaksha to verify payment and grant access.
 */
export async function approveMemberAction(userId: string) {
  try {
    // 1. First, get the profile to retrieve the UTR
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('utr_number')
      .eq('user_id', userId)
      .single();

    if (fetchError || !profile) throw new Error("Member not found");

    // 2. Perform updates in parallel (or sequential)
    // We update the profile status to APPROVED
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ status: 'APPROVED' })
      .eq('user_id', userId);

    if (profileError) throw profileError;

    // 3. Update the Mandal Ledger entry status to VERIFIED
    // This connects the 'IN' transaction to the bank verification
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