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

const rnd2 = (i: number, salt: number) => {
  const x = Math.sin(i * 91.345 + salt * 47.853) * 24634.6345;
  return x - Math.floor(x);
};

const TONES = {
  gold: ["#f0b94a", "#f9e6b3", "#ffffff"],
  light: ["#f9e6b3", "#ffffff", "#f0b94a"],
  dark: ["#f0b94a", "#b3172b", "#1c5a42"], // for cream backgrounds
} as const;

/**
 * Small twinkling stars and sparkles scattered over a section. Half of them hug the left/right edges so
 * they frame the content rather than sit on top of the text.
 */
export function Stars({ count = 14, tone = "gold", className = "" }: { count?: number; tone?: keyof typeof TONES; className?: string }) {
  const palette = TONES[tone];
  return (
    <div className={["pointer-events-none absolute inset-0 overflow-hidden", className].join(" ")} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const edge = rnd2(i, 1) < 0.6;
        const left = edge ? (rnd2(i, 2) < 0.5 ? rnd2(i, 3) * 9 : 91 + rnd2(i, 3) * 8) : rnd2(i, 4) * 96;
        const top = rnd2(i, 5) * 96;
        const size = 7 + rnd2(i, 6) * 11;
        const sparkle = i % 2 === 0; // four-point sparkle vs five-point star
        const color = palette[i % palette.length];
        const style = {
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          color,
          animationDelay: `${-rnd2(i, 7) * 4}s`,
          animationDuration: `${2.6 + rnd2(i, 8) * 2.6}s`,
        } as CSSProperties;
        return (
          <svg key={i} viewBox="0 0 24 24" fill="currentColor" className={["sparkle absolute", i >= 8 ? "hidden sm:block" : ""].join(" ")} style={style}>
            {sparkle ? (
              <path d="M12 0c.8 6.6 3.4 9.2 12 12-8.6 2.8-11.2 5.4-12 12-.8-6.6-3.4-9.2-12-12C8.6 9.2 11.2 6.6 12 0z" />
            ) : (
              <path d="M12 1.5l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 8.8l7.1-.7L12 1.5z" />
            )}
          </svg>
        );
      })}
    </div>
  );
}
