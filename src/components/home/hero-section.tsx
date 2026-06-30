"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { HeroVideoBackground } from "./hero-video-background";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <HeroVideoBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)]"
        >
          Live · World Cup 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-display max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          The pulse of the game. Live.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]"
        >
          We do not report what happened. We surface what the match is becoming.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/matches"
            className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Watch Live Matches
          </Link>
          <div className="[&_.wallet-adapter-button]:!h-12 [&_.wallet-adapter-button]:!px-8">
            <WalletMultiButton />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="h-8 w-px animate-pulse bg-white/30" />
      </div>
    </section>
  );
}