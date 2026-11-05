"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const card = useRef<HTMLDivElement>(null);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    const node = card.current;
    if (!node || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = node.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    node.style.transform = `rotateX(${(py - 0.5) * -8}deg) rotateY(${(px - 0.5) * 10}deg)`;
    node.style.setProperty("--mx", `${px * 100}%`);
    node.style.setProperty("--my", `${py * 100}%`);
  }

  function reset() {
    const node = card.current;
    if (!node) return;
    node.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div className="h-full [perspective:1100px]">
      <div
        ref={card}
        onPointerMove={move}
        onPointerLeave={reset}
        className={cn(
          "group relative h-full border border-white/15 bg-surface transition-transform duration-200 [transform-style:preserve-3d]",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 40%), rgba(200,16,46,0.38), transparent 42%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
