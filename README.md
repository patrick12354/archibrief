# ArchiBrief AI

ArchiBrief AI is a premium AI-assisted briefing tool for architects, interior designers, freelance practitioners, and small design studios.

Live website: [https://archibrief-ai.vercel.app/](https://archibrief-ai.vercel.app/)

## Product Overview

ArchiBrief AI helps turn messy client conversations into a structured architectural brief in minutes.

Instead of starting a project from scattered WhatsApp chats, meeting notes, email threads, and rough requirement lists, the product generates a cleaner planning package that helps architects move into concept work with more confidence.

The prototype focuses on early-stage architectural programming and briefing, not automated design authorship.

## What It Generates

The prototype can produce:

- project summary
- project vision
- design drivers
- space program with area targets, purpose, and notes
- adjacency planning
- zoning strategy
- circulation strategy
- site and climate response
- constraints and assumptions
- regulatory watchouts
- material and moodboard direction
- next design moves
- follow-up questions for the client

It also supports branded PDF export for handoff and documentation.

## Target Users

ArchiBrief AI is designed for:

- residential architects
- interior designers
- freelance architects
- small design studios
- design consultants working on early-stage scope definition

## Tech Stack

This project is built with:

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Groq API
- pdf-lib

## Local Development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Prototype workspace:

```text
http://localhost:3000/prototype
```

## Deployment

This project is ready to deploy on Vercel.

Required environment variables:

- `GROQ_API_KEY`
- `GROQ_MODEL`

Production site:

- [https://archibrief-ai.vercel.app/](https://archibrief-ai.vercel.app/)

## Positioning

ArchiBrief AI is a workflow accelerator for architectural briefing.

It does not replace architects.
It helps professionals clarify requirements earlier, structure scope more clearly, and reduce ambiguity before design exploration begins.
