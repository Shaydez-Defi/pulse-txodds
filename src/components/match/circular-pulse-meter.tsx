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
      <p className="text-[20vw] font-black leading-none tracking-tighter text-base-black md:text-8xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-bold uppercase tracking-widest text-base-black">
        {pulseLabel(phase)}
      </p>
      <div className="mt-4 h-24 w-full bg-base-black">
        <div className="h-full bg-brand-lime" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}