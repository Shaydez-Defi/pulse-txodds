"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

type NFTCard = {
  id: string;
  title: string;
  player: string;
  pulseScore: number;
  tier: "Legendary" | "Epic" | "Rare";
  match: string;
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
      minted: false,
    },
    {
      id: "nft-2",
      title: "Last-Minute Counterattack",
      player: "Silva",
      pulseScore: 88,
      tier: "Epic",
      match: "Argentina vs England",
      minted: false,
    },
    {
      id: "nft-3",
      title: "Midfield Domination Run",
      player: "Kone",
      pulseScore: 78,
      tier: "Rare",
      match: "France vs Spain",
      minted: false,
    },
  ]);

  function mint(id: string) {
    if (!publicKey) return;
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, minted: true } : c))
    );
  }

  const tierBg = {
    Legendary: "bg-brand-crimson text-white",
    Epic: "bg-brand-purple text-base-black",
    Rare: "bg-base-gray text-text-light dark:bg-dark-gray dark:text-text-dark",
  };

  return (
    <div className="flex flex-col gap-6">
      {cards.map((card) => (
        <article key={card.id} className="overflow-hidden rounded-xl border-0 bg-base-gray shadow-none dark:bg-dark-gray">
          <div className={`mx-0 my-0 w-full rounded-none p-8 ${tierBg[card.tier]}`}>
            <p className="text-xs font-bold uppercase tracking-widest">{card.tier}</p>
            <p className="mt-4 text-[15vw] font-black leading-none tracking-tighter md:text-8xl">
              {card.pulseScore}
            </p>
            <h4 className="mt-6 text-3xl font-black uppercase">{card.title}</h4>
            <p className="mt-2 text-lg font-bold">{card.player}</p>
          </div>
          <div className="space-y-6 p-8">
            <p className="font-bold text-text-light dark:text-text-dark">
              Fixture: {card.match}
            </p>
            <p className="font-bold text-text-light dark:text-text-dark">
              Trigger: Pulse Peak &gt; 80%
            </p>
            {!publicKey ? (
              <button
                disabled
                className="mt-2 w-full rounded-xl bg-base-black px-8 py-4 text-xs font-bold uppercase text-base-offwhite dark:bg-base-offwhite dark:text-base-black"
              >
                Connect Wallet to Mint
              </button>
            ) : card.minted ? (
              <div className="w-full rounded-xl bg-brand-lime py-4 text-center text-xs font-bold uppercase text-base-black">
                Minted
              </div>
            ) : (
              <button
                onClick={() => mint(card.id)}
                className="w-full rounded-xl bg-brand-lime py-4 text-sm font-bold uppercase text-base-black transition-opacity hover:opacity-90"
              >
                Mint NFT Card
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}