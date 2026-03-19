"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={`mx-auto flex max-w-[90rem] items-center justify-between rounded-full border px-4 py-3 transition duration-300 sm:px-6 ${
            isScrolled
              ? "border-white/10 bg-black/40 shadow-panel backdrop-blur-xl"
              : "border-white/5 bg-white/[0.03] backdrop-blur-md"
          }`}
        >
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lime/30 bg-lime/10 text-sm font-semibold text-lime">
              AB
            </div>
            <p className="text-sm uppercase tracking-[0.28em] text-muted">ArchiBrief AI</p>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-muted lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-copy">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="#final-cta">Try Prototype</Button>
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-copy transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-copy transition ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-copy transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-4 mt-24 rounded-[2rem] border border-white/10 bg-[#0c110d]/95 p-6 shadow-panel"
            >
              <div className="blueprint-lines rounded-[1.5rem] border border-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-lime">Navigation</p>
                <div className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-2xl font-medium tracking-[-0.03em] text-copy"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="mt-8 grid gap-3">
                  <Button href="#final-cta" className="w-full">
                    Try Prototype
                  </Button>
                  <Button href="#how-it-works" className="w-full" variant="secondary">
                    See How It Works
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

