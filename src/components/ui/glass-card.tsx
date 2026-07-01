import clsx from "clsx";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  accent?: "offwhite" | "purple" | "lime" | "black" | "crimson";
  style?: React.CSSProperties;
};

const BG = {
  offwhite: "bg-base-gray dark:bg-dark-gray text-text-light dark:text-text-dark",
  purple: "bg-brand-purple text-base-black",
  lime: "bg-brand-lime text-base-black",
  black: "bg-base-black text-text-dark dark:bg-dark-gray",
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
        "w-full rounded-xl border-0 border-l-8 border-brand-purple p-6 shadow-none",
        BG[bg],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}