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
    <div
      className={clsx(
        "flex w-full flex-col",
        isLanding ? "h-screen overflow-hidden bg-base-black" : "min-h-screen bg-base-offwhite dark:bg-base-black"
      )}
    >
      {!isLanding && <BrutalistHeader />}
      <main
        className={clsx(
          "flex w-full flex-1 flex-col",
          isLanding && "h-full overflow-hidden"
        )}
      >
        {!isLanding && (
          <div className="h-14 w-full shrink-0 md:h-20 lg:h-24" aria-hidden />
        )}
        {isLanding ? (
          <WalletGate>{children}</WalletGate>
        ) : (
          <div className="mx-auto w-full max-w-7xl pb-28 pt-6 lg:pb-8">
            <WalletGate>{children}</WalletGate>
          </div>
        )}
      </main>
      {!isLanding && <MobileTabBar />}
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </div>
  );
}