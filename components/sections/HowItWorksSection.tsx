import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/data";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="How It Works"
        title="A faster briefing workflow for architectural teams"
        description="Designed to reduce ambiguity at the exact point where projects usually begin with incomplete, inconsistent inputs."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.id} delay={index * 0.08}>
            <article className="group panel h-full rounded-[1.75rem] p-6 transition duration-500 hover:-translate-y-1 hover:border-lime/20 hover:bg-white/[0.07]">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.28em] text-lime">{step.id}</span>
                <div className="h-10 w-10 rounded-full border border-white/10 bg-white/[0.04]" />
              </div>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.04em] text-copy">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{step.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

