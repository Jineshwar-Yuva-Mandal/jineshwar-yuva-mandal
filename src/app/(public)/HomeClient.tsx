"use client";

import { useState } from "react";
import { useMotionValue } from "framer-motion";
import JYMLoader from "@/components/shared/JYMLoader";

import HeroSection from "@/components/landing/HeroSection";
import ParallaxText from "@/components/landing/ParallaxText";
import QuoteSection from "@/components/landing/QuoteSection";
import StatsSection from "@/components/landing/StatsSection";
import SamanwaySection from "@/components/landing/SamanwaySection";
import EventsPreviewSection from "@/components/landing/EventsPreviewSection";
import AboutSection from "@/components/landing/AboutSection";
import GallerySection from "@/components/landing/GallerySection";
import CTASection from "@/components/landing/CTASection";
import SupportSection from "@/components/landing/SupportSection";

export default function HomeClient({
  galleryImages,
}: Readonly<{ galleryImages: string[] }>) {
  const [loading, setLoading] = useState(true);
  const mouseX = useMotionValue(0);

  function handleMouseMove({ clientX }: React.MouseEvent) {
    if (typeof window !== "undefined") {
      mouseX.set(clientX / window.innerWidth - 0.5);
    }
  }

  return (
    <div onMouseMove={handleMouseMove}>
      {/* LOADER */}
      <div className="relative z-[200]">
        {loading && <JYMLoader onFinish={() => setLoading(false)} />}
      </div>

      {/* MAIN CONTENT */}
      {!loading && (
        <main className="text-slate-900 font-sans overflow-x-hidden relative selection:bg-yellow-400 selection:text-black">

          <HeroSection mouseX={mouseX} />

          <section className="relative z-10 py-12 bg-slate-50 border-y border-slate-100 overflow-hidden">
            <ParallaxText baseVelocity={-1}>DHARMA • SEVA • SANGATHAN • </ParallaxText>
          </section>

          <StatsSection />
          <SamanwaySection />
          <EventsPreviewSection />
          <AboutSection />

          <GallerySection images={galleryImages} />

          <SupportSection />
          <QuoteSection />
          <CTASection />

        </main>
      )}
    </div>
  );
}
