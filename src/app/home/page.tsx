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
    <div className="brutal-stack w-full">
      <section className="relative w-full bg-brand-crimson">
        <div className="absolute bottom-0 left-0 top-0 w-16 bg-base-black">
          <div
            className="absolute bottom-0 left-0 w-full bg-brand-lime"
            style={{ height: `${FEATURED.pulse}%` }}
          />
        </div>
        <div className="relative p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-white">
            Featured · Live · {FEATURED.minute}
          </p>
          <p className="mt-4 text-[18vh] font-black leading-none tracking-tighter text-white">
            {FEATURED.homeScore} - {FEATURED.awayScore}
          </p>
          <p className="mt-4 text-4xl font-black uppercase text-white md:text-6xl">
            {FEATURED.homeTeam} vs {FEATURED.awayTeam}
          </p>

          <div className="mt-8 w-full bg-base-black p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-lime">
              Pulse reads the match
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={narrative}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-2xl font-bold leading-tight text-white md:text-3xl"
              >
                {narrative}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-0 grid w-full grid-cols-3 gap-0 border-0 border-t-4 border-base-black">
            <Stat label="Possession" value={`${FEATURED.possessionHome}% / ${FEATURED.possessionAway}%`} />
            <Stat label="Danger" value={`${FEATURED.dangerousAttacks}`} />
            <Stat label="Corners" value={`${FEATURED.corners}`} />
          </div>

          <Link
            href="/match/demo"
            className="mt-0 inline-block w-full bg-brand-lime py-6 text-center text-2xl font-bold text-base-black"
          >
            Watch Match
          </Link>
        </div>
      </section>

      <section className="w-full bg-base-black p-8 md:p-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-lime">
          Live across all matches
        </h2>
        <div className="brutal-stack mt-0 w-full">
          {LIVE_ALERTS.map((alert) => (
            <div key={alert.match} className="w-full border-0 border-t-4 border-brand-purple p-8">
              <p className="text-4xl font-bold leading-none tracking-tighter text-white">
                {alert.match} · {alert.minute}
              </p>
              <p className="mt-4 text-2xl font-bold text-base-offwhite">{alert.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="brutal-stack w-full">
        <div className="w-full bg-base-offwhite p-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-base-black">
            What makes Pulse different
          </h2>
        </div>
        {FEATURES.map((feature) => (
          <div key={feature.title} className="w-full border-0 border-t-4 border-base-black bg-brand-purple p-8">
            <h3 className="text-3xl font-black uppercase text-base-black">{feature.title}</h3>
            <p className="mt-4 text-lg font-bold text-base-black">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="brutal-stack w-full">
        <div className="w-full bg-base-black p-8">
          <h2 className="text-4xl font-black uppercase text-brand-lime">Live now</h2>
        </div>
        {LIVE_MATCHES.map((match) => (
          <MatchCard key={match.fixtureId} match={match} />
        ))}
        <Link
          href="/matches"
          className="block w-full bg-brand-lime py-8 text-center text-xl font-bold text-base-black"
        >
          View All Matches
        </Link>
      </section>

      <section className="brutal-stack w-full">
        <div className="w-full bg-base-offwhite p-8">
          <h2 className="text-4xl font-black uppercase text-base-black">Coming up</h2>
        </div>
        {UPCOMING.map((fixture) => (
          <div
            key={`${fixture.home}-${fixture.away}`}
            className="flex w-full items-center justify-between border-0 border-t-4 border-base-black bg-base-offwhite p-8"
          >
            <p className="text-2xl font-black uppercase text-base-black md:text-4xl">
              {fixture.home} vs {fixture.away}
            </p>
            <p className="text-lg font-bold text-base-black">{fixture.kickoff}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-0 border-r-4 border-base-black bg-base-offwhite p-6 last:border-r-0">
      <p className="text-xs font-bold uppercase tracking-widest text-base-black">{label}</p>
      <p className="mt-2 text-2xl font-black text-base-black">{value}</p>
    </div>
  );
}