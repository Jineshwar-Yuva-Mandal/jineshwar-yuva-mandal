"use server";

import { getMemberDBInstance } from "@/lib/member-db-connection";

export async function loginMemberAction(userId: string, passwordAttempt: string) {
  try {
    const sheets = await getMemberDBInstance();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = process.env.MEMBER_DB_TAB_NAME;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${tabName}!A:J`,
    });

    const rows = response.data.values || [];
    const userRow = rows.find(row => row[0]?.toLowerCase() === userId.toLowerCase().trim());

    // FAILED: User not found
    if (!userRow) {
      return { 
        success: false, 
        message: "UserID not found.", 
        status: null, 
        requiresPasswordChange: false, 
        user: null 
      };
    }

    const storedPassword = userRow[1];
    const firstName = userRow[2];
    const status = userRow[9];

    // FAILED: Wrong password
    if (storedPassword !== passwordAttempt) {
      return { 
        success: false, 
        message: "Incorrect password.", 
        status: null, 
        requiresPasswordChange: false, 
        user: null 
      };
    }

    // SUCCESS: Determine if password is default (YYYYMMDD format)
    const isDefault = passwordAttempt.length === 8 && /^\d+$/.test(passwordAttempt);

    return { 
      success: true, 
      message: "Login successful",
      status: status, // "APPROVED" or "PENDING"
      requiresPasswordChange: isDefault,
      user: { userId: userRow[0], firstName } 
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