"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useWalletConnected } from "@/hooks/use-wallet-connected";

const TABS = [
  { href: "/", label: "Live" },
  { href: "/matches", label: "Matches" },
  { href: "/predict", label: "Predict" },
  { href: "/leaderboard", label: "Board" },
  { href: "/pulse", label: "My" },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { connected } = useWalletConnected();

  if (!connected) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/5 bg-black/80 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2 py-3">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "text-[11px] uppercase tracking-wide",
                active ? "text-white" : "text-[var(--text-muted)]"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}