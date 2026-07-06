"use client";

import { motion } from "framer-motion";

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "immediate" animates on mount (hero); "onScroll" triggers once the element scrolls into view (About page). */
  mode?: "immediate" | "onScroll";
}

export function FadeInUp({ children, className, delay = 0, mode = "immediate" }: FadeInUpProps) {
  const viewportProps =
    mode === "onScroll"
      ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } }
      : { animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
      {...viewportProps}
    >
      {children}
    </motion.div>
  );
}
