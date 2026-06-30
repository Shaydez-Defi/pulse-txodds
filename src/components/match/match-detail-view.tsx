"use client";

import { motion } from "framer-motion";
import { useMatchDetail } from "@/hooks/use-match-detail";
import { useStadiumStore } from "@/stores/stadium-store";
import { AnticipationBanner } from "./anticipation-banner";
import { CircularPulseMeter } from "./circular-pulse-meter";
import { LiveOdds } from "./live-odds";
import { MomentumTimeline } from "./momentum-timeline";
import { PlayerMomentumList } from "./player-momentum";
import { PressureHeatmap } from "./pressure-heatmap";
import { StoryCards } from "./story-cards";

export function MatchDetailView({ fixtureId }: { fixtureId: number }) {
  const { data: match, isLoading } = useMatchDetail(fixtureId);
  const theme = useStadiumStore((s) => s.theme);

  if (isLoading || !match) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[var(--text-muted)]">
        Loading match intelligence…
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div
        className="rounded-2xl border border-white/8 px-8 py-10"
        style={{ background: theme.gradient }}
      >
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {match.competition}
            </p>
            <h1 className="font-display mt-4 text-3xl font-bold md:text-4xl">
              {match.homeTeam}
            </h1>
          </div>
          <div className="text-center">
            <p className="font-display text-5xl font-bold">
              {match.homeScore} – {match.awayScore}
            </p>
            <p className="mt-2 text-sm uppercase tracking-widest text-[var(--accent-green)]">
              {match.minuteLabel}
            </p>
          </div>
          <div className="text-center md:text-right">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              {match.awayTeam}
            </h1>
          </div>
        </div>
      </div>

      <AnticipationBanner show={match.pulse > 75} />

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="flex justify-center lg:justify-start">
          <CircularPulseMeter value={match.pulse} phase={match.phase} />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <LiveOdds odds={match.odds} />
          <MomentumTimeline blocks={match.momentumTimeline} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <StoryCards stories={match.stories} />
        <PlayerMomentumList players={match.players} />
      </div>

      <PressureHeatmap zones={match.pressureZones} />
    </motion.div>
  );
}