"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, MapPin, Trophy } from "lucide-react";
import type { SerializableEventItem } from "@/lib/events-data";

const winners = [
  { place: "First Place", name: "Ruchika ji Golecha", adhyayan: "35th Adhyayan", rank: "01", color: "#C48A2C" },
  { place: "Second Place", name: "Sanya ji Jain and Neha ji Lunawat", adhyayan: "24th Adhyayan", rank: "02", color: "#718096" },
  { place: "Third Place", name: "Payal ji Kataria", adhyayan: "26th Adhyayan", rank: "03", color: "#A96B45" },
];

type Props = Readonly<{
  event: SerializableEventItem;
  coverImage: string | null;
}>;

export default function ShattarangDetailClient({ event, coverImage }: Props) {
  return (
    <main className="min-h-screen bg-white pb-32 md:pb-40">
      <section className="relative h-[60vh] w-full overflow-hidden bg-[#142033] md:h-[70vh]">
        {coverImage && (
          <Image src={coverImage} alt={`${event.title} cover`} fill priority className="object-cover" />
        )}
        <div className={`absolute inset-0 ${coverImage ? "bg-slate-900/55" : "bg-slate-900/70"}`} />
        {coverImage && (
          <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(to top, ${event.color}80 0%, transparent 60%)` }} />
        )}

        <div className="absolute left-0 top-0 z-20 w-full px-6 pt-24 md:px-12 md:pt-28">
          <Link href="/events/" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white">
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            Back to Events
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 z-10 w-full px-6 pb-10 md:px-12 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex flex-wrap items-center gap-3"
          >
            <span className="rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-widest" style={{ color: event.color, backgroundColor: `${event.color}28`, border: `1px solid ${event.color}50` }}>
              {event.type}
            </span>
            {event.isPast && (
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white/50">Completed</span>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-2 font-serif text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            {event.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-5 text-sm font-black uppercase tracking-widest"
            style={{ color: event.color }}
          >
            {event.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-white/45"
          >
            <span className="flex items-center gap-2"><Calendar size={12} />{event.date}</span>
            <span className="flex items-center gap-2"><MapPin size={12} />{event.location}</span>
            <span className="flex items-center gap-2"><BookOpen size={12} />Shri Uttaradhyayan Sutra</span>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 md:py-16"
        >
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">About this event</p>
          <div className="mb-8 h-px bg-slate-100" />
          <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">
            <div className="max-w-3xl flex-1">
              <h2 className="mb-4 font-serif text-2xl font-bold text-slate-900">One Adhyayan, Many Colours</h2>
              <p className="text-lg leading-loose text-slate-600">
                Participants chose one of the 36 adhyayans of Shri Uttaradhyayan Sutra and beautifully depicted its teachings on chart paper. Eighteen adhyayans were brought to life through their creativity.
              </p>
            </div>
            {coverImage && (
              <div className="relative mx-auto aspect-square w-full max-w-56 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm md:mx-0 md:w-48 md:max-w-none">
                <Image
                  src={coverImage}
                  alt="Shattarang event cover"
                  fill
                  sizes="(max-width: 768px) 224px, 192px"
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pb-16 md:pb-20"
        >
          <p className="mb-1 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Competition Results</p>
          <h2 className="mb-3 font-serif text-2xl font-bold text-slate-900">Top Three Entries</h2>
          <div className="mb-2 h-px bg-slate-100" />
          <div className="divide-y divide-slate-100">
            {winners.map((winner, index) => (
              <motion.article
                key={winner.rank}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="grid grid-cols-[52px_1fr] items-center gap-4 py-6 md:grid-cols-[64px_1fr_auto] md:gap-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border text-sm font-black" style={{ color: winner.color, borderColor: `${winner.color}55`, backgroundColor: `${winner.color}10` }}>
                  {winner.rank}
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: winner.color }}>{winner.place}</p>
                  <h3 className="break-words text-lg font-bold leading-snug text-slate-900 md:text-xl">{winner.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{winner.adhyayan}</p>
                </div>
                <Trophy size={19} className="hidden md:block" style={{ color: winner.color }} />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl border-t border-slate-100 py-12 text-center"
        >
          <p className="font-serif text-xl leading-9 text-slate-900 md:text-2xl">
            Congratulations to all the winners, and heartfelt thanks to every participant.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            Your knowledge, creativity, and dedication made Shattarang a success.
          </p>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Jineshwar Yuva Mandal <span className="mx-2 text-slate-300">·</span> Rajajinagar, Bengaluru
          </p>
        </motion.section>
      </div>
    </main>
  );
}