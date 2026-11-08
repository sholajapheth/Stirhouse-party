import Link from "next/link";
import { Shell } from "@/components/Shell";
import { Star } from "@/components/Star";
import { EVENT, PRICE_PER_PERSON, naira } from "@/lib/config";

export default function Home() {
  return (
    <Shell>
      <section className="py-10 text-center">
        <Star className="glow mx-auto size-16 text-gold" />
        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-gold-soft/80">Gbagada NextGen presents</p>
        <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">
          ST<span className="text-gold">★</span>R LIGHT
        </h1>
        <p className="mt-2 font-display text-xl italic text-white/80">{EVENT.tagline}</p>
        <p className="mt-6 text-white/70">
          {EVENT.date}
          <br />
          {EVENT.venue}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Choice
          href="/register/kids"
          title="Kids"
          sub="Ages 1 – 12"
          body="A parent or guardian registers up to 5 children."
        />
        <Choice
          href="/register/teens"
          title="Teens"
          sub="Ages 13 – 17"
          body="Teens register themselves, with a parent or guardian's contact."
        />
      </section>

      <p className="mt-8 text-center text-sm text-white/55">
        {naira(PRICE_PER_PERSON)} per child / teen. Pay by bank transfer after registering; you'll receive your
        entry QR code once we've confirmed your payment.
      </p>
    </Shell>
  );
}

function Choice({ href, title, sub, body }: { href: string; title: string; sub: string; body: string }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/15 bg-white/[0.05] p-6 transition hover:-translate-y-0.5 hover:border-gold hover:bg-white/[0.09]"
    >
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-3xl">{title}</h2>
        <span className="text-sm text-gold">{sub}</span>
      </div>
      <p className="mt-3 text-sm text-white/65">{body}</p>
      <span className="mt-5 inline-block text-sm font-medium text-gold transition group-hover:translate-x-1">
        Register →
      </span>
    </Link>
  );
}
