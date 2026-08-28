import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { brushedTexture, radialTexture, starGeometry, vGeometry } from "./shapes";

/* ------------------------------------------------------------------ *
 * Progresso de scroll: uma cena só, atravessando a página inteira.
 * ------------------------------------------------------------------ */
function scrollProgress() {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/** Keyframes: [x, y, z, rotX, rotY, rotZ, escala, bordô, presença] */
type Key = { p: number; v: number[] };

const DESKTOP: Key[] = [
  { p: 0.0, v: [0.33, 0.03, 0, -0.05, 0.22, 0, 0.2, 1, 1] },
  { p: 0.16, v: [-0.4, -0.1, -1.8, 0.15, 1.1, -0.1, 0.14, 0.22, 0.8] },
  { p: 0.36, v: [0.44, 0.1, -2.8, -0.2, 2.4, 0.12, 0.1, 0.1, 0.65] },
  { p: 0.58, v: [-0.46, 0.02, -3.8, 0.1, 3.4, -0.16, 0.08, 0.05, 0.4] },
  { p: 0.82, v: [0, -0.02, -0.8, 0, 4.7, 0, 0.18, 0.95, 1] },
  { p: 1.0, v: [0, 0.12, -2.6, 0.1, 5.4, 0, 0.11, 0.45, 0.7] },
];

const MOBILE: Key[] = [
  { p: 0.0, v: [0.36, 0.26, -0.5, -0.05, 0.25, 0, 0.05, 0.7, 1] },
  { p: 0.16, v: [-0.22, 0.3, -1, 0.12, 1.1, -0.1, 0.08, 0.2, 0.8] },

  { p: 0.36, v: [0.26, 0.28, -1.6, -0.16, 2.4, 0.12, 0.075, 0.1, 0.55] },
  { p: 0.58, v: [-0.24, 0.24, -2.4, 0.1, 3.4, -0.14, 0.07, 0.05, 0.35] },
  { p: 0.8, v: [0, 0.24, -0.6, 0, 4.7, 0, 0.11, 0.95, 1] },
  { p: 1.0, v: [0, 0.3, -1.8, 0.1, 5.4, 0, 0.08, 0.55, 0.8] },
];

function sample(keys: Key[], p: number): number[] {
  let a = keys[0]!;
  let b = keys[keys.length - 1]!;
  for (let i = 0; i < keys.length - 1; i++) {
    if (p >= keys[i]!.p && p <= keys[i + 1]!.p) {
      a = keys[i]!;
      b = keys[i + 1]!;
      break;
    }
  }
  const span = b.p - a.p || 1;
  const raw = (p - a.p) / span;
  const t = raw * raw * (3 - 2 * raw); // smoothstep
  return a.v.map((v, i) => v + (b.v[i]! - v) * t);
}

const damp = (current: number, target: number, k: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-k * dt));

/* ------------------------------------------------------------------ *
 * Parede bordô — o "estúdio" atrás do monograma.
 * ------------------------------------------------------------------ */
