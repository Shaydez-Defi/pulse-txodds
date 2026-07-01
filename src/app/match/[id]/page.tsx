import { MatchDetailView } from "@/components/match/match-detail-view";

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fixtureId = Number.parseInt(id, 10);

  return (
    <div className="brutal-stack w-full">
      <MatchDetailView fixtureId={fixtureId} />
    </div>
  );
}