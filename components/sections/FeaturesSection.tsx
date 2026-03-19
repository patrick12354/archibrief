import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/lib/data";

export function FeaturesSection() {
  return (
    <section id="features" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="Features"
        title="Built to support real briefing work, not generic AI demos"
        description="Each feature is designed around the friction points architects hit when project inputs arrive incomplete, vague, or spread across channels."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.06}>
            <article className="group panel h-full rounded-[1.75rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-lime/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-lime/20 bg-lime/10 text-lime">
                <div className="h-5 w-5 rounded-sm border border-lime/40" />
              </div>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.04em] text-copy">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{feature.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

