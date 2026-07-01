"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  primary: "pulse-btn-primary",
  secondary: "pulse-btn-secondary",
  ghost: "pulse-btn-ghost",
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
  const classes = clsx(variants[variant], className);

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.03 },
    whileTap: { scale: disabled ? 1 : 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 24 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(classes, disabled && "pointer-events-none opacity-40")}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}