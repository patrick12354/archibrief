"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const floatTransition = {
  duration: 5.4,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const
};

export function HeroSection() {
  return (
    <section id="top" className="page-grid relative isolate overflow-hidden pt-28">
      <div className="hero-glow absolute inset-x-0 top-0 h-[42rem] opacity-80" />
      <div className="section-shell relative min-h-[calc(100vh-2rem)] py-12 sm:py-16">
        <div className="grid items-end gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="relative z-10 max-w-3xl pb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              The AI Copilot for Architectural Programming
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12 }}
              className="mt-7 max-w-4xl font-display text-[3.5rem] leading-[0.88] tracking-tighter2 text-copy sm:text-[5.2rem] lg:text-[7.2rem]"
            >
              From Client Chaos to Architectural Clarity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.22 }}
              className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8"
            >
              Paste chat messages, project notes, or rough requirements and get a clean architectural
              brief, room program, zoning logic, climate response, adjacency planning, and next-step
              design moves in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.32 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button href="/prototype">Try Prototype</Button>
              <Button href="/#how-it-works" variant="secondary">
                See How It Works
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.42 }}
              className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3"
            >
              {[
                ["12+", "planning layers generated"],
                ["PDF", "handoff-ready export"],
                ["Faster", "concept setup for architects"]
              ].map(([value, label]) => (
                <div key={label} className="panel rounded-2xl border-white/8 px-4 py-4">
                  <p className="text-xl font-semibold tracking-[-0.04em] text-copy">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative min-h-[38rem] lg:min-h-[44rem]">
            <div className="absolute inset-0 rounded-[2rem] border border-white/8 bg-gradient-to-br from-white/[0.06] to-white/[0.02]" />
            <div className="absolute inset-5 rounded-[1.7rem] border border-white/8 bg-black/40 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-hero-grid bg-[size:72px_72px] opacity-20" />

            <motion.div
              animate={{ y: [-6, 8, -6] }}
              transition={floatTransition}
              className="absolute left-6 top-8 w-[58%] panel rounded-[1.6rem] border-lime/20 bg-[#101410]/90 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.28em] text-lime">Client Notes</p>
                <span className="rounded-full border border-lime/20 px-2 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  imported
                </span>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-muted">
                <p>
                  Family of four. Wants calm circulation, stronger indoor-outdoor connection, and a
                  quiet work zone.
                </p>
                <p>
                  Concerned about overheating on west facade. Budget should stay disciplined.
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -12, 10] }}
              transition={{ ...floatTransition, duration: 6.3 }}
              className="absolute right-6 top-20 w-[48%] panel rounded-[1.6rem] p-5"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-lime">Architectural Program</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Living / Dining", "42 sqm"],
                  ["Kitchen + Pantry", "18 sqm"],
                  ["Studio / Workroom", "14 sqm"],
                  ["Primary Suite", "26 sqm"]
                ].map(([name, area]) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                    <span className="text-sm text-copy">{name}</span>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">{area}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [-8, 12, -8] }}
              transition={{ ...floatTransition, duration: 6.9 }}
              className="absolute bottom-24 left-10 w-[44%] rounded-[1.6rem] border border-lime/20 bg-lime/[0.08] p-5 shadow-glow backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-lime">Zoning + Climate</p>
              <div className="mt-4 grid gap-3">
                {[
                  "Public zone faces garden",
                  "Service spine buffers heat",
                  "Deep overhangs on west-facing glazing"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-lime/15 bg-black/20 px-3 py-3 text-sm text-copy">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [12, -10, 12] }}
              transition={{ ...floatTransition, duration: 7.2 }}
              className="absolute bottom-8 right-8 w-[52%] panel rounded-[1.6rem] p-5"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-lime">Next Design Moves</p>
              <div className="mt-4 space-y-3">
                {[
                  "Test compact wet-core arrangement",
                  "Study privacy gradient from entry to bedrooms",
                  "Validate workroom acoustic separation"
                ].map((question) => (
                  <div key={question} className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-copy">
                    {question}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
