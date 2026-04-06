"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const placeholders = [
  { label: "Mahavir Jayanti 2025", color: "#FFD700" },
  { label: "Blood Donation Camp",  color: "#D32F2F" },
  { label: "Annual Sports Day",    color: "#2E7D32" },
  { label: "Diwali Celebration",   color: "#EF6C00" },
  { label: "Youth Trek 2024",      color: "#1565C0" },
  { label: "Community Seminar",    color: "#7B1FA2" },
];

export default function GallerySection() {
  return (
    <section className="py-32 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
            Memories
          </p>
          <h2 className="text-4xl font-serif font-bold text-slate-900">Gallery</h2>
        </motion.div>

        {/* Horizontally scrollable strip */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6">
          {placeholders.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-64 h-48 md:w-80 md:h-60 rounded-3xl overflow-hidden relative group cursor-pointer snap-start border"
              style={{
                backgroundColor: `${item.color}12`,
                borderColor: `${item.color}30`,
              }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <ImageIcon size={36} style={{ color: `${item.color}55` }} />
                <p
                  className="text-[10px] font-bold uppercase tracking-wider text-center px-6 leading-relaxed"
                  style={{ color: `${item.color}90` }}
                >
                  {item.label}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  Photos Coming Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
