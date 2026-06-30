export function PulseLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="12" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path
          d="M6 14h3l2-5 3 10 2-6 2 4h4"
          stroke="#e8e8e6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight">Pulse</span>
    </div>
  );
}