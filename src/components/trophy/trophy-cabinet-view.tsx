"use client";

const MOCK_BADGES = [
  { id: "early-bird", label: "Early Pulse", detail: "Followed 10 live matches" },
  { id: "momentum", label: "Momentum Reader", detail: "Spotted 3 turning points" },
  { id: "streak", label: "Hot Streak", detail: "5 predictions in a row" },
];

const MOCK_STATS = [
  { label: "Predictions won", value: "12" },
  { label: "Matches followed", value: "47" },
  { label: "Live claims", value: "8" },
];

export function TrophyCabinetView() {
  return (
    <div className="editorial-stack w-full">
      <div className="flex w-full justify-between gap-4">
        {MOCK_STATS.map((stat) => (
          <div
            key={stat.label}
            className="relative flex flex-1 flex-col items-center overflow-hidden rounded-xl border-0 bg-base-gray p-8 text-center shadow-none dark:bg-dark-gray"
          >
            <span className="absolute left-0 top-0 h-8 w-2 bg-brand-crimson" aria-hidden />
            <p className="text-6xl font-black text-text-light dark:text-text-dark">{stat.value}</p>
            <p className="mt-2 text-xs font-bold uppercase text-text-light dark:text-text-dark">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-0 bg-base-gray p-8 shadow-none dark:bg-dark-gray">
        <p className="text-sm font-bold uppercase tracking-widest text-text-light dark:text-text-dark">
          Badges
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {MOCK_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="rounded-xl border-0 border-l-8 border-brand-purple bg-base-gray p-6 shadow-none dark:bg-dark-gray"
            >
              <p className="text-2xl font-black uppercase text-text-light dark:text-text-dark">
                {badge.label}
              </p>
              <p className="mt-2 font-bold text-text-light dark:text-text-dark">{badge.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs font-bold uppercase text-text-light dark:text-text-dark">
          Placeholder — NFT trophies coming later.
        </p>
      </div>
    </div>
  );
}