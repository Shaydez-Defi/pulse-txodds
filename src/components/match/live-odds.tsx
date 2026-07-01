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
    <div className="brutal-stack w-full">
      <h3 className="text-2xl font-black uppercase text-base-black">Win probability</h3>
      {rows.map((row) => (
        <div key={row.label} className="w-full border-0 border-t-4 border-base-black pt-6">
          <div className="mb-2 flex justify-between font-bold text-base-black">
            <span>{row.label}</span>
            <span>{row.value.toFixed(1)}%</span>
          </div>
          <div className="h-8 w-full bg-base-black">
            <div className="h-full bg-brand-purple" style={{ width: `${row.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}