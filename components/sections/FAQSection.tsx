"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data";

export function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="FAQ"
        title="A workflow accelerator for briefing, not a replacement for design judgment"
        description="The product is positioned around early-stage clarity. It helps professionals start projects with stronger information hygiene."
      />

      <div className="mt-14 grid gap-4">
        {faqs.map((item, index) => {
          const isOpen = active === index;

          return (
            <div key={item.question} className="panel rounded-[1.5rem] px-5 py-5 sm:px-6">
              <button
                type="button"
                onClick={() => setActive(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 text-left"
              >
                <span className="text-lg font-medium tracking-[-0.03em] text-copy sm:text-xl">
                  {item.question}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lime">
                  {isOpen ? "-" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pt-4 text-sm leading-7 text-muted sm:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

