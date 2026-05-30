"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Lightbulb,
  MessageCircle,
  Palette,
  Brain,
  ExternalLink,
  Play,
  Shield,
  Users,
  ImageIcon,
} from "lucide-react";
import { iconMap, type SerializableEventItem } from "@/lib/events-data";

// ── Paste your YouTube video ID here once the video is live ──────────────────
// e.g. if the URL is https://www.youtube.com/watch?v=dQw4w9WgXcQ
// set YOUTUBE_ID = "dQw4w9WgXcQ"
const YOUTUBE_ID = "";
// ─────────────────────────────────────────────────────────────────────────────

const COMPETITIONS = [
  {
    id: "ghaan-veer",
    name: "Ghaan Veer",
    subtitle: "Quiz Competition",
    color: "#1565C0",
    icon: Lightbulb,
    desc: "Teams of 4 battle through multiple elimination rounds, testing their knowledge of Jain philosophy, history, scriptures, and culture to capture the lead position.",
    format: [
      "Teams of 4 participants",
      "Multiple progressive elimination rounds",
      "Increasing difficulty per round",
    ],
    lead: "Pritesh",
    leadId: "pritesh-jain",
  },
  {
    id: "kano-kan",
    name: "Kano-Kan",
    subtitle: "Chinese Whisper",
    color: "#6A1B9A",
    icon: MessageCircle,
    desc: "A playful and challenging team game — 4 members stand back-to-back and silently pass a Jain kriya gesture shown to only the first person, one to another.",
    format: [
      "Teams of 4, standing facing each other's back",
      "A Jain kriya is shown to the first person only",
      "Passed non-verbally down the line",
      "Anchor evaluates accuracy each round",
    ],
    lead: "Pratham",
    leadId: "pratham",
  },
  {
    id: "rang-manch",
    name: "Rang Manch",
    subtitle: "Drawing Competition",
    color: "#2E7D32",
    icon: Palette,
    desc: "Two age divisions celebrate creativity through art. Junior participants bring a provided sketch to life with colour; seniors artistically illustrate their imagination of Jainism in 2030.",
    format: [
      "Junior Division (Class 3–5): colour a provided sketch",
      'Senior Division (Class 6+): topic — "Jainism in 2030"',
      "Judged on creativity, technique & expression",
    ],
    lead: "Vandan",
    leadId: "vandan",
  },
  {
    id: "chanakya-neeti",
    name: "Chanakya Neeti",
    subtitle: "Memory Game",
    color: "#BF360C",
    icon: Brain,
    desc: "Sharp minds compete to memorise and recall a curated set of Jain and non-Jain objects displayed before them — a true test of focus, attention, and retention.",
    format: [
      "2 rounds of increasing complexity",
      "Mix of Jain & non-Jain objects displayed",
      "Participants list as many as they can recall",
    ],
    lead: "Moksh",
    leadId: "moksh",
  },
];

const TEAM = [
  { role: "Public Relations", member: "Dikshith", memberId: "dikshith" },
  { role: "Event Coordination & Decorations", member: "Ayush", memberId: "ayush-bhalgat" },
];

const PLACEHOLDER_SLOTS = 6;

type Props = {
  event: SerializableEventItem;
  coverImage: string | null;
  galleryImages: string[];
  logoImage: string | null;
};

