import type { HotPlayer } from "@/lib/api-football";

export function HotPlayerCard({ player }: { player: HotPlayer }) {
  return (
    <div className="glass-secondary flex items-center gap-3 rounded-xl p-4">
      <div className="relative">
        <img
          src={player.photo}
          alt={player.name}
          className="h-12 w-12 rounded-full border-2 border-[#22C55E]/40 object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=22C55E&color=000&size=48`;
          }}
        />
        <span className="absolute -right-1 -top-1 text-xs">🔥</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{player.name}</p>
        <p className="text-xs text-white/50">
          {player.shots} shots · {player.goals} goals
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-[#22C55E]">{player.rating.toFixed(1)}</p>
        <p className="text-xs text-white/30">rating</p>
      </div>
    </div>
  );
}