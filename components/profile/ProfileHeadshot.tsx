"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HEADSHOT_PUBLIC_PATH, profile } from "@/lib/profile";
import { cn } from "@/lib/utils";

interface ProfileHeadshotProps {
  hasPhoto: boolean;
  variant?: "hero" | "about";
  className?: string;
}

const sizesByVariant = {
  hero: "(min-width: 1024px) 420px, (min-width: 640px) 360px, 280px",
  about: "(min-width: 1024px) 380px, 320px",
};

export function ProfileHeadshot({ hasPhoto, variant = "hero", className }: ProfileHeadshotProps) {
  // Hero sits above the fold and should appear immediately, like the text
  // beside it. The About page profile reveals on scroll, since it isn't
  // guaranteed to be in the initial viewport (especially on mobile).
  const revealProps =
    variant === "hero"
      ? { animate: { opacity: 1, y: 0 } }
      : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      {...revealProps}
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-line-strong bg-paper-raised shadow-lg",
        className,
      )}
    >
      {hasPhoto ? (
        <Image
          src={HEADSHOT_PUBLIC_PATH}
          alt={`${profile.name}, ${profile.positioning}`}
          fill
          sizes={sizesByVariant[variant]}
          priority={variant === "hero"}
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy-950 to-navy-800 text-paper"
          role="img"
          aria-label={`Placeholder for ${profile.name}'s headshot — add a photo at public/images/profile/headshot.jpg`}
        >
          <span className="font-serif-display text-6xl font-semibold tracking-tight text-paper/90">
            {profile.initials}
          </span>
          <span className="h-px w-10 bg-gold-500" aria-hidden />
          <span className="px-8 text-center text-xs uppercase tracking-[0.2em] text-paper/50">
            Add headshot.jpg
          </span>
        </div>
      )}
    </motion.div>
  );
}
