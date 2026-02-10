// src/services/authService.ts
import { supabase } from "@/lib/supabaseClient"; // Use your PUBLIC client here

export async function registerMemberInDB(formData: any, utr: string) {
  try {
    const baseId = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`;
    const domain = "@jym.rajajinagar";
    
    // 1. Check existing IDs (pattern match)
    const { data: existing } = await supabase
      .from('profiles')
      .select('user_id') // Changed from 'id' to 'user_id' to match your check logic
      .ilike('user_id', `${baseId}%`);

    const existingUserIds = existing?.map(row => row.user_id) || [];
    
    let finalId = `${baseId}${domain}`;
    let counter = 2;

    while (existingUserIds.includes(finalId)) {
      const suffix = counter < 10 ? `0${counter}` : counter.toString();
      finalId = `${baseId}${suffix}${domain}`;
      counter++;
    }

    // 2. Insert into 'profiles'
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: finalId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          mobile: formData.mobile,
          whatsapp: formData.whatsapp,
          email: formData.email,
          dob: formData.dob,
          profession: formData.profession,
          utr_number: utr,
          status: 'PENDING'
        }
      ])
      .select();

    if (profileError) throw profileError;

    // 3. Create Ledger entry
    const { error: ledgerError } = await supabase.from('mandal_ledger').insert([
      {
        direction: 'IN',
        category: 'MEMBERSHIP_FEE',
        amount: 300,
        description: `New Registration: ${formData.firstName} ${formData.lastName}`,
        utr_reference: utr,
        status: 'PENDING'
      }
    ]);

    if (ledgerError) throw ledgerError;

    return { success: true, userId: finalId };
  } catch (error: any) {
    console.error("Client Registration Error:", error);
    return { success: false, message: error.message || "Registration failed." };
  }
}