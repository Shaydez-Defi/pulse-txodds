import type { StadiumId, StadiumTheme } from "./types";

export const DEFAULT_STADIUM_ID: StadiumId = "default";

/** Accent theme for match pages and ambient UI — hero uses /videos/hero.mp4 directly. */
export const STADIUM_THEMES: StadiumTheme[] = [
  {
    id: "default",
    name: "Pulse",
    city: "Live",
    moment: "Football intelligence",
    videoSrc: "/videos/hero.mp4",
    cycleMs: 0,
    gradient: "linear-gradient(135deg, #0a1218 0%, #1a2838 50%, #080c10 100%)",
    orbPrimary: "rgba(90, 120, 150, 0.18)",
    orbSecondary: "rgba(180, 190, 200, 0.08)",
    accent: "#7a8fa3",
  },
];

export function getStadiumTheme(id: StadiumId): StadiumTheme {
  return STADIUM_THEMES.find((t) => t.id === id) ?? STADIUM_THEMES[0];
}

export function isStadiumId(id: string): id is StadiumId {
  return STADIUM_THEMES.some((t) => t.id === id);
}

export function getNextStadiumId(current: StadiumId): StadiumId {
  return current;
}