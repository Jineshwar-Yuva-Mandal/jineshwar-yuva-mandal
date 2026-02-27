"use client";

import { useState } from "react";
import { useMotionValue, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import JYMLoader from "@/components/shared/JYMLoader";

// Clean Imports
import HeroSection from "@/components/landing/HeroSection";
import ParallaxText from "@/components/landing/ParallaxText";
import TiltCard from "@/components/landing/TiltCard";
import QuoteSection from "@/components/landing/QuoteSection";
import { Calendar, Users, ShieldCheck } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  const mouseX = useMotionValue(0);

  function handleMouseMove({ clientX }: React.MouseEvent) {
    if (typeof window !== 'undefined') {
        mouseX.set(clientX / window.innerWidth - 0.5);
    }
  }

  return (
    <div onMouseMove={handleMouseMove}>
      
      {/* LOADER (Only on Home Page) */}
      <div className="relative z-[200]">
         {loading && <JYMLoader onFinish={() => setLoading(false)} />}
      </div>

      {/* MAIN CONTENT */}
      {!loading && (
        <main className="text-slate-900 font-sans overflow-x-hidden relative selection:bg-yellow-400 selection:text-black">
          
          {/* HERO */}
          <HeroSection 
            mouseX={mouseX} 
          />

          {/* MARQUEE */}
          <section className="relative z-10 py-12 bg-slate-50 border-y border-slate-100 overflow-hidden">
            <ParallaxText baseVelocity={-1}>DHARMA • SEVA • SANGATHAN • </ParallaxText>
          </section>

          {/* GRID SECTION */}
          <section className="relative z-20 py-32 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="mb-20 text-center">
                 <h2 className="text-4xl font-serif font-bold text-slate-900">The Ecosystem</h2>
                 <p className="text-slate-500 mt-4">Three pillars upholding our mission.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <TiltCard 
                  delay={0.1} title="Events" icon={Calendar} color="#EF4444" 
                  subtitle="RSVP for community gatherings. Digital entry. Real-time updates." 
                />
                <TiltCard 
                  delay={0.2} title="Treasury" icon={ShieldCheck} color="#10B981" 
                  subtitle="Transparent ledger. Track donations and funds with clarity." 
                />
                <TiltCard 
                  delay={0.3} title="Directory" icon={Users} color="#2563EB" 
                  subtitle="The Sangha network. Connect with 500+ members instantly." 
                />
              </div>
            </div>
          </section>

          {/* QUOTE */}
          <QuoteSection />
          
        </main>
      )}
    </div>
  );
}