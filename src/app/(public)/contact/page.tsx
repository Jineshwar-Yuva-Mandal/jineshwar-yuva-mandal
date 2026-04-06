"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, HeartHandshake, CalendarPlus, ArrowRight } from "lucide-react";

const leaders = [
  {
    name: "Praneet Jain",
    role: "Adhyaksh",
    roleEn: "President",
    phone: "+91 97908 41661",
    email: "",
    color: "#D4AF37",
  },
  {
    name: "Deepak Khivasra",
    role: "Mantri",
    roleEn: "Secretary",
    phone: "+91 63627 85272",
    email: "",
    color: "#D32F2F",
  },
  {
    name: "Pritesh Kataria",
    role: "Koshadhyaksh",
    roleEn: "Treasurer",
    phone: "",
    email: "",
    color: "#2E7D32",
  },
  {
    name: "Vishal Gandhi",
    role: "Purv Adhyaksh",
    roleEn: "Past President",
    phone: "+91 63609 70041",
    email: "",
    color: "#1565C0",
  },
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Rajajinagar Jain Stanak, Bengaluru – 560010",
    color: "#D4AF37",
  },
  {
    icon: Phone,
    label: "General Enquiry",
    value: "+91 63627 85272",
    href: "tel:+916362785272",
    color: "#2E7D32",
  },
  {
    icon: Mail,
    label: "Email",
    value: "jym.rajajinagar@gmail.com",
    href: "mailto:jym.rajajinagar@gmail.com",
    color: "#1565C0",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Community",
    value: "Join our WhatsApp group",
    href: "https://chat.whatsapp.com/DWGIkzkrUuAAjP7r6lHgu1",
    color: "#25D366",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen pb-24">
      <PageHeader title="CONTACT US" subtitle="We'd love to hear from you" />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-12 md:space-y-20">

        {/* ── Contact info strip ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="group flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all h-full"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                      {item.label}
                    </p>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-100" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Mandal Leadership
          </p>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* ── Leader cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Color accent top bar */}
              <div className="h-1.5 w-full" style={{ backgroundColor: leader.color }} />

              <div className="p-8">
                {/* Avatar placeholder */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-2xl font-black text-white"
                  style={{ backgroundColor: leader.color }}
                >
                  {leader.name.charAt(0)}
                </div>

                <p
                  className="text-[9px] font-black uppercase tracking-[0.25em] mb-0.5"
                  style={{ color: leader.color }}
                >
                  {leader.role}
                </p>
                <p className="text-[10px] text-slate-400 font-medium mb-4">{leader.roleEn}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-5">{leader.name}</h3>

                <div className="space-y-2">
                  {leader.phone ? (
                    <a
                      href={`tel:${leader.phone.replaceAll(" ", "")}`}
                      className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs"
                    >
                      <Phone size={13} />
                      {leader.phone}
                    </a>
                  ) : (
                    <p className="flex items-center gap-2 text-slate-300 text-xs">
                      <Phone size={13} />
                      Not available
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── SUPPORT STRIP ── */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-slate-100" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Support &amp; Collaborate</p>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Donate QR */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 flex flex-col items-center text-center gap-5 hover:shadow-xl transition-all overflow-hidden relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
                <HeartHandshake size={22} className="text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Donate</h3>
                <p className="text-slate-500 text-xs leading-relaxed">Scan the QR to contribute via UPI. Every rupee goes toward seva and community events.</p>
              </div>
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-200 bg-white">
                <Image src="/images/jym-upi-qr.jpeg" alt="JYM UPI QR" fill className="object-contain p-1" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">UPI · Any App</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
            </div>

            {/* Host an event */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 flex flex-col gap-5 hover:shadow-xl transition-all relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#D32F2F]/10 flex items-center justify-center">
                <CalendarPlus size={22} className="text-[#D32F2F]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Co-host an Event</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Planning a religious or community event? Partner with us. We bring youth, energy, and dedicated seva corps.</p>
              </div>
              <Link href="mailto:jym.rajajinagar@gmail.com" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#D32F2F] hover:gap-4 transition-all group/link">
                Email Us <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D32F2F] group-hover:w-full transition-all duration-500" />
            </div>

            {/* Sponsor */}
            <div className="bg-slate-900 rounded-3xl p-8 flex flex-col gap-5 relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#D4AF3715,_transparent_60%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-5 h-full">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Sponsorship</p>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2">Sponsor the Sangh</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Businesses and organisations aligned with Jain values are welcome to sponsor our events, providing resources or visibility in exchange for community goodwill.</p>
                </div>
                <Link href="mailto:jym.rajajinagar@gmail.com" className="inline-flex self-start items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-slate-900 rounded-full font-black text-xs uppercase tracking-widest hover:bg-yellow-300 transition-colors group/btn">
                  Let&apos;s Talk <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
