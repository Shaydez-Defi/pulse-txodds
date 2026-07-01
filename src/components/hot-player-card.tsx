import type { HotPlayer } from "@/lib/api-football";

export function HotPlayerCard({ player }: { player: HotPlayer }) {
  return (
    <div className="flex w-full items-center gap-0 border-0 border-t-4 border-base-black bg-base-offwhite p-6">
      <img
        src={player.photo}
        alt={player.name}
        className="h-16 w-16 border-0 border-r-4 border-base-black object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=9B5DE5&color=1A1A1A&size=64`;
        }}
      />
      <div className="flex-1 px-6">
        <p className="text-xl font-black uppercase text-base-black">{player.name}</p>
        <p className="font-bold text-base-black">
          {player.shots} shots · {player.goals} goals
        </p>
      </div>
      <div className="bg-brand-crimson px-6 py-4 text-center">
        <p className="text-3xl font-black text-white">{player.rating.toFixed(1)}</p>
        <p className="text-xs font-bold uppercase text-white">rating</p>
      </div>
    </div>
  );
}