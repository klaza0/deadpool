"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { achievements, quotes, regrets, secretHints, type AchievementId } from "@/data/content";
import { tx } from "@/i18n/text";
import { useSite } from "@/components/providers/site-provider";

const order: AchievementId[] = ["chimichanga", "eyes", "logo", "wall", "maximum"];

export function ExperienceSection() {
  const { unlock, achievementsUnlocked, soundOn, playCue, locale } = useSite();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [leftEye, setLeftEye] = useState(false);
  const [rightEye, setRightEye] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [seam, setSeam] = useState(false);
  const [regretCount, setRegretCount] = useState(0);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (leftEye && rightEye) unlock("eyes");
  }, [leftEye, rightEye, unlock]);

  const quote = quotes[quoteIndex] ?? quotes[0];
  const regret = regrets[regretCount % regrets.length] ?? regrets[0];

  function nextQuote() {
    setQuoteIndex((current) => {
      if (quotes.length < 2) return current;
      let next = current;
      while (next === current) {
        next = Math.floor(Math.random() * quotes.length);
      }
      return next;
    });
  }

  function onMaskMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setLook({
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    });
  }

  function regretPress() {
    setRegretCount((count) => count + 1);
    setFlash(true);
    if (soundOn) playCue();
    window.setTimeout(() => setFlash(false), 180);
  }

  return (
    <section id="experience" className="scroll-mt-20 relative border-t border-white/10 px-5 py-20 lg:px-12 lg:py-28">
      {flash ? <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[75] bg-pool/50" /> : null}
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pool">Section 07</p>
      <h2 className="mt-3 max-w-4xl font-display text-6xl leading-[0.86] sm:text-8xl">
        PRESS BUTTONS.
        <span className="block">REGRET NOTHING.</span>
      </h2>
      <p className="mt-5 max-w-xl text-mist">
        The classified files are the job. Each locked one says the exact move. Open any three and the last file opens itself.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <div className="border border-white/15 bg-surface p-6 lg:col-span-5 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pool">Original dialogue</p>
          <motion.blockquote
            key={quote?.en}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 min-h-32 font-display text-4xl leading-[0.95]"
          >
            <span aria-live="polite">{quote ? tx(locale, quote) : ""}</span>
          </motion.blockquote>
          <button
            type="button"
            onClick={nextQuote}
            className="mt-8 inline-flex min-h-12 items-center bg-pool px-5 font-display text-2xl tracking-[0.12em] text-white"
          >
            Say something worse
          </button>
        </div>

        <div className="border border-white/15 bg-ink p-6 lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pool">Interactive mask</p>
          <div
            className="relative mx-auto mt-4 aspect-[4/5] w-full max-w-md"
            onPointerMove={onMaskMove}
            onPointerLeave={() => setLook({ x: 0, y: 0 })}
          >
            <MaskFace look={look} left={leftEye} right={rightEye} />
            <button
              type="button"
              aria-label="Poke the left eye"
              aria-pressed={leftEye}
              onClick={() => setLeftEye(true)}
              className="absolute rounded-full"
              style={{ left: "24%", top: "34%", width: "22%", height: "16%" }}
            />
            <button
              type="button"
              aria-label="Poke the right eye"
              aria-pressed={rightEye}
              onClick={() => setRightEye(true)}
              className="absolute rounded-full"
              style={{ right: "24%", top: "34%", width: "22%", height: "16%" }}
            />
            <button
              type="button"
              onClick={() => setSeam(true)}
              className="absolute"
              style={{ left: "46%", top: "52%", width: "8%", height: "28%" }}
              aria-label="Press the seam on the mask"
            />
          </div>
          <p className="mt-4 min-h-12 text-mist" aria-live="polite">
            {leftEye && rightEye
              ? "Okay. Rude. Both eyes. I respect the commitment."
              : leftEye || rightEye
                ? "One eye. Cute. Finish the set."
                : seam
                  ? "That seam is decorative. The attitude is structural."
                  : "The eyes follow a mouse. On a phone, poke them."}
          </p>
        </div>

        <div className="relative overflow-hidden border border-pool/50 bg-[#140307] p-6 lg:col-span-7">
          <img
            src="/images/regret-bg.jpg"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "46% 22%" }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/55" />
          <div className="relative z-10">
            <h3 className="font-display text-4xl">Do not press</h3>
            <p className="mt-2 text-mist">This button works. That is the problem.</p>
            <button
              type="button"
              onClick={regretPress}
              className="mt-6 inline-flex min-h-12 items-center border border-pool bg-ink/70 px-5 font-display text-2xl tracking-[0.12em] text-pool"
            >
              Press it anyway
            </button>
            <p className="mt-4 min-h-12 text-paper" aria-live="polite">
              {regretCount > 0 && regret ? `${tx(locale, regret)} Count: ${regretCount}.` : "Still innocent. Suspicious."}
            </p>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-5">
          {order.map((id, index) => {
            const unlocked = achievementsUnlocked.includes(id);
            const copy = achievements[id];
            return (
              <li key={id} className="border border-white/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-pool">
                  {String(index + 1).padStart(2, "0")}
                  {unlocked ? " · Open" : " · Locked"}
                </p>
                <p className="font-display text-2xl tracking-wide">
                  {unlocked ? tx(locale, copy.title) : "Classified"}
                </p>
                <p className="text-sm text-mist">
                  {unlocked ? tx(locale, copy.detail) : tx(locale, secretHints[id])}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function MaskFace({
  look,
  left,
  right,
}: {
  look: { x: number; y: number };
  left: boolean;
  right: boolean;
}) {
  const px = Math.max(-1, Math.min(1, look.x * 2));
  const py = Math.max(-1, Math.min(1, look.y * 2));
  return (
    <svg viewBox="0 0 320 420" className="h-full w-full" aria-hidden="true">
      <ellipse cx="160" cy="378" rx="70" ry="12" fill="#7A071B" opacity="0.4" />
      <path
        d="M160 46c58 0 104 42 112 108 10 72-4 148-36 188-20 26-52 46-76 48-24-2-56-22-76-48-32-40-46-116-36-188C56 88 102 46 160 46z"
        fill="#C8102E"
      />
      <path d="M160 64v292" fill="none" stroke="#7A071B" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M70 156c8-40 52-58 90-36 14 8 20 26 14 48-8 30-40 50-76 42-30-6-38-26-28-54z"
        fill="#090909"
      />
      <path
        d="M250 156c-8-40-52-58-90-36-14 8-20 26-14 48 8 30 40 50 76 42 30-6 38-26 28-54z"
        fill="#090909"
      />
      <g style={{ transform: left ? "translate(112px, 164px) scale(1, 0.28) translate(-112px, -164px)" : undefined }}>
        <path d="M78 158c10-22 40-30 62-16 10 6 14 18 8 32-8 18-28 28-50 22-16-4-24-16-20-38z" fill="#F2F2F2" />
        <circle cx={108 + px * 8} cy={164 + py * 5} r="3" fill="#ffffff" />
      </g>
      <g style={{ transform: right ? "translate(208px, 164px) scale(1, 0.28) translate(-208px, -164px)" : undefined }}>
        <path d="M242 158c-10-22-40-30-62-16-10 6-14 18-8 32 8 18 28 28 50 22 16-4 24-16 20-38z" fill="#F2F2F2" />
        <circle cx={212 + px * 8} cy={164 + py * 5} r="3" fill="#ffffff" />
      </g>
    </svg>
  );
}
