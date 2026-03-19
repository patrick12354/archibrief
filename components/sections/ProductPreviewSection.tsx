import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductPreviewSection() {
  return (
    <section id="preview" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="Output Preview"
        title="The brief arrives structured, legible, and ready for design conversation"
        description="A premium dashboard-style preview that shows how unstructured intake becomes a more disciplined architectural starting point."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-lime/[0.08] via-transparent to-transparent" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-lime/20 bg-lime/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-lime">
                  Project Summary
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-muted">
                  Residential Renovation
                </span>
              </div>
              <h3 className="mt-6 max-w-2xl text-3xl font-medium tracking-[-0.05em] text-copy sm:text-4xl">
                Compact family home with strong garden connection and a controlled west-facing heat strategy
              </h3>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-lime">Room List + Area Targets</p>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Living / Dining", "42 sqm"],
                      ["Kitchen + Pantry", "18 sqm"],
                      ["Primary Suite", "26 sqm"],
                      ["Children Bedrooms", "2 x 12 sqm"]
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between border-b border-white/8 pb-3 text-sm last:border-none last:pb-0">
                        <span className="text-copy">{label}</span>
                        <span className="text-muted">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-lime">Adjacency Recommendations</p>
                  <div className="mt-4 grid gap-3">
                    {[
                      "Kitchen linked to service yard and dining",
                      "Studio buffered from children's bedrooms",
                      "Primary suite pulled away from public zone"
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-copy">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.08}>
            <div className="panel rounded-[1.75rem] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-lime">Constraints + Assumptions</p>
              <div className="mt-5 space-y-3">
                {[
                  "Afternoon solar gain on west edge requires shading strategy",
                  "Budget suggests efficient structural spans and compact wet-core planning",
                  "Client values quiet work mode during school hours"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-muted">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="rounded-[1.75rem] border border-lime/20 bg-lime/[0.06] p-6 shadow-glow">
              <p className="text-xs uppercase tracking-[0.24em] text-lime">Unanswered Questions</p>
              <div className="mt-5 space-y-3">
                {[
                  "Will the studio ever require direct street access?",
                  "Is the family prioritizing future flexibility over immediate room count?",
                  "Are there specific material preferences affecting budget?"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-lime/15 bg-black/20 px-4 py-4 text-sm leading-7 text-copy">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

