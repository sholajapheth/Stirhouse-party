import { Stars } from "@/components/Christmas";
import { PaymentPanel } from "@/components/PaymentPanel";
import { PageHead, Shell } from "@/components/Shell";
import { KidsForm } from "./form";

export const metadata = { title: "Register your children · Wonderfest 2026" };

export default function Page() {
  return (
    <Shell back>
      <PageHead eyebrow="Kids · Ages 1–12" title="Register your children" sub="Up to five per registration." />
      <main className="relative mx-auto max-w-2xl px-4 pb-36 pt-8 sm:px-6 sm:pt-10">
        <Stars count={12} tone="dark" />
        <div className="relative mb-10"><PaymentPanel unit="child" compact /></div>
        <KidsForm />
      </main>
    </Shell>
  );
}
