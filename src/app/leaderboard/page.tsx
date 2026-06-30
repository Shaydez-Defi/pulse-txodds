import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { PageHeader } from "@/components/layout/page-header";

export default function LeaderboardPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Rankings"
          title="Leaderboard"
          description="Prediction accuracy across connected wallets."
        />
        <LeaderboardTable />
      </div>
    </section>
  );
}