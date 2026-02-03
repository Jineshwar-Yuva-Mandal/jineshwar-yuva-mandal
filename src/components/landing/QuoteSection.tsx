"use client";

import { Scroll } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function QuoteSection() {
    // Now these hooks are safe because they are inside their own unconditional component
    const { scrollY } = useScroll();
    const parallaxY = useTransform(scrollY, [0, 2000], [0, -200]);

    return (
        <section className="relative py-40 flex items-center justify-center overflow-hidden">
            <motion.div
                style={{ y: parallaxY }}
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393798-38e43269d877?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"
            />
            <div className="relative z-10 text-center px-4 max-w-4xl">
                <Scroll className="w-12 h-12 text-[#FFD700] mx-auto mb-6 opacity-80" />
                <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                    "Parasparopagraho Jivanam"
                </h3>
                <p className="mt-6 text-sm font-bold tracking-[0.3em] text-[#FFD700] uppercase">
                    Souls rendering service to one another
                </p>
            </div>
        </section>
    );
}