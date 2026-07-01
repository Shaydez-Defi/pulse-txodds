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
    Rare: "bg-base-offwhite text-base-black",
  };

  return (
    <div className="brutal-stack w-full">
      {cards.map((card) => (
        <article key={card.id} className="brutal-stack w-full border-0 border-t-4 border-base-black">
          <div className={`w-full p-8 ${tierBg[card.tier]}`}>
            <p className="text-xs font-bold uppercase tracking-widest">{card.tier}</p>
            <p className="mt-4 text-[15vw] font-black leading-none tracking-tighter md:text-8xl">
              {card.pulseScore}
            </p>
            <h4 className="mt-6 text-3xl font-black uppercase">{card.title}</h4>
            <p className="mt-2 text-lg font-bold">{card.player}</p>
          </div>
          <div className="w-full bg-base-offwhite p-8">
            <p className="font-bold text-base-black">Fixture: {card.match}</p>
            <p className="font-bold text-base-black">Trigger: Pulse Peak &gt; 80%</p>
            {!publicKey ? (
              <button
                disabled
                className="mt-6 w-full border-0 border-t-4 border-base-black bg-base-black py-4 text-xs font-bold uppercase text-base-offwhite"
              >
                Connect Wallet to Mint
              </button>
            ) : card.minted ? (
              <div className="mt-6 w-full border-0 border-t-4 border-base-black bg-brand-lime py-4 text-center text-xs font-bold uppercase text-base-black">
                Minted
              </div>
            ) : (
              <button
                onClick={() => mint(card.id)}
                className="mt-6 w-full border-0 border-t-4 border-base-black bg-brand-lime py-4 text-sm font-bold uppercase text-base-black"
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