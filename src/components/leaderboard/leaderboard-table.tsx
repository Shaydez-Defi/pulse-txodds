"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePredictionsStore } from "@/stores/predictions-store";
import type { LeaderboardEntry } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import clsx from "clsx";

function shortenWallet(wallet: string) {
  return `${wallet.slice(0, 4)}…${wallet.slice(-4)}`;
}

function buildLeaderboard(predictions: ReturnType<typeof usePredictionsStore.getState>["predictions"]): LeaderboardEntry[] {
  const map = new Map<string, { total: number; correct: number }>();

  for (const p of predictions) {
    const entry = map.get(p.wallet) ?? { total: 0, correct: 0 };
    entry.total += 1;
    if (p.claimedLive) entry.correct += 1;
    map.set(p.wallet, entry);
  }

  const demo: LeaderboardEntry[] = [
    { rank: 1, wallet: "7xKp…9mQ2", predictions: 24, correct: 17, accuracy: 70.8 },
    { rank: 2, wallet: "4nRt…8bW1", predictions: 19, correct: 12, accuracy: 63.2 },
    { rank: 3, wallet: "9mLp…2cV7", predictions: 15, correct: 9, accuracy: 60.0 },
  ];

  const fromStore = [...map.entries()].map(([wallet, stats], i) => ({
    rank: i + 1,
    wallet: shortenWallet(wallet),
    predictions: stats.total,
    correct: stats.correct,
    accuracy: stats.total ? Math.round((stats.correct / stats.total) * 1000) / 10 : 0,
  }));

  return fromStore.length ? fromStore : demo;
}

export function LeaderboardTable() {
  const { publicKey } = useWallet();
  const predictions = usePredictionsStore((s) => s.predictions);
  const rows = buildLeaderboard(predictions);
  const myWallet = publicKey?.toBase58();

  return (
    <GlassCard variant="primary" className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/8 text-[var(--text-muted)]">
            <th className="pb-4 pr-4 font-medium">Rank</th>
            <th className="pb-4 pr-4 font-medium">Wallet</th>
            <th className="pb-4 pr-4 font-medium">Predictions</th>
            <th className="pb-4 pr-4 font-medium">Correct</th>
            <th className="pb-4 font-medium">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isMe = myWallet && row.wallet.includes(myWallet.slice(0, 4));
            return (
              <tr
                key={row.rank}
                className={clsx(
                  "border-b border-white/5",
                  isMe && "bg-white/5"
                )}
              >
                <td className="py-4 pr-4 font-mono">{row.rank}</td>
                <td className="py-4 pr-4 font-mono">{row.wallet}</td>
                <td className="py-4 pr-4">{row.predictions}</td>
                <td className="py-4 pr-4">{row.correct}</td>
                <td className="py-4">{row.accuracy}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </GlassCard>
  );
}