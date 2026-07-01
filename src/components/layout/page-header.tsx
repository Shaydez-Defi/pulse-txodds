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
    <header className="pulse-hero-block mx-0 my-0 w-full rounded-none bg-brand-purple p-8 md:p-12">
      <p className="text-sm font-bold uppercase tracking-widest text-base-black">{eyebrow}</p>
      <h1 className="mt-2 text-5xl font-black uppercase leading-none tracking-tighter text-base-black md:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="mt-6 max-w-3xl text-lg font-bold leading-relaxed text-base-black/80">
          {description}
        </p>
      )}
    </header>
  );
}