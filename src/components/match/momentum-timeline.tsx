import type { MomentumBlock } from "@/lib/types";

export function MomentumTimeline({ blocks }: { blocks: MomentumBlock[] }) {
  return (
    <div>
      <h3 className="font-display mb-4 text-lg font-semibold">Momentum timeline</h3>
      <div className="flex h-12 gap-1">
        {blocks.map((block) => (
          <div
            key={`${block.minuteStart}-${block.minuteEnd}`}
            className="flex-1 rounded-sm"
            style={{
              backgroundColor:
                block.dominant === "home"
                  ? `rgba(47, 107, 82, ${0.25 + block.intensity * 0.5})`
                  : block.dominant === "away"
                    ? `rgba(139, 74, 58, ${0.25 + block.intensity * 0.5})`
                    : "rgba(255,255,255,0.06)",
            }}
            title={`${block.minuteStart}'–${block.minuteEnd}'`}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-[var(--text-muted)]">
        <span>Earlier</span>
        <span>Now</span>
      </div>
    </div>
  );
}