import { MatchDetailView } from "@/components/match/match-detail-view";
import { DEMO_ANTICIPATION_MESSAGE, DEMO_MATCH } from "@/lib/demo-match-data";

export default function DemoMatchPage() {
  return (
    <div className="w-full">
      <MatchDetailView
        match={DEMO_MATCH}
        anticipationMessage={DEMO_ANTICIPATION_MESSAGE}
      />
    </div>
  );
}