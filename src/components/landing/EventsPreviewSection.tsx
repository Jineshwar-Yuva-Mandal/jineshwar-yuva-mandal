"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { featuredEvent } from "@/lib/events-data";

const PLACEHOLDER_CARDS = [
  { id: "tba-1", label: "Next Seva Drive", color: "#2E7D32" },
  { id: "tba-2", label: "Community Event", color: "#1565C0" },
];

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
              What&apos;s coming
            </p>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Upcoming Events</h2>
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
        <div className="grid md:grid-cols-3 gap-6">

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

              <div className="flex items-center justify-between mb-6">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                  style={{
                    color: featuredEvent.color,
                    borderColor: `${featuredEvent.color}40`,
                    backgroundColor: `${featuredEvent.color}10`,
                  }}
                >
                  <Sparkles size={9} />
                  {featuredEvent.type}
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

          {/* ── TBA placeholder cards ── */}
          {PLACEHOLDER_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className="block rounded-3xl p-8 border-2 border-dashed h-full flex flex-col justify-between"
                style={{ borderColor: `${card.color}25`, backgroundColor: `${card.color}05` }}
              >
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border mb-6"
                    style={{ color: `${card.color}99`, borderColor: `${card.color}30`, backgroundColor: `${card.color}10` }}
                  >
                    Upcoming
                  </span>
                  <h3
                    className="text-xl font-bold font-serif leading-tight mb-3"
                    style={{ color: `${card.color}80` }}
                  >
                    {card.label}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Details will be announced soon. Stay tuned!
                  </p>
                </div>
                <div className="mt-8 space-y-2">
                  <div className="flex items-center gap-2 text-xs" style={{ color: `${card.color}60` }}>
                    <Calendar size={13} />
                    TBA · 2026
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: `${card.color}60` }}>
                    <MapPin size={13} />
                    Bangalore
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
