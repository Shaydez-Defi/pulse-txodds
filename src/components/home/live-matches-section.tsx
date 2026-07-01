"use client";

import { useMatches } from "@/hooks/use-matches";
import { MatchCard } from "@/components/match/match-card";

export function LiveMatchesSection() {
  const { data, isLoading } = useMatches();
  const live = data?.filter((m) => m.status === "live") ?? [];

  return (
    <section className="flex flex-col gap-8">
      <div className="mx-0 my-0 w-full rounded-none bg-brand-purple p-8">
        <p className="text-sm font-bold uppercase text-base-black">Live now</p>
        <h2 className="mt-2 text-4xl font-black uppercase text-base-black">Match intelligence</h2>
        <p className="mt-2 font-bold text-base-black">
          {isLoading ? "Syncing…" : `${live.length} live`}
        </p>
      </div>
      <div className="content-pad flex w-full flex-col gap-6">
        {(data ?? []).slice(0, 6).map((match) => (
          <MatchCard key={match.fixtureId} match={match} />
        ))}
      </div>
    </section>
  );
}