"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { prefersReducedMotion, useInView, useScrollProgress } from "@/lib/hooks";

type Item = (typeof ACHIEVEMENTS)[number];
const nf = new Intl.NumberFormat("en-US");
const pad = (n: number) => String(n).padStart(2, "0");

function Count({ to, suffix, go }: { to: number; suffix: string; go: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    if (prefersReducedMotion()) { setV(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      setV(to * (1 - Math.pow(1 - k, 4)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [go, to]);
  const shown = Number.isInteger(to) ? nf.format(Math.round(v)) : v.toFixed(1);
  return (
    <>
      <span aria-hidden>{shown}{suffix}</span>
      <span className="sr-only">{nf.format(to)}{suffix}</span>
    </>
  );
}

function Card({ a, i, total, lit }: { a: Item; i: number; total: number; lit: boolean }) {
  const [ref, seen] = useInView<HTMLElement>(0.4);
  return (
    <article ref={ref} className="card ach" data-lit={lit}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="logo mono">{pad(i + 1)}</span>
        <span className="mono">/ {pad(total)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
        <div><b>{a.label}</b><p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--mute)" }}>{a.detail}</p></div>
        <span className="num"><Count to={a.value} suffix={a.suffix} go={seen} /></span>
      </div>
    </article>
  );
}

export default function Achievements() {
  const [ref, p] = useScrollProgress<HTMLElement>("pin");
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [near, setNear] = useState(0);

  // How far the track must slide left so the last item ends inside the viewport.
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const measure = () => {
      const last = t.lastElementChild as HTMLElement | null;
      if (!last) return;
      const gutter = parseFloat(getComputedStyle(t).paddingLeft) || 0;
      setTravel(Math.max(0, Math.round(last.offsetLeft + last.offsetWidth + gutter - t.clientWidth)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    Array.from(t.children).forEach((c) => ro.observe(c));
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  // Highlight the card that is actually closest to the centre of the screen.
  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const mid = window.innerWidth / 2 + p * travel;
    let best = 0, bestD = Infinity;
    t.querySelectorAll<HTMLElement>(".ach").forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    setNear(best);
  }, [p, travel]);

  const vars = { "--travel": `${travel}px`, "--tx": `${-p * travel}px` } as React.CSSProperties;
  return (
    <section ref={ref} id="achievements" aria-labelledby="ach-h" className="ach-sec" style={vars}>
      <div className="ach-stick">
        <div className="wrap" style={{ width: "100%" }}>
          <span className="tag">06 — Achievements</span>
          <h2 id="ach-h" className="h2" style={{ marginBottom: 16 }}>Numbers, <em>in context.</em></h2>
          <div className="ach-prog" aria-hidden><div style={{ width: `${p * 100}%` }} /></div>
        </div>
        <div ref={track} className="track">
          {ACHIEVEMENTS.map((a, i) => <Card key={a.label} a={a} i={i} total={ACHIEVEMENTS.length} lit={i === near} />)}
          <div className="serif tail">and counting →</div>
        </div>
      </div>
      <style>{`
        .ach-sec{position:relative;padding-block:clamp(72px,12vh,140px)}
        .ach-stick{display:flex;flex-direction:column;gap:36px}
        .ach-prog{display:none;height:2px;background:var(--line)}.ach-prog>div{height:100%;background:var(--ink)}
        .track{position:relative;display:flex;gap:20px;padding:0 var(--gutter) 24px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
        .track::-webkit-scrollbar{display:none}
        .ach{flex:none;scroll-snap-align:center;width:clamp(min(300px,84vw),40vw,540px);height:clamp(260px,36vh,310px);padding:24px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .7s var(--ease),box-shadow .7s var(--ease)}
        .logo{width:72px;height:72px;border-radius:20px;background:var(--soft);display:grid;place-items:center;font-size:18px}
        .num{font-size:clamp(48px,7vw,88px);font-weight:700;letter-spacing:-.05em;line-height:.9;white-space:nowrap}
        .tail{flex:none;align-self:center;white-space:nowrap;font-size:clamp(32px,5vw,64px)}
        /* Desktop: pin the section and slide the cards sideways as you scroll. */
        @media (min-width:768px) and (prefers-reduced-motion:no-preference){
          .ach-sec{padding-block:0;height:calc(100svh + var(--travel))}
          .ach-stick{position:sticky;top:0;height:100svh;overflow:hidden;justify-content:center;padding-top:72px}
          .ach-prog{display:block}
          .track{overflow:visible;scroll-snap-type:none;padding-bottom:0;transform:translate3d(var(--tx),0,0);will-change:transform}
          .ach[data-lit=true]{transform:translateY(-12px);box-shadow:inset 0 0 0 1px var(--line),0 30px 60px -20px rgba(0,0,0,.22)}
        }
      `}</style>
    </section>
  );
}
