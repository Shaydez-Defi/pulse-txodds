"use client";

import { motion } from "framer-motion";
import type { OddsTriple } from "@/lib/types";

export function LiveOdds({ odds }: { odds: OddsTriple | null }) {
  if (!odds) return null;

  const rows = [
    { label: "Home win", value: odds.home },
    { label: "Draw", value: odds.draw },
    { label: "Away win", value: odds.away },
  ];

  return (
    <div>
      <h3 className="font-display mb-4 text-lg font-semibold">Win probability</h3>
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">{row.label}</span>
              <span className="font-mono">{row.value.toFixed(1)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-[var(--accent-green)]"
                initial={{ width: 0 }}
                animate={{ width: `${row.value}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}