import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StadiumId } from "@/lib/types";
import { getStadiumTheme, isStadiumId } from "@/lib/stadium-themes";

type StadiumState = {
  stadiumId: StadiumId;
  setStadium: (id: StadiumId) => void;
  theme: ReturnType<typeof getStadiumTheme>;
};

export const useStadiumStore = create<StadiumState>()(
  persist(
    (set) => ({
      stadiumId: "default",
      theme: getStadiumTheme("default"),
      setStadium: (id) => set({ stadiumId: id, theme: getStadiumTheme(id) }),
    }),
    {
      name: "pulse-stadium",
      partialize: (s) => ({ stadiumId: s.stadiumId }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (!isStadiumId(state.stadiumId)) {
            state.stadiumId = "default";
          }
          state.theme = getStadiumTheme(state.stadiumId);
        }
      },
    }
  )
);