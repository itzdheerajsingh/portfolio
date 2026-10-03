"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE, EDUCATION, EXPERIENCE } from "@/lib/data";

function IdCard() {
  const host = useRef<HTMLDivElement>(null), swing = useRef<HTMLDivElement>(null);
  const ptr = useRef("mouse"), [flip, setFlip] = useState(false);
  useEffect(() => {
    const el = swing.current, box = host.current;
    if (!el || !box) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ang = 0, vel = 0, last = 0, px = innerWidth / 2, raf = 0, visible = false;
    const t0 = performance.now();
    const move = (e: PointerEvent) => { if (visible) vel += (e.clientX - px) * 0.02; px = e.clientX; };
    const loop = (t: number) => {
      const dt = Math.min(0.03, (t - last) / 1000 || 0.016); last = t;
      vel += (-ang * 40 - vel * 2.2) * dt; ang += vel * dt * 6;
      const idle = reduce ? 0 : Math.sin((t - t0) / 1400) * 1.4;
      el.style.transform = `rotate(${Math.max(-18, Math.min(18, ang)) + idle}deg)`;
      raf = requestAnimationFrame(loop);
    };
    // Only animate while the card is on screen (saves CPU, avoids a whip when it scrolls back in).
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting; cancelAnimationFrame(raf);
      if (visible) { last = 0; raf = requestAnimationFrame(loop); }
    });
    io.observe(box);
    addEventListener("pointermove", move, { passive: true });
    return () => { io.disconnect(); cancelAnimationFrame(raf); removeEventListener("pointermove", move); };
  }, []);
  const st = EDUCATION[0];
  return (
    <div ref={host} style={{ display: "flex", justifyContent: "center", alignSelf: "start" }}>
      <div ref={swing} style={{ transformOrigin: "50% 0", display: "flex", flexDirection: "column", alignItems: "center", marginTop: -40 }}>
        <div className="strap" aria-hidden><span>{PROFILE.name} · {PROFILE.role} · {PROFILE.name} · {PROFILE.role}</span></div>
        <div className="clip" aria-hidden />
        <div className="flipwrap" role="button" tabIndex={0} aria-pressed={flip} aria-label="ID card. Press to flip."
          onPointerDown={(e) => { ptr.current = e.pointerType; }}
          onClick={() => { if (ptr.current !== "mouse") setFlip((f) => !f); }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlip((f) => !f); } }}
          onPointerEnter={(e) => { if (e.pointerType === "mouse") setFlip(true); }}
          onPointerLeave={(e) => { if (e.pointerType === "mouse") setFlip(false); }}>
          <div className="flipper" data-flip={flip}>
            <div className="face card front">
              <div className="band mono">DEVELOPER ID</div>
              <div className="ph"><img src="/id-photo.webp" decoding="async" alt={`Portrait of ${PROFILE.name}`} width={128} height={156} /></div>
              <b style={{ fontSize: 20 }}>{PROFILE.name}</b><span style={{ color: "var(--mute)" }}>{PROFILE.role}</span>
              <dl className="rows"><dt>Dept.</dt><dd>Computer Science Engg.</dd><dt>Valid till</dt><dd>{PROFILE.gradYear}</dd></dl>
              <div className="bar" aria-hidden />
            </div>
            <div className="face card back">
              <b className="mono">What I am</b>
              <ul>
                <li>{PROFILE.role}</li><li>{st.degree}, {st.score}</li>
                <li>Projects: TaskManager Pro, Portfolio Builder</li><li>{EXPERIENCE[0].title}, {EXPERIENCE[0].org}</li>
                <li>Java + OOPs (Simplilearn), Java Basics (HackerRank)</li>
              </ul>
              <span className="serif" style={{ fontSize: 28, marginTop: "auto" }}>{PROFILE.name}</span>
              <span className="mono">If found, say hello · {PROFILE.email}</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .strap{width:30px;height:56px;background:var(--ink);overflow:hidden;color:#fff;font-size:8px;letter-spacing:.1em;text-transform:uppercase;writing-mode:vertical-rl;white-space:nowrap}
        .strap span{display:block;animation:strap 8s linear infinite;padding-block:6px}@keyframes strap{to{transform:translateY(-50%)}}
        .clip{width:18px;height:22px;background:linear-gradient(90deg,#bbb,#eee,#aaa);border-radius:3px 3px 8px 8px;margin-bottom:-4px;z-index:2}
        .flipwrap{perspective:1200px;width:min(300px,78vw);height:404px;text-align:left;cursor:pointer;border-radius:26px}
        .flipper{position:relative;width:100%;height:100%;transition:transform .9s var(--ease);transform-style:preserve-3d}.flipper[data-flip=true]{transform:rotateY(180deg)}
        .face{position:absolute;inset:0;backface-visibility:hidden;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:6px;padding-bottom:18px;box-shadow:0 30px 60px -20px rgba(0,0,0,.25),inset 0 0 0 1px var(--line)}
        .back{transform:rotateY(180deg);align-items:flex-start;padding:24px;font-size:14px}.back ul{padding-left:18px;margin:12px 0;display:grid;gap:6px;color:var(--ink-2)}
        .band{background:var(--ink);color:#fff;width:100%;text-align:center;padding:10px;margin-bottom:14px}
        .ph{padding:4px;border-radius:50%;background:linear-gradient(#ddd,#999);box-shadow:0 0 0 8px rgba(0,0,0,.04)}.ph img{width:128px;height:156px;border-radius:50% / 45%;object-fit:cover;display:block;transition:transform .6s var(--ease)}
        .rows{display:grid;grid-template-columns:auto 1fr;gap:4px 14px;margin:10px 0 0;font-size:13px}.rows dt{color:var(--mute)}.rows dd{margin:0;font-weight:600}
        .bar{margin-top:auto;width:70%;height:30px;background:repeating-linear-gradient(90deg,var(--ink) 0 2px,transparent 2px 4px,var(--ink) 4px 5px,transparent 5px 8px)}
      `}</style>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="sec" aria-labelledby="about-h">
      <div className="wrap about-grid">
        <div>
          <span className="tag rv">01 — About</span>
          <h2 id="about-h" className="h2 rv-mask"><span>Hi, I&apos;m {PROFILE.firstName}<em>.</em></span></h2>
          <p className="rv" style={{ fontSize: "clamp(18px,2vw,24px)", lineHeight: 1.45, maxWidth: 520 }}>{PROFILE.headline}</p>
          <div className="rv" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <a className="pill pill-ink" href={PROFILE.resume} download>Résumé</a>
            <a className="pill pill-line" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="pill pill-line" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
        <IdCard />
        <aside className="card rv" style={{ padding: 28, alignSelf: "start" }} aria-label="Quick facts">
          <span className="tag">Quick facts</span>
          <dl className="facts">
            <dt>Education</dt><dd>B.Tech CSE, AKTU · {EDUCATION[0].period}</dd>
            <dt>Role</dt><dd>{EXPERIENCE[0].title}, {EXPERIENCE[0].org}</dd>
            <dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`} style={{ textDecoration: "underline" }}>{PROFILE.email}</a></dd>
          </dl>
        </aside>
      </div>
      <style>{`.about-grid{display:grid;gap:40px;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr)}
        .facts{display:grid;gap:4px;margin:0}.facts dt{color:var(--mute);font-size:13px;margin-top:14px}.facts dd{margin:0;font-weight:600;overflow-wrap:anywhere}
        @media(max-width:1000px){.about-grid{grid-template-columns:minmax(0,1fr)}}`}</style>
    </section>
  );
}
