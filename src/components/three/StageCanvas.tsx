import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { EXPERIENCE, dispersionEnvelope, eclipseClearance, haloFit, eclipseState, portalLayout, portalSequence, sectionChoreography, type TextSide, type ReadingBounds } from "./experienceRules";
import { SceneReadiness } from "./SceneReadiness";
import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { brushedTexture, createStarShape, createVShape } from "./shapes";
import { stageScroll, startStageScroll } from "./stageScroll";
import fontJson from "./vittoriFont.json";

/**
 * Universo único da Vittori: a MESMA cena serve o portal e o site.
 * Portal: VITTORI em ouro 3D fino + estrela ✦ abaixo, varredura de luz.
 * Clique: palavra e estrela viram poeira, a câmera mergulha, o V nasce em
 * partículas com eclipse e contraluz. O V nunca é renderizado sólido.
 */

type Key = { p: number; v: number[] };
/* [x, y, z, rotX, rotY, escala] do V interno ao longo do scroll (x/y em fração da tela). */
const KEYS: Key[] = [
  { p: 0, v: [0.2, 0.02, -1, 0, -0.2, 1] },
  { p: 0.12, v: [0.22, 0, -1, 0.06, -0.45, 1] },
  { p: 0.32, v: [0.24, 0, -2, 0.04, -0.5, 1.05] },
  { p: 0.55, v: [0.24, 0, -3, -0.05, -1.2, 0.95] },
  { p: 0.78, v: [0.05, 0.05, -9, 0, 0.3, 0.85] },
  { p: 1, v: [0, 0.04, -1.5, 0, 0, 1.05] },
];
const KEYS_MOBILE_X = 0; // no celular o V fica centrado atrás do texto

const BG = "#1a060f";
const mouse = { x: 0, y: 0 };

function setUniform(uniforms: Record<string, THREE.IUniform>, name: string, value: number) {
  const uniform = uniforms[name];
  if (uniform) uniform.value = value;
}


function sample(p: number): number[] {
  let a = KEYS[0] ?? { p: 0, v: [0, 0, 0, 0, 0, 1] };
  let b = KEYS[KEYS.length - 1] ?? a;
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= (KEYS[i]?.p ?? 0) && p <= (KEYS[i + 1]?.p ?? 1)) {
      a = KEYS[i] ?? a;
      b = KEYS[i + 1] ?? b;
      break;
    }
  }
  const raw = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p || 1)));
  const t = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2;
  return a.v.map((v, i) => v + ((b.v[i] ?? v) - v) * t);
}

const damp = (c: number, t: number, k: number, dt: number) => c + (t - c) * (1 - Math.exp(-k * dt));
const sm = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ------------------------------------------------------------------ *
 * Nuvem de pontos amostrada de superfícies (dissolver / montar)
 * ------------------------------------------------------------------ */
const ptVert = /* glsl */ `
attribute vec3 aDir;
attribute float aRand;
uniform float uScatter;
uniform float uTime;
uniform float uSize;
varying float vR;
void main() {
  float s = uScatter * (1.0 + aRand * 0.6);
  vec3 p = position + aDir * s * (2.0 + aRand * 9.0);
  p += vec3(sin(uTime * 0.9 + aRand * 40.0), cos(uTime * 0.7 + aRand * 30.0), sin(uTime * 0.5 + aRand * 12.0)) * 0.01 * (1.0 + s * 10.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vR = aRand;
  gl_PointSize = uSize * (0.4 + aRand * 0.9) / max(0.2, -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const ptFrag = /* glsl */ `
