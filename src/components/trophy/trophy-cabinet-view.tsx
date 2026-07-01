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
    <div className="brutal-stack w-full">
      <div className="grid w-full grid-cols-3 gap-0">
        {MOCK_STATS.map((stat) => (
          <div
            key={stat.label}
            className="border-0 border-r-4 border-base-black bg-base-offwhite p-8 text-center last:border-r-0"
          >
            <p className="text-5xl font-black text-base-black">{stat.value}</p>
            <p className="mt-2 text-xs font-bold uppercase text-base-black">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="w-full border-0 border-t-4 border-base-black bg-base-offwhite p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-base-black">Badges</p>
        <div className="brutal-stack mt-0 w-full">
          {MOCK_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="w-full border-0 border-l-[20px] border-brand-lime border-t-4 border-base-black bg-base-offwhite p-8"
            >
              <p className="text-2xl font-black uppercase text-base-black">{badge.label}</p>
              <p className="mt-2 font-bold text-base-black">{badge.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs font-bold uppercase text-base-black">
          Placeholder — NFT trophies coming later.
        </p>
      </div>
    </div>
  );
}