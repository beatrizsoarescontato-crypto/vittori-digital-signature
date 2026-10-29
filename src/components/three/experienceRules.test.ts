import { describe, expect, it } from "vitest";
import { eclipseState, portalLayout } from "./experienceRules";

describe("approved experience rules", () => {
  for (const [width, height] of [[1910, 861], [1440, 900], [1280, 720], [390, 844], [360, 740]] as const) {
    it(`keeps the star below the word and above controls at ${width}×${height}`, () => {
      const mobile = width < 768;
      const worldHeight = 16 * Math.tan(Math.PI / 8);
      const safeTop = height * (mobile ? 0.6 : 0.68);
      const result = portalLayout({ width, height, worldWidth: worldHeight * width / height, worldHeight, wordWidth: 4.8, wordBottom: -0.34, wordTop: 0.37, starRadius: mobile ? 0.34 : 0.2, safeTop, mobile });
      expect(result.bottomPx).toBeLessThan(safeTop);
      expect(result.starY + (mobile ? 0.34 : 0.2)).toBeLessThan(-0.34);
      expect(result.wordPixels / width).toBe(mobile ? 0.88 : 0.8);
    });
  }
  it("keeps the interior V halo subdued during formation", () => {
    expect(eclipseState(1, 0, 0).halo).toBe(0.2);
  });
  it("preserves the bright dispersion peak independently of V opacity", () => {
    const result = eclipseState(1, 1, 0);
    expect(result.halo).toBeCloseTo(0.82);
    expect(result.particleAlpha).toBeCloseTo(0.72);
    expect(result.halo).toBeGreaterThan(eclipseState(1, 0, 0).halo);
  });
  it("recedes for reading without removing the eclipse", () => {
    expect(eclipseState(1, 1, 1).halo).toBeCloseTo(0.205);
  });
});