import { MatchDetailView } from "@/components/match/match-detail-view";
import { DEMO_ANTICIPATION_MESSAGE, DEMO_MATCH } from "@/lib/demo-match-data";

export default function DemoMatchPage() {
  return (
    <section className="pulse-page-bg pulse-page">
      <div className="mx-auto max-w-7xl">
        <MatchDetailView
          match={DEMO_MATCH}
          anticipationMessage={DEMO_ANTICIPATION_MESSAGE}
        />
      </div>
    </section>
  );
}