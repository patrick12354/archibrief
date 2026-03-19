"use client";

import { useState } from "react";
import { exportBriefToPdf } from "@/lib/exportBriefPdf";

type BriefResponse = {
  summary: string;
  spaceProgram: Array<{
    name: string;
    areaTarget: string;
    priority: "high" | "medium" | "low";
  }>;
  zoningLogic: string[];
  constraints: string[];
  followUpQuestions: string[];
};

const starterNotes = `Client wants a compact tropical house for a family of four. They need 3 bedrooms, a flexible work room, strong privacy from the street, and better natural ventilation. Budget is moderate and they are worried about west sun heat. They also want the kitchen connected to dining and garden use on weekends.`;

export function PrototypeConsole() {
  const [projectType, setProjectType] = useState("Residential house");
  const [notes, setNotes] = useState(starterNotes);
  const [result, setResult] = useState<BriefResponse | null>(null);
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

      const data = (await response.json()) as BriefResponse & { error?: string };

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

  function handleExportPdf() {
    if (!result) {
      return;
    }

    try {
      exportBriefToPdf({ projectType, notes, result });
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : "Failed to export PDF.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={handleSubmit} className="panel rounded-[1.8rem] border-white/10 p-5 sm:p-6">
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
              rows={10}
              className="min-h-[15rem] rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-4 text-copy outline-none transition focus:border-lime/40"
              placeholder="Paste chat messages, notes, or project requirements..."
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
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
              Export PDF
            </button>
          ) : null}
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}
      </form>

      <div className="panel rounded-[1.8rem] border-lime/15 bg-lime/[0.04] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.26em] text-lime">Generated Output</p>
          <span className="rounded-full border border-lime/20 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-muted">
            JSON-backed
          </span>
        </div>

        {result ? (
          <div className="mt-5 grid gap-4">
            <section className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-lime">Summary</p>
              <p className="mt-3 text-sm leading-7 text-copy">{result.summary}</p>
            </section>

            <section className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-lime">Space Program</p>
              <div className="mt-3 grid gap-3">
                {result.spaceProgram.map((item) => (
                  <div
                    key={`${item.name}-${item.areaTarget}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm"
                  >
                    <div>
                      <p className="text-copy">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                        {item.priority} priority
                      </p>
                    </div>
                    <span className="text-muted">{item.areaTarget}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-4 xl:grid-cols-2">
              <ListCard title="Zoning Logic" items={result.zoningLogic} />
              <ListCard title="Constraints" items={result.constraints} />
            </div>

            <ListCard title="Follow-up Questions" items={result.followUpQuestions} />
          </div>
        ) : (
          <div className="mt-5 rounded-[1.4rem] border border-dashed border-white/10 bg-black/20 p-6">
            <p className="text-sm leading-7 text-muted">
              Paste project notes on the left and generate a structured architectural brief from the
              Groq route.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-lime">{title}</p>
      <div className="mt-3 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm leading-7 text-copy"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
