import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";

// Start downloading the 3D scene as soon as this module runs in the browser, in parallel
// with hydration, instead of only after the first render. The import is cached, so lazy()
// below reuses the same request.
const loadStage = () => import("./three/StageCanvas");
if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) void loadStage().catch(() => undefined);
const StageCanvas = lazy(loadStage);

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch() { window.dispatchEvent(new Event("vittori-scene-unavailable")); }
  override render() { return this.state.failed ? null : this.props.children; }
}

/**
 * Cena 3D única, montada apenas depois da hidratação (nunca no servidor)
 * e apenas quando o dispositivo não pede movimento reduzido.
 */
export function ClientStage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const probe = document.createElement("canvas");
    try {
      const context = probe.getContext("webgl2");
      if (!context) { window.setTimeout(() => window.dispatchEvent(new Event("vittori-scene-unavailable")), 0); return; }
      context.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { window.setTimeout(() => window.dispatchEvent(new Event("vittori-scene-unavailable")), 0); return; }
    // Monta logo: o portal é a própria cena 3D.
    const id = window.setTimeout(() => setReady(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <SceneBoundary><Suspense fallback={null}>
      <StageCanvas />
    </Suspense></SceneBoundary>
  );
}
