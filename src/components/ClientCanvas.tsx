import { lazy, Suspense, useEffect, useState } from "react";

const StageCanvas = lazy(() => import("./three/StageCanvas"));

/**
 * Cena 3D única, montada apenas depois da hidratação (nunca no servidor)
 * e apenas quando o dispositivo não pede movimento reduzido.
 */
export function ClientStage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setReady(true))
      : window.setTimeout(() => setReady(true), 200);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <StageCanvas />
    </Suspense>
  );
}
