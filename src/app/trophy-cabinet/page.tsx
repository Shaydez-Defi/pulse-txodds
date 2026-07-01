import { PageHeader } from "@/components/layout/page-header";
import { TrophyCabinetView } from "@/components/trophy/trophy-cabinet-view";

export default function TrophyCabinetPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Achievements"
          title="Trophy Cabinet"
          description="Predictions won, matches followed, and badges earned along the way."
        />
        <TrophyCabinetView />
      </div>
    </section>
  );
}