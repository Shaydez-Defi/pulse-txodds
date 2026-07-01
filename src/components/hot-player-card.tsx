import type { HotPlayer } from "@/lib/api-football";

export function HotPlayerCard({ player }: { player: HotPlayer }) {
  return (
    <div className="glass-secondary flex items-center gap-4 rounded-xl p-5">
      <div className="relative">
        <img
          src={player.photo}
          alt={player.name}
          className="h-12 w-12 rounded-full border-2 border-[var(--pulse-purple)]/40 object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=7c3aed&color=fff&size=48`;
          }}
        />
        <span className="absolute -right-1 -top-1 text-xs">🔥</span>
      </div>
      <div className="flex-1">
        <p className="font-editorial text-sm font-semibold text-white">{player.name}</p>
        <p className="text-xs text-white/50">
          {player.shots} shots · {player.goals} goals
        </p>
      </div>
      <div className="text-right">
        <p className="pulse-score text-xl text-[var(--pulse-coral)]">
          {player.rating.toFixed(1)}
        </p>
        <p className="text-xs text-white/30">rating</p>
      </div>
    </div>
  );
}