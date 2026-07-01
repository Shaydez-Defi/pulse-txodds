"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const TABS = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/matches", label: "Matches", icon: MatchesIcon },
  { href: "/predict", label: "Prediction", icon: PredictIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: LeaderboardIcon },
  { href: "/my-pulse", label: "Profile", icon: ProfileIcon },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/home") return pathname === "/home";
  if (href === "/matches") {
    return pathname === "/matches" || pathname.startsWith("/match/");
  }
  if (href === "/my-pulse") {
    return (
      pathname === "/my-pulse" ||
      pathname.startsWith("/my-pulse/") ||
      pathname === "/pulse" ||
      pathname === "/trophy-cabinet" ||
      pathname === "/nft-match-cards"
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-16 w-full max-w-md -translate-x-1/2 items-center justify-around border-0 bg-base-black">
      {TABS.map((tab) => {
        const active = isActive(pathname, tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={clsx(
              "flex min-w-0 flex-1 flex-col items-center justify-center gap-0 border-0 px-1 py-2",
              active ? "text-brand-lime" : "text-base-offwhite"
            )}
          >
            <Icon active={active} />
            <span className="text-[9px] font-bold uppercase tracking-tight">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

function MatchesIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity={active ? 1 : 0.7} />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PredictIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18l4-8 3 5 2-3 5 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

function LeaderboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18V10M10 18V6M15 18v-4M20 18V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={active ? 1 : 0.7}
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" opacity={active ? 1 : 0.7} />
      <path
        d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}