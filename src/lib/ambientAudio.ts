/**
 * Trilha épica sintetizada no navegador (sem arquivo de áudio):
 * pulso de tambores graves, metais nobres em progressão heroica (I · bVI · bVII · I)
 * e um motivo de trompa que sobe. Passa por um reverb de sala grande.
 * Só começa após um clique do visitante.
 */
type Listener = (on: boolean) => void;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
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

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const BPM = 76;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
// Ré maior triunfante, só acordes maiores: D · G · A · D
const CHORDS = [
  [50, 57, 62, 66, 69],
  [43, 55, 59, 62, 67],
  [45, 57, 61, 64, 69],
  [50, 57, 62, 66, 74],
];
const ROOTS = [38, 31, 33, 38];
// Motivo de trompa que sobe (uma frase a cada 2 compassos)
const MOTIFS = [
  [62, 69, 74, 73, 74],
  [65, 70, 74, 72, 70],
  [67, 72, 76, 74, 72],
  [69, 74, 78, 76, 74],
];

function impulse(c: AudioContext, seconds = 3.6) {
  const len = c.sampleRate * seconds;
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.5;
  }
  return buf;
}

let noise: AudioBuffer | null = null;

function build() {
  const c = new AudioContext();
  const out = c.createGain();
  out.gain.value = 0;
  const comp = c.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.ratio.value = 3;
  out.connect(comp).connect(c.destination);

  const verb = c.createConvolver();
  verb.buffer = impulse(c);
  const wet = c.createGain();
  wet.gain.value = 0.38;
  verb.connect(wet).connect(out);
  const dry = c.createGain();
  dry.gain.value = 0.75;
  dry.connect(out);
  const bus = c.createGain();
  bus.connect(verb);
  bus.connect(dry);

  noise = c.createBuffer(1, c.sampleRate * 0.5, c.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

  return { c, out, bus };
}

/** Tambor grave estilo taiko: seno com queda de afinação + estalo de pele. */
function drum(c: AudioContext, bus: AudioNode, at: number, vel = 1) {
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(120, at);
  o.frequency.exponentialRampToValueAtTime(42, at + 0.35);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(0.75 * vel, at + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, at + 1.1);
  o.connect(g).connect(bus);
  o.start(at);
  o.stop(at + 1.2);

  if (noise) {
    const n = c.createBufferSource();
    n.buffer = noise;
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 900;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.25 * vel, at);
    ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.18);
    n.connect(f).connect(ng).connect(bus);
    n.start(at);
    n.stop(at + 0.2);
  }
}

/** Metal (trompa/trombone): serras desafinadas atrás de um filtro que abre. */
function brass(c: AudioContext, bus: AudioNode, notes: number[], at: number, dur: number, level: number, bright = 1600) {
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.Q.value = 0.8;
  f.frequency.setValueAtTime(350, at);
  f.frequency.linearRampToValueAtTime(bright, at + Math.min(0.6, dur * 0.4));
  f.frequency.linearRampToValueAtTime(bright * 0.6, at + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(level, at + Math.min(0.35, dur * 0.3));
  g.gain.setValueAtTime(level, at + dur * 0.75);
  g.gain.linearRampToValueAtTime(0, at + dur);
  f.connect(g).connect(bus);
  notes.forEach((m) => {
    [-7, 7].forEach((det) => {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = hz(m);
      o.detune.value = det;
      o.connect(f);
      o.start(at);
      o.stop(at + dur + 0.05);
    });
  });
}

let bar = 0;
function schedule(c: AudioContext, bus: AudioNode) {
  const t = c.currentTime + 0.1;
  const i = bar % 4;

  // Coro de metais sustentado + baixo profundo.
  brass(c, bus, CHORDS[i]!, t, BAR + 0.3, 0.022, 1300);
  brass(c, bus, [ROOTS[i]!, ROOTS[i]! + 12], t, BAR + 0.3, 0.05, 500);

  // Pulso: 1 · 2e · 3 · (rufo no fim de cada frase)
  drum(c, bus, t, 1);
  drum(c, bus, t + BEAT * 1.5, 0.55);
  drum(c, bus, t + BEAT * 2, 0.85);
  if (i === 3) [3, 3.25, 3.5, 3.75].forEach((b, k) => drum(c, bus, t + BEAT * b, 0.45 + k * 0.15));
  else drum(c, bus, t + BEAT * 3.5, 0.4);

  // Motivo de trompa que sobe, a partir do segundo ciclo.
  if (bar >= 4 && bar % 2 === 0) {
    const motif = MOTIFS[(bar / 2) % MOTIFS.length]!;
    const lens = [1, 1, 1.5, 0.5, 2];
    let at = t + BEAT * 0.5;
    motif.forEach((m, k) => {
      const d = BEAT * lens[k]!;
      brass(c, bus, [m], at, d * 0.95, 0.04, 2400);
      at += d;
    });
  }

  bar++;
  timer = window.setTimeout(() => schedule(c, bus), BAR * 1000);
}

let graph: { c: AudioContext; out: GainNode; bus: GainNode } | null = null;

export async function setSound(next: boolean) {
  if (typeof window === "undefined") return;
  if (next) {
    if (!graph) graph = build();
    ctx = graph.c;
    master = graph.out;
    await ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 2.5);
    if (timer === null) schedule(ctx, graph.bus);
  } else if (ctx && master) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
  }
  on = next;
  emit();
}
