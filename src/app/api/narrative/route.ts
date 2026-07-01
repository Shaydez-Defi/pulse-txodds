import Groq from "groq-sdk";
import { NextResponse } from "next/server";

type NarrativeRequest = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number | string;
  pulse: number;
  dangerousAttacks: number;
  corners: number;
  possession: number;
};

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  let body: NarrativeRequest;
  try {
    body = (await req.json()) as NarrativeRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    minute,
    pulse,
    dangerousAttacks,
    corners,
    possession,
  } = body;

  const score = `${homeScore}-${awayScore}`;
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  const prompt = `You are a football intelligence AI for an app called Pulse.
Given these live match stats, write exactly ONE dramatic sentence (maximum 20 words) that captures the current momentum and what might happen next.
Be direct, cinematic, and specific. No generic commentary.

Match: ${homeTeam} vs ${awayTeam}
Score: ${score}
Minute: ${minute}
Pulse intensity: ${pulse}/100
Dangerous attacks last 10 mins: ${dangerousAttacks}
Corners last 10 mins: ${corners}
Possession: ${homeTeam} ${possession}%

Write only the sentence. Nothing else.`;

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 60,
      temperature: 0.85,
    });

    const narrative =
      completion.choices[0]?.message?.content?.trim().replace(/^["']|["']$/g, "") ?? "";

    if (!narrative) {
      return NextResponse.json({ error: "Empty narrative response" }, { status: 502 });
    }

    return NextResponse.json({ narrative });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Groq request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}