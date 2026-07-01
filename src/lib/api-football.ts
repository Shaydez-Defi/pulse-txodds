const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

const headers = {
  "x-rapidapi-host": "v3.football.api-sports.io",
  "x-rapidapi-key": API_FOOTBALL_KEY || "",
};

export async function getMatchLineup(fixtureId: number) {
  const res = await fetch(`${BASE_URL}/fixtures/lineups?fixture=${fixtureId}`, {
    headers,
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.response;
}

export async function getMatchEvents(fixtureId: number) {
  const res = await fetch(`${BASE_URL}/fixtures/events?fixture=${fixtureId}`, {
    headers,
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.response;
}

export async function getMatchPlayers(fixtureId: number) {
  const res = await fetch(`${BASE_URL}/fixtures/players?fixture=${fixtureId}`, {
    headers,
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return data.response;
}

export async function getPlayerPhoto(playerId: number): Promise<string> {
  return `https://media.api-sports.io/football/players/${playerId}.png`;
}

export type HotPlayer = {
  id: number;
  name: string;
  photo: string;
  rating: number;
  goals: number;
  shots: number;
  keyPasses: number;
  team?: string;
};

export function getHotPlayers(playersData: unknown[]): HotPlayer[] {
  if (!playersData?.length) return [];

  return playersData
    .flatMap((team: unknown) => {
      const t = team as { players?: unknown[]; team?: { name?: string } };
      return (t.players || []).map((p: unknown) => {
        const entry = p as {
          player: { id: number; name: string; photo: string };
          statistics?: Array<{
            games?: { rating?: string };
            goals?: { total?: number };
            shots?: { total?: number };
            passes?: { key?: number };
          }>;
        };
        return {
          id: entry.player.id,
          name: entry.player.name,
          photo: entry.player.photo,
          rating: parseFloat(entry.statistics?.[0]?.games?.rating || "0"),
          goals: entry.statistics?.[0]?.goals?.total || 0,
          shots: entry.statistics?.[0]?.shots?.total || 0,
          keyPasses: entry.statistics?.[0]?.passes?.key || 0,
          team: t.team?.name,
        };
      });
    })
    .filter((p) => p.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}