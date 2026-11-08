import { PageHead, Shell } from "@/components/Shell";
import { KidsForm } from "./form";

export const metadata = { title: "Register your children · ST★R LIGHT" };

export default function Page() {
  return (
    <Shell back>
      <PageHead eyebrow="Kids · Ages 1–12" title="Register your children" sub="Up to five per registration." />
      <main className="mx-auto max-w-2xl px-4 pb-36 pt-8 sm:px-6 sm:pt-10">
        <KidsForm />
      </main>
    </Shell>
  );
}
