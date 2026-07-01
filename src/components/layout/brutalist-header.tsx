"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut as nextSignOut } from "next-auth/react";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { PulseLogo } from "@/components/layout/pulse-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const DESKTOP_NAV = [
  { href: "/home", label: "Home" },
  { href: "/matches", label: "Matches" },
  { href: "/predict", label: "Predict" },
  { href: "/leaderboard", label: "Board" },
  { href: "/my-pulse", label: "Pulse" },
] as const;

const DROPDOWN_LINKS = [
  { href: "/my-pulse", label: "My Pulse" },
  { href: "/my-pulse#settings", label: "Settings" },
  { href: "/my-pulse#notifications", label: "Notifications" },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/home") return pathname === "/home";
  if (href === "/matches") {
    return pathname === "/matches" || pathname.startsWith("/match/");
  }
  if (href === "/my-pulse") {
    return pathname === "/my-pulse" || pathname.startsWith("/my-pulse/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BrutalistHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useIsAuthenticated();
  const openAuthModal = useAuthModalStore((s) => s.open);
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const { data: session } = useSession();

  const displayName =
    user?.name ?? session?.user?.name ?? session?.user?.email ?? "Guest Fan";

  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handleLogout() {
    signOut();
    await nextSignOut({ redirect: false });
    setOpen(false);
    router.push("/home");
  }

  return (
    <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between bg-base-black px-4 dark:bg-dark-gray md:h-20 md:px-8 lg:h-24">
      <Link href="/home" className="flex shrink-0 items-center">
        <PulseLogo light />
      </Link>

      <nav className="hidden h-full items-center gap-8 md:flex md:gap-12">
        {DESKTOP_NAV.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex h-full items-center text-sm font-bold uppercase tracking-wide transition-colors md:text-base",
                active ? "text-white" : "text-white/80 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex shrink-0 items-center gap-4 md:gap-6">
        <ThemeToggle />

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold uppercase text-white/80 transition-colors hover:bg-white/10 hover:text-white md:h-11 md:w-11 md:text-base"
            aria-expanded={open}
            aria-haspopup="menu"
          >
            {initial}
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full z-[60] mt-2 w-44 overflow-hidden rounded-xl border border-base-gray bg-base-offwhite text-text-light shadow-none dark:border-dark-gray dark:bg-dark-gray dark:text-text-dark"
            >
              <p className="border-b border-base-gray px-4 py-3 text-[10px] font-semibold uppercase dark:border-dark-gray">
                {displayName}
              </p>
              {!isAuthenticated && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    openAuthModal();
                  }}
                  className="block w-full border-b border-base-gray px-4 py-3 text-left text-xs font-semibold uppercase hover:bg-brand-lime hover:text-base-black dark:border-dark-gray"
                >
                  Sign In
                </button>
              )}
              {DROPDOWN_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block border-b border-base-gray px-4 py-3 text-xs font-semibold uppercase hover:bg-base-gray dark:border-dark-gray dark:hover:bg-base-black"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="block w-full px-4 py-3 text-left text-xs font-semibold uppercase hover:bg-brand-crimson hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}