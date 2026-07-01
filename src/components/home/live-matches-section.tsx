"use client";

import { useMatches } from "@/hooks/use-matches";
import { MatchCard } from "@/components/match/match-card";

export function LiveMatchesSection() {
  const { data, isLoading } = useMatches();
  const live = data?.filter((m) => m.status === "live") ?? [];

  return (
    <section className="brutal-stack w-full">
      <div className="w-full bg-base-black p-8">
        <p className="text-sm font-bold uppercase text-brand-lime">Live now</p>
        <h2 className="text-4xl font-black uppercase text-base-offwhite">
          Match intelligence
        </h2>
        <p className="mt-2 font-bold text-base-offwhite">
          {isLoading ? "Syncing…" : `${live.length} live`}
        </p>
      </div>
      {(data ?? []).slice(0, 6).map((match) => (
        <MatchCard key={match.fixtureId} match={match} />
      ))}
    </section>
  );
}