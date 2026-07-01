"use client";

import { HeroSection } from "@/components/home/hero-section";

export function HomeContent() {
  return (
    <div className="brutal-stack w-full">
      <HeroSection />
      <footer className="w-full bg-brand-purple p-4 text-center text-xs font-bold uppercase text-base-black">
        © 2026 Pulse · Built on Solana · Powered by TxLINE
      </footer>
    </div>
  );
}