"use client";

import { motion } from "framer-motion";
import { Heart, Star, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    label: "Seva",
    desc: "Selfless service to the community and beyond.",
    color: "#D32F2F",
  },
  {
    icon: Star,
    label: "Dharma",
    desc: "Living by righteous, time-tested Jain principles.",
    color: "#D4AF37",
  },
  {
    icon: Shield,
    label: "Sangathan",
    desc: "Strength through unity — together we are unbreakable.",
    color: "#1565C0",
  },
];

export default function AboutSection() {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* ── LEFT · Text ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">
            Who we are
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
            Rooted in Faith.
            <br />
            <span className="text-[#D4AF37]">Built for Today.</span>
          </h2>
          <p className="text-slate-500 leading-relaxed text-lg mb-5">
            Jineshwar Yuva Mandal was founded to unite the youth of the Jain
            community in Rajajinagar — preserving our values while embracing
            the future.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Over two decades, we have organised hundreds of events, supported
            countless families, and built a network of trust and dharma that
            spans across generations.
          </p>
        </motion.div>

        {/* ── RIGHT · Values ── */}
        <div className="space-y-5">
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-5 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group bg-white"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${v.color}15` }}
              >
                <v.icon size={22} style={{ color: v.color }} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-1">{v.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
