"use client";

import { MotionConfigContext } from "motion/react";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * "user" follows a surrounding MotionConfig reducedMotion setting, then the
 * device. "always" and "never" force the calm or the full version.
 */
export type ReducedMotion = "user" | "always" | "never";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useShouldReduceMotion(mode: ReducedMotion = "user") {
  const device = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
  const config = useContext(MotionConfigContext)?.reducedMotion;
  if (mode !== "user") return mode === "always";
  if (config === "always" || config === "never") return config === "always";
  return device;
}

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  born: number;
}

const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const RIPPLE_SPEED = 400;
const RIPPLE_WIDTH = 55;
const LERP_SPEED = 0.08;

const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;

const REFERENCE_SIZE = 720;
const MIN_SCALE = 0.45;

/** Deadpool holographic field. Idle stays dim; the cursor pulls it into red. */
const THEME = {
  bg: "#090909",
  dot: "rgba(200,16,46,0.045)",
  lineBase: { r: 200, g: 16, b: 46, a: 0.12 },
  nodeBase: { r: 242, g: 242, b: 242, a: 0.16 },
  lineActive: { r: 200, g: 16, b: 46, a: 0.85 },
  nodeActive: { r: 255, g: 45, b: 69, a: 0.95 },
  glow: "255,45,69",
  ripple: "200,16,46",
  deep: "122,7,27",
};

interface Metrics {
  scale: number;
  cell: number;
  influence: number;
  warp: number;
  dotSpacing: number;
  rippleSpeed: number;
  rippleWidth: number;
  nodeScale: number;
  wave: number;
}

function getMetrics(w: number, h: number, mobile: boolean): Metrics {
  const scale = Math.min(1, Math.max(MIN_SCALE, Math.min(w, h) / REFERENCE_SIZE));
  const calm = mobile ? 0.62 : 1;
  return {
    scale,
    cell: CELL_SIZE * scale * (mobile ? 1.35 : 1),
    influence: INFLUENCE_RADIUS * scale * (mobile ? 0.78 : 1),
    warp: MAX_WARP * scale * calm,
    dotSpacing: Math.max(14, DOT_SPACING * scale * (mobile ? 1.7 : 1)),
    rippleSpeed: RIPPLE_SPEED * scale,
    rippleWidth: RIPPLE_WIDTH * scale,
    nodeScale: (0.6 + 0.4 * scale) * (mobile ? 0.85 : 1),
    wave: (mobile ? 1.5 : 3.1) * scale,
  };
}

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(
  base: { r: number; g: number; b: number; a: number },
  active: { r: number; g: number; b: number; a: number },
  t: number,
): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function preventMultiClickSelect(event: ReactMouseEvent) {
  if (event.detail < 2) return;
  const target = event.target as HTMLElement;
  if (target.closest("input, textarea, select, [contenteditable='true']")) return;
  event.preventDefault();
}

