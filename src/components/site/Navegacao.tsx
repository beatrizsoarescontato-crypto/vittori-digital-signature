import { useEffect, useState } from "react";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { retornoPara } from "@/lib/navContexto";

const CHAVE = "vittori:origem";

/** Quando a rolagem parar, corrige um eventual deslocamento causado por conteúdo que cresceu no caminho. */
function corrigirAoParar(el: HTMLElement) {
  let y = NaN, parado = 0, n = 0;
  const alvo = () => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const passo = () => {
    n++;
    parado = Math.abs(window.scrollY - y) < 1 ? parado + 1 : 0;
    y = window.scrollY;
    if (parado >= 6) {
      const desvio = el.getBoundingClientRect().top - alvo();
      if (Math.abs(desvio) > 6) window.scrollTo({ top: window.scrollY + desvio, behavior: "auto" });
      return;
    }
    if (n < 600) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

/** Rola até a seção esperando o elemento existir e a posição estabilizar (sem atraso fixo). */
export function rolarParaSecao(id: string, suave = true) {
  let ultimo = NaN, estavel = 0, frames = 0;
  const passo = () => {
    const el = document.getElementById(id);
    frames++;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      estavel = Math.abs(top - ultimo) < 1 ? estavel + 1 : 0;
      ultimo = top;
      if (estavel >= 3 || frames > 240) {
        const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: suave && !reduz ? "smooth" : "auto", block: "start" });
        corrigirAoParar(el);
        return;
      }
    } else if (frames > 240) return;
    requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

/** Na home: guarda a seção de origem ao clicar num link interno; rola até a âncora em navegações novas (não em voltar/avançar). */
export function useNavegacaoContextual() {
  const router = useRouter();
  useEffect(() => {
    let pop = false;
    const onPop = () => { pop = true; };
    window.addEventListener("popstate", onPop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || location.pathname !== "/") return;
      const secao = a.closest("section[id]")?.id;
      const destino = a.getAttribute("href") ?? "";
      if (secao && destino.startsWith("/") && !destino.startsWith("/#")) {
        sessionStorage.setItem(CHAVE, JSON.stringify({ secao, destino: destino.split(/[?#]/)[0]!.replace(/\/+$/, "") }));
      }
      // Mesmo link de âncora já ativo: o roteador não navega, então rolamos nós.
      if (destino.startsWith("/#") && location.hash === destino.slice(1)) rolarParaSecao(destino.slice(2));
    };
    document.addEventListener("click", onClick, true);
    const off = router.subscribe("onResolved", (ev) => {
      const veioDeVolta = pop;
      pop = false;
      if (veioDeVolta || !ev.hrefChanged) return;
      const hash = ev.toLocation.hash;
      if (ev.toLocation.pathname === "/" && hash) rolarParaSecao(hash, !ev.pathChanged);
    });
    return () => { window.removeEventListener("popstate", onPop); document.removeEventListener("click", onClick, true); off(); };
  }, [router]);
}

function origemPara(pathname: string): string | null {
  try {
    const o = JSON.parse(sessionStorage.getItem(CHAVE) ?? "null");
    return o && o.destino === pathname.replace(/\/+$/, "") ? o.secao : null;
  } catch { return null; }
}

/** Link discreto de retorno + trilha, no topo de toda página interna. */
export function VoltarContexto() {
  const { pathname } = useLocation();
  const [origem, setOrigem] = useState<string | null>(null);
  useEffect(() => setOrigem(origemPara(pathname)), [pathname]);
  const r = retornoPara(pathname, origem);
  if (!r) return null;
  return (
    <nav aria-label="Navegação de retorno" className="relative z-20 mx-auto max-w-[1440px] px-6 pt-28 md:px-12 md:pt-32">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Link to={r.to} {...(r.hash ? { hash: r.hash } : {})} className="vlink t-meta inline-flex items-center gap-2">
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
          <span>{r.label}</span>
        </Link>
        {r.trilha.length > 0 && (
          <ol className="t-meta flex flex-wrap items-center gap-2 text-marfim/60">
            {r.trilha.map((t, i) => (
              <li key={t.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-dourado/60">/</span>}
                {t.to ? (
                  <Link to={t.to} {...(t.hash ? { hash: t.hash } : {})} className="transition-colors hover:text-dourado">{t.label}</Link>
                ) : (
                  <span aria-current="page" className="text-marfim/85">{t.label}</span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </nav>
  );
}
