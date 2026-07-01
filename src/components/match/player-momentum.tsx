import type { PlayerMomentum } from "@/lib/types";

export function PlayerMomentumList({ players }: { players: PlayerMomentum[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-black uppercase text-text-light dark:text-text-dark">
        Player momentum
      </h3>
      {players.map((player) => (
        <div
          key={`${player.team}-${player.name}`}
          className="rounded-xl bg-base-offwhite p-6 dark:bg-base-black"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-black uppercase text-text-light dark:text-text-dark">
                {player.name}
              </p>
              <p className="font-bold text-text-light dark:text-text-dark">{player.team}</p>
            </div>
            {player.trending && (
              <span className="rounded-xl bg-brand-crimson px-3 py-1 text-xs font-bold uppercase text-white">
                Trending
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-base-gray p-3 text-center dark:bg-dark-gray">
              <p className="text-xs font-bold uppercase text-text-light dark:text-text-dark">
                Touches
              </p>
              <p className="text-2xl font-black text-text-light dark:text-text-dark">
                {player.touches}
              </p>
            </div>
            <div className="rounded-xl bg-base-gray p-3 text-center dark:bg-dark-gray">
              <p className="text-xs font-bold uppercase text-text-light dark:text-text-dark">
                Shots
              </p>
              <p className="text-2xl font-black text-text-light dark:text-text-dark">
                {player.shots}
              </p>
            </div>
            <div className="rounded-xl bg-base-gray p-3 text-center dark:bg-dark-gray">
              <p className="text-xs font-bold uppercase text-text-light dark:text-text-dark">
                Key passes
              </p>
              <p className="text-2xl font-black text-text-light dark:text-text-dark">
                {player.keyPasses}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}