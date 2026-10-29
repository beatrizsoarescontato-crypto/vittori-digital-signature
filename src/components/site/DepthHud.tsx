import { useEffect, useRef } from "react";

/** Indicador de profundidade: o visitante "desce" pelo universo da Vittori. */
export function DepthHud() {
  const depth = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      if (depth.current) depth.current.textContent = Math.round(p * 7000).toLocaleString("pt-BR");
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed bottom-8 left-6 z-40 hidden items-end gap-4 lg:flex">
      <span className="relative block h-24 w-px bg-marfim/25">
        <span ref={bar} className="absolute inset-0 origin-top bg-dourado" style={{ transform: "scaleY(0)" }} />
      </span>
      <span className="label-mono flex flex-col gap-1 text-marfim/85">
        <span className="text-dourado">✦ Profundidade</span>
        <span>
          <span ref={depth} className="tabular-nums">0</span> m
        </span>
      </span>
    </div>
  );
}
