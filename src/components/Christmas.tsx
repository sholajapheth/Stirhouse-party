import type { CSSProperties } from "react";

/** Deterministic pseudo-random so server and client markup always match. */
const rnd = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export function Snow({ count = 26 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const s = 2 + rnd(i, 1) * 5;
        const style = {
          "--x": `${rnd(i, 2) * 100}%`,
          "--s": `${s}px`,
          "--d": `${9 + rnd(i, 3) * 11}s`,
          "--delay": `${-rnd(i, 4) * 18}s`,
          "--sway": `${(rnd(i, 5) - 0.5) * 90}px`,
          "--o": `${0.45 + rnd(i, 6) * 0.5}`,
        } as CSSProperties;
        return <span key={i} className={i % 3 === 0 ? "flake hidden sm:block" : "flake"} style={style} />;
      })}
    </div>
  );
}

const BULBS = [
  ["#e23b4e", "#e23b4e"],
  ["#f0b94a", "#f0b94a"],
  ["#37a876", "#37a876"],
  ["#fff3d6", "#ffe6a8"],
] as const;

/** A swag of twinkling Christmas lights. */
export function Lights({ className = "" }: { className?: string }) {
  const n = 16;
  return (
    <div className={["pointer-events-none relative h-9 w-full overflow-hidden", className].join(" ")} aria-hidden>
      <svg className="absolute inset-x-0 top-0 h-full w-full" viewBox="0 0 1600 36" preserveAspectRatio="none">
        <path d="M0 4 Q 100 26 200 4 T 400 4 T 600 4 T 800 4 T 1000 4 T 1200 4 T 1400 4 T 1600 4" fill="none" stroke="#0b2a20" strokeWidth="2" />
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-between px-1 sm:px-4">
        {Array.from({ length: n }, (_, i) => {
          const [bg, glow] = BULBS[i % BULBS.length];
          const drop = i % 2 === 0 ? 8 : 15; // alternate heights so it hangs like a real swag
          return (
            <span
              key={i}
              className={["bulb block h-3.5 w-2.5 rounded-b-full rounded-t-[40%]", i >= 10 ? "hidden sm:block" : ""].join(" ")}
              style={{ background: bg, marginTop: drop, "--glow": glow, animationDelay: `${(i * 0.37) % 2.4}s` } as CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={["star", className].join(" ")} fill="#f0b94a">
      <path d="M12 1.5l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 8.8l7.1-.7L12 1.5z" />
    </svg>
  );
}

export function BellSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden>
      <defs>
        <linearGradient id="bellg" x1="0" x2="1">
          <stop offset="0" stopColor="#c98a1a" /><stop offset=".45" stopColor="#ffe08a" /><stop offset="1" stopColor="#b8780f" />
        </linearGradient>
      </defs>
      <path d="M32 4a4 4 0 0 1 4 4v3c10 3 17 12 17 24v12l7 10v3H4v-3l7-10V35c0-12 7-21 17-24V8a4 4 0 0 1 4-4z" fill="url(#bellg)" />
      <ellipse cx="32" cy="70" rx="9" ry="7" fill="#b8780f" />
      <circle cx="32" cy="8" r="5" fill="none" stroke="#b8780f" strokeWidth="3" />
    </svg>
  );
}
