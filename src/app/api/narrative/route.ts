import Groq from "groq-sdk";
import { NextResponse } from "next/server";

type NarrativeRequest = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number | string;
  pulse: number;
  momentumTeam: string;
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

  const { homeTeam, awayTeam, homeScore, awayScore, minute, pulse, momentumTeam } = body;

  const score = `${homeScore}-${awayScore}`;
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  const prompt = `You are the voice of Pulse — a football intelligence app that reads matches like no one else.

Your job is to write ONE sentence that makes the reader feel the match in their chest.

Rules:
- Maximum 25 words
- No statistics, no numbers, no percentages
- Sound like the most switched-on football fan in the stadium — not a commentator, not a robot
- Use vivid, physical language — pressure, suffocation, collapse, dominance, desperation
- Make it feel inevitable, like something is about to happen
- Never be generic. Never say "playing well" or "in good form"
- Write only the sentence. Nothing else. No punctuation at the end except a period.

Match context:
${homeTeam} vs ${awayTeam} · ${score} · Minute ${minute}
Pulse intensity: ${pulse}/100
Momentum: ${momentumTeam} dominating last 10 minutes

Examples of the tone we want:
- "Brazil are suffocating every breath out of England's midfield and the dam is about to break."
- "France have turned this into a siege. Argentina are defending with their eyes closed."
- "Germany smell blood. Spain have forgotten how to play football in the last eight minutes."
- "This match has a goal written all over it and Morocco know it."
- "England are not just winning — they are dismantling Brazil piece by piece."
- "The crowd can feel it. The players can feel it. Something is seconds away."`;

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 80,
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