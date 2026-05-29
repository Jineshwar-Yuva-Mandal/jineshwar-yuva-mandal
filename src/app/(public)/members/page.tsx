import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { members } from "@/lib/members-data";
import PageHeader from "@/components/shared/PageHeader";
import { ArrowRight, Briefcase, MapPin, Shield } from "lucide-react";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function getProfilePhoto(memberId: string): string | null {
  const dir = path.join(process.cwd(), "public", "images", "members", memberId);
  if (!fs.existsSync(dir)) return null;
  const file = fs.readdirSync(dir).find((f) =>
    SUPPORTED.has(path.extname(f).toLowerCase())
  );
  return file ? `/images/members/${memberId}/${file}` : null;
}

export default function MembersPage() {
  if (!members.length) return notFound();

  const membersWithPhotos = members.map((m) => ({
    ...m,
    photo: getProfilePhoto(m.id),
  }));

  return (
    <main className="bg-white min-h-screen pb-32">
      <PageHeader title="OUR MEMBERS" subtitle="The Faces of the Sangh" />

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Member update form nudge */}
        <div className="mb-10 flex items-center justify-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdAXAiVVPiXCpWYkvaYRisrdRcHu2FOcC49cJnx4IhuuxW8qw/viewform?usp=sharing&ouid=109251007817085429798"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37] text-[11px] font-black uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-colors"
          >
            ✦ Member Update Form — Update your profile details
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {membersWithPhotos.map((member) => (
            <Link
              key={member.id}
              href={`/members/${member.id}/`}
              className="group block bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="w-20 h-20 rounded-full bg-slate-300 flex items-center justify-center">
                      <span className="text-3xl font-serif font-bold text-slate-500">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Photo coming soon
                    </span>
                  </div>
                )}

                {/* Mandal role badge */}
                {member.mandalRole && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-900/80 text-white backdrop-blur-sm">
                      <Shield size={8} />
                      {member.mandalRole}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 border-t border-slate-100">
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {member.name}
                </h3>
                {member.tagline && (
                  <p className="text-xs text-slate-400 italic mb-4 line-clamp-1">{member.tagline}</p>
                )}

                <div className="space-y-1.5 text-slate-500 text-xs">
                  <div className="flex items-center gap-2">
                    <Briefcase size={11} className="text-slate-300 flex-shrink-0" />
                    {member.profession}
                  </div>
                  {member.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={11} className="text-slate-300 flex-shrink-0" />
                      {member.location}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  {member.joinedYear && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
                      Since {member.joinedYear}
                    </span>
                  )}
                  <ArrowRight
                    size={14}
                    className="ml-auto text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
