"use client";

import { motion } from "framer-motion";

export function AnimatedPitchScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#061008]">
      <motion.div
        className="absolute inset-[-20%]"
        animate={{ scale: [1, 1.06, 1], x: [0, -12, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 1200 800"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3d2a" />
              <stop offset="100%" stopColor="#0d2418" />
            </linearGradient>
            <pattern id="stripes" width="80" height="800" patternUnits="userSpaceOnUse">
              <rect width="40" height="800" fill="rgba(255,255,255,0.03)" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#grass)" />
          <rect width="1200" height="800" fill="url(#stripes)" />
          <rect x="80" y="60" width="1040" height="680" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
          <line x1="600" y1="60" x2="600" y2="740" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
          <circle cx="600" cy="400" r="90" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
          <rect x="80" y="280" width="160" height="240" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
          <rect x="960" y="280" width="160" height="240" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent"
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <motion.div
        className="absolute -right-1/4 top-0 h-full w-1/3 bg-gradient-to-l from-transparent via-amber-200/5 to-transparent"
        animate={{ x: ["130%", "-30%"] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 2 }}
        aria-hidden
      />

      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(120,150,180,0.35), transparent 40%), radial-gradient(circle at 80% 30%, rgba(90,110,70,0.25), transparent 45%)",
        }}
        aria-hidden
      />
    </div>
  );
}