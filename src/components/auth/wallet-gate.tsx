"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useWalletConnected } from "@/hooks/use-wallet-connected";
import { isProtectedPath } from "@/lib/routes";

export function WalletGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { connected, connecting } = useWalletConnected();

  useEffect(() => {
    if (connecting) return;
    if (!connected && isProtectedPath(pathname)) {
      router.replace("/?signin=required");
    }
  }, [connected, connecting, pathname, router]);

  if (!connected && isProtectedPath(pathname)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <p className="text-[var(--text-secondary)]">Connect your wallet to continue.</p>
      </div>
    );
  }

  return <>{children}</>;
}