export function PulseLogo({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`font-headline text-xl font-black uppercase tracking-tighter md:text-3xl ${
        light ? "text-white" : "text-text-light dark:text-text-dark"
      }`}
    >
      Pulse
    </span>
  );
}