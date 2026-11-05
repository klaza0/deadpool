"use client";

import { SiteProvider } from "@/components/providers/site-provider";
import { CursorRing } from "@/components/layout/cursor-ring";
import { SiteNav } from "@/components/layout/site-nav";
import { IntroGate } from "@/components/sections/intro-gate";
import { HeroExperience } from "@/components/sections/hero-experience";
import { StorySection } from "@/components/sections/story-section";
import { PowersSection } from "@/components/sections/powers-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { FinaleSection } from "@/components/sections/finale-section";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";

export function HomePage() {
  return (
    <SiteProvider>
      <SiteFrame />
    </SiteProvider>
  );
}

function SiteFrame() {
  const { introOpen, scrollTo, locale } = useSite();

  return (
    <>
      <a
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          scrollTo("#home");
          document.getElementById("hero-title")?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
      >
        {tx(locale, { en: "Skip to content", ar: "تخطى للمحتوى" })}
      </a>
      <div className="grain" aria-hidden="true" />
      <CursorRing />
      <SiteNav />
      <IntroGate />
      <main id="main" inert={introOpen ? true : undefined} className={introOpen ? "invisible" : undefined}>
        <HeroExperience />
        <StorySection />
        <PowersSection />
        <GallerySection />
        <TimelineSection />
        <ExperienceSection />
        <FinaleSection />
      </main>
    </>
  );
}
