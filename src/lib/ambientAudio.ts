/**
 * Trilha sonora da Vittori: "Epic Emotional Adventure" (KornevMusic, Pixabay),
 * servida de /public/vittori-trilha.mp3.
 *
 * - Só carrega e toca depois de um clique do visitante (botão "Entrar com som" ou o
 *   botão de som flutuante). Quem entra sem som não baixa o arquivo.
 * - Repete sem emenda: os últimos segundos se misturam ao início da faixa (crossfade).
 * - O volume passa por Web Audio (GainNode), porque o iPhone ignora audio.volume.
 * - Pausa sozinha quando a aba fica em segundo plano e volta quando o visitante retorna.
 *
 * A API pública (isSoundOn, onSoundChange, setSound) é a mesma da trilha sintetizada
 * anterior, então SoundToggle.tsx e EntryGate.tsx não mudam.
 */
type Listener = (on: boolean) => void;

const SRC = "/vittori-trilha.mp3";
const VOLUME = 0.3; // fundo para leitura: presente, sem competir com o texto
const FADE_IN = 2.5; // segundos ao ligar
const FADE_OUT = 0.8; // segundos ao desligar
const LOOP_FADE = 6; // segundos de mistura entre o fim e o começo da faixa

let on = false;
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l(on));
export const isSoundOn = () => on;
export function onSoundChange(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

type Voice = { el: HTMLAudioElement; gain: GainNode };
type Graph = { c: AudioContext; master: GainNode; voices: [Voice, Voice]; active: 0 | 1 };
let graph: Graph | null = null;
let stopTimer: number | null = null;
let crossing = false;

function build(): Graph | null {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  // "playback" asks the browser for larger audio buffers. On phones, the 3D scene can keep
  // the main thread busy while scrolling; with the default low-latency buffers the music
  // then crackles or distorts. A background soundtrack doesn't need low latency.
  let c: AudioContext;
  try {
    c = new AC({ latencyHint: "playback" });
  } catch {
    c = new AC();
  }
  const master = c.createGain();
  master.gain.value = 0;
  master.connect(c.destination);
  const voice = (): Voice => {
    const el = new Audio();
    el.src = SRC;
    el.preload = "auto";
    el.loop = false;
    const gain = c.createGain();
    gain.gain.value = 0;
    c.createMediaElementSource(el).connect(gain);
    gain.connect(master);
    el.addEventListener("timeupdate", () => maybeCross(el));
    el.addEventListener("error", () => {
      // Arquivo indisponível: desliga o estado de som em vez de deixar o botão mentir.
      if (on) {
        on = false;
        emit();
      }
    });
    return { el, gain };
  };
  const first = voice();
  first.gain.gain.value = 1;
  return { c, master, voices: [first, voice()], active: 0 };
}

/** Quando a voz ativa chega perto do fim, a outra começa do zero e as duas se cruzam. */
function maybeCross(el: HTMLAudioElement) {
  const g = graph;
  if (!g || !on || crossing) return;
  const cur = g.voices[g.active];
  if (cur.el !== el || !Number.isFinite(el.duration) || el.duration <= LOOP_FADE * 2) return;
  if (el.currentTime < el.duration - LOOP_FADE) return;
  crossing = true;
  const nextIdx: 0 | 1 = g.active === 0 ? 1 : 0;
  const next = g.voices[nextIdx];
  const now = g.c.currentTime;
  next.el.currentTime = 0;
  next.gain.gain.cancelScheduledValues(now);
  next.gain.gain.setValueAtTime(0, now);
  next.gain.gain.linearRampToValueAtTime(1, now + LOOP_FADE);
  cur.gain.gain.cancelScheduledValues(now);
  cur.gain.gain.setValueAtTime(cur.gain.gain.value, now);
  cur.gain.gain.linearRampToValueAtTime(0, now + LOOP_FADE);
  void next.el.play().catch(() => undefined);
  g.active = nextIdx;
  window.setTimeout(() => {
    cur.el.pause();
    crossing = false;
  }, LOOP_FADE * 1000 + 200);
}

function rampMaster(to: number, seconds: number) {
  const g = graph;
  if (!g) return;
  const now = g.c.currentTime;
  g.master.gain.cancelScheduledValues(now);
  g.master.gain.setValueAtTime(g.master.gain.value, now);
  g.master.gain.linearRampToValueAtTime(to, now + seconds);
}

let visibilityBound = false;
function bindVisibility() {
  if (visibilityBound) return;
  visibilityBound = true;
  document.addEventListener("visibilitychange", () => {
    const g = graph;
    if (!g || !on) return;
    if (document.hidden) void g.c.suspend();
    else void g.c.resume();
  });
}

export async function setSound(next: boolean) {
  if (typeof window === "undefined") return;
  if (next) {
    if (stopTimer !== null) {
      window.clearTimeout(stopTimer);
      stopTimer = null;
    }
    if (!graph) graph = build();
    const g = graph;
    if (!g) return;
    bindVisibility();
    on = true;
    emit();
    // play() e resume() são chamados ainda dentro do clique, como os navegadores exigem.
    const cur = g.voices[g.active];
    const playing = cur.el.play();
    const resuming = g.c.resume();
    rampMaster(VOLUME, FADE_IN);
    try {
      await Promise.all([playing, resuming]);
    } catch {
      on = false;
      emit();
    }
  } else {
    on = false;
    emit();
    const g = graph;
    if (!g) return;
    rampMaster(0, FADE_OUT);
    stopTimer = window.setTimeout(() => {
      g.voices.forEach((v) => v.el.pause());
      stopTimer = null;
    }, FADE_OUT * 1000 + 100);
  }
}
