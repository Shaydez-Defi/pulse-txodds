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
    <div className="brutal-stack min-h-[28rem] w-full">
      <div className="flex w-full items-center justify-between bg-base-black p-6 text-base-offwhite">
        <div>
          <p className="text-sm font-bold uppercase text-brand-lime">Live</p>
          <p className="text-2xl font-black uppercase">Match room</p>
        </div>
        <span className="bg-brand-purple px-4 py-2 text-xs font-bold uppercase text-base-black">
          128 watching
        </span>
      </div>

      <ul className="brutal-stack w-full flex-1">
        {MOCK_MESSAGES.map((msg) => (
          <li
            key={msg.id}
            className="w-full border-0 border-t-4 border-base-black bg-base-offwhite p-6"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-black uppercase text-base-black">{msg.user}</span>
              <span className="text-xs font-bold uppercase text-base-black">{msg.time}</span>
            </div>
            <p className="mt-2 text-lg font-bold text-base-black">{msg.text}</p>
          </li>
        ))}
      </ul>

      <form
        className="flex w-full gap-0 border-0 border-t-4 border-base-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Say something…"
          className="flex-1 border-0 bg-base-offwhite px-6 py-4 font-bold text-base-black outline-none"
        />
        <button
          type="submit"
          className="border-0 border-l-4 border-base-black bg-brand-lime px-8 py-4 font-bold uppercase text-base-black"
        >
          Send
        </button>
      </form>
    </div>
  );
}