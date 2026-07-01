type PulseMeterBarProps = {
  value: number;
  className?: string;
};

export function PulseMeterBar({ value, className }: PulseMeterBarProps) {
  return (
    <div className={className}>
      <div className="mb-0 flex items-center justify-between font-bold uppercase text-base-black">
        <span>Pulse</span>
        <span>{value}</span>
      </div>
      <div className="relative mt-2 h-24 w-full bg-base-black">
        <div className="h-full bg-brand-lime" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}