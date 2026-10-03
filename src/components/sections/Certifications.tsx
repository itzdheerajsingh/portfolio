import { CERTIFICATIONS } from "@/lib/data";
export default function Certifications() {
  return (
    <section id="certifications" aria-labelledby="cert-h" style={{ background: "var(--card)", boxShadow: "inset 0 1px 0 var(--line), inset 0 -1px 0 var(--line)" }}>
      <div className="wrap sec cert">
        <div style={{ position: "sticky", top: 110, alignSelf: "start" }}>
          <span className="tag rv">04 — Certifications</span>
          <h2 id="cert-h" className="h2 rv-mask"><span>Always <em>learning.</em></span></h2>
          <p className="mono rv">{String(CERTIFICATIONS.length).padStart(2, "0")} certifications</p>
        </div>
        <ol className="list">
          {CERTIFICATIONS.map((c, i) => {
            const row = (<>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <span><b>{c.title}</b><br /><small>{c.issuer}</small></span>
              {c.url && <span className="arr" aria-hidden>↗</span>}
            </>);
            return (
              <li key={c.title} className="rv" style={{ "--i": i } as React.CSSProperties}>
                {c.url ? <a className="crow" href={c.url} target="_blank" rel="noreferrer">{row}</a> : <div className="crow">{row}</div>}
              </li>);
          })}
        </ol>
      </div>
      <style>{`.cert{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:48px}.list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
        .crow{position:relative;display:grid;grid-template-columns:48px 1fr auto;gap:16px;align-items:center;padding:28px 20px;border-bottom:1px solid var(--line);overflow:hidden;font-size:clamp(20px,2.4vw,32px);transition:color .4s}
        .crow>*{position:relative}.crow small{font-size:14px;color:var(--mute);transition:color .4s}.crow::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:left;transition:transform .7s var(--ease)}
        .arr{transform:translateX(-14px);opacity:0;transition:.5s var(--ease)}.crow:hover,.crow:focus-visible{color:#fff}.crow:hover::before,.crow:focus-visible::before{transform:scaleX(1)}
        .crow:hover small,.crow:focus-visible small,.crow:hover .mono,.crow:focus-visible .mono{color:#ccc}.crow:hover .arr,.crow:focus-visible .arr{transform:none;opacity:1}
        @media(max-width:800px){.cert{grid-template-columns:1fr}}`}</style>
    </section>
  );
}
