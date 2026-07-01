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
    <header className="w-full border-0 border-b-4 border-base-black bg-brand-purple p-8 md:p-12">
      <p className="text-sm font-bold uppercase tracking-widest text-base-black">{eyebrow}</p>
      <h1 className="text-5xl font-black uppercase leading-none tracking-tighter text-base-black md:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-3xl text-lg font-bold text-base-black">{description}</p>
      )}
    </header>
  );
}