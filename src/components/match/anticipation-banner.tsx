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
    <section className="w-full bg-base-black p-8 md:p-12">
      <p className="text-2xl font-bold leading-tight text-base-offwhite md:text-4xl">
        {message}
      </p>
    </section>
  );
}