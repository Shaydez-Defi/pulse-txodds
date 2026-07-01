"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { EnrichedMatch, MomentumDirection } from "@/lib/types";
import { getCountryFlag } from "@/lib/flags";
import clsx from "clsx";

const TABS = ["All", "Live", "Today", "Upcoming", "Finished"] as const;
type Tab = (typeof TABS)[number];

async function fetchMatches(): Promise<EnrichedMatch[]> {
  const res = await fetch("/api/matches");
  if (!res.ok) throw new Error("Failed to fetch matches");
  const data = (await res.json()) as { matches: EnrichedMatch[] };
  return data.matches;
}

function momentumClass(dir: MomentumDirection) {
  if (dir === "up") return "text-green-400";
  if (dir === "down") return "text-red-400";
  return "text-white/40";
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

function MagazineMatchCard({ match }: { match: EnrichedMatch }) {
  const isLive = match.status === "live";
  const pulse = match.pulse;
  const minute = match.minuteLabel.replace("'", "");

  return (
    <Link href={`/match/${match.fixtureId}`} className="block">
      <div
        className="relative mb-4 overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            pulse > 75
              ? "0 0 30px rgba(239,68,68,0.2), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">
            {match.competition}
          </span>
          {isLive && (
            <span className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/20 px-2 py-0.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              <span className="text-xs font-bold text-red-400">{minute}&apos;</span>
            </span>
          )}
        </div>

        {pulse > 75 && (
          <div className="absolute right-4 top-4 rounded-full border border-red-500/40 bg-red-500/20 px-3 py-1">
            <span className="text-xs font-bold text-red-400">⚡ HIGH PRESSURE</span>
          </div>
        )}

        <div className="px-5 pb-5 pt-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-2xl">{getCountryFlag(match.homeTeam)}</span>
                <span
                  className={clsx(
                    "text-xs font-bold uppercase tracking-wider",
                    momentumClass(match.momentumHome)
                  )}
                >
                  {momentumArrow(match.momentumHome)} {match.homeCode}
                </span>
              </div>
              <p className="text-lg font-bold text-white">{match.homeTeam}</p>
            </div>

            <div className="px-4 text-center">
              <p className="text-5xl font-black leading-none tracking-tighter text-white">
                {match.homeScore}
                <span className="mx-1 text-white/20">–</span>
                {match.awayScore}
              </p>
            </div>

            <div className="flex-1 text-right">
              <div className="mb-1 flex items-center justify-end gap-2">
                <span
                  className={clsx(
                    "text-xs font-bold uppercase tracking-wider",
                    momentumClass(match.momentumAway)
                  )}
                >
                  {match.awayCode} {momentumArrow(match.momentumAway)}
                </span>
                <span className="text-2xl">{getCountryFlag(match.awayTeam)}</span>
              </div>
              <p className="text-lg font-bold text-white">{match.awayTeam}</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                Pulse
              </span>
              <span
                className={clsx(
                  "text-xs font-bold",
                  pulse > 75
                    ? "text-red-400"
                    : pulse > 50
                      ? "text-amber-400"
                      : "text-green-400"
                )}
              >
                {pulse}
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${pulse}%`,
                  background:
                    pulse > 75
                      ? "linear-gradient(90deg, #F59E0B, #EF4444)"
                      : pulse > 50
                        ? "linear-gradient(90deg, #22C55E, #F59E0B)"
                        : "#22C55E",
                  boxShadow: `0 0 8px ${pulse > 75 ? "rgba(239,68,68,0.6)" : "rgba(34,197,94,0.4)"}`,
                }}
              />
            </div>
          </div>

          {pulse > 75 && (
            <div
              className="mt-2 rounded-xl px-3 py-2"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <p className="text-xs font-medium text-red-400">
                ⚠️ High pressure — something is coming
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
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
    <div
      className="min-h-screen pb-8"
      style={{
        backgroundColor: "#0a0008",
        backgroundImage: `
          radial-gradient(600px circle at 0% 0%, rgba(220, 38, 38, 0.15), transparent),
          radial-gradient(500px circle at 100% 100%, rgba(124, 58, 237, 0.12), transparent)
        `,
      }}
    >
      <div className="px-6 pb-6 pt-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/30">
          World Cup 2026
        </p>
        <h1 className="font-display text-6xl font-black leading-none tracking-tight text-white">
          LIVE
          <br />
          MATCHES
        </h1>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-sm font-medium text-red-400">
            {isLoading ? "Syncing…" : `${liveCount} matches live now`}
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto px-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              activeTab === tab
                ? "bg-white font-bold text-black"
                : "border border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-2 md:mx-auto md:max-w-2xl">
        {isLoading ? (
          <p className="px-4 text-white/40">Loading fixtures…</p>
        ) : filtered.length === 0 ? (
          <p className="px-4 text-white/40">No matches in this filter.</p>
        ) : (
          filtered.map((match) => (
            <MagazineMatchCard key={match.fixtureId} match={match} />
          ))
        )}
      </div>
    </div>
  );
}