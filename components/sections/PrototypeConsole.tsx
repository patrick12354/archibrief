"use client";

import { useState } from "react";
import type {
  AdjacencyItem,
  ConstraintItem,
  GroqBriefResponse,
  MaterialDirectionItem,
  RegulatoryItem,
  SpaceProgramItem,
  ZoningItem
} from "@/lib/brief-types";
import { exportBriefToPdf } from "@/lib/exportBriefPdf";

const starterNotes = `Client wants a compact tropical house for a family of four on a warm urban site. They need 3 bedrooms, a flexible work room, strong privacy from the street, and better natural cross ventilation. Budget is moderate and they are worried about west sun heat. They want the kitchen connected to dining and garden use on weekends, with a calm circulation flow, dry kitchen option, and enough storage for family life.`;

export function PrototypeConsole() {
  const [projectType, setProjectType] = useState("Residential house");
  const [notes, setNotes] = useState(starterNotes);
  const [result, setResult] = useState<GroqBriefResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ notes, projectType })
      });

      const data = (await response.json()) as GroqBriefResponse & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate brief.");
      }

      setResult(data);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to generate brief.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExportPdf() {
    if (!result) return;

    try {
      await exportBriefToPdf({ projectType, notes, result });
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : "Failed to download PDF.");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
      <form onSubmit={handleSubmit} className="panel rounded-[2rem] border-white/10 p-5 sm:p-6 lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.26em] text-lime">Prototype Console</p>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-muted">
            Server-side Groq
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm text-muted">
            <span className="uppercase tracking-[0.2em] text-mist">Project Type</span>
            <input
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-copy outline-none transition focus:border-lime/40"
              placeholder="Residential house"
            />
          </label>

          <label className="grid gap-2 text-sm text-muted">
            <span className="uppercase tracking-[0.2em] text-mist">Client Notes</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={14}
              className="min-h-[18rem] rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-4 text-copy outline-none transition focus:border-lime/40"
              placeholder="Paste chat messages, notes, or project requirements..."
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-full bg-lime px-5 py-3 text-sm font-medium tracking-[0.08em] text-black transition hover:bg-[#d4ff74] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Generating Brief..." : "Generate Brief"}
          </button>
          <button
            type="button"
            onClick={() => {
              setNotes(starterNotes);
              setResult(null);
              setError("");
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium tracking-[0.08em] text-copy transition hover:border-lime/40"
          >
            Reset Example
          </button>
          {result ? (
            <button
              type="button"
              onClick={handleExportPdf}
              className="inline-flex items-center justify-center rounded-full border border-lime/25 bg-lime/10 px-5 py-3 text-sm font-medium tracking-[0.08em] text-lime transition hover:border-lime/40 hover:bg-lime/15"
            >
              Download PDF
            </button>
          ) : null}
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-lime">What the output includes</p>
          <div className="mt-3 grid gap-3 text-sm leading-7 text-muted">
            <p>Project vision and design drivers</p>
            <p>Detailed room program with purpose and notes</p>
            <p>Adjacency, zoning, climate, and circulation guidance</p>
            <p>Constraints, assumptions, regulatory watchouts, and next design moves</p>
          </div>
        </div>
      </form>

      <div className="grid gap-5">
        {result ? (
          <>
            <section className="rounded-[2rem] border border-lime/20 bg-lime/[0.07] p-5 shadow-glow sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-lime/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-lime">
                  Project Summary
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-muted">
                  {projectType}
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-copy sm:text-lg">{result.summary}</p>
              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-lime">Project Vision</p>
                <p className="mt-3 text-sm leading-7 text-copy">{result.projectVision}</p>
              </div>
            </section>

            <ChipSection title="Design Drivers" items={result.designDrivers} tone="lime" />

            <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
              <ObjectStackCard title="Space Program" items={result.spaceProgram} renderItem={renderSpaceProgram} />
              <ObjectStackCard title="Adjacency Plan" items={result.adjacencyPlan} renderItem={renderAdjacency} />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <ObjectStackCard title="Zoning Strategy" items={result.zoningStrategy} renderItem={renderZoning} />
              <SimpleListCard title="Circulation Strategy" items={result.circulationStrategy} />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <SimpleListCard title="Site + Climate Response" items={result.siteClimateResponse} />
              <ObjectStackCard title="Constraints" items={result.constraints} renderItem={renderConstraint} />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <SimpleListCard title="Assumptions" items={result.assumptions} />
              <ObjectStackCard
                title="Regulatory Watchouts"
                items={result.regulatoryWatchouts}
                renderItem={renderRegulatory}
              />
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <ObjectStackCard
                title="Material + Moodboard Direction"
                items={result.materialMoodboard}
                renderItem={renderMaterial}
              />
              <SimpleListCard title="Next Design Moves" items={result.nextDesignMoves} tone="lime" />
            </div>

            <SimpleListCard title="Follow-up Questions" items={result.followUpQuestions} />
          </>
        ) : (
          <section className="panel rounded-[2rem] border-white/10 p-6 sm:p-8">
            <span className="eyebrow">Generated Output</span>
            <h2 className="mt-6 max-w-3xl font-display text-3xl leading-[0.96] tracking-tighter2 text-copy sm:text-4xl">
              Richer architectural output will appear here after you generate the brief.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              The prototype now goes beyond a simple overview. It produces planning intelligence for
              early concept work: design drivers, room schedule, adjacency, zoning, climate response,
              code watchouts, material direction, and next design moves.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

function ChipSection({ title, items, tone = "default" }: { title: string; items: string[]; tone?: "default" | "lime" }) {
  return (
    <section className={`rounded-[1.8rem] border p-5 sm:p-6 ${tone === "lime" ? "border-lime/20 bg-lime/[0.06]" : "border-white/10 bg-white/[0.04]"}`}>
      <p className="text-xs uppercase tracking-[0.22em] text-lime">{title}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-copy">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function SimpleListCard({ title, items, tone = "default" }: { title: string; items: string[]; tone?: "default" | "lime" }) {
  return (
    <section className={`rounded-[1.8rem] border p-5 sm:p-6 ${tone === "lime" ? "border-lime/20 bg-lime/[0.06]" : "border-white/10 bg-white/[0.04]"}`}>
      <p className="text-xs uppercase tracking-[0.22em] text-lime">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-copy">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function ObjectStackCard<T>({
  title,
  items,
  renderItem
}: {
  title: string;
  items: T[];
  renderItem: (item: T) => { eyebrow?: string; title: string; lines: string[] };
}) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-lime">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item, index) => {
          const card = renderItem(item);
          return (
            <div key={`${card.title}-${index}`} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              {card.eyebrow ? (
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-lime">{card.eyebrow}</p>
              ) : null}
              <p className="mt-1 text-base font-medium tracking-[-0.03em] text-copy">{card.title}</p>
              <div className="mt-3 grid gap-2 text-sm leading-7 text-muted">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function renderSpaceProgram(item: SpaceProgramItem) {
  return {
    eyebrow: `${item.priority} priority`,
    title: `${item.name} · ${item.areaTarget}`,
    lines: [`Purpose: ${item.purpose}`, `Notes: ${item.notes}`]
  };
}

function renderAdjacency(item: AdjacencyItem) {
  return {
    title: item.space,
    lines: [
      `Near: ${item.near.join(", ") || "-"}`,
      `Separate from: ${item.separateFrom.join(", ") || "-"}`
    ]
  };
}

function renderZoning(item: ZoningItem) {
  return {
    title: item.zone,
    lines: [item.strategy, `Reasoning: ${item.reasoning}`]
  };
}

function renderConstraint(item: ConstraintItem) {
  return {
    eyebrow: item.type,
    title: item.title,
    lines: [item.detail]
  };
}

function renderRegulatory(item: RegulatoryItem) {
  return {
    title: item.topic,
    lines: [`Check: ${item.check}`, `Implication: ${item.implication}`]
  };
}

function renderMaterial(item: MaterialDirectionItem) {
  return {
    title: item.zone,
    lines: [`Palette: ${item.palette}`, `Notes: ${item.notes}`]
  };
}
