"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { HeroVideoBackground } from "./hero-video-background";

const STADIUM_THEMES = [
  { id: "wembley", label: "Wembley" },
  { id: "camp-nou", label: "Camp Nou" },
  { id: "san-siro", label: "San Siro" },
  { id: "maracana", label: "Maracanã" },
  { id: "lusail", label: "Lusail" },
] as const;

type StadiumId = (typeof STADIUM_THEMES)[number]["id"];

export function HeroSection() {
  const [activeStadium, setActiveStadium] = useState<StadiumId>("wembley");

  return (
    <div className="relative h-screen w-full overflow-hidden bg-base-black">
      <HeroVideoBackground />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <h1 className="font-black uppercase leading-none tracking-tighter text-white text-[20vw] md:text-[12vw] lg:text-[10vw]">
            PULSE
          </h1>
          <p className="text-xl font-medium tracking-wide text-white/90 md:text-2xl lg:text-4xl">
            The pulse of the game. Live.
          </p>
        </div>

        <Link
          href="/home"
          className="mt-4 rounded-xl border-0 bg-brand-lime px-8 py-4 font-bold text-base-black shadow-none transition-transform hover:scale-105 md:mt-6 md:px-12 md:py-5"
        >
          Enter Pulse
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-center gap-4 bg-gradient-to-t from-black/60 to-transparent px-4 pb-6 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {STADIUM_THEMES.map((stadium) => (
            <button
              key={stadium.id}
              type="button"
              onClick={() => setActiveStadium(stadium.id)}
              className={clsx(
                "text-[10px] uppercase tracking-widest text-white transition-opacity md:text-xs",
                activeStadium === stadium.id ? "opacity-100" : "opacity-80 hover:opacity-100"
              )}
            >
              {stadium.label}
            </button>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-widest text-white/80 md:text-xs">
          © 2026 Pulse · Built on Solana · Powered by TxLINE
        </p>
      </div>
    </div>
  );
}