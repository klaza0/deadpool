"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";
import { ShutterHeadline } from "@/components/ui/shutter-headline";
import { gsap, registerGsap } from "@/lib/gsap";

const labels = [
  { en: "Regenerates", ar: "بيتجدد" },
  { en: "Breaks the fourth wall", ar: "بيكسر الجدار الرابع" },
  { en: "Unofficial", ar: "غير رسمي" },
];

export function HeroExperience() {
  const { scrollTo, locale } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(photo, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  function onMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (photoRef.current) {
      photoRef.current.style.translate = `${x * -24}px ${y * -16}px`;
    }
    if (ghostRef.current) {
      ghostRef.current.style.translate = `${x * 30}px ${y * 18}px`;
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={onMove}
      className="scroll-mt-20 relative min-h-[100svh] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="pulse-red absolute right-[-10%] top-[10%] h-[50vh] w-[50vh] rounded-full bg-crimson blur-3xl" />
        <div className="halftone absolute inset-0 opacity-25" />
      </div>

      <div className="relative grid min-h-[100svh] lg:grid-cols-12">
        <div className="relative min-h-[46vh] lg:col-span-5 lg:col-start-8 lg:min-h-[100svh]">
          <div ref={photoRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/images/dp-portrait.jpg"
              alt={tx(locale, {
                en: "Close portrait of the red mask and black eye frames. Unofficial.",
                ar: "صورة قريبة للقناع الأحمر وإطار العين الأسود. غير رسمي.",
              })}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-[center_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-ink" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-end px-5 pb-16 pt-8 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[62%] lg:justify-center lg:px-12 lg:pb-0">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-pool">
            {tx(locale, { en: "Section 02", ar: "قسم 02" })}
          </p>
          <p
            ref={ghostRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-24 hidden font-display text-[12rem] leading-none text-white/[0.04] lg:block"
          >
            02
          </p>
          <h1 id="hero-title" tabIndex={-1} className="mt-4 max-w-4xl outline-none">
            <span className="sr-only">
              {tx(locale, { en: "The merc with a mouth.", ar: "المرتزق اللي لسانه طويل." })}
            </span>
            <ShutterHeadline
              text={tx(locale, { en: "THE MERC", ar: "المرتزق" })}
              className="font-display text-[16vw] text-paper lg:text-[7.4rem]"
            />
            <ShutterHeadline
              text={tx(locale, { en: "WITH A MOUTH.", ar: "اللي لسانه طويل." })}
              tone="outline"
              className="font-display text-[8.5vw] lg:text-[4.4rem]"
            />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-mist sm:text-xl">
            {tx(locale, {
              en: "Part hero. Part disaster. 100% impossible to shut up.",
              ar: "نص بطل. نص مصيبة. ومش هيسكت.",
            })}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {labels.map((label) => (
              <li
                key={label.en}
                className="border border-white/20 bg-ink/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper"
              >
                {tx(locale, label)}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollTo("#story")}
            className="mt-10 inline-flex min-h-12 w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em]"
          >
            <ArrowDown aria-hidden="true" className="h-4 w-4 text-pool" />
            {tx(locale, { en: "Keep going", ar: "كمّل نزول" })}
          </button>
        </div>
      </div>
    </section>
  );
}
