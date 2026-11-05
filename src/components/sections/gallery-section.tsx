"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/data/content";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";
import { gsap, registerGsap } from "@/lib/gsap";

export function GallerySection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const { setScrollLocked, locale } = useSite();
  const titleId = useId();

  useEffect(() => {
    registerGsap();
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        x: () => -Math.max(track.scrollWidth - pin.clientWidth, 0),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth - pin.clientWidth, 1)}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    setScrollLocked(active !== null);
    return () => setScrollLocked(false);
  }, [active, setScrollLocked]);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((current) => (current === null ? 0 : (current + 1) % gallery.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null ? 0 : (current - 1 + gallery.length) % gallery.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const slide = active === null ? null : gallery[active];

  return (
    <section id="gallery" className="scroll-mt-20 border-t border-white/10">
      <header className="px-5 pb-6 pt-16 lg:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pool">
          {tx(locale, { en: "Section 05", ar: "قسم 05" })}
        </p>
        <h2 className="mt-2 font-display text-5xl leading-none sm:text-6xl">
          {tx(locale, { en: "LOOK AT ME. I'M ART.", ar: "بصّ لي. أنا فن." })}
        </h2>
        <div className="relative mt-5 h-2 overflow-hidden bg-pool" />
      </header>

      <div ref={pinRef} className="overflow-hidden lg:h-[100svh]">
        <div
          ref={trackRef}
          className="flex h-[74vh] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 lg:h-full lg:w-max lg:items-stretch lg:overflow-visible lg:px-0 lg:pb-0"
        >
          <article className="relative hidden w-[34vw] shrink-0 overflow-hidden bg-ink lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#7A071B_0%,#090909_62%)]" />
            <div className="relative z-10 flex h-full flex-col justify-end px-12 py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pool">
                {tx(locale, { en: "Section 05", ar: "قسم 05" })}
              </p>
              <h2 className="mt-3 font-display text-7xl leading-[0.9] xl:text-8xl">
                {tx(locale, { en: "LOOK AT ME.", ar: "بصّ لي." })}
                <span className="block">{tx(locale, { en: "I'M ART.", ar: "أنا فن." })}</span>
              </h2>
              <p className="mt-6 max-w-sm text-mist">
                {tx(locale, {
                  en: "Artwork © IMDEV. Unofficial page. Swipe on a phone. Scroll through them here.",
                  ar: "رسوم © IMDEV. صفحة معجبين. اسحب على الموبايل، واسكرول هنا.",
                })}
              </p>
            </div>
          </article>
          {gallery.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className="shot group relative h-full w-[82vw] shrink-0 snap-center overflow-hidden bg-ink text-start sm:w-[58vw] lg:w-[42vw]"
              onClick={() => setActive(index)}
            >
              <Image
                src={item.src}
                alt={tx(locale, item.alt)}
                fill
                sizes="(min-width: 1024px) 42vw, 82vw"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-5">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-pool">
                  {tx(locale, item.kicker)}
                </span>
                <span className="mt-1 block font-display text-3xl leading-none">
                  {tx(locale, item.caption)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {slide && active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4"
        >
          <div className="relative flex h-full w-full max-w-6xl flex-col">
            <div className="flex items-center justify-between gap-3 py-3">
              <p id={titleId} className="font-display text-3xl">
                {tx(locale, slide.kicker)}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex min-h-11 items-center gap-2 border border-white/30 px-3"
              >
                <X aria-hidden="true" className="h-4 w-4" />
                {tx(locale, { en: "Close", ar: "اقفل" })}
              </button>
            </div>
            <div className="relative min-h-0 flex-1 bg-surface">
              <Image
                src={slide.src}
                alt={tx(locale, slide.alt)}
                fill
                sizes="(min-width: 1024px) 70vw, 92vw"
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>
            <div className="flex items-center justify-between gap-3 py-4">
              <p className="max-w-xl text-mist">{tx(locale, slide.caption)}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/30"
                  aria-label={tx(locale, { en: "Previous image", ar: "الصورة السابقة" })}
                  onClick={() =>
                    setActive((current) =>
                      current === null ? 0 : (current - 1 + gallery.length) % gallery.length,
                    )
                  }
                >
                  <ChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/30"
                  aria-label={tx(locale, { en: "Next image", ar: "الصورة التالية" })}
                  onClick={() =>
                    setActive((current) => (current === null ? 0 : (current + 1) % gallery.length))
                  }
                >
                  <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
