"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Users, Store, Phone, LogIn } from "lucide-react";

// Create a motion-enabled Link for smooth animations
const MotionLink = motion.create(Link);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const menuItems = [
    { name: 'About', href: '/about', icon: Users, description: 'Our Mission & Team' },
    { name: 'Events', href: '/events', icon: Calendar, description: 'Upcoming Activities' },
    { name: 'Directory', href: '/directory', icon: Store, description: 'Community Business' },
    { name: 'Contact', href: '/contact', icon: Phone, description: 'Get in Touch' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="fixed top-6 left-0 right-0 z-[100] flex justify-between md:justify-center px-6 md:px-4 pointer-events-none"
      >
         <div className="flex items-center gap-2 relative z-[101] transition-all w-full md:w-auto justify-between md:justify-start pointer-events-auto bg-transparent md:bg-white/80 md:backdrop-blur-xl md:border md:border-white/40 md:shadow-xl md:shadow-slate-200/40 md:rounded-full md:pl-2 md:pr-2 md:py-2">
           
           <Link 
             href="/" 
             className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden relative active:scale-95 transition-transform bg-white/90 backdrop-blur-md shadow-lg border border-white/50 md:bg-slate-50 md:shadow-none md:border-slate-100 md:w-10 md:h-10"
            >
              <Image 
                src="/images/logo-symbol.png" 
                alt="Logo" 
                width={24} 
                height={24} 
                className="object-contain"
              />
           </Link>

           <div className="hidden md:flex items-center gap-1 px-4 border-l border-r border-slate-200/50 mx-2 h-6">
              {menuItems.map((item) => (
                <MotionLink
                    key={item.name}
                    href={item.href}
                    whileHover={{ color: "#000000" }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors"
                >
                    {item.name}
                </MotionLink>
              ))}
           </div>

           <div className="flex items-center gap-2">
             <MotionLink 
               href="/login" 
               whileHover={{ backgroundColor: "#000000", scale: 1.05 }}
               transition={{ duration: 0.2 }}
               className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-slate-900 shadow-md hidden sm:block"
             >
               Login
             </MotionLink>

             <button 
               onClick={() => setIsMobileMenuOpen(true)}
               className="md:hidden w-12 h-12 flex items-center justify-center rounded-full transition-transform active:scale-90 shadow-lg bg-white/90 backdrop-blur-md text-slate-900 border border-white/50"
             >
               <Menu size={24} />
             </button>
           </div>
         </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#FDFBF7] flex flex-col md:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none overflow-hidden">
                <Image src="/images/logo-symbol.png" alt="Background Watermark" width={600} height={600} className="object-contain w-[80vw] h-[80vw] max-w-[500px] max-h-[500px]" />
            </div>

            <div className="flex justify-end p-6 z-10">
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-slate-900">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 gap-2 z-10 -mt-10">
                {menuItems.map((item, i) => (
                    <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                        <MotionLink
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 1)" }}
                            className="group flex items-center gap-5 py-4 rounded-xl -mx-4 px-4 transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-800 transition-all shadow-sm">
                                <item.icon size={20} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif font-medium text-slate-800 group-hover:text-black transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    {item.description}
                                </p>
                            </div>
                        </MotionLink>
                    </motion.div>
                ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 px-4">
                    <MotionLink
                        href="/login"
                        whileHover={{ backgroundColor: "#000000", scale: 1.02 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-slate-900 text-white text-sm font-bold uppercase tracking-widest shadow-xl transition-all"
                    >
                        <LogIn size={18} />
                        Member Login
                    </MotionLink>
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}