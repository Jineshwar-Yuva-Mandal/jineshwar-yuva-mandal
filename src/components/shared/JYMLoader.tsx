"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function JYMLoader({ onFinish }: { onFinish?: () => void }) {

    useEffect(() => {
        if (onFinish) {
            const timer = setTimeout(() => {
                onFinish();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [onFinish]);

    // Entrance Animation
    const riseAnim = {
        hidden: { y: "110%" },
        visible: (i: number) => ({
            y: "0%",
            transition: {
                delay: i * 0.15,
                duration: 1.2,
                // FIX: Added 'as const' here
                ease: [0.76, 0, 0.24, 1] as const,
            },
        }),
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7]"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
            <div className="flex items-center gap-4 md:gap-8 relative z-10">
                {/* LETTER J */}
                <div className="overflow-hidden">
                    <motion.span
                        custom={0} variants={riseAnim} initial="hidden" animate="visible"
                        className="block text-9xl md:text-[10rem] font-bold text-[#0047AB] leading-none"
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                    >J</motion.span>
                </div>
                {/* LETTER Y */}
                <div className="overflow-hidden relative">
                    <motion.span
                        custom={1} variants={riseAnim} initial="hidden" animate="visible"
                        className="block text-9xl md:text-[10rem] font-bold text-[#FFD700] leading-none"
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                    >Y</motion.span>
                </div>
                {/* LETTER M */}
                <div className="overflow-hidden">
                    <motion.span
                        custom={2} variants={riseAnim} initial="hidden" animate="visible"
                        className="block text-9xl md:text-[10rem] font-bold text-[#0047AB] leading-none"
                        style={{ fontFamily: 'var(--font-cinzel)' }}
                    >M</motion.span>
                </div>
            </div>
        </motion.div>
    );
}