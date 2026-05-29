"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Camera, ImageIcon } from "lucide-react";
import { iconMap, type SerializableEventItem } from "@/lib/events-data";

const PLACEHOLDER_SLOTS = 6;

type Props = {
  event: SerializableEventItem;
  coverImage: string | null;
  galleryImages: string[];
};

export default function EventDetailClient({ event, coverImage, galleryImages }: Props) {
  const hasGallery = galleryImages.length > 0;
  const Icon = iconMap[event.iconName];

  return (
    <main className="bg-white min-h-screen pb-32 md:pb-40">

      {/* ── HERO ── */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">

        {/* Background: real cover OR coloured gradient */}
        {coverImage ? (
          <Image
            src={coverImage}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(160deg, ${event.color}30 0%, #0f172a 80%)` }}
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

        {/* Dark overlay */}
        <div className={`absolute inset-0 ${coverImage ? "bg-slate-900/55" : "bg-slate-900/70"}`} />

        {/* Colour tint at base when photo present */}
        {coverImage && (
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(to top, ${event.color}80 0%, transparent 60%)` }}
          />
        )}

        {/* Back link — pushed below the fixed navbar */}
        <div className="absolute top-0 left-0 w-full z-20 pt-24 md:pt-28 px-6 md:px-12">
          <Link
            href="/events/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>
        </div>

        {/* Hero text — bottom left */}
        <div className="absolute bottom-0 left-0 w-full z-10 px-6 md:px-12 pb-10 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <span
              className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest"
              style={{ color: event.color, backgroundColor: `${event.color}28`, border: `1px solid ${event.color}50` }}
            >
              {event.type}
            </span>
            {event.isPast && (
              <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/10 text-white/50">
                Completed
              </span>
            )}
            {event.isFeatured && (
              <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Upcoming
              </span>
            )}
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

        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 md:py-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">About this event</p>
          <div className="h-px bg-slate-100 mb-8" />
          <p className="text-slate-600 text-lg md:text-xl leading-loose max-w-3xl">
            {event.desc}
          </p>
        </motion.section>

        {/* Gallery */}
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
              <div className="flex items-center gap-1.5 text-slate-300">
                <Camera size={13} />
                <span className="text-xs font-bold uppercase tracking-widest">Photos coming soon</span>
              </div>
            )}
          </div>

          <div className="h-px bg-slate-100 mb-8" />

          {hasGallery ? (
            /* ── Real photos — masonry columns so no gap below tall images ── */
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
                    alt={`${event.title} — photo ${i + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 block"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            /* ── Placeholders ── */
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
                    {i === 0 ? "Cover photo" : `Photo ${i}`}
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
