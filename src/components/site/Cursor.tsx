import { useEffect, useRef, useState } from "react";

/** Cursor autoral: cresce e ganha rótulo sobre elementos com data-cursor. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    setAtivo(true);

    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(el?.dataset["cursor"] ?? null);
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!ativo) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
    >
      <div
        className={`flex items-center justify-center rounded-full border border-dourado/70 transition-all duration-300 ease-out ${
          label
            ? "h-20 w-20 bg-dourado/12 backdrop-blur-[2px]"
            : "h-3 w-3 bg-dourado/80"
        }`}
      >
        {label ? <span className="label-mono text-dourado">{label}</span> : null}
      </div>
    </div>
  );
}
