"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import { Calendar, MapPin, ImageIcon, Droplets, Flower2, Trash2, Trophy } from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const upcoming = [
  {
    id: "mj-2026",
    title: "Mahaveer Jayanti 2026",
    subtitle: "Sheetal Rose Water Seva",
    date: "April 21, 2026",
    location: "Freedom Park, Bangalore",
    type: "Seva",
    color: "#D4AF37",
    sevaIcon: Flower2,
    desc: "This year the Mandal sets up a Sheetal Rose Water seva stall at Freedom Park — offering fragrant, cooling rose water to thousands of devotees amid the fervour of Mahaveer Jayanti. A small gesture that leaves a lasting impression of compassion and service.",
  },
  {
    id: "dpl",
    title: "Dharmic Premier League",
    subtitle: "Season 1",
    date: "Coming Soon · 2026",
    location: "Rajajinagar, Bangalore",
    type: "Special",
    color: "#7B1FA2",
    sevaIcon: Trophy,
    desc: "Think IPL, but for the soul. Dharmic Premier League is our flagship innovation — teams compete not with bat and ball alone, but through knowledge of Jain scripture, Dharmic quizzes, cultural performances, and sportsmanship. A festival where learning meets the thrill of competition.",
  },
  {
    id: "blood",
    title: "Mega Blood Donation Drive",
    subtitle: "Saving Lives, One Drop at a Time",
    date: "May 10, 2026",
    location: "Community Hall, Rajajinagar",
    type: "Seva",
    color: "#D32F2F",
    sevaIcon: Droplets,
    desc: "The Mandal organises a large-scale blood donation camp in partnership with local hospitals, encouraging youth to give the most precious gift — life itself. Every donation saves up to three lives.",
  },
];

const past = [
  {
    id: "mj-2025",
    title: "Mahaveer Jayanti 2025",
    subtitle: "Shudh Sheetal Jal Seva",
    date: "April 14, 2025",
    location: "Freedom Park, Bangalore",
    type: "Seva",
    color: "#1565C0",
    sevaIcon: Droplets,
    desc: "Our members manned a Shudh Sheetal Jal seva stall through the entire day — offering pure, chilled drinking water to tens of thousands of devotees who had gathered at Freedom Park. In the Bangalore April heat, this act of service embodied the essence of Parasparopagraho Jivanam.",
  },
  {
    id: "mj-2024",
    title: "Mahaveer Jayanti 2024",
    subtitle: "Swachhata Sainani",
    date: "April 21, 2024",
    location: "Freedom Park, Bangalore",
    type: "Seva",
    color: "#2E7D32",
    sevaIcon: Trash2,
    desc: "In 2024 the Mandal took on the role of Swachhata Sainanis — volunteers dedicated to ensuring that the sanctity of the celebration was preserved. Our team moved through the crowds with bins and bags, making sure the grand gathering concluded as cleanly as it began. The serenity of Mahaveer Jayanti was upheld, and the grounds were left spotless.",
  },
];

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
function EventCard({
  event,
  index,
  isPast = false,
}: {
  event: (typeof upcoming)[0];
  index: number;
  isPast?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className={`group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-400 flex flex-col ${isPast ? "opacity-90" : ""}`}
    >
      {/* Image area */}
      <div className="relative h-52 flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${event.color}0d` }}>
        <ImageIcon size={40} style={{ color: `${event.color}40` }} />

        {/* Seva icon watermark */}
        <event.sevaIcon
          size={120}
          className="absolute -right-4 -bottom-4 opacity-[0.06]"
          style={{ color: event.color }}
        />

        {/* Type badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border"
          style={{ color: event.color, borderColor: `${event.color}40`, backgroundColor: `${event.color}12` }}
        >
          {event.type}
        </div>

        {isPast && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-900/70 text-slate-300">
            Past
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
          <Calendar size={12} />
          <span>{event.date}</span>
        </div>

        <h3
          className="text-xl font-serif font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors"
        >
          {event.title}
        </h3>
        <p className="text-[11px] font-black uppercase tracking-widest mb-4" style={{ color: event.color }}>
          {event.subtitle}
        </p>

        <div className="flex items-start gap-2 text-slate-400 text-xs mb-5">
          <MapPin size={13} className="mt-0.5 flex-shrink-0" />
          <span>{event.location}</span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed flex-1">
          {event.desc}
        </p>
      </div>

      {/* Bottom colour bar */}
      <div className="h-1 w-full" style={{ backgroundColor: event.color }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function EventsPage() {
  return (
    <main className="bg-white min-h-screen pb-24">
      <PageHeader title="EVENTS" subtitle="Service · Spirit · Community" />

      {/* ── UPCOMING ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">On the horizon</p>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Upcoming Events</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {upcoming.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* ── PAST HIGHLIGHTS ── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Where we&apos;ve been</p>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Past Highlights</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-7">
            {past.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} isPast />
            ))}
          </div>
        </div>
      </section>

      {/* ── FREEDOM PARK NOTE ── */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
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
