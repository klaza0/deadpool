"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { achievements, type AchievementId } from "@/data/content";
import { tx, type Locale } from "@/i18n/text";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

type HiddenId = Exclude<AchievementId, "maximum">;

type SiteContextValue = {
  introOpen: boolean;
  dismissIntro: () => void;
  soundOn: boolean;
  toggleSound: () => void;
  playCue: () => void;
  startSoundtrack: () => void;
  achievementsUnlocked: AchievementId[];
  unlock: (id: HiddenId) => void;
  registerLogoClick: () => number;
  logoTaps: number;
  scrollTo: (hash: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  setScrollLocked: (locked: boolean) => void;
  locale: Locale;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) {
    throw new Error("useSite must be used within SiteProvider");
  }
  return value;
}

function playSting() {
  const AudioContextCtor =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;
  const ctx = new AudioContextCtor();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(210, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(48, ctx.currentTime + 0.28);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.34);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.36);
  osc.onended = () => {
    void ctx.close();
  };
}

const hiddenIds: HiddenId[] = ["chimichanga", "eyes", "logo", "wall"];

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [introOpen, setIntroOpen] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState<AchievementId[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(false);
  const locale: Locale = "en";
  const [logoTaps, setLogoTaps] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const trackRef = useRef<HTMLAudioElement | null>(null);
  const logoClicks = useRef<number[]>([]);
  const typed = useRef("");

  const unlock = useCallback((id: HiddenId) => {
    setAchievementsUnlocked((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      const found = hiddenIds.filter((item) => next.includes(item));
      if (found.length >= 3 && !next.includes("maximum")) {
        next.push("maximum");
      }
      return next;
    });
  }, []);

  const playCue = useCallback(() => {
    try {
      playSting();
    } catch {
      /* Autoplay policies or a missing audio device should not break the page. */
    }
  }, []);

  const startSoundtrack = useCallback(() => {
    const audio = trackRef.current;
    if (!audio) return;
    setSoundOn(true);
    const played = audio.play();
    if (played) {
      played.catch(() => setSoundOn(false));
    }
  }, []);

  const dismissIntro = useCallback(() => {
    setIntroOpen(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const scrollTo = useCallback((hash: string) => {
    setMenuOpen(false);
    setIntroOpen(false);
    const target = hash.startsWith("#") ? hash : `#${hash}`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = lenisRef.current;
    if (reduced || !lenis) {
      document.querySelector(target)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    lenis.start();
    lenis.scrollTo(target, { offset: -72, force: true });
  }, []);

  const registerLogoClick = useCallback(() => {
    const now = Date.now();
    const taps = [...logoClicks.current.filter((time) => now - time < 5000), now];
    if (taps.length >= 4) {
      logoClicks.current = [];
      setLogoTaps(4);
      unlock("logo");
      window.setTimeout(() => setLogoTaps(0), 900);
      return 4;
    }
    logoClicks.current = taps;
    setLogoTaps(taps.length);
    window.setTimeout(() => {
      const still = logoClicks.current.filter((time) => Date.now() - time < 5000);
      if (still.length === 0) {
        logoClicks.current = [];
        setLogoTaps(0);
      }
    }, 5000);
    return taps.length;
  }, [unlock]);

  const toggleSound = useCallback(() => {
    setSoundOn((on) => {
      const next = !on;
      const audio = trackRef.current;
      if (audio && audio.currentTime > 0) {
        if (next) void audio.play();
        else audio.pause();
      } else if (next) {
        playCue();
      }
      return next;
    });
  }, [playCue]);

  useEffect(() => {
    registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (introOpen) lenis.stop();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
    // Lenis is created once. Later lock state is handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    const locked = introOpen || menuOpen || scrollLocked;
    document.body.style.overflow = locked ? "hidden" : "";
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [introOpen, menuOpen, scrollLocked]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, [contenteditable='true']")
      ) {
        return;
      }
      if (event.key.length !== 1) return;
      typed.current = (typed.current + event.key.toLowerCase()).slice(-16);
      if (typed.current.includes("chimichanga")) {
        typed.current = "";
        unlock("chimichanga");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [unlock]);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    try {
      localStorage.removeItem("dp-locale");
    } catch {
      /* Storage can be blocked. The page still stays English. */
    }
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({
      introOpen,
      dismissIntro,
      soundOn,
      toggleSound,
      playCue,
      startSoundtrack,
      achievementsUnlocked,
      unlock,
      registerLogoClick,
      logoTaps,
      scrollTo,
      menuOpen,
      setMenuOpen,
      setScrollLocked,
      locale,
    }),
    [
      introOpen,
      dismissIntro,
      soundOn,
      toggleSound,
      playCue,
      startSoundtrack,
      achievementsUnlocked,
      unlock,
      registerLogoClick,
      logoTaps,
      scrollTo,
      menuOpen,
      locale,
    ],
  );

  return (
    <SiteContext.Provider value={value}>
      <audio ref={trackRef} src="/audio/opening.mp3" preload="none" hidden />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <AchievementToast items={achievementsUnlocked} />
    </SiteContext.Provider>
  );
}

function AchievementToast({ items }: { items: AchievementId[] }) {
  const { locale } = useSite();
  const seen = useRef<AchievementId[]>([]);
  const [current, setCurrent] = useState<AchievementId | null>(null);

  useEffect(() => {
    const fresh = [...items].reverse().find((id) => !seen.current.includes(id));
    if (!fresh) return;
    seen.current = [...items];
    setCurrent(fresh);
    const timer = window.setTimeout(() => setCurrent(null), 3400);
    return () => window.clearTimeout(timer);
  }, [items]);

  if (!current) return null;
  const copy = achievements[current];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 start-4 z-[70] max-w-sm border border-pool bg-ink/95 px-4 py-3 shadow-[0_0_40px_rgba(200,16,46,0.35)]"
    >
      <p className="font-comic text-sm text-pool">
        {tx(locale, { en: "Achievement unlocked", ar: "سر اتفتح" })}
      </p>
      <p className="font-display text-3xl leading-none">{tx(locale, copy.title)}</p>
      <p className="mt-1 text-sm text-mist">{tx(locale, copy.detail)}</p>
    </div>
  );
}
