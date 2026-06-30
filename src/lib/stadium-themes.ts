import type { StadiumId, StadiumTheme } from "./types";

/** Self-hosted football pitch clips in /public/videos (Mixkit licence). */
export const STADIUM_THEMES: StadiumTheme[] = [
  {
    id: "wembley",
    name: "Wembley",
    city: "London",
    videoSrc: "/videos/wembley.mp4",
    gradient: "linear-gradient(135deg, #0c1218 0%, #1a2838 50%, #0a1014 100%)",
    orbPrimary: "rgba(90, 120, 150, 0.18)",
    orbSecondary: "rgba(180, 190, 200, 0.08)",
    accent: "#7a8fa3",
  },
  {
    id: "camp-nou",
    name: "Camp Nou",
    city: "Barcelona",
    videoSrc: "/videos/camp-nou.mp4",
    gradient: "linear-gradient(135deg, #120a10 0%, #2a1420 45%, #0e1428 100%)",
    orbPrimary: "rgba(120, 45, 65, 0.2)",
    orbSecondary: "rgba(40, 55, 95, 0.12)",
    accent: "#8a4a5a",
  },
  {
    id: "san-siro",
    name: "San Siro",
    city: "Milan",
    videoSrc: "/videos/san-siro.mp4",
    gradient: "linear-gradient(135deg, #080808 0%, #1a1010 50%, #0c0c0c 100%)",
    orbPrimary: "rgba(110, 40, 40, 0.16)",
    orbSecondary: "rgba(60, 60, 60, 0.1)",
    accent: "#6e4545",
  },
  {
    id: "maracana",
    name: "Maracana",
    city: "Rio",
    videoSrc: "/videos/maracana.mp4",
    gradient: "linear-gradient(135deg, #0a1008 0%, #1a2410 50%, #0c1008 100%)",
    orbPrimary: "rgba(90, 110, 50, 0.16)",
    orbSecondary: "rgba(140, 120, 60, 0.1)",
    accent: "#7a7a42",
  },
  {
    id: "lusail",
    name: "Lusail",
    city: "Qatar",
    videoSrc: "/videos/lusail.mp4",
    gradient: "linear-gradient(135deg, #100c14 0%, #241a30 50%, #0c0a10 100%)",
    orbPrimary: "rgba(100, 80, 50, 0.14)",
    orbSecondary: "rgba(80, 60, 110, 0.12)",
    accent: "#8a7a5a",
  },
];

export function getStadiumTheme(id: StadiumId): StadiumTheme {
  return STADIUM_THEMES.find((t) => t.id === id) ?? STADIUM_THEMES[0];
}

export function getNextStadiumId(current: StadiumId): StadiumId {
  const index = STADIUM_THEMES.findIndex((t) => t.id === current);
  return STADIUM_THEMES[(index + 1) % STADIUM_THEMES.length].id;
}