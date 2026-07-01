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
    <div className="brutal-stack w-full">
      <h3 className="text-2xl font-black uppercase text-base-black">Pressure heatmap</h3>
      <div className="relative aspect-[68/105] w-full border-0 border-t-4 border-base-black bg-base-black">
        <svg viewBox="0 0 68 105" className="h-full w-full">
          <rect x="2" y="2" width="64" height="101" fill="none" stroke="#F6F7F8" strokeWidth="1" />
          <line x1="34" y1="2" x2="34" y2="103" stroke="#F6F7F8" strokeWidth="0.5" />
          <circle cx="34" cy="52.5" r="8" fill="none" stroke="#F6F7F8" strokeWidth="0.5" />
          {active.map((zone, i) => (
            <rect
              key={i}
              x={(zone.x / 100) * 68 - 4}
              y={(zone.y / 100) * 105 - 4}
              width={8 + zone.intensity * 12}
              height={8 + zone.intensity * 12}
              fill="#F84E3A"
              opacity={zone.intensity}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}