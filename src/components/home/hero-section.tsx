"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroVideoBackground } from "./hero-video-background";
import clsx from "clsx";

const STADIUM_THEMES = [
  { id: "wembley", label: "Wembley", accent: "from-blue-900/40" },
  { id: "camp-nou", label: "Camp Nou", accent: "from-red-900/40" },
  { id: "san-siro", label: "San Siro", accent: "from-red-950/40" },
  { id: "maracana", label: "Maracanã", accent: "from-green-900/40" },
  { id: "lusail", label: "Lusail", accent: "from-purple-900/40" },
] as const;

type StadiumId = (typeof STADIUM_THEMES)[number]["id"];

export function HeroSection() {
  const [activeStadium, setActiveStadium] = useState<StadiumId>("wembley");

  const activeTheme = STADIUM_THEMES.find((s) => s.id === activeStadium)!;

  return (
    <section className="hero-section flex flex-col items-center justify-center text-center">
      <HeroVideoBackground overlayClassName={activeTheme.accent} />

      <div className="hero-content relative z-10 flex w-full flex-col items-center justify-center px-4">
        <div className="hero-content-panel mx-auto flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl px-6 py-10 text-center sm:px-12 sm:py-16 md:rounded-none md:bg-transparent md:p-0">
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-center text-xs font-medium uppercase tracking-[0.24em] text-white/90 sm:mb-6"
          >
            Live football intelligence
          </motion.p>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-display mx-auto max-w-4xl text-center text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Pulse — The pulse of the game. Live.
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
          >
            Live football intelligence powered by real-time match data. See momentum
            shift before everyone else.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center sm:mt-10"
          >
            <div className="flex gap-4 justify-center">
              <Link
                href="/matches"
                className="rounded-full bg-white px-8 py-3 font-semibold text-black shadow-lg shadow-black/40 transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
              >
                Enter Pulse
              </Link>
              <Link
                href="/match/demo"
                className="rounded-full border border-white/60 px-8 py-3 font-semibold text-white transition-all hover:border-white hover:bg-white/5"
              >
                Explore Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 px-4">
        <div className="mx-auto flex max-w-2xl gap-2 overflow-x-auto pb-1">
          {STADIUM_THEMES.map((stadium) => (
            <button
              key={stadium.id}
              type="button"
              onClick={() => setActiveStadium(stadium.id)}
              className={clsx(
                "shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-all",
                activeStadium === stadium.id
                  ? "border-white/60 text-white"
                  : "border-white/20 text-white/70 hover:border-white/60"
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