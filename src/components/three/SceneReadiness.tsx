import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { stageScroll } from "./stageScroll";
import { HalfFloatType, NoToneMapping, WebGLRenderTarget, type Object3D } from "three";

type Report = { phase: string; intervalMs: number; calls: number; triangles: number; dpr: number };
declare global {
  interface Window {
    __vittori?: { report: () => Report[]; state: () => typeof stageScroll };
  }
}

/** Warm materials before entry; probe measures intervals, never claims GPU timing. */
export function SceneReadiness({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera, setDpr } = useThree();
  const frames = useRef(0);
  const warm = useRef(false);
  const last = useRef(0);
  const reports = useRef<Report[]>([]);
  const slow = useRef(0);
  const reduced = useRef(false);
  useEffect(() => {
    let active = true;
    gl.info.autoReset = false;
    gl.compileAsync(scene, camera).then(() => { if (active) warm.current = true; }).catch(() => { if (active) warm.current = true; });
    if (import.meta.env.DEV) window.__vittori = { report: () => reports.current.slice(), state: () => ({ ...stageScroll }) };
    return () => { active = false; gl.info.autoReset = true; if (import.meta.env.DEV) delete window.__vittori; };
  }, [gl, scene, camera]);
  useFrame(() => {
    const now = performance.now();
    const interval = last.current ? now - last.current : 0;
    last.current = now;
    if (warm.current && ++frames.current === 4) {
      // compileAsync includes hidden objects, but not necessarily the final
      // offscreen/tone-mapping variant selected by EffectComposer at first draw.
      // Warm that variant without exposing the V or changing its choreography.
      const saved: { object: Object3D; visible: boolean; culled: boolean }[] = [];
      scene.traverse((object) => {
        saved.push({ object, visible: object.visible, culled: object.frustumCulled });
        object.visible = true;
        object.frustumCulled = false;
      });
      const target = new WebGLRenderTarget(16, 16, { type: HalfFloatType });
      const previousTarget = gl.getRenderTarget();
      const previousTone = gl.toneMapping;
      const previousViewport = gl.getViewport(new Vector4());
      const previousScissor = gl.getScissor(new Vector4());
      const previousScissorTest = gl.getScissorTest();
      try {
        gl.setRenderTarget(target);
        gl.toneMapping = NoToneMapping;
        gl.render(scene, camera);
      } finally {
        saved.forEach(({ object, visible, culled }) => {
          object.visible = visible;
          object.frustumCulled = culled;
        });
        gl.setRenderTarget(previousTarget);
        gl.toneMapping = previousTone;
        gl.setViewport(previousViewport);
        gl.setScissor(previousScissor);
        gl.setScissorTest(previousScissorTest);
        target.dispose();
      }
    }
    if (warm.current && frames.current === 5) onReady();
    if (!document.hidden && interval > 0) {
      if (import.meta.env.DEV) {
        reports.current.push({ phase: stageScroll.dive > 0 && stageScroll.dive < 1 ? "dive" : stageScroll.phase, intervalMs: Math.round(interval * 10) / 10, calls: gl.info.render.calls, triangles: gl.info.render.triangles, dpr: gl.getPixelRatio() });
        if (reports.current.length > 600) reports.current.shift();
      }
      slow.current = interval > 45 ? slow.current + 1 : Math.max(0, slow.current - 1);
      if (!reduced.current && slow.current > 40 && gl.getPixelRatio() > 1) {
        reduced.current = true;
        setDpr(1);
      }
    }
    gl.info.reset();
  }, -100);
  return null;
}