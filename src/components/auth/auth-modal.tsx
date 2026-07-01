"use client";

import { useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { signIn as nextSignIn } from "next-auth/react";

export function AuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { publicKey } = useWallet();
  const { data: session } = useSession();
  const signIn = useAuthStore((s) => s.signIn);
  const runPendingAction = useAuthModalStore((s) => s.runPendingAction);
  const walletHandled = useRef(false);

  useEffect(() => {
    if (!isOpen) walletHandled.current = false;
  }, [isOpen]);

  useEffect(() => {
    if (session?.user && isOpen) {
      signIn({
        name: session.user.name ?? session.user.email ?? "Google User",
        email: session.user.email ?? undefined,
        type: "google",
      });
      runPendingAction();
      onClose();
    }
  }, [session, isOpen, signIn, runPendingAction, onClose]);

  useEffect(() => {
    if (publicKey && isOpen && !walletHandled.current) {
      walletHandled.current = true;
      signIn({
        name: `Wallet (${publicKey.toBase58().slice(0, 4)}…${publicKey.toBase58().slice(-4)})`,
        wallet: publicKey.toBase58(),
        type: "wallet",
      });
      runPendingAction();
      onClose();
    }
  }, [publicKey, isOpen, signIn, runPendingAction, onClose]);

  function handleGoogleSignIn() {
    nextSignIn("google", { callbackUrl: window.location.href });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-base-black/80 p-4">
      <div className="relative w-full max-w-md rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 font-bold text-text-light hover:text-brand-crimson dark:text-text-dark"
        >
          ✕
        </button>

        <h2 className="text-4xl font-black uppercase tracking-tighter text-text-light dark:text-text-dark">
          Sign in
        </h2>
        <p className="mt-4 font-bold text-text-light dark:text-text-dark">
          Connect to save predictions, claim live calls, and sync your profile.
        </p>

        <div className="mt-8 flex w-full flex-col gap-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full rounded-xl bg-brand-purple py-4 text-sm font-bold uppercase text-base-black transition-opacity hover:opacity-90"
          >
            Sign in with Google
          </button>
          <div className="w-full rounded-xl [&_.wallet-adapter-button]:!w-full">
            <WalletMultiButton>Connect Wallet</WalletMultiButton>
          </div>
        </div>
      </div>
    </div>
  );
}