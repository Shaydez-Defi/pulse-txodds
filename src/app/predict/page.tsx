"use client";

import { useMatches } from "@/hooks/use-matches";
import { PredictFixtureCard } from "@/components/predict/predict-fixture-card";
import { PageHeader } from "@/components/layout/page-header";

export default function PredictPage() {
  const { data } = useMatches();
  const upcoming = (data ?? []).filter((m) => m.status !== "finished");

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          eyebrow="Predict"
          title="Call the match"
          description="Submit predictions before kickoff. Claim live calls during the match with your wallet."
        />
        <div className="space-y-8">
          {upcoming.map((match) => (
            <PredictFixtureCard key={match.fixtureId} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}