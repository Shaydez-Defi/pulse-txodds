"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePredictionsStore } from "@/stores/predictions-store";
import { PageHeader } from "@/components/layout/page-header";
import { PulseButton } from "@/components/ui/pulse-button";

export default function MyPulsePage() {
  const { publicKey } = useWallet();
  const predictions = usePredictionsStore((s) => s.predictions);
  const mine = publicKey
    ? predictions.filter((p) => p.wallet === publicKey.toBase58())
    : [];

  return (
    <div className="editorial-stack w-full">
      <PageHeader
        eyebrow="Profile"
        title="My Pulse"
        description="Your submitted predictions and live claims."
      />

      <div className="content-pad w-full">
      {!publicKey ? (
        <div className="flex w-full flex-col items-center rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
          <p className="font-bold text-text-light dark:text-text-dark">
            Connect your wallet to view your prediction history. Browsing does not require a wallet.
          </p>
          <div className="mt-8">
            <PulseButton variant="secondary">Connect Wallet</PulseButton>
          </div>
        </div>
      ) : mine.length === 0 ? (
        <p className="rounded-xl border-0 bg-base-gray p-8 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark">
          No predictions yet. Visit Predict to submit your first call.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {mine.map((p) => (
            <div
              key={p.id}
              className="mb-4 rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray"
            >
              <p className="text-2xl font-black uppercase text-text-light dark:text-text-dark">
                {p.homeTeam} vs {p.awayTeam}
              </p>
              <p className="mt-2 font-bold text-text-light dark:text-text-dark">
                {p.winner === "home" ? p.homeTeam : p.winner === "away" ? p.awayTeam : "Draw"} ·{" "}
                {p.homeScore}-{p.awayScore}
              </p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}