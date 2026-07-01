"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { usePredictionsStore } from "@/stores/predictions-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { PageHeader } from "@/components/layout/page-header";
import { PulseButton } from "@/components/ui/pulse-button";
import { TrophyCabinetView } from "@/components/trophy/trophy-cabinet-view";
import { NftMatchCardsGrid } from "@/components/nft/nft-match-cards-grid";

function SignInPrompt() {
  const openAuthModal = useAuthModalStore((s) => s.open);

  return (
    <div className="flex w-full flex-col items-center rounded-xl border-0 bg-base-gray p-8 text-center shadow-none dark:bg-dark-gray">
      <h3 className="text-3xl font-black uppercase text-text-light dark:text-text-dark">
        Sign in to view your Pulse profile
      </h3>
      <p className="mt-4 font-bold text-text-light dark:text-text-dark">
        Connect with Google or Phantom to sync predictions, trophies, and settings.
      </p>
      <div className="mt-8 flex justify-center">
        <PulseButton type="button" onClick={() => openAuthModal()} variant="primary">
          Sign in to continue
        </PulseButton>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-bold uppercase text-brand-purple">Notifications</p>
      <div className="flex flex-col gap-4">
        {[
          "England vs Brazil — Pulse hit 91. High pressure alert.",
          "Your prediction on Argentina vs France is live.",
          "New badge unlocked: Momentum Reader.",
        ].map((item) => (
          <p
            key={item}
            className="mb-4 rounded-xl border-0 bg-base-gray p-6 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-bold uppercase text-brand-purple">Settings</p>
      <div className="flex flex-col gap-4">
        {[
          ["Match alerts", "On"],
          ["Pulse threshold", "75+"],
          ["Theme", "Editorial"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="mb-4 flex w-full items-center justify-between rounded-xl border-0 bg-base-gray p-6 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark"
          >
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSection() {
  const { publicKey } = useWallet();
  const predictions = usePredictionsStore((s) => s.predictions);
  const mine = publicKey
    ? predictions.filter((p) => p.wallet === publicKey.toBase58())
    : [];

  return (
    <div className="flex flex-col gap-8">
      <div className="mx-0 my-0 w-full rounded-none bg-base-black p-6 dark:bg-dark-gray">
        <p className="text-sm font-bold uppercase text-brand-lime">Profile</p>
        {publicKey ? (
          <p className="mt-2 font-mono text-xs font-bold text-text-dark">
            {publicKey.toBase58().slice(0, 8)}…{publicKey.toBase58().slice(-6)}
          </p>
        ) : (
          <p className="mt-2 font-bold text-text-dark">Guest Fan</p>
        )}
      </div>
      {!publicKey ? (
        <div className="flex w-full flex-col items-center rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
          <p className="font-bold text-text-light dark:text-text-dark">
            Connect your wallet to sync predictions and live claims.
          </p>
          <div className="mt-8">
            <PulseButton variant="secondary">Connect Wallet</PulseButton>
          </div>
        </div>
      ) : mine.length === 0 ? (
        <p className="rounded-xl border-0 bg-base-gray p-8 font-bold shadow-none text-text-light dark:bg-dark-gray dark:text-text-dark">
          No predictions yet. Visit Prediction League to submit your first call.
        </p>
      ) : (
        mine.map((p) => (
          <div
            key={p.id}
            className="mb-4 rounded-xl border-0 bg-base-gray p-6 shadow-none dark:bg-dark-gray"
          >
            <p className="text-xl font-black uppercase text-text-light dark:text-text-dark">
              {p.homeTeam} vs {p.awayTeam}
            </p>
            <p className="mt-2 font-bold text-text-light dark:text-text-dark">
              {p.homeScore}-{p.awayScore}
              {p.claimedLive ? " · Live claim" : ""}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default function MyPulseHubPage() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="editorial-stack w-full">
      <PageHeader
        eyebrow="Hub"
        title="My Pulse"
        description="Profile, trophies, notifications, NFT cards, and settings."
      />

      <div className="content-pad w-full">
        {!isAuthenticated && <SignInPrompt />}
        {isAuthenticated && <ProfileSection />}
      </div>

      <PageHeader eyebrow="Achievements" title="Trophy Cabinet" />
      <div className="content-pad w-full">
        <TrophyCabinetView />
      </div>

      <PageHeader eyebrow="Alerts" title="Notifications" />
      <div className="content-pad w-full">
        <NotificationsSection />
      </div>

      <PageHeader eyebrow="Collectibles" title="NFT Match Cards" />
      <div className="content-pad w-full">
        <NftMatchCardsGrid />
      </div>

      <PageHeader eyebrow="Config" title="Settings" />
      <div className="content-pad w-full">
        <SettingsSection />
      </div>
    </div>
  );
}