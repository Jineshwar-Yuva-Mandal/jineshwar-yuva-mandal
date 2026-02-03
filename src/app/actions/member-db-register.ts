"use server";

import { getMemberDBInstance } from "@/lib/member-db-connection";

export async function registerMemberInDB(formData: any, utr: string) {
  try {
    const sheets = await getMemberDBInstance();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Using your specific env key
    const tabName = process.env.MEMBER_DB_TAB_NAME; // The tab name at the bottom of your sheet

    // 1. Fetch existing IDs from Column A to check for collisions
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A:A`,
    });
    const existingIds = response.data.values?.flat() || [];

    // 2. Generate Unique UserID (firstname.lastname@jym.rajajinagar)
    let finalId = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@jym.rajajinagar`;
    let counter = 2;

    while (existingIds.includes(finalId)) {
      const suffix = counter < 10 ? `0${counter}` : counter.toString();
      finalId = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}${suffix}@jym.rajajinagar`;
      counter++;
    }

    // 3. Prepare row data in the specific order we discussed
    const rowData = [
      finalId,                          // UserID (Col A)
      formData.dob.replace(/-/g, ""),   // Password/DOB as DDMMYYYY (Col B)
      formData.firstName,               // First Name (Col C)
      formData.lastName,                // Last Name (Col D)
      formData.mobile,                  // Mobile (Col E)
      formData.whatsapp,                // WhatsApp (Col F)
      formData.email,                   // Email (Col G)
      formData.profession,              // Profession (Col H)
      utr,                              // UTR (Col I)
      "PENDING"                         // Status (Col J)
    ];

    // 4. Append to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:J`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    return { success: true, userId: finalId };
  } catch (error) {
    console.error("Member DB Registration Error:", error);
    return { success: false, message: "Server error. Please try again later." };
  }
}