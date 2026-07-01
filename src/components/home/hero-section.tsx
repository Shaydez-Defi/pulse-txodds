"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroVideoBackground } from "./hero-video-background";
import clsx from "clsx";

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
    <section className="hero-section">
      <HeroVideoBackground />

      <div className="hero-content relative z-10 flex h-screen w-full flex-col items-center justify-center bg-black/20">
        <h1 className="px-4 text-center text-[15vw] font-black leading-none tracking-tighter text-white">
          Pulse — The pulse of the game. Live.
        </h1>

        <Link
          href="/home"
          className="mt-8 border-0 bg-brand-lime px-12 py-6 text-2xl font-bold text-base-black"
        >
          Enter Pulse
        </Link>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 w-full bg-base-black/80 p-6 text-white">
        <div className="flex w-full flex-wrap items-center justify-center gap-0">
          {STADIUM_THEMES.map((stadium) => (
            <button
              key={stadium.id}
              type="button"
              onClick={() => setActiveStadium(stadium.id)}
              className={clsx(
                "px-6 py-2 text-sm font-bold uppercase tracking-tight",
                activeStadium === stadium.id
                  ? "bg-brand-lime text-base-black"
                  : "text-white hover:bg-brand-purple"
              )}
            >
              {stadium.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}