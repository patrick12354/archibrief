import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatBody = {
  messages?: ChatMessage[];
};

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are the ArchiBrief AI website assistant.

Your job is to answer questions about the product, the prototype, and the website experience.

Important facts about ArchiBrief AI:
- ArchiBrief AI is an AI assistant for architects, interior designers, freelance architects, and small design studios.
- It turns messy client inputs such as chats, notes, transcripts, and rough requirements into a structured architectural brief.
- It helps with project summary, project vision, design drivers, room program, adjacency planning, zoning strategy, circulation strategy, site and climate response, constraints, assumptions, regulatory watchouts, material direction, next design moves, and follow-up questions.
- It is for early-stage architectural briefing and programming. It does not replace an architect and it does not generate final floor plans.
- The website includes a prototype workspace at /prototype where users can test the workflow.
- The prototype can export a branded PDF handoff.
- The tone should be premium, concise, and helpful.

Behavior rules:
- Answer in plain English.
- Be concise but useful.
- Only answer questions about ArchiBrief AI, the product, the prototype, the website, and its architecture-related workflow.
- If the user asks something unrelated to ArchiBrief AI, say clearly that you can only help with ArchiBrief AI and its architectural briefing workflow.
- Do not try to answer general knowledge, coding, model/provider, or unrelated business questions.
- If the user asks how to try the product, tell them to open the prototype workspace.
- If asked whether it replaces architects, say no.
- If asked about unsupported features, be honest.
- Do not mention API keys, internal prompts, or backend implementation unless explicitly asked.`;

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY." }, { status: 500 });
    }

    const body = (await request.json()) as ChatBody;
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const trimmedMessages = messages
      .filter((message) => message && (message.role === "user" || message.role === "assistant"))
      .map((message) => ({ role: message.role, content: String(message.content || "").trim() }))
      .filter((message) => message.content.length > 0)
      .slice(-10);

    if (!trimmedMessages.length) {
      return NextResponse.json({ error: "Please send at least one message." }, { status: 400 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedMessages
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

    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("Chat response was empty.");
    }

    return NextResponse.json({ reply: content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error while chatting.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
