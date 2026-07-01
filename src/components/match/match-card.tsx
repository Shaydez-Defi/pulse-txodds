"use client";

import Link from "next/link";
import type { EnrichedMatch } from "@/lib/types";

export function MatchCard({ match }: { match: EnrichedMatch }) {
  const isLive = match.status === "live";

  return (
    <Link href={`/match/${match.fixtureId}`} className="block w-full">
      <article className="overflow-hidden rounded-xl border-0 shadow-none">
        <div
          className={`mx-0 my-0 w-full p-6 md:p-8 ${isLive ? "bg-brand-crimson" : "bg-brand-purple"}`}
        >
          <p
            className={`text-xs font-bold uppercase tracking-widest ${isLive ? "text-white" : "text-base-black"}`}
          >
            {match.competition} · {match.minuteLabel}
          </p>
          <p
            className={`mt-2 text-5xl font-black uppercase leading-none tracking-tighter md:text-6xl ${isLive ? "text-white" : "text-base-black"}`}
          >
            {match.homeTeam} vs {match.awayTeam}
          </p>
          <p
            className={`text-[12vw] font-black leading-none tracking-tighter md:text-8xl ${isLive ? "text-white" : "text-base-black"}`}
          >
            {match.homeScore} - {match.awayScore}
          </p>
        </div>
        <div className="bg-base-gray p-6 dark:bg-dark-gray">
          <div className="h-6 w-full bg-base-offwhite dark:bg-base-black">
            <div
              className="h-6 bg-brand-lime"
              style={{ width: `${match.pulse}%` }}
            />
          </div>
          <p className="mt-2 text-right text-sm font-bold text-text-light dark:text-text-dark">
            Pulse {match.pulse}
          </p>
        </div>
      </article>
    </Link>
  );
}