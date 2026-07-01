"use client";

import { useMatches } from "@/hooks/use-matches";
import { PredictFixtureCard } from "@/components/predict/predict-fixture-card";
import { PageHeader } from "@/components/layout/page-header";

export default function PredictPage() {
  const { data } = useMatches();
  const upcoming = (data ?? []).filter((m) => m.status !== "finished");

  return (
    <div className="editorial-stack w-full">
      <PageHeader
        eyebrow="Predict"
        title="Call the match"
        description="Submit predictions before kickoff. Claim live calls during the match."
      />
      <div className="content-pad flex w-full flex-col gap-6">
        {upcoming.map((match) => (
          <PredictFixtureCard key={match.fixtureId} match={match} />
        ))}
      </div>
    </div>
  );
}