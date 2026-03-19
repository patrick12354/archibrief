"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Ask me about ArchiBrief AI, what the prototype does, who it is for, or how the workflow helps architects."
  }
];

const quickQuestions = [
  "What does ArchiBrief AI do?",
  "Who is this product for?",
  "Does it generate floor plans?",
  "What can I export from the prototype?"
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: nextMessages })
      });

      const rawText = await response.text();
      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("The chat service returned an unexpected response. Please try again.");
      }

      let data: { reply?: string; error?: string };

      try {
        data = JSON.parse(rawText) as { reply?: string; error?: string };
      } catch {
        throw new Error("The chat service returned invalid JSON. Please try again.");
      }

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Failed to send chat message.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply as string }]);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to send chat message.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] w-[calc(100vw-2rem)] max-w-[24rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0f0c] shadow-[0_20px_48px_rgba(0,0,0,0.34)] sm:right-6 sm:bg-[#0b0f0c]/95 sm:backdrop-blur-2xl"
          >
            <div className="border-b border-white/10 bg-gradient-to-r from-lime/[0.12] via-transparent to-transparent px-4 py-4 sm:px-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-lime">Ask About Us</p>
                  <h3 className="mt-2 text-lg font-medium tracking-[-0.03em] text-copy">ArchiBrief AI Assistant</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Ask about the product, the prototype, or how it helps architects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chatbot"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-copy"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[24rem] overflow-y-auto px-4 py-4 sm:px-5">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => submitMessage(question)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted transition hover:border-lime/30 hover:text-copy"
                  >
                    {question}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[92%] rounded-[1.2rem] px-4 py-3 text-sm leading-7 ${
                      message.role === "assistant"
                        ? "border border-white/10 bg-white/[0.04] text-copy"
                        : "ml-auto border border-lime/20 bg-lime/[0.12] text-copy"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isLoading ? (
                  <div className="max-w-[92%] rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-muted">
                    Thinking...
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-white/10 px-4 py-4 sm:px-5">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  submitMessage(input);
                }}
                className="grid gap-3"
              >
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={3}
                  placeholder="Ask about the product..."
                  className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3 text-sm text-copy outline-none transition focus:border-lime/40"
                />
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs leading-5 text-muted">Answers are focused on ArchiBrief AI and the prototype.</p>
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="inline-flex items-center justify-center rounded-full bg-lime px-4 py-2 text-sm font-medium tracking-[0.06em] text-black transition hover:bg-[#d4ff74] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Send
                  </button>
                </div>
              </form>
              {error ? (
                <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs leading-6 text-red-200">
                  {error}
                </p>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Open chatbot"
        className="fixed bottom-4 right-4 z-[70] flex h-16 w-16 items-center justify-center rounded-full border border-lime/25 bg-[#101410] text-lime shadow-[0_16px_34px_rgba(0,0,0,0.28)] transition hover:scale-[1.02] sm:bottom-6 sm:right-6 sm:bg-[#101410]/95 sm:shadow-glow sm:backdrop-blur-xl"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.2 18.2 3.8 20l1.05-3.7A7.85 7.85 0 0 1 4 12.8C4 8.5 7.58 5 12 5s8 3.5 8 7.8-3.58 7.8-8 7.8c-1.68 0-3.25-.51-4.8-1.4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8.7 11.5h6.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.7 14.6h4.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </>
  );
}

