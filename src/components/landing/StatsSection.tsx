"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Members", color: "#D4AF37" },
  { value: "20+",  label: "Years Active", color: "#D32F2F" },
  { value: "100+", label: "Events Held", color: "#2E7D32" },
  { value: "4+",   label: "Seva Drives", color: "#1565C0" },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-24 px-6 bg-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">By the numbers</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-3">A Legacy in Motion</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div
                className="text-5xl md:text-6xl font-black mb-3 tabular-nums inline-block group-hover:scale-110 transition-transform duration-300"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
