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
    <div className="relative mx-auto h-screen max-w-md overflow-x-hidden bg-base-offwhite">
      {!isLanding && <BrutalistHeader />}
      <main
        className={clsx(
          "brutal-stack min-h-full w-full bg-base-offwhite",
          !isLanding && "pb-24 pt-4"
        )}
      >
        {!isLanding && <div className="h-12 w-full shrink-0" aria-hidden />}
        <WalletGate>{children}</WalletGate>
      </main>
      {!isLanding && <MobileTabBar />}
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </div>
  );
}