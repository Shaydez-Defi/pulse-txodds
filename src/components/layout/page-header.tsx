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
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
        {eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">{description}</p>
      )}
    </div>
  );
}