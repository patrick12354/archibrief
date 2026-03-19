import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PrototypeConsole } from "@/components/sections/PrototypeConsole";

export const metadata: Metadata = {
  title: "ArchiBrief AI Prototype | Structured Architectural Briefing",
  description:
    "Prototype the ArchiBrief AI workflow and turn rough client requirements into a richer architectural briefing package."
};

export default function PrototypePage() {
  return (
    <main className="relative overflow-hidden bg-ink text-copy">
      <Navbar />
      <section className="page-grid relative isolate overflow-hidden pt-28">
        <div className="hero-glow absolute inset-x-0 top-0 h-[34rem] opacity-80" />
        <div className="section-shell relative py-12 sm:py-16">
          <div className="rounded-[2.3rem] border border-white/8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-panel sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <span className="eyebrow">Prototype Workspace</span>
                <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[0.92] tracking-tighter2 text-copy sm:text-5xl lg:text-6xl">
                  Build a deeper architectural brief before you draw the first line.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  Paste client notes, generate a structured architectural output, then download a
                  branded PDF handoff with space program, zoning, climate response, adjacency logic,
                  design moves, and clarifying questions.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-lime">Best for</p>
                    <p className="mt-2 text-sm leading-7 text-copy">
                      Residential projects, interior scopes, compact villas, and small-studio early briefing.
                    </p>
                  </div>
                  <div className="rounded-[1.4rem] border border-lime/15 bg-lime/[0.07] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-lime">Output depth</p>
                    <p className="mt-2 text-sm leading-7 text-copy">
                      Vision, drivers, room program, adjacency, zoning, climate, code watchouts, and next moves.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/8 bg-black/30 p-5 backdrop-blur-xl sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["01", "Client notes and scope cues"],
                    ["02", "Program + adjacency structure"],
                    ["03", "Zoning, climate, and constraints"],
                    ["04", "PDF export for handoff"]
                  ].map(([id, label]) => (
                    <div key={id} className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-lime">{id}</p>
                      <p className="mt-3 text-sm leading-7 text-copy">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24 pt-2 sm:pb-32">
        <PrototypeConsole />
      </section>
      <Footer />
    </main>
  );
}
