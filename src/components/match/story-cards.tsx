"use client";

import type { StoryCard } from "@/lib/types";

export function StoryCards({ stories }: { stories: StoryCard[] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-purple">
        Match narrative
      </p>
      {stories.map((story) => (
        <div
          key={story.id}
          className="rounded-xl border-0 border-l-8 border-brand-purple bg-base-gray p-6 shadow-none dark:bg-dark-gray"
        >
          <p className="text-2xl font-bold leading-relaxed text-text-light dark:text-text-dark md:text-4xl">
            {story.text}
          </p>
        </div>
      ))}
    </div>
  );
}