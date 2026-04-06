"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, CalendarPlus, ArrowRight } from "lucide-react";

export default function SupportSection() {
  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
            Support the Mission
          </p>
          <h2 className="text-4xl font-serif font-bold text-slate-900">
            Be Part of What We Build
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            You don&apos;t have to be a member to make a difference. Donate, collaborate, or simply spread the word.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {/* ── CARD 1: Donate ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col"
          >
            <div className="p-8 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center mb-5">
                <HeartHandshake size={22} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif mb-3">Donate to the Mandal</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Your contribution directly funds seva stalls, religious events, youth programmes, and community activities. Every rupee strengthens the Sangh.
              </p>

              {/* UPI QR */}
              <div className="flex flex-col items-center gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <Image
                    src="/images/jym-upi-qr.jpeg"
                    alt="JYM UPI QR Code"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Scan &amp; Pay</p>
                  <p className="text-slate-700 font-bold text-sm">UPI · Any app</p>
                  <p className="text-slate-400 text-xs mt-1">Jineshwar Yuva Mandal · Rajajinagar</p>
                </div>
              </div>
            </div>
            <div className="h-1 w-full bg-[#D4AF37]" />
          </motion.div>

          {/* ── CARD 2: Partner / Collaborate ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Host an event */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 flex-1 flex flex-col group hover:shadow-xl transition-all duration-300 overflow-hidden relative">
              <div className="w-12 h-12 rounded-2xl bg-[#D32F2F]/10 flex items-center justify-center mb-5">
                <CalendarPlus size={22} className="text-[#D32F2F]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif mb-3">Co-host an Event</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                Want to organise a religious gathering, sports day, cultural programme, or community drive with us? We bring the youth, the energy, and the seva. You bring the vision.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-800 hover:text-[#D32F2F] transition-colors group/link"
              >
                Reach Out
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D32F2F] group-hover:w-full transition-all duration-500" />
            </div>

            {/* Sponsor / Collaborate */}
            <div className="bg-slate-900 rounded-3xl p-8 flex-1 flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#D4AF3718,_transparent_60%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Collaborate</p>
                <h3 className="text-xl font-bold text-white font-serif mb-3">Sponsor &amp; Partner With Us</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                  Businesses, organisations, and individuals who share our values are welcome to partner with us — sponsor an event, provide resources, or lend your platform to amplify the Sangh&apos;s work.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex self-start items-center gap-2 px-6 py-3 bg-[#D4AF37] text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:bg-yellow-300 transition-colors group/btn"
                >
                  Let&apos;s Talk
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
