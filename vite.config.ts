// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      // Prebundle the portfolio primitives with React rather than discovering
      // them after a preview has already loaded an older dependency graph.
      include: [
        "@radix-ui/react-dialog",
        "@radix-ui/react-slot",
        "three",
        "three/examples/jsm/loaders/FontLoader.js",
        "three/examples/jsm/math/MeshSurfaceSampler.js",
        "@react-three/fiber",
        "@react-three/drei",
        "gsap",
        "gsap/ScrollTrigger",
        "embla-carousel-react",
      ],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
