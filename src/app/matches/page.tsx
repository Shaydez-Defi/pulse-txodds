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

function EditorialMatchRow({ match }: { match: EnrichedMatch }) {
  const isLive = match.status === "live";

  return (
    <Link href={`/match/${match.fixtureId}`} className="block w-full">
      <article className="overflow-hidden rounded-xl border-0 bg-base-gray shadow-none dark:bg-dark-gray">
        <div
          className={clsx(
            "mx-0 my-0 w-full rounded-none p-6 md:p-10",
            isLive ? "bg-brand-crimson" : "bg-brand-purple"
          )}
        >
          <p
            className={clsx(
              "text-xs font-bold uppercase tracking-widest",
              isLive ? "text-white" : "text-base-black"
            )}
          >
            {match.competition}
            {isLive && ` · ${match.minuteLabel}`}
          </p>
          <p
            className={clsx(
              "text-[20vh] font-black leading-none tracking-tighter",
              isLive ? "text-white" : "text-base-black"
            )}
          >
            {match.homeScore} - {match.awayScore}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 md:p-10">
          <div>
            <p className="text-4xl font-black uppercase leading-none tracking-tighter text-text-light dark:text-text-dark md:text-6xl">
              {match.homeTeam}
            </p>
            <p className="text-4xl font-black uppercase leading-none tracking-tighter text-text-light dark:text-text-dark md:text-6xl">
              {match.awayTeam}
            </p>
          </div>

          <div className="h-6 w-full bg-base-offwhite dark:bg-base-black">
            <div
              className="h-6 bg-brand-lime"
              style={{ width: `${match.pulse}%` }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-text-light dark:text-text-dark">
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
    <div className="editorial-stack w-full">
      <header className="pulse-hero-block mx-0 my-0 w-full rounded-none bg-brand-purple p-8 md:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-base-black">World Cup 2026</p>
        <h1 className="mt-2 text-6xl font-black uppercase leading-none tracking-tighter text-base-black md:text-8xl">
          All Matches
        </h1>
        <p className="mt-4 text-lg font-bold text-base-black">
          {isLoading ? "Syncing…" : `${liveCount} live now`}
        </p>
      </header>

      <div className="content-pad flex w-full flex-wrap gap-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-tight transition-colors",
              activeTab === tab
                ? "bg-brand-lime text-base-black"
                : "bg-base-gray text-text-light hover:bg-brand-purple hover:text-base-black dark:bg-dark-gray dark:text-text-dark dark:hover:text-base-black"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="content-pad flex w-full flex-col gap-6">
        {isLoading ? (
          <p className="rounded-xl border-0 bg-base-gray p-8 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark">
            Loading fixtures…
          </p>
        ) : filtered.length === 0 ? (
          <p className="rounded-xl border-0 bg-base-gray p-8 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark">
            No matches in this filter.
          </p>
        ) : (
          filtered.map((match) => (
            <EditorialMatchRow key={match.fixtureId} match={match} />
          ))
        )}
      </div>
    </div>
  );
}