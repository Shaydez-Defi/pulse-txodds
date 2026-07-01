"use client";

import { HeroSection } from "@/components/home/hero-section";

export function HomeContent() {
  return (
    <div className="relative">
      <HeroSection />
      <footer className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30">
        © 2026 Pulse · Built on Solana · Powered by TxLINE
      </footer>
    </div>
  );
}