import type { MomentumBlock } from "@/lib/types";

export function MomentumTimeline({ blocks }: { blocks: MomentumBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-2xl font-black uppercase text-text-light dark:text-text-dark">
        Momentum timeline
      </h3>
      <div className="flex h-16 w-full gap-1 overflow-hidden rounded-xl">
        {blocks.map((block) => (
          <div
            key={`${block.minuteStart}-${block.minuteEnd}`}
            className="flex-1 rounded-sm"
            style={{
              backgroundColor:
                block.dominant === "home"
                  ? "#7C3AED"
                  : block.dominant === "away"
                    ? "#E11D48"
                    : "#1F2937",
              opacity: 0.35 + block.intensity * 0.65,
            }}
            title={`${block.minuteStart}'–${block.minuteEnd}'`}
          />
        ))}
      </div>
      <div className="flex w-full justify-between text-xs font-bold uppercase text-text-light dark:text-text-dark">
        <span>Earlier</span>
        <span>Now</span>
      </div>
    </div>
  );
}