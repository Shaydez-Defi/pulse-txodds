import { pulseColor } from "@/lib/pulse-engine";

type PulseMeterBarProps = {
  value: number;
  className?: string;
};

export function PulseMeterBar({ value, className }: PulseMeterBarProps) {
  const color = pulseColor(value);
  const explosive = value >= 81;

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-white/50">
        <span>Pulse</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className={explosive ? "animate-pulse-breathe h-full rounded-full" : "h-full rounded-full transition-all duration-500"}
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}