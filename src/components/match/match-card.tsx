"use client";

import Link from "next/link";
import type { EnrichedMatch } from "@/lib/types";

export function MatchCard({ match }: { match: EnrichedMatch }) {
  return (
    <Link href={`/match/${match.fixtureId}`} className="block w-full">
      <article className="brutal-stack w-full">
        <div className="w-full bg-brand-purple p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-base-black">
            {match.competition} · {match.minuteLabel}
          </p>
          <p className="text-5xl font-black uppercase leading-none tracking-tighter text-base-black md:text-6xl">
            {match.homeTeam} vs {match.awayTeam}
          </p>
          <p className="text-[12vw] font-black leading-none tracking-tighter text-base-black md:text-8xl">
            {match.homeScore} - {match.awayScore}
          </p>
        </div>
        <div className="h-24 w-full bg-base-offwhite">
          <div
            className="h-full bg-brand-lime"
            style={{ width: `${match.pulse}%` }}
          />
        </div>
      </article>
    </Link>
  );
}