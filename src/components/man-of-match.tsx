import type { HotPlayer } from "@/lib/api-football";

export function ManOfTheMatch({
  player,
  team,
}: {
  player: HotPlayer;
  team: string;
}) {
  return (
    <div className="glass-primary relative overflow-hidden rounded-2xl p-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#22C55E]/10 to-transparent" />
      <p className="relative mb-4 text-xs font-bold uppercase tracking-widest text-[#22C55E]">
        ⭐ Man of the Match
      </p>
      <img
        src={player.photo}
        alt={player.name}
        className="relative mx-auto mb-4 h-24 w-24 rounded-full border-4 border-[#22C55E]/40 object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=22C55E&color=000&size=96`;
        }}
      />
      <h3 className="relative mb-1 text-2xl font-black text-white">{player.name}</h3>
      <p className="relative mb-4 text-sm text-white/50">{team}</p>
      <div className="relative grid grid-cols-3 gap-4">
        <div>
          <p className="text-2xl font-black text-white">{player.goals}</p>
          <p className="text-xs uppercase tracking-wider text-white/40">Goals</p>
        </div>
        <div>
          <p className="text-2xl font-black text-[#22C55E]">
            {player.rating.toFixed(1)}
          </p>
          <p className="text-xs uppercase tracking-wider text-white/40">Rating</p>
        </div>
        <div>
          <p className="text-2xl font-black text-white">{player.shots}</p>
          <p className="text-xs uppercase tracking-wider text-white/40">Shots</p>
        </div>
      </div>
      <button
        type="button"
        className="relative mt-6 rounded-full border border-[#22C55E]/40 px-6 py-2 text-sm text-[#22C55E] transition-colors hover:bg-[#22C55E]/10"
      >
        Share Card
      </button>
    </div>
  );
}