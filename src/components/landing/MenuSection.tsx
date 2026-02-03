"use client";

import { Calendar, Users, ShieldCheck } from "lucide-react";

const FeatureItem = ({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) => (
  <div className="group p-8 rounded-3xl bg-white border border-[#EBE5D9] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 cursor-default">
    <div className="w-14 h-14 rounded-2xl bg-[#FFFBF2] text-[#D4AF37] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-[#2C1810] mb-3 font-serif">{title}</h3>
    <p className="text-[#8D7B68] text-sm leading-7">{desc}</p>
  </div>
);

export default function MenuSection() {
  return (
    <section className="py-32 px-6 bg-[#FFFBF2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-3 block">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C1810] font-serif">The Mandal Ecosystem</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           <FeatureItem 
             title="Events & Seva" 
             icon={Calendar}
             desc="Join us for spiritual journeys and community service. RSVP instantly with your digital pass."
           />
           <FeatureItem 
             title="Treasury" 
             icon={ShieldCheck}
             desc="Transparency is our flavor. Track every rupee of donations and fees in real-time."
           />
           <FeatureItem 
             title="Directory" 
             icon={Users}
             desc="A blend of 500+ members. Connect, network, and grow with your community."
           />
        </div>
      </div>
    </section>
  );
}