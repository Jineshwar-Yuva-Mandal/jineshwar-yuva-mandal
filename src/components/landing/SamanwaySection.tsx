"use client";

import { motion } from "framer-motion";
import { Bell, QrCode, Users, Landmark, ArrowRight } from "lucide-react";

const features = [
  { icon: Bell,     text: "Real-time event notifications & RSVP" },
  { icon: QrCode,   text: "Digital entry pass for all events" },
  { icon: Users,    text: "Full member directory at your fingertips" },
  { icon: Landmark, text: "Transparent treasury & donation tracking" },
];

// Fake app-screen rows for the phone mockup
const mockStats = [
  ["Members", "512"],
  ["Events",  "3"],
  ["Since",   "2004"],
];

export default function SamanwaySection() {
  return (
    <section className="relative py-16 md:py-32 px-6 bg-white overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-yellow-50/40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">
            Digital Offering
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── LEFT · Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-2">
              Samanway
            </h2>
            <p className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-sm mb-6">
              समन्वय — Coordination
            </p>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-md">
              Your Mandal, in your pocket. One app for events, members,
              treasury, and community — seamlessly connected.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 text-slate-700"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <f.icon size={16} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-sm font-medium">{f.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://samanvaybyjym.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-[#D4AF37] hover:text-slate-900 transition-colors group"
              >
                Open Samanvay
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT · Phone Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-orange-200/10 blur-3xl rounded-full scale-150 pointer-events-none" />

              {/* Phone shell */}
              <div className="relative w-64 h-[520px] bg-slate-900 rounded-[3.5rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-full z-10" />

                {/* App screen */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col">
                  {/* Status-bar spacer */}
                  <div className="h-12" />

                  {/* App header */}
                  <div className="px-5 pt-2 pb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Good Morning</p>
                      <p className="text-white font-bold text-sm">Rahul Jain 🙏</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                      <Bell size={12} className="text-[#D4AF37]" />
                    </div>
                  </div>

                  {/* Event card */}
                  <div className="mx-4 bg-[#D4AF37] rounded-2xl p-4 mb-3">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-yellow-900 mb-1">Next Event</p>
                    <p className="text-slate-900 font-black text-xs leading-tight">Mahavir Jayanti Mahotsav</p>
                    <p className="text-yellow-800 text-[9px] mt-1">April 21 · Rajajinagar</p>
                    <div className="mt-2">
                      <span className="px-2 py-0.5 bg-slate-900 rounded-full text-[7px] font-bold text-[#D4AF37]">
                        RSVP ›
                      </span>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="mx-4 grid grid-cols-3 gap-2 mb-4">
                    {mockStats.map(([label, val]) => (
                      <div key={label} className="bg-slate-800 rounded-xl p-2 text-center">
                        <p className="text-white font-black text-sm">{val}</p>
                        <p className="text-slate-500 text-[7px] font-bold uppercase">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="mx-4 h-px bg-slate-800 mb-4" />

                  {/* Mini menu items */}
                  <div className="mx-4 space-y-2">
                    {["Business Directory", "Treasury Ledger", "Member Chat"].map((item) => (
                      <div key={item} className="flex items-center justify-between bg-slate-800/60 rounded-xl px-3 py-2">
                        <p className="text-slate-400 text-[9px] font-bold">{item}</p>
                        <div className="w-3 h-3 rounded-full bg-slate-700" />
                      </div>
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 px-6 py-3 flex justify-around">
                    {["Home", "Events", "Members", "Account"].map((item, idx) => (
                      <div key={item} className="flex flex-col items-center gap-0.5">
                        <div className={`w-4 h-1 rounded-full ${idx === 0 ? "bg-[#D4AF37]" : "bg-slate-700"}`} />
                        <p className="text-[6px] font-bold" style={{ color: idx === 0 ? "#D4AF37" : "#64748b" }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Label below phone */}
              <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Samanway App
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
