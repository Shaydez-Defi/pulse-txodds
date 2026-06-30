"use client";

import { useSearchParams } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { HeroSection } from "@/components/home/hero-section";
import { LiveMatchesSection } from "@/components/home/live-matches-section";
import { useWalletConnected } from "@/hooks/use-wallet-connected";
import { GlassCard } from "@/components/ui/glass-card";

export function HomeContent() {
  const { connected } = useWalletConnected();
  const searchParams = useSearchParams();
  const signinRequired = searchParams.get("signin") === "required";

  return (
    <>
      <HeroSection />
      {connected ? (
        <LiveMatchesSection />
      ) : (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-xl">
            <GlassCard variant="primary" className="text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Wallet required
              </p>
              <h2 className="font-display mt-4 text-2xl font-bold">
                Connect to access Pulse
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {signinRequired
                  ? "Sign in with Phantom to open matches, predictions, and your profile."
                  : "Live match intelligence, odds, and predictions unlock after you connect your wallet."}
              </p>
              <div className="mt-8 flex justify-center [&_.wallet-adapter-button]:!h-12 [&_.wallet-adapter-button]:!px-8">
                <WalletMultiButton />
              </div>
            </GlassCard>
          </div>
        </section>
      )}
    </>
  );
}