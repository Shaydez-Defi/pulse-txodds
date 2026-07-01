"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { PulseLogo } from "@/components/layout/pulse-logo";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";

export function MobileTopNav() {
  const isAuthenticated = useIsAuthenticated();
  const openAuthModal = useAuthModalStore((s) => s.open);
  const user = useAuthStore((s) => s.user);
  const { data: session } = useSession();

  const displayName =
    user?.name ?? session?.user?.name ?? session?.user?.email ?? "User";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-14 border-b border-white/10 bg-black/80 backdrop-blur-xl md:hidden">
      <div className="flex h-full items-center justify-between px-4">
        <Link href="/home">
          <PulseLogo />
        </Link>

        {isAuthenticated ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-green)] text-sm font-semibold text-white">
            {displayName.charAt(0).toUpperCase()}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => openAuthModal()}
            className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}