"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { timeline } from "@/data/content";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";
import { gsap, registerGsap } from "@/lib/gsap";

export function TimelineSection() {
  const { locale } = useSite();
  const [index, setIndex] = useState(0);
  const line = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const current = timeline[index] ?? timeline[0];

  useLayoutEffect(() => {
    registerGsap();
    const marker = line.current;
    const section = root.current;
    if (!marker || !section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      marker.style.transform = "scaleY(1)";
      return;
    }
    const tween = gsap.fromTo(
      marker,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section id="multiverse" ref={root} className="scroll-mt-20 border-t border-white/10 px-5 py-20 lg:px-12 lg:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pool">
        {tx(locale, { en: "Section 06", ar: "قسم 06" })}
      </p>
      <h2 className="mt-3 max-w-4xl font-display text-5xl sm:text-7xl">
        {tx(locale, { en: "ONE UNIVERSE", ar: "كون واحد" })}
        <span className="block text-pool">{tx(locale, { en: "WASN'T ENOUGH.", ar: "ما كفاش." })}</span>
      </h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="relative">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/15" aria-hidden="true" />
          <div
            ref={line}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-pool"
            aria-hidden="true"
          />
          <div
            role="tablist"
            aria-label={tx(locale, { en: "Deadpool appearances", ar: "ظهور ديدبول" })}
            className="relative space-y-2"
          >
            {timeline.map((item, itemIndex) => {
              const selected = itemIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`timeline-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`timeline-panel-${item.id}`}
                  onClick={() => setIndex(itemIndex)}
                  className="flex min-h-12 w-full items-center gap-4 ps-1 text-start"
                >
                  <span
                    className={selected ? "h-3.5 w-3.5 bg-pool" : "h-3.5 w-3.5 border border-white/50 bg-ink"}
                    aria-hidden="true"
                  />
                  <span className={selected ? "font-display text-3xl text-paper" : "font-display text-3xl text-white/45"}>
                    {tx(locale, item.year)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={current.id}
            role="tabpanel"
            id={`timeline-panel-${current.id}`}
            aria-labelledby={`timeline-tab-${current.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="border border-white/10 bg-surface p-6 sm:p-10"
          >
            <p className="font-comic text-lg text-pool">{tx(locale, current.year)}</p>
            <h3 className="mt-2 font-display text-5xl sm:text-6xl">{tx(locale, current.title)}</h3>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{tx(locale, current.copy)}</p>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