uniform vec3 uColor;
uniform float uAlpha;
uniform float uTime;
varying float vR;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(0.0, 0.5, d);
  float tw = 0.6 + 0.4 * sin(uTime * (1.5 + vR * 3.0) + vR * 60.0);
  gl_FragColor = vec4(uColor * (1.0 + vR * 0.6), a * a * uAlpha * tw);
}`;

function samplePoints(meshes: THREE.Mesh[], total: number, forward: number, size: number, color: string) {
  const pos = new Float32Array(total * 3);
  const dir = new Float32Array(total * 3);
  const rnd = new Float32Array(total);
  const v = new THREE.Vector3();
  const areas = meshes.map((m) => {
    m.geometry.computeBoundingBox();
    const b = m.geometry.boundingBox;
    if (!b) return 0;
    return (b.max.x - b.min.x) * (b.max.y - b.min.y) * m.scale.x * m.scale.y;
  });
  const sum = areas.reduce((a, b) => a + b, 0);
  let k = 0;
  meshes.forEach((m, mi) => {
    const s = new MeshSurfaceSampler(m).build();
    const n = mi === meshes.length - 1 ? total - k : Math.round((total * (areas[mi] ?? 0)) / sum);
    for (let i = 0; i < n && k < total; i++, k++) {
      s.sample(v);
      v.applyMatrix4(m.matrix);
      pos.set([v.x, v.y, v.z], k * 3);
      const d = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 + forward).normalize();
      dir.set([d.x, d.y, d.z], k * 3);
      rnd[k] = Math.random();
    }
  });
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
 * PORTAL: VITTORI em ouro, chanfro fino, estrela ✦ centrada abaixo
 * ------------------------------------------------------------------ */
function Portal({ mobile }: { mobile: boolean }) {
  const { viewport, size, gl, camera } = useThree();
  const group = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Group>(null);
  const starRef = useRef<THREE.Mesh>(null);
  const sweepUniforms = useMemo(() => ({ uSweepX: { value: -10 }, uSweepWidth: { value: 1 }, uGlintTime: { value: 0 }, uGlintStrength: { value: 2.8 } }), []);
  const intro = useRef(0);

  const mats = useMemo(() => {
    const brushed = brushedTexture();
    const face = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#D8B46C"),
      metalness: 1,
      roughness: 0.62,
      roughnessMap: brushed,
      emissive: new THREE.Color("#3a2408"),
      emissiveIntensity: 0.12,
      clearcoat: 0.15,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.15,
    });
    const side = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8F6A2C"),
      metalness: 1,
      roughness: 0.32,
      envMapIntensity: 1.6,
    });
    face.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, sweepUniforms);
      shader.vertexShader = "varying float vSweepX; varying vec2 vMetalPosition;\n" + shader.vertexShader.replace("#include <begin_vertex>", "#include <begin_vertex>\nvSweepX = (modelMatrix * vec4(position, 1.0)).x; vMetalPosition = position.xy + vec2(modelMatrix[3].x, 0.0);");
      shader.fragmentShader = "varying float vSweepX; varying vec2 vMetalPosition; uniform float uSweepX; uniform float uSweepWidth; uniform float uGlintTime; uniform float uGlintStrength;\n" + shader.fragmentShader.replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
float sweepMask = exp(-pow((vSweepX - uSweepX) / uSweepWidth, 2.0));
totalEmissiveRadiance += vec3(0.84, 0.63, 0.30) * sweepMask * ${EXPERIENCE.sweepStrength.toFixed(2)};
// Original moving lights were removed in 3552c090. Recover only tiny,
// short reflections here, without adding lights or raising metal exposure.
vec2 cell = floor(vMetalPosition * 5.0);
float seed = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
vec2 center = 0.2 + 0.6 * vec2(seed, fract(seed * 41.7));
vec2 glintDelta = fract(vMetalPosition * 5.0) - center;
float glintDot = exp(-dot(glintDelta, glintDelta) * 240.0);
float glintRay = exp(-abs(glintDelta.x) * 110.0 - abs(glintDelta.y) * 24.0)
  + exp(-abs(glintDelta.y) * 110.0 - abs(glintDelta.x) * 24.0);
float glintPulse = pow(max(0.0, sin(uGlintTime * 1.6 + seed * 60.0)), 12.0);
totalEmissiveRadiance += vec3(0.95, 0.83, 0.57) * (glintDot + glintRay * 0.18) * glintPulse * step(0.72, seed) * uGlintStrength;`);
    };
    face.customProgramCacheKey = () => "vittori-metal-sweep-glints-v4";
    return [face, side];
  }, [sweepUniforms]);

  const { letters, width, wordBottom, wordTop, pts, starPts, starGeo } = useMemo(() => {
    const font = new Font(fontJson as never);
    const tracking = 0.1;
    const glyphs = (fontJson as { glyphs: Record<string, { ha: number }> }).glyphs;
    let x = 0;
    const out: { geo: THREE.ExtrudeGeometry; x: number }[] = [];
    for (const ch of "VITTORI") {
      const geo = new THREE.ExtrudeGeometry(font.generateShapes(ch, 1), {
        depth: 0.06,
        bevelEnabled: true,
        bevelThickness: 0.018,
        bevelSize: 0.009,
        bevelSegments: 6,
        curveSegments: mobile ? 8 : 14,
      });
      out.push({ geo, x });
      x += (glyphs[ch]?.ha ?? 600) / 1000 + tracking;
    }
    const w = x - tracking;
    const placed = out.map((l) => ({ ...l, x: l.x - w / 2 }));
    const tmp = placed.map((l) => {
      const m = new THREE.Mesh(l.geo);
      m.position.set(l.x, -0.32, -0.03);
      m.updateMatrix();
      return m;
    });
    const starGeo = new THREE.ExtrudeGeometry(createStarShape(0.22), {
      depth: 0.03,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4,
    }).center();
    const bounds = new THREE.Box3();
    tmp.forEach((mesh) => bounds.expandByObject(mesh));
    const sm_ = new THREE.Mesh(starGeo);
    sm_.scale.setScalar(mobile ? 0.34 : 0.2);
    sm_.updateMatrix();
    const pts = samplePoints(tmp, mobile ? 1800 : 6500, 1.8, 22 * gl.getPixelRatio(), "#F3D79A");
    const starPts = samplePoints([sm_], mobile ? 180 : 500, 1.8, 22 * gl.getPixelRatio(), "#F3D79A");
    return { letters: placed, width: bounds.max.x - bounds.min.x, wordBottom: bounds.min.y, wordTop: bounds.max.y, pts, starPts, starGeo };
  }, [mobile, gl]);
  useEffect(() => () => {
    letters.forEach((l) => l.geo.dispose());
    starGeo.dispose();
    [pts, starPts].forEach((p) => { p.geometry.dispose(); (p.material as THREE.Material).dispose(); });
    mats.forEach((m) => { if (m instanceof THREE.MeshPhysicalMaterial) m.roughnessMap?.dispose(); m.dispose(); });
  }, [letters, starGeo, pts, starPts, mats]);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = s.clock.elapsedTime;
    const dive = stageScroll.dive;
    const g = group.current;
    if (!g) return;
    const elapsed = stageScroll.portalStartedAt === null ? null : t - stageScroll.portalStartedAt;
    const sequence = portalSequence(elapsed);
    if (stageScroll.portalStep !== sequence.step) {
      stageScroll.portalStep = sequence.step;
      window.dispatchEvent(new Event("vittori-portal-progress"));
    }
    intro.current = sequence.word;
    const i = intro.current;
    g.visible = dive < 0.98;
    if (!g.visible) return;

    const layout = portalLayout({ width: size.width, height: size.height, worldWidth: viewport.width, worldHeight: viewport.height, wordWidth: width, wordBottom, wordTop, starRadius: mobile ? 0.34 : 0.2, safeTop: stageScroll.portalSafeTop || size.height * (mobile ? 0.6 : 0.68), mobile });
    g.scale.setScalar(layout.fit * (0.96 + 0.04 * i));
    g.position.set(0, layout.groupY + Math.sin(t * 0.45) * 0.012, -0.35 * (1 - i));
    if (starRef.current) starRef.current.position.y = layout.starY;
    starPts.position.y = layout.starY;
    g.rotation.x = damp(g.rotation.x, -0.04 + mouse.y * 0.08, 2.2, dt);
    g.rotation.y = damp(g.rotation.y, mouse.x * 0.14, 2.2, dt);

    const solidO = sm(0.0, 1.0, i) * (1 - sm(0.02, 0.22, dive));
    fade(mats, solidO);
    if (solid.current) solid.current.visible = solidO > 0.01;
    if (starRef.current) {
      starRef.current.scale.setScalar((mobile ? 0.34 : 0.2) * sequence.star);
      starRef.current.visible = sequence.star > 0;
      starRef.current.rotation.y = Math.sin(t * 0.6) * 0.3;
      starRef.current.rotation.z = t * 0.05;
    }

    for (const cloud of [pts, starPts]) {
      const u = (cloud.material as THREE.ShaderMaterial).uniforms;
      setUniform(u, "uTime", t);
      setUniform(u, "uScatter", (1 - i) * 0.5 + sm(0.03, 0.75, dive) * 1.4);
      setUniform(u, "uAlpha", (0.06 * (cloud === starPts ? sequence.star : i) + 1.3 * sm(0.0, 0.18, dive)) * (1 - sm(0.55, 0.92, dive)));
    }
    const c = (t % EXPERIENCE.sweepSeconds) / EXPERIENCE.sweepSeconds;
    sweepUniforms.uSweepX.value = (-0.6 + c * 1.2) * width * layout.fit;
    sweepUniforms.uSweepWidth.value = width * layout.fit * 0.16;
    sweepUniforms.uGlintTime.value = elapsed ?? 0;

    // Mergulho da câmera: avança pelo cenário e abre o campo de visão.
    const cam = camera as THREE.PerspectiveCamera;
    const k = Math.sin(Math.PI * Math.min(1, dive));
    cam.position.z = 8 - 5.5 * k;
    cam.fov = 45 + 22 * k;
    cam.updateProjectionMatrix();
  });

  return (
    <group ref={group}>
      <group ref={solid}>
        {letters.map((l, i) => (
          <mesh key={i} geometry={l.geo} material={mats} position={[l.x, -0.32, -0.03]} />
        ))}
        <mesh ref={starRef} geometry={starGeo} material={mats} position={[0, -0.84, 0]} scale={mobile ? 0.34 : 0.2} />
      </group>
      <primitive object={pts} />
      <primitive object={starPts} />
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * V interno: só partículas + eclipse com contraluz
 * ------------------------------------------------------------------ */
const eclVert = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
/**
 * Halo aprovado na prévia de 05/11: eclipse de frente, atrás do V, com o anel feito de
 * partículas (miolo denso + partículas que saem do anel + filamentos de coroa + poeira).
 * No ápice da dispersão ele vira a linha luminosa nítida e inclinada (uCore = 1).
 */
const HALO = { def: 85, bri: 1.1, pts: 14000, tilt: 0, size: 1, apex: 1, read: 0.5 } as const;

/* Resplendor por baixo das partículas; no ápice desenha a linha nítida (uCore). */
const ringFrag = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform float uK;
uniform float uGlow;
uniform float uRead;
uniform float uPeak;
uniform float uCore;
void main() {
  vec2 p = (vUv - 0.5) * 3.0;
  float r = length(p);
  float ang = atan(p.y, p.x);
  float k = mix(uK, uK * 0.3, uRead);
  float core = exp(-pow((r - 1.0) * k, 2.0)) * uCore;
  float near = mix(exp(-pow((r - 1.0) * k * 0.16, 2.0)) * 0.22, exp(-pow((r - 1.0) * k * 0.22, 2.0)) * 0.30, uCore);
  float far = exp(-pow((r - 1.0) * 2.6, 2.0)) * (0.06 + 0.10 * uPeak);
  float inner = exp(-r * r * 3.0) * 0.035 * uPeak;
  float sweep = 0.55 + 0.45 * pow(0.5 + 0.5 * cos(ang - uTime * 0.35), 3.0);
  float shimmer = 0.92 + 0.08 * sin(ang * 23.0 + uTime * 1.7);
  vec3 gold = vec3(0.96, 0.74, 0.36);
  vec3 champagne = vec3(1.0, 0.93, 0.78);
  vec3 rose = vec3(0.95, 0.52, 0.48);
  vec3 tint = mix(gold, rose, 0.22 * (0.5 + 0.5 * sin(ang + 1.3)));
  vec3 col = mix(tint, champagne, core * 0.7) * (core * 2.6 * sweep * shimmer + near * sweep) + gold * (far + inner);
  float edge = 1.0 - smoothstep(1.32, 1.5, r);
  gl_FragColor = vec4(col * uGlow * edge, 1.0);
}`;

const haloVert = /* glsl */ `
attribute float aAng; attribute float aOff; attribute float aZ; attribute float aRand;
attribute float aLift; attribute float aBand; attribute float aG;
uniform float uTime; uniform float uSpread; uniform float uSize; uniform float uSwirl; uniform float uBand;
varying float vR; varying float vFade; varying float vBand; varying float vLife;
void main() {
  bool isRing = aBand > 0.5; bool isEmit = aBand > 1.5;
  float dir = isRing ? 1.0 : (aOff > 0.0 ? 1.0 : -0.6);
  float a = aAng + uTime * (0.04 + aRand * 0.08) * dir + uSwirl * (0.6 + aRand);
  float life = fract(uTime * (0.05 + aRand * 0.07) + aRand * 13.0);
  vLife = isEmit ? life : 0.0;
  float core = aG * uBand * (abs(aG) < 1.0 ? 1.0 : 1.6);
  float baseOff = isRing ? core + (isEmit ? pow(life, 1.4) * (0.35 + aRand * 0.4) * (aG > -0.4 ? 1.0 : -0.35) : 0.0) : aOff;
  float off = baseOff * (1.0 + uSpread * (aBand > 0.5 ? 6.0 + aRand * 10.0 : 2.2 + aRand * 3.0));
  float r = 1.0 + off;
  vec3 p = vec3(cos(a) * r, sin(a) * r, aZ * (1.0 + uSpread * 2.5));
  p.z += aLift * uSpread * 1.6;
  p += vec3(sin(uTime * 0.6 + aRand * 40.0), cos(uTime * 0.5 + aRand * 20.0), 0.0) * (isRing ? 0.003 : 0.012) * (1.0 + uSpread * 6.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vR = aRand; vBand = aBand; vFade = exp(-abs(off) * 1.4);
  float sz = isEmit ? (0.25 + aRand * 0.45) : isRing ? (0.30 + aRand * 0.35) : (0.25 + aRand * aRand * 1.1);
  gl_PointSize = uSize * sz / max(0.2, -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const haloFrag = /* glsl */ `
uniform float uAlpha; uniform float uTime; uniform float uRingBright;
varying float vR; varying float vFade; varying float vBand; varying float vLife;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(0.0, 0.5, d);
  float tw = 0.55 + 0.45 * sin(uTime * (1.2 + vR * 3.5) + vR * 70.0);
  vec3 gold = mix(vec3(0.95, 0.72, 0.38), vec3(1.0, 0.92, 0.75), vR);
  vec3 col = vBand > 0.5 ? mix(vec3(1.0, 0.86, 0.58), vec3(1.0, 0.96, 0.86), vR) * 2.2 * uRingBright : gold * 1.4;
  float alpha = vBand > 0.5 ? a * uAlpha * (0.75 + 0.25 * tw) : a * a * uAlpha * tw * (0.35 + 0.65 * vFade);
  if (vBand > 1.5) alpha *= pow(1.0 - vLife, 1.6) * 0.9;
  gl_FragColor = vec4(col, alpha);
}`;

function haloPoints(count: number, px: number) {
  const n = Math.max(0, Math.round(count));
  const ang = new Float32Array(n), off = new Float32Array(n), z = new Float32Array(n), rnd = new Float32Array(n);
  const lift = new Float32Array(n), band = new Float32Array(n), gs = new Float32Array(n);
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const rays = Array.from({ length: 22 }, (_, i) => (i / 22) * Math.PI * 2 + Math.sin(i * 12.9898) * 0.12);
  for (let i = 0; i < n; i++) {
    rnd[i] = Math.random();
    lift[i] = -Math.random() * Math.random(); // a poeira só escapa para trás, nunca à frente do V
    if (i < n * 0.45) { band[i] = 1; ang[i] = Math.random() * Math.PI * 2; gs[i] = gauss(); z[i] = gauss() * 0.012; }
    else if (i < n * 0.65) { band[i] = 2; ang[i] = Math.random() * Math.PI * 2; gs[i] = gauss() * 0.8; z[i] = -Math.abs(gauss()) * 0.03; }
    else if (i < n * 0.8) { ang[i] = (rays[Math.floor(Math.random() * rays.length)] ?? 0) + gauss() * 0.025; off[i] = 0.03 - Math.log(Math.random()) * 0.16; z[i] = gauss() * 0.03; }
    else { ang[i] = Math.random() * Math.PI * 2; const g = gauss(); off[i] = g * (g > 0 ? 0.13 : 0.05) + (Math.random() < 0.2 ? Math.random() * 0.5 : 0); z[i] = gauss() * 0.05; }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  ([["aAng", ang], ["aOff", off], ["aZ", z], ["aRand", rnd], ["aLift", lift], ["aBand", band], ["aG", gs]] as const)
    .forEach(([name, data]) => g.setAttribute(name, new THREE.BufferAttribute(data, 1)));
  const mat = new THREE.ShaderMaterial({
    vertexShader: haloVert, fragmentShader: haloFrag, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uSpread: { value: 0 }, uAlpha: { value: 0 }, uSize: { value: 26 * px }, uSwirl: { value: 0 }, uBand: { value: 1.1 / HALO.def }, uRingBright: { value: HALO.bri } },
  });
  const pts = new THREE.Points(g, mat);
  pts.frustumCulled = false;
  pts.renderOrder = 1;
  return pts;
}

function Monogram({ mobile }: { mobile: boolean }) {
  const { viewport, gl, camera } = useThree();
  const vGroup = useRef<THREE.Group>(null);
  const eclGroup = useRef<THREE.Group>(null);
  const stars = useRef<(THREE.Mesh | null)[]>([]);
  const tiltGroup = useRef<THREE.Group>(null);
  const vMask = useRef<THREE.Mesh>(null);
  const swirl = useRef(0);
  const spin = useRef(0);
  const born = useRef(0);
  const formationStart = useRef<number | null>(null);
  const reading = useRef(0);
  const section = useRef<TextSide>("none");
  const protectedBounds = useRef<ReadingBounds[] | undefined>(undefined);
  const haloFitLevel = useRef(1);
  const dispersionLevel = useRef(0);
  const eclWorld = useMemo(() => new THREE.Vector3(), []);
  const eclTmp = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    let elements: HTMLElement[] = [];
    let zones: HTMLElement[] = [];
    let frame = 0;
    const measure = () => {
      frame = 0;
      const w = window.innerWidth, h = window.innerHeight;
      const bounds = zones.filter(el => el.getBoundingClientRect().height > 0).map(el => {
        const r = el.getBoundingClientRect();
        return { left: r.left / w, right: r.right / w, top: r.top / h, bottom: r.bottom / h };
      });
      protectedBounds.current = bounds;
      section.current = "none";
      for (const el of elements) {
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.6 && r.bottom > h * 0.4) {
          section.current = el.dataset["stageSection"] as TextSide;
          break;
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    const discover = () => {
      resize.disconnect();
      elements = Array.from(document.querySelectorAll<HTMLElement>("[data-stage-section]"));
      zones = Array.from(document.querySelectorAll<HTMLElement>("[data-stage-zone], main :is(h1,h2,h3,p,ul,ol,.glass):not([data-stage-zone]), footer :is(p,nav)"));
      zones.forEach(el => resize.observe(el));
      schedule();
    };
    const mutations = new MutationObserver(discover);
    mutations.observe(document.querySelector("main") ?? document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    discover();
    return () => { resize.disconnect(); mutations.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  const vPts = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(createVShape(), { depth: 0.3, bevelEnabled: false }).center();
    const m = new THREE.Mesh(geo);
    m.updateMatrix();
    const points = samplePoints([m], mobile ? 2600 : 6000, 0, 40 * gl.getPixelRatio(), "#F3D79A");
    geo.dispose();
    // The V particles are drawn last and never depth-tested, so the eclipse mask cannot hide them.
    (points.material as THREE.ShaderMaterial).depthTest = false;
    points.renderOrder = 3;
    return points;
  }, [mobile, gl]);
  // Eclipse mask: the V silhouette writes depth only, so the ring behind it is hidden by the V.
  const maskGeo = useMemo(() => new THREE.ExtrudeGeometry(createVShape(), { depth: 0.3, bevelEnabled: false }).center(), []);
  const maskMat = useMemo(() => new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true }), []);
  const ring = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: eclVert,
        fragmentShader: ringFrag,
        transparent: true,
        depthWrite: false,
        fog: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uK: { value: HALO.def }, uGlow: { value: 0 }, uRead: { value: 0 }, uPeak: { value: 0 }, uCore: { value: 0 } },
      }),
    [],
  );
  const halo = useMemo(() => haloPoints(HALO.pts * (mobile ? 0.45 : 1), gl.getPixelRatio()), [mobile, gl]);
  useEffect(() => () => { halo.geometry.dispose(); (halo.material as THREE.Material).dispose(); }, [halo]);
  useEffect(() => () => { maskGeo.dispose(); maskMat.dispose(); ring.dispose(); }, [maskGeo, maskMat, ring]);
  const starMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F0D394",
        metalness: 1,
        roughness: 0.14,
        envMapIntensity: 3,
        emissive: new THREE.Color("#5a3a10"),
        emissiveIntensity: 0.5,
      }),
    [],
  );
  const sGeo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(createStarShape(0.24), {
        depth: 0.04,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
      }).center(),
    [],
  );

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = s.clock.elapsedTime;
    const p = stageScroll.p;
    const vg = vGroup.current;
    if (!vg) return;
    const appear = sm(0.5, 1, stageScroll.dive);
    vg.visible = appear > 0.001;
    if (!vg.visible) return;
    if (stageScroll.dive > 0.65 && formationStart.current === null) formationStart.current = t;
    born.current = formationStart.current === null ? 0 : sm(0, 2.1, t - formationStart.current);
    spin.current = damp(spin.current, stageScroll.vel, 2.2, dt);
    stageScroll.vel = damp(stageScroll.vel, 0, 3, dt);

    const [x, y, z, rx, ry, sc] = sample(p);
    const dispersionTarget = Math.max(sm(0.18, 0.32, p) * (1 - sm(0.52, 0.66, p)), Math.min(1, Math.abs(spin.current) * 1.2));
    dispersionLevel.current = dispersionEnvelope(dispersionLevel.current, dispersionTarget, dt);
    const dispersion = dispersionLevel.current;
    const peakNow = sm(0.2, 0.9, dispersion);
    // Deterministic composition: placement depends only on scroll progress and the
    // section type, never on measured free space (that search made the V and the
    // eclipse hop between pockets). Measured text boxes only modulate light (haloFit).
    const chor = sectionChoreography(section.current, mobile);
    reading.current = damp(reading.current, chor.readingSafety, 2.2, dt);
    const targetX = chor.active ? chor.x : mobile ? KEYS_MOBILE_X : x ?? 0;
    const targetScale = (sc ?? 1) * (chor.active ? chor.scale : 1);
    const base = Math.min(viewport.height * (mobile ? 0.22 : 0.27), viewport.width * (mobile ? 0.34 : 0.2));
    vg.position.z = damp(vg.position.z, (z ?? 0) - Math.abs(spin.current) * 0.8 + (chor.active ? chor.zOffset : 0), 2.2, dt);
    const plane = protectedBounds.current && chor.active ? viewport.getCurrentViewport(camera, vg.position) : viewport;
    // The V keeps its own trajectory and scale; the pocket never shrinks or moves it.
    vg.scale.setScalar(damp(vg.scale.x || base, base * targetScale, 3, dt));
    vg.position.x = damp(vg.position.x, plane.width * targetX, 2.2, dt);
    vg.position.y = damp(vg.position.y, plane.height * (chor.active ? chor.y : (y ?? 0) + (mobile ? 0.12 : 0)) + Math.sin(t * 0.5) * 0.06, 2.6, dt);
    vg.rotation.x = damp(vg.rotation.x, (rx ?? 0) + mouse.y * 0.18, 2.6, dt);
    vg.rotation.y = damp(vg.rotation.y, (ry ?? 0) + mouse.x * 0.32 + spin.current * 0.35, 2.4, dt);

    // Eclipse: deep behind the V and centred on it on screen (the perspective shift of the
    // deeper plane is compensated by kP), so the V sits exactly in the middle of the ring.
    // apexMix 0 = frontal ring of particles; 1 = the approved bright tilted ring at the peak.
    const eg = eclGroup.current;
    const apexMix = sm(0.45, 0.92, dispersion);
    swirl.current += spin.current * dt * 0.8;
    if (eg) {
      eg.visible = vg.visible;
      const zH = vg.position.z - 1.6 * vg.scale.x;
      const camZ = camera.position.z;
      const kP = (camZ - zH) / Math.max(0.5, camZ - vg.position.z);
      eg.position.set(vg.position.x * kP, vg.position.y * kP, zH);
      eg.scale.setScalar(Math.max(0.0001, vg.scale.x * 1.2 * HALO.size * (1 + 0.55 * peakNow) * kP));
    }
    const tg = tiltGroup.current;
    if (tg) {
      const mix = (a: number, b: number) => a + (b - a) * apexMix;
      tg.rotation.x = mix(-(0.02 + 0.14 * peakNow) * HALO.tilt + mouse.y * 0.05 - spin.current * 0.12, -(0.3 + 0.7 * peakNow) * 1.05 + mouse.y * 0.12);
      tg.rotation.y = mix(mouse.x * 0.07 + spin.current * 0.1, 0.18 + mouse.x * 0.2 + p * 3);
      tg.rotation.z = mix(t * 0.02 + p * 2.2, t * 0.03 + p * 2.9) + swirl.current * 0.2;
    }
    if (vMask.current) {
      vMask.current.scale.setScalar(Math.max(0.0001, 1 - sm(0.08, 0.4, dispersion)));
      vMask.current.visible = born.current > 0.5 && dispersion < 0.4;
    }

    // Partículas: chegam espalhadas do mergulho e se montam; respiram nos Serviços.
    const breathe = sm(0.18, 0.32, p) * (1 - sm(0.52, 0.66, p)) * 0.18;
    // The dispersion peak is the approved climax: reading protection releases half of
    // its dimming there, and fully returns as the peak fades into the next sections.
    const choreography = eclipseState(appear, dispersion, reading.current * (1 - 0.5 * peakNow));
    let fit = { scale: 1 };
    if (protectedBounds.current && eg) {
      eclWorld.copy(eg.position);
      const currentPlane = viewport.getCurrentViewport(camera, eclWorld);
      const radius = eg.scale.x / currentPlane.height;
      eclTmp.copy(eclWorld).project(camera);
      fit = haloFit(eclipseClearance(protectedBounds.current, (eclTmp.x + 1) / 2, (1 - eclTmp.y) / 2, viewport.aspect), radius);
    }
    const u = (vPts.material as THREE.ShaderMaterial).uniforms;
    setUniform(u, "uTime", t);
    setUniform(u, "uScatter", (1 - born.current) * 0.9 + breathe + 0.35 * sm(0.2, 0.9, dispersion) + Math.abs(spin.current) * 0.1);
    setUniform(u, "uAlpha", choreography.particleAlpha * (1 - chor.dim * reading.current) * (mobile ? 0.8 : 1.25));

    // Halo light: discreet backlight in formation, full at the dispersion peak, receding while
    // reading. Near text it only dims (haloFit); it never moves or shrinks to dodge it.
    haloFitLevel.current = damp(haloFitLevel.current, 0.55 + 0.45 * fit.scale, 2, dt);
    const readEff = reading.current * (1 - choreography.peak) * HALO.read;
    const light = born.current * appear * haloFitLevel.current;
    const ru = ring.uniforms;
    setUniform(ru, "uTime", t);
    setUniform(ru, "uRead", readEff);
    setUniform(ru, "uPeak", choreography.peak);
    setUniform(ru, "uCore", apexMix);
    setUniform(ru, "uGlow", light * HALO.bri * (0.4 + 0.6 * choreography.peak) * (1 - 0.55 * readEff));
    const hu = (halo.material as THREE.ShaderMaterial).uniforms;
    setUniform(hu, "uTime", t);
    setUniform(hu, "uSpread", dispersion * HALO.apex);
    setUniform(hu, "uSwirl", swirl.current);
    setUniform(hu, "uAlpha", light * (0.55 + 0.45 * dispersion) * (1 - 0.5 * readEff) * (mobile ? 0.8 : 1));

    stars.current.forEach((m, i) => {
      if (!m) return;
      const a = t * (0.32 + i * 0.07) + i * 2.1 + p * 6;
      m.position.set(Math.cos(a) * 1.9 * (1 - i * 0.12), Math.sin(a * 1.3) * 0.7 + (i - 1) * 0.2, Math.sin(a) * 1.2);
      m.rotation.z += dt * (0.6 + i * 0.2);
      m.rotation.y += dt * 0.3;
      m.visible = appear > 0.6;
    });
  });

  return (
    <>
      <group ref={eclGroup} visible={false}>
        <group ref={tiltGroup}>
          <mesh material={ring} scale={3} renderOrder={1}>
            <planeGeometry args={[1, 1]} />
          </mesh>
          <primitive object={halo} />
        </group>
      </group>
      <group ref={vGroup} visible={false}>
      <mesh ref={vMask} geometry={maskGeo} material={maskMat} renderOrder={0} />
      <primitive object={vPts} />
      {[0.2, 0.13, 0.09].map((sc, i) => (
        <mesh
          key={i}
          ref={(m) => {
            stars.current[i] = m;
          }}
          geometry={sGeo}
          material={starMat}
          scale={sc}
        />
      ))}
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Nebulosa: gradientes bordô profundos em movimento (fundo infinito)
 * ------------------------------------------------------------------ */
const nebFrag = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform float uTravel;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*n(p); p*=2.03; a*=0.5; } return v; }
void main(){
  vec2 uv = vUv - 0.5;
  vec2 q = uv * 3.2 + vec2(uTime * 0.004, uTravel * 0.025);
  vec2 warp = vec2(fbm(q + vec2(1.7, 8.2)), fbm(q + vec2(8.3, 2.8)));
  float f = fbm(q + 1.8 * warp);
  float massA = exp(-length((uv - vec2(-0.28, 0.18)) * vec2(2.0, 3.2)) * 2.0);
  float massB = exp(-length((uv - vec2(0.30, -0.08)) * vec2(3.4, 1.8)) * 2.0);
  float massC = exp(-length((uv - vec2(0.08, 0.33)) * 4.0) * 2.0);
  vec3 deep = vec3(0.013, 0.003, 0.005);
  vec3 wine = vec3(0.14, 0.012, 0.026);
  vec3 bordo = vec3(0.25, 0.025, 0.045);
  float density = smoothstep(0.30, 0.78, f);
  vec3 col = deep + wine * density * massA + bordo * density * massB * 0.62;
  col += vec3(0.085, 0.020, 0.027) * pow(f, 3.0) * massC;
  col *= 1.0 - smoothstep(0.28, 0.75, length(uv)) * 0.55;
  gl_FragColor = vec4(col, 1.0);
}`;

function Nebula() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: eclVert,
        fragmentShader: nebFrag,
        depthWrite: false,
        fog: false,
        uniforms: { uTime: { value: 0 }, uTravel: { value: 0 } },
      }),
    [],
  );
  useFrame((s) => {
    setUniform(mat.uniforms, "uTime", s.clock.elapsedTime);
    setUniform(mat.uniforms, "uTravel", stageScroll.p * 6 + stageScroll.dive * 2);
  });
  return (
    <mesh position={[0, 0, -40]} material={mat} renderOrder={-1}>
      <planeGeometry args={[110, 70]} />
    </mesh>
  );
}

/* Estrelas distantes cintilantes (campo fixo muito ao fundo). */
function TwinkleField({ count }: { count: number }) {
  const { gl } = useThree();
  const pts = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos.set([(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 50, -30 - Math.random() * 8], i * 3);
      rnd[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPx: { value: gl.getPixelRatio() } },
      vertexShader: `attribute float aRand; uniform float uTime; uniform float uPx; varying float vA; varying float vR;
        void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0);
          vA = pow(0.5 + 0.5 * sin(uTime * (0.6 + aRand * 2.4) + aRand * 80.0), 3.0);
          vR = aRand; gl_PointSize = uPx * (1.5 + aRand * aRand * 5.0); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying float vA; varying float vR;
        void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c);
          float core = 1.0 - smoothstep(0.0, 0.5, d);
          float cross = vR > 0.85 ? max(1.0 - smoothstep(0.0,0.05,abs(c.x)), 1.0 - smoothstep(0.0,0.05,abs(c.y))) * (1.0 - smoothstep(0.0,0.5,d)) : 0.0;
          gl_FragColor = vec4(vec3(1.0, 0.92, 0.78), (core*core + cross) * (0.25 + 0.75 * vA)); }`,
    });
    const p = new THREE.Points(g, m);
    p.frustumCulled = false;
    return p;
  }, [count, gl]);
  const ref = useRef<THREE.Points>(pts);
  useFrame((s) => {
    setUniform((pts.material as THREE.ShaderMaterial).uniforms, "uTime", s.clock.elapsedTime);
    ref.current.rotation.z = s.clock.elapsedTime * 0.003 + stageScroll.p * 0.15;
    ref.current.position.y = stageScroll.p * 4;
  });
  return <primitive object={pts} />;
}

/* ------------------------------------------------------------------ *
 * Estrelas cadentes: filamentos finos e raros
 * ------------------------------------------------------------------ */
function ShootingStars() {
  const { viewport } = useThree();
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 8;
    const x = c.getContext("2d");
    if (!x) return new THREE.CanvasTexture(c);
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
  const next = useRef(2.5 + Math.random() * 4);

  useFrame((s, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = s.clock.elapsedTime;
    if (t > next.current) {
      const i = pool.findIndex((o) => o.life < 0);
      const m = refs.current[i];
      if (i >= 0 && m) {
        const o = pool[i];
        if (!o) return;
        o.life = 0;
        const W = viewport.width * 2.2;
        m.position.set((Math.random() * 0.8 - 0.2) * W, viewport.height * (0.9 + Math.random() * 0.5), -10 - Math.random() * 6);
        o.dir.set(-1, -0.42 - Math.random() * 0.25, 0).normalize();
        m.rotation.z = Math.atan2(o.dir.y, o.dir.x) + Math.PI;
        m.scale.set(3 + Math.random() * 3, 0.05, 1);
      }
      next.current = t + 9 + Math.random() * 8;
    }
    pool.forEach((o, i) => {
      const m = refs.current[i];
      if (!m || o.life < 0) return;
      o.life += dt;
      m.position.addScaledVector(o.dir, dt * 22);
      o.mat.opacity = Math.sin(Math.PI * Math.min(1, o.life / 1.3)) * 0.85;
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

/* ------------------------------------------------------------------ *
 * Poeira cósmica em três planos: o visitante atravessa o universo
 * ------------------------------------------------------------------ */
const dustVert = /* glsl */ `
attribute float aRand;
uniform float uTravel;
uniform float uTime;
uniform float uSize;
uniform float uStretch;
varying float vA;
varying float vR;
void main() {
  vec3 p = position;
  float range = 48.0;
  p.z = mod(p.z + uTravel + 40.0, range) - 40.0;
  p.x += sin(uTime * 0.2 + aRand * 30.0) * 0.15;
  p.y += cos(uTime * 0.17 + aRand * 20.0) * 0.15;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float near = 1.0 - smoothstep(4.0, 7.5, p.z);
  float far = smoothstep(-40.0, -26.0, p.z);
  vA = near * far * (0.55 + 0.45 * sin(uTime * (1.0 + aRand * 2.5) + aRand * 50.0));
  vR = aRand;
  gl_PointSize = uSize * (0.4 + aRand) * (1.0 + uStretch) / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const dustFrag = /* glsl */ `
uniform vec3 uColor;
varying float vA;
varying float vR;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float core = 1.0 - smoothstep(0.0, 0.5, d);
  float cross = vR > 0.92 ? max(1.0 - smoothstep(0.0, 0.06, abs(c.x)), 1.0 - smoothstep(0.0, 0.06, abs(c.y))) * (1.0 - smoothstep(0.1, 0.5, d)) : 0.0;
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
        uStretch: { value: 0 },
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
    const warp = Math.sin(Math.PI * Math.min(1, stageScroll.dive));
    travel.current += dt * (0.35 + warp * 14) * speed;
    const u = (points.material as THREE.ShaderMaterial).uniforms;
    setUniform(u, "uTime", s.clock.elapsedTime);
    setUniform(u, "uTravel", travel.current + stageScroll.p * 90 * speed);
    setUniform(u, "uStretch", warp * 0.8);
    points.position.x = damp(points.position.x, -mouse.x * 0.6 * speed, 2, dt);
    points.position.y = damp(points.position.y, mouse.y * 0.4 * speed, 2, dt);
  });
  return <primitive object={points} />;
}

/* Luz dourada que segue o cursor e acende as arestas. */
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
  return <pointLight ref={ref} position={[0, 0, 3]} intensity={1.2} distance={12} color="#F3D79A" />;
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
  const mobile = useIsMobile();
  const signalReady = () => {
    wrap.current?.setAttribute("data-scene-ready", "true");
    window.dispatchEvent(new Event("vittori-scene-ready"));
  };
  const wrap = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrap} className="stage-scene absolute inset-0">
      <Canvas
        dpr={mobile ? [1, 1.2] : [1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 90 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        fallback={<span>Visualização simplificada</span>}
        onCreated={({ gl }) => { gl.toneMappingExposure = 0.7; }}
      >
        <color attach="background" args={[BG]} />
        <fogExp2 attach="fog" args={[BG, 0.035]} />
        <Rig />
        <SceneReadiness onReady={signalReady} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 7]} intensity={0.8} color="#F2DDAA" />
        <directionalLight position={[-3, 1, 8]} intensity={0.8} color="#F6E2B4" />
        <spotLight position={[-6, 4, 6]} angle={0.6} penumbra={1} intensity={6} color="#F2EFE6" />
        <spotLight position={[6, -3, 4]} angle={0.7} penumbra={1} intensity={4} color="#C8203A" />
        <CursorLight />
        <Nebula />
        <TwinkleField count={mobile ? 260 : 650} />
        <ShootingStars />
        <DustLayer count={mobile ? 500 : 1400} size={20} speed={0.4} color="#E8C27A" spread={34} />
        <DustLayer count={mobile ? 220 : 600} size={42} speed={1} color="#F6DFA8" spread={22} />
        <DustLayer count={mobile ? 50 : 120} size={110} speed={1.8} color="#D9485A" spread={16} />
        <Suspense fallback={null}>
          <Environment resolution={256}>
            <Lightformer intensity={2.5} position={[0, 4, 4]} scale={[12, 3, 1]} color="#FFF0CF" />
            <Lightformer intensity={1.6} position={[-4, 1, 6]} scale={[10, 4, 1]} color="#F6DDA6" />
            <Lightformer intensity={1.6} position={[4, 1, 6]} scale={[10, 4, 1]} color="#F6DDA6" />
            <Lightformer intensity={1.4} position={[3, -2, 4]} scale={[8, 8, 1]} color="#E4C98F" />
            <Lightformer intensity={2.5} color="#E0C48A" position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[14, 1.5, 1]} />
            <Lightformer intensity={2.4} color="#8B0F1A" position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[14, 3, 1]} />
            <Lightformer intensity={1.2} color="#3a0610" position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[20, 20, 1]} />
          </Environment>
          {!stageScroll.skipped && <Portal mobile={mobile} />}
          <Monogram mobile={mobile} />
        </Suspense>
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom mipmapBlur intensity={EXPERIENCE.bloomStrength} luminanceThreshold={1.05} luminanceSmoothing={0.25} />
          <Vignette offset={0.25} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
