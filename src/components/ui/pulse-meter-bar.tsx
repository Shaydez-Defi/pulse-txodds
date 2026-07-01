type PulseMeterBarProps = {
  value: number;
  className?: string;
};

export function PulseMeterBar({ value, className }: PulseMeterBarProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between font-bold uppercase text-text-light dark:text-text-dark">
        <span>Pulse</span>
        <span>{value}</span>
      </div>
      <div className="mt-2 h-6 w-full bg-base-offwhite dark:bg-base-black">
        <div className="h-6 bg-brand-lime" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}