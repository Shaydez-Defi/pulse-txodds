import type { MomentumBlock } from "@/lib/types";

export function MomentumTimeline({ blocks }: { blocks: MomentumBlock[] }) {
  return (
    <div className="brutal-stack w-full">
      <h3 className="text-2xl font-black uppercase text-base-black">Momentum timeline</h3>
      <div className="flex h-16 w-full gap-0 border-0 border-t-4 border-base-black">
        {blocks.map((block) => (
          <div
            key={`${block.minuteStart}-${block.minuteEnd}`}
            className="flex-1"
            style={{
              backgroundColor:
                block.dominant === "home"
                  ? "#9B5DE5"
                  : block.dominant === "away"
                    ? "#F84E3A"
                    : "#1A1A1A",
              opacity: 0.35 + block.intensity * 0.65,
            }}
            title={`${block.minuteStart}'–${block.minuteEnd}'`}
          />
        ))}
      </div>
      <div className="flex w-full justify-between text-xs font-bold uppercase text-base-black">
        <span>Earlier</span>
        <span>Now</span>
      </div>
    </div>
  );
}