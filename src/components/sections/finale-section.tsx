"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";

export function FinaleSection() {
  const { scrollTo, unlock, achievementsUnlocked, locale } = useSite();
  const [cracked, setCracked] = useState(false);
  const found = achievementsUnlocked.includes("wall");

  return (
    <section id="finale" className="relative min-h-[100svh] overflow-hidden border-t border-white/10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center overflow-hidden opacity-20">
        <div className="marquee-track font-display text-[18vw] leading-none text-transparent [-webkit-text-stroke:1px_#C8102E]">
          <span className="px-6">
            {tx(locale, { en: "MAXIMUM EFFORT — YOU STAYED — ", ar: "أقصى مجهود — فضلت — " })}
          </span>
          <span className="px-6">
            {tx(locale, { en: "MAXIMUM EFFORT — YOU STAYED — ", ar: "أقصى مجهود — فضلت — " })}
          </span>
        </div>
      </div>
      <div className="pulse-red pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 bg-pool blur-3xl" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 py-20 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pool">
          {tx(locale, { en: "Section 08", ar: "قسم 08" })}
        </p>
        <div>
          <h2 className="max-w-5xl font-display text-5xl sm:text-7xl lg:text-8xl">
            {tx(locale, { en: "YOU MADE IT.", ar: "وصلت." })}
            <span className="block">{tx(locale, { en: "I'M IMPRESSED.", ar: "متبهر." })}</span>
            <span className="block text-pool">{tx(locale, { en: "BARELY.", ar: "بالكاد." })}</span>
          </h2>
          <button
            type="button"
            onClick={() => {
              setCracked(true);
              unlock("wall");
            }}
            className="mt-8 inline-flex min-h-11 items-center gap-3 text-left text-sm uppercase tracking-[0.18em] text-mist"
          >
            <span aria-hidden="true" className={cracked || found ? "text-pool" : ""}>
              {cracked || found ? "\\\\" : "/"}
            </span>
            {cracked || found
              ? tx(locale, {
                  en: "The fourth wall can see you scrolling. Blink if you're real.",
                  ar: "الجدار الرابع شايفك. ارمش لو أنت حقيقي.",
                })
              : tx(locale, { en: "There's a crack in the frame.", ar: "فيه شرخ هنا." })}
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="mt-8 flex min-h-12 items-center gap-3 font-display text-2xl tracking-[0.14em]"
          >
            <ArrowUp aria-hidden="true" className="h-5 w-5 text-pool" />
            {tx(locale, { en: "Back to top", ar: "ارجع لفوق" })}
          </button>
        </div>

        <footer className="mt-16 max-w-3xl border-t border-white/15 pt-6">
          <p className="font-display text-4xl tracking-wide">© IMDEV</p>
          <p className="mt-2 font-comic text-lg text-pool">
            {tx(locale, { en: "Made with Maximum Effort.", ar: "اتعمل بأقصى مجهود." })}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            {tx(locale, {
              en: "This website and its original artwork are © IMDEV. Unofficial fan project. Deadpool, Wade Wilson, Wolverine, and related names are trademarks of Marvel and Disney. Not endorsed by, affiliated with, or produced by Marvel, Disney, or 20th Century Studios. The pictures are original illustrations by IMDEV, not film stills or studio art.",
              ar: "الموقع ده ورسومه الأصلية © IMDEV. مشروع معجبين غير رسمي. ديدبول وويد ويلسون وولفرين والأسماء المرتبطة علامات لمارفل وديزني. مش معتمد ولا تابع ولا من إنتاج مارفل أو ديزني أو استوديوهات القرن العشرين. الصور رسوم أصلية لـ IMDEV، مش لقطات أفلام.",
            })}
          </p>
        </footer>
      </div>
    </section>
  );
}
