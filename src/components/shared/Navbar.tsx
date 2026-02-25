"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar, Users, Store } from "lucide-react";
import { useRouter } from "next/navigation";

// Modal Imports
import Modal from "@/components/shared/Modal";

const MotionLink = motion.create(Link);

export default function Navbar({ user }: { user?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

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
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="fixed top-6 left-0 right-0 z-[100] flex justify-between md:justify-center px-6 md:px-4 pointer-events-auto"
      >
         <div className="flex items-center gap-2 transition-all w-full md:w-auto justify-between md:justify-start bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl shadow-slate-200/40 rounded-full pl-2 pr-2 py-2">
           
           <Link 
             href="/" 
             className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-slate-50 border border-slate-100 transition-transform active:scale-95"
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
                    className="px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors"
                >
                    {item.name}
                </MotionLink>
              ))}
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
            <div className="flex justify-end p-6">
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md text-slate-900">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 gap-2 -mt-10">
                {menuItems.map((item, i) => (
                    <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <MotionLink
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="group flex items-center gap-5 py-4 px-4 transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-800 transition-all shadow-sm">
                                <item.icon size={20} />
                            </div>
                            <h3 className="text-2xl font-serif font-medium text-slate-800">{item.name}</h3>
                        </MotionLink>
                    </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}