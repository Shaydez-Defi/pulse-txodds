"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";

const NAV = [
  { href: "/home", label: "Home" },
  { href: "/matches", label: "Matches" },
  { href: "/predict", label: "Predict" },
  { href: "/leaderboard", label: "Board" },
  { href: "/my-pulse", label: "Pulse" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/home") return pathname === "/home";
  if (href === "/matches") {
    return pathname === "/matches" || pathname.startsWith("/match/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BrutalistHeader() {
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();
  const openAuthModal = useAuthModalStore((s) => s.open);
  const user = useAuthStore((s) => s.user);
  const { data: session } = useSession();

  const displayName =
    user?.name ?? session?.user?.name ?? session?.user?.email ?? "Guest";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 max-h-16 w-full border-0 border-b-4 border-base-black bg-base-offwhite">
      <div className="flex h-full w-full items-center px-3 md:px-6">
        <Link
          href="/home"
          className="shrink-0 font-headline text-xl font-black uppercase tracking-tighter text-base-black md:text-2xl"
        >
          Pulse
        </Link>

        <nav className="flex flex-1 items-center justify-center overflow-x-auto">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "shrink-0 px-2 py-1 text-[10px] font-bold uppercase tracking-tight md:px-4 md:py-2 md:text-sm",
                  active
                    ? "bg-brand-lime text-base-black"
                    : "text-base-black hover:bg-brand-purple"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {isAuthenticated ? (
          <div className="shrink-0 bg-base-black px-3 py-2 text-[10px] font-bold uppercase text-base-offwhite md:text-xs">
            {displayName.charAt(0).toUpperCase()}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => openAuthModal()}
            className="shrink-0 bg-base-black px-3 py-2 text-[10px] font-bold uppercase text-base-offwhite md:text-xs"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}