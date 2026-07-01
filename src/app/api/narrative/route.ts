import Groq from "groq-sdk";
import { NextResponse } from "next/server";

type HotPlayerInput = {
  name: string;
  shots?: number;
  goals?: number;
  rating?: number;
};

type NarrativeRequest = {
  team1?: string;
  team2?: string;
  homeTeam?: string;
  awayTeam?: string;
  score?: string;
  homeScore?: number;
  awayScore?: number;
  minute: number | string;
  pulse: number;
  momentumTeam?: string;
  players?: HotPlayerInput[];
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

  const team1 = body.team1 ?? body.homeTeam ?? "Home";
  const team2 = body.team2 ?? body.awayTeam ?? "Away";
  const score =
    body.score ??
    `${body.homeScore ?? 0}-${body.awayScore ?? 0}`;
  const { minute, pulse, players } = body;

  const hotPlayer = players?.[0];
  const playerContext = hotPlayer
    ? `Hottest player: ${hotPlayer.name} — ${hotPlayer.shots ?? 0} shots, ${hotPlayer.goals ?? 0} goals, rating ${hotPlayer.rating ?? 0}`
    : "";

  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  const prompt = `You are the voice of Pulse — a football intelligence app that reads matches like no one else.

Your job is to write ONE sentence that makes the reader feel the match in their chest.

Rules:
- Maximum 25 words
- No statistics, no numbers, no percentages
- Sound like the most switched-on football fan in the stadium — not a commentator, not a robot
- Use vivid, physical language — pressure, suffocation, collapse, dominance, desperation
- If a hot player is provided, mention them by name — make them the story
- Make it feel inevitable, like something is about to happen
- Never be generic. Never say "playing well" or "in good form"
- Write only the sentence. One period at the end. Nothing else.

Match: ${team1} vs ${team2} · ${score} · Minute ${minute}
Pulse intensity: ${pulse}/100
${playerContext}

Examples of the tone:
- "Brazil are suffocating every breath out of England's midfield and the dam is about to break."
- "Mbappé has touched the ball twelve times in six minutes. France don't just have momentum — they have their best player alive."
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