import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { starGeometry, vGeometry } from "./shapes";

function brassMaterial(rough = 0.28) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C8A25A"),
    metalness: 1,
    roughness: rough,
    envMapIntensity: 1.4,
  });
}

function Monogram() {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => vGeometry(), []);
  const material = useMemo(() => brassMaterial(0.3), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (ref.current) ref.current.rotation.y += dt * 0.32;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
      <mesh ref={ref} geometry={geometry} material={material} scale={1.55} />
    </Float>
  );
}

function OrbitStar({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => starGeometry(), []);
  const material = useMemo(() => brassMaterial(0.2), []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (ref.current) {
      ref.current.rotation.z += dt * speed;
      ref.current.rotation.x += dt * speed * 0.4;
    }
  });

  return (
    <Float speed={1.4} floatIntensity={0.8}>
      <mesh ref={ref} geometry={geometry} material={material} position={position} scale={scale} />
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#0D0D0D"]} />
      <ambientLight intensity={0.18} />
      <spotLight
        position={[4, 6, 5]}
        angle={0.5}
        penumbra={0.9}
        intensity={90}
        color="#E4C98F"
      />
      <spotLight position={[-5, -2, 3]} angle={0.7} penumbra={1} intensity={35} color="#8B0F1A" />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={3} position={[0, 4, 2]} scale={[8, 8, 1]} color="#E4C98F" />
          <Lightformer
            intensity={1.6}
            color="#6A4A33"
            position={[-5, 0, 1]}
            rotation-y={Math.PI / 2}
            scale={[14, 3, 1]}
          />
          <Lightformer
            intensity={1.2}
            color="#8B0F1A"
            position={[5, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[14, 3, 1]}
          />
        </Environment>
        <Monogram />
        <OrbitStar position={[2.5, 1.4, 1]} scale={0.16} speed={0.5} />
        <OrbitStar position={[-2.7, -1.2, 0.5]} scale={0.11} speed={0.35} />
      </Suspense>
    </Canvas>
  );
}
