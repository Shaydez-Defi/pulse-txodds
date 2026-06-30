import type { EnrichedMatch, MatchDetail } from "./types";
import {
  buildMomentumTimeline,
  buildPlayerMomentum,
  buildPressureZones,
  buildStoryCards,
} from "./pulse-engine";

const NOW = Date.now();

export const MOCK_LIVE_MATCHES: EnrichedMatch[] = [
  {
    fixtureId: 18172280,
    competition: "World Cup",
    homeTeam: "Netherlands",
    awayTeam: "Morocco",
    homeCode: "NED",
    awayCode: "MAR",
    homeScore: 1,
    awayScore: 1,
    minuteLabel: "67'",
    status: "live",
    pulse: 78,
    phase: "hot",
    momentumHome: "up",
    momentumAway: "down",
    startTime: NOW - 4_200_000,
    odds: { home: 38.2, draw: 29.1, away: 32.7 },
    anticipation: true,
  },
  {
    fixtureId: 18179764,
    competition: "World Cup",
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
    momentumAway: "neutral",
    startTime: NOW - 5_100_000,
    odds: { home: 44.5, draw: 24.0, away: 31.5 },
    anticipation: true,
  },
  {
    fixtureId: 18175918,
    competition: "World Cup",
    homeTeam: "Argentina",
    awayTeam: "France",
    homeCode: "ARG",
    awayCode: "FRA",
    homeScore: 0,
    awayScore: 0,
    minuteLabel: "34'",
    status: "live",
    pulse: 52,
    phase: "warming",
    momentumHome: "neutral",
    momentumAway: "up",
    startTime: NOW - 2_100_000,
    odds: { home: 36.0, draw: 31.2, away: 32.8 },
    anticipation: false,
  },
  {
    fixtureId: 18179551,
    competition: "World Cup",
    homeTeam: "Spain",
    awayTeam: "Germany",
    homeCode: "ESP",
    awayCode: "GER",
    homeScore: 1,
    awayScore: 2,
    minuteLabel: "58'",
    status: "live",
    pulse: 71,
    phase: "hot",
    momentumHome: "down",
    momentumAway: "up",
    startTime: NOW - 3_600_000,
    odds: { home: 28.4, draw: 27.8, away: 43.8 },
    anticipation: false,
  },
  {
    fixtureId: 18179763,
    competition: "World Cup",
    homeTeam: "Portugal",
    awayTeam: "Japan",
    homeCode: "POR",
    awayCode: "JPN",
    homeScore: 3,
    awayScore: 0,
    minuteLabel: "FT",
    status: "finished",
    pulse: 18,
    phase: "cold",
    momentumHome: "neutral",
    momentumAway: "neutral",
    startTime: NOW - 7_200_000,
    odds: { home: 62.0, draw: 22.0, away: 16.0 },
    anticipation: false,
  },
  {
    fixtureId: 18179550,
    competition: "World Cup",
    homeTeam: "Belgium",
    awayTeam: "USA",
    homeCode: "BEL",
    awayCode: "USA",
    homeScore: 0,
    awayScore: 0,
    minuteLabel: "19:30",
    status: "scheduled",
    pulse: 24,
    phase: "cold",
    momentumHome: "neutral",
    momentumAway: "neutral",
    startTime: NOW + 3_600_000,
    odds: { home: 41.2, draw: 28.5, away: 30.3 },
    anticipation: false,
  },
];

export function getMockMatchDetail(fixtureId: number): MatchDetail | null {
  const base = MOCK_LIVE_MATCHES.find((m) => m.fixtureId === fixtureId);
  if (!base) return null;

  const minute = base.status === "live" ? 67 : 0;
  return {
    ...base,
    scoreEvents: 14,
    openingOdds: base.odds
      ? {
          home: base.odds.home + 6,
          draw: base.odds.draw - 2,
          away: base.odds.away - 4,
        }
      : null,
    stories: buildStoryCards(base.homeTeam, base.awayTeam, [], base.pulse),
    momentumTimeline: buildMomentumTimeline([], minute),
    players: buildPlayerMomentum(base.homeTeam, base.awayTeam, fixtureId),
    pressureZones: buildPressureZones(fixtureId),
  };
}

export function getMockMatches(): EnrichedMatch[] {
  return MOCK_LIVE_MATCHES;
}