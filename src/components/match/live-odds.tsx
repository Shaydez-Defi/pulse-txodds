"use client";

import type { OddsTriple } from "@/lib/types";

export function LiveOdds({ odds }: { odds: OddsTriple | null }) {
  if (!odds) return null;

  const rows = [
    { label: "Home win", value: odds.home },
    { label: "Draw", value: odds.draw },
    { label: "Away win", value: odds.away },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-black uppercase text-text-light dark:text-text-dark">
        Win probability
      </h3>
      {rows.map((row) => (
        <div key={row.label} className="rounded-xl border-0 bg-base-offwhite p-6 shadow-none dark:bg-base-black">
          <div className="mb-3 flex justify-between font-bold text-text-light dark:text-text-dark">
            <span>{row.label}</span>
            <span>{row.value.toFixed(1)}%</span>
          </div>
          <div className="h-4 w-full bg-base-gray dark:bg-dark-gray">
            <div
              className="h-4 bg-brand-purple"
              style={{ width: `${row.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}