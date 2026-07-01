"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePredictionsStore } from "@/stores/predictions-store";
import { PageHeader } from "@/components/layout/page-header";

export default function MyPulsePage() {
  const { publicKey } = useWallet();
  const predictions = usePredictionsStore((s) => s.predictions);
  const mine = publicKey
    ? predictions.filter((p) => p.wallet === publicKey.toBase58())
    : [];

  return (
    <div className="brutal-stack w-full">
      <PageHeader
        eyebrow="Profile"
        title="My Pulse"
        description="Your submitted predictions and live claims."
      />

      {!publicKey ? (
        <p className="w-full border-0 border-l-[20px] border-brand-lime bg-base-offwhite p-8 font-bold text-base-black">
          Connect your wallet to view your prediction history. Browsing does not require a wallet.
        </p>
      ) : mine.length === 0 ? (
        <p className="w-full bg-base-offwhite p-8 font-bold text-base-black">
          No predictions yet. Visit Predict to submit your first call.
        </p>
      ) : (
        mine.map((p) => (
          <div
            key={p.id}
            className="w-full border-0 border-t-4 border-base-black bg-base-offwhite p-8"
          >
            <p className="text-2xl font-black uppercase text-base-black">
              {p.homeTeam} vs {p.awayTeam}
            </p>
            <p className="mt-2 font-bold text-base-black">
              {p.winner === "home" ? p.homeTeam : p.winner === "away" ? p.awayTeam : "Draw"} ·{" "}
              {p.homeScore}-{p.awayScore}
            </p>
          </div>
        ))
      )}
    </div>
  );
}