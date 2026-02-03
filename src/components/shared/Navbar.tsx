"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4"
    >
       {/* The Glass Pill */}
       <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/40 rounded-full pl-2 pr-2 py-2 flex items-center gap-2">
          
          {/* 1. LOGO (Home Link) */}
          <Link href="/" className="w-10 h-10 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center overflow-hidden relative hover:scale-105 transition-transform">
             <Image 
               src="/images/logo-symbol.png" 
               alt="Logo" 
               width={20} 
               height={20} 
               className="object-contain"
             />
          </Link>

          {/* 2. NAVIGATION LINKS */}
          <div className="hidden md:flex items-center gap-1 px-4 border-l border-r border-slate-200/50 mx-2 h-6">
             <Link href="/about" className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">
               About
             </Link>
             <Link href="/events" className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">
               Events
             </Link>
             {/* NEW DIRECTORY LINK */}
             <Link href="/directory" className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-[#D4AF37] transition-colors">
               Directory
             </Link>
             <Link href="/contact" className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors">
               Contact
             </Link>
          </div>

          {/* 3. LOGIN BUTTON */}
          <Link 
            href="/login" 
            className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-slate-900 hover:bg-[#D4AF37] transition-all duration-300 shadow-md"
          >
            Login
          </Link>
       </div>
    </motion.nav>
  );
}