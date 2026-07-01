import type { PlayerMomentum } from "@/lib/types";

export function PlayerMomentumList({ players }: { players: PlayerMomentum[] }) {
  return (
    <div className="brutal-stack w-full">
      <h3 className="text-2xl font-black uppercase text-base-black">Player momentum</h3>
      {players.map((player) => (
        <div
          key={`${player.team}-${player.name}`}
          className="w-full border-0 border-t-4 border-base-black pt-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-black uppercase text-base-black">{player.name}</p>
              <p className="font-bold text-base-black">{player.team}</p>
            </div>
            {player.trending && (
              <span className="bg-brand-crimson px-3 py-1 text-xs font-bold uppercase text-white">
                Trending
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-0 border-0 border-t-4 border-base-black">
            <div className="border-0 border-r-4 border-base-black p-3 text-center">
              <p className="text-xs font-bold uppercase">Touches</p>
              <p className="text-2xl font-black">{player.touches}</p>
            </div>
            <div className="border-0 border-r-4 border-base-black p-3 text-center">
              <p className="text-xs font-bold uppercase">Shots</p>
              <p className="text-2xl font-black">{player.shots}</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-xs font-bold uppercase">Key passes</p>
              <p className="text-2xl font-black">{player.keyPasses}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}