"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { EnrichedMatch, MomentumDirection } from "@/lib/types";
import { getCountryFlag } from "@/lib/flags";
import {
  momentumClass,
  pulseMeterGlow,
  pulseMeterGradient,
  pulseValueTextColor,
} from "@/lib/pulse-engine";
import clsx from "clsx";

const TABS = ["All", "Live", "Today", "Upcoming", "Finished"] as const;
type Tab = (typeof TABS)[number];

async function fetchMatches(): Promise<EnrichedMatch[]> {
  const res = await fetch("/api/matches");
  if (!res.ok) throw new Error("Failed to fetch matches");
  const data = (await res.json()) as { matches: EnrichedMatch[] };
  return data.matches;
}

function momentumArrow(dir: MomentumDirection) {
  if (dir === "up") return "↑";
  if (dir === "down") return "↓";
  return "—";
}

function isToday(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function filterMatches(matches: EnrichedMatch[], tab: Tab) {
  switch (tab) {
    case "Live":
      return matches.filter((m) => m.status === "live");
    case "Today":
      return matches.filter((m) => isToday(m.startTime));
    case "Upcoming":
      return matches.filter((m) => m.status === "scheduled");
    case "Finished":
      return matches.filter((m) => m.status === "finished");
    default:
      return matches;
  }
}

function MagazineMatchCard({ match, index }: { match: EnrichedMatch; index: number }) {
  const isLive = match.status === "live";
  const pulse = match.pulse;
  const minute = match.minuteLabel.replace("'", "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/match/${match.fixtureId}`} className="block">
        <div
          className="glass-secondary relative mb-5 overflow-hidden rounded-2xl p-0 transition-all duration-300 hover:-translate-y-1"
          style={{
            boxShadow:
              pulse > 75
                ? "0 0 32px rgba(124, 58, 237, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
                : undefined,
          }}
        >
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="pulse-eyebrow">{match.competition}</span>
            {isLive && (
              <span className="pulse-live-badge">
                <span className="pulse-live-dot h-1.5 w-1.5" />
                {minute}&apos;
              </span>
            )}
          </div>

          {pulse > 75 && (
            <div className="pulse-pressure-badge absolute right-5 top-5 rounded-full px-3 py-1">
              High pressure
            </div>
          )}

          <div className="px-6 pb-6 pt-14">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-2xl">{getCountryFlag(match.homeTeam)}</span>
                  <span
                    className={clsx(
                      "font-editorial text-xs font-bold uppercase tracking-wider",
                      momentumClass(match.momentumHome)
                    )}
                  >
                    {momentumArrow(match.momentumHome)} {match.homeCode}
                  </span>
                </div>
                <p className="font-editorial text-lg font-semibold text-white">
                  {match.homeTeam}
                </p>
              </div>

              <div className="px-4 text-center">
                <p className="pulse-score text-5xl text-white sm:text-6xl">
                  {match.homeScore}
                  <span className="mx-1 text-white/20">–</span>
                  {match.awayScore}
                </p>
              </div>

              <div className="flex-1 text-right">
                <div className="mb-1 flex items-center justify-end gap-2">
                  <span
                    className={clsx(
                      "font-editorial text-xs font-bold uppercase tracking-wider",
                      momentumClass(match.momentumAway)
                    )}
                  >
                    {match.awayCode} {momentumArrow(match.momentumAway)}
                  </span>
                  <span className="text-2xl">{getCountryFlag(match.awayTeam)}</span>
                </div>
                <p className="font-editorial text-lg font-semibold text-white">
                  {match.awayTeam}
                </p>
              </div>
            </div>

            <div className="mb-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="pulse-eyebrow">Pulse</span>
                <span
                  className="font-headline text-sm"
                  style={{ color: pulseValueTextColor(pulse) }}
                >
                  {pulse}
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${pulse}%`,
                    background: pulseMeterGradient(pulse),
                    boxShadow: pulseMeterGlow(pulse),
                  }}
                />
              </div>
            </div>

            {pulse > 75 && (
              <div className="glass-alert mt-3 rounded-xl px-4 py-3">
                <p className="font-editorial text-xs font-medium text-[#fecaca]">
                  High pressure — something is coming
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { data, isLoading } = useQuery({
    queryKey: ["fixtures"],
    queryFn: fetchMatches,
    refetchInterval: 30_000,
  });

  const matches = data ?? [];
  const liveCount = matches.filter((m) => m.status === "live").length;
  const filtered = useMemo(
    () => filterMatches(matches, activeTab),
    [matches, activeTab]
  );

  return (
    <div className="pulse-page-bg min-h-screen pb-8">
      <div className="pulse-page">
        <p className="pulse-eyebrow mb-3">World Cup 2026</p>
        <h1 className="font-headline text-6xl leading-none tracking-wide text-white md:text-7xl">
          LIVE
          <br />
          MATCHES
        </h1>
        <div className="mt-4 flex items-center gap-2">
          <span className="pulse-live-dot" />
          <span className="font-editorial text-sm font-medium text-[var(--pulse-coral)]">
            {isLoading ? "Syncing…" : `${liveCount} matches live now`}
          </span>
        </div>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto px-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "pulse-tab",
              activeTab === tab ? "pulse-tab-active" : "pulse-tab-inactive"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 md:mx-auto md:max-w-2xl md:px-6">
        {isLoading ? (
          <p className="px-2 text-[var(--text-muted)]">Loading fixtures…</p>
        ) : filtered.length === 0 ? (
          <p className="px-2 text-[var(--text-muted)]">No matches in this filter.</p>
        ) : (
          filtered.map((match, i) => (
            <MagazineMatchCard key={match.fixtureId} match={match} index={i} />
          ))
        )}
      </div>
    </div>
  );
}