"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Handshake,
  Heart,
  Star,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";

/* ── Data ── */
const pillars = [
  {
    icon: BookOpen,
    color: "#D4AF37",
    title: "Religious Roots",
    desc: "Active participation in all major Jain observances — Mahaveer Jayanti, Paryushan, and more. We proudly provide seva alongside Rajajinagar Jain Sangh at every key event.",
  },
  {
    icon: Handshake,
    color: "#1565C0",
    title: "Network Building",
    desc: "Connecting the next generation of Jain youth — building friendships, professional relationships, and a lifelong sense of belonging within the community.",
  },
  {
    icon: Zap,
    color: "#2E7D32",
    title: "Business & GenZ Vision",
    desc: "We understand the world our members are entering. From startup culture to career exploration, we bridge tradition with opportunity through conversations that matter.",
  },
  {
    icon: Trophy,
    color: "#EF6C00",
    title: "Sports & Co-curriculars",
    desc: "Cricket, chess, trekking, cultural competitions — we believe a sharp mind lives in a healthy body. Our calendar is packed with activities beyond the prayer hall.",
  },
  {
    icon: Star,
    color: "#7B1FA2",
    title: "Cultural Honours",
    desc: "Celebrating talent, rewarding effort, and honouring tradition through felicitations, cultural nights, and community recognition events.",
  },
  {
    icon: Heart,
    color: "#D32F2F",
    title: "360° Development",
    desc: "Religious, social, intellectual, and physical — we invest in the whole person. Every member leaves the Mandal more grounded, more connected, and more capable.",
  },
];

const milestones = [
  { year: "Founded", detail: "Established under the divine guidance of Shrut Muni Ji M.S." },
  { year: "Events", detail: "100+ events hosted across religious, social and sporting categories." },
  { year: "Members", detail: "500+ active youth members across Rajajinagar and beyond." },
  { year: "Seva", detail: "Consistent seva partner for all major Rajajinagar Jain Sangh events." },
];

/* ── Component ── */
export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen pb-24">
      <PageHeader title="OUR LEGACY" subtitle="Parasparopagraho Jivanam" />

      {/* ── ORIGIN STORY ── */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
              Our Beginning
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
              Born from Guidance.
              <br />
              <span className="text-[#D4AF37]">Built by Youth.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-5 max-w-2xl mx-auto">
              Jineshwar Yuva Mandal was founded under the divine guidance of{" "}
              <span className="font-bold text-slate-800">Shrut Muni Ji M.S.</span> — a visionary whose blessing gave our organisation its purpose and its soul. From that auspicious beginning, the Mandal has never stopped growing.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Since incorporation, we have taken on diverse responsibilities — organising events, participating in citywide Jain observances, building a tight-knit community, and shaping the leaders of tomorrow. Every initiative we run reflects a single belief: that the youth of today are the guardians of Dharma tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MILESTONES STRIP ── */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-[#D4AF37] font-black text-lg uppercase tracking-wider mb-2">
                {m.year}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">{m.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE DO — 6 PILLARS ── */}
      <section className="py-16 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-3">
              What we stand for
            </p>
            <h2 className="text-4xl font-serif font-bold text-slate-900">
              A 360° Mandal
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              We are not just a religious organisation. We are a launchpad — for friendships, for careers, for character.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${p.color}15` }}
                >
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEVA HIGHLIGHT ── */}
      <section className="py-12 md:py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] md:rounded-[3rem] bg-slate-900 overflow-hidden p-8 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#D4AF3718,_transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#D32F2F12,_transparent_55%)] pointer-events-none" />

            <div className="relative z-10">
              <Heart className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-80" />
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4">
                Our Seva
              </p>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                Proud partners of <br />
                <span className="text-[#D4AF37]">Rajajinagar Jain Sangh</span>
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto text-base">
                The Mandal plays a cordial and hands-on role in every major event organised by the Rajajinagar Jain Sangh — from Mahaveer Jayanti Mahotsav to Paryushan Aradhana. Our members volunteer in large numbers, upholding the spirit of{" "}
                <em className="text-slate-300">Parasparopagraho Jivanam</em> — souls rendering service to one another.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-12 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-5">
              Ready to be part of something bigger?
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Whether you are drawn by faith, friendship, sport, or ambition — there is a place for you here. Jineshwar Yuva Mandal is more than a name; it is a family.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-slate-900 transition-colors group"
              >
                Get in Touch
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-full font-bold text-sm uppercase tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                See Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
