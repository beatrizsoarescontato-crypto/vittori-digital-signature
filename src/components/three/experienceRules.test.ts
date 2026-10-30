import { describe, expect, it } from "vitest";
import { eclipseState, portalLayout, portalSequence, readingPlacement } from "./experienceRules";

describe("approved experience rules", () => {
  it("holds all portal elements until actual scene readiness", () => {
    expect(portalSequence(null)).toEqual({ word: 0, star: 0, step: 0 });
    expect(portalSequence(0)).toEqual({ word: 0, star: 0, step: 1 });
  });
  it("reveals the word before the star, phrase and buttons", () => {
    expect(portalSequence(1).word).toBeGreaterThan(0);
    expect(portalSequence(1).star).toBe(0);
    expect(portalSequence(2.6)).toEqual({ word: 1, star: 0, step: 3 });
    expect(portalSequence(3.4)).toEqual({ word: 1, star: 1, step: 4 });
    expect(portalSequence(4.3).step).toBe(5);
  });
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
    expect(eclipseState(1, 1, 1).halo).toBeCloseTo(0.328);
  });
});
import { sectionChoreography as sc } from "./experienceRules";
describe("sectionChoreography", () => {
  it("protects real left-hand reading bounds by using a clear right pocket", () => {
    expect(readingPlacement([{ left: 0, right: 0.7, top: 0, bottom: 1 }])?.x).toBeCloseTo(0.38);
  });
  it("keeps the monogram and eclipse peripheral for full-width demos", () => {
    expect(sc("wide", true, [{ left: 0, right: 1, top: 0, bottom: 1 }]).x).toBeCloseTo(0.64);
  });
  it("releases reading protection in empty transition space", () => {
    expect(sc("wide", false, [{ left: 0, right: 1, top: 1.1, bottom: 2 }]).active).toBe(false);
  });
  it("measured protection does not alter the approved dispersion peak or particle alpha", () => {
    const safety = sc("wide", false, [{ left: 0, right: 1, top: 0, bottom: 1 }]).readingSafety;
    expect(eclipseState(1, 1, safety).peak).toBe(1);
    expect(eclipseState(1, 1, safety).particleAlpha).toBeCloseTo(0.72);
  });
  it("moves the V opposite to left-aligned text on desktop", () => expect(sc("left", false).x).toBe(0.3));
  it("moves the V opposite to right-aligned text on desktop", () => expect(sc("right", false).x).toBe(-0.3));
  it("pushes the V deep and dim behind wide text", () => { const r = sc("wide", false); expect(r.zOffset).toBe(-9); expect(r.readingSafety).toBe(1); });
  it("never centers the V close behind text on mobile", () => expect(sc("left", true).zOffset).toBe(-9));
  it("leaves the V free between sections", () => expect(sc("none", false).active).toBe(false));
});
