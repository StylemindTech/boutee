import { useEffect, useState } from "react";

/**
 * Lightweight bot-friction helper: requires a checkbox, waits a short delay,
 * and fails if a hidden honeypot input is filled.
 */
export function useBotCheck(minDelayMs = 800) {
  const [checked, setChecked] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [delayPassed, setDelayPassed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDelayPassed(true), minDelayMs);
    return () => window.clearTimeout(timer);
  }, [minDelayMs]);

  const isReady = checked && delayPassed && !honeypot.trim();

  return { checked, setChecked, honeypot, setHoneypot, delayPassed, isReady };
}
