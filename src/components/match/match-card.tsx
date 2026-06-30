"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EnrichedMatch } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { PulseMeterBar } from "@/components/ui/pulse-meter-bar";
import clsx from "clsx";

function MomentumArrow({ dir }: { dir: "up" | "down" | "neutral" }) {
  if (dir === "neutral") return <span className="text-[var(--text-muted)]">—</span>;
  return (
    <span className={dir === "up" ? "text-[var(--accent-green)]" : "text-[var(--accent-red)]"}>
      {dir === "up" ? "↑" : "↓"}
    </span>
  );
}

export function MatchCard({ match }: { match: EnrichedMatch }) {
  const live = match.status === "live";
  const finished = match.status === "finished";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/match/${match.fixtureId}`}>
        <GlassCard className="relative block">
          {match.anticipation && (
            <div className="absolute right-4 top-4 rounded-full border border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10 px-3 py-1 text-[10px] uppercase tracking-widest text-[#c9a0a0] animate-pulse">
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
              <p className="mt-1 truncate font-medium">{match.homeTeam}</p>
            </div>

            <div className="text-center">
              <p className="font-display text-3xl font-bold tracking-tight">
                {match.homeScore} – {match.awayScore}
              </p>
              <p
                className={clsx(
                  "mt-1 text-xs uppercase tracking-widest",
                  live && "text-[var(--accent-green)]",
                  finished && "text-[var(--text-muted)]",
                  !live && !finished && "text-[var(--text-secondary)]"
                )}
              >
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
              <p className="mt-1 truncate font-medium">{match.awayTeam}</p>
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