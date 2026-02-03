"use client";

import Link from "next/link";
import SeamlessWave from "./SeamlessWave"; 

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white z-20">
       
       {/* --- TOP WAVE DECORATION --- */}
       <div className="absolute top-0 left-0 w-full transform -translate-y-full overflow-hidden leading-none z-10">
          <div className="relative w-full h-[12vh] bg-white"> 
             <SeamlessWave color="#D32F2F" duration={35} style={{ height: '100%', zIndex: 1 }} />
             <SeamlessWave color="#FFD700" duration={30} direction={-1} style={{ height: '80%', zIndex: 2 }} />
             <SeamlessWave color="#F9F9F9" duration={25} style={{ height: '60%', zIndex: 3 }} />
             <SeamlessWave color="#2E7D32" duration={20} direction={-1} style={{ height: '40%', zIndex: 4 }} />
             <SeamlessWave color="#1565C0" duration={15} style={{ height: '20%', zIndex: 5 }} />
          </div>
       </div>

       {/* --- FOOTER CONTENT --- */}
       <div className="relative pt-16 pb-12 max-w-6xl mx-auto px-6 flex flex-col items-center">
         
         {/* Flag Dots */}
         <div className="flex justify-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#D32F2F] shadow-[0_0_10px_#D32F2F]" />
            <div className="w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]" />
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
            <div className="w-2 h-2 rounded-full bg-[#2E7D32] shadow-[0_0_10px_#2E7D32]" />
            <div className="w-2 h-2 rounded-full bg-[#1565C0] shadow-[0_0_10px_#1565C0]" />
         </div>

         {/* Logo & Name */}
         <div className="mb-6 text-center">
           <h3 className="text-xl font-bold tracking-widest text-slate-200" style={{ fontFamily: 'var(--font-cinzel)' }}>JINESHWAR</h3>
           <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1">Yuva Mandal • Rajajinagar</p>
         </div>

         {/* LINKS (Updated) */}
         <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            <Link href="/about" className="hover:text-[#FFD700] transition-colors">About</Link>
            <Link href="/events" className="hover:text-[#FFD700] transition-colors">Events</Link>
            <Link href="/directory" className="hover:text-[#FFD700] transition-colors">Directory</Link>
            <Link href="/contact" className="hover:text-[#FFD700] transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-[#FFD700] transition-colors">Privacy</Link>
         </div>

         {/* Copyright */}
         <p className="text-slate-600 text-[10px] uppercase tracking-widest text-center">
           © 2026 Jineshwar Yuva Mandal. All Rights Reserved.
         </p>
       </div>
    </footer>
  );
}