import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Prediction } from "@/lib/types";

type PredictionsState = {
  predictions: Prediction[];
  addPrediction: (prediction: Prediction) => void;
  claimLive: (id: string) => void;
};

export const usePredictionsStore = create<PredictionsState>()(
  persist(
    (set) => ({
      predictions: [],
      addPrediction: (prediction) =>
        set((s) => ({ predictions: [prediction, ...s.predictions] })),
      claimLive: (id) =>
        set((s) => ({
          predictions: s.predictions.map((p) =>
            p.id === id ? { ...p, claimedLive: true } : p
          ),
        })),
    }),
    { name: "pulse-predictions" }
  )
);