"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import clsx from "clsx";
import { useWalletConnected } from "@/hooks/use-wallet-connected";
import { PulseLogo } from "./pulse-logo";
import { RollingBall } from "./rolling-ball";

const NAV = [
  { href: "/", label: "Live" },
  { href: "/matches", label: "Matches" },
  { href: "/predict", label: "Predict" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/pulse", label: "My Pulse" },
];

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [ballX, setBallX] = useState(0);
  const { connected } = useWalletConnected();

  const visibleNav = connected ? NAV : NAV.filter((item) => item.href === "/");

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return;
    setBallX(active.offsetLeft + active.offsetWidth / 2 - 7);
  }, [pathname, connected]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <PulseLogo />
        </Link>

        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 md:flex"
        >
          {connected && <RollingBall x={ballX} />}
          {visibleNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={clsx(
                  "relative px-4 py-2 text-sm transition-colors",
                  active
                    ? "text-white"
                    : "text-[var(--text-secondary)] hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <WalletMultiButton />
      </div>
    </header>
  );
}