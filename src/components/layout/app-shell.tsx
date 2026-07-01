"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { WalletGate } from "@/components/auth/wallet-gate";
import { AuthModal } from "@/components/auth/auth-modal";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { BrutalistHeader } from "./brutalist-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const authModalOpen = useAuthModalStore((s) => s.isOpen);
  const closeAuthModal = useAuthModalStore((s) => s.close);

  return (
    <>
      {!isLanding && <BrutalistHeader />}
      <main
        className={clsx(
          "brutal-stack min-h-screen w-full bg-base-offwhite",
          !isLanding && "pt-16 md:pt-16"
        )}
      >
        <WalletGate>{children}</WalletGate>
      </main>
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </>
  );
}