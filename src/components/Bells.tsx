"use client";

import { useRef, useState } from "react";
import { BellSvg } from "./Christmas";

/** Two bells that sway on their own. Tap one to ring it (with a little synthesised jingle). */
export function Bells({ className = "" }: { className?: string }) {
  const [ringing, setRinging] = useState<number | null>(null);
  const ctx = useRef<AudioContext | null>(null);

  function jingle() {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx.current ??= new AC();
      const a = ctx.current;
      const now = a.currentTime;
      // a bright 3-note "ding-ding-ding" with inharmonic overtones, like a small bell
      [1318.5, 1568, 2093].forEach((f, i) => {
        [1, 2.76, 5.4].forEach((m, k) => {
          const o = a.createOscillator();
          const g = a.createGain();
          o.type = "sine";
          o.frequency.value = f * m;
          const t = now + i * 0.13;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.16 / (k + 1), t + 0.008);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1 / (k + 1));
          o.connect(g).connect(a.destination);
          o.start(t);
          o.stop(t + 1.2);
        });
      });
    } catch {
      /* audio is a nicety; ignore */
    }
  }

  function ring(i: number) {
    setRinging(null);
    requestAnimationFrame(() => setRinging(i));
    jingle();
    setTimeout(() => setRinging((r) => (r === i ? null : r)), 1000);
  }

  return (
    <div className={["flex items-start gap-1", className].join(" ")}>
      {[0, 1].map((i) => (
        <button
          key={i} onClick={() => ring(i)} aria-label="Ring the jingle bell"
          className="group -mx-1 p-2"
        >
          <span className="relative block">
            <span className="mx-auto block h-5 w-0.5 bg-gold/70" aria-hidden />
            <BellSvg
              className={["bell h-12 w-10 drop-shadow-[0_4px_8px_rgba(0,0,0,.35)] sm:h-16 sm:w-12", ringing === i ? "ring" : ""].join(" ")}
            />
          </span>
        </button>
      ))}
    </div>
  );
}
