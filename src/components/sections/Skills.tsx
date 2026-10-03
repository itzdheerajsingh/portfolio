"use client";
import { useState } from "react";
import { SKILL_GROUPS } from "@/lib/data";

const SYM: Record<string, string> = { "Node.js": "No", "Express.js": "Ex", "React.js": "Re", "Tailwind CSS": "Tw", "Three.js": "Th", "GSAP": "Gs", "React Three Fiber": "Rf", "REST API": "Ra", JavaScript: "Js", HTML: "Ht", CSS: "Cs", Java: "Jv", MySQL: "My", MongoDB: "Mo", Docker: "Dk", Kubernetes: "K8", Git: "Gi" };
const ALL = SKILL_GROUPS.flatMap((g) => g.items.map((name) => ({ name, family: g.family })));

export default function Skills() {
  const [fam, setFam] = useState<string>("All"), [sel, setSel] = useState(0);
  const cur = ALL[sel];
  return (
    <section id="skills" className="sec" aria-labelledby="skills-h"><div className="wrap">
      <span className="tag rv">02 — Skills</span>
      <h2 id="skills-h" className="h2 rv-mask"><span>The periodic table of <em>my stack.</em></span></h2>
      <div className="chips rv" role="group" aria-label="Filter by family">
        {["All", ...SKILL_GROUPS.map((g) => g.family)].map((f) => (<button key={f} type="button" className="fchip" aria-pressed={fam === f} onClick={() => { setFam(f); if (f !== "All") setSel(ALL.findIndex((x) => x.family === f)); }}>{f}</button>))}
      </div>
      <div className="sk-grid">
        <ul className="tiles">
          {ALL.map((s, i) => (
            <li key={s.name} data-dim={fam !== "All" && fam !== s.family} style={{ "--d": `${((i % 8) + Math.floor(i / 8)) * 40}ms` } as React.CSSProperties} className="rv">
              <button type="button" className="tile" data-on={sel === i} onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} onClick={() => setSel(i)} aria-label={`${s.name}, ${s.family}`}>
                <span className="mono">{i + 1}</span><b>{SYM[s.name] ?? s.name.slice(0, 2)}</b><small>{s.name}</small>
              </button>
            </li>))}
        </ul>
        <aside className="card insp" aria-live="polite">
          <span className="sym" key={cur.name}>{SYM[cur.name] ?? cur.name.slice(0, 2)}</span>
          <b style={{ fontSize: 24 }}>{cur.name}</b><span className="mono">{cur.family}</span>
          <p style={{ color: "var(--mute)", fontSize: 14 }}>Listed under {cur.family} in my résumé.</p>
        </aside>
      </div>
    </div>
    <style>{`.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}.fchip{padding:8px 16px;border-radius:999px;box-shadow:inset 0 0 0 1px var(--line);font-size:14px;transition:.4s var(--ease)}.fchip[aria-pressed=true]{background:var(--ink);color:#fff}
      .tiles li[data-dim=true].is-in{opacity:.22}
      .sk-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:24px;align-items:start}
      .tiles{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:10px;list-style:none;padding:0;margin:0}
      .tiles li{transition-delay:var(--d)}.tile{width:100%;aspect-ratio:1;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;justify-content:space-between;padding:8px;text-align:left;transition:.5s var(--ease)}
      .tile b{font-size:clamp(16px,2.2vw,28px);letter-spacing:-.03em}.tile small{font-size:10px;color:var(--mute);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tile .mono{font-size:9px}
      .tile:hover,.tile[data-on=true]{background:var(--ink);color:#fff;transform:translateY(-3px)}.tile:hover small,.tile[data-on=true] small,.tile:hover .mono,.tile[data-on=true] .mono{color:#ccc}
      .insp{position:sticky;top:96px;padding:28px;display:flex;flex-direction:column;gap:6px;align-items:flex-start}
      .sym{width:150px;height:150px;border-radius:30px;background:var(--soft);display:grid;place-items:center;font-size:64px;font-weight:700;letter-spacing:-.05em;animation:pop .6s var(--ease)}@keyframes pop{from{transform:scale(.7);opacity:0}}
      @media(max-width:900px){.sk-grid{grid-template-columns:1fr}.tiles{grid-template-columns:repeat(4,minmax(0,1fr))}.insp{position:static}}`}</style>
    </section>
  );
}
