"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";
import { GlitchText } from "@/components/ui/glitch-text";
import { ShutterHeadline } from "@/components/ui/shutter-headline";
import { gsap, registerGsap } from "@/lib/gsap";

export function IntroGate() {
  const { introOpen, dismissIntro, soundOn, toggleSound, startSoundtrack, locale } = useSite();
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const danceRef = useRef<gsap.core.Animation | null>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setStep(3);
      return;
    }
    const timers = [
      window.setTimeout(() => setStep(1), 500),
      window.setTimeout(() => setStep(2), 1100),
      window.setTimeout(() => setStep(3), 1700),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduced]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced || !introOpen) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const fighter = ".intro-fighter";
      gsap.set(fighter, { transformOrigin: "50% 100%" });
      gsap.fromTo(
        fighter,
        { y: 72, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, ease: "power3.out" },
      );
      gsap.fromTo(
        ".intro-ghost",
        { y: 72, x: 18, opacity: 0 },
        { y: 0, x: 0, opacity: 0.18, duration: 1.15, ease: "power2.out" },
      );
      gsap.fromTo(
        ".intro-ring",
        { scale: 0.4, opacity: 0.7 },
        { scale: 1.65, opacity: 0, duration: 1.1, ease: "power2.out" },
      );
      const idle = gsap.to(fighter, {
        rotation: 1.4,
        duration: 3.6,
        delay: 1.05,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      danceRef.current = idle;
    }, stage);

    const onHide = () => {
      if (document.hidden) danceRef.current?.pause();
      else danceRef.current?.resume();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      ctx.revert();
      danceRef.current = null;
    };
  }, [introOpen, reduced]);

  function finish() {
    dismissIntro();
    window.setTimeout(() => {
      setVisible(false);
      document.getElementById("hero-title")?.focus();
    }, reduced ? 40 : 380);
  }

  function enterWorld() {
    startSoundtrack();
    danceRef.current?.kill();
    if (reduced) {
      finish();
      return;
    }
    gsap.killTweensOf(".intro-fighter");
    gsap.to(".intro-fighter", {
      y: -24,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: finish,
    });
  }

  return (
    <AnimatePresence>
      {introOpen && visible ? (
        <motion.div
          className="fixed inset-0 z-40 overflow-y-auto bg-ink/75"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.35 }}
        >
          <p className="sr-only">
            {tx(locale, {
              en: "Oh, great. Another visitor. Deadpool. Maximum effort. Enter the site or skip the introduction.",
              ar: "يا نهار. زائر تاني. ديدبول. أقصى مجهود. ادخل الموقع أو سيبه وعدّي.",
            })}
          </p>
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="pulse-red absolute -left-16 top-1/3 h-72 w-72 bg-pool blur-3xl" />
            <div className="halftone absolute inset-0 opacity-25" />
          </div>

          <div className="relative flex min-h-screen flex-col lg:grid lg:min-h-screen lg:grid-cols-12 lg:items-center">
            <div
              ref={stageRef}
              className="intro-stage relative w-full shrink-0 overflow-hidden lg:col-span-5"
            >
              <div className="intro-ring absolute bottom-[8%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border-2 border-pool" />
              <div className="intro-ghost absolute opacity-0" aria-hidden="true">
                <Image
                  src="/images/intro-merc.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="intro-figure"
                />
              </div>
              <div className="intro-fighter absolute">
                <Image
                  src="/images/intro-merc.png"
                  alt={tx(locale, {
                    en: "Full red and black suit, mask on, katanas on the back. Unofficial.",
                    ar: "بدلة أحمر وأسود، القناع لابسها، والسيوف على الضهر. غير رسمي.",
                  })}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="intro-figure"
                />
              </div>
            </div>

            <div className="intro-copy relative z-10 flex flex-1 flex-col justify-end px-5 pt-4 lg:col-span-7 lg:justify-center lg:px-12 lg:pt-0">
              <p className="font-comic text-lg text-pool" aria-hidden="true">
                {step >= 1 ? <GlitchText text={tx(locale, { en: "OH, GREAT.", ar: "يا نهار." })} /> : "\u00A0"}
              </p>
              <p className="mt-2 font-display text-4xl tracking-wide text-paper sm:text-6xl" aria-hidden="true">
                {step >= 2 ? tx(locale, { en: "ANOTHER VISITOR.", ar: "زائر تاني." }) : "\u00A0"}
              </p>
              {step >= 3 ? (
                <div className="mt-6" aria-hidden="true">
                  <ShutterHeadline
                    text={tx(locale, { en: "DEADPOOL", ar: "ديدبول" })}
                    className="font-display text-[18vw] leading-[0.8] text-paper lg:text-[8.5rem]"
                  />
                  <ShutterHeadline
                    text={tx(locale, { en: "MAXIMUM EFFORT.", ar: "أقصى مجهود." })}
                    tone="outline"
                    className="font-display text-[8vw] leading-none lg:text-6xl"
                  />
                </div>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={enterWorld}
                  className="inline-flex min-h-12 items-center bg-pool px-6 font-display text-2xl tracking-[0.14em] text-white hover:bg-[#a30d26]"
                >
                  {tx(locale, { en: "Enter my world", ar: "ادخل" })}
                </button>
                <button
                  type="button"
                  onClick={finish}
                  className="inline-flex min-h-12 items-center border border-white/40 px-5 font-display text-xl tracking-[0.16em]"
                >
                  {tx(locale, { en: "Skip intro", ar: "سيبها وعدّي" })}
                </button>
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-pressed={soundOn}
                  className="inline-flex min-h-12 items-center gap-2 border border-white/40 px-4 text-sm uppercase tracking-[0.16em]"
                >
                  {soundOn ? <Volume2 aria-hidden="true" className="h-4 w-4" /> : <VolumeX aria-hidden="true" className="h-4 w-4" />}
                  {soundOn
                    ? tx(locale, { en: "Sound on", ar: "الصوت فاتح" })
                    : tx(locale, { en: "Sound off", ar: "الصوت مقفول" })}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
