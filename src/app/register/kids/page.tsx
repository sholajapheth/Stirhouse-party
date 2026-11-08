import { Shell } from "@/components/Shell";
import { PRICE_PER_PERSON, naira } from "@/lib/config";
import { KidsForm } from "./form";

export const metadata = { title: "Register your children · ST★R LIGHT" };

export default function Page() {
  return (
    <Shell back>
      <h1 className="font-display text-3xl">Register your children</h1>
      <p className="mt-2 text-white/65">Ages 1–12 · {naira(PRICE_PER_PERSON)} per child</p>
      <div className="mt-8">
        <KidsForm />
      </div>
    </Shell>
  );
}
