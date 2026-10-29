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
      className="float-ctl group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex size-12 items-center justify-center gap-3 text-dourado md:bottom-8 md:left-8 md:h-12 md:w-auto md:px-5"
    >
      <span aria-hidden className={`sound-bars ${on ? "is-on" : ""}`}>
        <i /><i /><i /><i />
      </span>
      <span className="label-mono hidden text-marfim/85 md:inline">{on ? "Som ligado" : "Som desligado"}</span>
    </button>
  );
}
