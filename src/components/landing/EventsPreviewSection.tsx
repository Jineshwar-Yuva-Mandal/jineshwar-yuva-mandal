"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { featuredEvent } from "@/lib/events-data";

export default function EventsPreviewSection() {
  return (
    <section className="py-16 md:py-32 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
              Event spotlight
            </p>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Featured & Upcoming</h2>
          </div>
          <Link
            href="/events/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Event cards */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* ── Featured real event ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/events/${featuredEvent.id}/`}
              className="group block bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden"
            >
              {/* Spotlight glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-2xl pointer-events-none"
                style={{ backgroundColor: featuredEvent.color }}
              />

              <div className="mb-6 flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest"
                  style={{
                    color: featuredEvent.color,
                    borderColor: `${featuredEvent.color}40`,
                    backgroundColor: `${featuredEvent.color}10`,
                  }}
                >
                  <Sparkles size={9} />
                  Featured · {featuredEvent.type}
                </span>
                <ArrowRight
                  size={16}
                  className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-serif leading-tight mb-5 group-hover:text-[#D4AF37] transition-colors">
                {featuredEvent.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-2">
                {featuredEvent.desc}
              </p>

              <div className="space-y-2 text-slate-400 text-xs">
                <div className="flex items-center gap-2"><Calendar size={13} />{featuredEvent.date}</div>
                <div className="flex items-center gap-2"><MapPin size={13} />{featuredEvent.location}</div>
              </div>

              <div
                className="mt-6 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: featuredEvent.color }}
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/events/#upcoming-events"
              className="group block h-full overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative flex h-44 items-center justify-between overflow-hidden bg-[#f0f4ed] px-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#548251_0_45%,#d4af37_45%_70%,#b54736_70%)]" />
                <div>
                  <p className="mb-3 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#548251]">
                    <span className="h-2 w-2 rounded-full bg-[#548251]" /> Upcoming Sangh Yatra
                  </p>
                  <h3 className="font-serif text-4xl font-bold leading-none text-slate-900">Chennai</h3>
                  <p className="mt-2 text-xs font-medium text-slate-500">A journey for darshan</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white text-[#548251] shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                  <MapPin size={29} strokeWidth={1.6} />
                </div>
              </div>
              <div className="flex h-[calc(100%-11rem)] flex-col p-8">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Darshan of</p>
                <h3 className="font-serif text-xl font-bold leading-snug text-slate-900">Shri Shruth Muni Ji M.S.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Jineshwar Yuva Mandal is taking a Sangh to Chennai for darshan.
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><MapPin size={13} className="text-[#548251]" /> Chennai</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
