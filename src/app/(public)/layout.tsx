"use client";

import Footer from "@/components/shared/Footer";
import { useMotionValue } from "framer-motion";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We handle the global mouse move here so parallax works on ALL pages
  const mouseX = useMotionValue(0);

  function handleMouseMove({ clientX }: React.MouseEvent) {
    if (typeof window !== 'undefined') {
        mouseX.set(clientX / window.innerWidth - 0.5);
    }
  }

  return (
    <div onMouseMove={handleMouseMove} className="bg-white relative min-h-screen flex flex-col">


      {/* 1. Page Content (This is where your Home, About, Events page code goes) */}
      <div className="flex-grow">
        {children}
      </div>

      {/* 3. Global Footer (Stays on every page) */}
      <Footer />
    </div>
  );
}