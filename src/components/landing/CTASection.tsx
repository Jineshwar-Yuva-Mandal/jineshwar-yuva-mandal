"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] md:rounded-[3rem] bg-slate-900 overflow-hidden p-8 md:p-20 text-center"
        >
          {/* Radial gradient accents */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#D4AF3720,_transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#D32F2F15,_transparent_55%)] pointer-events-none" />

          <div className="relative z-10">
            <UserPlus className="w-12 h-12 text-[#D4AF37] mx-auto mb-8 opacity-80" />

            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Be Part of the <br />
              <span className="text-[#D4AF37]">Sangh</span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Join hundreds of young Jains in Rajajinagar. Attend events,
              access the directory, and strengthen your bond with the community.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-slate-900 rounded-full font-black text-sm uppercase tracking-widest hover:bg-yellow-300 transition-colors group"
              >
                Contact the Sangh
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-3 px-8 py-4 border border-slate-700 text-slate-300 rounded-full font-bold text-sm uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
