"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// --- SEAMLESS WAVE COMPONENT ---
// Creates an infinite scrolling wave effect
const SeamlessWave = ({ color, duration, direction = 1, style = {} }: { color: string, duration: number, direction?: number, style?: any }) => {
  const wavePath = "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,160C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";
  
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={style}>
      <motion.div
        animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] h-full"
      >
        <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill={color} fillOpacity="1" d={wavePath} />
        </svg>
        <svg className="w-1/2 h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill={color} fillOpacity="1" d={wavePath} />
        </svg>
      </motion.div>
    </div>
  );
};

export default function HeroSection({ mouseX }: { mouseX: MotionValue<number> }) {
  const { scrollY } = useScroll();

  const yLogo = useTransform(scrollY, [0, 500], [0, 80]);
  const yText = useTransform(scrollY, [0, 500], [0, 40]);
  const heroX = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const heroRotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-white">
      <div className="relative z-20 max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center pb-20 md:pb-0">
        
        <motion.div style={{ y: yText }} className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-cinzel)' }}>
            JINESHWAR <br />
            <span className="text-[#D4AF37]">YUVA MANDAL</span>
          </h1>

          <div className="flex items-center gap-4 w-full justify-center md:justify-start opacity-70">
             <span className="text-xs md:text-sm tracking-[0.3em] font-bold text-slate-500 uppercase whitespace-nowrap">
               Rajajinagar, Bengaluru
             </span>
          </div>

          <p className="text-slate-500 text-lg leading-relaxed font-light max-w-lg pt-2">
            Jaha Seva, Waha Samarpan <br />
            Jaha Yuva, Waha <span className="font-bold text-slate-900">Parivartan</span>.
          </p>
        </motion.div>


        {/* RIGHT: SYMBOL LOGO + ANIMATIONS */}
        <motion.div style={{ x: heroX, rotateY: heroRotateY, y: yLogo }} className="order-1 md:order-2 flex justify-center perspective-1000">
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
             
             {/* Glow Behind */}
             <div className="absolute inset-10 bg-gradient-to-tr from-yellow-100 to-blue-50 rounded-full blur-[80px] opacity-60" />

             {/* --- ORBITAL RINGS (Low Opacity for subtlety) --- */}
             {/* Red Ring */}
             <motion.div 
               animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border border-red-500/20 rounded-full"
               style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
             />
             {/* Yellow Ring */}
             <motion.div 
               animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute inset-4 md:inset-8 border border-yellow-400/30 rounded-full"
               style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
             />
             {/* Green Ring */}
             <motion.div 
               animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
               className="absolute inset-8 md:inset-16 border border-green-500/20 rounded-full"
               style={{ borderRadius: "50% 50% 20% 80% / 25% 80% 20% 60%" }}
             />
             {/* Blue Ring */}
             <motion.div 
               animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
               className="absolute inset-12 md:inset-24 border border-blue-600/20 rounded-full"
               style={{ borderRadius: "70% 30% 50% 50% / 30% 60% 40% 70%" }}
             />

             {/* The Symbol Logo */}
             <div className="relative z-20 w-48 h-48 md:w-80 md:h-80 transform hover:scale-105 transition-transform duration-500">
               <Image 
                 src="/images/logo-symbol.png" 
                 alt="Jineshwar Symbol" 
                 fill 
                 className="object-contain drop-shadow-2xl"
                 priority
               />
             </div>
          </div>
        </motion.div>

      </div>


      {/* --- SLEEK JAIN FLAG WAVES (Bottom Border) --- */}
      {/* Reduced height (12vh) for a cleaner, modern look */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        
        {/* 1. RED (Back Layer) */}
        <SeamlessWave 
          color="#D32F2F" 
          duration={35} 
          style={{ height: '12vh', zIndex: 1 }} 
        />

        {/* 2. YELLOW */}
        <SeamlessWave 
          color="#FFD700" 
          duration={30} 
          direction={-1}
          style={{ height: '10vh', zIndex: 2 }} 
        />

        {/* 3. WHITE (Separator) */}
        <SeamlessWave 
          color="#F9F9F9" 
          duration={25} 
          style={{ height: '8vh', zIndex: 3 }} 
        />

        {/* 4. GREEN */}
        <SeamlessWave 
          color="#2E7D32" 
          duration={20} 
          direction={-1}
          style={{ height: '6vh', zIndex: 4 }} 
        />

        {/* 5. BLUE (Front Layer) */}
        <SeamlessWave 
          color="#1565C0" 
          duration={15} 
          style={{ height: '4vh', zIndex: 5 }} 
        />

      </div>
    </section>
  );
}