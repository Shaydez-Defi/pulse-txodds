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
    <section className="brutal-stack w-full">
      <div className="w-full bg-brand-lime p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-base-black">
          Man of the Match
        </p>
      </div>
      <div className="flex w-full flex-col items-start border-0 border-t-4 border-base-black bg-base-offwhite p-8 md:flex-row md:items-center">
        <img
          src={player.photo}
          alt={player.name}
          className="h-32 w-32 border-0 border-b-4 border-base-black object-cover md:border-b-0 md:border-r-4"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=9B5DE5&color=1A1A1A&size=128`;
          }}
        />
        <div className="flex-1 p-0 md:px-8">
          <h3 className="mt-6 text-4xl font-black uppercase text-base-black md:mt-0">
            {player.name}
          </h3>
          <p className="font-bold text-base-black">{team}</p>
          <div className="mt-6 grid grid-cols-3 gap-0 border-0 border-t-4 border-base-black">
            <div className="border-0 border-r-4 border-base-black p-4">
              <p className="text-3xl font-black text-base-black">{player.goals}</p>
              <p className="text-xs font-bold uppercase">Goals</p>
            </div>
            <div className="border-0 border-r-4 border-base-black p-4">
              <p className="text-3xl font-black text-brand-crimson">{player.rating.toFixed(1)}</p>
              <p className="text-xs font-bold uppercase">Rating</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-black text-base-black">{player.shots}</p>
              <p className="text-xs font-bold uppercase">Shots</p>
            </div>
          </div>
        </div>
        <PulseButton variant="secondary">Share Card</PulseButton>
      </div>
    </section>
  );
}