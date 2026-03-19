import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCases } from "@/lib/data";

export function UseCasesSection() {
  return (
    <section className="section-shell py-24 sm:py-32">
      <SectionHeading
        eyebrow="Use Cases"
        title="Made for practices that need sharper project starts"
        description="A serious workflow tool for professionals handling residential, interior, and small-studio design projects."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {useCases.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <article className="panel relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-lime/[0.05]" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.24em] text-lime">Use Case</p>
                <h3 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-copy">{item.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{item.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

