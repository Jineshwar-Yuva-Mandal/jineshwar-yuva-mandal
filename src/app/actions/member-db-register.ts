"use server";

import { supabaseAdmin as supabase } from "@/lib/supabase";


export async function registerMemberInDB(formData: any, utr: string) {
  try {
    // 1. Generate Unique UserID (firstname.lastname@jym.rj)
    const baseId = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`;
    const domain = "@jym.rajajinagar";
    
    // Check existing IDs using a pattern match
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .ilike('user_id', `${baseId}%`);

    const existingIds = existing?.map(row => row.id) || [];
    
    let finalId = `${baseId}${domain}`;
    let counter = 2;

    while (existingIds.includes(finalId)) {
      const suffix = counter < 10 ? `0${counter}` : counter.toString();
      finalId = `${baseId}${suffix}${domain}`;
      counter++;
    }

    // 2. Insert into Supabase 'profiles' table
    const { data, error } = await supabase
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

    if (error) throw error;

    // 3. Create initial Membership Fee entry in the Ledger
    // This connects the registration to your financial records immediately
    await supabase.from('mandal_ledger').insert([
      {
        direction: 'IN',
        category: 'MEMBERSHIP_FEE',
        amount: 300,
        description: `New Registration: ${formData.firstName} ${formData.lastName}`,
        utr_reference: utr,
        status: 'PENDING' // Ledger entry stays pending until Treasurer verifies
      }
    ]);

    return { success: true, userId: finalId };
  } catch (error: any) {
    console.error("Supabase Registration Error:", error);
    return { success: false, message: error.message || "Server error." };
  }
}