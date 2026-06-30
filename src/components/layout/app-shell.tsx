"use client";

import { usePathname } from "next/navigation";
import { WalletGate } from "@/components/auth/wallet-gate";
import { Navbar } from "./navbar";
import { MobileTabBar } from "./mobile-tab-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <Navbar />}
      <main
        className={
          isHome ? "min-h-[100dvh] min-h-screen" : "min-h-screen pb-24 pt-16 md:pb-8"
        }
      >
        <WalletGate>{children}</WalletGate>
      </main>
      {!isHome && <MobileTabBar />}
    </>
  );
}