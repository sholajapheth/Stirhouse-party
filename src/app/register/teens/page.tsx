import { Shell } from "@/components/Shell";
import { PRICE_PER_PERSON, naira } from "@/lib/config";
import { TeenForm } from "./form";

export const metadata = { title: "Teens registration · ST★R LIGHT" };

export default function Page() {
  return (
    <Shell back>
      <h1 className="font-display text-3xl">Teens registration</h1>
      <p className="mt-2 text-white/65">Ages 13–17 · {naira(PRICE_PER_PERSON)} per teen</p>
      <div className="mt-8">
        <TeenForm />
      </div>
    </Shell>
  );
}
