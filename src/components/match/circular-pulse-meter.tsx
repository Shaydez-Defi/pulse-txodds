"use client";

import { pulseLabel } from "@/lib/pulse-engine";
import type { PulsePhase } from "@/lib/types";

export function CircularPulseMeter({
  value,
  phase,
}: {
  value: number;
  phase: PulsePhase;
}) {
  return (
    <div className="flex w-full flex-col items-start">
      <p className="text-[20vw] font-black leading-none tracking-tighter text-text-light dark:text-text-dark md:text-8xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-bold uppercase tracking-widest text-text-light dark:text-text-dark">
        {pulseLabel(phase)}
      </p>
      <div className="mt-4 h-6 w-full bg-base-offwhite dark:bg-base-black">
        <div className="h-6 bg-brand-lime" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}