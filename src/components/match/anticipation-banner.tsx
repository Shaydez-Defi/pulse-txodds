"use client";

export function AnticipationBanner({
  show,
  message = "High pressure detected — a decisive moment is becoming increasingly likely.",
}: {
  show: boolean;
  message?: string;
}) {
  if (!show) return null;

  return (
    <section className="rounded-xl border-0 border-l-8 border-brand-purple bg-base-gray p-6 shadow-none dark:bg-dark-gray md:p-8">
      <p className="text-2xl font-bold leading-relaxed text-text-light dark:text-text-dark md:text-4xl">
        {message}
      </p>
    </section>
  );
}