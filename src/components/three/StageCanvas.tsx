import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { brushedTexture, radialTexture, starGeometry, vGeometry } from "./shapes";
import { stageScroll, startStageScroll } from "./stageScroll";
import fontJson from "./vittoriFont.json";

/**
 * Universo contínuo da Vittori: um único palco 3D fixo atrás do site inteiro.
 * VITTORI monumental em metal bordô com aresta dourada, estrelas ✦ em órbita,
 * névoa bordô infinita e três camadas de partículas que "mergulham" com o scroll.
 */

/* Keyframes do V ao longo da página: [x, y, z, rotX, rotY, escala] (x/y em fração da tela). */
type Key = { p: number; v: number[] };
const KEYS: Key[] = [
  { p: 0, v: [0, 0, -2, 0, 0, 1] },
  { p: 0.12, v: [0.2, 0, -1, 0.06, -0.45, 1] }, // Sobre: V sólido com luz
  { p: 0.32, v: [-0.22, 0, -2, 0.04, 0.5, 1.05] }, // Serviços: V de partículas
  { p: 0.55, v: [0.24, 0, -3, -0.05, -1.2, 0.95] }, // Método/Pilares: gira de lado
  { p: 0.78, v: [0.05, 0.05, -9, 0, 0.3, 0.85] }, // Portfólio: recua ao fundo
  { p: 1, v: [0, 0.04, -1.5, 0, 0, 1.05] }, // Final: V volta ao centro
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

const sm = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* Nuvem de pontos amostrada da superfície de uma geometria (para dissolver/montar). */
const ptVert = /* glsl */ `
attribute vec3 aDir;
attribute float aRand;
uniform float uScatter;
uniform float uTime;
uniform float uSize;
varying float vR;
void main() {
  vec3 p = position + aDir * uScatter * (2.5 + aRand * 7.0);
  p += vec3(sin(uTime * 0.9 + aRand * 40.0), cos(uTime * 0.7 + aRand * 30.0), 0.0) * 0.012 * (1.0 + uScatter * 8.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vR = aRand;
  gl_PointSize = uSize * (0.45 + aRand * 0.9) / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const ptFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
uniform float uTime;
varying float vR;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  float tw = 0.65 + 0.35 * sin(uTime * (1.5 + vR * 3.0) + vR * 60.0);
  gl_FragColor = vec4(uColor, a * a * uAlpha * tw);
}`;

function samplePoints(meshes: THREE.Mesh[], total: number, forward: number, size: number, color: string) {
  const pos = new Float32Array(total * 3);
  const dir = new Float32Array(total * 3);
  const rnd = new Float32Array(total);
  const v = new THREE.Vector3();
  const per = Math.ceil(total / meshes.length);
  let k = 0;
  for (const m of meshes) {
    const s = new MeshSurfaceSampler(m).build();
    for (let i = 0; i < per && k < total; i++, k++) {
      s.sample(v);
      v.applyMatrix4(m.matrix);
      pos.set([v.x, v.y, v.z], k * 3);
      const d = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 + forward).normalize();
      dir.set([d.x, d.y, d.z], k * 3);
      rnd[k] = Math.random();
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aDir", new THREE.BufferAttribute(dir, 3));
  g.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
  const mat = new THREE.ShaderMaterial({
    vertexShader: ptVert,
    fragmentShader: ptFrag,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uScatter: { value: 1 },
      uAlpha: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: size },
      uColor: { value: new THREE.Color(color) },
    },
  });
  const p = new THREE.Points(g, mat);
  p.frustumCulled = false;
  return p;
}

function fade(mats: THREE.Material[], o: number) {
  mats.forEach((m) => {
    m.opacity = o;
    m.transparent = o < 0.999;
    m.depthWrite = o > 0.5;
  });
}

/* ------------------------------------------------------------------ *
 * Coreografia: VITTORI monumental > dissolve em poeira dourada > V sólido
 * com faixa de luz > V vira partículas > V sólido volta no final.
 * ------------------------------------------------------------------ */
