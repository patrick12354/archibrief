"use client";

import type { GroqBriefResponse } from "@/lib/brief-types";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 44;
const TOP_MARGIN = 52;
const BOTTOM_MARGIN = 44;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

export async function exportBriefToPdf(params: {
  projectType: string;
  notes: string;
  result: GroqBriefResponse;
}) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const { projectType, notes, result } = params;
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const colors = {
    text: rgb(0.11, 0.13, 0.11),
    muted: rgb(0.37, 0.44, 0.37),
    panel: rgb(0.95, 0.96, 0.94),
    border: rgb(0.84, 0.87, 0.84),
    dark: rgb(0.05, 0.07, 0.06),
    dark2: rgb(0.09, 0.11, 0.09),
    lime: rgb(0.78, 1, 0.31),
    white: rgb(0.96, 0.97, 0.94)
  };

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - TOP_MARGIN;

  function resetPage() {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - TOP_MARGIN;
  }

  function ensureSpace(minHeight: number) {
    if (y - minHeight < BOTTOM_MARGIN) {
      resetPage();
    }
  }

  function wrap(text: string, size: number, maxWidth: number) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [""];
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (regular.widthOfTextAtSize(candidate, size) <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }

    if (current) lines.push(current);
    return lines;
  }

  function wrapParagraphs(text: string, size: number, maxWidth: number) {
    return text
      .split(/\n+/)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .flatMap((chunk) => wrap(chunk, size, maxWidth));
  }

  function drawCover() {
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: colors.dark });
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 230, width: PAGE_WIDTH, height: 230, color: colors.dark2 });
    page.drawRectangle({ x: MARGIN_X, y: PAGE_HEIGHT - 92, width: 150, height: 26, borderColor: colors.lime, borderWidth: 1 });
    page.drawText("ARCHIBRIEF AI", {
      x: MARGIN_X + 14,
      y: PAGE_HEIGHT - 84,
      font: bold,
      size: 10,
      color: colors.lime
    });
    page.drawText("Architectural Brief Package", {
      x: MARGIN_X,
      y: PAGE_HEIGHT - 146,
      font: bold,
      size: 30,
      color: colors.white
    });

    const subLines = wrap(
      "Generated from raw client notes for early-stage design thinking, briefing, zoning, and concept preparation.",
      11,
      360
    );
    let subY = PAGE_HEIGHT - 174;
    subLines.forEach((line) => {
      page.drawText(line, { x: MARGIN_X, y: subY, font: regular, size: 11, color: rgb(0.78, 0.82, 0.79) });
      subY -= 16;
    });

    page.drawRectangle({ x: MARGIN_X, y: PAGE_HEIGHT - 286, width: CONTENT_WIDTH, height: 92, color: rgb(0.96, 0.97, 0.94) });
    page.drawText("PROJECT TYPE", { x: MARGIN_X + 16, y: PAGE_HEIGHT - 220, font: bold, size: 8, color: colors.muted });
    page.drawText(projectType || "General architectural briefing", {
      x: MARGIN_X + 16,
      y: PAGE_HEIGHT - 246,
      font: regular,
      size: 12,
      color: colors.text,
      maxWidth: 230
    });
    page.drawText("GENERATED", { x: MARGIN_X + 282, y: PAGE_HEIGHT - 220, font: bold, size: 8, color: colors.muted });
    page.drawText(new Date().toLocaleString(), {
      x: MARGIN_X + 282,
      y: PAGE_HEIGHT - 246,
      font: regular,
      size: 12,
      color: colors.text,
      maxWidth: 180
    });

    page.drawRectangle({ x: MARGIN_X, y: 72, width: CONTENT_WIDTH, height: 1, color: rgb(0.19, 0.23, 0.19) });
    page.drawText("ArchiBrief AI Prototype Export", {
      x: MARGIN_X,
      y: 52,
      font: regular,
      size: 9,
      color: rgb(0.68, 0.72, 0.69)
    });
  }

  function startBodyPage() {
    resetPage();
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 86, width: PAGE_WIDTH, height: 86, color: colors.dark });
    page.drawText("ArchiBrief AI", { x: MARGIN_X, y: PAGE_HEIGHT - 34, font: bold, size: 11, color: colors.lime });
    page.drawText("Structured Architectural Brief", {
      x: MARGIN_X,
      y: PAGE_HEIGHT - 54,
      font: bold,
      size: 18,
      color: colors.white
    });
    y = PAGE_HEIGHT - 112;
  }

  function drawSection(title: string, lines: string[], options?: { tinted?: boolean }) {
    const wrapped = lines.flatMap((line) => wrap(line, 11, CONTENT_WIDTH - 28));
    const boxHeight = 36 + wrapped.length * 16 + 18;
    ensureSpace(boxHeight + 14);
    const boxY = y - boxHeight;

    page.drawRectangle({
      x: MARGIN_X,
      y: boxY,
      width: CONTENT_WIDTH,
      height: boxHeight,
      color: options?.tinted ? rgb(0.94, 0.98, 0.9) : colors.panel,
      borderColor: options?.tinted ? colors.lime : colors.border,
      borderWidth: 1
    });

    page.drawText(title.toUpperCase(), { x: MARGIN_X + 14, y: y - 20, font: bold, size: 8, color: colors.muted });

    let lineY = y - 42;
    wrapped.forEach((line) => {
      page.drawText(line, { x: MARGIN_X + 14, y: lineY, font: regular, size: 11, color: colors.text });
      lineY -= 16;
    });

    y = boxY - 14;
  }

  function drawBulletSection(title: string, items: string[]) {
    drawSection(title, items.map((item) => `• ${item}`), { tinted: title === "Design Drivers" || title === "Next Design Moves" });
  }

  function drawObjectCards<T>(
    title: string,
    items: T[],
    render: (item: T) => string[]
  ) {
    const lines = items.flatMap((item, index) => {
      const row = render(item);
      return index === items.length - 1 ? row : [...row, ""];
    });
    drawSection(title, lines);
  }

  drawCover();
  startBodyPage();
  drawSection("Client Notes", wrapParagraphs(notes, 11, CONTENT_WIDTH - 28));
  drawSection("Summary", wrapParagraphs(result.summary, 11, CONTENT_WIDTH - 28), { tinted: true });
  drawSection("Project Vision", wrapParagraphs(result.projectVision, 11, CONTENT_WIDTH - 28));
  drawBulletSection("Design Drivers", result.designDrivers);
  drawObjectCards("Space Program", result.spaceProgram, (item) => [
    `${item.name} | ${item.areaTarget} | ${item.priority.toUpperCase()} priority`,
    `Purpose: ${item.purpose}`,
    `Notes: ${item.notes}`
  ]);
  drawObjectCards("Adjacency Plan", result.adjacencyPlan, (item) => [
    `${item.space}`,
    `Near: ${item.near.join(", ") || "-"}`,
    `Separate from: ${item.separateFrom.join(", ") || "-"}`
  ]);
  drawObjectCards("Zoning Strategy", result.zoningStrategy, (item) => [
    `${item.zone}`,
    `Strategy: ${item.strategy}`,
    `Reasoning: ${item.reasoning}`
  ]);
  drawBulletSection("Circulation Strategy", result.circulationStrategy);
  drawBulletSection("Site + Climate Response", result.siteClimateResponse);
  drawObjectCards("Constraints", result.constraints, (item) => [
    `${item.type}: ${item.title}`,
    item.detail
  ]);
  drawBulletSection("Assumptions", result.assumptions);
  drawObjectCards("Regulatory Watchouts", result.regulatoryWatchouts, (item) => [
    `${item.topic}`,
    `Check: ${item.check}`,
    `Implication: ${item.implication}`
  ]);
  drawObjectCards("Material + Moodboard Direction", result.materialMoodboard, (item) => [
    `${item.zone}`,
    `Palette: ${item.palette}`,
    `Notes: ${item.notes}`
  ]);
  drawBulletSection("Next Design Moves", result.nextDesignMoves);
  drawBulletSection("Follow-up Questions", result.followUpQuestions);

  const pdfBytes = await pdf.save();
  const blob = new Blob([Uint8Array.from(pdfBytes).buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `archibrief-${slugify(projectType || "architectural-brief")}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}
