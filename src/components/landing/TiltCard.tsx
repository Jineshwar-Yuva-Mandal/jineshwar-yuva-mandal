"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  title: string;
  subtitle: string;
  icon: any;
  delay: number;
  color: string; // Hex color for theme
}

export default function TiltCard({ title, subtitle, icon: Icon, delay, color }: TiltCardProps) {
  // 1. Raw Mouse Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 2. Smooth Springs (The "Shock Absorbers" - No Jitter)
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // 3. Map Springs to Rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full perspective-1000 cursor-default"
    >
      <div 
        className="relative h-full bg-white border p-8 rounded-3xl transition-all duration-500 group overflow-hidden"
        style={{ 
          borderColor: "rgba(226, 232, 240, 0.8)", // Default slate-200
          transform: "translateZ(0)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" // Standard subtle shadow
        }} 
      >
        
        {/* HOVER EFFECT: Only the Border and Shadow change color, BG stays White */}
        <div 
           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
           style={{ 
             boxShadow: `0 20px 40px -5px ${color}30`, // Colored Glow Shadow
             border: `1px solid ${color}60` // Colored Border
           }}
        />

        {/* Icon Container */}
        <div 
          className="w-14 h-14 flex items-center justify-center mb-6 rounded-2xl transition-all duration-500 group-hover:scale-110"
          style={{ backgroundColor: `${color}10` }} // Subtle permanent tint on icon only
        >
          <Icon size={24} style={{ color: color }} />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif tracking-wide">{title}</h3>
        <p className="text-slate-500 text-sm leading-7 font-light">{subtitle}</p>

        {/* Learn More - Only appears on hover */}
        <div 
          className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" 
          style={{ color: color }}
        >
           <span>Explore</span> <span className="text-lg">→</span>
        </div>
      </div>
    </motion.div>
  );
}