"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

// Letters hop on hover, but each WORD stays unbreakable so lines never split mid-word.
const Hop = ({ text }: { text: string }) => (
  <>{text.split(" ").map((w, wi) => (
    <Fragment key={wi}>{wi > 0 ? " " : null}
      <span aria-hidden style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {w.split("").map((c, i) => <span key={i} className="hop">{c}</span>)}
      </span>
    </Fragment>))}</>
);

export default function Contact() {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const flash = () => { setDone(true); clearTimeout(timer.current); timer.current = setTimeout(() => setDone(false), 1800); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); flash(); return; } catch { /* fall through */ }
    try { // clipboard API needs https/localhost; this fallback also works over a LAN IP
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy"); document.body.removeChild(ta);
      if (ok) flash();
    } catch { /* nothing else to try */ }
  };
  return (
    <section id="contact" className="sec" aria-labelledby="ct-h"><div className="wrap">
      <span className="tag rv">07 — Contact</span>
      <h2 id="ct-h" className="h2" aria-label="Let's build something together." style={{ fontSize: "clamp(44px,9vw,140px)" }}><Hop text="Let's build" /><br /><em><Hop text="something together." /></em></h2>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <a href={`mailto:${PROFILE.email}`} style={{ fontSize: "clamp(20px,3.4vw,44px)", textDecoration: "underline", textUnderlineOffset: 8, overflowWrap: "anywhere" }}>{PROFILE.email}</a>
        <button type="button" className="pill pill-line" onClick={copy} aria-live="polite">{done ? "Copied ✓" : "Copy"}</button>
      </div>
      <p style={{ display: "flex", gap: 24, flexWrap: "wrap", margin: "32px 0 0", fontSize: 18 }}>
        <a href={PROFILE.phoneHref} style={{ textDecoration: "underline" }}>{PROFILE.phone}</a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>LinkedIn</a>
      </p>
      <svg className="badge" viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="Say hello">
        <defs><path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text fontSize="11" letterSpacing="3" fill="currentColor" style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}><textPath href="#badge-circle">SAY HELLO · SAY HELLO · SAY HELLO ·</textPath></text>
      </svg>
      <footer style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 96, paddingTop: 24, borderTop: "1px solid var(--line)", fontSize: 14, color: "var(--mute)" }}>
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget("top"); }}>Back to top ↑</a>
        <span>Built with Next.js</span>
      </footer>
    </div>
    <style>{`.hop{display:inline-block;transition:transform .5s var(--ease)}.hop:hover{transform:translateY(-.18em)}
      .badge{margin-top:40px;animation:spin 18s linear infinite;color:var(--ink-2)}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  );
}
