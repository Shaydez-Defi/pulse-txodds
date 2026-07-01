import type { StadiumId, StadiumTheme } from "./types";

export const DEFAULT_STADIUM_ID: StadiumId = "default";

export const STADIUM_THEMES: StadiumTheme[] = [
  {
    id: "default",
    name: "Pulse",
    city: "Live",
    moment: "Football intelligence",
    videoSrc: "/videos/hero.mp4",
    cycleMs: 0,
    gradient: "#F84E3A",
    orbPrimary: "rgba(155, 93, 229, 0.2)",
    orbSecondary: "rgba(248, 78, 58, 0.15)",
    accent: "#9B5DE5",
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