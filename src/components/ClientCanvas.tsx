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
    // Monta logo: o portal é a própria cena 3D.
    const id = window.setTimeout(() => setReady(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <StageCanvas />
    </Suspense>
  );
}
