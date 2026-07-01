"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { EnrichedMatch } from "@/lib/types";
import { pulseColor } from "@/lib/pulse-engine";
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
    icon: "pulse" as const,
  },
  {
    title: "See It Before It Happens",
    description:
      "Anticipation Alerts fire before goals, red cards, and momentum shifts. Not after. Before.",
    icon: "lightning" as const,
  },
  {
    title: "Read the Pitch",
    description:
      "AI narratives explain why the match is changing. No stats to decode. Just the story of the game.",
    icon: "story" as const,
  },
];

export default function HomePage() {
  const [narrative, setNarrative] = useState(FALLBACK_NARRATIVES[0]);
  const [fallbackIndex, setFallbackIndex] = useState(0);

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
          dangerousAttacks: FEATURED.dangerousAttacks,
          corners: FEATURED.corners,
          possession: FEATURED.possessionHome,
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as { narrative?: string };
        if (data.narrative) {
          setNarrative(data.narrative);
          return;
        }
      }
    } catch {
      /* fall through to mock rotation */
    }

    setFallbackIndex((i) => {
      const next = (i + 1) % FALLBACK_NARRATIVES.length;
      setNarrative(FALLBACK_NARRATIVES[next]);
      return next;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(fetchNarrative, 30_000);
    return () => clearInterval(timer);
  }, [fetchNarrative]);

  const pulseBarColor = pulseColor(FEATURED.pulse);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-16">

        {/* Section 1 — Featured Match */}
        <section>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Featured · Live
                </p>
                <h1 className="font-display mt-2 text-2xl font-bold sm:text-3xl">
                  {FEATURED.homeTeam}{" "}
                  <span className="text-[var(--text-muted)]">vs</span>{" "}
                  {FEATURED.awayTeam}
                </h1>
              </div>
              <div className="text-right">
                <p className="font-display text-4xl font-bold sm:text-5xl">
                  {FEATURED.homeScore} – {FEATURED.awayScore}
                </p>
                <p className="mt-1 text-sm font-medium text-green-400">
                  {FEATURED.minute}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
                <span>Pulse</span>
                <span style={{ color: pulseBarColor }}>{FEATURED.pulse}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${FEATURED.pulse}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full animate-pulse-breathe"
                  style={{ backgroundColor: pulseBarColor }}
                />
              </div>
            </div>

            {FEATURED.pulse > 75 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10 px-4 py-3"
              >
                <p className="text-sm font-medium text-[#d4b0a8]">
                  <span className="mr-2 inline-block animate-pulse">⚠️</span>
                  High pressure — something is coming
                </p>
              </motion.div>
            )}

            <div className="mt-8 rounded-xl border border-white/8 bg-black/20 px-5 py-6 sm:px-8 sm:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-green)]">
                Pulse reads the match
              </p>
              <div className="mt-4 min-h-[4.5rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={narrative}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-lg font-medium leading-relaxed text-white/90 sm:text-xl"
                  >
                    {narrative}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/8 pt-6">
              <Stat label="Possession" value={`${FEATURED.possessionHome}% – ${FEATURED.possessionAway}%`} />
              <Stat label="Dangerous Attacks" value={`${FEATURED.dangerousAttacks}`} sub="last 10 mins" />
              <Stat label="Corners" value={`${FEATURED.corners}`} sub="last 10 mins" />
            </div>

            <div className="mt-8 flex justify-center sm:justify-start">
              <Link
                href="/match/demo"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Watch Match
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2 — Live Intelligence Feed */}
        <section>
          <h2 className="font-display text-lg font-semibold tracking-tight text-white">
            ⚡ Live across all matches
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Anticipation alerts firing right now
          </p>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {LIVE_ALERTS.map((alert) => (
              <div
                key={alert.match}
                className="min-w-64 shrink-0 rounded-xl border border-white/10 bg-white/5 p-4 md:min-w-0"
              >
                <p className="text-sm font-medium text-white">
                  <span className="mr-1 inline-block animate-pulse">⚠️</span>
                  {alert.match} · {alert.minute}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {alert.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — What Makes Pulse Different */}
        <section>
          <h2 className="font-display mb-6 text-lg font-semibold text-white">
            What makes Pulse different
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <FeatureIcon type={feature.icon} />
                <h3 className="font-display mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4 — Other Live Matches */}
        <section>
          <h2 className="font-display text-lg font-semibold text-white">
            🔴 Live now
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {LIVE_MATCHES.map((match) => (
              <MatchCard key={match.fixtureId} match={match} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/matches"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              View All Matches
            </Link>
          </div>
        </section>

        {/* Section 5 — Upcoming Matches */}
        <section>
          <h2 className="font-display text-lg font-semibold text-white">
            📅 Coming up
          </h2>
          <div className="mt-6 space-y-3">
            {UPCOMING.map((fixture) => (
              <div
                key={`${fixture.home}-${fixture.away}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl"
              >
                <p className="font-medium text-white">
                  {fixture.home}{" "}
                  <span className="text-[var(--text-muted)]">vs</span>{" "}
                  {fixture.away}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {fixture.kickoff}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <p className="text-xs uppercase tracking-wider text-white/50">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-white">{value}</p>
      {sub && <p className="text-[10px] text-[var(--text-muted)]">{sub}</p>}
    </div>
  );
}

function FeatureIcon({ type }: { type: "pulse" | "lightning" | "story" }) {
  if (type === "lightning") {
    return <span className="text-3xl">⚡</span>;
  }

  if (type === "story") {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-green)]">
        <path
          d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 12l-4 2.5 1.5-4.5L6 7.5h4.5L12 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M5 19h14M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-[var(--accent-red)]">
      <motion.path
        d="M4 12h3l2-5 3 10 2-6 2 4h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}