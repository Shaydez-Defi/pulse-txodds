import clsx from "clsx";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function GlassCard({
  children,
  className,
  variant = "secondary",
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass-card rounded-2xl",
        variant === "primary" ? "p-8" : "p-4",
        className
      )}
    >
      {children}
    </div>
  );
}