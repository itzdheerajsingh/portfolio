"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data";

export default function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="sec" aria-labelledby="work-h"><div className="wrap">
      <span className="tag rv">03 — Selected work</span>
      <h2 id="work-h" className="h2 rv-mask"><span>Things I&apos;ve <em>built.</em></span></h2>
      <div className="acc rv">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className="panel card" data-open={open === i} onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)} onClick={() => setOpen(i)} tabIndex={0} aria-label={p.title}>
            <div className="spine"><span className="mono">{p.index}</span><span className="vt">{p.title}</span><span className="plus" aria-hidden>+</span></div>
            <div className="body" inert={open !== i}>
              <div><span className="mono">{p.index} — {p.kicker} · {p.period}</span>
                <h3 style={{ fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-.04em", margin: "10px 0" }}>{p.title}</h3>
                <p style={{ color: "var(--ink-2)", maxWidth: 480 }}>{p.description}</p>
                <ul className="feat">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{p.tech.map((t) => <span key={t} className="tech">{t}</span>)}</div>
                {p.github && <a className="pill pill-ink" style={{ marginTop: 16 }} href={p.github} target="_blank" rel="noreferrer">View on GitHub ↗</a>}
              </div>
              <div className="mini" role="img" aria-label="Illustrative UI, not a real screenshot">
                <span className="mono">Illustrative UI</span>
                {[0, 1, 2].map((r) => <div key={r} className="row"><i /><span style={{ width: `${70 - r * 15}%` }} /></div>)}
              </div>
            </div>
          </article>))}
      </div>
    </div>
    <style>{`.acc{display:flex;gap:12px;height:min(78svh,600px)}.panel{flex:1;overflow:hidden;position:relative;transition:flex .9s var(--ease);min-width:0}.panel[data-open=true]{flex:8}
      .spine{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:20px 0;transition:opacity .4s}.panel[data-open=true] .spine{opacity:0;pointer-events:none}
      .vt{writing-mode:vertical-rl;font-weight:600;font-size:18px}.plus{font-size:24px;transition:transform .5s var(--ease)}.panel:hover .plus{transform:rotate(90deg)}
      .body{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.8fr);gap:24px;padding:32px;opacity:0;transition:opacity .5s .2s;height:100%;overflow:auto}.panel[data-open=true] .body{opacity:1}
      .feat{padding-left:18px;display:grid;gap:6px;font-size:14px;color:var(--ink-2)}.tech{padding:5px 12px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);font-size:12px}
      .mini{border-radius:20px;background:var(--soft);padding:20px;display:flex;flex-direction:column;gap:12px;clip-path:inset(0 100% 0 0);transition:clip-path 1.1s var(--ease) .2s}.panel[data-open=true] .mini{clip-path:inset(0)}
      .row{display:flex;gap:10px;align-items:center;background:#fff;border-radius:12px;padding:14px}.row i{width:16px;height:16px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--ink)}.row span{height:8px;border-radius:4px;background:var(--faint)}
      @media(max-width:800px){.acc{flex-direction:column;height:auto}.panel{flex:none;height:64px}.panel[data-open=true]{height:auto;min-height:520px}.spine{flex-direction:row;padding:0 20px}.vt{writing-mode:horizontal-tb}.body{grid-template-columns:1fr}}`}</style>
    </section>
  );
}
