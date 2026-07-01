"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { EnrichedMatch } from "@/lib/types";
import { MatchCard } from "@/components/match/match-card";

const FEATURED = {
  homeTeam: "England",
  awayTeam: "Brazil",
  homeScore: 2,
  awayScore: 1,
  minute: "82'",
  pulse: 91,
  possessionHome: 58,
  possessionAway: 42,
  dangerousAttacks: 7,
  corners: 4,
};

const FALLBACK_NARRATIVES = [
  "Brazil are suffocating England's midfield. Three consecutive turnovers in four minutes. Something is coming.",
  "England have forced four dangerous entries into Brazil's final third. The pressure is becoming unsustainable.",
  "A goal feels inevitable. Brazil's defensive line is dropping dangerously deep under sustained English pressure.",
  "The momentum has completely shifted. England are dictating every phase of play.",
];

const LIVE_ALERTS = [
  {
    match: "Argentina vs France",
    minute: "71'",
    text: "Momentum swinging toward France. Three consecutive possession wins.",
  },
  {
    match: "Spain vs Germany",
    minute: "58'",
    text: "Germany pressing high. Spain struggling to build from back.",
  },
  {
    match: "Netherlands vs Morocco",
    minute: "67'",
    text: "Corner sequence building. Fourth corner in six minutes.",
  },
  {
    match: "Portugal vs USA",
    minute: "44'",
    text: "USA counterattack threat rising. Portugal losing midfield control.",
  },
];

const LIVE_MATCHES: EnrichedMatch[] = [
  {
    fixtureId: 18175918,
    competition: "World Cup",
    homeTeam: "Argentina",
    awayTeam: "France",
    homeCode: "ARG",
    awayCode: "FRA",
    homeScore: 0,
    awayScore: 0,
    minuteLabel: "34'",
    status: "live",
    pulse: 52,
    phase: "warming",
    momentumHome: "neutral",
    momentumAway: "up",
    startTime: Date.now() - 2_100_000,
    odds: { home: 36.0, draw: 31.2, away: 32.8 },
    anticipation: false,
  },
  {
    fixtureId: 18179551,
    competition: "World Cup",
    homeTeam: "Spain",
    awayTeam: "Germany",
    homeCode: "ESP",
    awayCode: "GER",
    homeScore: 1,
    awayScore: 2,
    minuteLabel: "58'",
    status: "live",
    pulse: 71,
    phase: "hot",
    momentumHome: "down",
    momentumAway: "up",
    startTime: Date.now() - 3_600_000,
    odds: { home: 28.4, draw: 27.8, away: 43.8 },
    anticipation: false,
  },
  {
    fixtureId: 18172280,
    competition: "World Cup",
    homeTeam: "Netherlands",
    awayTeam: "Morocco",
    homeCode: "NED",
    awayCode: "MAR",
    homeScore: 1,
    awayScore: 1,
    minuteLabel: "67'",
    status: "live",
    pulse: 78,
    phase: "hot",
    momentumHome: "up",
    momentumAway: "down",
    startTime: Date.now() - 4_200_000,
    odds: { home: 38.2, draw: 29.1, away: 32.7 },
    anticipation: true,
  },
  {
    fixtureId: 18179801,
    competition: "World Cup",
    homeTeam: "Portugal",
    awayTeam: "USA",
    homeCode: "POR",
    awayCode: "USA",
    homeScore: 2,
    awayScore: 0,
    minuteLabel: "44'",
    status: "live",
    pulse: 45,
    phase: "warming",
    momentumHome: "up",
    momentumAway: "down",
    startTime: Date.now() - 2_700_000,
    odds: { home: 55.0, draw: 25.0, away: 20.0 },
    anticipation: false,
  },
];

const UPCOMING = [
  { home: "Japan", away: "Croatia", kickoff: "Today 18:00" },
  { home: "Brazil", away: "Switzerland", kickoff: "Today 21:00" },
  { home: "England", away: "Senegal", kickoff: "Tomorrow 15:00" },
  { home: "France", away: "Poland", kickoff: "Tomorrow 18:00" },
];

const FEATURES = [
  {
    title: "Feel the Match",
    description:
      "Our Pulse Meter measures match intensity in real time. Not just possession — pressure, momentum, danger.",
  },
  {
    title: "See It Before It Happens",
    description:
      "Anticipation Alerts fire before goals, red cards, and momentum shifts. Not after. Before.",
  },
  {
    title: "Stories, Not Stats",
    description:
      "AI narrative reads the match like a broadcast analyst — turning data into editorial tension.",
  },
];

