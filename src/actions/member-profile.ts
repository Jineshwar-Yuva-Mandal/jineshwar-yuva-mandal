"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProfileUpdateState = { error?: string; success?: string };

const textFields = ["name", "tagline", "achievements", "profession", "company", "company_desc", "company_website", "phone", "whatsapp", "address", "location", "joined_year", "instagram", "linkedin"] as const;

function readText(formData: FormData, field: string, limit: number) {
  return String(formData.get(field) ?? "").trim().slice(0, limit) || null;
}

export async function updateMemberProfile(_: ProfileUpdateState, formData: FormData): Promise<ProfileUpdateState> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Please sign in to update your profile." };

  const updates = Object.fromEntries(textFields.map((field) => [field, readText(formData, field, field === "achievements" || field === "company_desc" ? 1000 : 160)]));
  const hobbies = readText(formData, "hobbies", 300);
  const { data: profile, error } = await supabase.from("member_profiles").update({ ...updates, hobbies: hobbies ? hobbies.split(",").map((item) => item.trim()).filter(Boolean).slice(0, 12) : [] }).eq("user_id", user.id).select("public_slug").single();

  if (error) return { error: "Your changes could not be saved. Please try again." };
  revalidatePath("/members/portal/");
  revalidatePath(`/members/${profile.public_slug}/`);
  return { success: "Profile updated." };
}