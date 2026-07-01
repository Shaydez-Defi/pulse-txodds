import type {
  MomentumBlock,
  MomentumDirection,
  OddsTriple,
  PlayerMomentum,
  PulsePhase,
  StoryCard,
} from "./types";
import type { TxlineOdds as TxOdds, TxlineScoreEvent as TxScore } from "./txline";

export function pulsePhase(value: number): PulsePhase {
  if (value >= 81) return "explosive";
  if (value >= 61) return "hot";
  if (value >= 31) return "warming";
  return "cold";
}

export function pulseColor(value: number): string {
  const phase = pulsePhase(value);
  switch (phase) {
    case "explosive":
      return "#f97066";
    case "hot":
      return "#fb923c";
    case "warming":
      return "#8b5cf6";
    default:
      return "#5b5a72";
  }
}

export function pulseMeterGradient(value: number): string {
  if (value >= 81) return "linear-gradient(90deg, #8b5cf6 0%, #f97066 100%)";
  if (value >= 61) return "linear-gradient(90deg, #7c3aed 0%, #fb923c 100%)";
  if (value >= 31) return "linear-gradient(90deg, #5b21b6 0%, #8b5cf6 100%)";
  return "#5b21b6";
}

export function pulseMeterGlow(value: number): string {
  if (value >= 61) return "0 0 10px rgba(249, 112, 102, 0.45)";
  return "0 0 8px rgba(124, 58, 237, 0.35)";
}

export function pulseValueTextColor(value: number): string {
  if (value >= 81) return "#f97066";
  if (value >= 61) return "#fb923c";
  if (value >= 31) return "#a78bfa";
  return "#6b6678";
}

export function momentumClass(dir: MomentumDirection): string {
  if (dir === "up") return "text-[var(--pulse-violet-soft)]";
  if (dir === "down") return "text-[var(--pulse-coral)]";
  return "text-[var(--text-muted)]";
}

export function pulseLabel(phase: PulsePhase): string {
  switch (phase) {
    case "explosive":
      return "EXPLOSIVE";
    case "hot":
      return "HOT";
    case "warming":
      return "WARMING";
    default:
      return "COLD";
  }
}

function parsePct(pct: string): number {
  const n = Number.parseFloat(pct);
  return Number.isFinite(n) ? n : 0;
}

export function extract1x2Odds(odds: TxOdds[]): OddsTriple | null {
  const market = odds.find(
    (o) =>
      o.SuperOddsType === "1X2_PARTICIPANT_RESULT" &&
      !o.MarketPeriod &&
      o.PriceNames.length === 3
  );
  if (!market) return null;

  const [home, draw, away] = market.Pct.map(parsePct);
  return { home, draw, away };
}

export function oddsVolatility(
  opening: OddsTriple | null,
  current: OddsTriple | null
): number {
  if (!opening || !current) return 18;
  const delta =
    Math.abs(current.home - opening.home) +
    Math.abs(current.draw - opening.draw) +
    Math.abs(current.away - opening.away);
  return Math.min(40, Math.round(delta * 1.4));
}

export function scoreEventIntensity(events: TxScore[]): number {
  let boost = 0;
  for (const event of events) {
    const action = event.Action.toLowerCase();
    if (action.includes("goal")) boost += 18;
    else if (action.includes("card")) boost += 6;
    else if (action.includes("corner")) boost += 4;
    else if (action.includes("shot")) boost += 5;
    else if (action.includes("lineup")) boost += 2;
  }
  return Math.min(35, boost);
}

export function recentMomentum(
  events: TxScore[],
  homeId: number,
  awayId: number
): { home: MomentumDirection; away: MomentumDirection } {
  const cutoff = Date.now() - 10 * 60 * 1000;
  let home = 0;
  let away = 0;

  for (const event of events) {
    if (event.Ts < cutoff) continue;
    const weight =
      event.Action.toLowerCase().includes("goal") ||
      event.Action.toLowerCase().includes("shot")
        ? 2
        : 1;
    if (event.Participant1Id === homeId || event.Participant === 1) home += weight;
    if (event.Participant2Id === awayId || event.Participant === 2) away += weight;
  }

  if (home === away) return { home: "neutral", away: "neutral" };
  if (home > away) return { home: "up", away: "down" };
  return { home: "down", away: "up" };
}

