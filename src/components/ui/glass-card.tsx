import clsx from "clsx";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  style?: React.CSSProperties;
};

export function GlassCard({
  children,
  className,
  variant = "secondary",
  style,
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass-card rounded-2xl",
        variant === "primary" ? "glass-primary p-8" : "glass-secondary p-4",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}