"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { EnrichedMatch } from "@/lib/types";
import clsx from "clsx";

const TABS = ["All", "Live", "Today", "Upcoming", "Finished"] as const;
type Tab = (typeof TABS)[number];

async function fetchMatches(): Promise<EnrichedMatch[]> {
  const res = await fetch("/api/matches");
  if (!res.ok) throw new Error("Failed to fetch matches");
  const data = (await res.json()) as { matches: EnrichedMatch[] };
  return data.matches;
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

function BrutalMatchRow({ match }: { match: EnrichedMatch }) {
  const isLive = match.status === "live";
  const topBg = isLive ? "bg-brand-crimson" : "bg-brand-purple";
  const scoreColor = isLive ? "text-white" : "text-base-black";

  return (
    <Link href={`/match/${match.fixtureId}`} className="block w-full">
      <article className="brutal-stack w-full">
        <div
          className={clsx(
            "flex min-h-[40vh] w-full flex-col justify-end p-6 md:p-10",
            topBg
          )}
          style={{ flex: "0 0 60%" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/80">
            {match.competition}
            {isLive && ` · ${match.minuteLabel}`}
          </p>
          <p
            className={clsx(
              "font-black leading-none tracking-tighter",
              scoreColor,
              "text-[20vh]"
            )}
          >
            {match.homeScore} - {match.awayScore}
          </p>
        </div>

        <div className="relative w-full bg-base-offwhite p-6 md:p-10" style={{ flex: "0 0 40%" }}>
          <p className="text-4xl font-black uppercase leading-none tracking-tighter text-base-black md:text-6xl">
            {match.homeTeam}
          </p>
          <p className="mt-2 text-4xl font-black uppercase leading-none tracking-tighter text-base-black md:text-6xl">
            {match.awayTeam}
          </p>

          <div className="relative mt-6 h-24 w-full bg-base-black">
            <div
              className="absolute left-0 top-0 h-full bg-brand-lime"
              style={{ width: `${match.pulse}%` }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-black text-base-black mix-blend-difference">
              {match.pulse}
            </span>
          </div>
        </div>
      </article>
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
    <div className="brutal-stack w-full">
      <header className="w-full bg-base-black p-8 text-base-offwhite md:p-12">
        <p className="text-sm font-bold uppercase tracking-widest">World Cup 2026</p>
        <h1 className="mt-2 text-6xl font-black uppercase leading-none tracking-tighter md:text-8xl">
          All Matches
        </h1>
        <p className="mt-4 text-lg font-bold text-brand-lime">
          {isLoading ? "Syncing…" : `${liveCount} live now`}
        </p>
      </header>

      <div className="flex w-full flex-wrap gap-0 border-0 border-b-4 border-base-black">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "flex-1 px-4 py-4 text-sm font-bold uppercase tracking-tight",
              activeTab === tab
                ? "bg-brand-lime text-base-black"
                : "bg-base-offwhite text-base-black hover:bg-brand-purple"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="brutal-stack w-full">
        {isLoading ? (
          <p className="w-full bg-base-offwhite p-8 font-bold text-base-black">
            Loading fixtures…
          </p>
        ) : filtered.length === 0 ? (
          <p className="w-full bg-base-offwhite p-8 font-bold text-base-black">
            No matches in this filter.
          </p>
        ) : (
          filtered.map((match) => <BrutalMatchRow key={match.fixtureId} match={match} />)
        )}
      </div>
    </div>
  );
}