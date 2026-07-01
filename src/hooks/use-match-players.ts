"use client";

import type { HotPlayer } from "@/lib/api-football";
import { useQuery } from "@tanstack/react-query";

async function fetchHotPlayers(fixtureId: number): Promise<HotPlayer[]> {
  const res = await fetch(`/api/players/${fixtureId}`);
  if (!res.ok) return [];
  const data = (await res.json()) as { hotPlayers?: HotPlayer[] };
  return data.hotPlayers ?? [];
}

export function useMatchPlayers(fixtureId: number, enabled = true) {
  return useQuery({
    queryKey: ["players", fixtureId],
    queryFn: () => fetchHotPlayers(fixtureId),
    enabled: enabled && Number.isFinite(fixtureId),
    staleTime: 60_000,
  });
}