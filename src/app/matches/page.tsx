"use client";

import { useQuery } from "@tanstack/react-query";
import type { EnrichedMatch } from "@/lib/types";
import { MatchCard } from "@/components/match/match-card";
import { PageHeader } from "@/components/layout/page-header";
import { AuroraOrbs } from "@/components/ui/aurora-orbs";

async function fetchMatches(): Promise<EnrichedMatch[]> {
  const res = await fetch("/api/matches");
  if (!res.ok) throw new Error("Failed to fetch matches");
  const data = (await res.json()) as { matches: EnrichedMatch[] };
  return data.matches;
}

export default function MatchesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["fixtures"],
    queryFn: fetchMatches,
    refetchInterval: 30_000,
  });

  return (
    <section className="relative px-6 py-16">
      <AuroraOrbs />
      <div className="relative mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Fixtures"
          title="All matches"
          description="World Cup and international fixtures with live pulse scoring."
        />
        {isLoading ? (
          <p className="text-[var(--text-muted)]">Loading fixtures…</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {(data ?? []).map((match) => (
              <MatchCard key={match.fixtureId} match={match} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}