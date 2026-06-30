"use client";

import { motion } from "framer-motion";

export function RollingBall({ x }: { x: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2"
      animate={{ x, rotate: x * 0.15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <path d="M7 1v12M1 7h12M3 3l8 8M11 3L3 11" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
      </svg>
    </motion.div>
  );
}