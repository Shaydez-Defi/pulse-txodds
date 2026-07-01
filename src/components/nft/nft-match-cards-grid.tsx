"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { GlassCard } from "@/components/ui/glass-card";

type NFTCard = {
  id: string;
  title: string;
  player: string;
  pulseScore: number;
  tier: "Legendary" | "Epic" | "Rare";
  match: string;
  imageGlow: string;
  minted: boolean;
};

export function NftMatchCardsGrid() {
  const { publicKey } = useWallet();
  const [cards, setCards] = useState<NFTCard[]>([
    {
      id: "nft-1",
      title: "Explosive Volley Moment",
      player: "Martinez",
      pulseScore: 94,
      tier: "Legendary",
      match: "Argentina vs England",
      imageGlow: "from-amber-500/30 to-red-500/20",
      minted: false,
    },
    {
      id: "nft-2",
      title: "Last-Minute Counterattack",
      player: "Silva",
      pulseScore: 88,
      tier: "Epic",
      match: "Argentina vs England",
      imageGlow: "from-purple-500/30 to-indigo-500/20",
      minted: false,
    },
    {
      id: "nft-3",
      title: "Midfield Domination Run",
      player: "Kone",
      pulseScore: 78,
      tier: "Rare",
      match: "France vs Spain",
      imageGlow: "from-emerald-500/30 to-teal-500/20",
      minted: false,
    },
  ]);

  function mint(id: string) {
    if (!publicKey) return;
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, minted: true } : c))
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <GlassCard className="relative flex h-full flex-col overflow-hidden border-white/10 p-0">
            <div
              className={`relative flex aspect-[4/5] w-full flex-col items-center justify-center border-b border-white/5 bg-gradient-to-br p-6 ${card.imageGlow}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:16px_16px] opacity-10" />

              <svg
                className="absolute inset-0 h-full w-full opacity-20"
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,100 L40,100 L50,60 L60,140 L70,90 L80,110 L90,100 L200,100"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>

              <div className="relative z-10 flex flex-col items-center text-center">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    card.tier === "Legendary"
                      ? "border border-amber-500/30 bg-amber-500/20 text-amber-400"
                      : card.tier === "Epic"
                        ? "border border-purple-500/30 bg-purple-500/20 text-purple-400"
                        : "border border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {card.tier}
                </span>

                <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                  <span className="font-display text-3xl font-extrabold text-white">
                    {card.pulseScore}
                  </span>
                </div>

                <h4 className="font-display mt-6 px-2 text-xl font-bold tracking-tight text-white">
                  {card.title}
                </h4>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {card.player}
                </p>
              </div>
            </div>

            <div className="flex flex-grow flex-col justify-between p-5">
              <div className="space-y-1 text-xs text-[var(--text-muted)]">
                <p className="flex justify-between">
                  <span>Fixture:</span>
                  <span className="font-medium text-[var(--text-secondary)]">
                    {card.match}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Dynamic Trigger:</span>
                  <span className="text-[var(--text-secondary)]">
                    Pulse Peak &gt; 80%
                  </span>
                </p>
              </div>

              <div className="mt-6">
                {!publicKey ? (
                  <button
                    disabled
                    className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 text-center text-xs font-semibold text-[var(--text-muted)]"
                  >
                    Connect Wallet to Mint
                  </button>
                ) : card.minted ? (
                  <div className="w-full rounded-full border border-emerald-500/20 bg-emerald-500/10 py-2.5 text-center text-xs font-semibold text-emerald-400">
                    ✓ Minted Successfully
                  </div>
                ) : (
                  <button
                    onClick={() => mint(card.id)}
                    className="w-full rounded-full bg-white py-2.5 text-center text-xs font-semibold text-black transition-opacity hover:opacity-90 active:scale-[0.98]"
                  >
                    Mint NFT Card
                  </button>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}