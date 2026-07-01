"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { WalletGate } from "@/components/auth/wallet-gate";
import { AuthModal } from "@/components/auth/auth-modal";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { BrutalistHeader } from "./brutalist-header";
import { MobileTabBar } from "./mobile-tab-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const authModalOpen = useAuthModalStore((s) => s.isOpen);
  const closeAuthModal = useAuthModalStore((s) => s.close);

  return (
    <div className="flex w-full min-h-screen flex-col items-center bg-base-offwhite">
      {!isLanding && <BrutalistHeader />}
      <main className="flex w-full flex-1 flex-col items-center">
        {!isLanding && <div className="h-12 w-full shrink-0" aria-hidden />}
        <div
          className={clsx(
            "w-full",
            isLanding
              ? "min-h-screen"
              : "mx-auto max-w-7xl px-4 pb-28 pt-4 md:px-8 lg:px-12 lg:pb-8"
          )}
        >
          <WalletGate>{children}</WalletGate>
        </div>
      </main>
      {!isLanding && <MobileTabBar />}
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </div>
  );
}