"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut as nextSignOut } from "next-auth/react";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { PulseLogo } from "@/components/layout/pulse-logo";

const DROPDOWN_LINKS = [
  { href: "/my-pulse", label: "My Pulse" },
  { href: "/my-pulse#settings", label: "Settings" },
  { href: "/my-pulse#notifications", label: "Notifications" },
] as const;

export function BrutalistHeader() {
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

  function handleAvatarClick() {
    setOpen((v) => !v);
  }

  async function handleLogout() {
    signOut();
    await nextSignOut({ redirect: false });
    setOpen(false);
    router.push("/home");
  }

  return (
    <header className="fixed left-1/2 top-0 z-50 flex h-12 w-full max-w-md -translate-x-1/2 items-center justify-between border-0 bg-base-black px-4 text-base-offwhite">
      <Link href="/home" className="flex items-center">
        <PulseLogo light />
      </Link>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={handleAvatarClick}
          className="flex h-8 items-center border-0 bg-base-offwhite px-3 text-xs font-bold uppercase text-base-black"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {initial}
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-1 w-40 border-0 bg-base-offwhite text-base-black shadow-none"
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