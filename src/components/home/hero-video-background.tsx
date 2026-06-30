"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HERO_VIDEO_SRC } from "@/lib/hero-video";
import { AnimatedPitchScene } from "./animated-pitch-scene";

export function HeroVideoBackground() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleError = useCallback(() => setPlaying(false), []);
  const handlePlaying = useCallback(() => setPlaying(true), []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    const attemptPlay = async () => {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    video.addEventListener("canplay", attemptPlay);
    video.addEventListener("error", handleError);
    video.load();
    void attemptPlay();

    return () => {
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("error", handleError);
    };
  }, [handleError]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#040806]">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: playing ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatedPitchScene />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={ref}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={handlePlaying}
          onError={handleError}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "none",
            transform: "translate(-50%, -50%) translateZ(0)",
            WebkitTransform: "translate(-50%, -50%) translateZ(0)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55"
        aria-hidden
      />
    </div>
  );
}