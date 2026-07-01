"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePredictionsStore } from "@/stores/predictions-store";
import { PageHeader } from "@/components/layout/page-header";
import { GlassCard } from "@/components/ui/glass-card";

export default function MyPulsePage() {
  const { publicKey } = useWallet();
  const predictions = usePredictionsStore((s) => s.predictions);
  const mine = publicKey
    ? predictions.filter((p) => p.wallet === publicKey.toBase58())
    : [];

  return (
    <section className="pulse-page-bg pulse-page">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          eyebrow="Profile"
          title="My Pulse"
          description="Your submitted predictions and live claims."
        />

        {!publicKey ? (
          <GlassCard>
            <p className="text-[var(--text-secondary)]">
              Connect your wallet to view your prediction history and live claims.
              Browsing matches and Pulse intelligence does not require a wallet.
            </p>
          </GlassCard>
        ) : mine.length === 0 ? (
          <GlassCard>
            <p className="text-[var(--text-secondary)]">
              No predictions yet. Visit Predict to submit your first call.
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {mine.map((p) => (
              <GlassCard key={p.id}>
                <p className="font-medium">
                  {p.homeTeam} vs {p.awayTeam}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {p.winner === "home"
                    ? p.homeTeam
                    : p.winner === "away"
                      ? p.awayTeam
                      : "Draw"}{" "}
                  · {p.homeScore}-{p.awayScore}
                  {p.firstScorer ? ` · ${p.firstScorer}` : ""}
                </p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  {new Date(p.createdAt).toLocaleString()}
                  {p.claimedLive ? " · Live claim recorded" : ""}
                </p>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}