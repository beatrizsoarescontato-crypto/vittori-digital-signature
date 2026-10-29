import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { brushedTexture, radialTexture, starGeometry, vGeometry } from "./shapes";
import { stageScroll, startStageScroll } from "./stageScroll";
import fontJson from "./vittoriFont.json";

/**
 * Universo contínuo da Vittori: um único palco 3D fixo atrás do site inteiro.
 * VITTORI monumental em metal bordô com aresta dourada, estrelas ✦ em órbita,
 * névoa bordô infinita e três camadas de partículas que "mergulham" com o scroll.
 */

/* Keyframes do monumento ao longo da página: [x, y, z, rotX, rotY, escala] (x/y em fração da tela). */
type Key = { p: number; v: number[] };
const KEYS: Key[] = [
  { p: 0, v: [0, 0.15, 0, 0, 0, 1] },
  { p: 0.07, v: [0.16, 0.06, -5, 0.08, -0.5, 0.82] },
  { p: 0.35, v: [-0.18, 0.02, -8, 0.04, 0.55, 0.8] },
  { p: 0.65, v: [0.2, -0.02, -8, -0.04, -0.6, 0.8] },
  { p: 0.9, v: [-0.05, 0.02, -6, 0, 0.3, 0.85] },
  { p: 1, v: [0, 0.06, -3.5, 0, 0, 0.9] },
];

const BG = "#14050a";
const mouse = { x: 0, y: 0 };

function sample(p: number): number[] {
  let a = KEYS[0]!;
  let b = KEYS[KEYS.length - 1]!;
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i]!.p && p <= KEYS[i + 1]!.p) {
      a = KEYS[i]!;
      b = KEYS[i + 1]!;
      break;
    }
  }
  const raw = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p || 1)));
  const t = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2;
  return a.v.map((v, i) => v + (b.v[i]! - v) * t);
}

const damp = (c: number, t: number, k: number, dt: number) => c + (t - c) * (1 - Math.exp(-k * dt));

/* ------------------------------------------------------------------ */
function useMaterials() {
  return useMemo(() => {
    const brushed = brushedTexture();
    const face = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4E0710"),
      metalness: 0.9,
      roughness: 0.38,
      roughnessMap: brushed,
      envMapIntensity: 1.1,
    });
    const edge = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4AE63"),
      metalness: 1,
      roughness: 0.18,
      envMapIntensity: 2.8,
    });
    const star = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F0D394"),
      metalness: 1,
      roughness: 0.12,
      envMapIntensity: 3.2,
      emissive: new THREE.Color("#5a3a10"),
      emissiveIntensity: 0.4,
    });
    return { face, edge, star };
  }, []);
}

/* ------------------------------------------------------------------ *
 * VITTORI monumental + monograma V + estrelas orbitando.
 * ------------------------------------------------------------------ */
