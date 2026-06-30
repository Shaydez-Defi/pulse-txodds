"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { StoryCard } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";

export function StoryCards({ stories }: { stories: StoryCard[] }) {
  return (
    <div>
      <h3 className="font-display mb-4 text-lg font-semibold">Match narrative</h3>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
            >
              <GlassCard>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {story.text}
                </p>
                <p className="mt-3 text-[11px] text-[var(--text-muted)]">
                  {new Date(story.timestamp).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}