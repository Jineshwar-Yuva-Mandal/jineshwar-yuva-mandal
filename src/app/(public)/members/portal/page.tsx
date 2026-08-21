import Link from "next/link";
import { redirect } from "next/navigation";
import MemberPortalClient, { type AttendanceRecord, type FineRecord, type PortalProfile } from "./MemberPortalClient";
import { hasSupabaseConfiguration } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const BASE_PROFILE_COLUMNS = "name, email, tagline, bio, profession, company, company_desc, company_website, phone, location, instagram, linkedin, hobbies";
const EXTENDED_PROFILE_COLUMNS = "name, email, tagline, bio, profession, company, company_desc, company_website, phone, whatsapp, address, location, joined_year, achievements, instagram, linkedin, hobbies";

export default async function MemberPortalPage() {
  if (!hasSupabaseConfiguration()) redirect("/members/login/");
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/members/login/");
  const userEmail = user.email?.trim().toLowerCase();
  if (!userEmail) redirect("/members/login/");

  await supabase.rpc("link_current_member_profile");

  const { data: baseProfile } = await supabase.from("member_profiles").select(BASE_PROFILE_COLUMNS).eq("email", userEmail).maybeSingle();
  if (!baseProfile) return <main className="min-h-screen bg-slate-50 px-6 pt-32"><div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8"><h1 className="font-serif text-3xl font-bold text-slate-900">Profile not linked yet</h1><p className="mt-4 text-sm leading-relaxed text-slate-600">You are signed in, but this email is not listed in the Mandal member records. Please ask the Mandal team to add this email to the member sheet.</p><Link href="/members/" className="mt-6 inline-block text-sm font-bold text-slate-800 underline">Return to members</Link></div></main>;

  const { data: extendedProfile } = await supabase.from("member_profiles").select(EXTENDED_PROFILE_COLUMNS).eq("email", userEmail).maybeSingle();
  const profile = {
    ...baseProfile,
    ...(extendedProfile ?? {}),
    whatsapp: extendedProfile?.whatsapp ?? null,
    address: extendedProfile?.address ?? null,
    joined_year: extendedProfile?.joined_year ?? null,
    achievements: extendedProfile?.achievements ?? null,
  };
  if (!profile) return <main className="min-h-screen bg-slate-50 px-6 pt-32"><div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8"><h1 className="font-serif text-3xl font-bold text-slate-900">Profile not linked yet</h1><p className="mt-4 text-sm leading-relaxed text-slate-600">You are signed in, but this email is not listed in the Mandal member records. Please ask the Mandal team to add this email to the member sheet.</p><Link href="/members/" className="mt-6 inline-block text-sm font-bold text-slate-800 underline">Return to members</Link></div></main>;
  const [{ data: attendance }, { data: fines }] = await Promise.all([supabase.from("attendance_records").select("event_name, event_date, status").order("event_date", { ascending: false }), supabase.from("fine_records").select("fine_type, amount, status, recorded_on").order("recorded_on", { ascending: false })]);
  return <MemberPortalClient profile={profile as PortalProfile} attendance={(attendance ?? []) as AttendanceRecord[]} fines={(fines ?? []) as FineRecord[]} />;
}