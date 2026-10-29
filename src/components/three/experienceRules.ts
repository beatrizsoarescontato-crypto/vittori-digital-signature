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
    halo: formation * (EXPERIENCE.formationHalo + (EXPERIENCE.dispersionHalo - EXPERIENCE.formationHalo) * peak) * (1 - 0.75 * readingSafety),
    peak,
    softness: 1 - 0.7 * peak,
    particleAlpha: formation * (1 - 0.28 * dispersion),
  };
}
export type TextSide = "left" | "right" | "wide" | "none";

/** Where the interior V sits while a section is read. x is a viewport fraction. */
export function sectionChoreography(side: TextSide, mobile: boolean) {
  if (side === "none") return { active: false, x: 0, zOffset: 0, scale: 1, readingSafety: 0 };
  if (mobile || side === "wide") return { active: true, x: 0, zOffset: -6, scale: 0.6, readingSafety: 1 };
  return { active: true, x: side === "left" ? 0.3 : -0.3, zOffset: -2.5, scale: 0.75, readingSafety: 0.6 };
}
