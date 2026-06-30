"use client";

import { WalletGate } from "@/components/auth/wallet-gate";
import { Navbar } from "./navbar";
import { MobileTabBar } from "./mobile-tab-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-24 pt-16 md:pb-8">
        <WalletGate>{children}</WalletGate>
      </main>
      <MobileTabBar />
    </>
  );
}