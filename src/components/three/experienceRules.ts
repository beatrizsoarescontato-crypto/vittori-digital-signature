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
    halo: formation * (EXPERIENCE.formationHalo + (EXPERIENCE.dispersionHalo - EXPERIENCE.formationHalo) * peak) * (1 - 0.35 * readingSafety * (1 - peak)),
    peak,
    softness: 1 - 0.7 * peak,
    particleAlpha: formation * (1 - 0.28 * dispersion),
  };
}
export type TextSide = "left" | "right" | "wide" | "none";
export type ReadingBounds = { left: number; right: number; top: number; bottom: number };

/** Normalized DOM rectangles; padding/empty sections are not reading regions. */
export function readingPlacement(bounds: ReadingBounds[]) {
  const visible = bounds.filter(b => b.bottom > 0.08 && b.top < 0.95 && b.right > 0 && b.left < 1);
  if (!visible.length) return null;
  const radius = 0.1;
  const candidates = [{ x: 0.12, y: 0.22 }, { x: 0.88, y: 0.22 }, { x: 0.12, y: 0.82 }, { x: 0.88, y: 0.82 }];
  const clear = candidates.find(c => visible.every(b => c.x + radius < b.left || c.x - radius > b.right || c.y + radius < b.top || c.y - radius > b.bottom));
  // With full-width reading, retain a peripheral glimpse, never a center halo.
  return { x: (clear?.x ?? 1.14) - 0.5, y: 0.5 - (clear?.y ?? 0.28) };
}

/** Where the interior V sits while a section is read. x is a viewport fraction. */
export function sectionChoreography(side: TextSide, mobile: boolean, bounds?: ReadingBounds[]) {
  if (bounds) {
    const placement = readingPlacement(bounds);
    if (!placement) return { active: false, x: 0, y: 0, zOffset: 0, scale: 1, readingSafety: 0, dim: 0 };
    return { active: true, ...placement, zOffset: -4, scale: 0.68, readingSafety: 0.7, dim: 0.2 };
  }
  if (side === "none") return { active: false, x: 0, y: 0, zOffset: 0, scale: 1, readingSafety: 0, dim: 0 };
  if (mobile || side === "wide") return { active: true, x: mobile ? 0 : 0.36, y: mobile ? 0.36 : 0.3, zOffset: -4, scale: 0.65, readingSafety: 0.7, dim: 0.2 };
  return { active: true, x: side === "left" ? 0.3 : -0.3, y: 0, zOffset: -2.5, scale: 0.75, readingSafety: 0.6, dim: 0.2 };
}
