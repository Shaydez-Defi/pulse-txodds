type PulseMeterBarProps = {
  value: number;
  className?: string;
};

export function PulseMeterBar({ value, className }: PulseMeterBarProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between font-bold uppercase text-base-black">
        <span>Pulse</span>
        <span>{value}</span>
      </div>
      <div className="h-24 w-full bg-base-offwhite">
        <div className="h-full bg-brand-lime" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}