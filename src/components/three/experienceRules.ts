/** Browser-independent composition and choreography rules. */
export const EXPERIENCE = {
  sweepSeconds: 6.5,
  sweepStrength: 0.24,
  bloomStrength: 0.32,
  formationHalo: 0.2,
  dispersionHalo: 0.82,
} as const;

export function portalLayout(input: {
  width: number; height: number; worldWidth: number; worldHeight: number;
  wordWidth: number; wordBottom: number; wordTop: number;
  starRadius: number; safeTop: number; mobile: boolean;
}) {
  const { width, height, worldWidth, worldHeight, wordWidth, wordBottom, wordTop, starRadius, safeTop, mobile } = input;
  const fit = worldWidth * (mobile ? 0.88 : 0.8) / wordWidth;
  const pxPerWorld = height / worldHeight;
  const gapPx = mobile ? 18 : 28;
  const starY = wordBottom - gapPx / pxPerWorld / fit - starRadius;
  const wordCenter = (wordBottom + wordTop) / 2;
  const bottomOffsetPx = (wordCenter - starY + starRadius) * fit * pxPerWorld;
  const desiredCenter = height * (mobile ? 0.42 : 0.4);
  const centerPx = Math.min(desiredCenter, safeTop - (mobile ? 28 : 34) - bottomOffsetPx);
  const groupY = (height / 2 - centerPx) / pxPerWorld - wordCenter * fit;
  return { fit, groupY, starY, centerPx, bottomPx: centerPx + bottomOffsetPx, wordPixels: width * (mobile ? 0.88 : 0.8) };
}

export const smoothProgress = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Fast dispersion onset, slower settling: the eclipse survives a brief scroll gesture. */
export function dispersionEnvelope(current: number, target: number, delta: number) {
  const rate = target > current ? 8 : 0.9;
  return current + (target - current) * (1 - Math.exp(-rate * Math.min(delta, 0.05)));
}

/** One post-warmup clock drives the monument and the HTML controls. */
export function portalSequence(elapsed: number | null) {
  const t = elapsed ?? -1;
  return {
    word: smoothProgress(0.35, 2.6, t),
    star: smoothProgress(2.6, 3.3, t),
    step: t < 0 ? 0 : t < 0.35 ? 1 : t < 2.6 ? 2 : t < 3.4 ? 3 : t < 4.3 ? 4 : 5,
  };
}

/** Independent eclipse peak; reading safety never changes the peak itself. */
export function eclipseState(formation: number, dispersion: number, readingSafety: number) {
  const peak = smoothProgress(0.2, 0.9, dispersion);
  return {
    halo: formation * (EXPERIENCE.formationHalo + (EXPERIENCE.dispersionHalo - EXPERIENCE.formationHalo) * peak) * (1 - 0.6 * readingSafety),
    peak,
    softness: 1 - 0.7 * peak,
    particleAlpha: formation * (1 - 0.28 * dispersion),
  };
}
export type TextSide = "left" | "right" | "wide" | "none";
export type ReadingBounds = { left: number; right: number; top: number; bottom: number };

/** Guard the rendered position while its damped movement crosses protected content. */
export function eclipseClear(bounds: ReadingBounds[], x: number, y: number, radius: number, aspect: number) {
  return bounds.every(b => {
    const dx = Math.max(b.left - x, 0, x - b.right) * aspect;
    const dy = Math.max(b.top - y, 0, y - b.bottom);
    return Math.hypot(dx, dy) >= radius;
  });
}

/** Normalized DOM rectangles; padding/empty sections are not reading regions. */
export function readingPlacement(bounds: ReadingBounds[], radius = 0.1) {
  const visible = bounds.filter(b => b.bottom > 0.08 && b.top < 0.95 && b.right > 0 && b.left < 1);
  if (!visible.length) return null;
  const candidates = [{ x: 0.12, y: 0.22 }, { x: 0.88, y: 0.22 }, { x: 0.12, y: 0.82 }, { x: 0.88, y: 0.82 }];
  const clear = candidates.find(c => visible.every(b => c.x + radius < b.left || c.x - radius > b.right || c.y + radius < b.top || c.y - radius > b.bottom));
  // With full-width reading, retain a peripheral glimpse, never a center halo.
  return { x: (clear?.x ?? 1.14) - 0.5, y: 0.5 - (clear?.y ?? 0.28), clear: !!clear };
}

/**
 * Largest genuinely empty area of the viewport for the dispersion peak.
 * Distances are in viewport-height units (x is corrected by aspect = w/h); the halo may
 * bleed up to 60% past the screen edge (an eclipse rising from the border), never into a measured reading box.
 * `prev` adds hysteresis so the eclipse does not hop between near-equal pockets.
 */
