"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { chapters } from "@/data/content";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";
import { gsap, registerGsap } from "@/lib/gsap";

export function StorySection() {
  const root = useRef<HTMLElement>(null);
  const { locale } = useSite();

  useLayoutEffect(() => {
    registerGsap();
    const scope = root.current;
    if (!scope) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>("[data-mask]");
      frames.forEach((frame) => {
        gsap.set(frame, { clipPath: "inset(12% 8% 12% 8%)" });
        gsap.to(frame, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
        gsap.from(chapter, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 86%",
          },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} className="scroll-mt-20 border-t border-white/10">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[70vw] lg:sticky lg:top-0 lg:col-span-5 lg:h-[100svh] lg:min-h-0">
          <div data-mask className="absolute inset-0">
            <Image
              src="/images/story-cover.jpg"
              alt={tx(locale, {
                en: "Red and black suit walking a night alley beside the story. Unofficial.",
                ar: "بدلة أحمر وأسود ماشية في حارة بالليل جنب الحكاية. غير رسمي.",
              })}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
          </div>
          <p className="absolute bottom-6 left-5 font-display text-7xl leading-none text-white/80 lg:left-8">
            03
          </p>
        </div>

        <div className="px-5 py-16 lg:col-span-7 lg:px-16 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pool">
            {tx(locale, { en: "Who the hell is Deadpool?", ar: "مين ديدبول ده؟" })}
          </p>
          <h2 className="mt-3 max-w-xl font-display text-5xl sm:text-7xl">
            {tx(locale, { en: "NOT YOUR AVERAGE SUPERHERO.", ar: "مش سوبرهيرو عادي." })}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-mist">
            {tx(locale, {
              en: "The facts stay where the comics and the films put them. The attitude is complimentary.",
              ar: "الحقائق من الكوميكس والأفلام. الاستظراف من عندنا.",
            })}
          </p>

          <div className="mt-14 space-y-16">
            {chapters.map((chapter, index) => (
              <article key={chapter.kicker.en} data-chapter className="max-w-xl">
                <p className="font-comic text-pool">
                  0{index + 1} / {tx(locale, chapter.kicker)}
                </p>
                <h3 className="mt-2 font-display text-4xl leading-none sm:text-5xl">{tx(locale, chapter.title)}</h3>
                <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">{tx(locale, chapter.body)}</p>
              </article>
            ))}
          </div>

          <figure data-mask className="relative mt-16 aspect-[16/9] overflow-hidden">
            <Image
              src="/images/story-wide.jpg"
              alt={tx(locale, {
                en: "Red and black suit on a rooftop ledge at night, a katana across the lap. Unofficial.",
                ar: "بدلة أحمر وأسود على حافة سطح بالليل، وسيف على الحجر. غير رسمي.",
              })}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 text-sm text-paper">
              {tx(locale, { en: "Unofficial.", ar: "غير رسمي." })}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
