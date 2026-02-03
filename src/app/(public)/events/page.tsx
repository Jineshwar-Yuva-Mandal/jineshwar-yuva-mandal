"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Mahavir Jayanti Mahotsav",
    date: "April 21, 2026",
    location: "Jain Sthanak, Rajajinagar",
    type: "Religious",
    color: "#FFD700" // Yellow
  },
  {
    id: 2,
    title: "Mega Blood Donation Drive",
    date: "May 10, 2026",
    location: "Community Hall, Bangalore",
    type: "Seva",
    color: "#D32F2F" // Red
  },
  {
    id: 3,
    title: "Youth Treking Expedition",
    date: "June 05, 2026",
    location: "Nandi Hills",
    type: "Social",
    color: "#2E7D32" // Green
  }
];

export default function EventsPage() {
  return (
    <main className="bg-white min-h-screen pb-20">
      <PageHeader title="UPCOMING EVENTS" subtitle="Join the Movement" />

      <div className="max-w-6xl mx-auto px-6 py-20">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                 {/* Event Image Placeholder */}
                 <div className="h-48 bg-slate-50 relative flex items-center justify-center">
                    <span className="text-slate-300 font-bold tracking-widest uppercase text-xs">Event Image</span>
                    {/* Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white shadow-sm" style={{ color: event.color }}>
                       {event.type}
                    </div>
                 </div>

                 {/* Content */}
                 <div className="p-8">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
                       <Calendar size={14} /> <span>{event.date}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif leading-tight group-hover:text-[#D4AF37] transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-8">
                       <MapPin size={16} /> <span>{event.location}</span>
                    </div>

                    <Link href={`/events/${event.id}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:gap-4 transition-all">
                       Register Now <ArrowRight size={16} />
                    </Link>
                 </div>
                 
                 {/* Bottom Color Bar */}
                 <div className="h-1 w-full" style={{ backgroundColor: event.color }} />
              </div>
            ))}
         </div>
      </div>
    </main>
  );
}