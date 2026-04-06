"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: "mj-2026",
    title: "Mahaveer Jayanti 2026",
    date: "April 21, 2026",
    location: "Freedom Park, Bangalore",
    type: "Seva",
    color: "#D4AF37",
  },
  {
    id: "dpl",
    title: "Dharmic Premier League",
    date: "Coming Soon · 2026",
    location: "Rajajinagar, Bangalore",
    type: "Special",
    color: "#7B1FA2",
  },
  {
    id: "blood",
    title: "Mega Blood Donation Drive",
    date: "May 10, 2026",
    location: "Community Hall, Bangalore",
    type: "Seva",
    color: "#D32F2F",
  },
];

export default function EventsPreviewSection() {
  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
              What&apos;s coming
            </p>
            <h2 className="text-4xl font-serif font-bold text-slate-900">Upcoming Events</h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors group"
          >
            View All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Event cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/events/${event.id}`}
                className="group block bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300 h-full"
              >
                {/* Badge + arrow row */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border"
                    style={{
                      color: event.color,
                      borderColor: `${event.color}40`,
                      backgroundColor: `${event.color}10`,
                    }}
                  >
                    {event.type}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-serif leading-tight mb-5 group-hover:text-[#D4AF37] transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 text-slate-400 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} />
                    {event.location}
                  </div>
                </div>

                {/* Animated colour bar on hover */}
                <div
                  className="mt-6 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: event.color }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
