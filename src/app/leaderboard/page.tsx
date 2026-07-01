import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { PageHeader } from "@/components/layout/page-header";

export default function LeaderboardPage() {
  return (
    <div className="brutal-stack w-full">
      <PageHeader
        eyebrow="Rankings"
        title="Leaderboard"
        description="Prediction accuracy across connected wallets."
      />
      <LeaderboardTable />
    </div>
  );
}