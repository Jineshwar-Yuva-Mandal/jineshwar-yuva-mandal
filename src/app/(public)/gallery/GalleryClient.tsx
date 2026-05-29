"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import { X, ZoomIn } from "lucide-react";
import type { GalleryAlbum } from "./page";

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({
  src,
  onClose,
}: Readonly<{ src: string; onClose: () => void }>) {
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
          alt="Gallery image"
          width={1200}
          height={800}
          className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PLACEHOLDER TILE
───────────────────────────────────────────── */
function PlaceholderTile({ color }: Readonly<{ color: string }>) {
  return (
    <div
      className="aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 select-none"
      style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}
    >
      <ZoomIn size={22} style={{ color: `${color}50` }} />
      <p
        className="text-[9px] font-bold uppercase tracking-widest"
        style={{ color: `${color}60` }}
      >
        Coming soon
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE CLIENT
───────────────────────────────────────────── */
export default function GalleryClient({
  albums,
}: Readonly<{ albums: GalleryAlbum[] }>) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<string>("all");

  const visibleAlbums =
    activeAlbum === "all"
      ? albums
      : albums.filter((a) => a.id === activeAlbum);

  return (
    <main className="bg-white min-h-screen pb-32">
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
                <div
                  className="w-1.5 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: album.color }}
                />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{album.label}</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{album.sublabel}</p>
                </div>
                {album.images.length > 0 && (
                  <span className="ml-auto text-xs font-bold uppercase tracking-widest text-slate-400">
                    {album.images.length} photo{album.images.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>

              {/* Masonry grid */}
              {album.images.length > 0 ? (
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
                  {album.images.map((src, ii) => (
                    <motion.button
                      key={src}
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (ii % 10) * 0.04, duration: 0.4 }}
                      viewport={{ once: true }}
                      onClick={() => setLightbox(src)}
                      className="group relative overflow-hidden rounded-2xl bg-slate-100 mb-3 break-inside-avoid block w-full"
                      aria-label={`Photo ${ii + 1} from ${album.label}`}
                    >
                      <Image
                        src={src}
                        alt={`${album.label} — photo ${ii + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn
                          size={24}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {Array.from({ length: 5 }).map((_, pi) => (
                    <PlaceholderTile
                      key={`${album.id}-placeholder-${pi}`}
                      color={album.color}
                    />
                  ))}
                </div>
              )}
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
          <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
