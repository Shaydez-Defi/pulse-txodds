export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12">
      <p className="pulse-eyebrow">{eyebrow}</p>
      <h1 className="font-headline mt-4 text-5xl tracking-wide text-white md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}