"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import { X, ZoomIn } from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
   Drop your image paths into the `src` field.
   Images should live in /public/images/gallery/
───────────────────────────────────────────── */
const albums = [
  {
    id: "mj-2026",
    label: "Mahaveer Jayanti 2026",
    sublabel: "Sheetal Rose Water Seva · Freedom Park",
    color: "#D4AF37",
    images: [
      // e.g. { src: "/images/gallery/mj2026-01.jpg", caption: "Rose water stall" },
    ] as { src: string; caption?: string }[],
  },
  {
    id: "mj-2025",
    label: "Mahaveer Jayanti 2025",
    sublabel: "Shudh Sheetal Jal Seva · Freedom Park",
    color: "#1565C0",
    images: [] as { src: string; caption?: string }[],
  },
  {
    id: "mj-2024",
    label: "Mahaveer Jayanti 2024",
    sublabel: "Swachhata Sainani · Freedom Park",
    color: "#2E7D32",
    images: [] as { src: string; caption?: string }[],
  },
  {
    id: "dpl",
    label: "Dharmic Premier League",
    sublabel: "Season 1",
    color: "#7B1FA2",
    images: [] as { src: string; caption?: string }[],
  },
  {
    id: "misc",
    label: "Mandal Moments",
    sublabel: "Events, gatherings & memories",
    color: "#D32F2F",
    images: [] as { src: string; caption?: string }[],
  },
];

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({
  src,
  caption,
  onClose,
}: {
  src: string;
  caption?: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        aria-label="Close lightbox"
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-4xl w-full max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={caption ?? "Gallery image"}
          width={1200}
          height={800}
          className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
        />
        {caption && (
          <p className="text-center text-white/60 text-sm mt-4">{caption}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PLACEHOLDER TILE (shown when no image yet)
───────────────────────────────────────────── */
function PlaceholderTile({ color }: { color: string }) {
  return (
    <div
      className="aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 select-none"
      style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
    >
      <ZoomIn size={22} style={{ color: `${color}50` }} />
      <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: `${color}60` }}>
        Coming soon
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ src: string; caption?: string } | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<string>("all");

  const visibleAlbums =
    activeAlbum === "all"
      ? albums
      : albums.filter((a) => a.id === activeAlbum);

  return (
    <main className="bg-white min-h-screen pb-24">
      <PageHeader title="GALLERY" subtitle="Moments that Matter" />

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* ── Album filter pills ── */}
        <div className="flex flex-wrap gap-3 mb-8 md:mb-14">
          <button
            onClick={() => setActiveAlbum("all")}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
              activeAlbum === "all"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
            }`}
          >
            All Albums
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setActiveAlbum(album.id)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                activeAlbum === album.id
                  ? "text-white border-transparent"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              }`}
              style={
                activeAlbum === album.id
                  ? { backgroundColor: album.color, borderColor: album.color }
                  : {}
              }
            >
              {album.label}
            </button>
          ))}
        </div>

        {/* ── Albums ── */}
        <div className="space-y-20">
          {visibleAlbums.map((album, ai) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: ai * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Album header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: album.color }} />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{album.label}</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{album.sublabel}</p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {album.images.length > 0
                  ? album.images.map((img, ii) => (
                      <motion.button
                        key={`${album.id}-img-${img.src}`}
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: ii * 0.04, duration: 0.4 }}
                        viewport={{ once: true }}
                        onClick={() => setLightbox(img)}
                        className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100"
                        aria-label={img.caption ?? `Gallery photo ${ii + 1}`}
                      >
                        <Image
                          src={img.src}
                          alt={img.caption ?? `${album.label} photo ${ii + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <ZoomIn
                            size={24}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </motion.button>
                    ))
                  : /* Show 5 placeholder tiles when album is empty */
                    Array.from({ length: 5 }).map((_, pi) => (
                      <PlaceholderTile key={`${album.id}-placeholder-${pi}`} color={album.color} />
                    ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Upload note ── */}
        <div className="mt-20 text-center">
          <div className="h-px bg-slate-100 mb-8" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
            Photos are added after each event
          </p>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            caption={lightbox.caption}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
