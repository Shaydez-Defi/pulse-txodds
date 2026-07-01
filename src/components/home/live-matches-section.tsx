"use client";

import { useMatches } from "@/hooks/use-matches";
import { MatchCard } from "@/components/match/match-card";
import { AuroraOrbs } from "@/components/ui/aurora-orbs";

export function LiveMatchesSection() {
  const { data, isLoading } = useMatches();
  const live = data?.filter((m) => m.status === "live") ?? [];

  return (
    <section id="live" className="relative scroll-mt-8 px-6 py-24">
      <AuroraOrbs />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="pulse-eyebrow flex items-center gap-2">
              <span className="pulse-live-dot" />
              Live now
            </p>
            <h2 className="font-headline mt-3 text-4xl tracking-wide text-white">
              Match intelligence
            </h2>
          </div>
          <p className="font-editorial text-sm text-[var(--text-muted)]">
            {isLoading ? "Syncing…" : `${live.length} live`}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {(data ?? []).slice(0, 6).map((match) => (
            <MatchCard key={match.fixtureId} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}