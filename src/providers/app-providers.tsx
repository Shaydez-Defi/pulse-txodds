"use client";

import { QueryProvider } from "./query-provider";
import { SolanaWalletProvider } from "./wallet-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SolanaWalletProvider>{children}</SolanaWalletProvider>
    </QueryProvider>
  );
}