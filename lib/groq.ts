import "server-only";

export type SpaceProgramItem = {
  name: string;
  areaTarget: string;
  priority: "high" | "medium" | "low";
};

export type GroqBriefResponse = {
  summary: string;
  spaceProgram: SpaceProgramItem[];
  zoningLogic: string[];
  constraints: string[];
  followUpQuestions: string[];
};

export type GroqRequestPayload = {
  notes: string;
  projectType?: string;
};

const DEFAULT_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

export function buildBriefPrompt({ notes, projectType }: GroqRequestPayload) {
  return [
    "You are ArchiBrief AI, an assistant for architects and interior designers.",
    "Convert messy client notes into a concise early-stage architectural brief.",
    "Return valid JSON only with this exact shape:",
    JSON.stringify(
      {
        summary: "string",
        spaceProgram: [
          { name: "string", areaTarget: "string", priority: "high | medium | low" }
        ],
        zoningLogic: ["string"],
        constraints: ["string"],
        followUpQuestions: ["string"]
      },
      null,
      2
    ),
    "Keep outputs practical and professional. Do not invent precise measurements unless clearly implied.",
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
    summary: typeof parsed.summary === "string" ? parsed.summary : "",
    spaceProgram: Array.isArray(parsed.spaceProgram)
      ? parsed.spaceProgram
          .filter(Boolean)
          .map((item) => ({
            name: typeof item?.name === "string" ? item.name : "Untitled space",
            areaTarget: typeof item?.areaTarget === "string" ? item.areaTarget : "TBD",
            priority:
              item?.priority === "high" || item?.priority === "medium" || item?.priority === "low"
                ? item.priority
                : "medium"
          }))
      : [],
    zoningLogic: Array.isArray(parsed.zoningLogic)
      ? parsed.zoningLogic.filter((item): item is string => typeof item === "string")
      : [],
    constraints: Array.isArray(parsed.constraints)
      ? parsed.constraints.filter((item): item is string => typeof item === "string")
      : [],
    followUpQuestions: Array.isArray(parsed.followUpQuestions)
      ? parsed.followUpQuestions.filter((item): item is string => typeof item === "string")
      : []
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
            "You are a precise architectural briefing assistant. Return valid JSON only and keep outputs concise."
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
