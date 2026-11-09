"use client";

import { useState } from "react";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard unavailable; the number is visible to copy by hand */
        }
      }}
      className="h-9 shrink-0 border-[1.5px] border-current px-3 text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:bg-berry hover:text-on-berry"
      aria-live="polite"
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}