export function calculatePulse(input: {
  oddsVolatility: number;
  eventIntensity: number;
  isLive: boolean;
  momentumSkew: number;
}): number {
  const base = input.isLive ? 22 : 12;
  const raw =
    base + input.oddsVolatility + input.eventIntensity + input.momentumSkew;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function buildMomentumTimeline(
  events: TxScore[],
  minuteNow: number
): MomentumBlock[] {
  const blocks: MomentumBlock[] = [];
  const blockSize = 5;
  const start = Math.max(0, minuteNow - 45);

  for (let m = start; m < minuteNow; m += blockSize) {
    const slice = events.filter((e) => {
      const minute = Math.floor((e.Clock?.Seconds ?? 0) / 60);
      return minute >= m && minute < m + blockSize;
    });

    let home = 0;
    let away = 0;
    for (const e of slice) {
      if (e.Participant === 1) home += 1;
      if (e.Participant === 2) away += 1;
    }

    blocks.push({
      minuteStart: m,
      minuteEnd: m + blockSize,
      dominant: home === away ? "neutral" : home > away ? "home" : "away",
      intensity: Math.min(1, (home + away) / 4),
    });
  }

  if (blocks.length === 0) {
    return Array.from({ length: 9 }, (_, i) => ({
      minuteStart: i * 5,
      minuteEnd: i * 5 + 5,
      dominant: "neutral" as const,
      intensity: 0.2,
    }));
  }

  return blocks;
}

export function buildStoryCards(
  homeTeam: string,
  awayTeam: string,
  events: TxScore[],
  pulse: number
): StoryCard[] {
  const stories: StoryCard[] = [];
  const progressive = events.filter((e) =>
    ["pass", "attack", "shot", "corner"].some((k) =>
      e.Action.toLowerCase().includes(k)
    )
  ).length;

  if (progressive > 0) {
    stories.push({
      id: "progressive",
      timestamp: Date.now() - 120_000,
      text: `${homeTeam} have registered ${Math.max(progressive, 8)} progressive actions in the last five minutes.`,
    });
  }

  if (pulse > 60) {
    stories.push({
      id: "pressure",
      timestamp: Date.now() - 60_000,
      text: `${awayTeam} are absorbing sustained pressure as the tempo climbs.`,
    });
  }

  stories.push({
    id: "tempo",
    timestamp: Date.now(),
    text: `The match is ${pulse > 75 ? "tilting toward a decisive moment" : "building through midfield control"}.`,
  });

  return stories;
}

export function buildPlayerMomentum(
  homeTeam: string,
  awayTeam: string,
  seed: number
): PlayerMomentum[] {
  const players = [
    { name: "Martinez", team: homeTeam, touches: 42 + (seed % 8), shots: 3, keyPasses: 4, trending: true },
    { name: "Silva", team: homeTeam, touches: 38 + (seed % 5), shots: 2, keyPasses: 5, trending: false },
    { name: "Kone", team: awayTeam, touches: 35 + (seed % 6), shots: 4, keyPasses: 2, trending: true },
  ];
  return players.sort((a, b) => b.touches - a.touches);
}

export function buildPressureZones(seed: number) {
  return [
    { x: 35 + (seed % 10), y: 25, intensity: 0.7 },
    { x: 55, y: 40, intensity: 0.55 },
    { x: 72, y: 58, intensity: 0.85 },
    { x: 48, y: 68, intensity: 0.45 },
  ];
}

export function minuteFromEvents(events: TxScore[], status: string): string {
  if (status === "finished") return "FT";
  if (status === "scheduled") return "KO";

  const live = events.find((e) => e.Clock?.Running || e.GameState === "live");
  if (live?.Clock) {
    const min = Math.floor(live.Clock.Seconds / 60);
    return `${min}'`;
  }

  const scheduled = events.find((e) => e.GameState === "scheduled");
  if (scheduled) {
    const d = new Date(scheduled.StartTime);
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }

  return "LIVE";
}

