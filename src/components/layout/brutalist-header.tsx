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
    <header className="fixed top-0 z-50 flex h-12 w-full items-center justify-between border-0 bg-base-black px-4 text-base-offwhite md:px-8">
      <Link href="/home" className="flex shrink-0 items-center">
        <PulseLogo light />
      </Link>

      <nav className="hidden flex-1 items-center justify-center gap-0 md:flex">
        {DESKTOP_NAV.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "px-4 py-2 text-xs font-bold uppercase tracking-tight",
                active ? "bg-brand-lime text-base-black" : "text-base-offwhite hover:bg-brand-purple hover:text-base-black"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="relative shrink-0" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 items-center border-0 bg-base-offwhite px-3 text-xs font-bold uppercase text-base-black"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {initial}
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-full z-[60] mt-2 w-40 border-0 bg-base-offwhite text-base-black shadow-none"
          >
            <p className="border-0 border-b-4 border-base-black px-3 py-2 text-[10px] font-bold uppercase">
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
                className="block w-full border-0 border-b-4 border-base-black px-3 py-3 text-left text-xs font-bold uppercase hover:bg-brand-lime"
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
                className="block border-0 border-b-4 border-base-black px-3 py-3 text-xs font-bold uppercase hover:bg-brand-purple"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="block w-full border-0 px-3 py-3 text-left text-xs font-bold uppercase hover:bg-brand-crimson hover:text-base-offwhite"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}