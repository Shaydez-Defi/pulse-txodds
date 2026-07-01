"use client";

import { useState } from "react";

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
    <div className="flex min-h-[28rem] w-full flex-col gap-6">
      <div className="mx-0 my-0 flex w-full items-center justify-between rounded-none bg-base-black p-6 text-text-dark">
        <div>
          <p className="text-sm font-bold uppercase text-brand-lime">Live</p>
          <p className="text-2xl font-black uppercase">Match room</p>
        </div>
        <span className="rounded-xl bg-brand-purple px-4 py-2 text-xs font-bold uppercase text-base-black">
          128 watching
        </span>
      </div>

      <ul className="flex flex-1 flex-col gap-4">
        {MOCK_MESSAGES.map((msg) => (
          <li
            key={msg.id}
            className="mb-4 rounded-xl border-0 bg-base-gray p-6 shadow-none dark:bg-dark-gray"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-black uppercase text-text-light dark:text-text-dark">
                {msg.user}
              </span>
              <span className="text-xs font-bold uppercase text-text-light dark:text-text-dark">
                {msg.time}
              </span>
            </div>
            <p className="mt-2 text-lg font-bold text-text-light dark:text-text-dark">
              {msg.text}
            </p>
          </li>
        ))}
      </ul>

      <form
        className="flex w-full gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Say something…"
          className="flex-1 rounded-xl bg-base-gray px-6 py-4 font-bold text-text-light outline-none dark:bg-dark-gray dark:text-text-dark"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-lime px-8 py-4 font-bold uppercase text-base-black transition-opacity hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  );
}