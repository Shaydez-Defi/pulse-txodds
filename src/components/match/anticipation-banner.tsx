"use client";

import { AnimatePresence, motion } from "framer-motion";

export function AnticipationBanner({
  show,
  message = "High pressure detected — a decisive moment is becoming increasingly likely.",
}: {
  show: boolean;
  message?: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="glass-alert rounded-xl px-6 py-4"
        >
          <p className="font-editorial text-sm text-[#fecaca]">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}