import { useState, type ReactNode } from "react";
import { Calculator } from "lucide-react";

export type Campo<K extends string = string> = { id: K; label: string; inicial: number };

const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");
export const brl = (n: number) => `R$ ${fmt(n)}`;
export { fmt };

const teto = (n: number) => {
  const base = Math.max(10, n * 4);
  const mag = 10 ** Math.floor(Math.log10(base));
  return Math.ceil(base / mag) * mag;
};

/** Calculadora local: nada é enviado nem salvo. */
export function Calculadora<K extends string>({
  titulo,
  campos,
  resultado,
  nota,
}: {
  titulo: string;
  campos: Campo<K>[];
  resultado: (v: Record<K, number>) => ReactNode;
  nota?: ReactNode;
}) {
  const [v, setV] = useState<Record<K, number>>(
    () => Object.fromEntries(campos.map((c) => [c.id, c.inicial])) as Record<K, number>,
  );
  const set = (id: K, n: number) => setV((s) => ({ ...s, [id]: Number.isFinite(n) ? n : 0 }));

  return (
    <div data-stage-zone="demo" className="calc-card demo-surface relative overflow-hidden border border-border p-7 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="service-name">{titulo}</p>
        <span className="t-label inline-flex items-center gap-2 px-0 py-2 text-marfim">
          <Calculator className="size-4 text-dourado" aria-hidden="true" />
          Simule com seus números
        </span>
      </div>
      <p className="t-body mt-4">
        <strong className="font-semibold text-marfim">Arraste as barras ou digite os valores.</strong> O resultado muda na hora.
      </p>
      <div className="mt-8 grid gap-7">
        {campos.map((c) => {
          const max = teto(c.inicial);
          return (
            <div key={c.id} className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor={`calc-${c.id}`} className="t-meta">
                  {c.label}
                </label>
                <input
                  id={`calc-${c.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={Number.isFinite(v[c.id]) ? v[c.id] : ""}
                  onChange={(e) => set(c.id, Number(e.target.value) || 0)}
                  className="min-h-11 w-32 border border-input bg-marrom px-3 text-right font-serif text-xl text-marfim outline-none focus:border-dourado"
                />
              </div>
              <input
                type="range"
                aria-label={`Ajustar ${c.label}`}
                min={0}
                max={Math.max(max, v[c.id])}
                step={max >= 1000 ? 10 : 1}
                value={v[c.id]}
                onChange={(e) => set(c.id, Number(e.target.value))}
                className="calc-range"
                style={{ ["--fill" as string]: `${(v[c.id] / Math.max(max, v[c.id] || 1)) * 100}%` }}
              />
            </div>
          );
        })}
      </div>
      <div
        key={JSON.stringify(v)}
        className="calc-result mt-10 border-t border-dourado/30 pt-8 font-serif text-2xl font-light leading-snug text-marfim md:text-3xl"
        aria-live="polite"
      >
        {resultado(v)}
      </div>
      <p className="t-meta mt-6">Estimativa com os números que você informou. Nada é enviado nem salvo.</p>
      {nota && <div className="t-body mt-6">{nota}</div>}
    </div>
  );
}
