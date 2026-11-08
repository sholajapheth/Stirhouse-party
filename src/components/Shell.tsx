import Link from "next/link";
import { Lights, Snow, Star } from "./Christmas";

export function Shell({ children, back }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div className="min-h-dvh bg-snow">
      <header className="sticky top-0 z-30 bg-pine-deep text-white shadow-[0_2px_0_0_var(--color-gold)]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-display text-2xl leading-none tracking-wide">
            <Star className="size-5" />
            <span>WONDER<span className="text-gold">FEST</span> <span className="text-white/60">2026</span></span>
          </Link>
          {back ? (
            <Link href="/" className="-mr-2 flex h-11 items-center px-2 text-sm text-white/80 hover:text-white">← Back</Link>
          ) : (
            <span className="hidden text-[11px] uppercase tracking-[0.22em] text-gold-soft/80 sm:block">Merry Christmas</span>
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
      <Lights className="opacity-95" />
      <div className="relative mx-auto max-w-2xl px-4 pb-9 pt-5 sm:px-6 sm:pb-12">
        <p className="rise text-[11px] font-medium uppercase tracking-[0.22em] text-gold-soft" style={{ "--i": "0ms" } as React.CSSProperties}>{eyebrow}</p>
        <h1 className="rise mt-2 font-display text-[3.25rem] leading-[0.95] sm:text-7xl" style={{ "--i": "90ms" } as React.CSSProperties}>{title}</h1>
        <p className="rise mt-3 font-serif text-xl italic text-white/90" style={{ "--i": "180ms" } as React.CSSProperties}>{sub}</p>
      </div>
    </div>
  );
}
