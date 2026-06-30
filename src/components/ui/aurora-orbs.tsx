"use client";

import { useStadiumStore } from "@/stores/stadium-store";

export function AuroraOrbs() {
  const theme = useStadiumStore((s) => s.theme);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -left-24 top-16 h-80 w-80 rounded-full blur-[100px]"
        style={{ background: theme.orbPrimary }}
      />
      <div
        className="absolute -right-16 bottom-24 h-96 w-96 rounded-full blur-[120px]"
        style={{ background: theme.orbSecondary }}
      />
      <div
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full blur-[90px] opacity-40"
        style={{ background: "rgba(47, 107, 82, 0.12)" }}
      />
    </div>
  );
}