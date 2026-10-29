"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Recycle } from "lucide-react";

const tickerItems = [
  "APARIGRAHA SE ANAND",
  "AROUND 700 KG HANDED OVER TO GOONJ",
  "A DIWALI ACT OF SEVA",
];

export default function AparigrahaBanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-y border-[#244b3b] bg-[#326b58] text-white">
      <Link
        href="/aparigraha-se-anand/"
        className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 sm:gap-6 sm:px-8"
      >
        <div className="flex shrink-0 items-center gap-3">
          <Recycle size={22} className="text-[#d5e4ce]" />
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/65">Recent Seva</p>
            <p className="font-serif text-xl font-bold leading-tight sm:text-2xl">~700 kg</p>
          </div>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden" aria-hidden="true">
          <motion.div
            className="flex w-max items-center"
            animate={shouldReduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={shouldReduceMotion ? undefined : { duration: 26, ease: "linear", repeat: Infinity }}
          >
            {[0, 1].map((copy) => (
              <span key={copy} className="flex shrink-0 items-center">
                {tickerItems.map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center gap-5 px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 sm:text-xs">
                    {item}<span className="text-[#d5e4ce]">✳</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>

        <span className="sr-only">Around 700 kilograms of reusable items handed over to Goonj. Read the story.</span>
        <span className="flex shrink-0 items-center gap-2 text-xs font-bold sm:text-sm">
          <span className="hidden sm:inline">Read the story</span><ArrowRight size={17} />
        </span>
      </Link>
    </section>
  );
}