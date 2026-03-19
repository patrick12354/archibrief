import { PrototypeConsole } from "@/components/sections/PrototypeConsole";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  return (
    <section id="final-cta" className="section-shell py-24 sm:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.25rem] border border-lime/20 bg-[#0a100b] px-6 py-14 shadow-glow sm:px-10 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-lime/[0.14] via-transparent to-white/[0.03]" />
          <div className="relative">
            <span className="eyebrow">Final CTA</span>
            <h2 className="mt-6 max-w-4xl font-display text-4xl leading-[0.95] tracking-tighter2 text-copy sm:text-5xl lg:text-6xl">
              Start your next project with a clearer brief
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Prototype your architecture workflow with AI-powered briefing and programming.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="#top">Try Prototype</Button>
              <Button href="#top" variant="secondary">
                Book a Demo
              </Button>
            </div>
            <div className="mt-12">
              <PrototypeConsole />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
