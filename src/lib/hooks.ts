"use client";
import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Becomes true (once) when the element is at least `threshold` visible. */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/**
 * 0..1 scroll progress of an element.
 *  - "pass": how far the element has travelled up through the viewport.
 *  - "pin":  progress through a tall section whose FIRST CHILD is the sticky viewport.
 */
export function useScrollProgress<T extends HTMLElement>(mode: "pass" | "pin" = "pass") {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      let v = 0;
      if (mode === "pin") {
        const stuck = (el.firstElementChild as HTMLElement | null)?.offsetHeight ?? window.innerHeight;
        const range = r.height - stuck;
        v = range > 1 ? -r.top / range : 0; // guard: no scroll range => no divide-by-zero / NaN
      } else if (r.height > 0) {
        v = (window.innerHeight * 0.6 - r.top) / r.height;
      }
      setP(Math.round(Math.min(1, Math.max(0, v)) * 1000) / 1000);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    const ro = new ResizeObserver(on); // re-measure when the section itself changes height
    ro.observe(el);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode]);
  return [ref, p] as const;
}
