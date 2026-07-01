"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
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
    <nav className="glass-sidebar fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between px-4 md:hidden">
      <Link href="/home" className="flex items-center gap-2 transition-colors hover:text-[#22C55E]">
        <span className="text-[#22C55E]">⚡</span>
        <span className="font-display font-bold text-white">Pulse</span>
      </Link>

      {isAuthenticated ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#22C55E]/40 bg-[#22C55E]/20 text-xs font-bold text-[#22C55E]">
          {displayName.charAt(0).toUpperCase()}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => openAuthModal()}
          className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white transition-colors hover:border-white/40 hover:text-[#22C55E]"
        >
          Sign In
        </button>
      )}
    </nav>
  );
}