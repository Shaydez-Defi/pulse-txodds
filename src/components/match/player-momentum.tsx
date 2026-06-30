import type { PlayerMomentum } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";

export function PlayerMomentumList({ players }: { players: PlayerMomentum[] }) {
  return (
    <div>
      <h3 className="font-display mb-4 text-lg font-semibold">Player momentum</h3>
      <div className="space-y-3">
        {players.map((player) => (
          <GlassCard key={`${player.team}-${player.name}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{player.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{player.team}</p>
              </div>
              {player.trending && (
                <span className="rounded-full border border-[var(--accent-amber)]/30 bg-[var(--accent-amber)]/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#c4b08a]">
                  Trending
                </span>
              )}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-[var(--text-muted)]">Touches</p>
                <p className="mt-1 font-mono text-base">{player.touches}</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Shots</p>
                <p className="mt-1 font-mono text-base">{player.shots}</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Key passes</p>
                <p className="mt-1 font-mono text-base">{player.keyPasses}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}