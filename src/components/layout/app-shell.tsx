"use client";

import { WalletGate } from "@/components/auth/wallet-gate";
import { Sidebar } from "@/components/sidebar";
import { MobileTabBar } from "./mobile-tab-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen pb-24 md:ml-64 md:pb-8">
        <WalletGate>{children}</WalletGate>
      </main>
      <MobileTabBar />
    </>
  );
}