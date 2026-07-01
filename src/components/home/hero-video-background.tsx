"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { HERO_VIDEO_SRC } from "@/lib/hero-video";

type HeroVideoBackgroundProps = {
  overlayClassName?: string;
};

export function HeroVideoBackground({ overlayClassName }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    const play = async () => {
      try {
        await video.play();
      } catch {
        /* autoplay blocked — user gesture will start playback */
      }
    };

    video.addEventListener("canplay", play);
    void play();

    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <div className="hero-video-container">
      <video
        key={HERO_VIDEO_SRC}
        ref={videoRef}
        className="hero-video-element"
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div
        className={clsx(
          "absolute inset-0 z-[1] bg-gradient-to-b via-black/50 to-black/80",
          overlayClassName ?? "from-black/40"
        )}
        aria-hidden
      />
    </div>
  );
}