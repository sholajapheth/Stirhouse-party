import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./form";

export const metadata = { title: "Admin · Wonderfest", robots: { index: false } };

export default async function Page() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="grain flex min-h-dvh flex-col justify-center bg-black px-4 text-white">
      <div className="mx-auto w-full max-w-sm">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">Wonderfest 2026</p>
        <h1 className="mt-2 font-display text-7xl leading-[0.9]">Admin</h1>
        <LoginForm />
      </div>
    </div>
  );
}
