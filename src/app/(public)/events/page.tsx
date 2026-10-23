"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { Camera, Star, Sparkles, Calendar, MapPin } from "lucide-react";
import { featuredEvent as featured, pastEvents, type EventItem } from "@/lib/events-data";

/* ─────────────────────────────────────────────
  FEATURED CARD
───────────────────────────────────────────── */
function FeaturedCard({ event }: Readonly<{ event: EventItem }>) {
  return (
    <Link href={`/events/${event.id}`} className="block">
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="group relative bg-slate-900 rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{ background: `radial-gradient(ellipse at 70% 50%, ${event.color} 0%, transparent 65%)` }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-0">
        {/* Left: content */}
        <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
          {/* Badge row */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest"
              style={{ color: event.color, backgroundColor: `${event.color}20`, border: `1px solid ${event.color}40` }}
            >
              <Star size={9} fill="currentColor" /> {event.type}
            </span>
            <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/10 text-white/60">
              {event.subtitle}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4 group-hover:text-sky-300 transition-colors duration-300">
            {event.title}
          </h2>

          <p className="text-white/60 text-sm leading-relaxed max-w-lg mb-8">
            {event.desc}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-white/40 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar size={12} />{event.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={12} />{event.location}
            </span>
          </div>
        </div>

        {/* Right: decorative icon panel */}
        <div
          className="lg:w-72 h-52 lg:h-auto flex items-center justify-center relative overflow-hidden flex-shrink-0"
          style={{ backgroundColor: `${event.color}15` }}
        >
          <event.Icon
            size={160}
            className="opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-500"
            style={{ color: event.color }}
          />
          <event.Icon
            size={64}
            className="absolute opacity-80 group-hover:scale-110 transition-transform duration-300"
            style={{ color: event.color }}
          />
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   PLACEHOLDER CARD
───────────────────────────────────────────── */
function PlaceholderCard({ index }: Readonly<{ index: number }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true }}
      className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col overflow-hidden"
    >
      {/* Top visual area */}
      <div className="h-44 bg-slate-50 flex flex-col items-center justify-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center">
          <Sparkles size={22} className="text-slate-300" />
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Coming Soon</span>
      </div>

      {/* Content area */}
      <div className="p-7 flex flex-col flex-1 justify-center">
        <div className="h-3 w-24 bg-slate-100 rounded-full mb-3" />
        <div className="h-5 w-40 bg-slate-100 rounded-full mb-2" />
        <div className="h-3 w-32 bg-slate-100 rounded-full mb-6" />
        <div className="space-y-2">
          <div className="h-2.5 w-full bg-slate-100 rounded-full" />
          <div className="h-2.5 w-5/6 bg-slate-100 rounded-full" />
          <div className="h-2.5 w-4/6 bg-slate-100 rounded-full" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-6">
          Announcement awaited
        </p>
      </div>
    </motion.div>
  );
}

function ChennaiDarshanCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative flex h-44 items-center justify-between overflow-hidden bg-[#f0f4ed] px-7">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#548251_0_45%,#d4af37_45%_70%,#b54736_70%)]" />
        <div>
          <p className="mb-3 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#548251]">
            <span className="h-2 w-2 rounded-full bg-[#548251]" /> Upcoming Sangh Yatra
          </p>
          <h3 className="font-serif text-4xl font-bold leading-none text-slate-900">Chennai</h3>
          <p className="mt-2 text-xs font-medium text-slate-500">A journey for darshan</p>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white bg-white text-[#548251] shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
          <MapPin size={34} strokeWidth={1.6} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Darshan of
        </p>
        <h4 className="font-serif text-xl font-bold leading-snug text-slate-900">
          Shri Shruth Muni Ji M.S.
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Jineshwar Yuva Mandal is taking a Sangh to Chennai for darshan of Shri Shruth Muni Ji M.S.
        </p>
        <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <MapPin size={13} className="text-[#548251]" /> Chennai
        </div>
      </div>
      <div className="h-1 w-full bg-[#548251]" />
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   PAST EVENT CARD
───────────────────────────────────────────── */
function PastCard({ event, index }: Readonly<{ event: EventItem; index: number }>) {
  return (
    <Link href={`/events/${event.id}`} className="block flex flex-col h-full">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 3) * 0.12, duration: 0.6 }}
      viewport={{ once: true }}
      className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Photo area */}
      <div
        className="relative h-44 flex flex-col items-center justify-center overflow-hidden"
        style={!event.coverImage ? { background: `linear-gradient(135deg, ${event.color}1a 0%, ${event.color}08 100%)` } : undefined}
      >
        {event.coverImage ? (
          <>
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/30 to-transparent" />
          </>
        ) : (
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-1"
            style={{ backgroundColor: `${event.color}18`, border: `1.5px solid ${event.color}30` }}
          >
            <event.Icon size={28} style={{ color: event.color }} />
          </div>
        )}

        {/* Type badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
          style={{
            color: event.coverImage ? "#fff" : event.color,
            backgroundColor: event.coverImage ? "rgba(15, 23, 42, 0.68)" : `${event.color}15`,
            border: event.coverImage ? "1px solid rgba(255,255,255,0.18)" : `1px solid ${event.color}30`,
          }}
        >
          {event.type}
        </div>

        {/* Camera / photos hint */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100">
          <Camera size={10} className="text-slate-400" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            {event.coverImage ? "View event" : "Photos soon"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
          <Calendar size={11} />
          <span>{event.date}</span>
        </div>
        <h3 className="text-lg font-serif font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors">
          {event.title}
        </h3>
        <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: event.color }}>
          {event.subtitle}
        </p>
        <div className="flex items-start gap-2 text-slate-400 text-xs mb-4">
          <MapPin size={12} className="mt-0.5 flex-shrink-0" />
          <span>{event.location}</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">{event.desc}</p>
      </div>

      <div className="h-1 w-full" style={{ backgroundColor: event.color }} />
    </motion.div>
    </Link>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function EventsPage() {
  return (
    <main className="bg-white min-h-screen pb-24">
      <PageHeader title="EVENTS" subtitle="Service · Spirit · Community" />

      {/* ── FEATURED SPOTLIGHT ── */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-4 md:px-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Spotlight</p>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Highlighted Event</h2>
        </motion.div>
        <FeaturedCard event={featured} />
      </section>

      {/* ── UPCOMING ── */}
      <section id="upcoming-events" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-10 md:px-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">On the horizon</p>
          <h2 className="text-3xl font-serif font-bold text-slate-900">More Upcoming Events</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          <ChennaiDarshanCard />
          <PlaceholderCard index={0} />
        </div>
      </section>

      {/* ── CHRONICLE ── */}
      <section className="bg-slate-50 py-12 md:py-20 px-6">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Our journey so far</p>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Chronicle of Events</h2>
            </div>
            <p className="text-sm text-slate-400 max-w-xs md:text-right leading-relaxed">
              Since 2022 &middot; {pastEvents.length} events completed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {pastEvents.map((event, i) => (
              <PastCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADITION NOTE ── */}
      <section className="max-w-3xl mx-auto px-6 py-10 md:py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-px bg-slate-100 mb-10" />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
            A Tradition of Seva
          </p>
          <p className="text-slate-500 leading-relaxed">
            Every year on Mahaveer Jayanti, Jineshwar Yuva Mandal is present at{" "}
            <span className="font-bold text-slate-700">Freedom Park, Bangalore</span> — one of
            the city&apos;s largest Jain gatherings. Year after year, our seva changes form but our
            commitment never does. Whether offering water, rose water, or keeping the grounds
            clean and serene, we show up — because{" "}
            <em className="text-slate-700">Parasparopagraho Jivanam</em>.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