export function KineticGrid({
  children,
  className,
  reducedMotion = "user",
  viewport = false,
}: {
  children?: ReactNode;
  className?: string;
  reducedMotion?: ReducedMotion;
  /** Fill a fixed viewport layer instead of wrapping page content. */
  viewport?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const dprRef = useRef(1);
  const mobileRef = useRef(false);
  const timeRef = useRef(0);
  const reduce = useShouldReduceMotion(reducedMotion);
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;

  const getWarpedPoint = useCallback(
    (
      gx: number,
      gy: number,
      col: number,
      row: number,
      mouse: Point,
      ripples: Ripple[],
      cols: number,
      rows: number,
      m: Metrics,
    ): { pt: Point; proximity: number } => {
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / m.influence) * pinFactor;

      let rx = 0;
      let ry = 0;
      for (const ripple of ripples) {
        const rdx = gx - ripple.x;
        const rdy = gy - ripple.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const diff = rdist - ripple.radius;
        if (Math.abs(diff) < m.rippleWidth) {
          const strength = (1 - Math.abs(diff) / m.rippleWidth) * ripple.opacity * 18 * m.scale * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      const now = timeRef.current;
      const waveOn = reduceRef.current ? 0 : m.wave * pinFactor;
      const waveX = Math.sin(gx * 0.012 + now * 0.00055) * waveOn;
      const waveY = Math.cos(gy * 0.012 - now * 0.00042) * waveOn * 0.65;

      if (dist < m.influence && dist > 0 && pinFactor > 0) {
        const t = dist / m.influence;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / (60 * m.scale));
        const warpAmt = eased * m.warp * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmt + rx + waveX,
            y: gy - Math.sin(angle) * warpAmt + ry + waveY,
          },
          proximity,
        };
      }

      return { pt: { x: gx + rx + waveX, y: gy + ry + waveY }, proximity };
    },
    [],
  );

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      timeRef.current = now;
      const { w: W, h: H } = sizeRef.current;
      if (W < 2 || H < 2) return;
      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;
      const m = getMetrics(W, H, mobileRef.current);

      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = THEME.bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = THEME.dot;
      for (let x = m.dotSpacing / 2; x < W; x += m.dotSpacing) {
        for (let y = m.dotSpacing / 2; y < H; y += m.dotSpacing) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        const age = (now - ripple.born) / 1000;
        ripple.radius = Math.max(0, age * m.rippleSpeed);
        ripple.opacity = Math.max(0, 1 - age * 1.2);
        if (ripple.opacity <= 0) ripples.splice(i, 1);
      }

      const cols = Math.max(2, Math.ceil(W / m.cell)) + 1;
      const rows = Math.max(2, Math.ceil(H / m.cell)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);
      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const warped = getWarpedPoint(col * cellW, row * cellH, col, row, mouse, ripples, cols, rows, m);
          pts[row][col] = warped.pt;
          prox[row][col] = warped.proximity;
        }
      }

      const drawSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const avg = (pr1 + pr2) / 2;
        const t = avg * avg * (3 - 2 * avg);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lerpColor(THEME.lineBase, THEME.lineActive, t);
        ctx.lineWidth = lerpN(0.7, 1.45, t);
        ctx.stroke();
      };

      ctx.lineCap = "butt";
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);
        }
      }
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);
        }
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr);
          const radius = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t) * m.nodeScale;

          if (t > 0.3) {
            const glowR = radius + lerpN(0, 6, (t - 0.3) / 0.7) * m.nodeScale;
            const grd = ctx.createRadialGradient(p.x, p.y, radius * 0.5, p.x, p.y, glowR);
            grd.addColorStop(0, `rgba(${THEME.glow},${(t * 0.28).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${THEME.glow},0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(THEME.nodeBase, THEME.nodeActive, t);
          ctx.fill();
        }
      }

      if (mouse.x > -1000 && mouse.y > -1000) {
        const reach = m.influence * (mobileRef.current ? 0.7 : 0.9);
        const halo = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, reach);
        halo.addColorStop(0, `rgba(${THEME.glow},${mobileRef.current ? 0.045 : 0.075})`);
        halo.addColorStop(0.45, `rgba(${THEME.deep},0.035)`);
        halo.addColorStop(1, `rgba(${THEME.glow},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, reach, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const ripple of ripples) {
        const safeRadius = Math.max(0, ripple.radius);
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${THEME.ripple},${(ripple.opacity * 0.34).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    },
    [getWarpedPoint],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const setSize = () => {
      const rect = wrap.getBoundingClientRect();
      const tall = !viewport && rect.height > window.innerHeight + 8;
      const w = Math.max(1, Math.round(rect.width || window.innerWidth));
      const h = Math.max(1, Math.round(tall ? window.innerHeight : rect.height || window.innerHeight));
      const coarse = window.matchMedia("(pointer: coarse)").matches || w < 768;
      mobileRef.current = coarse;
      const dpr = Math.min(coarse ? 1.5 : 2, window.devicePixelRatio || 1);
      if (slotRef.current && !viewport) slotRef.current.style.position = tall ? "sticky" : "absolute";
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      sizeRef.current = { w, h };
      dprRef.current = dpr;
    };

    const toLocal = (clientX: number, clientY: number): Point => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const inside = (point: Point) => {
      const { w, h } = sizeRef.current;
      return point.x >= 0 && point.y >= 0 && point.x <= w && point.y <= h;
    };

    const pushRipple = (point: Point) => {
      if (reduceRef.current || !inside(point)) return;
      ripplesRef.current.push({
        x: point.x,
        y: point.y,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
      if (ripplesRef.current.length > 6) ripplesRef.current.shift();
    };

    function animate(now: number) {
      if (document.hidden) {
        rafRef.current = 0;
        return;
      }
      const current = mouseRef.current;
      const target = targetMouseRef.current;
      const speed = reduceRef.current ? 1 : LERP_SPEED;
      current.x = lerpN(current.x, target.x, speed);
      current.y = lerpN(current.y, target.y, speed);
      draw(now);
      rafRef.current = requestAnimationFrame(animate);
    }

    const onMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = toLocal(event.clientX, event.clientY);
    };
    const onClick = (event: MouseEvent) => {
      pushRipple(toLocal(event.clientX, event.clientY));
    };
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (!touch) return;
      const point = toLocal(touch.clientX, touch.clientY);
      targetMouseRef.current = point;
      if (event.type === "touchstart") pushRipple(point);
    };
    const onVisibility = () => {
      if (!document.hidden && rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    setSize();
    window.addEventListener("resize", setSize);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(setSize) : null;
    observer?.observe(wrap);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setSize);
      observer?.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [draw, viewport]);

  return (
    <div
      ref={wrapRef}
      onMouseDown={viewport ? undefined : preventMultiClickSelect}
      className={cn(
        viewport ? "absolute inset-0 h-full w-full overflow-hidden" : "relative w-full min-h-screen overflow-clip bg-ink",
        className,
      )}
    >
      <div
        ref={slotRef}
        className={cn(
          "pointer-events-none",
          viewport ? "absolute inset-0 h-full w-full" : "sticky inset-x-0 top-0 z-0 h-0",
        )}
      >
        <canvas ref={canvasRef} aria-hidden="true" className="block" />
      </div>
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

/** One site-wide field. Fixed to the viewport, mounted once, ignored by pointer hit testing. */
export function KineticGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <KineticGrid viewport />
    </div>
  );
}

export default KineticGrid;
