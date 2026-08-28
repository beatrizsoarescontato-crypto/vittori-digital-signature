import { lazy, Suspense, useEffect, useState } from "react";

const HeroCanvas = lazy(() => import("./three/HeroCanvas"));
const BackgroundCanvas = lazy(() => import("./three/BackgroundCanvas"));

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function ClientHeroCanvas() {
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <HeroCanvas />
    </Suspense>
  );
}

export function ClientBackgroundCanvas() {
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <BackgroundCanvas />
    </Suspense>
  );
}
