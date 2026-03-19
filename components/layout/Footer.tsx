import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="section-shell pb-10 pt-8">
      <div className="panel overflow-hidden rounded-[2rem] border-white/8 px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-lime/25 bg-lime/10 text-sm font-semibold text-lime">
                AB
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted">ArchiBrief AI</p>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              AI-powered architectural briefing for professionals who need cleaner inputs before concept work begins.
            </p>
            <div className="mt-6">
              <Button href="#final-cta">Try Prototype</Button>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-lime">Sections</p>
            <div className="mt-5 grid gap-3 text-sm text-muted">
              <a href="#how-it-works" className="transition hover:text-copy">
                How It Works
              </a>
              <a href="#preview" className="transition hover:text-copy">
                Product Preview
              </a>
              <a href="#features" className="transition hover:text-copy">
                Features
              </a>
              <a href="#faq" className="transition hover:text-copy">
                FAQ
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-lime">Connect</p>
            <div className="mt-5 grid gap-3 text-sm text-muted">
              <a href="#top" className="transition hover:text-copy">
                X / Twitter
              </a>
              <a href="#top" className="transition hover:text-copy">
                LinkedIn
              </a>
              <a href="#top" className="transition hover:text-copy">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-5 text-xs uppercase tracking-[0.22em] text-muted">
          © 2026 ArchiBrief AI. Built for early-stage architectural clarity.
        </div>
      </div>
    </footer>
  );
}

