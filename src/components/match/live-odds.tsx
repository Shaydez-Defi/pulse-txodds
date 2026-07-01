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
      <h3 className="font-editorial mb-5 text-lg font-semibold">Win probability</h3>
      <div className="space-y-5">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">{row.label}</span>
              <span className="font-mono text-[var(--text-primary)]">
                {row.value.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--pulse-violet) 0%, var(--pulse-purple) 100%)",
                }}
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