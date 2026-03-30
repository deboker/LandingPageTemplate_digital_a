"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type FloatProps = {
  children: ReactNode;
  className?: string;
  amplitude?: number;
};

export function Float({
  children,
  className,
  amplitude = 10,
}: FloatProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{
        duration: 7,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
