import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const StageCanvas = lazy(() => import("./three/StageCanvas"));

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { window.dispatchEvent(new Event("vittori-scene-unavailable")); }
  render() { return this.state.failed ? null : this.props.children; }
}

/**
 * Cena 3D única, montada apenas depois da hidratação (nunca no servidor)
 * e apenas quando o dispositivo não pede movimento reduzido.
 */
export function ClientStage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    try {
      const context = canvas.getContext("webgl2");
      if (!context) { window.dispatchEvent(new Event("vittori-scene-unavailable")); return; }
      context.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { window.dispatchEvent(new Event("vittori-scene-unavailable")); return; }
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
