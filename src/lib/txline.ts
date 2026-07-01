import axios, { type AxiosInstance, isAxiosError } from "axios";

// ---------------------------------------------------------------------------
// Types — derived from live TxLINE devnet responses (June 2026)
// ---------------------------------------------------------------------------

export type TxlineFixture = {
  Ts: number;
  StartTime: number;
  Competition: string;
  CompetitionId: number;
  FixtureGroupId: number;
  Participant1Id: number;
  Participant1: string;
  Participant2Id: number;
  Participant2: string;
  FixtureId: number;
  Participant1IsHome: boolean;
};

export type TxlineOdds = {
  FixtureId: number;
  MessageId: string;
  Ts: number;
  Bookmaker: string;
  BookmakerId: number;
  SuperOddsType: string;
  GameState: string | null;
  InRunning: boolean;
  MarketParameters: string | null;
  MarketPeriod: string | null;
  PriceNames: string[];
  Prices: number[];
  Pct: string[];
};

export type TxlineScoreClock = {
  Running: boolean;
  Seconds: number;
};

export type TxlineScoreEvent = {
  FixtureId: number;
  GameState: string;
  StartTime: number;
  IsTeam: boolean;
  FixtureGroupId: number;
  CompetitionId: number;
  CountryId: number;
  SportId: number;
  Participant1IsHome: boolean;
  Participant2Id: number;
  Participant1Id: number;
  Action: string;
  Id: number;
  Ts: number;
  ConnectionId: number;
  Seq: number;
  Data?: Record<string, unknown>;
  Stats?: Record<string, number | string>;
  Confirmed?: boolean;
  CoverageSecondaryData?: boolean;
  CoverageType?: string;
  StatusId?: number;
  Type?: string;
  Clock?: TxlineScoreClock;
  Participant?: number;
  Lineups?: unknown[];
  [key: string]: unknown;
};

export type TxlineMockData = {
  fixtures: TxlineFixture[];
  scores: TxlineScoreEvent[];
  odds: TxlineOdds[];
};

export type TxlineLiveScore = TxlineScoreEvent & {
  homeTeam?: string;
  awayTeam?: string;
};

// ---------------------------------------------------------------------------
// Config + client
// ---------------------------------------------------------------------------

function getTxlineConfig() {
  const origin = process.env.TXLINE_API_ORIGIN ?? "https://txline-dev.txodds.com";
  const jwt = process.env.TXLINE_JWT;
  const apiToken = process.env.TXLINE_API_TOKEN;

  if (!jwt || !apiToken) {
    throw new Error(
      "Missing TxLINE credentials. Set TXLINE_JWT and TXLINE_API_TOKEN in .env.local"
    );
  }

  return { origin, jwt, apiToken };
}

export function createTxlineClient(): AxiosInstance {
  const { origin, jwt, apiToken } = getTxlineConfig();

  return axios.create({
    baseURL: origin,
    timeout: 30_000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
      "X-Api-Token": apiToken,
    },
  });
}

let cachedClient: AxiosInstance | undefined;

/** Pre-configured axios instance with JWT + API token headers (lazy-init). */
export function getTxlineClient(): AxiosInstance {
  if (!cachedClient) {
    cachedClient = createTxlineClient();
  }
  return cachedClient;
}

async function withFallback<T>(
  label: string,
  fn: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      const message = isAxiosError(error)
        ? `${error.response?.status ?? "network"} ${JSON.stringify(error.response?.data ?? error.message)}`
        : error instanceof Error
          ? error.message
          : String(error);
      console.warn(`[txline] ${label} failed (${message}) — using mock data`);
    }
    return fallback();
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getFixtureTeams(fixture: TxlineFixture) {
  const home = fixture.Participant1IsHome
    ? fixture.Participant1
    : fixture.Participant2;
  const away = fixture.Participant1IsHome
    ? fixture.Participant2
    : fixture.Participant1;

  return { home, away };
}

/** Convert StablePrice integer odds (e.g. 1521) to decimal (e.g. 1.521). */
export function stablePriceToDecimal(price: number): number {
  return price / 1000;
}

