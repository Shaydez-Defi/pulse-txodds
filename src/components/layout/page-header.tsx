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
    <header className="w-full border-0 border-b-4 border-base-black bg-base-black p-8 text-base-offwhite md:p-12">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-lime">{eyebrow}</p>
      <h1 className="mt-2 text-5xl font-black uppercase leading-none tracking-tighter md:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-3xl text-lg font-bold text-base-offwhite">{description}</p>
      )}
    </header>
  );
}