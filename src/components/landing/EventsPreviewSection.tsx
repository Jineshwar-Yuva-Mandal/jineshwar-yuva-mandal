"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { allEvents, featuredEvent } from "@/lib/events-data";

export default function EventsPreviewSection() {
  const upcomingEvent = allEvents.find((event) => !event.isPast && event.id !== featuredEvent.id);

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
              href={featuredEvent.id === "aparigraha-se-anand" ? "/aparigraha-se-anand/" : `/events/${featuredEvent.id}/`}
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
            {upcomingEvent ? (
              <Link
                href={`/events/${upcomingEvent.id}/`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative flex h-44 items-center justify-between overflow-hidden px-8" style={{ backgroundColor: `${upcomingEvent.color}12` }}>
                  <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: upcomingEvent.color }} />
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: upcomingEvent.color }}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: upcomingEvent.color }} /> Upcoming event
                    </p>
                    <h3 className="font-serif text-3xl font-bold leading-tight text-slate-900">{upcomingEvent.title}</h3>
                    <p className="mt-2 text-xs font-medium text-slate-500">{upcomingEvent.date}</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1" style={{ color: upcomingEvent.color }}>
                    <upcomingEvent.Icon size={29} strokeWidth={1.6} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-serif text-xl font-bold leading-snug text-slate-900">{upcomingEvent.subtitle}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{upcomingEvent.desc}</p>
                  <div className="mt-auto space-y-3 border-t border-slate-100 pt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2"><MapPin size={13} />{upcomingEvent.location}</span>
                    <span className="flex items-center gap-2">View event <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex h-full flex-col justify-between rounded-3xl border border-dashed border-slate-300 bg-white p-8 md:p-10">
                <div>
                  <p className="mb-5 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#548251]">
                    <Sparkles size={13} /> On the horizon
                  </p>
                  <h3 className="font-serif text-3xl font-bold leading-tight text-slate-900">The next event is being planned</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
                    There are no upcoming events announced just yet. We&apos;ll share the next gathering here.
                  </p>
                </div>
                <Link href="/events/" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-900">
                  Explore recent events <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