export default function KalaravDetailClient({
  event,
  coverImage,
  galleryImages,
  logoImage,
}: Readonly<Props>) {
  const hasGallery = galleryImages.length > 0;
  const Icon = iconMap[event.iconName];

  return (
    <main className="bg-white min-h-screen pb-32 md:pb-40">

      {/* ── HERO ── */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {coverImage ? (
          <Image src={coverImage} alt={event.title} fill className="object-cover" priority />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(160deg, ${event.color}40 0%, #0f172a 80%)` }}
          >
            {Icon && (
              <Icon
                size={320}
                className="absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none"
                style={{ color: event.color }}
              />
            )}
          </div>
        )}

        <div className={`absolute inset-0 ${coverImage ? "bg-slate-900/55" : "bg-slate-900/70"}`} />
        {coverImage && (
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(to top, ${event.color}80 0%, transparent 60%)` }}
          />
        )}

        {/* Back link */}
        <div className="absolute top-0 left-0 w-full z-20 pt-24 md:pt-28 px-6 md:px-12">
          <Link
            href="/events/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 w-full z-10 px-6 md:px-12 pb-10 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <span
              className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest"
              style={{
                color: event.color,
                backgroundColor: `${event.color}28`,
                border: `1px solid ${event.color}50`,
              }}
            >
              Inter-Pathshaala
            </span>
            <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Upcoming
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-2"
          >
            {event.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm font-black uppercase tracking-widest mb-5"
            style={{ color: event.color }}
          >
            {event.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-white/40 text-xs font-bold uppercase tracking-widest"
          >
            <span className="flex items-center gap-2"><Calendar size={12} />{event.date}</span>
            <span className="flex items-center gap-2"><MapPin size={12} />{event.location}</span>
          </motion.div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* ── ABOUT + LOGO ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 md:py-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">About Kalarav</p>
          <div className="h-px bg-slate-100 mb-8" />
          <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start">
            <p className="text-slate-600 text-lg md:text-xl leading-loose flex-1">
              Kalarav is an inter-Pathshaala cultural competition bringing together students from
              Jain Pathshalas across Bangalore. Young minds compete and shine through knowledge,
              creativity, memory, and teamwork — celebrating talent, Dharmic learning, and the
              spirit of healthy competition.
            </p>

            {/* Logo — white-background logo sits perfectly on the white body */}
            {logoImage ? (
              <div className="flex-shrink-0 w-36 md:w-44 self-center md:self-start">
                <Image
                  src={logoImage}
                  alt="Kalarav 2026 Logo"
                  width={176}
                  height={176}
                  className="w-full h-auto object-contain rounded-2xl border border-slate-100 shadow-sm p-2"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-36 md:w-44 self-center md:self-start rounded-2xl border-2 border-dashed border-slate-200 aspect-square flex flex-col items-center justify-center gap-2 p-4 text-center">
                {Icon && <Icon size={24} style={{ color: `${event.color}60` }} />}
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 leading-snug">
                  Add logo at<br />
                  public/images/<br />events/kalarav-2026/<br />logo.png
                </span>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── REGISTER CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 rounded-3xl overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${event.color} 0%, #0288D1 100%)` }}
        >
          <div className="px-8 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mb-1">
                Registrations Open
              </p>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1">
                Join the Competition
              </h3>
              <p className="text-sm text-white/70">
                Register your Pathshaala team and be part of Kalarav 2026.
              </p>
            </div>
            <a
              href="https://forms.gle/AL2XF9ehEowi6mXc8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-xl"
              style={{ color: event.color }}
            >
              Register Now
              <ExternalLink size={13} />
            </a>
          </div>
        </motion.section>

        {/* ── COMPETITIONS ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">4 Events</p>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">The Competitions</h2>
          <div className="h-px bg-slate-100 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMPETITIONS.map((comp, i) => {
              const CompIcon = comp.icon;
              return (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px -8px rgba(0,0,0,0.10)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.5 }}
                  className="rounded-3xl border border-slate-100 overflow-hidden cursor-default"
                >
                  {/* Card header */}
                  <div
                    className="px-6 pt-6 pb-5"
                    style={{
                      background: `linear-gradient(135deg, ${comp.color}10 0%, ${comp.color}05 100%)`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${comp.color}18`,
                          border: `1px solid ${comp.color}30`,
                        }}
                      >
                        <CompIcon size={20} style={{ color: comp.color }} />
                      </div>
                      <Link
                        href={`/members/${comp.leadId}/`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-opacity hover:opacity-70"
                        style={{
                          color: comp.color,
                          backgroundColor: `${comp.color}14`,
                          border: `1px solid ${comp.color}30`,
                        }}
                      >
                        <Shield size={8} />
                        Lead: {comp.lead}
                      </Link>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-0.5">
                      {comp.name}
                    </h3>
                    <p
                      className="text-[10px] font-black uppercase tracking-widest"
                      style={{ color: comp.color }}
                    >
                      {comp.subtitle}
                    </p>
                  </div>

                  {/* Card body */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{comp.desc}</p>
                    <ul className="space-y-1.5">
                      {comp.format.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-xs text-slate-500">
                          <span
                            className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: comp.color }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── TEAM ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
            Behind the Scenes
          </p>
          <div className="h-px bg-slate-100 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM.map((t) => (
              <div
                key={t.role}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${event.color}14` }}
                >
                  <Users size={14} style={{ color: event.color }} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                    {t.role}
                  </p>
                  <Link
                    href={`/members/${t.memberId}/`}
                    className="text-sm font-bold text-slate-800 hover:underline underline-offset-2"
                  >
                    {t.member}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── VIDEO ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Watch</p>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">Event Video</h2>
          <div className="h-px bg-slate-100 mb-8" />

          {YOUTUBE_ID ? (
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
                title="Kalarav 2026 Event Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          ) : (
            <div
              className="w-full aspect-video rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 bg-slate-50"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: `${event.color}14`,
                  border: `1px solid ${event.color}30`,
                }}
              >
                <Play size={24} style={{ color: event.color }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-500 mb-1">Video coming soon</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  Paste YouTube video ID in YOUTUBE_ID in KalaravDetailClient.tsx
                </p>
              </div>
            </div>
          )}
        </motion.section>

        {/* ── GALLERY ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pb-16 md:pb-20"
        >
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Memories</p>
              <h2 className="text-2xl font-serif font-bold text-slate-900">Photo Gallery</h2>
            </div>
            {hasGallery ? (
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {galleryImages.length} photo{galleryImages.length === 1 ? "" : "s"}
              </span>
            ) : (
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Photos after event
              </span>
            )}
          </div>
          <div className="h-px bg-slate-100 mb-8" />

          {hasGallery ? (
            <div className="columns-2 md:columns-3 gap-3 md:gap-4">
              {galleryImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.07, duration: 0.4 }}
                  className="relative overflow-hidden rounded-2xl bg-slate-100 mb-3 md:mb-4 break-inside-avoid"
                >
                  <Image
                    src={src}
                    alt={`Kalarav 2026 — photo ${i + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 block"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {Array.from({ length: PLACEHOLDER_SLOTS }, (_, i) => `slot-${i}`).map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className={`rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 ${
                    i === 0 ? "col-span-2 aspect-video" : "aspect-square"
                  }`}
                >
                  <ImageIcon size={i === 0 ? 28 : 20} className="text-slate-200" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
                    {i === 0 ? "Photos after event" : `Photo ${i}`}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

      </div>
    </main>
  );
}