/** Parse SSE text from /api/scores/updates/{fixtureId} into score events. */
export function parseScoresSse(sseText: string): TxlineScoreEvent[] {
  const events: TxlineScoreEvent[] = [];

  for (const block of sseText.split("\n\n")) {
    const dataLine = block
      .split("\n")
      .find((line) => line.startsWith("data: "));

    if (!dataLine) continue;

    try {
      events.push(JSON.parse(dataLine.slice(6)) as TxlineScoreEvent);
    } catch {
      // skip malformed blocks
    }
  }

  return events;
}

// ---------------------------------------------------------------------------
// API functions
// Real endpoints (OpenAPI):
//   GET /api/fixtures/snapshot
//   GET /api/scores/snapshot/{fixtureId}
//   GET /api/scores/updates/{fixtureId}  (SSE)
//   GET /api/odds/snapshot/{fixtureId}
// Plain /api/fixtures, /api/scores, /api/odds return 404.
// ---------------------------------------------------------------------------

/** Upcoming and live matches. Uses GET /api/fixtures/snapshot. */
export async function getFixtures(
  competitionId?: number
): Promise<TxlineFixture[]> {
  return withFallback(
    "getFixtures",
    async () => {
      const response = await getTxlineClient().get<TxlineFixture[]>(
        "/api/fixtures/snapshot",
        { params: competitionId ? { competitionId } : undefined }
      );
      return response.data;
    },
    () => getMockData().fixtures
  );
}

/** Current scores and match events for all fixtures (or one fixture). */
export async function getLiveScores(
  fixtureId?: number
): Promise<TxlineScoreEvent[]> {
  return withFallback(
    fixtureId ? `getLiveScores(${fixtureId})` : "getLiveScores",
    async () => {
      if (fixtureId) {
        const response = await getTxlineClient().get<TxlineScoreEvent[]>(
          `/api/scores/snapshot/${fixtureId}`
        );
        return response.data;
      }

      const fixturesResponse = await getTxlineClient().get<TxlineFixture[]>(
        "/api/fixtures/snapshot"
      );
      const scores = await Promise.all(
        fixturesResponse.data.map(async (fixture) => {
          try {
            const response = await getTxlineClient().get<TxlineScoreEvent[]>(
              `/api/scores/snapshot/${fixture.FixtureId}`
            );
            return response.data;
          } catch {
            return [];
          }
        })
      );

      return scores.flat();
    },
    () => getMockData().scores
  );
}

/** Latest odds for a specific match. Uses GET /api/odds/updates/{fixtureId}. */
export async function getOdds(fixtureId: number): Promise<TxlineOdds[]> {
  return withFallback(
    `getOdds(${fixtureId})`,
    async () => {
      const response = await getTxlineClient().get<TxlineOdds[] | string>(
        `/api/odds/updates/${fixtureId}`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        return data.length ? [data[data.length - 1]] : [];
      }
      if (typeof data === "string") {
        const lines = data.split("\n").filter((l) => l.startsWith("data: "));
        if (!lines.length) return [];
        const last = JSON.parse(lines[lines.length - 1].slice(6)) as TxlineOdds;
        return [last];
      }
      return [];
    },
    () => getMockData().odds.filter((o) => o.FixtureId === fixtureId)
  );
}

/** Stream live score updates via SSE. */
export function streamScores(
  fixtureId: number,
  onUpdate: (data: TxlineScoreEvent) => void
) {
  const { origin } = getTxlineConfig();
  const url = `${origin}/api/scores/updates/${fixtureId}`;
  const es = new EventSource(url);

  es.onmessage = (e) => {
    try {
      onUpdate(JSON.parse(e.data) as TxlineScoreEvent);
    } catch {
      /* skip malformed events */
    }
  };

  return () => es.close();
}

