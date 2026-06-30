"use client";

import { useMatches } from "@/hooks/use-matches";
import { MatchCard } from "@/components/match/match-card";
import { AuroraOrbs } from "@/components/ui/aurora-orbs";

export function LiveMatchesSection() {
  const { data, isLoading } = useMatches();
  const live = data?.filter((m) => m.status === "live") ?? [];

  return (
    <section className="relative px-6 py-24">
      <AuroraOrbs />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-green)]">
              Live now
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight">
              Match intelligence
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            {isLoading ? "Syncing…" : `${live.length} live`}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {(data ?? []).slice(0, 6).map((match) => (
            <MatchCard key={match.fixtureId} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}