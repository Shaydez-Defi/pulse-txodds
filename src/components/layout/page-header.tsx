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
      <p className="text-xs font-bold uppercase tracking-widest text-white/40">
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