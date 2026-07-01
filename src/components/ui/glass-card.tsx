import clsx from "clsx";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  accent?: "offwhite" | "purple" | "lime" | "black" | "crimson";
  style?: React.CSSProperties;
};

const BG = {
  offwhite: "bg-base-offwhite text-base-black",
  purple: "bg-brand-purple text-base-black",
  lime: "bg-brand-lime text-base-black",
  black: "bg-base-black text-base-offwhite",
  crimson: "bg-brand-crimson text-white",
};

export function GlassCard({
  children,
  className,
  variant = "secondary",
  accent,
  style,
}: GlassCardProps) {
  const bg =
    accent ??
    (variant === "primary" ? "offwhite" : "offwhite");

  return (
    <div
      className={clsx(
        "brutal-block w-full border-0 border-l-[20px] border-brand-lime p-8",
        BG[bg],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}