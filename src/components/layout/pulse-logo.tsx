export function PulseLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={compact ? 24 : 28} height={compact ? 24 : 28} viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="12" stroke="rgba(124, 58, 237, 0.35)" strokeWidth="1" />
        <path
          d="M6 14h3l2-5 3 10 2-6 2 4h4"
          stroke="url(#pulse-logo-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="pulse-logo-gradient" x1="4" y1="14" x2="24" y2="14">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#f97066" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-white">Pulse</span>
    </div>
  );
}