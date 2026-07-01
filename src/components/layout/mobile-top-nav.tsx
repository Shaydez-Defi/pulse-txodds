"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { PulseLogo } from "@/components/layout/pulse-logo";

export function MobileTopNav() {
  const isAuthenticated = useIsAuthenticated();
  const openAuthModal = useAuthModalStore((s) => s.open);
  const user = useAuthStore((s) => s.user);
  const { data: session } = useSession();

  const displayName =
    user?.name ?? session?.user?.name ?? session?.user?.email ?? "User";

  return (
    <nav className="glass-sidebar fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between px-4 md:hidden">
      <Link
        href="/home"
        className="transition-opacity hover:opacity-80"
      >
        <PulseLogo compact />
      </Link>

      {isAuthenticated ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--pulse-purple)]/40 bg-[var(--pulse-purple)]/20 text-xs font-bold text-[var(--pulse-violet-soft)]">
          {displayName.charAt(0).toUpperCase()}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => openAuthModal()}
          className="rounded-full border border-white/20 px-4 py-1.5 font-editorial text-sm text-white transition-colors hover:border-[var(--pulse-purple)]/40 hover:text-[var(--pulse-violet-soft)]"
        >
          Sign In
        </button>
      )}
    </nav>
  );
}