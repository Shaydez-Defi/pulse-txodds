import { getMatchPlayers, getHotPlayers } from "@/lib/api-football";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const fixtureId = Number.parseInt(id, 10);

  if (!Number.isFinite(fixtureId)) {
    return NextResponse.json({ error: "Invalid fixture id" }, { status: 400 });
  }

  try {
    const playersData = await getMatchPlayers(fixtureId);
    const hotPlayers = getHotPlayers(playersData ?? []);
    return NextResponse.json({ hotPlayers });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch players";
    return NextResponse.json({ hotPlayers: [], error: message });
  }
}