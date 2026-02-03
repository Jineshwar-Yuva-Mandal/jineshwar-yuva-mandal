"use server";

import { getMemberDBInstance } from "@/lib/member-db-connection";

export async function updatePasswordAction(userId: string, newPassword: string) {
  try {
    const sheets = await getMemberDBInstance();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = process.env.Member_DB_TAB_NAME;

    // 1. Find the row index
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A:A`,
    });
    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0]?.toLowerCase() === userId?.toLowerCase());

    if (rowIndex === -1) return { success: false, message: "User not found." };

    // 2. Update Column B (Password)
    // Sheets is 1-indexed, so row 1 is index 0
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tabName}!B${rowIndex + 1}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[newPassword]],
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Password Update Error:", error);
    return { success: false, message: "Failed to update database." };
  }
}