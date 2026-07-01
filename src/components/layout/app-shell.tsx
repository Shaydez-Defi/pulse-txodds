"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { WalletGate } from "@/components/auth/wallet-gate";
import { AuthModal } from "@/components/auth/auth-modal";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { Sidebar } from "@/components/sidebar";
import { MobileTabBar } from "./mobile-tab-bar";

const SIDEBAR_COLLAPSED_KEY = "pulse-sidebar-collapsed";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [collapsed, setCollapsed] = useState(false);
  const authModalOpen = useAuthModalStore((s) => s.isOpen);
  const closeAuthModal = useAuthModalStore((s) => s.close);

  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
  }, [collapsed]);

  return (
    <>
      {!isLanding && (
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} />
      )}
      <main
        className={clsx(
          "min-h-screen",
          !isLanding && "pb-24 md:pb-8",
          !isLanding && (collapsed ? "md:ml-16" : "md:ml-64")
        )}
      >
        <WalletGate>{children}</WalletGate>
      </main>
      {!isLanding && <MobileTabBar />}
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </>
  );
}