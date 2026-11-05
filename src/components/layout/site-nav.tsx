"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import { nav } from "@/data/content";
import { tx } from "@/i18n/text";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useSite } from "@/components/providers/site-provider";
import { LogoMark } from "@/components/art/logo-mark";

/**
 * Patterns adapted from 21st.dev Elevate Navbar by hyperiux (demo 26786):
 * glass surface after scroll, GSAP text-swap on fine pointers, mobile panel,
 * focus trap, and reduced-motion / coarse-pointer fallbacks.
 * Dropdown marketing menus were removed. This site uses single-level anchors.
 */
export function SiteNav() {
  const { scrollTo, registerLogoClick, logoTaps, setMenuOpen, menuOpen, locale, soundOn, toggleSound } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>("a, button"),
      ).filter((item) => !item.hasAttribute("disabled"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      menuBtn.current?.focus();
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen
          ? "border-white/10 bg-ink/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={() => {
            const taps = registerLogoClick();
            if (taps === 1) scrollTo("#home");
          }}
          className="relative flex items-center gap-3"
          aria-label={tx(locale, {
            en: "Deadpool, back to the start. The mark remembers extra clicks.",
            ar: "ديدبول، ارجع للبداية. العلامة بتعدّ الضغطات الزيادة.",
          })}
        >
          <LogoMark className="h-10 w-10" />
          <span className="font-display text-2xl leading-none tracking-[0.14em]">DEADPOOL</span>
          {logoTaps > 0 ? (
            <span className="font-display text-lg text-pool" aria-live="polite">
              {logoTaps}/4
            </span>
          ) : null}
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <SwapLink
              key={item.id}
              href={item.href}
              label={tx(locale, item.label)}
              current={active === item.id}
              onNavigate={(event) => {
                event.preventDefault();
                scrollTo(item.href);
              }}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={tx(locale, {
              en: soundOn ? "Mute soundtrack" : "Play soundtrack",
              ar: soundOn ? "اكتم الصوت" : "شغّل الصوت",
            })}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/20"
          >
            {soundOn ? <Volume2 aria-hidden="true" className="h-4 w-4" /> : <VolumeX aria-hidden="true" className="h-4 w-4" />}
          </button>
          <button
            ref={menuBtn}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/20 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">
              {menuOpen
                ? tx(locale, { en: "Close menu", ar: "اقفل القائمة" })
                : tx(locale, { en: "Open menu", ar: "افتح القائمة" })}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-white/10 bg-ink px-4 py-4 lg:hidden"
        >
          <button
            ref={closeRef}
            type="button"
            className="mb-3 inline-flex min-h-11 items-center gap-2 border border-white/20 px-3"
            onClick={() => setMenuOpen(false)}
          >
            <X aria-hidden="true" className="h-4 w-4" />
            {tx(locale, { en: "Close", ar: "اقفل" })}
          </button>
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "flex min-h-12 items-center border-b border-white/10 font-display text-4xl tracking-wide",
                    active === item.id ? "text-pool" : "text-paper",
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(item.href);
                  }}
                >
                  {tx(locale, item.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

function SwapLink({
  href,
  label,
  current,
  onNavigate,
}: {
  href: string;
  label: string;
  current: boolean;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    registerGsap();
    const link = linkRef.current;
    if (!link) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    const base = link.querySelector<HTMLElement>("[data-default]");
    const hover = link.querySelector<HTMLElement>("[data-hover]");
    if (!base || !hover) return;
    gsap.set(hover, { yPercent: 100 });

    const enter = () => {
      gsap.to(base, { yPercent: -100, duration: 0.35, ease: "power3.out" });
      gsap.to(hover, { yPercent: 0, duration: 0.35, ease: "power3.out" });
    };
    const leave = () => {
      gsap.to(base, { yPercent: 0, duration: 0.35, ease: "power3.out" });
      gsap.to(hover, { yPercent: 100, duration: 0.35, ease: "power3.out" });
    };
    link.addEventListener("pointerenter", enter);
    link.addEventListener("pointerleave", leave);
    return () => {
      link.removeEventListener("pointerenter", enter);
      link.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([base, hover]);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      onClick={onNavigate}
      aria-current={current ? "true" : undefined}
      className="relative inline-flex h-6 overflow-hidden text-xs font-semibold uppercase tracking-[0.22em]"
    >
      <span data-default className="block">
        {label}
      </span>
      <span data-hover aria-hidden="true" className="absolute inset-x-0 top-0 block text-pool">
        {label}
      </span>
      {current ? (
        <motion.span
          layoutId="nav-active"
          className="absolute -bottom-1 left-0 h-px w-full bg-pool"
        />
      ) : null}
    </a>
  );
}
