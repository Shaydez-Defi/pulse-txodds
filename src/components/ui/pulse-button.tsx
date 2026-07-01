"use client";

import Link from "next/link";
import clsx from "clsx";

type PulseButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary: "bg-brand-lime text-base-black",
  secondary: "bg-base-black text-base-offwhite",
  ghost: "bg-brand-purple text-base-black",
};

export function PulseButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: PulseButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center border-0 px-8 py-4 text-sm font-bold uppercase tracking-tight",
    variants[variant],
    disabled && "pointer-events-none opacity-40",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}