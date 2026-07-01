"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EnrichedMatch } from "@/lib/types";
import { getCountryFlag } from "@/lib/flags";
import { GlassCard } from "@/components/ui/glass-card";
import { PulseMeterBar } from "@/components/ui/pulse-meter-bar";
import clsx from "clsx";

function getCardGlow(pulse: number) {
  if (pulse > 90) {
    return "0 0 20px rgba(239, 68, 68, 0.20), 0 0 60px rgba(239, 68, 68, 0.08)";
  }
  if (pulse > 75) {
    return "0 0 20px rgba(34, 197, 94, 0.15), 0 0 60px rgba(34, 197, 94, 0.05)";
  }
  return "none";
}

function MomentumArrow({ dir }: { dir: "up" | "down" | "neutral" }) {
  if (dir === "neutral") return <span className="text-[var(--text-muted)]">—</span>;
  return (
    <span className={dir === "up" ? "text-[#22C55E]" : "text-[var(--accent-red)]"}>
      {dir === "up" ? "↑" : "↓"}
    </span>
  );
}

export function MatchCard({ match }: { match: EnrichedMatch }) {
  const live = match.status === "live";
  const finished = match.status === "finished";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/match/${match.fixtureId}`} className="transition-colors hover:text-[#22C55E]">
        <GlassCard
          className="glass-secondary relative block overflow-hidden p-5 transition-all duration-200 hover:border-white/20"
          style={{ boxShadow: getCardGlow(match.pulse) }}
        >
          {match.anticipation && (
            <div className="absolute right-3 top-3 z-10 rounded-full border border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10 px-2 py-1 text-xs uppercase tracking-widest text-[#c9a0a0] animate-pulse">
              High pressure
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {match.homeCode}
                </span>
                <MomentumArrow dir={match.momentumHome} />
              </div>
              <p className="mt-1 truncate text-base font-semibold text-white">
                {getCountryFlag(match.homeTeam)} {match.homeTeam}
              </p>
            </div>

            <div className="text-center">
              <p className="font-display text-4xl font-black tracking-tight text-white">
                {match.homeScore} – {match.awayScore}
              </p>
              <p
                className={clsx(
                  "mt-1 uppercase tracking-widest",
                  live && "text-sm font-medium text-[#22C55E]",
                  finished && "text-xs text-[var(--text-muted)]",
                  !live && !finished && "text-xs text-[var(--text-secondary)]"
                )}
              >
                {live && (
                  <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
                )}
                {match.minuteLabel}
              </p>
            </div>

            <div className="min-w-0 flex-1 text-right">
              <div className="flex items-center justify-end gap-2">
                <MomentumArrow dir={match.momentumAway} />
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {match.awayCode}
                </span>
              </div>
              <p className="mt-1 truncate text-base font-semibold text-white">
                {match.awayTeam} {getCountryFlag(match.awayTeam)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <PulseMeterBar value={match.pulse} />
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}