function BordoWall({ state }: { state: React.MutableRefObject<number[]> }) {
  const ref = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const material = useMemo(() => {
    const tex = radialTexture("#8B0F1A", "#180608");
    return new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    });
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const mat = ref.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) mat.opacity = damp(mat.opacity, state.current[7] ?? 1, 6, dt);
  });

  const size = Math.max(viewport.width, viewport.height) * 1.9;

  return (
    <mesh ref={ref} position={[0, 0, -6]} material={material}>
      <circleGeometry args={[size / 2, 64]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 * Monograma "V" em latão + estrela ✦ em órbita.
 * ------------------------------------------------------------------ */
function Monogram({
  state,
  mobile,
}: {
  state: React.MutableRefObject<number[]>;
  mobile: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const star = useRef<THREE.Mesh>(null);
  const star2 = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const vGeo = useMemo(() => vGeometry(), []);
  const sGeo = useMemo(() => starGeometry(), []);

  const brass = useMemo(() => {
    const brushed = brushedTexture();
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D8AE60"),
      metalness: 0.94,
      roughness: 0.3,
      roughnessMap: brushed,
      envMapIntensity: 2.6,
      transparent: true,
    });
  }, []);

  const brassStar = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#EBCB8A"),
        metalness: 1,
        roughness: 0.16,
        envMapIntensity: 3,
        transparent: true,
      }),
    [],
  );

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const [x, y, z, rx, ry, rz, scale, , presence] = state.current as number[];
    const g = group.current;
    if (!g) return;

    const t = s.clock.elapsedTime;
    g.position.x = damp(g.position.x, viewport.width * (x ?? 0), 5, dt);
    g.position.y = damp(
      g.position.y,
      viewport.height * (y ?? 0) + Math.sin(t * 0.55) * 0.08,
      5,
      dt,
    );
    g.position.z = damp(g.position.z, z ?? 0, 5, dt);
    g.rotation.x = damp(g.rotation.x, (rx ?? 0) + Math.sin(t * 0.4) * 0.035, 4, dt);
    g.rotation.y = damp(g.rotation.y, (ry ?? 0) + t * 0.06, 4, dt);
    g.rotation.z = damp(g.rotation.z, rz ?? 0, 4, dt);

    const target = viewport.height * (scale ?? 0.2);
    const s0 = damp(g.scale.x, target, 5, dt);
    g.scale.setScalar(s0);

    brass.opacity = damp(brass.opacity, presence ?? 1, 5, dt);
    brassStar.opacity = brass.opacity;

    // Estrela orbitando o "V"
    if (star.current) {
      const a = t * 0.42;
      star.current.position.set(Math.cos(a) * 1.45, Math.sin(a * 0.8) * 0.6, Math.sin(a) * 1.45);
      star.current.rotation.z += dt * 0.7;
      star.current.rotation.y += dt * 0.35;
    }
    if (star2.current) {
      const a = -t * 0.3 + 2;
      star2.current.position.set(Math.cos(a) * 1.75, -0.8 + Math.sin(a) * 0.45, Math.sin(a) * 1.1);
      star2.current.rotation.z -= dt * 0.5;
      star2.current.rotation.x += dt * 0.25;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={vGeo} material={brass} castShadow />
      <mesh ref={star} geometry={sGeo} material={brassStar} scale={mobile ? 0.26 : 0.3} />
      <mesh ref={star2} geometry={sGeo} material={brassStar} scale={mobile ? 0.14 : 0.18} />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Poeira dourada — pouca, grande, com profundidade.
 * ------------------------------------------------------------------ */
function GoldDust({ count, state }: { count: number; state: React.MutableRefObject<number[]> }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  const material = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,232,178,1)");
    g.addColorStop(0.4, "rgba(200,162,90,0.5)");
    g.addColorStop(1, "rgba(200,162,90,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.PointsMaterial({
      map: tex,
      size: 0.09,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
  }, []);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = ref.current;
    if (!p) return;
    p.rotation.y += dt * 0.02;
    p.position.y = Math.sin(s.clock.elapsedTime * 0.08) * 0.25 - (state.current[2] ?? 0) * 0.2;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

function Rig({
  state,
  keys,
}: {
  state: React.MutableRefObject<number[]>;
  keys: Key[];
}) {
  useFrame(() => {
    state.current = sample(keys, scrollProgress());
  });
  return null;
}

export default function StageCanvas() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const keys = mobile ? MOBILE : DESKTOP;
  const state = useRef<number[]>(keys[0]!.v.slice());

  return (
    <Canvas
      dpr={mobile ? [1, 1.4] : [1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Rig state={state} keys={keys} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[1, 1.6, 6]} intensity={2.2} color="#EFD49B" />
      <spotLight position={[4, 6, 5]} angle={0.5} penumbra={0.9} intensity={140} color="#E4C98F" />
      <spotLight position={[-5, -2, 2]} angle={0.7} penumbra={1} intensity={40} color="#8B0F1A" />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={7} position={[0, 4, 4]} scale={[12, 12, 1]} color="#F0DCA8" />
          <Lightformer intensity={3.4} position={[3, -2, 4]} scale={[8, 8, 1]} color="#E4C98F" />
          <Lightformer
            intensity={2.2}
            color="#E0C48A"
            position={[-5, 0, 1]}
            rotation-y={Math.PI / 2}
            scale={[14, 3, 1]}
          />
          <Lightformer
            intensity={1.6}
            color="#8B0F1A"
            position={[5, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[14, 3, 1]}
          />
        </Environment>
        <BordoWall state={state} />
        <Monogram state={state} mobile={mobile} />
        <GoldDust count={mobile ? 70 : 150} state={state} />
      </Suspense>
    </Canvas>
  );
}
