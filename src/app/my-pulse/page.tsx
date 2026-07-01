"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePredictionsStore } from "@/stores/predictions-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { PageHeader } from "@/components/layout/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { TrophyCabinetView } from "@/components/trophy/trophy-cabinet-view";
import { NftMatchCardsGrid } from "@/components/nft/nft-match-cards-grid";

function SignInPrompt() {
  const openAuthModal = useAuthModalStore((s) => s.open);

  return (
    <GlassCard variant="primary" className="text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
        Personal data
      </p>
      <h3 className="font-display mt-3 text-xl font-semibold text-white">
        Sign in to view your Pulse profile
      </h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        Connect with Google or Phantom to sync predictions, trophies, and settings.
      </p>
      <button
        type="button"
        onClick={() => openAuthModal()}
        className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        Sign in to continue
      </button>
    </GlassCard>
  );
}

function NotificationsSection() {
  return (
    <GlassCard variant="primary">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
        Notifications
      </p>
      <div className="mt-4 space-y-3">
        {[
          "England vs Brazil — Pulse hit 91. High pressure alert.",
          "Your prediction on Argentina vs France is live.",
          "New badge unlocked: Momentum Reader.",
        ].map((item) => (
          <p key={item} className="rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[var(--text-secondary)]">
            {item}
          </p>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--text-muted)]">Placeholder — push notifications coming soon.</p>
    </GlassCard>
  );
}

function SettingsSection() {
  return (
    <GlassCard variant="primary">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
        Settings
      </p>
      <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
        <p className="flex justify-between border-b border-white/8 py-3">
          <span>Match alerts</span>
          <span className="text-[var(--accent-green)]">On</span>
        </p>
        <p className="flex justify-between border-b border-white/8 py-3">
          <span>Pulse threshold</span>
          <span>75+</span>
        </p>
        <p className="flex justify-between py-3">
          <span>Theme</span>
          <span>Dark</span>
        </p>
      </div>
      <p className="mt-4 text-xs text-[var(--text-muted)]">Placeholder — settings panel coming soon.</p>
    </GlassCard>
  );
}

function ProfileSection() {
  const { publicKey } = useWallet();
  const predictions = usePredictionsStore((s) => s.predictions);
  const mine = publicKey
    ? predictions.filter((p) => p.wallet === publicKey.toBase58())
    : [];

  return (
    <GlassCard variant="primary">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
        Profile summary
      </p>
      {!publicKey ? (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          Connect your wallet to sync predictions and live claims.
        </p>
      ) : mine.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          No predictions yet. Visit Prediction League to submit your first call.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {mine.map((p) => (
            <div key={p.id} className="rounded-lg border border-white/8 px-4 py-3">
              <p className="font-medium">
                {p.homeTeam} vs {p.awayTeam}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {p.homeScore}-{p.awayScore}
                {p.claimedLive ? " · Live claim" : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function NftSection() {
  return (
    <div>
      <PageHeader
        eyebrow="Collectibles"
        title="NFT Match Cards"
        description="Mint moments from explosive pulse intervals."
      />
      <NftMatchCardsGrid />
    </div>
  );
}

export default function MyPulseHubPage() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <PageHeader
          eyebrow="Hub"
          title="My Pulse"
          description="Profile, trophies, notifications, NFT cards, and settings in one place."
        />

        {!isAuthenticated && <SignInPrompt />}

        {isAuthenticated && (
          <div id="profile">
            <ProfileSection />
          </div>
        )}

        <div id="trophy-cabinet">
          <PageHeader eyebrow="Achievements" title="Trophy Cabinet" />
          <TrophyCabinetView />
        </div>

        <div id="notifications">
          <NotificationsSection />
        </div>

        <div id="nft-match-cards">
          <NftSection />
        </div>

        <div id="settings">
          <SettingsSection />
        </div>
      </div>
    </section>
  );
}