"use client";

import { useWallet } from "@solana/wallet-adapter-react";

export function useWalletConnected() {
  const { connected, connecting, publicKey } = useWallet();
  return {
    connected,
    connecting,
    publicKey,
    address: publicKey?.toBase58() ?? null,
  };
}