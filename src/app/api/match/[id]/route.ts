import { fetchMatchDetail } from "@/lib/enrich-match";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const fixtureId = Number.parseInt(id, 10);

  if (!Number.isFinite(fixtureId)) {
    return NextResponse.json({ error: "Invalid fixture id" }, { status: 400 });
  }

  try {
    const match = await fetchMatchDetail(fixtureId);
    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }
    return NextResponse.json({ match });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load match";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}