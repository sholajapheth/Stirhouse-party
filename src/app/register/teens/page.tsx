import { Stars } from "@/components/Christmas";
import { BallHead, Shell } from "@/components/Shell";
import { PRICE_PER_PERSON, naira } from "@/lib/config";
import { TeenForm } from "./form";

export const metadata = { title: "Teens Christmas Ball · Register" };

export default function Page() {
  return (
    <Shell back theme="ball">
      <BallHead eyebrow={`Stirhouse · Ages 13–17 · ${naira(PRICE_PER_PERSON)}`} title="Teens Christmas Ball" sub="Black & gold. Dress to shine." />
      <main className="relative mx-auto max-w-2xl px-4 pb-36 pt-8 sm:px-6 sm:pt-10">
        <Stars count={12} tone="gold" />
        <TeenForm />
      </main>
    </Shell>
  );
}
