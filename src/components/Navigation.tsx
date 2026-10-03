"use client";
import { useEffect, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget, setScrollLocked } from "@/lib/scroll";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false), [active, setActive] = useState(""), [open, setOpen] = useState(false), [prog, setProg] = useState(0);
  useEffect(() => {
    const on = () => { setScrolled(scrollY > 40); setProg(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)); };
    on(); addEventListener("scroll", on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", on); io.disconnect(); };
  }, []);
  useEffect(() => {
    setScrollLocked(open);
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const mq = matchMedia("(min-width: 768px)");
    const wide = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); }; // menu is mobile-only
    addEventListener("keydown", k); mq.addEventListener("change", wide);
    return () => { removeEventListener("keydown", k); mq.removeEventListener("change", wide); setScrollLocked(false); };
  }, [open]);
  const go = (id: string) => { setOpen(false); setScrollLocked(false); setTimeout(() => scrollToTarget(id), 50); };
  return (<>
    <div aria-hidden style={{ position: "fixed", top: 0, left: 0, height: 2, background: "var(--ink)", width: `${prog * 100}%`, zIndex: 60 }} />
    <header style={{ position: "fixed", inset: "14px 0 auto", zIndex: 50 }}>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget("top"); }} aria-label={`${PROFILE.name}, back to top`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="mark" data-solid={scrolled}>{PROFILE.initials}</span>
          <span style={{ fontWeight: 600, opacity: scrolled ? 0 : 1, transition: "opacity .4s" }}>{PROFILE.name}</span>
        </a>
        <nav aria-label="Primary" className="navpill hidden md:flex" data-glass={scrolled}>
          {NAV.map((n) => (<a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }} aria-current={active === n.id ? "location" : undefined} className="navlink" data-on={active === n.id}>{n.label}</a>))}
        </nav>
        <button className="pill pill-ink md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      </div>
    </header>
    <div id="mobile-menu" className="overlay" data-open={open} aria-hidden={!open}>
      {NAV.map((n, i) => (<a key={n.id} href={`#${n.id}`} tabIndex={open ? 0 : -1} style={{ "--i": i } as React.CSSProperties} onClick={(e) => { e.preventDefault(); go(n.id); }}><span className="mono">0{i + 1}</span> {n.label}</a>))}
    </div>
    <style>{`
      .mark{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:14px;box-shadow:inset 0 0 0 1.5px var(--ink);transition:background .4s,color .4s,transform .8s var(--ease)}
      .mark[data-solid=true]{background:var(--ink);color:#fff} a:hover .mark{transform:rotate(360deg)}
      .navpill{gap:4px;padding:5px;border-radius:999px;transition:background .4s,box-shadow .4s}
      .navpill[data-glass=true]{background:rgba(255,255,255,.7);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 10px 30px rgba(0,0,0,.06)}
      .navlink{padding:9px 18px;border-radius:999px;font-size:14px;font-weight:500;transition:background .5s var(--ease),color .5s var(--ease)}
      .navlink[data-on=true]{background:var(--ink);color:#fff}
      .overlay{position:fixed;inset:0;z-index:45;background:var(--paper);display:flex;flex-direction:column;justify-content:center;gap:10px;padding:0 var(--gutter);clip-path:circle(0 at 100% 0);transition:clip-path .9s var(--ease);visibility:hidden}
      .overlay[data-open=true]{clip-path:circle(150% at 100% 0);visibility:visible}
      .overlay a{font-size:clamp(40px,12vw,72px);font-weight:700;letter-spacing:-.04em;opacity:0;transform:translateY(20px);transition:.8s var(--ease);transition-delay:calc(var(--i)*60ms + 200ms)}
      .overlay[data-open=true] a{opacity:1;transform:none}
    `}</style>
  </>);
}
