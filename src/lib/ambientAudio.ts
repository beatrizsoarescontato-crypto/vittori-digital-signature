/**
 * Trilha ambiente sintetizada no navegador (sem arquivo de áudio):
 * drone grave de cordas + acordes lentos + dedilhado de lira em modo dórico,
 * tudo passando por um reverb longo. Só começa após um clique do visitante.
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
// Ré dórico: D E F G A B C
const SCALE = [62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79];
const CHORDS = [
  [50, 57, 62, 65],
  [48, 55, 60, 64],
  [46, 53, 58, 62],
  [45, 52, 57, 61],
];

function impulse(c: AudioContext, seconds = 5) {
  const len = c.sampleRate * seconds;
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
  }
  return buf;
}

function build() {
  const c = new AudioContext();
  const out = c.createGain();
  out.gain.value = 0;
  out.connect(c.destination);

  const verb = c.createConvolver();
  verb.buffer = impulse(c);
  const wet = c.createGain();
  wet.gain.value = 0.55;
  verb.connect(wet).connect(out);
  const dry = c.createGain();
  dry.gain.value = 0.5;
  dry.connect(out);
  const bus = c.createGain();
  bus.connect(verb);
  bus.connect(dry);

  // Drone grave de cordas.
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 420;
  const droneGain = c.createGain();
  droneGain.gain.value = 0.07;
  lp.connect(droneGain).connect(bus);
  [38, 45, 50].forEach((m, i) => {
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = hz(m);
    o.detune.value = (i - 1) * 6;
    o.connect(lp);
    o.start();
  });
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoAmt = c.createGain();
  lfoAmt.gain.value = 180;
  lfo.connect(lfoAmt).connect(lp.frequency);
  lfo.start();

  return { c, out, bus };
}

function pad(c: AudioContext, bus: AudioNode, notes: number[], at: number, dur: number) {
  notes.forEach((m) => {
    const o = c.createOscillator();
    o.type = "triangle";
    o.frequency.value = hz(m);
    const g = c.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(0.035, at + dur * 0.4);
    g.gain.linearRampToValueAtTime(0, at + dur);
    o.connect(g).connect(bus);
    o.start(at);
    o.stop(at + dur + 0.1);
  });
}

function pluck(c: AudioContext, bus: AudioNode, m: number, at: number) {
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.value = hz(m);
  const o2 = c.createOscillator();
  o2.type = "sine";
  o2.frequency.value = hz(m) * 2;
  const g = c.createGain();
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(0.09, at + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0008, at + 2.4);
  o.connect(g);
  o2.connect(g);
  g.connect(bus);
  o.start(at);
  o2.start(at);
  o.stop(at + 2.5);
  o2.stop(at + 2.5);
}

let bar = 0;
function schedule(c: AudioContext, bus: AudioNode) {
  const t = c.currentTime + 0.1;
  const BAR = 6.4;
  pad(c, bus, CHORDS[bar % CHORDS.length]!, t, BAR + 1.5);
  const n = 3 + Math.floor(Math.random() * 4);
  let idx = Math.floor(Math.random() * 5) + 2;
  for (let i = 0; i < n; i++) {
    idx = Math.max(0, Math.min(SCALE.length - 1, idx + Math.round((Math.random() - 0.5) * 4)));
    pluck(c, bus, SCALE[idx]!, t + 0.4 + (i * BAR * 0.85) / n + Math.random() * 0.2);
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
