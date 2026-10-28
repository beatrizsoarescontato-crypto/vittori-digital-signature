import { useState, type ReactNode } from "react";

export type Campo = { id: string; label: string; inicial: number };

const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");
export const brl = (n: number) => `R$ ${fmt(n)}`;
export { fmt };

/** Calculadora local: nada é enviado nem salvo. */
export function Calculadora({
  titulo,
  campos,
  resultado,
  nota,
}: {
  titulo: string;
  campos: Campo[];
  resultado: (v: Record<string, number>) => ReactNode;
  nota?: ReactNode;
}) {
  const [v, setV] = useState<Record<string, number>>(() =>
    Object.fromEntries(campos.map((c) => [c.id, c.inicial])),
  );
  return (
    <div className="border border-border/60 bg-preto p-7 md:p-10">
      <p className="label-mono text-dourado">{titulo}</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {campos.map((c) => (
          <label key={c.id} className="flex flex-col gap-2 text-xs text-marfim/70">
            {c.label}
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={Number.isFinite(v[c.id]) ? v[c.id] : ""}
              onChange={(e) => setV((s) => ({ ...s, [c.id]: Number(e.target.value) || 0 }))}
              className="min-h-12 border border-input bg-marrom px-4 font-serif text-2xl text-marfim outline-none focus:border-dourado"
            />
          </label>
        ))}
      </div>
      <div className="mt-10 border-t border-dourado/30 pt-8 font-serif text-2xl font-light leading-snug text-marfim md:text-3xl" aria-live="polite">
        {resultado(v)}
      </div>
      <p className="caption mt-6">Estimativa com os números que você informou.</p>
      {nota && <div className="mt-6 text-sm leading-loose text-marfim/70">{nota}</div>}
    </div>
  );
}
