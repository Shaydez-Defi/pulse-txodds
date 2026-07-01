"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import type { EnrichedMatch } from "@/lib/types";
import { usePredictionsStore } from "@/stores/predictions-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { GlassCard } from "@/components/ui/glass-card";

export function PredictFixtureCard({ match }: { match: EnrichedMatch }) {
  const { publicKey } = useWallet();
  const isAuthenticated = useIsAuthenticated();
  const openAuthModal = useAuthModalStore((s) => s.open);
  const addPrediction = usePredictionsStore((s) => s.addPrediction);
  const claimLive = usePredictionsStore((s) => s.claimLive);

  const [winner, setWinner] = useState<"home" | "draw" | "away">("home");
  const [homeScore, setHomeScore] = useState(1);
  const [awayScore, setAwayScore] = useState(0);
  const [firstScorer, setFirstScorer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [predictionId, setPredictionId] = useState<string | null>(null);

  const kickoff = new Date(match.startTime).toLocaleString("en-GB", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  function doSubmit() {
    if (!publicKey) return;
    const id = `${match.fixtureId}-${Date.now()}`;
    addPrediction({
      id,
      fixtureId: match.fixtureId,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      winner,
      homeScore,
      awayScore,
      firstScorer,
      wallet: publicKey.toBase58(),
      createdAt: Date.now(),
    });
    setPredictionId(id);
    setSubmitted(true);
  }

  function submit() {
    if (!isAuthenticated || !publicKey) {
      openAuthModal(doSubmit);
      return;
    }
    doSubmit();
  }

  function handleClaimLive() {
    if (!predictionId) return;
    const claim = () => {
      if (publicKey) claimLive(predictionId);
    };
    if (!isAuthenticated || !publicKey) {
      openAuthModal(claim);
      return;
    }
    claim();
  }

  return (
    <GlassCard variant="primary">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            {match.competition}
          </p>
          <h3 className="font-display mt-2 text-xl font-semibold">
            {match.homeTeam} vs {match.awayTeam}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{kickoff}</p>
        </div>
        {match.odds && (
          <div className="text-right text-xs text-[var(--text-muted)]">
            <p>H {match.odds.home.toFixed(1)}%</p>
            <p>D {match.odds.draw.toFixed(1)}%</p>
            <p>A {match.odds.away.toFixed(1)}%</p>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <fieldset>
          <legend className="mb-3 text-sm text-[var(--text-secondary)]">Winner</legend>
          <div className="flex flex-wrap gap-3">
            {(
              [
                ["home", match.homeTeam],
                ["draw", "Draw"],
                ["away", match.awayTeam],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/8 px-4 py-2 text-sm"
              >
                <input
                  type="radio"
                  name={`winner-${match.fixtureId}`}
                  checked={winner === value}
                  onChange={() => setWinner(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm">
            <span className="text-[var(--text-secondary)]">Home score</span>
            <input
              type="number"
              min={0}
              value={homeScore}
              onChange={(e) => setHomeScore(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            <span className="text-[var(--text-secondary)]">Away score</span>
            <input
              type="number"
              min={0}
              value={awayScore}
              onChange={(e) => setAwayScore(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            />
          </label>
        </div>
      </div>

      <label className="mt-4 block text-sm">
        <span className="text-[var(--text-secondary)]">First scorer</span>
        <input
          type="text"
          value={firstScorer}
          onChange={(e) => setFirstScorer(e.target.value)}
          placeholder="Player name"
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
        />
      </label>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={submitted}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black disabled:opacity-40"
        >
          {submitted ? "Prediction saved" : "Submit prediction"}
        </button>
        {match.status === "live" && submitted && predictionId && (
          <button
            type="button"
            onClick={handleClaimLive}
            className="rounded-full border border-white/12 px-6 py-2.5 text-sm"
          >
            I called it
          </button>
        )}
      </div>
    </GlassCard>
  );
}