export default function HomeDashboardPage() {
  const [narrative, setNarrative] = useState(FALLBACK_NARRATIVES[0]);

  const fetchNarrative = useCallback(async () => {
    try {
      const res = await fetch("/api/narrative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeTeam: FEATURED.homeTeam,
          awayTeam: FEATURED.awayTeam,
          homeScore: FEATURED.homeScore,
          awayScore: FEATURED.awayScore,
          minute: FEATURED.minute,
          pulse: FEATURED.pulse,
        }),
      });
      if (!res.ok) return;
      const data = (await res.json()) as { narrative?: string };
      if (data.narrative) setNarrative(data.narrative);
    } catch {
      setNarrative(
        FALLBACK_NARRATIVES[Math.floor(Math.random() * FALLBACK_NARRATIVES.length)]
      );
    }
  }, []);

  useEffect(() => {
    void fetchNarrative();
    const timer = setInterval(fetchNarrative, 30_000);
    return () => clearInterval(timer);
  }, [fetchNarrative]);

  return (
    <div className="editorial-stack w-full">
      <section className="relative mx-0 my-0 w-full rounded-none bg-brand-crimson">
        <div className="absolute bottom-0 left-0 top-0 w-16 bg-brand-purple">
          <div
            className="absolute bottom-0 left-0 w-full bg-brand-lime"
            style={{ height: `${FEATURED.pulse}%` }}
          />
        </div>
        <div className="relative mx-0 my-0 w-full space-y-6 p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-white">
            Featured · Live · {FEATURED.minute}
          </p>
          <p className="text-[18vh] font-black leading-none tracking-tighter text-white">
            {FEATURED.homeScore} - {FEATURED.awayScore}
          </p>
          <p className="text-4xl font-black uppercase text-white md:text-6xl">
            {FEATURED.homeTeam} vs {FEATURED.awayTeam}
          </p>

          <div className="space-y-4 rounded-xl border-0 border-l-8 border-brand-purple bg-base-gray p-6 shadow-none dark:bg-dark-gray">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              Pulse reads the match
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={narrative}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-bold leading-relaxed text-text-light dark:text-text-dark md:text-3xl"
              >
                {narrative}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row">
            <Stat label="Possession" value={`${FEATURED.possessionHome}% / ${FEATURED.possessionAway}%`} />
            <Stat label="Danger" value={`${FEATURED.dangerousAttacks}`} />
            <Stat label="Corners" value={`${FEATURED.corners}`} />
          </div>

          <Link
            href="/match/demo"
            className="mx-0 my-0 block w-full rounded-xl bg-brand-lime py-6 text-center text-2xl font-bold text-base-black transition-opacity hover:opacity-90"
          >
            Watch Match
          </Link>
        </div>
      </section>

      <section className="content-pad flex w-full flex-col gap-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-lime">
          Live across all matches
        </h2>
        <div className="flex w-full flex-col gap-6">
          {LIVE_ALERTS.map((alert) => (
            <div
              key={alert.match}
              className="rounded-xl border-0 border-l-8 border-brand-purple bg-base-gray p-6 shadow-none dark:bg-dark-gray"
            >
              <p className="text-2xl font-bold leading-none tracking-tight text-text-light dark:text-text-dark md:text-4xl">
                {alert.match} · {alert.minute}
              </p>
              <p className="mt-4 text-xl font-bold leading-relaxed text-text-light dark:text-text-dark md:text-2xl">
                {alert.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="content-pad flex w-full flex-col gap-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-text-light dark:text-text-dark">
          What makes Pulse different
        </h2>
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border-0 border-l-8 border-brand-purple bg-base-gray p-6 shadow-none dark:bg-dark-gray"
          >
            <h3 className="text-3xl font-black uppercase text-text-light dark:text-text-dark">
              {feature.title}
            </h3>
            <p className="mt-4 text-lg font-bold leading-relaxed text-text-light dark:text-text-dark">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section className="flex w-full flex-col gap-8">
        <div className="mx-0 my-0 w-full rounded-none bg-brand-purple p-8">
          <h2 className="text-4xl font-black uppercase text-base-black">Live now</h2>
        </div>
        <div className="content-pad flex w-full flex-col gap-6">
          {LIVE_MATCHES.map((match) => (
            <MatchCard key={match.fixtureId} match={match} />
          ))}
        </div>
        <div className="content-pad w-full">
          <Link
            href="/matches"
            className="mx-0 my-0 block w-full rounded-xl bg-brand-lime py-8 text-center text-xl font-bold text-base-black transition-opacity hover:opacity-90"
          >
            View All Matches
          </Link>
        </div>
      </section>

      <section className="content-pad flex w-full flex-col gap-8">
        <h2 className="text-4xl font-black uppercase text-text-light dark:text-text-dark">
          Coming up
        </h2>
        <div className="flex w-full flex-col gap-4">
          {UPCOMING.map((fixture) => (
            <div
              key={`${fixture.home}-${fixture.away}`}
              className="flex w-full items-center justify-between rounded-xl border-0 bg-base-gray p-6 shadow-none dark:bg-dark-gray"
            >
              <p className="text-2xl font-black uppercase text-text-light dark:text-text-dark md:text-4xl">
                {fixture.home} vs {fixture.away}
              </p>
              <p className="text-lg font-bold text-text-light dark:text-text-dark">
                {fixture.kickoff}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden rounded-xl border-0 bg-base-gray p-8 text-center shadow-none dark:bg-dark-gray">
      <span className="absolute left-0 top-0 h-8 w-2 bg-brand-crimson" aria-hidden />
      <p className="text-xs font-bold uppercase tracking-widest text-text-light dark:text-text-dark">
        {label}
      </p>
      <p className="mt-2 text-6xl font-black text-text-light dark:text-text-dark">{value}</p>
    </div>
  );
}