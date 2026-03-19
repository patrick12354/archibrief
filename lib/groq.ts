import "server-only";
import type {
  AdjacencyItem,
  ConstraintItem,
  GroqBriefResponse,
  GroqRequestPayload,
  MaterialDirectionItem,
  RegulatoryItem,
  SpaceProgramItem,
  ZoningItem
} from "@/lib/brief-types";

const DEFAULT_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export type { GroqBriefResponse, GroqRequestPayload } from "@/lib/brief-types";

export function buildBriefPrompt({ notes, projectType }: GroqRequestPayload) {
  return [
    "You are ArchiBrief AI, an assistant for architects and interior designers working on early-stage briefing and concept preparation.",
    "Convert messy client notes into a detailed architectural planning brief that helps an architect start layout thinking, room organization, zoning, material direction, and follow-up discovery.",
    "Do not generate floor plans. Do not pretend uncertain facts are confirmed. Use practical architectural language.",
    "Return valid JSON only with this exact shape:",
    JSON.stringify(
      {
        summary: "string",
        projectVision: "string",
        designDrivers: ["string"],
        spaceProgram: [
          {
            name: "string",
            areaTarget: "string",
            priority: "high | medium | low",
            purpose: "string",
            notes: "string"
          }
        ],
        adjacencyPlan: [
          {
            space: "string",
            near: ["string"],
            separateFrom: ["string"]
          }
        ],
        zoningStrategy: [
          {
            zone: "string",
            strategy: "string",
            reasoning: "string"
          }
        ],
        circulationStrategy: ["string"],
        siteClimateResponse: ["string"],
        constraints: [
          {
            type: "string",
            title: "string",
            detail: "string"
          }
        ],
        assumptions: ["string"],
        regulatoryWatchouts: [
          {
            topic: "string",
            check: "string",
            implication: "string"
          }
        ],
        materialMoodboard: [
          {
            zone: "string",
            palette: "string",
            notes: "string"
          }
        ],
        nextDesignMoves: ["string"],
        followUpQuestions: ["string"]
      },
      null,
      2
    ),
    "Keep outputs concise but useful. Prefer 4-8 items in major lists. Prioritize residential or small-studio practicality when context is incomplete.",
    `Project type: ${projectType || "general architectural briefing"}`,
    "Client notes:",
    notes
  ].join("\n\n");
}

export function parseGroqJson(content: string): GroqBriefResponse {
  const cleaned = content.trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Groq response did not contain valid JSON.");
  }

  const parsed = JSON.parse(cleaned.slice(start, end + 1)) as Partial<GroqBriefResponse>;

  return {
    summary: stringOrEmpty(parsed.summary),
    projectVision: stringOrEmpty(parsed.projectVision),
    designDrivers: stringArray(parsed.designDrivers),
    spaceProgram: spaceProgramArray(parsed.spaceProgram),
    adjacencyPlan: adjacencyArray(parsed.adjacencyPlan),
    zoningStrategy: zoningArray(parsed.zoningStrategy),
    circulationStrategy: stringArray(parsed.circulationStrategy),
    siteClimateResponse: stringArray(parsed.siteClimateResponse),
    constraints: constraintArray(parsed.constraints),
    assumptions: stringArray(parsed.assumptions),
    regulatoryWatchouts: regulatoryArray(parsed.regulatoryWatchouts),
    materialMoodboard: materialArray(parsed.materialMoodboard),
    nextDesignMoves: stringArray(parsed.nextDesignMoves),
    followUpQuestions: stringArray(parsed.followUpQuestions)
  };
}

export async function generateBrief(payload: GroqRequestPayload) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a precise architectural briefing assistant. Return valid JSON only and keep outputs concise, practical, and architect-friendly."
        },
        {
          role: "user",
          content: buildBriefPrompt(payload)
        }
      ]
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq request failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Groq response was empty.");
  }

  return parseGroqJson(content);
}

function stringOrEmpty(value: unknown) {
  return typeof value === "string" ? value : "";
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function spaceProgramArray(value: unknown): SpaceProgramItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(Boolean).map((item) => ({
    name: typeof item?.name === "string" ? item.name : "Untitled space",
    areaTarget: typeof item?.areaTarget === "string" ? item.areaTarget : "TBD",
    priority:
      item?.priority === "high" || item?.priority === "medium" || item?.priority === "low"
        ? item.priority
        : "medium",
    purpose: typeof item?.purpose === "string" ? item.purpose : "",
    notes: typeof item?.notes === "string" ? item.notes : ""
  }));
}

function adjacencyArray(value: unknown): AdjacencyItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(Boolean).map((item) => ({
    space: typeof item?.space === "string" ? item.space : "Untitled space",
    near: stringArray(item?.near),
    separateFrom: stringArray(item?.separateFrom)
  }));
}

function zoningArray(value: unknown): ZoningItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(Boolean).map((item) => ({
    zone: typeof item?.zone === "string" ? item.zone : "Zone",
    strategy: typeof item?.strategy === "string" ? item.strategy : "",
    reasoning: typeof item?.reasoning === "string" ? item.reasoning : ""
  }));
}

function constraintArray(value: unknown): ConstraintItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(Boolean).map((item) => ({
    type: typeof item?.type === "string" ? item.type : "Constraint",
    title: typeof item?.title === "string" ? item.title : "Untitled constraint",
    detail: typeof item?.detail === "string" ? item.detail : ""
  }));
}

function regulatoryArray(value: unknown): RegulatoryItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(Boolean).map((item) => ({
    topic: typeof item?.topic === "string" ? item.topic : "Watchout",
    check: typeof item?.check === "string" ? item.check : "",
    implication: typeof item?.implication === "string" ? item.implication : ""
  }));
}

function materialArray(value: unknown): MaterialDirectionItem[] {
  if (!Array.isArray(value)) return [];

  return value.filter(Boolean).map((item) => ({
    zone: typeof item?.zone === "string" ? item.zone : "General",
    palette: typeof item?.palette === "string" ? item.palette : "",
    notes: typeof item?.notes === "string" ? item.notes : ""
  }));
}
