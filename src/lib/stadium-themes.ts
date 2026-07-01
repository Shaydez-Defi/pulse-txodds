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
    gradient: "linear-gradient(135deg, #0a0810 0%, #1a1724 50%, #14121c 100%)",
    orbPrimary: "rgba(124, 58, 237, 0.16)",
    orbSecondary: "rgba(249, 112, 102, 0.08)",
    accent: "#8b5cf6",
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