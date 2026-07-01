"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import type { EnrichedMatch } from "@/lib/types";
import { usePredictionsStore } from "@/stores/predictions-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { PulseButton } from "@/components/ui/pulse-button";

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
    <article className="brutal-stack w-full border-0 border-t-4 border-base-black">
      <div className="w-full bg-brand-purple p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-base-black">
          {match.competition}
        </p>
        <h3 className="mt-2 text-4xl font-black uppercase text-base-black">
          {match.homeTeam} vs {match.awayTeam}
        </h3>
        <p className="mt-2 font-bold text-base-black">{kickoff}</p>
      </div>

      <div className="w-full bg-base-offwhite p-8">
        <fieldset>
          <legend className="mb-4 text-sm font-bold uppercase text-base-black">Winner</legend>
          <div className="flex flex-wrap gap-0">
            {(
              [
                ["home", match.homeTeam],
                ["draw", "Draw"],
                ["away", match.awayTeam],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2 border-0 border-r-4 border-base-black bg-base-offwhite px-4 py-3 text-sm font-bold last:border-r-0"
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

        <div className="mt-6 grid grid-cols-2 gap-0 border-0 border-t-4 border-base-black">
          <label className="border-0 border-r-4 border-base-black p-4 text-sm font-bold">
            <span className="text-base-black">Home score</span>
            <input
              type="number"
              min={0}
              value={homeScore}
              onChange={(e) => setHomeScore(Number(e.target.value))}
              className="mt-2 w-full border-0 border-t-2 border-base-black bg-base-offwhite px-3 py-2 font-bold"
            />
          </label>
          <label className="p-4 text-sm font-bold">
            <span className="text-base-black">Away score</span>
            <input
              type="number"
              min={0}
              value={awayScore}
              onChange={(e) => setAwayScore(Number(e.target.value))}
              className="mt-2 w-full border-0 border-t-2 border-base-black bg-base-offwhite px-3 py-2 font-bold"
            />
          </label>
        </div>

        <label className="mt-0 block border-0 border-t-4 border-base-black p-4 text-sm font-bold">
          <span className="text-base-black">First scorer</span>
          <input
            type="text"
            value={firstScorer}
            onChange={(e) => setFirstScorer(e.target.value)}
            placeholder="Player name"
            className="mt-2 w-full border-0 border-t-2 border-base-black bg-base-offwhite px-3 py-2 font-bold"
          />
        </label>

        <div className="mt-0 flex flex-wrap gap-0 border-0 border-t-4 border-base-black">
          <PulseButton
            type="button"
            onClick={submit}
            disabled={submitted}
            variant="primary"
            className="w-full"
          >
            {submitted ? "Prediction saved" : "Submit prediction"}
          </PulseButton>
          {match.status === "live" && submitted && predictionId && (
            <PulseButton
              type="button"
              onClick={handleClaimLive}
              variant="secondary"
              className="w-full border-0 border-t-4 border-base-black"
            >
              I called it
            </PulseButton>
          )}
        </div>
      </div>
    </article>
  );
}