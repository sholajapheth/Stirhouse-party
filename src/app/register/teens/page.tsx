import { Stars } from "@/components/Christmas";
import { PageHead, Shell } from "@/components/Shell";
import { TeenForm } from "./form";

export const metadata = { title: "Teens registration · Wonderfest 2026" };

export default function Page() {
  return (
    <Shell back>
      <PageHead eyebrow="Teens · Ages 13–17" title="Teens registration" sub="Your pass, your night." />
      <main className="relative mx-auto max-w-2xl px-4 pb-36 pt-8 sm:px-6 sm:pt-10">
        <Stars count={12} tone="dark" />
        <TeenForm />
      </main>
    </Shell>
  );
}
