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
    bevelThickness: 0.05,
    bevelSize: 0.045,
    bevelSegments: 5,
    curveSegments: 6,
  }).center();

export const starGeometry = () =>
  new THREE.ExtrudeGeometry(createStarShape(0.26), {
    depth: 0.07,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 2,
  }).center();

/** Textura de gradiente radial usada como "parede" bordô do estúdio. */
export function radialTexture(
  inner: string,
  outer: string,
  size = 512,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.48, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Mapa de ruído direcional: dá aparência de latão escovado. */
export function brushedTexture(size = 256): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#8a8a8a";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < size * 5; i++) {
    const y = Math.random() * size;
    const v = 118 + Math.random() * 60;
    ctx.strokeStyle = `rgba(${v},${v},${v},0.32)`;
    ctx.lineWidth = Math.random() * 1.4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y + (Math.random() - 0.5) * 3);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}
