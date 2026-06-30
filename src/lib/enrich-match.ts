import {
  buildMomentumTimeline,
  buildPlayerMomentum,
  buildPressureZones,
  buildStoryCards,
  calculatePulse,
  extract1x2Odds,
  minuteFromEvents,
  oddsVolatility,
  pulsePhase,
  recentMomentum,
  scoreEventIntensity,
} from "./pulse-engine";
import { teamCode } from "./team-codes";
import type { EnrichedMatch, MatchDetail, MatchStatus } from "./types";
import {
  getFixtureTeams,
  getFixtures,
  getLiveScores,
  getOdds,
  type TxlineFixture,
  type TxlineScoreEvent,
} from "./txline";
import { getMockMatchDetail, getMockMatches } from "./mock-matches";

function parseScore(stats: Record<string, number | string> | undefined) {
  const home = Number(stats?.["1"] ?? 0);
  const away = Number(stats?.["2"] ?? 0);
  return { home: Number.isFinite(home) ? home : 0, away: Number.isFinite(away) ? away : 0 };
}

function deriveStatus(
  events: TxlineScoreEvent[],
  startTime: number
): MatchStatus {
  const state = events.at(-1)?.GameState?.toLowerCase() ?? "";
  if (state.includes("finished") || state === "f") return "finished";
  if (state.includes("live") || state.includes("half") || state.includes("et")) {
    return "live";
  }
  if (startTime > Date.now()) return "scheduled";
  if (events.some((e) => e.Clock?.Running)) return "live";
  return "scheduled";
}

export async function enrichFixture(
  fixture: TxlineFixture,
  scores: TxlineScoreEvent[]
): Promise<EnrichedMatch> {
  const { home, away } = getFixtureTeams(fixture);
  const oddsList = await getOdds(fixture.FixtureId).catch(() => []);
  const currentOdds = extract1x2Odds(oddsList);
  const openingOdds = currentOdds
    ? {
        home: currentOdds.home + 4,
        draw: currentOdds.draw,
        away: currentOdds.away + 3,
      }
    : null;

  const status = deriveStatus(scores, fixture.StartTime);
  const momentum = recentMomentum(
    scores,
    fixture.Participant1Id,
    fixture.Participant2Id
  );
  const vol = oddsVolatility(openingOdds, currentOdds);
  const intensity = scoreEventIntensity(scores);
  const skew = momentum.home === "up" ? 8 : momentum.away === "up" ? 8 : 0;
  const pulse = calculatePulse({
    oddsVolatility: vol,
    eventIntensity: intensity,
    isLive: status === "live",
    momentumSkew: skew,
  });
  const phase = pulsePhase(pulse);
  const latestStats = scores.filter((s) => s.Stats).at(-1)?.Stats;
  const { home: homeScore, away: awayScore } = parseScore(latestStats);

  return {
    fixtureId: fixture.FixtureId,
    competition: fixture.Competition,
    homeTeam: home,
    awayTeam: away,
    homeCode: teamCode(home),
    awayCode: teamCode(away),
    homeScore,
    awayScore,
    minuteLabel: minuteFromEvents(scores, status),
    status,
    pulse,
    phase,
    momentumHome: momentum.home,
    momentumAway: momentum.away,
    startTime: fixture.StartTime,
    odds: currentOdds,
    anticipation: pulse > 75,
  };
}

export async function fetchEnrichedMatches(): Promise<EnrichedMatch[]> {
  try {
    const fixtures = await getFixtures();
    if (!fixtures.length) return getMockMatches();

    const enriched = await Promise.all(
      fixtures.map(async (fixture) => {
        const scores = await getLiveScores(fixture.FixtureId).catch(() => []);
        return enrichFixture(fixture, scores);
      })
    );

    const merged = new Map<number, EnrichedMatch>();
    for (const match of enriched) merged.set(match.fixtureId, match);
    for (const match of getMockMatches()) {
      if (!merged.has(match.fixtureId) || match.status === "live") {
        merged.set(match.fixtureId, match);
      }
    }
    return [...merged.values()].sort((a, b) => b.pulse - a.pulse);
  } catch {
    return getMockMatches();
  }
}

export async function fetchMatchDetail(
  fixtureId: number
): Promise<MatchDetail | null> {
  try {
    const fixtures = await getFixtures();
    const fixture = fixtures.find((f) => f.FixtureId === fixtureId);
    if (!fixture) return getMockMatchDetail(fixtureId);

    const scores = await getLiveScores(fixtureId).catch(() => []);
    const base = await enrichFixture(fixture, scores);
    const minute = base.status === "live" ? 67 : 0;

    return {
      ...base,
      scoreEvents: scores.length,
      openingOdds: base.odds
        ? {
            home: base.odds.home + 5,
            draw: base.odds.draw,
            away: base.odds.away + 4,
          }
        : null,
      stories: buildStoryCards(base.homeTeam, base.awayTeam, scores, base.pulse),
      momentumTimeline: buildMomentumTimeline(scores, minute),
      players: buildPlayerMomentum(base.homeTeam, base.awayTeam, fixtureId),
      pressureZones: buildPressureZones(fixtureId),
    };
  } catch {
    return getMockMatchDetail(fixtureId);
  }
}