function Monument({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const stars = useRef<(THREE.Mesh | null)[]>([]);
  const { viewport } = useThree();
  const mats = useMaterials();

  const { letters, width, height } = useMemo(() => {
    const font = new Font(fontJson as never);
    const size = 1;
    const tracking = 0.16;
    const word = "VITTORI";
    const glyphs = (fontJson as { glyphs: Record<string, { ha: number }> }).glyphs;
    let x = 0;
    const out: { geo: THREE.ExtrudeGeometry; x: number }[] = [];
    for (const ch of word) {
      const shapes = font.generateShapes(ch, size);
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.035,
        bevelSize: 0.022,
        bevelSegments: 4,
        curveSegments: mobile ? 6 : 10,
      });
      out.push({ geo, x });
      x += ((glyphs[ch]?.ha ?? 600) / 1000) * size + tracking;
    }
    const w = x - tracking;
    return { letters: out.map((l) => ({ ...l, x: l.x - w / 2 })), width: w, height: 0.64 };
  }, [mobile]);

  const vGeo = useMemo(() => vGeometry(), []);
  const sGeo = useMemo(() => starGeometry(), []);
  const spin = useRef(0);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const g = group.current;
    if (!g) return;
    const t = s.clock.elapsedTime;
    const [x, y, z, rx, ry, sc] = sample(stageScroll.p);

    spin.current = damp(spin.current, stageScroll.vel, 2.2, dt);
    stageScroll.vel = damp(stageScroll.vel, 0, 3, dt);

    // Encaixa a palavra na largura da tela (monumental, sem cortar).
    const fit = (viewport.width * (mobile ? 0.9 : 0.74)) / width;
    g.scale.setScalar(damp(g.scale.x, fit * (sc ?? 1), 3, dt));
    g.position.x = damp(g.position.x, viewport.width * (x ?? 0), 2.6, dt);
    g.position.y = damp(g.position.y, viewport.height * (y ?? 0) + Math.sin(t * 0.5) * 0.06, 2.6, dt);
    g.position.z = damp(g.position.z, (z ?? 0) - Math.abs(spin.current) * 0.8, 2.4, dt);
    g.rotation.x = damp(g.rotation.x, (rx ?? 0) + mouse.y * 0.18 + Math.sin(t * 0.35) * 0.02, 2.6, dt);
    g.rotation.y = damp(g.rotation.y, (ry ?? 0) + mouse.x * 0.32 + spin.current * 0.35, 2.4, dt);

    const R = width * 0.62;
    stars.current.forEach((m, i) => {
      if (!m) return;
      const a = t * (0.32 + i * 0.07) + i * 2.1 + stageScroll.p * 6;
      m.position.set(Math.cos(a) * R * (1 - i * 0.12), Math.sin(a * 1.3) * 0.5 + (i - 1) * 0.15, Math.sin(a) * 1.2);
      m.rotation.z += dt * (0.6 + i * 0.2);
      m.rotation.y += dt * 0.3;
    });
  });

  return (
    <group ref={group}>
      {letters.map((l, i) => (
        <mesh key={i} geometry={l.geo} material={[mats.face, mats.edge]} position={[l.x, -height / 2, -0.11]} />
      ))}
      <mesh geometry={vGeo} material={[mats.face, mats.edge]} position={[0, height * 1.2, -0.2]} scale={0.28} />
      {[0.16, 0.1, 0.07].map((s, i) => (
        <mesh
          key={i}
          ref={(m) => {
            stars.current[i] = m;
          }}
          geometry={sGeo}
          material={mats.star}
          scale={s}
        />
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Poeira infinita em três camadas: o visitante "desce" pelo universo.
 * ------------------------------------------------------------------ */
const dustVert = /* glsl */ `
attribute float aRand;
uniform float uTravel;
uniform float uTime;
uniform float uSize;
varying float vA;
varying float vR;
void main() {
  vec3 p = position;
  float range = 48.0;
  p.z = mod(p.z + uTravel + 40.0, range) - 40.0;
  p.x += sin(uTime * 0.2 + aRand * 30.0) * 0.15;
  p.y += cos(uTime * 0.17 + aRand * 20.0) * 0.15;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float near = smoothstep(7.5, 4.0, p.z);
  float far = smoothstep(-40.0, -26.0, p.z);
  vA = near * far * (0.55 + 0.45 * sin(uTime * (1.0 + aRand * 2.5) + aRand * 50.0));
  vR = aRand;
  gl_PointSize = uSize * (0.4 + aRand) / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const dustFrag = /* glsl */ `
uniform vec3 uColor;
varying float vA;
varying float vR;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float core = smoothstep(0.5, 0.0, d);
  // brilho em cruz nas partículas mais fortes (cintilar de estrela)
  float cross = vR > 0.9 ? max(smoothstep(0.06, 0.0, abs(c.x)), smoothstep(0.06, 0.0, abs(c.y))) * smoothstep(0.5, 0.1, d) : 0.0;
  gl_FragColor = vec4(uColor, (core * core + cross * 0.8) * vA);
}`;

function DustLayer({ count, size, speed, color, spread }: { count: number; size: number; speed: number; color: string; spread: number }) {
  const { gl } = useThree();
  const points = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread * 1.6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = Math.random() * 48 - 40;
      rnd[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: dustVert,
      fragmentShader: dustFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTravel: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: size * gl.getPixelRatio() },
        uColor: { value: new THREE.Color(color) },
      },
    });
    const p = new THREE.Points(g, m);
    p.frustumCulled = false;
    return p;
  }, [count, size, color, spread, gl]);

  const travel = useRef(0);
  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    travel.current += dt * 0.35 * speed;
    const u = (points.material as THREE.ShaderMaterial).uniforms;
    u["uTime"]!.value = s.clock.elapsedTime;
    u["uTravel"]!.value = travel.current + stageScroll.p * 90 * speed;
    points.position.x = damp(points.position.x, -mouse.x * 0.6 * speed, 2, dt);
    points.position.y = damp(points.position.y, mouse.y * 0.4 * speed, 2, dt);
  });
  return <primitive object={points} />;
}

/* Halo bordô no fundo do infinito. */
function Glow() {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: radialTexture("#9A1424", BG),
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        fog: false,
      }),
    [],
  );
  useFrame((s) => {
    const k = 1 + Math.sin(s.clock.elapsedTime * 0.25) * 0.04;
    ref.current?.scale.setScalar(k);
    mat.opacity = 0.75 + Math.sin(s.clock.elapsedTime * 0.25) * 0.08 - stageScroll.p * 0.15;
  });
  return (
    <mesh ref={ref} position={[0, 0, -34]} material={mat}>
      <planeGeometry args={[70, 70]} />
    </mesh>
  );
}

/* Luz dourada que segue o cursor e faz as arestas brilharem. */
function CursorLight() {
  const ref = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  useFrame((_, delta) => {
    const l = ref.current;
    if (!l) return;
    const dt = Math.min(delta, 0.05);
    l.position.x = damp(l.position.x, mouse.x * viewport.width, 3, dt);
    l.position.y = damp(l.position.y, -mouse.y * viewport.height, 3, dt);
  });
  return <pointLight ref={ref} position={[0, 0, 3]} intensity={18} distance={14} color="#F3D79A" />;
}

function Rig() {
  useEffect(() => startStageScroll(), []);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

export default function StageCanvas() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const wrap = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={mobile ? [1, 1.4] : [1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 80 }}
        gl={{ antialias: !mobile, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        onCreated={() => {
          requestAnimationFrame(() => wrap.current?.setAttribute("data-scene-ready", "true"));
        }}
      >
        <color attach="background" args={[BG]} />
        <fogExp2 attach="fog" args={[BG, 0.05]} />
        <Rig />
        <ambientLight intensity={0.25} />
        <directionalLight position={[2, 3, 7]} intensity={2.4} color="#F2DDAA" />
        <spotLight position={[-6, 4, 6]} angle={0.6} penumbra={1} intensity={90} color="#F2EFE6" />
        <spotLight position={[6, -3, 4]} angle={0.7} penumbra={1} intensity={60} color="#C8203A" />
        <CursorLight />
        <Glow />
        <DustLayer count={mobile ? 500 : 1400} size={22} speed={0.4} color="#E8C27A" spread={34} />
        <DustLayer count={mobile ? 220 : 600} size={46} speed={1} color="#F6DFA8" spread={22} />
        <DustLayer count={mobile ? 50 : 120} size={120} speed={1.8} color="#D9485A" spread={16} />
        <Suspense fallback={null}>
          <Environment resolution={128}>
            <Lightformer intensity={6} position={[0, 4, 4]} scale={[12, 12, 1]} color="#F0DCA8" />
            <Lightformer intensity={3} position={[3, -2, 4]} scale={[8, 8, 1]} color="#E4C98F" />
            <Lightformer intensity={2} color="#E0C48A" position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[14, 3, 1]} />
            <Lightformer intensity={2.4} color="#8B0F1A" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[14, 3, 1]} />
          </Environment>
          <Monument mobile={mobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
