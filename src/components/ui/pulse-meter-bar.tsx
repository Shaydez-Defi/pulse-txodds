type PulseMeterBarProps = {
  value: number;
  className?: string;
};

export function PulseMeterBar({ value, className }: PulseMeterBarProps) {
  const pulse = value;

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-white/40">
        <span>Pulse</span>
        <span className="font-bold text-white">{pulse}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#22C55E] via-[#F59E0B] to-[#EF4444] transition-all duration-1000"
          style={{
            width: `${pulse}%`,
            boxShadow:
              pulse > 75
                ? "0 0 8px rgba(239, 68, 68, 0.6)"
                : "0 0 6px rgba(34, 197, 94, 0.4)",
          }}
        />
      </div>
    </div>
  );
}