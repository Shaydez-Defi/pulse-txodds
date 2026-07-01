"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EnrichedMatch } from "@/lib/types";
import { getCountryFlag } from "@/lib/flags";
import { momentumClass } from "@/lib/pulse-engine";
import { GlassCard } from "@/components/ui/glass-card";
import { PulseMeterBar } from "@/components/ui/pulse-meter-bar";
import clsx from "clsx";

function getCardGlow(pulse: number) {
  if (pulse > 90) {
    return "0 0 24px rgba(249, 112, 102, 0.22), 0 0 60px rgba(124, 58, 237, 0.08)";
  }
  if (pulse > 75) {
    return "0 0 20px rgba(124, 58, 237, 0.18), 0 0 48px rgba(124, 58, 237, 0.06)";
  }
  return "none";
}

function MomentumArrow({ dir }: { dir: "up" | "down" | "neutral" }) {
  if (dir === "neutral") return <span className="text-[var(--text-muted)]">—</span>;
  return (
    <span className={momentumClass(dir)}>
      {dir === "up" ? "↑" : "↓"}
    </span>
  );
}

export function MatchCard({ match }: { match: EnrichedMatch }) {
  const live = match.status === "live";
  const finished = match.status === "finished";

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/match/${match.fixtureId}`}
        className="transition-colors hover:text-[var(--pulse-violet-soft)]"
      >
        <GlassCard
          className="glass-secondary relative block overflow-hidden p-6 transition-all duration-200 hover:border-white/20"
          style={{ boxShadow: getCardGlow(match.pulse) }}
        >
          {match.anticipation && (
            <div className="pulse-pressure-badge absolute right-4 top-4 z-10 animate-pulse-breathe rounded-full px-3 py-1">
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
              <p className="font-editorial mt-1 truncate text-base font-semibold text-white">
                {getCountryFlag(match.homeTeam)} {match.homeTeam}
              </p>
            </div>

            <div className="text-center">
              <p className="pulse-score text-4xl text-white sm:text-5xl">
                {match.homeScore} – {match.awayScore}
              </p>
              <p
                className={clsx(
                  "mt-1 uppercase tracking-widest",
                  live && "text-sm font-medium text-[var(--pulse-coral)]",
                  finished && "text-xs text-[var(--text-muted)]",
                  !live && !finished && "text-xs text-[var(--text-secondary)]"
                )}
              >
                {live && <span className="pulse-live-dot mr-2" />}
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
              <p className="font-editorial mt-1 truncate text-base font-semibold text-white">
                {match.awayTeam} {getCountryFlag(match.awayTeam)}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <PulseMeterBar value={match.pulse} />
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}