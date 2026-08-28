import * as THREE from "three";

/** Contorno do monograma "V" da Vittori (traço grosso, ponta baixa). */
export function createVShape(): THREE.Shape {
  const pts: [number, number][] = [
    [-1, 1],
    [-0.56, 1],
    [0, -0.2],
    [0.56, 1],
    [1, 1],
    [0.16, -1],
    [-0.16, -1],
  ];
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
  shape.closePath();
  return shape;
}

/** Estrela ✦ de quatro pontas, côncava e afilada. */
export function createStarShape(inner = 0.2): THREE.Shape {
  const shape = new THREE.Shape();
  const steps = 8;
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? 1 : inner;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

export const vGeometry = () =>
  new THREE.ExtrudeGeometry(createVShape(), {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4,
    curveSegments: 6,
  }).center();

export const starGeometry = () =>
  new THREE.ExtrudeGeometry(createStarShape(), {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.06,
    bevelSegments: 2,
    curveSegments: 2,
  }).center();