/** Realistic World Cup fallback data when the API is unreachable. */
export function getMockData(): TxlineMockData {
  const now = Date.now();

  const fixtures: TxlineFixture[] = [
    {
      Ts: now,
      StartTime: now + 86_400_000,
      Competition: "World Cup",
      CompetitionId: 72,
      FixtureGroupId: 10115677,
      Participant1Id: 1489,
      Participant1: "Argentina",
      Participant2Id: 1888,
      Participant2: "England",
      FixtureId: 900001,
      Participant1IsHome: true,
    },
    {
      Ts: now,
      StartTime: now + 172_800_000,
      Competition: "World Cup",
      CompetitionId: 72,
      FixtureGroupId: 10115677,
      Participant1Id: 3021,
      Participant1: "Spain",
      Participant2Id: 1999,
      Participant2: "France",
      FixtureId: 900002,
      Participant1IsHome: true,
    },
    {
      Ts: now,
      StartTime: now + 259_200_000,
      Competition: "World Cup",
      CompetitionId: 72,
      FixtureGroupId: 10115677,
      Participant1Id: 2802,
      Participant1: "Portugal",
      Participant2Id: 1634,
      Participant2: "Brazil",
      FixtureId: 900003,
      Participant1IsHome: true,
    },
  ];

  const scores: TxlineScoreEvent[] = [
    {
      FixtureId: 900001,
      GameState: "live",
      StartTime: fixtures[0].StartTime,
      IsTeam: true,
      FixtureGroupId: 10115677,
      CompetitionId: 72,
      CountryId: 466,
      SportId: 1,
      Participant1IsHome: true,
      Participant2Id: 1888,
      Participant1Id: 1489,
      Action: "score_update",
      Id: 1,
      Ts: now,
      ConnectionId: 1,
      Seq: 1,
      Stats: { "1": 1, "2": 0 },
      Clock: { Running: true, Seconds: 2340 },
    },
    {
      FixtureId: 900002,
      GameState: "scheduled",
      StartTime: fixtures[1].StartTime,
      IsTeam: true,
      FixtureGroupId: 10115677,
      CompetitionId: 72,
      CountryId: 466,
      SportId: 1,
      Participant1IsHome: true,
      Participant2Id: 1999,
      Participant1Id: 3021,
      Action: "comment",
      Id: 1,
      Ts: now,
      ConnectionId: 2,
      Seq: 1,
      Data: { text: "Lineups expected in 2 hours" },
      Stats: {},
    },
  ];

  const odds: TxlineOdds[] = [
    {
      FixtureId: 900001,
      MessageId: "mock:1x2",
      Ts: now,
      Bookmaker: "TXLineStablePriceDemargined",
      BookmakerId: 10021,
      SuperOddsType: "1X2_PARTICIPANT_RESULT",
      GameState: "live",
      InRunning: true,
      MarketParameters: "",
      MarketPeriod: null,
      PriceNames: ["part1", "draw", "part2"],
      Prices: [2100, 3200, 3800],
      Pct: ["47.619", "31.250", "26.316"],
    },
    {
      FixtureId: 900001,
      MessageId: "mock:ou",
      Ts: now,
      Bookmaker: "TXLineStablePriceDemargined",
      BookmakerId: 10021,
      SuperOddsType: "OVERUNDER_PARTICIPANT_GOALS",
      GameState: "live",
      InRunning: true,
      MarketParameters: "line=2.5",
      MarketPeriod: null,
      PriceNames: ["over", "under"],
      Prices: [1850, 2150],
      Pct: ["54.054", "46.512"],
    },
    {
      FixtureId: 900002,
      MessageId: "mock:1x2",
      Ts: now,
      Bookmaker: "TXLineStablePriceDemargined",
      BookmakerId: 10021,
      SuperOddsType: "1X2_PARTICIPANT_RESULT",
      GameState: null,
      InRunning: false,
      MarketParameters: "",
      MarketPeriod: null,
      PriceNames: ["part1", "draw", "part2"],
      Prices: [2450, 3100, 2950],
      Pct: ["40.816", "32.258", "33.898"],
    },
  ];

  return { fixtures, scores, odds };
}

// Legacy alias used by existing routes
export const fetchFixturesSnapshot = getFixtures;