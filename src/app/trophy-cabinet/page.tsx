import { PageHeader } from "@/components/layout/page-header";
import { TrophyCabinetView } from "@/components/trophy/trophy-cabinet-view";

export default function TrophyCabinetPage() {
  return (
    <div className="editorial-stack w-full">
      <PageHeader
        eyebrow="Achievements"
        title="Trophy Cabinet"
        description="Predictions won, matches followed, and badges earned."
      />
      <div className="content-pad w-full">
        <TrophyCabinetView />
      </div>
    </div>
  );
}