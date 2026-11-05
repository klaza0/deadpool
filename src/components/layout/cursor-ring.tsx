"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function CursorRing() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const node = root.current;
    if (!node) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const xTo = gsap.quickTo(node, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3.out" });
    const ring = node.querySelector("[data-ring]");

    const move = (event: PointerEvent) => {
      node.hidden = false;
      xTo(event.clientX);
      yTo(event.clientY);
      const hot = event.target instanceof Element && Boolean(event.target.closest("a, button"));
      ring?.classList.toggle("scale-150", hot);
      ring?.classList.toggle("bg-pool/30", hot);
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      ref={root}
      hidden
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2"
    >
      <div
        data-ring
        className="h-7 w-7 border border-pool transition-transform duration-200"
      />
    </div>
  );
}
