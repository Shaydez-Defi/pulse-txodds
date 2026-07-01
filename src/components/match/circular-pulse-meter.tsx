"use client";

import { pulseColor, pulseLabel } from "@/lib/pulse-engine";
import type { PulsePhase } from "@/lib/types";

export function CircularPulseMeter({
  value,
  phase,
}: {
  value: number;
  phase: PulsePhase;
}) {
  const color = pulseColor(value);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const explosive = phase === "explosive";

  return (
    <div className="flex flex-col items-center">
      <div className={`relative h-[200px] w-[200px] ${explosive ? "animate-pulse-breathe" : ""}`}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="pulse-score text-5xl text-white">{value}</span>
        </div>
      </div>
      <p
        className="mt-4 text-xs uppercase tracking-[0.28em]"
        style={{ color }}
      >
        {pulseLabel(phase)}
      </p>
    </div>
  );
}