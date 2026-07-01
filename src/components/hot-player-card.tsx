import type { HotPlayer } from "@/lib/api-football";

export function HotPlayerCard({ player }: { player: HotPlayer }) {
  return (
    <div className="flex w-full items-center gap-6 rounded-xl border-0 bg-base-gray p-6 shadow-none dark:bg-dark-gray">
      <img
        src={player.photo}
        alt={player.name}
        className="h-16 w-16 rounded-xl object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=7C3AED&color=F9FAFB&size=64`;
        }}
      />
      <div className="flex-1">
        <p className="text-xl font-black uppercase text-text-light dark:text-text-dark">
          {player.name}
        </p>
        <p className="font-bold text-text-light dark:text-text-dark">
          {player.shots} shots · {player.goals} goals
        </p>
      </div>
      <div className="rounded-xl bg-brand-crimson px-6 py-4 text-center">
        <p className="text-3xl font-black text-white">{player.rating.toFixed(1)}</p>
        <p className="text-xs font-bold uppercase text-white">rating</p>
      </div>
    </div>
  );
}