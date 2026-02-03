"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ParticleField() {
  const [particles, setParticles] = useState<{
    x: number; y: number; opacity: number; scale: number; duration: number; floatY: number;
  }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.3 + 0.1,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
      floatY: Math.random() * -100,
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: p.x, y: p.y, opacity: p.opacity, scale: p.scale }}
          animate={{ y: [null, p.floatY], opacity: [null, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          // CHANGED: Color is now a Darker Gold (#D4AF37) to show on white
          className="absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[0.5px]"
        />
      ))}
    </div>
  );
}