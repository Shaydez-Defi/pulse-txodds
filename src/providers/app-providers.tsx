"use client";

import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "./query-provider";
import { SolanaWalletProvider } from "./wallet-provider";
import { AuthSessionSync } from "@/components/auth/auth-session-sync";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <SolanaWalletProvider>
          <AuthSessionSync />
          {children}
        </SolanaWalletProvider>
      </QueryProvider>
    </SessionProvider>
  );
}