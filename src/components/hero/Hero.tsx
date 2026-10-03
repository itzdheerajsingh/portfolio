"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/hooks";

export default function Hero() {
  const sec = useRef<HTMLElement>(null), vid = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false), [blocked, setBlocked] = useState(false);
  const chose = useRef(false);        // visitor used the sound button themselves
  const reduced = useRef(false);      // prefers-reduced-motion: never autoplay
  useEffect(() => {
    const v = vid.current, s = sec.current;
    if (!v || !s) return;
    let disposed = false;
    const cleanups: Array<() => void> = [];
    reduced.current = prefersReducedMotion();
    if (!reduced.current) {
      v.muted = false;
      v.play().then(() => { if (!disposed) setOn(true); }).catch(() => {
        if (disposed) return;
        // Autoplay with sound is blocked: play muted, then unmute on the first gesture.
        v.muted = true; setOn(false); setBlocked(true); v.play().catch(() => {});
        const evs = ["pointerdown", "keydown", "touchend"] as const;
        const unlock = (e: Event) => {
          if ((e.target as Element | null)?.closest?.(".snd")) return; // the button handles itself
          evs.forEach((n) => removeEventListener(n, unlock));
          if (chose.current) return;
          v.muted = false;
          v.play().then(() => { setOn(true); setBlocked(false); }).catch(() => {});
        };
        evs.forEach((n) => addEventListener(n, unlock, { passive: true }));
        cleanups.push(() => evs.forEach((n) => removeEventListener(n, unlock)));
      });
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio < 0.35) v.pause(); else if (!reduced.current) v.play().catch(() => {});
    }, { threshold: [0, 0.35, 0.6] });
    io.observe(s);
    return () => { disposed = true; io.disconnect(); cleanups.forEach((fn) => fn()); };
  }, []);
  const toggle = () => {
    const v = vid.current; if (!v) return;
    chose.current = true; setBlocked(false);
    const next = !on;
    v.muted = !next; setOn(next);
    if (next) v.play().catch(() => {});
    else if (reduced.current) v.pause();
  };
  return (
    <section ref={sec} id="top" aria-label="Introduction" className="hero" style={{ position: "relative", minHeight: "100svh", display: "grid", placeItems: "center", overflow: "hidden", paddingTop: 70 }}>
      <span aria-hidden className="ghost" style={{ "--n": PROFILE.firstName.length } as React.CSSProperties}>{PROFILE.firstName.toUpperCase()}</span>
      <video ref={vid} muted loop playsInline preload="auto" aria-label={`${PROFILE.name} introducing themselves`} style={{ position: "relative", height: "min(96svh,1040px)", aspectRatio: "768/960", maxWidth: "100%", mixBlendMode: "multiply", objectFit: "cover" }}>
        <source src="/hero/hero.webm" type="video/webm" /><source src="/hero/hero.mp4" type="video/mp4" />
      </video>
      <div className="wrap herocopy">
        <h1 className="rv-mask is-in" style={{ fontSize: "clamp(36px,6vw,84px)", fontWeight: 700, letterSpacing: "-.045em", lineHeight: 1, margin: 0 }}>
          <span>{PROFILE.role}<em className="serif">.</em></span></h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
          <button className="pill pill-ink" onClick={() => scrollToTarget("work")}>Explore work</button>
          <button className="pill pill-line" onClick={() => scrollToTarget("contact")}>Let&apos;s talk</button>
          <a className="pill pill-line" href={PROFILE.resume} download>Résumé ↓</a>
        </div>
      </div>
      <button className="snd" onClick={toggle} aria-label={on ? "Turn sound off" : "Turn sound on"} aria-pressed={on} data-ping={blocked}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <path d="M3 8h3.5L11 4.5v11L6.5 12H3z" fill="#fff" stroke="none" />
          {on ? <><path d="M13.5 7.5a3.5 3.5 0 010 5" /><path d="M15.5 5.5a6.5 6.5 0 010 9" /></> : <path d="M14 8l4 4M18 8l-4 4" />}
        </svg>
      </button>
      <style>{`
        .hero{container-type:inline-size}
        .ghost{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:21vw;font-size:min(420px,calc(94cqw / (var(--n,7) * .6)));font-weight:800;letter-spacing:-.05em;color:transparent;-webkit-text-stroke:1.5px var(--line);white-space:nowrap;user-select:none}
        .herocopy{position:absolute;left:0;right:0;bottom:clamp(24px,6vh,64px);z-index:2;pointer-events:none}.herocopy>*{pointer-events:auto}
        .snd{position:absolute;right:var(--gutter);bottom:clamp(24px,6vh,64px);width:46px;height:46px;border-radius:50%;background:var(--ink);display:grid;place-items:center;z-index:3;transition:transform .5s var(--ease)}
        .snd:hover{transform:scale(1.08)} .snd[data-ping=true]::after{content:"";position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 2px var(--ink);animation:ping 1.8s infinite}
        @keyframes ping{to{transform:scale(1.9);opacity:0}}
      `}</style>
    </section>
  );
}
