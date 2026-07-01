"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";

const MOCK_MESSAGES = [
  {
    id: "1",
    user: "KopEnd_88",
    time: "2m ago",
    text: "Liverpool have won possession five times in a row — something's building.",
  },
  {
    id: "2",
    user: "NorthLondon",
    time: "1m ago",
    text: "Arsenal can't get out of their own half right now.",
  },
  {
    id: "3",
    user: "PulseBot",
    time: "Just now",
    text: "Pulse Meter climbing — pressure building in the final third.",
  },
];

export function FanChatPlaceholder() {
  const [draft, setDraft] = useState("");

  return (
    <GlassCard variant="primary" className="flex min-h-[28rem] flex-col">
      <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-green)]">
            Live
          </p>
          <p className="mt-1 font-medium">Match room</p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)]">
          128 watching
        </span>
      </div>

      <ul className="flex-1 space-y-4 overflow-y-auto pr-1">
        {MOCK_MESSAGES.map((msg) => (
          <li key={msg.id} className="rounded-xl bg-white/[0.03] px-4 py-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-white/90">{msg.user}</span>
              <span className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
                {msg.time}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {msg.text}
            </p>
          </li>
        ))}
      </ul>

      <form
        className="mt-4 flex gap-2 border-t border-white/8 pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          setDraft("");
        }}
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Join the conversation…"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-[var(--text-muted)] focus:border-white/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
        >
          Send
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
        Placeholder UI — live chat backend not wired yet.
      </p>
    </GlassCard>
  );
}