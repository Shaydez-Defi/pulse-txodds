import type { MatchDetail } from "./types";

export const DEMO_ANTICIPATION_MESSAGE =
  "⚠️ England building sustained pressure — goal probability rising";

export const DEMO_MATCH: MatchDetail = {
  fixtureId: 0,
  competition: "World Cup Demo",
  homeTeam: "England",
  awayTeam: "Brazil",
  homeCode: "ENG",
  awayCode: "BRA",
  homeScore: 2,
  awayScore: 1,
  minuteLabel: "82'",
  status: "live",
  pulse: 91,
  phase: "explosive",
  momentumHome: "up",
  momentumAway: "down",
  startTime: Date.now() - 5_100_000,
  odds: { home: 44.5, draw: 24.0, away: 31.5 },
  anticipation: true,
  scoreEvents: 14,
  openingOdds: { home: 50.5, draw: 22.0, away: 27.5 },
  stories: [
    {
      id: "demo-story-1",
      timestamp: Date.now() - 120_000,
      text: "England have won possession eight consecutive times and forced four entries into Brazil's final third. Brazil's defensive line is dropping dangerously deep.",
    },
  ],
  momentumTimeline: [
    { minuteStart: 70, minuteEnd: 75, dominant: "home", intensity: 0.72 },
    { minuteStart: 75, minuteEnd: 80, dominant: "home", intensity: 0.85 },
    { minuteStart: 80, minuteEnd: 82, dominant: "home", intensity: 0.91 },
  ],
  players: [
    {
      name: "Kane",
      team: "England",
      touches: 42,
      shots: 4,
      keyPasses: 3,
      trending: true,
    },
    {
      name: "Saka",
      team: "England",
      touches: 38,
      shots: 2,
      keyPasses: 5,
      trending: true,
    },
    {
      name: "Vinícius Jr",
      team: "Brazil",
      touches: 28,
      shots: 1,
      keyPasses: 2,
      trending: false,
    },
    {
      name: "Rodrygo",
      team: "Brazil",
      touches: 22,
      shots: 2,
      keyPasses: 1,
      trending: false,
    },
  ],
  pressureZones: [
    { x: 0.72, y: 0.35, intensity: 0.88 },
    { x: 0.68, y: 0.5, intensity: 0.76 },
    { x: 0.75, y: 0.62, intensity: 0.82 },
    { x: 0.55, y: 0.45, intensity: 0.45 },
    { x: 0.3, y: 0.5, intensity: 0.22 },
  ],
};