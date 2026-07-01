"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const TABS = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/matches", label: "Matches", icon: MatchesIcon },
  { href: "/predict", label: "Predict", icon: PredictIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: BoardIcon },
  { href: "/my-pulse", label: "My Pulse", icon: PulseIcon },
] as const;

function isActive(pathname: string, href: string, label: string) {
  if (label === "Home") {
    return pathname === "/home";
  }
  if (href === "/matches") {
    return pathname === "/matches" || pathname.startsWith("/match/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="glass-sidebar fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 md:hidden">
      <div className="flex items-stretch justify-around px-1 pb-2 pt-1">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href, tab.label);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="relative flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-2"
            >
              {active && (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[var(--pulse-purple)] shadow-[0_0_8px_var(--glow-purple)]" />
              )}
              <Icon active={active} />
              <span
                className={clsx(
                  "text-[10px] font-medium",
                  active ? "text-[var(--pulse-violet-soft)]" : "text-[var(--text-muted)]"
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-white" : "text-[var(--text-muted)]"}>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function MatchesIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-white" : "text-[var(--text-muted)]"}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PredictIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-white" : "text-[var(--text-muted)]"}>
      <path d="M5 18l4-8 3 5 2-3 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoardIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-white" : "text-[var(--text-muted)]"}>
      <path d="M5 18V10M10 18V6M15 18v-4M20 18V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PulseIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={active ? "text-white" : "text-[var(--text-muted)]"}>
      <path d="M4 12h3l2-5 3 10 2-6 2 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}