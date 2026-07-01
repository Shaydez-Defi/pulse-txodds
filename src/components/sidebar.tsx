"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSession } from "next-auth/react";
import { PulseLogo } from "@/components/layout/pulse-logo";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";

type NavIcon = React.ComponentType<{ className?: string }>;

const PRIMARY_LINKS: { href: string; label: string; icon: NavIcon }[] = [
  { href: "/matches", label: "Home", icon: HomeIcon },
  { href: "/matches", label: "Matches", icon: MatchesIcon },
  { href: "/predict", label: "Prediction League", icon: PredictIcon },
  { href: "/leaderboard", label: "Leaderboard", icon: BoardIcon },
  { href: "/my-pulse", label: "My Pulse", icon: PulseIcon },
];

const MORE_LINKS: { href: string; label: string; icon: NavIcon }[] = [
  { href: "/trophy-cabinet", label: "Trophy Cabinet", icon: TrophyIcon },
  { href: "/nft-match-cards", label: "NFT Match Cards", icon: NftIcon },
  { href: "/my-pulse#notifications", label: "Notifications", icon: BellIcon },
  { href: "/my-pulse#settings", label: "Settings", icon: SettingsIcon },
];

function isActive(pathname: string, href: string) {
  const base = href.split("#")[0];
  if (base === "/matches") {
    return pathname === "/matches" || pathname.startsWith("/match/");
  }
  return pathname === base || pathname.startsWith(`${base}/`);
}

type SidebarProps = {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const openAuthModal = useAuthModalStore((s) => s.open);
  const user = useAuthStore((s) => s.user);
  const { data: session } = useSession();

  const displayName =
    user?.name ?? session?.user?.name ?? session?.user?.email ?? "User";

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 z-50 hidden h-screen flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 md:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={clsx(
          "flex items-center border-b border-white/10",
          collapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-4"
        )}
      >
        <Link href="/matches" className={clsx(collapsed && "mx-auto")}>
          {collapsed ? (
            <span className="font-display text-lg font-bold text-white">P</span>
          ) : (
            <PulseLogo />
          )}
        </Link>

        {(collapsed && !isAuthenticated) ? (
          <button
            type="button"
            onClick={() => openAuthModal()}
            title="Sign In"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white"
          >
            <UserIcon className="h-4 w-4" />
          </button>
        ) : !collapsed ? (
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-green)] text-xs font-semibold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[80px] truncate text-xs text-white">
                  {displayName}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Sign In
              </button>
            )}
          </div>
        ) : null}
      </div>

      <div
        className={clsx(
          "border-b border-white/10",
          collapsed ? "flex justify-center px-2 py-2" : "px-4 py-2"
        )}
      >
        <button
          type="button"
          onClick={() => onCollapsedChange(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white"
        >
          <ChevronIcon collapsed={collapsed} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-4">
        {PRIMARY_LINKS.map((link) => {
          const Icon = link.icon;
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={clsx(
                "flex items-center rounded-lg text-sm transition-colors",
                collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-4 py-2.5",
                active
                  ? "bg-white/10 text-white"
                  : "text-[var(--text-secondary)] hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}

        <div className="mt-4 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => {
              if (collapsed) {
                onCollapsedChange(false);
                setMoreOpen(true);
              } else {
                setMoreOpen((o) => !o);
              }
            }}
            title={collapsed ? "More" : undefined}
            className={clsx(
              "flex w-full items-center rounded-lg text-sm text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white",
              collapsed ? "justify-center px-2 py-2.5" : "justify-between px-4 py-2.5"
            )}
          >
            <span className={clsx("flex items-center", !collapsed && "gap-3")}>
              <MoreIcon className="h-5 w-5 shrink-0" />
              {!collapsed && "More"}
            </span>
            {!collapsed && (
              <span className="text-xs">{moreOpen ? "−" : "+"}</span>
            )}
          </button>
          {moreOpen && !collapsed && (
            <div className="mt-1 space-y-1 pl-2">
              {MORE_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={clsx(
                      "flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors",
                      isActive(pathname, link.href)
                        ? "text-white"
                        : "text-[var(--text-muted)] hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      <div
        className={clsx(
          "border-t border-white/10 p-2",
          collapsed
            ? "[&_.wallet-adapter-button]:!min-w-0 [&_.wallet-adapter-button]:!w-10 [&_.wallet-adapter-button]:!px-0"
            : "[&_.wallet-adapter-button]:!w-full [&_.wallet-adapter-button]:!justify-center"
        )}
      >
        <WalletMultiButton>
          {collapsed ? "" : "Select Wallet"}
        </WalletMultiButton>
      </div>
    </aside>
  );
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className={clsx("transition-transform duration-300", collapsed && "rotate-180")}
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function MatchesIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PredictIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 18l4-8 3 5 2-3 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoardIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 18V10M10 18V6M15 18v-4M20 18V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PulseIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 12h3l2-5 3 10 2-6 2 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM5 4H3v2a3 3 0 003 3M19 4h2v2a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NftIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 14l3-3 2 2 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 16H6l1.5-2v-4a5.5 5.5 0 0111 0v4L18 16zM10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}