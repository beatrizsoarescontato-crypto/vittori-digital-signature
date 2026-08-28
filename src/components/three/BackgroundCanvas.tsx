import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { starGeometry } from "./shapes";

function GoldDust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#C8A25A"),
        size: 0.035,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

const STARS: { position: [number, number, number]; scale: number; speed: number }[] = [
  { position: [-5.2, 2.6, -1], scale: 0.22, speed: 0.22 },
  { position: [4.8, 0.4, -2], scale: 0.3, speed: 0.16 },
  { position: [-3.4, -2.8, 0], scale: 0.16, speed: 0.3 },
  { position: [5.6, -3.2, -1.5], scale: 0.2, speed: 0.19 },
  { position: [0.8, 3.6, -2.5], scale: 0.14, speed: 0.26 },
];

function FloatingStars() {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => starGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#C8A25A"),
        metalness: 1,
        roughness: 0.25,
        emissive: new THREE.Color("#6A4A33"),
        emissiveIntensity: 0.35,
      }),
    [],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!group.current) return;
    const progress =
      typeof window !== "undefined"
        ? window.scrollY / Math.max(window.innerHeight, 1)
        : 0;
    group.current.position.y = progress * 1.6;
    group.current.rotation.z = progress * 0.08;
    group.current.children.forEach((child, i) => {
      child.rotation.z += dt * (STARS[i]?.speed ?? 0.2);
      child.rotation.y += dt * 0.12;
      child.position.y =
        (STARS[i]?.position[1] ?? 0) + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.18;
    });
  });

  return (
    <group ref={group}>
      {STARS.map((s, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={material}
          position={s.position}
          scale={s.scale}
        />
      ))}
    </group>
  );
}

export default function BackgroundCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: false, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#E4C98F" />
      <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#8B0F1A" />
      <GoldDust />
      <FloatingStars />
    </Canvas>
  );
}
