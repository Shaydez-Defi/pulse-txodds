"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import type { EnrichedMatch } from "@/lib/types";
import { usePredictionsStore } from "@/stores/predictions-store";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { useIsAuthenticated } from "@/hooks/use-is-authenticated";
import { PulseButton } from "@/components/ui/pulse-button";
import clsx from "clsx";

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
    <article className="overflow-hidden rounded-xl border-0 bg-base-gray shadow-none dark:bg-dark-gray">
      <div className="mx-0 my-0 w-full rounded-none bg-brand-purple p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-base-black">
          {match.competition}
        </p>
        <h3 className="mt-2 text-4xl font-black uppercase text-base-black">
          {match.homeTeam} vs {match.awayTeam}
        </h3>
        <p className="mt-2 font-bold text-base-black">{kickoff}</p>
      </div>

      <div className="space-y-6 p-8">
        <fieldset>
          <legend className="mb-4 text-sm font-bold uppercase text-text-light dark:text-text-dark">
            Winner
          </legend>
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
                className={clsx(
                  "flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors",
                  winner === value
                    ? "bg-brand-lime text-base-black"
                    : "bg-base-offwhite text-text-light dark:bg-base-black dark:text-text-dark"
                )}
              >
                <input
                  type="radio"
                  name={`winner-${match.fixtureId}`}
                  checked={winner === value}
                  onChange={() => setWinner(value)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-6">
          <label className="rounded-xl bg-base-offwhite p-4 text-sm font-bold dark:bg-base-black">
            <span className="text-text-light dark:text-text-dark">Home score</span>
            <input
              type="number"
              min={0}
              value={homeScore}
              onChange={(e) => setHomeScore(Number(e.target.value))}
              className="mt-2 w-full rounded-xl bg-base-gray px-3 py-2 font-bold text-text-light outline-none dark:bg-dark-gray dark:text-text-dark"
            />
          </label>
          <label className="rounded-xl bg-base-offwhite p-4 text-sm font-bold dark:bg-base-black">
            <span className="text-text-light dark:text-text-dark">Away score</span>
            <input
              type="number"
              min={0}
              value={awayScore}
              onChange={(e) => setAwayScore(Number(e.target.value))}
              className="mt-2 w-full rounded-xl bg-base-gray px-3 py-2 font-bold text-text-light outline-none dark:bg-dark-gray dark:text-text-dark"
            />
          </label>
        </div>

        <label className="block rounded-xl bg-base-offwhite p-4 text-sm font-bold dark:bg-base-black">
          <span className="text-text-light dark:text-text-dark">First scorer</span>
          <input
            type="text"
            value={firstScorer}
            onChange={(e) => setFirstScorer(e.target.value)}
            placeholder="Player name"
            className="mt-2 w-full rounded-xl bg-base-gray px-3 py-2 font-bold text-text-light outline-none dark:bg-dark-gray dark:text-text-dark"
          />
        </label>

        <div className="flex flex-col gap-4">
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
              className="w-full"
            >
              I called it
            </PulseButton>
          )}
        </div>
      </div>
    </article>
  );
}