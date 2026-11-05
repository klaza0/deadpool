"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Crosshair,
  Drama,
  HeartPulse,
  PersonStanding,
  Shuffle,
  Swords,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { powers, type PowerIcon } from "@/data/content";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";
import { Rise } from "@/components/ui/rise";

const icons: Record<PowerIcon, LucideIcon> = {
  heal: HeartPulse,
  blades: Swords,
  guns: Crosshair,
  combat: PersonStanding,
  wall: Drama,
  chaos: Shuffle,
  food: UtensilsCrossed,
};

export function PowersSection() {
  const { locale } = useSite();
  return (
    <section id="abilities" className="scroll-mt-20 border-t border-white/10 px-5 py-20 lg:px-12 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pool">
            {tx(locale, { en: "Section 04", ar: "قسم 04" })}
          </p>
          <h2 className="mt-3 max-w-4xl font-display text-5xl sm:text-7xl">
            {tx(locale, { en: "BAD IDEAS.", ar: "أفكار خايبة." })}
            <span className="block text-pool">{tx(locale, { en: "EXCELLENT EXECUTION.", ar: "تنفيذ محترم." })}</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm text-mist">
          {tx(locale, {
            en: "Press a card. It flips, and the picture stays with the description. Artwork © IMDEV.",
            ar: "اضغط الكارت. يتقلب، والصورة تفضل مع الوصف. الرسوم © IMDEV.",
          })}
        </p>
      </div>

      <div className="mt-12 grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {powers.map((power, index) => (
          <Rise key={power.icon} delay={index * 0.05} className="h-full">
            <PowerCard
              index={index}
              icon={icons[power.icon]}
              image={power.image}
              focus={power.focus}
              title={tx(locale, power.title)}
              copy={tx(locale, power.copy)}
              alt={tx(locale, power.alt)}
              flipLabel={tx(locale, { en: "Flip the card", ar: "اقلب الكارت" })}
              backLabel={tx(locale, { en: "Flip back", ar: "ارجع الكارت" })}
            />
          </Rise>
        ))}
      </div>
    </section>
  );
}

function PowerCard({
  index,
  icon: Icon,
  image,
  focus,
  title,
  copy,
  alt,
  flipLabel,
  backLabel,
}: {
  index: number;
  icon: LucideIcon;
  image: string;
  focus: string;
  title: string;
  copy: string;
  alt: string;
  flipLabel: string;
  backLabel: string;
}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen((value) => !value)}
      className="relative block h-full min-h-[28rem] w-full text-start [perspective:1400px]"
    >
      <motion.span
        className="relative block h-full min-h-[28rem] [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: open ? 180 : 0, scale: open ? 1 : 1 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        transition={reduced ? { duration: 0 } : { duration: 0.7, ease: [0.16, 0.84, 0.28, 1] }}
      >
        <span
          className="absolute inset-0 flex flex-col overflow-hidden border border-white/15 bg-surface [backface-visibility:hidden]"
          aria-hidden={open}
        >
          <span className="relative block w-full overflow-hidden bg-ink" style={{ aspectRatio: "4 / 5" }}>
            <Image
              src={image}
              alt={open ? "" : alt}
              fill
              sizes="(min-width: 1280px) 32vw, (min-width: 640px) 46vw, 92vw"
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </span>
          <span className="flex shrink-0 items-end justify-between gap-3 p-5">
            <span>
              <Icon aria-hidden="true" className="h-5 w-5 text-pool" />
              <span className="mt-3 block font-display text-3xl leading-none sm:text-4xl">{title}</span>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.2em] text-pool">{flipLabel}</span>
            </span>
            <span className="font-display text-3xl text-white/30">0{index + 1}</span>
          </span>
        </span>

        <span
          className="absolute inset-0 overflow-hidden border border-pool [backface-visibility:hidden] [transform:rotateY(180deg)]"
          aria-hidden={!open}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1280px) 32vw, (min-width: 640px) 46vw, 92vw"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/15" />
          <span className="relative flex h-full flex-col justify-end p-5 sm:p-6">
            <span className="mb-3 flex items-center justify-between">
              <Icon aria-hidden="true" className="h-5 w-5 text-pool" />
              <span className="font-display text-3xl text-white/70">0{index + 1}</span>
            </span>
            <span className="block font-display text-3xl leading-none text-pool sm:text-4xl">{title}</span>
            <span className="mt-3 block text-base leading-relaxed text-paper">{copy}</span>
            <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">{backLabel}</span>
          </span>
        </span>
      </motion.span>
    </button>
  );
}
