import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { members, getMemberById } from "@/lib/members-data";
import MemberDetailClient from "./MemberDetailClient";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function generateStaticParams() {
  return members.map((m) => ({ id: m.id }));
}

function getProfilePhoto(memberId: string): string | null {
  const dir = path.join(process.cwd(), "public", "images", "members", memberId);
  if (!fs.existsSync(dir)) return null;
  const file = fs.readdirSync(dir).find((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );
  return file ? `/images/members/${memberId}/${file}` : null;
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = getMemberById(id);
  if (!member) return notFound();

  const photo = getProfilePhoto(id);
  return <MemberDetailClient member={member} photo={photo} />;
}
