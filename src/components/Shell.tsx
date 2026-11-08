import Link from "next/link";
import { EVENT } from "@/lib/config";
import { Star } from "./Star";

export function Shell({ children, back }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div className="stars relative min-h-dvh">
      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg tracking-wide text-gold-soft">
            <Star className="glow size-5 text-gold" />
            {EVENT.name}
          </Link>
          {back && (
            <Link href="/" className="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
              ← Back
            </Link>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}
