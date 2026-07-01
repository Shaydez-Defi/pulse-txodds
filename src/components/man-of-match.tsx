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
    <div className="glass-primary relative overflow-hidden rounded-2xl p-8 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--pulse-purple)]/12 to-transparent" />
      <p className="pulse-eyebrow relative mb-4 text-[var(--pulse-violet-soft)]">
        Man of the Match
      </p>
      <img
        src={player.photo}
        alt={player.name}
        className="relative mx-auto mb-4 h-24 w-24 rounded-full border-4 border-[var(--pulse-purple)]/40 object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=7c3aed&color=fff&size=96`;
        }}
      />
      <h3 className="font-editorial relative mb-1 text-2xl font-bold text-white">
        {player.name}
      </h3>
      <p className="relative mb-6 text-sm text-white/50">{team}</p>
      <div className="relative grid grid-cols-3 gap-4">
        <div>
          <p className="pulse-score text-3xl text-white">{player.goals}</p>
          <p className="text-xs uppercase tracking-wider text-white/40">Goals</p>
        </div>
        <div>
          <p className="pulse-score text-3xl text-[var(--pulse-coral)]">
            {player.rating.toFixed(1)}
          </p>
          <p className="text-xs uppercase tracking-wider text-white/40">Rating</p>
        </div>
        <div>
          <p className="pulse-score text-3xl text-white">{player.shots}</p>
          <p className="text-xs uppercase tracking-wider text-white/40">Shots</p>
        </div>
      </div>
      <div className="relative mt-8 flex justify-center">
        <PulseButton variant="secondary">Share Card</PulseButton>
      </div>
    </div>
  );
}