"use client";

import { useSession } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAuthStore } from "@/stores/auth-store";

export function useIsAuthenticated() {
  const user = useAuthStore((s) => s.user);
  const { data: session } = useSession();
  const { publicKey } = useWallet();

  return Boolean(user || session?.user || publicKey);
}