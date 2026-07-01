"use client";

import { GlassCard } from "@/components/ui/glass-card";

const MOCK_BADGES = [
  { id: "early-bird", label: "Early Pulse", detail: "Followed 10 live matches" },
  { id: "momentum", label: "Momentum Reader", detail: "Spotted 3 turning points" },
  { id: "streak", label: "Hot Streak", detail: "5 predictions in a row" },
];

const MOCK_STATS = [
  { label: "Predictions won", value: "12" },
  { label: "Matches followed", value: "47" },
  { label: "Live claims", value: "8" },
];

export function TrophyCabinetView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {MOCK_STATS.map((stat) => (
          <GlassCard key={stat.label} className="text-center">
            <p className="font-display text-3xl font-bold">{stat.value}</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard variant="primary">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
          Badges
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {MOCK_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="rounded-xl border border-white/8 bg-white/[0.03] p-5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-green)]/15 text-lg">
                ◆
              </div>
              <p className="font-medium">{badge.label}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {badge.detail}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--text-muted)]">
          Placeholder — NFT trophies and on-chain achievements coming later.
        </p>
      </GlassCard>
    </div>
  );
}