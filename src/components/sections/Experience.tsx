"use client";
import { EXPERIENCE, EDUCATION } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";

const STOPS = [
  { year: EDUCATION[0].period, title: EDUCATION[0].degree, place: EDUCATION[0].school, detail: `Score: ${EDUCATION[0].score}` },
  { year: EXPERIENCE[0].period, title: EXPERIENCE[0].title, place: EXPERIENCE[0].org, detail: EXPERIENCE[0].points[0] },
];

export default function Experience() {
  const [ref, p] = useScrollProgress<HTMLDivElement>("pass");
  return (
    <section id="experience" className="sec" aria-labelledby="exp-h"><div className="wrap">
      <span className="tag rv">05 — Experience</span>
      <h2 id="exp-h" className="h2 rv-mask"><span>The path <em>so far.</em></span></h2>
      <div ref={ref} className="path">
        <div className="spine-bg" aria-hidden><div style={{ transform: `scaleY(${p})` }} /></div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 56 }}>
          {[...STOPS, null].map((s, i, a) => {
            const lit = p >= (i + 0.5) / a.length - 0.1;
            return s ? (
              <li key={s.title} className="stop" data-lit={lit}>
                <span className="dot" aria-hidden /><span className="mono">{s.year}</span>
                <h3 style={{ fontSize: "clamp(22px,3vw,36px)", letterSpacing: "-.03em", margin: "6px 0" }}>{s.title}</h3>
                <b>{s.place}</b><p style={{ color: "var(--ink-2)", maxWidth: 560 }}>{s.detail}</p>
              </li>
            ) : (
              <li key="next" className="stop next" data-lit={lit}><span className="dot" aria-hidden /><div className="card" style={{ padding: 28, border: "1.5px dashed var(--faint)", boxShadow: "none", background: "transparent" }}><span className="mono">Next</span><h3 style={{ fontSize: 32, margin: "6px 0 0" }}>Your team<em className="serif">?</em></h3></div></li>
            );
          })}
        </ol>
      </div>
    </div>
    <style>{`.path{position:relative;padding-left:48px}.spine-bg{position:absolute;left:8px;top:8px;bottom:8px;width:2px;background:var(--line)}.spine-bg div{height:100%;background:var(--ink);transform-origin:top;transition:transform .15s linear}
      .stop{position:relative;opacity:.35;transition:opacity .6s var(--ease)}.stop[data-lit=true]{opacity:1}.dot{position:absolute;left:-48px;top:4px;width:18px;height:18px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);transition:.5s var(--ease)}.stop[data-lit=true] .dot{background:var(--ink);box-shadow:none}`}</style>
    </section>
  );
}
