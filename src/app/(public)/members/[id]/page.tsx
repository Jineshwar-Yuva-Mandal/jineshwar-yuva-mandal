import { notFound } from "next/navigation";
import { members, getMemberById, type MemberProfile } from "@/lib/members-data";
import { getMemberProfilePhoto } from "@/lib/public-images";
import { hasSupabaseConfiguration } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import MemberDetailClient from "./MemberDetailClient";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return members.map((m) => ({ id: m.id }));
}

async function getEditableProfile(member: MemberProfile) {
  if (!hasSupabaseConfiguration()) return member;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("member_profiles")
    .select("name, tagline, bio, profession, company, company_desc, company_website, phone, whatsapp, address, location, joined_year, achievements, instagram, linkedin, hobbies")
    .eq("public_slug", member.id)
    .maybeSingle();

  if (!data) return member;

  return {
    ...member,
    name: data.name ?? member.name,
    tagline: data.tagline ?? undefined,
    bio: data.bio ?? undefined,
    joinedYear: data.joined_year ?? member.joinedYear,
    achievements: data.achievements ? data.achievements.split(/\n+/).map((item: string) => item.replace(/^[-•]\s*/, "").trim()).filter(Boolean) : member.achievements,
    profession: data.profession ?? member.profession,
    company: data.company ?? undefined,
    companyDesc: data.company_desc ?? undefined,
    companyWebsite: data.company_website ?? undefined,
    phone: data.phone ?? undefined,
    location: data.location ?? data.address ?? undefined,
    instagram: data.instagram ?? undefined,
    linkedin: data.linkedin ?? undefined,
    hobbies: data.hobbies ?? undefined,
  };
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = getMemberById(id);
  if (!member) return notFound();

  const [editableMember, photo] = await Promise.all([
    getEditableProfile(member),
    Promise.resolve(getMemberProfilePhoto(id)),
  ]);
  return <MemberDetailClient member={editableMember} photo={photo} />;
}
