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
      <div className="content-pad flex min-h-[50vh] w-full items-center justify-center">
        <p className="w-full rounded-xl border-0 bg-base-gray p-8 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark">
          Loading match intelligence…
        </p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="content-pad flex min-h-[50vh] w-full items-center justify-center">
        <p className="w-full rounded-xl border-0 bg-base-gray p-8 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark">
          Match not found.
        </p>
      </div>
    );
  }

  const isFinished = match.status === "finished";
  const motm = hotPlayers[0];
  const showAlert = match.anticipation || match.pulse > 75;

  return (
    <div className="editorial-stack w-full">
      <section className="relative mx-0 my-0 min-h-[70vh] w-full rounded-none bg-brand-crimson">
        <div className="absolute bottom-0 left-0 top-0 w-16 bg-brand-purple">
          <div
            className="absolute bottom-0 left-0 w-full bg-brand-lime"
            style={{ height: `${match.pulse}%` }}
          />
        </div>

        <div className="relative z-10 mx-0 my-0 w-full p-8 pt-16 md:p-12">
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
        <section className="content-pad w-full">
          <div className="rounded-xl border-0 border-l-8 border-brand-purple bg-base-gray p-6 shadow-none dark:bg-dark-gray md:p-8">
            <p className="text-2xl font-bold leading-relaxed text-text-light dark:text-text-dark md:text-4xl">
              {anticipationMessage ??
                "High pressure detected — a decisive moment is becoming increasingly likely."}
            </p>
          </div>
        </section>
      )}

      <section className="content-pad grid w-full gap-6 md:grid-cols-2">
        <div className="rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
          <LiveOdds odds={match.odds} />
        </div>
        <div className="rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
          <MomentumTimeline blocks={match.momentumTimeline} />
        </div>
      </section>

      {hotPlayers.length > 0 && (
        <section className="content-pad flex w-full flex-col gap-6">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-lime">
            Hot players
          </p>
          {hotPlayers.map((player) => (
            <HotPlayerCard key={player.id} player={player} />
          ))}
        </section>
      )}

      {isFinished && motm && (
        <div className="content-pad w-full">
          <ManOfTheMatch player={motm} team={motm.team ?? match.homeTeam} />
        </div>
      )}

      <section className="content-pad w-full">
        <div className="rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray md:p-12">
          <StoryCards stories={match.stories} />
        </div>
      </section>

      <section className="content-pad grid w-full gap-6 md:grid-cols-2">
        <div className="rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
          <PlayerMomentumList players={match.players} />
        </div>
        <div className="rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
          <PressureHeatmap zones={match.pressureZones} />
        </div>
      </section>
    </div>
  );
}