function Monument({ mobile }: { mobile: boolean }) {
  const { viewport, gl } = useThree();
  const mats = useMaterials();
  const wordGroup = useRef<THREE.Group>(null);
  const vGroup = useRef<THREE.Group>(null);
  const vSolid = useRef<THREE.Group>(null);
  const sweep = useRef<THREE.PointLight>(null);
  const stars = useRef<(THREE.Mesh | null)[]>([]);
  const intro = useRef(0);
  const spin = useRef(0);

  const wordMats = useMemo(() => [mats.face.clone(), mats.edge.clone()], [mats]);
  const vMats = useMemo(() => [mats.face.clone(), mats.edge.clone()], [mats]);

  const { letters, width, wordPts } = useMemo(() => {
    const font = new Font(fontJson as never);
    const tracking = 0.16;
    const glyphs = (fontJson as { glyphs: Record<string, { ha: number }> }).glyphs;
    let x = 0;
    const out: { geo: THREE.ExtrudeGeometry; x: number }[] = [];
    for (const ch of "VITTORI") {
      const geo = new THREE.ExtrudeGeometry(font.generateShapes(ch, 1), {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.035,
        bevelSize: 0.022,
        bevelSegments: 4,
        curveSegments: mobile ? 6 : 10,
      });
      out.push({ geo, x });
      x += ((glyphs[ch]?.ha ?? 600) / 1000) + tracking;
    }
    const w = x - tracking;
    const placed = out.map((l) => ({ ...l, x: l.x - w / 2 }));
    const tmp = placed.map((l) => {
      const m = new THREE.Mesh(l.geo);
      m.position.set(l.x, -0.32, -0.11);
      m.updateMatrix();
      return m;
    });
    const pts = samplePoints(tmp, mobile ? 2600 : 6000, 1.6, 26 * gl.getPixelRatio(), "#F0D394");
    return { letters: placed, width: w, wordPts: pts };
  }, [mobile, gl]);

  const vGeo = useMemo(() => vGeometry(), []);
  const vPts = useMemo(() => {
    const m = new THREE.Mesh(vGeo);
    m.updateMatrix();
    return samplePoints([m], mobile ? 2200 : 5000, 0, 60 * gl.getPixelRatio(), "#F3D79A");
  }, [vGeo, mobile, gl]);
  const sGeo = useMemo(() => starGeometry(), []);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = s.clock.elapsedTime;
    const p = stageScroll.p;
    spin.current = damp(spin.current, stageScroll.vel, 2.2, dt);
    stageScroll.vel = damp(stageScroll.vel, 0, 3, dt);
    if (stageScroll.entered) intro.current = damp(intro.current, 1, 1.1, dt);

    /* 1. VITTORI monumental, revelado depois da entrada */
    const dissolve = sm(0.004, 0.075, p);
    const wg = wordGroup.current;
    if (wg) {
      const fit = (viewport.width * (mobile ? 0.9 : 0.72)) / width;
      const i = intro.current;
      wg.scale.setScalar(fit * (0.86 + 0.14 * i));
      wg.position.set(0, viewport.height * 0.2 + Math.sin(t * 0.5) * 0.05, -2 * (1 - i));
      wg.rotation.x = damp(wg.rotation.x, -0.1 + mouse.y * 0.14, 2.4, dt);
      wg.rotation.y = damp(wg.rotation.y, mouse.x * 0.26, 2.4, dt);
      const solid = i * (1 - sm(0.0, 0.035, p));
      fade(wordMats, solid);
      wg.children[0]!.visible = solid > 0.01;
      const u = (wordPts.material as THREE.ShaderMaterial).uniforms;
      u["uTime"]!.value = t;
      // Antes da entrada a poeira está montada sobre as letras (brilho de chegada); depois explode em direção à câmera.
      u["uScatter"]!.value = Math.max(dissolve, (1 - i) * 0.6);
      u["uAlpha"]!.value = (0.35 + 0.65 * sm(0, 0.02, p)) * (1 - sm(0.05, 0.09, p)) * i;
    }

    /* 2. V monumental */
    const vg = vGroup.current;
    if (vg) {
      const [x, y, z, rx, ry, sc] = sample(p);
      const base = Math.min(viewport.height * 0.27, viewport.width * (mobile ? 0.3 : 0.2));
      const vIn = sm(0.05, 0.12, p);
      vg.scale.setScalar(damp(vg.scale.x || 0.001, base * (sc ?? 1) * (0.6 + 0.4 * vIn), 3, dt));
      vg.position.x = damp(vg.position.x, viewport.width * (x ?? 0), 2.6, dt);
      vg.position.y = damp(vg.position.y, viewport.height * (y ?? 0) + Math.sin(t * 0.5) * 0.06, 2.6, dt);
      vg.position.z = damp(vg.position.z, (z ?? 0) - 6 * (1 - vIn) - Math.abs(spin.current) * 0.8, 2.4, dt);
      vg.rotation.x = damp(vg.rotation.x, (rx ?? 0) + mouse.y * 0.18, 2.6, dt);
      vg.rotation.y = damp(vg.rotation.y, (ry ?? 0) + mouse.x * 0.32 + spin.current * 0.35, 2.4, dt);

      const morph = sm(0.2, 0.32, p) * (1 - sm(0.84, 0.95, p));
      const solid = vIn * (1 - morph);
      fade(vMats, solid);
      if (vSolid.current) vSolid.current.visible = solid > 0.01;
      const u = (vPts.material as THREE.ShaderMaterial).uniforms;
      u["uTime"]!.value = t;
      u["uScatter"]!.value = (1 - morph) * 0.9 + Math.abs(spin.current) * 0.15;
      u["uAlpha"]!.value = morph * 1.2;

      // Faixa de luz de vitrine atravessando o V a cada ~6s.
      const l = sweep.current;
      if (l) {
        const c = (t % 6) / 6;
        l.position.set(-2.2 + c * 4.4, 0.6 - c * 1.2, 1.1);
        l.intensity = 22 * Math.sin(Math.PI * c) * solid;
      }

      stars.current.forEach((m, i) => {
        if (!m) return;
        const a = t * (0.32 + i * 0.07) + i * 2.1 + p * 6;
        m.position.set(Math.cos(a) * 1.9 * (1 - i * 0.12), Math.sin(a * 1.3) * 0.7 + (i - 1) * 0.2, Math.sin(a) * 1.2);
        m.rotation.z += dt * (0.6 + i * 0.2);
        m.rotation.y += dt * 0.3;
        m.visible = vIn > 0.05;
      });
    }
  });

  return (
    <>
      <group ref={wordGroup}>
        <group>
          {letters.map((l, i) => (
            <mesh key={i} geometry={l.geo} material={wordMats} position={[l.x, -0.32, -0.11]} />
          ))}
        </group>
        <primitive object={wordPts} />
      </group>
      <group ref={vGroup} scale={0.001}>
        <group ref={vSolid}>
          <mesh geometry={vGeo} material={vMats} />
        </group>
        <primitive object={vPts} />
        <pointLight ref={sweep} distance={4} decay={1.6} color="#FFF1CC" intensity={0} />
        {[0.2, 0.13, 0.09].map((s, i) => (
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
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Estrelas cadentes: filamentos finos, raros, também ao rolar rápido.
 * ------------------------------------------------------------------ */
function ShootingStars() {
  const { viewport } = useThree();
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 8;
    const x = c.getContext("2d")!;
    const g = x.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, "rgba(242,239,230,0)");
    g.addColorStop(0.85, "rgba(240,211,148,0.7)");
    g.addColorStop(1, "rgba(255,250,235,1)");
    x.fillStyle = g;
    x.fillRect(0, 3, 256, 2);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const pool = useMemo(
    () =>
      Array.from({ length: 3 }, () => ({
        mat: new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }),
        life: -1,
        dir: new THREE.Vector3(),
      })),
    [tex],
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const next = useRef(3 + Math.random() * 5);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = s.clock.elapsedTime;
    const fast = Math.abs(stageScroll.vel) > 0.9;
    if (t > next.current || (fast && t > next.current - 6)) {
      const i = pool.findIndex((o) => o.life < 0);
      const m = refs.current[i];
      if (i >= 0 && m) {
        const o = pool[i]!;
        o.life = 0;
        const W = viewport.width * 2.2;
        m.position.set((Math.random() * 0.8 - 0.2) * W, viewport.height * (0.9 + Math.random() * 0.5), -10 - Math.random() * 6);
        o.dir.set(-1, -0.42 - Math.random() * 0.25, 0).normalize();
        m.rotation.z = Math.atan2(o.dir.y, o.dir.x) + Math.PI;
        m.scale.set(3 + Math.random() * 3, 0.06, 1);
      }
      next.current = t + 8 + Math.random() * 7;
    }
    pool.forEach((o, i) => {
      const m = refs.current[i];
      if (!m || o.life < 0) return;
      o.life += dt;
      m.position.addScaledVector(o.dir, dt * 22);
      o.mat.opacity = Math.sin(Math.PI * Math.min(1, o.life / 1.3)) * 0.9;
      if (o.life > 1.3) {
        o.life = -1;
        o.mat.opacity = 0;
      }
    });
  });

  return (
    <>
      {pool.map((o, i) => (
        <mesh
          key={i}
          ref={(m) => {
            refs.current[i] = m;
          }}
          material={o.mat}
        >
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </>
  );
}

/* Constelações finas em linhas douradas muito sutis, no fundo do infinito. */
function Constellations({ mobile }: { mobile: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { lines, dots } = useMemo(() => {
    const seg: number[] = [];
    const pts: number[] = [];
    const n = mobile ? 4 : 7;
    for (let c = 0; c < n; c++) {
      const cx = (Math.random() - 0.5) * 44;
      const cy = (Math.random() - 0.5) * 24;
      const cz = -20 - Math.random() * 8;
      let prev = new THREE.Vector3(cx, cy, cz);
      pts.push(prev.x, prev.y, prev.z);
      const k = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < k; i++) {
        const nx = prev.clone().add(new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 4, 0));
        seg.push(prev.x, prev.y, prev.z, nx.x, nx.y, nx.z);
        pts.push(nx.x, nx.y, nx.z);
        prev = nx;
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    const lines = new THREE.LineSegments(
      lg,
      new THREE.LineBasicMaterial({ color: "#C8A25A", transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }),
    );
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const dots = new THREE.Points(
      dg,
      new THREE.PointsMaterial({ color: "#F6DFA8", size: 0.14, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }),
    );
    return { lines, dots };
  }, [mobile]);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.z = s.clock.elapsedTime * 0.004 + stageScroll.p * 0.25;
    ref.current.position.y = stageScroll.p * 6;
  });
  return (
    <group ref={ref}>
      <primitive object={lines} />
      <primitive object={dots} />
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
        <Constellations mobile={mobile} />
        <ShootingStars />
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
