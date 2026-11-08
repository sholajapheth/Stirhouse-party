import Link from "next/link";

export function Shell({ children, back }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div className="min-h-dvh bg-bone">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black text-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-display text-2xl leading-none tracking-wide">
            WONDER<span className="text-[#c8506b]">FEST</span> <span className="text-white/50">2026</span>
          </Link>
          {back ? (
            <Link href="/" className="-mr-2 flex h-11 items-center px-2 text-sm text-white/70 hover:text-white">
              ← Back
            </Link>
          ) : (
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">Gbagada NextGen</span>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}

export function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="grain bg-wine text-white">
      <div className="mx-auto max-w-2xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">{eyebrow}</p>
        <h1 className="mt-2 font-display text-[3.25rem] leading-[0.95] sm:text-7xl">{title}</h1>
        <p className="mt-3 font-serif text-xl italic text-white/85">{sub}</p>
      </div>
    </div>
  );
}
