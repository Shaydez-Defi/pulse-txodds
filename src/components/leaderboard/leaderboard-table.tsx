"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePredictionsStore } from "@/stores/predictions-store";
import type { LeaderboardEntry } from "@/lib/types";
import clsx from "clsx";

function shortenWallet(wallet: string) {
  return `${wallet.slice(0, 4)}…${wallet.slice(-4)}`;
}

function buildLeaderboard(
  predictions: ReturnType<typeof usePredictionsStore.getState>["predictions"]
): LeaderboardEntry[] {
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
    <div className="brutal-stack w-full">
      <div className="grid w-full grid-cols-5 gap-0 bg-base-black p-4 text-xs font-bold uppercase text-brand-lime">
        <span>Rank</span>
        <span>Wallet</span>
        <span>Predictions</span>
        <span>Correct</span>
        <span>Accuracy</span>
      </div>
      {rows.map((row) => {
        const isMe = myWallet && row.wallet.includes(myWallet.slice(0, 4));
        return (
          <div
            key={row.rank}
            className={clsx(
              "grid w-full grid-cols-5 gap-0 border-0 border-t-4 border-base-black p-6 font-bold",
              isMe ? "bg-brand-lime text-base-black" : "bg-base-offwhite text-base-black"
            )}
          >
            <span className="text-3xl font-black">{row.rank}</span>
            <span className="font-mono">{row.wallet}</span>
            <span>{row.predictions}</span>
            <span>{row.correct}</span>
            <span>{row.accuracy}%</span>
          </div>
        );
      })}
    </div>
  );
}