"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;

export function scrollToTarget(id: string) {
  if (id === "top") {
    if (lenis) lenis.scrollTo(0, { duration: 1.2, force: true });
    else window.scrollTo({ top: 0 });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2, force: true });
  else el.scrollIntoView({ behavior: "auto" });
}

/** Freeze / release page scrolling (used by the mobile menu). */
export function setScrollLocked(locked: boolean) {
  if (lenis) { if (locked) lenis.stop(); else lenis.start(); }
  document.documentElement.style.overflowY = locked ? "hidden" : "";
}

export function ScrollProvider() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ lerp: 0.1 });
    lenis = instance;
    let raf = 0;
    const loop = (t: number) => { instance.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); instance.destroy(); if (lenis === instance) lenis = null; };
  }, []);
  return null;
}
