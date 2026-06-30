export type MatchStatus = "live" | "scheduled" | "finished";

export type PulsePhase = "cold" | "warming" | "hot" | "explosive";

export type MomentumDirection = "up" | "down" | "neutral";

export type OddsTriple = {
  home: number;
  draw: number;
  away: number;
};

export type EnrichedMatch = {
  fixtureId: number;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeCode: string;
  awayCode: string;
  homeScore: number;
  awayScore: number;
  minuteLabel: string;
  status: MatchStatus;
  pulse: number;
  phase: PulsePhase;
  momentumHome: MomentumDirection;
  momentumAway: MomentumDirection;
  startTime: number;
  odds: OddsTriple | null;
  anticipation: boolean;
};

export type StoryCard = {
  id: string;
  timestamp: number;
  text: string;
};

export type MomentumBlock = {
  minuteStart: number;
  minuteEnd: number;
  dominant: "home" | "away" | "neutral";
  intensity: number;
};

export type PlayerMomentum = {
  name: string;
  team: string;
  touches: number;
  shots: number;
  keyPasses: number;
  trending: boolean;
};

export type MatchDetail = EnrichedMatch & {
  scoreEvents: number;
  stories: StoryCard[];
  momentumTimeline: MomentumBlock[];
  players: PlayerMomentum[];
  pressureZones: Array<{ x: number; y: number; intensity: number }>;
  openingOdds: OddsTriple | null;
};

export type Prediction = {
  id: string;
  fixtureId: number;
  homeTeam: string;
  awayTeam: string;
  winner: "home" | "draw" | "away";
  homeScore: number;
  awayScore: number;
  firstScorer: string;
  wallet: string;
  createdAt: number;
  claimedLive?: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  wallet: string;
  predictions: number;
  correct: number;
  accuracy: number;
};

export type StadiumId = "default";

export type StadiumTheme = {
  id: StadiumId;
  name: string;
  city: string;
  moment: string;
  videoSrc: string;
  cycleMs: number;
  gradient: string;
  orbPrimary: string;
  orbSecondary: string;
  accent: string;
};