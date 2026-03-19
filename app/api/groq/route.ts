import { NextResponse } from "next/server";
import { generateBrief, type GroqRequestPayload } from "@/lib/groq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GroqRequestPayload;
    const notes = body.notes?.trim();

    if (!notes || notes.length < 20) {
      return NextResponse.json(
        { error: "Please provide at least 20 characters of project notes." },
        { status: 400 }
      );
    }

    const result = await generateBrief({
      notes,
      projectType: body.projectType?.trim()
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error while generating brief.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
