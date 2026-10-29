import { useEffect, useState } from "react";
import { isSoundOn, onSoundChange, setSound } from "@/lib/ambientAudio";

export function SoundToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(isSoundOn());
    return onSoundChange(setOn);
  }, []);
  return (
    <button
      type="button"
      onClick={() => void setSound(!on)}
      aria-pressed={on}
      aria-label={on ? "Desligar trilha sonora" : "Ligar trilha sonora"}
      className="group fixed bottom-6 left-5 z-40 flex min-h-12 items-center gap-3 border border-dourado/40 bg-preto/80 px-4 text-dourado backdrop-blur-md transition-colors hover:border-dourado md:bottom-8 md:left-8"
    >
      <span aria-hidden className={`sound-bars ${on ? "is-on" : ""}`}>
        <i /><i /><i /><i />
      </span>
      <span className="label-mono hidden text-marfim/80 sm:inline">{on ? "Som ligado" : "Som desligado"}</span>
    </button>
  );
}
