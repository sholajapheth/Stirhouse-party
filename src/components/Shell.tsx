import Link from "next/link";
import { Bauble, DiscoBall, Lights, Snow, Star, Stars } from "./Christmas";

export function Shell({ children, back, theme = "xmas", brand }: { children: React.ReactNode; back?: boolean; theme?: "xmas" | "ball"; brand?: string }) {
  const ball = theme === "ball";
  return (
    <div className={["min-h-dvh bg-snow", ball ? "theme-ball" : ""].join(" ")}>
      <header className="sticky top-0 z-30 bg-pine-deep text-white shadow-[0_2px_0_0_var(--color-gold)]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-display text-2xl leading-none tracking-wide">
            <Star className="size-5" />
            {brand ? <span>{brand}</span> : ball ? <span className="gold-text">TEENS CHRISTMAS BALL</span> : <span>WONDER<span className="text-gold">FEST</span> <span className="text-white/60">2026</span></span>}
          </Link>
          {back ? (
            <Link href="/" className="-mr-2 flex h-11 items-center px-2 text-sm text-white/80 hover:text-white">← Back</Link>
          ) : (
            <span className="hidden text-[11px] uppercase tracking-[0.22em] text-gold-soft/80 sm:block">{ball ? "Black & Gold" : "Merry Christmas"}</span>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}

export function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="grain relative overflow-hidden bg-berry text-white">
      <Snow count={14} />
      <Stars count={12} tone="light" />
      <Lights className="opacity-95" />
      <div className="relative mx-auto max-w-2xl px-4 pb-9 pt-5 sm:px-6 sm:pb-12">
        <p className="rise text-[11px] font-medium uppercase tracking-[0.22em] text-gold-soft" style={{ "--i": "0ms" } as React.CSSProperties}>{eyebrow}</p>
        <h1 className="rise mt-2 font-display text-[3.25rem] leading-[0.95] sm:text-7xl" style={{ "--i": "90ms" } as React.CSSProperties}>{title}</h1>
        <p className="rise mt-3 font-serif text-xl italic text-white/90" style={{ "--i": "180ms" } as React.CSSProperties}>{sub}</p>
      </div>
    </div>
  );
}

/** Black-and-gold header for the Teens Christmas Ball pages. */
export function BallHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="grain relative overflow-hidden bg-pine-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(700px_320px_at_80%_0%,#5a430f55,transparent_70%)]" aria-hidden />
      <Stars count={18} tone="gold" />
      <Snow count={10} />
      <div className="absolute left-3 top-0 z-10 flex gap-3 sm:left-10" aria-hidden>
        <Bauble tone="gold" length={26} size={26} delay={0} />
        <Bauble tone="black" length={54} size={30} delay={0.8} />
        <Bauble tone="champagne" length={18} size={22} delay={1.6} className="hidden sm:flex" />
      </div>
      <DiscoBall className="absolute -top-2 right-3 z-10 sm:right-14" size={104} />
      <div className="relative mx-auto max-w-2xl px-4 pb-10 pt-52 sm:px-6 sm:pb-14 sm:pr-40 sm:pt-24">
        <p className="rise text-[11px] font-medium uppercase tracking-[0.25em] text-gold-soft" style={{ "--i": "0ms" } as React.CSSProperties}>{eyebrow}</p>
        <h1 className="rise gold-text mt-2 font-display text-[3.6rem] leading-[0.92] sm:text-8xl" style={{ "--i": "90ms" } as React.CSSProperties}>{title}</h1>
        <p className="rise mt-3 font-serif text-xl italic text-[#f7e3a6]" style={{ "--i": "180ms" } as React.CSSProperties}>{sub}</p>
      </div>
    </div>
  );
}
