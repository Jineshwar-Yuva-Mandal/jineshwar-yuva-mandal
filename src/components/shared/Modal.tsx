"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // 1. NUCLEAR SCROLL LOCK with !important
      // We force the body to stop scrolling no matter what.
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // 2. FOCUS TRAP
      setTimeout(() => {
        scrollContainerRef.current?.focus();
      }, 50);

    } else {
      // Cleanup
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999]"
            aria-hidden="true"
          />

          {/* WRAPPER */}
          <div 
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            onClick={(e) => {
               if (e.target === e.currentTarget) onClose();
            }}
          >
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()} 
              
              // CSS: Max height is 85% of screen. Flex column structure.
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden relative"
            >
              
              {/* CLOSE BUTTON */}
              <div className="absolute top-4 right-4 z-50">
                <button 
                  onClick={onClose}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* SCROLLABLE CONTENT AREA */}
              {/* FIX 1: onWheel stopPropagation() -> Prevents scroll from leaking to background
                 FIX 2: height: 100% -> Ensures it fills the flex parent properly
              */}
              <div 
                ref={scrollContainerRef}
                tabIndex={-1} 
                className="flex-1 overflow-y-auto overscroll-contain p-1 outline-none w-full h-full"
                onWheel={(e) => e.stopPropagation()} 
              >
                 {children}
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}