import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { PageHeader } from "@/components/layout/page-header";

export default function LeaderboardPage() {
  return (
    <div className="editorial-stack w-full">
      <PageHeader
        eyebrow="Rankings"
        title="Leaderboard"
        description="Prediction accuracy across connected wallets."
      />
      <div className="content-pad w-full">
        <LeaderboardTable />
      </div>
    </div>
  );
}