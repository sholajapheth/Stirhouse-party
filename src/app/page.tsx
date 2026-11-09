import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Bauble, DiscoBall, Lights, Snow, Star, Stars } from "@/components/Christmas";
import { Bells } from "@/components/Bells";
import { Gallery } from "@/components/Gallery";
import { PaymentPanel } from "@/components/PaymentPanel";
import { Shell } from "@/components/Shell";
import { BALL, EVENT, PRICE_PER_PERSON, naira } from "@/lib/config";

const STEPS = [
  ["01", "Register", "Pick your event and tell us who’s coming."],
  ["02", "Pay by transfer", `${naira(PRICE_PER_PERSON)} each, using your reference.`],
  ["03", "Get your QR pass", "We confirm your payment and send your entry pass."],
];

const d = (ms: number) => ({ "--i": `${ms}ms` }) as CSSProperties;

export default function Home() {
  const hasHero = existsSync(join(process.cwd(), "public", "photos", "hero.jpg"));
  const ticker = Array.from({ length: 6 }, () => "Joy to the world · Wonderfest 2026 · Teens Christmas Ball · Jingle all the way · ");
  return (
    <Shell brand="NEXTGEN CHRISTMAS 2026">
      <section className="grid lg:grid-cols-2">
        {/* LEFT: WONDERFEST (kids) */}
        <div className="grain relative overflow-hidden bg-pine-deep text-white">
          {hasHero && <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url(/photos/hero.jpg)" }} aria-hidden />}
          <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,#1f6a4d_0%,transparent_70%)]" aria-hidden />
          <Snow count={30} />
          <Stars count={16} tone="gold" />
          <Lights />
          <Bells className="absolute right-1 top-0 z-10 sm:right-6" />

          <div className="relative flex h-full flex-col px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
            <Star className="rise mb-3 size-9" />
            <p className="rise text-[11px] font-medium uppercase tracking-[0.25em] text-gold-soft" style={d(60)}>
              Kidzzone · Ages 1–12
            </p>
            <h1 className="rise mt-3 font-display text-[5.2rem] leading-[0.82] sm:text-[8.5rem]" style={d(140)}>
              WONDER
              <br />
              <span className="text-gold">FEST</span> <span className="text-transparent [-webkit-text-stroke:2px_var(--color-gold-soft)]">26</span>
            </h1>
            <p className="rise mt-5 max-w-sm font-serif text-2xl italic leading-snug text-white/90" style={d(240)}>
              A Christmas celebration for our children, and the whole family.
            </p>

            <dl className="rise mt-8 grid gap-5 border-t border-white/20 pt-6 text-sm" style={d(340)}>
              <Detail k="When" v={EVENT.date}>
                <span className="mt-0.5 block text-white/75">Starts at {EVENT.time}</span>
              </Detail>
              <Detail k="Where" v={`${EVENT.venue} · ${EVENT.hall}`}>
                <span className="mt-0.5 block text-white/75">{EVENT.address}</span>
                <span className="block text-white/60">{EVENT.landmark}</span>
                <a href={EVENT.mapUrl} target="_blank" rel="noreferrer" className="mt-1.5 inline-block font-semibold text-gold underline underline-offset-4">Get directions →</a>
              </Detail>
              <Detail k="Per child" v={naira(PRICE_PER_PERSON)}>
                <span className="mt-0.5 block text-white/75">Includes a meal for one accompanying adult</span>
              </Detail>
            </dl>

            <Link href="/register/kids" className="rise mt-9 flex h-14 items-center justify-between bg-gold px-5 text-sm font-semibold uppercase tracking-[0.12em] text-pine-deep transition hover:bg-gold-soft" style={d(440)}>
              Register your children <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT: TEENS CHRISTMAS BALL */}
        <div className="grain theme-ball relative overflow-hidden bg-snow text-white">
          <div className="absolute inset-0 bg-[radial-gradient(800px_420px_at_50%_0%,#5a430f66,transparent_70%)]" aria-hidden />
          <Stars count={22} tone="gold" />
          <Snow count={8} />
          <div className="absolute left-3 top-0 z-10 flex gap-3 sm:left-8" aria-hidden>
            <Bauble tone="gold" length={30} size={26} delay={0} />
            <Bauble tone="black" length={62} size={32} delay={0.7} />
            <Bauble tone="champagne" length={20} size={22} delay={1.5} />
          </div>
          <DiscoBall className="absolute -top-2 right-3 z-10 sm:right-10" size={112} />

          <div className="relative flex h-full flex-col px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
            <p className="rise text-[11px] font-medium uppercase tracking-[0.25em] text-gold-soft" style={d(60)}>
              Stirhouse · Ages 13–17
            </p>
            <h2 className="rise gold-text mt-3 font-display text-[5.2rem] leading-[0.82] sm:text-[8.5rem]" style={d(140)}>
              TEENS
              <br />
              BALL
            </h2>
            <p className="rise mt-5 max-w-sm font-serif text-2xl italic leading-snug text-[#f7e3a6]" style={d(240)}>
              A Christmas ball. Dress up, shine bright, celebrate in black &amp; gold.
            </p>

            <dl className="rise mt-8 grid gap-5 border-t border-[#f0c35a]/30 pt-6 text-sm" style={d(340)}>
              <Detail k="Theme" v={BALL.theme} />
              <Detail k="When" v={BALL.date}>
                <span className="mt-0.5 block text-white/75">Starts at {BALL.time}</span>
              </Detail>
              <Detail k="Where" v={`${BALL.venue} · ${BALL.hall}`}>
                <span className="mt-0.5 block text-white/75">{EVENT.address}</span>
                <span className="block text-white/60">{EVENT.landmark}</span>
                <a href={EVENT.mapUrl} target="_blank" rel="noreferrer" className="mt-1.5 inline-block font-semibold text-gold underline underline-offset-4">Get directions →</a>
              </Detail>
              <Detail k="Per teen" v={naira(PRICE_PER_PERSON)} />
            </dl>

            <Link href="/register/teens" className="rise mt-9 flex h-14 items-center justify-between bg-gold px-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#0b0907] transition hover:bg-gold-soft" style={d(440)}>
              Register for the Ball <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-gold/40 bg-berry py-2.5" aria-hidden>
        <div className="ticker flex w-max whitespace-nowrap font-display text-xl tracking-wider text-white">
          {[0, 1].map((k) => (
            <span key={k} className="flex">{ticker.map((t, i) => <span key={i} className="pr-2">{t}</span>)}</span>
          ))}
        </div>
      </div>

      {/* PAYMENT: visible before anyone registers */}
      <section className="relative overflow-hidden bg-snow">
        <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <PaymentPanel unit="child" />
          <p className="mt-3 text-center text-sm text-mute">Same account for Wonderfest and the Teens Ball: {naira(PRICE_PER_PERSON)} per child or teen.</p>
        </div>
      </section>

      {/* WHAT WE'RE CELEBRATING */}
      <section className="relative overflow-hidden bg-snow">
        <Stars count={14} tone="dark" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <Star className="mx-auto size-8" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-berry">Why we celebrate</p>
          <blockquote className="mt-4 font-serif text-3xl italic leading-tight text-pine sm:text-5xl">
            “For unto us a child is born, unto us a son is given… and his name shall be called{" "}
            <span className="not-italic text-berry">Wonderful</span>.”
          </blockquote>
          <p className="mt-3 text-sm text-mute">Isaiah 9:6</p>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-pine/85">
            Whether it’s Wonderfest or the Ball, everything we do this Christmas points to one reason: the birth of Jesus Christ, our Saviour.
          </p>
        </div>
      </section>

      <Gallery />

      <section className="relative overflow-hidden border-t-[3px] border-gold bg-pine text-white">
        <Stars count={12} tone="light" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-5xl sm:text-7xl">How it works</h2>
          <ol className="mt-6 grid border-t-[3px] border-gold sm:grid-cols-3">
            {STEPS.map(([n, t, text]) => (
              <li key={n} className="border-b border-white/15 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                <span className="font-display text-4xl text-gold">{n}</span>
                <h3 className="mt-1 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-white/75">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="grain relative overflow-hidden bg-berry px-4 py-10 text-center text-white">
        <Snow count={12} />
        <Stars count={10} tone="light" />
        <p className="relative font-display text-3xl">Merry Christmas from Harvesters NextGen</p>
        <p className="relative mt-1 text-xs text-white/70">Harvesters International Christian Centre · Gbagada</p>
      </footer>
    </Shell>
  );
}

function Detail({ k, v, children }: { k: string; v: string; children?: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.18em] text-gold-soft/80" dangerouslySetInnerHTML={{ __html: k }} />
      <dd>
        <span className="mt-0.5 block text-lg font-medium">{v}</span>
        {children}
      </dd>
    </div>
  );
}
