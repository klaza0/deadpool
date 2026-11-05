"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type ShutterHeadlineProps = {
  text: string;
  className?: string;
  tone?: "solid" | "outline";
};

/**
 * Adapted from 21st.dev Hero Shutter Text by daiwiikharihar (demo 9989).
 * Slice layers, character stagger, and blur reveal are kept.
 * Demo chrome, light theme, and emerald accents are replaced with the Deadpool palette.
 */
export function ShutterHeadline({
  text,
  className,
  tone = "solid",
}: ShutterHeadlineProps) {
  const reduced = useReducedMotion();
  const characters = Array.from(text);
  const arabic = /[\u0600-\u06FF]/.test(text);

  if (reduced) {
    return <span className={cn("block", className)}>{text}</span>;
  }

  if (arabic) {
    return (
      <motion.span
        aria-hidden="true"
        className={cn("block", className, tone === "outline" && "text-pool")}
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <span className={cn("flex flex-wrap", className)} aria-hidden="true">
      {characters.map((char, index) => (
        <span key={`${char}-${index}`} className="relative inline-block overflow-hidden">
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)", y: "0.25em" }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 0.18 + index * 0.035, duration: 0.7, ease: "easeOut" }}
            className={cn(
              "block",
              tone === "outline" && "text-transparent [-webkit-text-stroke:1.5px_#F2F2F2]",
            )}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
          <motion.span
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: "110%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.65, delay: index * 0.035, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 text-pool"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 34%, 0 34%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
          <motion.span
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: "-110%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.65, delay: index * 0.035 + 0.08, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 text-paper"
            style={{ clipPath: "polygon(0 34%, 100% 34%, 100% 66%, 0 66%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
          <motion.span
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: "110%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.65, delay: index * 0.035 + 0.16, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 text-pool"
            style={{ clipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
