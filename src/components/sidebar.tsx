"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PulseLogo } from "@/components/layout/pulse-logo";

const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/matches", label: "Matches" },
  { href: "/predict", label: "Prediction League" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/my-pulse", label: "My Pulse" },
] as const;

const MORE_LINKS = [
  { href: "/trophy-cabinet", label: "Trophy Cabinet" },
  { href: "/nft-match-cards", label: "NFT Match Cards" },
  { href: "/my-pulse#notifications", label: "Notifications" },
  { href: "/my-pulse#settings", label: "Settings" },
] as const;

function isActive(pathname: string, href: string) {
  const base = href.split("#")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl md:flex">
      <div className="border-b border-white/10 px-6 py-6">
        <Link href="/">
          <PulseLogo />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
        {PRIMARY_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "rounded-lg px-4 py-2.5 text-sm transition-colors",
              isActive(pathname, link.href)
                ? "bg-white/10 text-white"
                : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-6 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setMoreOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white"
          >
            More
            <span className="text-xs">{moreOpen ? "−" : "+"}</span>
          </button>
          {moreOpen && (
            <div className="mt-1 space-y-1 pl-2">
              {MORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "block rounded-lg px-4 py-2 text-sm transition-colors",
                    isActive(pathname, link.href)
                      ? "text-white"
                      : "text-[var(--text-muted)] hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4 [&_.wallet-adapter-button]:!w-full [&_.wallet-adapter-button]:!justify-center">
        <WalletMultiButton>Select Wallet</WalletMultiButton>
      </div>
    </aside>
  );
}