export function peakPocket(bounds: ReadingBounds[], aspect: number, prev?: { x: number; y: number } | null) {
  const visible = bounds.filter(b => b.bottom > 0 && b.top < 1 && b.right > 0 && b.left < 1);
  let best = { x: 0.5, y: 0.5, radius: 0 };
  let bestScore = -1;
  for (let cx = 0.06; cx <= 0.941; cx += 0.04) {
    for (let cy = 0.1; cy <= 0.901; cy += 0.04) {
      let r = Math.min(cx * aspect, (1 - cx) * aspect, cy, 1 - cy) / 0.4;
      for (const b of visible) {
        const dx = Math.max(b.left - cx, 0, cx - b.right) * aspect;
        const dy = Math.max(b.top - cy, 0, cy - b.bottom);
        r = Math.min(r, Math.hypot(dx, dy));
        if (r <= 0) break;
      }
      const score = r + (prev && Math.hypot((cx - prev.x) * aspect, cy - prev.y) < 0.12 ? 0.025 : 0);
      if (score > bestScore) { bestScore = score; best = { x: cx, y: cy, radius: r }; }
    }
  }
  return best;
}

/** Where the interior V sits while a section is read. x is a viewport fraction. */
/**
 * peak (0..1) is the dispersion moment: when a clear empty area exists, the dispersed V
 * grows into it and the halo is far less attenuated, so the eclipse is actually seen.
 * With an aspect ratio, the peak uses the largest measured empty pocket (radius in
 * viewport-height units) instead of the four fixed corners.
 */
export function sectionChoreography(side: TextSide, mobile: boolean, bounds?: ReadingBounds[], peak = 0, aspect?: number, prev?: { x: number; y: number } | null) {
  if (bounds) {
    const radius = 0.1 + (mobile ? 0.03 : 0.06) * peak;
    let placement = readingPlacement(bounds, radius);
    if (placement && !placement.clear && peak > 0) placement = readingPlacement(bounds);
    if (!placement) return { active: false, x: 0, y: 0, zOffset: 0, scale: 1, readingSafety: 0, dim: 0, radius: 0, pocket: null };
    if (aspect && peak > 0.02) {
      const pocket = peakPocket(bounds, aspect, prev);
      const minRadius = mobile ? 0.07 : 0.09;
      if (pocket.radius >= minRadius) {
        const k = peak;
        const px = pocket.x - 0.5, py = 0.5 - pocket.y;
        return {
          active: true,
          x: placement.x + (px - placement.x) * k,
          y: placement.y + (py - placement.y) * k,
          zOffset: -9 + (mobile ? 4 : 6) * k,
          scale: 0.34 + (mobile ? 0.12 : 0.26) * k,
          readingSafety: 1 - 0.9 * k,
          dim: 0.35 * (1 - 0.9 * k),
          radius: Math.min(pocket.radius, mobile ? 0.3 : 0.42),
          pocket: { x: pocket.x, y: pocket.y },
        };
      }
    }
    const { x, y, clear } = placement;
    const k = clear ? peak : 0;
    return { active: true, x, y, zOffset: -9 + (mobile ? 3 : 5.5) * k, scale: 0.34 + (mobile ? 0.12 : 0.26) * k, readingSafety: 1 - 0.7 * k, dim: 0.35 * (1 - 0.8 * k), radius: 0, pocket: null };
  }
  if (side === "none") return { active: false, x: 0, y: 0, zOffset: 0, scale: 1, readingSafety: 0, dim: 0, radius: 0, pocket: null };
  if (mobile || side === "wide") return { active: true, x: mobile ? 0 : 0.36, y: mobile ? 0.36 : 0.3, zOffset: -9, scale: 0.42, readingSafety: 1, dim: 0.5, radius: 0, pocket: null };
  return { active: true, x: side === "left" ? 0.3 : -0.3, y: 0, zOffset: -2.5, scale: 0.75, readingSafety: 0.6, dim: 0.2, radius: 0, pocket: null };
}

/** Distance (viewport-height units) from a screen point to the nearest protected box. */
export function eclipseClearance(bounds: ReadingBounds[], x: number, y: number, aspect: number) {
  let d = Infinity;
  for (const b of bounds) {
    if (b.bottom < 0 || b.top > 1 || b.right < 0 || b.left > 1) continue;
    const dx = Math.max(b.left - x, 0, x - b.right) * aspect;
    const dy = Math.max(b.top - y, 0, y - b.bottom);
    d = Math.min(d, Math.hypot(dx, dy));
  }
  return d;
}

/** Shrink the halo to the free space instead of hiding it; fade only when almost no room. */
export function haloFit(clearance: number, radius: number) {
  if (radius <= 0 || clearance >= radius) return { scale: 1, alpha: 1 };
  const scale = Math.max(0, clearance / radius);
  return { scale, alpha: smoothProgress(0.18, 0.4, scale) };
}
