"use server";

import { supabaseAdmin as supabase } from "@/lib/supabase";

/**
 * FETCH PENDING TRANSACTIONS
 * Replaces the Google Sheets row filtering with a Supabase query
 */
export async function getPendingTransactions() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, mobile, utr_number, status')
      .eq('status', 'PENDING');

    if (error) throw error;

    // Mapping to match your UI's expected object structure
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
 * HELPER: GET UTR FOR USER
 * Finds the UTR reference needed to update the ledger
 */
async function getUtrForUser(userId: string) {
  const { data } = await supabase
    .from('profiles')
    .select('utr_number')
    .eq('user_id', userId)
    .single();
  
  return data?.utr_number || null;
}

/**
 * APPROVE MEMBER ACTION
 * Updates both the profile and the financial ledger in one go
 */
export async function approveMemberAction(userId: string) {
  try {
    const utr = await getUtrForUser(userId);

    // 1. Update Profile Status to APPROVED
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ status: 'APPROVED' })
      .eq('user_id', userId);

    if (profileError) throw profileError;

    // 2. Update Ledger Entry Status to VERIFIED (Cross-table update)
    // We match by UTR reference to ensure the money is tracked
    let ledgerError = null;
    if (utr) {
      const { error } = await supabase
        .from('mandal_ledger')
        .update({ status: 'VERIFIED' })
        .eq('utr_reference', utr);
      ledgerError = error;
    }

    return { success: !profileError && !ledgerError };
  } catch (error) {
    console.error("Approval Error:", error);
    return { success: false };
  }
}