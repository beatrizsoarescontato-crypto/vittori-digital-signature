import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vert = /* glsl */ `
attribute vec3 aStart;
attribute float aRand;
uniform float uTime;
uniform float uAssemble;
uniform float uScatter;
uniform float uSize;
varying float vRand;
varying float vTw;
void main() {
  vRand = aRand;
  float k = smoothstep(aRand * 0.45, aRand * 0.45 + 0.55, uAssemble);
  vec3 p = mix(aStart, position, k);
  p.x += sin(uTime * 0.7 + aRand * 40.0) * 0.012;
  p.y += cos(uTime * 0.6 + aRand * 25.0) * 0.012;
  p = mix(p, aStart * 1.6 + vec3(0.0, uScatter * 2.0, 0.0), uScatter * (0.4 + aRand * 0.6));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vTw = 0.55 + 0.45 * sin(uTime * (1.5 + aRand * 3.0) + aRand * 60.0);
  gl_PointSize = uSize * (0.5 + aRand) / -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const frag = /* glsl */ `
uniform float uOpacity;
varying float vRand;
varying float vTw;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  vec3 gold = vec3(1.0, 0.86, 0.58);
  vec3 ivory = vec3(1.0, 0.97, 0.9);
  vec3 rose = vec3(0.95, 0.45, 0.42);
  vec3 c = vRand > 0.92 ? rose : mix(gold, ivory, vRand);
  gl_FragColor = vec4(c, a * vTw * uOpacity);
}`;

/** "VITTORI" desenhado por milhares de pontos de luz que se montam e se dispersam com o scroll. */
export function ParticleWord({ mobile }: { mobile: boolean }) {
  const ref = useRef<THREE.Points | null>(null);
  const { viewport, gl } = useThree();
  const start = useRef<number | null>(null);

  const geometry = useMemo(() => {
    const W = 1200;
    const H = 260;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "300 230px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("V I T T O R I", W / 2, H / 2);
    const data = ctx.getImageData(0, 0, W, H).data;
    const pts: number[] = [];
    const step = mobile ? 4 : 3;
    for (let y = 0; y < H; y += step)
      for (let x = 0; x < W; x += step) if (data[(y * W + x) * 4 + 3]! > 120) pts.push(x, y);

    const max = mobile ? 3500 : 9000;
    const total = Math.min(max, pts.length / 2);
    const worldW = Math.min(viewport.width * (mobile ? 1.05 : 0.95), 13);
    const pos = new Float32Array(total * 3);
    const st = new Float32Array(total * 3);
    const rnd = new Float32Array(total);
    for (let i = 0; i < total; i++) {
      const j = Math.floor((i / total) * (pts.length / 2)) * 2;
      pos[i * 3] = (pts[j]! / W - 0.5) * worldW + (Math.random() - 0.5) * 0.02;
      pos[i * 3 + 1] = -(pts[j + 1]! / H - 0.5) * worldW * (H / W);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
      const r = 4 + Math.random() * 6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      st[i * 3] = r * Math.sin(ph) * Math.cos(th);
      st[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      st[i * 3 + 2] = r * Math.cos(ph) - 2;
      rnd[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aStart", new THREE.BufferAttribute(st, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
    return g;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uAssemble: { value: 0 },
          uScatter: { value: 0 },
          uSize: { value: (mobile ? 13 : 16) * gl.getPixelRatio() },
          uOpacity: { value: 1 },
        },
      }),
    [mobile, gl],
  );

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const u = material.uniforms;
    u["uTime"]!.value = t;
    u["uAssemble"]!.value = Math.min(1, (t - start.current) / 4.5);
    const sc = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    u["uScatter"]!.value += (sc - u["uScatter"]!.value) * 0.08;
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.15) * 0.08;
      ref.current.rotation.x = Math.cos(t * 0.12) * 0.04;
    }
  });

  // Objeto criado aqui e passado sem props que mudam: o React não precisa atualizar nada no 3D.
  const points = useMemo(() => new THREE.Points(geometry, material), [geometry, material]);
  ref.current = points;
  points.position.set(0, viewport.height * (mobile ? 0.26 : 0.22), -1.2);
  return <primitive object={points} />;
}
