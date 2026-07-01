"use client";

import type { StoryCard } from "@/lib/types";

export function StoryCards({ stories }: { stories: StoryCard[] }) {
  return (
    <div className="brutal-stack w-full">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-lime">
        Match narrative
      </p>
      {stories.map((story) => (
        <p
          key={story.id}
          className="mt-0 w-full border-0 border-t-4 border-brand-purple pt-8 text-4xl font-bold leading-tight text-white"
        >
          {story.text}
        </p>
      ))}
    </div>
  );
}