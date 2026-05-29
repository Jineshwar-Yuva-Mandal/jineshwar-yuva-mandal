"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ImageIcon } from "lucide-react";
import { pastEvents } from "@/lib/events-data";

export default function GallerySection({
  images = [],
}: Readonly<{ images?: string[] }>) {
  const hasPhotos = images.length > 0;

  return (
    <section className="py-16 md:py-32 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
              Memories
            </p>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Gallery</h2>
          </div>
          <Link
            href="/gallery/"
            className="hidden md:inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors group"
          >
            View All
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Horizontally scrollable strip */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
          {hasPhotos
            ? images.map((src, i) => (
                <Link key={src} href="/gallery/" className="flex-shrink-0 snap-start">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="relative w-52 h-44 md:w-64 md:h-52 rounded-3xl overflow-hidden bg-slate-100 group cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt={`Gallery photo ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                </Link>
              ))
            : pastEvents.map((event, i) => (
                <Link key={event.id} href="/gallery/" className="flex-shrink-0 snap-start">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                    viewport={{ once: true }}
                    className="w-52 h-44 md:w-64 md:h-52 rounded-3xl overflow-hidden relative group cursor-pointer border"
                    style={{
                      backgroundColor: `${event.color}12`,
                      borderColor: `${event.color}30`,
                    }}
                  >
                    {event.seq && (
                      <span
                        className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest opacity-40"
                        style={{ color: event.color }}
                      >
                        {event.seq}
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon size={36} style={{ color: `${event.color}30` }} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p
                        className="text-[10px] font-black uppercase tracking-wider leading-snug"
                        style={{ color: `${event.color}cc` }}
                      >
                        {event.title}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-8 md:hidden text-center">
          <Link
            href="/gallery/"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors group"
          >
            View All Photos
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
