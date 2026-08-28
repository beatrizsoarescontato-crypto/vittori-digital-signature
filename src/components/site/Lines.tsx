import type { ReactNode } from "react";

/** Uma linha de título revelada por máscara (clip vertical). */
export function Line({ children }: { children: ReactNode }) {
  return (
    <span className="line-mask">
      <span className="line-inner">{children}</span>
    </span>
  );
}
