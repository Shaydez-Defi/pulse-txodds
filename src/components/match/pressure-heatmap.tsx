"use client";

import { useEffect, useState } from "react";

type Zone = { x: number; y: number; intensity: number };

export function PressureHeatmap({ zones }: { zones: Zone[] }) {
  const [active, setActive] = useState(zones);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(
        zones.map((z) => ({
          ...z,
          intensity: Math.max(0.3, Math.min(1, z.intensity + (Math.random() - 0.5) * 0.15)),
        }))
      );
    }, 30_000);
    return () => clearInterval(id);
  }, [zones]);

  return (
    <div>
      <h3 className="font-editorial mb-5 text-lg font-semibold">Pressure heatmap</h3>
      <div className="relative aspect-[68/105] w-full overflow-hidden rounded-2xl border border-white/8 bg-[var(--bg-charcoal)]">
        <svg viewBox="0 0 68 105" className="h-full w-full">
          <rect x="2" y="2" width="64" height="101" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <line x1="34" y1="2" x2="34" y2="103" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
          <circle cx="34" cy="52.5" r="8" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
          {active.map((zone, i) => (
            <circle
              key={i}
              cx={(zone.x / 100) * 68}
              cy={(zone.y / 100) * 105}
              r={6 + zone.intensity * 8}
              fill={`rgba(249, 112, 102, ${zone.intensity * 0.42})`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}