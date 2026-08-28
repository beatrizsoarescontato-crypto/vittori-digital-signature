import { useState } from "react";
import atmosfera from "@/assets/atmosphere.jpg";
import { Line } from "./Lines";
import { WHATSAPP_NUMERO } from "@/lib/contato";

const NECESSIDADES = [
  "Identidade visual",
  "Estratégia de marca",
  "Conteúdo & copy",
  "Presença digital",
];

export function CtaFinal() {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [necessidade, setNecessidade] = useState(NECESSIDADES[0]!);

  const mensagem = encodeURIComponent(
    `Olá, Vittori. Sou ${nome || "[seu nome]"}, da ${marca || "[sua marca]"}. Preciso de: ${necessidade}.`,
  );
  const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagem}`;

  return (
    <section
      id="contato"
      className="relative isolate overflow-hidden border-t border-border/40 py-28 md:py-44"
      style={{ background: "linear-gradient(160deg, #8B0F1A 0%, #3A0A10 45%, #0D0D0D 100%)" }}
    >
      <img
        src={atmosfera}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        width={1600}
        height={1008}
        data-parallax="70"
        className="absolute inset-0 -z-10 h-[130%] w-full object-cover opacity-20 mix-blend-soft-light"
      />
      <div aria-hidden className="grain-layer opacity-[0.09]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-y-16">
          <div className="col-span-12 lg:col-span-6">
            <p className="label-mono mb-6 text-dourado-claro">Brasília · Atendimento nacional</p>
            <h2 data-lines className="display text-marfim">
              <Line>Pronto para</Line>
              <Line>
                <em className="italic text-dourado-claro">criar presença?</em>
              </Line>
            </h2>
            <p data-reveal className="mt-12">
              <span className="reveal-item lead block text-marfim/75">
                Atendemos até quatro projetos por trimestre, para que cada um receba profundidade
                real. Conte o que está construindo.
              </span>
            </p>
          </div>

          <div data-reveal className="col-span-12 lg:col-span-5 lg:col-start-8">
            <form
              className="reveal-item border border-marfim/20 bg-preto/35 p-8 backdrop-blur-sm md:p-10"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(link, "_blank", "noopener,noreferrer");
              }}
            >
              <p className="label-mono text-dourado">Briefing em 20 segundos</p>

              <div className="mt-8 flex flex-col gap-6">
                <label className="block">
                  <span className="caption">Seu nome</span>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    maxLength={80}
                    autoComplete="name"
                    className="mt-2 min-h-11 w-full border-b border-marfim/25 bg-transparent pb-2 font-serif text-xl text-marfim outline-none transition-colors focus:border-dourado"
                  />
                </label>
                <label className="block">
                  <span className="caption">Sua marca</span>
                  <input
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    required
                    maxLength={80}
                    autoComplete="organization"
                    className="mt-2 min-h-11 w-full border-b border-marfim/25 bg-transparent pb-2 font-serif text-xl text-marfim outline-none transition-colors focus:border-dourado"
                  />
                </label>

                <fieldset>
                  <legend className="caption">O que você precisa</legend>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {NECESSIDADES.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNecessidade(n)}
                        className={`label-mono min-h-11 border px-4 py-2 transition-colors duration-300 ${
                          necessidade === n
                            ? "border-dourado bg-dourado text-preto"
                            : "border-marfim/25 text-marfim/70 hover:border-dourado/60"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="group relative mt-2 flex min-h-12 items-center justify-center gap-3 overflow-hidden border border-dourado px-8 py-4"
                >
                  <span className="absolute inset-0 -translate-y-full bg-dourado transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="label-mono relative text-marfim transition-colors duration-500 group-hover:text-preto">
                    Enviar no WhatsApp
                  </span>
                  <span className="relative text-dourado transition-colors duration-500 group-hover:text-preto">
                    ✦
                  </span>
                </button>

                <p className="caption text-center">
                  ou{" "}
                  <a
                    href="mailto:contato@vittori.house"
                    className="text-dourado underline decoration-dourado/40 underline-offset-4"
                  >
                    contato@vittori.house
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
