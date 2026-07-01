"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    if (!isOpen) {
      walletHandled.current = false;
    }
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
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0c100d]/90 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-[var(--accent-green)]/20 blur-2xl" />
          <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-[var(--text-muted)] transition-colors hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              Sign in to continue
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Connect your account to save predictions, claim live calls, and sync your profile.
            </p>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-white/8 bg-white/5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10 active:scale-[0.99]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.4 15 0 12 0 7.3 0 3.3 2.7 1.3 6.6l3.9 3C6.1 7 8.8 5.04 12 5.04z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.5H12v4.8h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                  <path fill="#FBBC05" d="M5.2 14.3c-.3-.8-.4-1.7-.4-2.3s.1-1.5.4-2.3L1.3 6.6C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l3.9-3.1z" />
                  <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.9-2-6.8-4.9l-3.9 3C3.3 21.3 7.3 24 12 24z" />
                </svg>
                Sign in with Google
              </button>

              <div className="relative flex w-full justify-center [&_.wallet-adapter-button]:!h-[48px] [&_.wallet-adapter-button]:!w-full [&_.wallet-adapter-button]:!justify-center [&_.wallet-adapter-button]:!rounded-full [&_.wallet-adapter-button]:!border-none [&_.wallet-adapter-button]:!bg-emerald-600 [&_.wallet-adapter-button]:!font-medium [&_.wallet-adapter-button]:hover:!bg-emerald-500">
                <WalletMultiButton>Connect Wallet (Phantom)</WalletMultiButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}