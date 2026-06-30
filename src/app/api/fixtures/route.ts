import { getFixtures } from "@/lib/txline";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fixtures = await getFixtures();
    return NextResponse.json({ count: fixtures.length, fixtures });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch fixtures";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}