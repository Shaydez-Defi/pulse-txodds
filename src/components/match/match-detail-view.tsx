"use client";

import { motion } from "framer-motion";
import type { MatchDetail } from "@/lib/types";
import { getCountryFlag } from "@/lib/flags";
import { useMatchDetail } from "@/hooks/use-match-detail";
import { useMatchPlayers } from "@/hooks/use-match-players";
import { useStadiumStore } from "@/stores/stadium-store";
import { HotPlayerCard } from "@/components/hot-player-card";
import { ManOfTheMatch } from "@/components/man-of-match";
import { AnticipationBanner } from "./anticipation-banner";
import { CircularPulseMeter } from "./circular-pulse-meter";
import { LiveOdds } from "./live-odds";
import { MomentumTimeline } from "./momentum-timeline";
import { PlayerMomentumList } from "./player-momentum";
import { PressureHeatmap } from "./pressure-heatmap";
import { StoryCards } from "./story-cards";

export function MatchDetailView({
  fixtureId,
  match: matchProp,
  anticipationMessage,
}: {
  fixtureId?: number;
  match?: MatchDetail;
  anticipationMessage?: string;
}) {
  const { data: fetchedMatch, isLoading } = useMatchDetail(
    fixtureId ?? 0,
    !matchProp
  );
  const match = matchProp ?? fetchedMatch;
  const theme = useStadiumStore((s) => s.theme);
  const activeFixtureId = fixtureId ?? match?.fixtureId ?? 0;
  const { data: hotPlayers = [] } = useMatchPlayers(activeFixtureId, Boolean(match));

  if (!matchProp && isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[var(--text-muted)]">
        Loading match intelligence…
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[var(--text-muted)]">
        Match not found.
      </div>
    );
  }

  const isFinished = match.status === "finished";
  const motm = hotPlayers[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div
        className="glass-primary rounded-2xl px-8 py-10"
        style={{ background: theme.gradient }}
      >
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="pulse-eyebrow">{match.competition}</p>
            <h1 className="font-editorial mt-4 text-3xl font-semibold md:text-4xl">
              {getCountryFlag(match.homeTeam)} {match.homeTeam}
            </h1>
          </div>
          <div className="text-center">
            <p className="pulse-score text-7xl text-white md:text-8xl">
              {match.homeScore} – {match.awayScore}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-[var(--pulse-coral)]">
              {match.status === "live" && <span className="pulse-live-dot mr-2" />}
              {match.minuteLabel}
            </p>
          </div>
          <div className="text-center md:text-right">
            <h1 className="font-editorial text-3xl font-semibold md:text-4xl">
              {match.awayTeam} {getCountryFlag(match.awayTeam)}
            </h1>
          </div>
        </div>
      </div>

      <AnticipationBanner
        show={match.anticipation || match.pulse > 75}
        message={anticipationMessage}
      />

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="flex justify-center lg:justify-start">
          <CircularPulseMeter value={match.pulse} phase={match.phase} />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <LiveOdds odds={match.odds} />
          <MomentumTimeline blocks={match.momentumTimeline} />
        </div>
      </div>

      {hotPlayers.length > 0 && (
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
            🔥 Hot players right now
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {hotPlayers.map((player) => (
              <HotPlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      )}

      {isFinished && motm && (
        <ManOfTheMatch player={motm} team={motm.team ?? match.homeTeam} />
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <StoryCards stories={match.stories} />
        <PlayerMomentumList players={match.players} />
      </div>

      <PressureHeatmap zones={match.pressureZones} />
    </motion.div>
  );
}