"use client";

import type { MatchDetail } from "@/lib/types";
import { useMatchDetail } from "@/hooks/use-match-detail";
import { useMatchPlayers } from "@/hooks/use-match-players";
import { HotPlayerCard } from "@/components/hot-player-card";
import { ManOfTheMatch } from "@/components/man-of-match";
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
  const activeFixtureId = fixtureId ?? match?.fixtureId ?? 0;
  const { data: hotPlayers = [] } = useMatchPlayers(activeFixtureId, Boolean(match));

  if (!matchProp && isLoading) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center bg-base-offwhite p-8 font-bold text-base-black">
        Loading match intelligence…
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center bg-base-offwhite p-8 font-bold text-base-black">
        Match not found.
      </div>
    );
  }

  const isFinished = match.status === "finished";
  const motm = hotPlayers[0];
  const showAlert = match.anticipation || match.pulse > 75;

  return (
    <div className="brutal-stack w-full">
      <section className="relative min-h-[70vh] w-full bg-brand-crimson">
        <div className="absolute bottom-0 left-0 top-0 w-16 bg-base-black">
          <div
            className="absolute bottom-0 left-0 w-full bg-brand-lime"
            style={{ height: `${match.pulse}%` }}
          />
        </div>

        <div className="relative z-10 p-8 pt-16 md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-white">
            {match.competition} · {match.minuteLabel}
          </p>
          <p className="mt-4 text-[25vh] font-black leading-none tracking-tighter text-white">
            {match.homeScore} - {match.awayScore}
          </p>
          <p className="mt-6 text-4xl font-black uppercase text-white md:text-6xl">
            {match.homeTeam}
          </p>
          <p className="text-4xl font-black uppercase text-white md:text-6xl">
            {match.awayTeam}
          </p>
        </div>
      </section>

      {showAlert && (
        <section className="w-full bg-base-black p-8 md:p-12">
          <p className="text-2xl font-bold leading-tight text-white md:text-4xl">
            {anticipationMessage ??
              "High pressure detected — a decisive moment is becoming increasingly likely."}
          </p>
        </section>
      )}

      <section className="grid w-full gap-0 md:grid-cols-2">
        <div className="w-full bg-base-offwhite p-8">
          <LiveOdds odds={match.odds} />
        </div>
        <div className="w-full bg-brand-purple p-8">
          <MomentumTimeline blocks={match.momentumTimeline} />
        </div>
      </section>

      {hotPlayers.length > 0 && (
        <section className="brutal-stack w-full">
          <div className="w-full bg-base-black p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-lime">
              Hot players
            </p>
          </div>
          {hotPlayers.map((player) => (
            <HotPlayerCard key={player.id} player={player} />
          ))}
        </section>
      )}

      {isFinished && motm && (
        <ManOfTheMatch player={motm} team={motm.team ?? match.homeTeam} />
      )}

      <section className="w-full bg-base-black p-8 md:p-12">
        <StoryCards stories={match.stories} />
      </section>

      <section className="grid w-full gap-0 md:grid-cols-2">
        <div className="w-full bg-base-offwhite p-8">
          <PlayerMomentumList players={match.players} />
        </div>
        <div className="w-full bg-brand-lime p-8">
          <PressureHeatmap zones={match.pressureZones} />
        </div>
      </section>
    </div>
  );
}