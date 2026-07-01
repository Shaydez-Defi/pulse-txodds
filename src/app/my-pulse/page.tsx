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
    <div className="w-full border-0 border-l-[20px] border-brand-lime bg-base-offwhite p-8 text-center">
      <h3 className="text-3xl font-black uppercase text-base-black">
        Sign in to view your Pulse profile
      </h3>
      <p className="mt-4 font-bold text-base-black">
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
    <div className="brutal-stack w-full">
      <div className="w-full bg-brand-purple p-6">
        <p className="text-sm font-bold uppercase text-base-black">Notifications</p>
      </div>
      {[
        "England vs Brazil — Pulse hit 91. High pressure alert.",
        "Your prediction on Argentina vs France is live.",
        "New badge unlocked: Momentum Reader.",
      ].map((item) => (
        <p
          key={item}
          className="w-full border-0 border-t-4 border-base-black bg-base-offwhite p-6 font-bold text-base-black"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="brutal-stack w-full">
      <div className="w-full bg-brand-purple p-6">
        <p className="text-sm font-bold uppercase text-base-black">Settings</p>
      </div>
      {[
        ["Match alerts", "On"],
        ["Pulse threshold", "75+"],
        ["Theme", "Editorial"],
      ].map(([label, value]) => (
        <p
          key={label}
          className="flex w-full justify-between border-0 border-t-4 border-base-black bg-base-offwhite p-6 font-bold text-base-black"
        >
          <span>{label}</span>
          <span>{value}</span>
        </p>
      ))}
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
    <div className="brutal-stack w-full">
      <div className="w-full bg-base-black p-6">
        <p className="text-sm font-bold uppercase text-brand-lime">Profile</p>
        {publicKey ? (
          <p className="mt-2 bg-base-black px-0 py-2 font-mono text-xs font-bold text-base-offwhite">
            {publicKey.toBase58().slice(0, 8)}…{publicKey.toBase58().slice(-6)}
          </p>
        ) : (
          <p className="inline-block bg-base-black px-4 py-2 font-bold text-base-offwhite">
            Guest Fan
          </p>
        )}
      </div>
      {!publicKey ? (
        <p className="w-full bg-base-offwhite p-8 font-bold text-base-black">
          Connect your wallet to sync predictions and live claims.
        </p>
      ) : mine.length === 0 ? (
        <p className="w-full bg-base-offwhite p-8 font-bold text-base-black">
          No predictions yet. Visit Prediction League to submit your first call.
        </p>
      ) : (
        mine.map((p) => (
          <div
            key={p.id}
            className="w-full border-0 border-t-4 border-base-black bg-base-offwhite p-6"
          >
            <p className="text-xl font-black uppercase text-base-black">
              {p.homeTeam} vs {p.awayTeam}
            </p>
            <p className="mt-2 font-bold text-base-black">
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
    <div className="brutal-stack w-full">
      <PageHeader
        eyebrow="Hub"
        title="My Pulse"
        description="Profile, trophies, notifications, NFT cards, and settings."
      />

      {!isAuthenticated && <SignInPrompt />}
      {isAuthenticated && <ProfileSection />}

      <PageHeader eyebrow="Achievements" title="Trophy Cabinet" />
      <TrophyCabinetView />

      <PageHeader eyebrow="Alerts" title="Notifications" />
      <NotificationsSection />

      <PageHeader eyebrow="Collectibles" title="NFT Match Cards" />
      <NftMatchCardsGrid />

      <PageHeader eyebrow="Config" title="Settings" />
      <SettingsSection />
    </div>
  );
}