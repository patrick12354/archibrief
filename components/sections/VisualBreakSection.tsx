"use client";

import { motion } from "framer-motion";

export function VisualBreakSection() {
  return (
    <section className="section-shell py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/8 bg-[#0a0f0b] px-6 py-14 sm:px-10 sm:py-20">
        <div className="blueprint-lines absolute inset-0 opacity-20" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-lime/30 to-transparent" />
        <motion.div
          animate={{ opacity: [0.28, 0.6, 0.28] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/10 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-lime">A cleaner starting point</p>
            <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.9] tracking-tighter2 text-copy sm:text-6xl lg:text-[6.5rem]">
              Brief with more precision. Design with more intent.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "Blueprint-like spatial logic",
              "Measured intake before concept drift",
              "Professional outputs, not AI noise"
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm uppercase tracking-[0.2em] text-mist"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

