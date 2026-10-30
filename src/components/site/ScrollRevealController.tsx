import { useLocation } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Isolates route subscriptions from the shared shell's hook signature. */
export function ScrollRevealController() {
  const pathname = useLocation({ select: location => location.pathname });
  useScrollReveal(pathname);
  return null;
}