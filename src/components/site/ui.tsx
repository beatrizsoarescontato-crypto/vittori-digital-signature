import { Link, type LinkProps } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Line } from "./Lines";

type BtnProps = {
  children: ReactNode;
  /** primary = ação principal; secondary = alternativa; link = texto com seta. Antigos nomes mapeados. */
  variant?: "primary" | "secondary" | "link" | "solid" | "ghost" | "light" | "ghostLight";
  className?: string;
} & ({ to: NonNullable<LinkProps["to"]>; href?: never; hash?: string } | { href: string; to?: never; hash?: never });

const variants = {
  primary: "vbtn vbtn--primary",
  solid: "vbtn vbtn--primary",
  light: "vbtn vbtn--primary",
  secondary: "vbtn vbtn--secondary",
  ghost: "vbtn vbtn--secondary",
  ghostLight: "vbtn vbtn--secondary",
  link: "vlink",
};

export function Btn(props: BtnProps) {
  const v = props.variant ?? "primary";
  const cls = `${variants[v]} text-center ${props.className ?? ""}`;
  const inner = (
    <>
      <span>{props.children}</span>
      {(v === "primary" || v === "solid" || v === "light" || v === "link") && <ArrowRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.5} />}
    </>
  );
  if (props.href)
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  return (
    <Link to={props.to!} {...(props.hash ? { hash: props.hash } : {})} className={cls}>
      {inner}
    </Link>
  );
}

/** Título de seção com eyebrow e revelação linha a linha. */
export function SectionTitle({
  eyebrow,
  lines,
  className = "",
}: {
  eyebrow?: string;
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <p className="label-mono mb-6 text-dourado">{eyebrow}</p>}
      <h2 data-lines className="title-2 text-marfim">
        {lines.map((l, i) => (
          <Line key={i}>{l}</Line>
        ))}
      </h2>
    </div>
  );
}

export function Faq({ itens }: { itens: { q: string; a: string }[] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  return (
    <ul className="border-b border-border/60">
      {itens.map((f, i) => (
        <li key={f.q} className="border-t border-border/60">
          <button
            type="button"
            aria-expanded={aberto === i}
            onClick={() => setAberto(aberto === i ? null : i)}
            className="flex min-h-14 w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="font-serif text-xl font-light text-marfim md:text-2xl">{f.q}</span>
            <span
              aria-hidden
              className={`text-dourado transition-transform duration-500 ${aberto === i ? "rotate-45" : ""}`}
            >
              +
            </span>
          </button>
          <div
            className={`grid transition-all duration-500 ease-out ${
              aberto === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="measure pb-7 text-sm leading-loose text-marfim/70">{f.a}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1440px] px-6 md:px-12 ${className}`}>{children}</div>;
}
