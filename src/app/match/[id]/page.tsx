import { MatchDetailView } from "@/components/match/match-detail-view";

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fixtureId = Number.parseInt(id, 10);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <MatchDetailView fixtureId={fixtureId} />
      </div>
    </section>
  );
}