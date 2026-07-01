import {
  pulseMeterGlow,
  pulseMeterGradient,
  pulseValueTextColor,
} from "@/lib/pulse-engine";

type PulseMeterBarProps = {
  value: number;
  className?: string;
};

export function PulseMeterBar({ value, className }: PulseMeterBarProps) {
  const pulse = value;

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-white/40">
        <span className="font-editorial">Pulse</span>
        <span
          className="font-headline text-sm"
          style={{ color: pulseValueTextColor(pulse) }}
        >
          {pulse}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${pulse}%`,
            background: pulseMeterGradient(pulse),
            boxShadow: pulseMeterGlow(pulse),
          }}
        />
      </div>
    </div>
  );
}