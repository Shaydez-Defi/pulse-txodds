import type { HotPlayer } from "@/lib/api-football";
import { PulseButton } from "@/components/ui/pulse-button";

export function ManOfTheMatch({
  player,
  team,
}: {
  player: HotPlayer;
  team: string;
}) {
  return (
    <section className="overflow-hidden rounded-xl border-0 bg-base-gray shadow-none dark:bg-dark-gray">
      <div className="mx-0 my-0 w-full rounded-none bg-brand-lime p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-base-black">
          Man of the Match
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-6 p-8 md:flex-row md:items-center">
        <img
          src={player.photo}
          alt={player.name}
          className="h-32 w-32 rounded-xl object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=7C3AED&color=F9FAFB&size=128`;
          }}
        />
        <div className="flex-1">
          <h3 className="text-4xl font-black uppercase text-text-light dark:text-text-dark">
            {player.name}
          </h3>
          <p className="font-bold text-text-light dark:text-text-dark">{team}</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-base-offwhite p-4 text-center dark:bg-base-black">
              <p className="text-3xl font-black text-text-light dark:text-text-dark">
                {player.goals}
              </p>
              <p className="text-xs font-bold uppercase text-text-light dark:text-text-dark">
                Goals
              </p>
            </div>
            <div className="rounded-xl bg-base-offwhite p-4 text-center dark:bg-base-black">
              <p className="text-3xl font-black text-brand-crimson">
                {player.rating.toFixed(1)}
              </p>
              <p className="text-xs font-bold uppercase text-text-light dark:text-text-dark">
                Rating
              </p>
            </div>
            <div className="rounded-xl bg-base-offwhite p-4 text-center dark:bg-base-black">
              <p className="text-3xl font-black text-text-light dark:text-text-dark">
                {player.shots}
              </p>
              <p className="text-xs font-bold uppercase text-text-light dark:text-text-dark">
                Shots
              </p>
            </div>
          </div>
        </div>
        <PulseButton variant="secondary">Share Card</PulseButton>
      </div>
    </section>
  );
}