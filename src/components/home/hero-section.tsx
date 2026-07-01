"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeroVideoBackground } from "./hero-video-background";
import { PulseButton } from "@/components/ui/pulse-button";
import clsx from "clsx";

const STADIUM_THEMES = [
  { id: "wembley", label: "Wembley", accent: "from-violet-950/40" },
  { id: "camp-nou", label: "Camp Nou", accent: "from-purple-950/40" },
  { id: "san-siro", label: "San Siro", accent: "from-indigo-950/40" },
  { id: "maracana", label: "Maracanã", accent: "from-violet-900/35" },
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
            className="pulse-eyebrow mb-4 text-center sm:mb-6"
          >
            Live football intelligence
          </motion.p>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline mx-auto max-w-4xl text-center text-[2.5rem] leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-8xl"
          >
            Pulse
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-editorial mx-auto mt-3 text-lg font-medium tracking-wide text-white/90 sm:text-xl"
          >
            The pulse of the game. Live.
          </motion.p>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/65 sm:mt-6 sm:text-lg"
          >
            Live football intelligence powered by real-time match data. See momentum
            shift before everyone else.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center gap-4 sm:mt-10"
          >
            <PulseButton href="/home" variant="primary">
              Enter Pulse
            </PulseButton>
            <PulseButton href="/match/demo" variant="secondary">
              Explore Demo
            </PulseButton>
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
                "shrink-0 cursor-pointer rounded-full border px-4 py-1.5 font-editorial text-sm transition-all",
                activeStadium === stadium.id
                  ? "border-[var(--pulse-purple)]/60 bg-[var(--pulse-purple)]/15 text-white shadow-[0_0_16px_var(--glow-purple)]"
                  : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
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