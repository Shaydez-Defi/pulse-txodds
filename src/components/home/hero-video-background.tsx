"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getNextStadiumId } from "@/lib/stadium-themes";
import { useStadiumStore } from "@/stores/stadium-store";
import { AnimatedPitchScene } from "./animated-pitch-scene";

const CYCLE_MS = 12_000;
const FADE_S = 1.2;

function StadiumVideo({
  src,
  onPlaying,
  onError,
}: {
  src: string;
  onPlaying: () => void;
  onError: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

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
        onPlaying();
      } catch {
        onError();
      }
    };

    video.addEventListener("canplay", attemptPlay);
    video.addEventListener("error", onError);
    video.load();
    void attemptPlay();

    return () => {
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("error", onError);
    };
  }, [src, onPlaying, onError]);

  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}

export function HeroVideoBackground() {
  const stadiumId = useStadiumStore((s) => s.stadiumId);
  const theme = useStadiumStore((s) => s.theme);
  const setStadium = useStadiumStore((s) => s.setStadium);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleError = useCallback(() => setVideoPlaying(false), []);
  const handlePlaying = useCallback(() => setVideoPlaying(true), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStadium(getNextStadiumId(stadiumId));
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [stadiumId, setStadium]);

  useEffect(() => {
    setVideoPlaying(false);
  }, [theme.id]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      <AnimatedPitchScene />

      <AnimatePresence mode="sync">
        <motion.div
          key={theme.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: videoPlaying ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_S, ease: "easeInOut" }}
        >
          <StadiumVideo
            src={theme.videoSrc}
            onPlaying={handlePlaying}
            onError={handleError}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ background: theme.gradient }}
        transition={{ duration: FADE_S, ease: "easeInOut" }}
        style={{ opacity: videoPlaying ? 0.22 : 0.35 }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/65" />
    </div>
  );
}