import Link from "next/link";
import type { CSSProperties } from "react";
import { Bells } from "@/components/Bells";
import { Lights, Snow, Star } from "@/components/Christmas";
import { Shell } from "@/components/Shell";
import { EVENT, PRICE_PER_PERSON, naira } from "@/lib/config";

const STEPS = [
  ["01", "Register", "Tell us who’s coming. It takes two minutes."],
  ["02", "Pay by transfer", `${naira(PRICE_PER_PERSON)} per child, using your reference.`],
  ["03", "Get your QR pass", "We confirm your payment and send your entry pass."],
];

const d = (ms: number) => ({ "--i": `${ms}ms` }) as CSSProperties;

export default function Home() {
  const ticker = Array.from({ length: 6 }, () => "Joy to the world · Wonderfest 2026 · Kidzzone & Stirhouse · Jingle all the way · ");
  return (
    <Shell>
      {/* HERO */}
      <section className="grain relative overflow-hidden bg-pine-deep text-white">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,#1f6a4d_0%,transparent_70%)]" aria-hidden />
        <Snow count={34} />
        <Lights />
        <Bells className="absolute right-1 top-0 z-10 sm:right-8" />

        <div className="relative mx-auto max-w-5xl px-4 pb-14 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
          <Star className="rise mb-3 size-9 sm:size-12" />
          <p className="rise text-[11px] font-medium uppercase tracking-[0.25em] text-gold-soft" style={d(60)}>
            Harvesters NextGen Gbagada · Christmas 2026
          </p>
          <h1 className="rise mt-3 font-display text-[5.6rem] leading-[0.82] sm:text-[11rem]" style={d(140)}>
            WONDER
            <br />
            <span className="text-gold">FEST</span> <span className="text-berry/0 [-webkit-text-stroke:2px_var(--color-gold-soft)] sm:[-webkit-text-stroke:3px_var(--color-gold-soft)]">26</span>
          </h1>
          <p className="rise mt-5 max-w-md font-serif text-2xl italic leading-snug text-white/90 sm:text-3xl" style={d(240)}>
            A Christmas celebration for Kidzzone &amp; Stirhouse, and the whole family.
          </p>

          <div className="rise mt-9 grid gap-x-10 gap-y-5 border-t border-white/20 pt-6 text-sm sm:grid-cols-3" style={d(340)}>
            <Detail k="When" v="Saturday, 12 December 2026">
              <span className="mt-0.5 block text-white/75">Starts at {EVENT.time}</span>
            </Detail>
            <Detail k="Where" v={EVENT.venue}>
              <span className="mt-0.5 block text-white/75">{EVENT.address}</span>
              <span className="block text-white/60">{EVENT.landmark}</span>
              <a href={EVENT.mapUrl} target="_blank" rel="noreferrer" className="mt-1.5 inline-block font-semibold text-gold underline underline-offset-4">
                Get directions →
              </a>
            </Detail>
            <Detail k="Per child" v={naira(PRICE_PER_PERSON)}>
              <span className="mt-0.5 block text-white/75">Includes a meal for one accompanying adult</span>
            </Detail>
          </div>
        </div>

        <div className="overflow-hidden border-y border-gold/40 bg-berry py-2.5" aria-hidden>
          <div className="ticker flex w-max whitespace-nowrap font-display text-xl tracking-wider text-white">
            {[0, 1].map((k) => (
              <span key={k} className="flex">{ticker.map((t, i) => <span key={i} className="pr-2">{t}</span>)}</span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE'RE CELEBRATING */}
      <section className="bg-snow">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <Star className="mx-auto size-8" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-berry">Why we celebrate</p>
          <blockquote className="mt-4 font-serif text-3xl italic leading-tight text-pine sm:text-5xl">
            “For unto us a child is born, unto us a son is given… and his name shall be called{" "}
            <span className="not-italic text-berry">Wonderful</span>.”
          </blockquote>
          <p className="mt-3 text-sm text-mute">Isaiah 9:6</p>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-pine/85">
            Wonderfest is a day of joy, games, food and gifts, built around one reason: the birth of Jesus Christ, our Saviour.
            Come and celebrate with your children.
          </p>
        </div>
      </section>

      {/* REGISTER */}
      <main className="border-t-[3px] border-gold bg-pine text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-5xl sm:text-7xl">Who’s coming?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Choice href="/register/kids" title="Kids" sub="Ages 1 – 12" body="A parent or guardian registers up to five children." tone="snow" />
            <Choice href="/register/teens" title="Teens" sub="Ages 13 – 17" body="Teens register themselves with a guardian’s contact." tone="berry" />
          </div>
        </div>
      </main>

      {/* HOW IT WORKS */}
      <section className="bg-snow">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="font-display text-5xl text-pine sm:text-7xl">How it works</h2>
          <ol className="mt-6 grid border-t-[3px] border-berry sm:grid-cols-3">
            {STEPS.map(([n, t, text]) => (
              <li key={n} className="border-b border-line py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                <span className="font-display text-4xl text-berry">{n}</span>
                <h3 className="mt-1 text-lg font-semibold text-pine">{t}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-mute">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="grain relative overflow-hidden bg-berry px-4 py-10 text-center text-white">
        <Snow count={12} />
        <p className="relative font-display text-3xl">Merry Christmas from Harvesters NextGen</p>
        <p className="relative mt-1 text-xs text-white/70">Harvesters International Christian Centre · Gbagada</p>
      </footer>
    </Shell>
  );
}

function Detail({ k, v, children }: { k: string; v: string; children?: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold-soft/80">{k}</p>
      <p className="mt-0.5 text-lg font-medium">{v}</p>
      {children}
    </div>
  );
}

function Choice({ href, title, sub, body, tone }: { href: string; title: string; sub: string; body: string; tone: "snow" | "berry" }) {
  const t = tone === "snow" ? "bg-snow text-pine hover:bg-gold-soft" : "bg-berry text-white hover:bg-berry-deep";
  return (
    <Link href={href} className={["group relative flex min-h-60 flex-col justify-between overflow-hidden border-[1.5px] border-gold p-5 transition sm:min-h-72 sm:p-7", t].join(" ")}>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] opacity-70">{sub}</p>
        <h3 className="mt-2 font-display text-7xl leading-none sm:text-8xl">{title}</h3>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed opacity-80">{body}</p>
      </div>
      <span className="mt-6 flex items-center justify-between border-t border-current/30 pt-3 text-sm font-semibold uppercase tracking-[0.12em]">
        Register <span className="text-xl transition group-hover:translate-x-1.5">→</span>
      </span>
    </Link>
  );
}
