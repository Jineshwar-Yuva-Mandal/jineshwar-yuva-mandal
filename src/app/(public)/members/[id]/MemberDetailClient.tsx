"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Briefcase, MapPin, Phone, Mail, Globe,
  Shield, Star, Heart, Trophy,
} from "lucide-react";
import type { MemberProfile } from "@/lib/members-data";

type Props = Readonly<{ member: MemberProfile; photo: string | null }>;

export default function MemberDetailClient({ member, photo }: Props) {
  return (
    <main className="bg-white min-h-screen pb-32">

      {/* ── HERO HEADER ── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 pt-32 pb-0">

        {/* Back link */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 mb-8">
          <Link
            href="/members/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            All Members
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-end gap-8 pb-10 md:pb-14">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0 w-40 h-40 md:w-52 md:h-52 rounded-3xl overflow-hidden bg-slate-700 border-4 border-white/10 shadow-2xl"
          >
            {photo ? (
              <Image src={photo} alt={member.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-600">
                <span className="text-6xl font-serif font-bold text-white/30">
                  {member.name.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Name + meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="pb-8 md:pb-10 flex-1"
          >
            {member.mandalRole && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 mb-4">
                <Shield size={9} />
                {member.mandalRole}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-2">
              {member.name}
            </h1>
            {member.tagline && (
              <p className="text-sm text-white/50 italic mb-4">{member.tagline}</p>
            )}
            <div className="flex flex-wrap gap-4 text-white/40 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Briefcase size={11} />{member.profession}</span>
              {member.location && <span className="flex items-center gap-1.5"><MapPin size={11} />{member.location}</span>}
              {member.joinedYear && <span>Member since {member.joinedYear}</span>}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-14 grid md:grid-cols-3 gap-10">

        {/* Left column: Bio + Positions + Achievements */}
        <div className="md:col-span-2 space-y-12">

          {/* Bio */}
          {member.bio && (
            <Section label="About" icon={<Star size={14} />}>
              <p className="text-slate-600 text-lg leading-loose">{member.bio}</p>
            </Section>
          )}

          {/* Mandal Positions */}
          {member.mandalPositions && member.mandalPositions.length > 0 && (
            <Section label="Mandal Positions" icon={<Shield size={14} />}>
              <div className="space-y-3">
                {member.mandalPositions.map((pos) => (
                  <div
                    key={pos.title}
                    className="flex items-center justify-between py-3 px-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <span className="font-bold text-slate-800 text-sm">{pos.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {pos.until ? `${pos.since}–${pos.until}` : `Since ${pos.since}`}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Achievements */}
          {member.achievements && member.achievements.length > 0 && (
            <Section label="Achievements & Contributions" icon={<Trophy size={14} />}>
              <ul className="space-y-2">
                {member.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-slate-600 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Hobbies */}
          {member.hobbies && member.hobbies.length > 0 && (
            <Section label="Interests & Hobbies" icon={<Heart size={14} />}>
              <div className="flex flex-wrap gap-2">
                {member.hobbies.map((h) => (
                  <span
                    key={h}
                    className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Right column: Contact + Business */}
        <div className="space-y-8">

          {/* Contact */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-5">Contact</p>
            <div className="space-y-4">
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-3 text-slate-700 text-sm hover:text-slate-900 transition-colors group"
                >
                  <Phone size={14} className="text-slate-400 group-hover:text-slate-700 flex-shrink-0" />
                  {member.phone}
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 text-slate-700 text-sm hover:text-slate-900 transition-colors group"
                >
                  <Mail size={14} className="text-slate-400 group-hover:text-slate-700 flex-shrink-0" />
                  {member.email}
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 text-sm hover:text-slate-900 transition-colors group"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-700 flex-shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  Instagram
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-700 text-sm hover:text-slate-900 transition-colors group"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-700 flex-shrink-0"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Business / Professional */}
          {(member.company || member.companyDesc || member.companyWebsite) && (
            <div className="bg-slate-900 rounded-3xl p-6 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-5">Business</p>
              {member.company && (
                <p className="font-serif font-bold text-lg mb-1">{member.company}</p>
              )}
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">{member.profession}</p>
              {member.companyDesc && (
                <p className="text-sm text-white/60 leading-relaxed mb-4">{member.companyDesc}</p>
              )}
              {member.companyWebsite && (
                <a
                  href={`https://${member.companyWebsite.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors group"
                >
                  <Globe size={11} />
                  {member.companyWebsite}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* Small reusable section wrapper */
function Section({
  label,
  icon,
  children,
}: Readonly<{ label: string; icon: React.ReactNode; children: React.ReactNode }>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 text-slate-400 mb-4">
        {icon}
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</p>
      </div>
      <div className="h-px bg-slate-100 mb-6" />
      {children}
    </motion.section>
  );
}
