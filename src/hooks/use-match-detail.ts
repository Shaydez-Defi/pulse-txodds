"use client";

import type { MatchDetail } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

async function fetchMatch(id: number): Promise<MatchDetail> {
  const res = await fetch(`/api/match/${id}`);
  if (!res.ok) throw new Error("Failed to fetch match");
  const data = (await res.json()) as { match: MatchDetail };
  return data.match;
}

export function useMatchDetail(fixtureId: number) {
  return useQuery({
    queryKey: ["match", fixtureId],
    queryFn: () => fetchMatch(fixtureId),
    refetchInterval: 30_000,
    enabled: Number.isFinite(fixtureId),
  });
}