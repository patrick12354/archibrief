import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArchiBrief AI | From Client Chaos to Architectural Clarity",
  description:
    "ArchiBrief AI turns rough client notes into structured architectural briefs, space programs, zoning logic, constraints, and follow-up questions in minutes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}

