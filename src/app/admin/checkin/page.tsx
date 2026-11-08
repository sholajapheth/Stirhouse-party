import Link from "next/link";
import { Scanner } from "./scanner";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Check-in · Wonderfest", robots: { index: false } };

export default async function Page() {
  await requireAdmin();
  return (
    <div className="min-h-dvh bg-pine-deep text-white">
      <header className="flex h-14 items-center justify-between px-4">
        <span className="font-display text-2xl leading-none">Check-in</span>
        <Link href="/admin" className="flex h-11 items-center px-2 text-sm text-white/70">← Dashboard</Link>
      </header>
      <Scanner />
    </div>
  );
}
