import type { GroqBriefResponse } from "@/lib/groq";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderList(items: string[]) {
  return items
    .map(
      (item) => `
        <li>
          <span>${escapeHtml(item)}</span>
        </li>
      `
    )
    .join("");
}

function renderSpaceProgram(items: GroqBriefResponse["spaceProgram"]) {
  return items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.areaTarget)}</td>
          <td>${escapeHtml(item.priority)}</td>
        </tr>
      `
    )
    .join("");
}

export function exportBriefToPdf(params: {
  projectType: string;
  notes: string;
  result: GroqBriefResponse;
}) {
  const { projectType, notes, result } = params;
  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=980,height=1200");

  if (!printWindow) {
    throw new Error("Popup blocked. Please allow popups to export the PDF.");
  }

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ArchiBrief AI Export</title>
        <style>
          :root {
            color-scheme: light;
          }
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: Inter, Arial, sans-serif;
            color: #101414;
            background: #f4f5ef;
          }
          .page {
            max-width: 920px;
            margin: 0 auto;
            padding: 40px;
          }
          .shell {
            background: white;
            border: 1px solid #d9ddd7;
            border-radius: 24px;
            overflow: hidden;
          }
          .hero {
            padding: 32px;
            background: linear-gradient(135deg, #101410 0%, #182119 60%, #d6ff66 220%);
            color: #f7f8f3;
          }
          .eyebrow {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 999px;
            border: 1px solid rgba(214, 255, 102, 0.35);
            color: #d6ff66;
            font-size: 11px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
          }
          h1 {
            margin: 18px 0 8px;
            font-size: 40px;
            line-height: 0.98;
            letter-spacing: -0.05em;
          }
          .sub {
            margin: 0;
            color: rgba(247, 248, 243, 0.74);
            font-size: 15px;
            line-height: 1.7;
          }
          .meta {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            margin-top: 22px;
          }
          .meta-card,
          .section,
          .notes {
            border: 1px solid #d9ddd7;
            border-radius: 20px;
            padding: 20px;
            background: #fff;
          }
          .content {
            padding: 24px;
            display: grid;
            gap: 16px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
          .label {
            margin: 0 0 10px;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #58704f;
          }
          .body {
            margin: 0;
            font-size: 14px;
            line-height: 1.75;
            color: #29302a;
            white-space: pre-wrap;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            padding: 10px 0;
            text-align: left;
            border-bottom: 1px solid #e4e7e1;
            font-size: 14px;
          }
          th {
            font-size: 11px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #58704f;
          }
          ul {
            margin: 0;
            padding-left: 18px;
          }
          li {
            margin: 0 0 10px;
            color: #29302a;
            font-size: 14px;
            line-height: 1.65;
          }
          @media print {
            body {
              background: white;
            }
            .page {
              padding: 0;
              max-width: none;
            }
            .shell {
              border: none;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="shell">
            <div class="hero">
              <span class="eyebrow">ArchiBrief AI Export</span>
              <h1>Structured Architectural Brief</h1>
              <p class="sub">Generated from client notes using the ArchiBrief AI prototype workflow.</p>
              <div class="meta">
                <div class="meta-card">
                  <p class="label">Project Type</p>
                  <p class="body">${escapeHtml(projectType || "General architectural briefing")}</p>
                </div>
                <div class="meta-card">
                  <p class="label">Generated</p>
                  <p class="body">${escapeHtml(new Date().toLocaleString())}</p>
                </div>
              </div>
            </div>
            <div class="content">
              <section class="notes">
                <p class="label">Client Notes</p>
                <p class="body">${escapeHtml(notes)}</p>
              </section>
              <section class="section">
                <p class="label">Summary</p>
                <p class="body">${escapeHtml(result.summary)}</p>
              </section>
              <section class="section">
                <p class="label">Space Program</p>
                <table>
                  <thead>
                    <tr>
                      <th>Space</th>
                      <th>Area Target</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${renderSpaceProgram(result.spaceProgram)}
                  </tbody>
                </table>
              </section>
              <div class="grid">
                <section class="section">
                  <p class="label">Zoning Logic</p>
                  <ul>${renderList(result.zoningLogic)}</ul>
                </section>
                <section class="section">
                  <p class="label">Constraints</p>
                  <ul>${renderList(result.constraints)}</ul>
                </section>
              </div>
              <section class="section">
                <p class="label">Follow-up Questions</p>
                <ul>${renderList(result.followUpQuestions)}</ul>
              </section>
            </div>
          </div>
        </div>
        <script>
          window.addEventListener("load", function () {
            setTimeout(function () {
              window.print();
            }, 250);
          });
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
