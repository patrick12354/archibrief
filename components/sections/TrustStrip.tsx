import { trustBadges } from "@/lib/data";

export function TrustStrip() {
  return (
    <section className="section-shell pb-8">
      <div className="panel overflow-hidden rounded-[1.75rem] border-white/8 px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-muted"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

