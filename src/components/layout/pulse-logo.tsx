export function PulseLogo({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`font-headline text-xl font-black uppercase tracking-tighter ${
        light ? "text-base-offwhite" : "text-base-black"
      }`}
    >
      Pulse
    </span>
  );
}