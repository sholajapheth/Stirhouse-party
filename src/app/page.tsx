import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PRICE_PER_PERSON, naira } from "@/lib/config";

const STEPS = [
  ["01", "Register", "Fill in the details. It takes two minutes."],
  ["02", "Pay by transfer", `${naira(PRICE_PER_PERSON)} per child, using your reference.`],
  ["03", "Get your QR code", "We confirm your payment and email your entry pass."],
];

export default function Home() {
  const ticker = Array.from({ length: 8 }, () => "Wonderfest 2026 · Kidzzone & Stirhouse · ");
  return (
    <Shell>
      <section className="grain bg-black text-white">
        <div className="mx-auto max-w-5xl px-4 pb-12 pt-12 sm:px-6 sm:pb-20 sm:pt-20">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/55">
            Harvesters NextGen Gbagada · Christmas 2026
          </p>
          <h1 className="mt-4 font-display text-[5.75rem] leading-[0.82] sm:text-[11rem]">
            WONDER
            <br />
            <span className="text-[#c8506b]">FEST</span> <span className="text-white/35">26</span>
          </h1>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-5 text-sm">
            <Detail k="When" v="Sun, 13 Dec 2026" />
            <Detail k="Where" v="HICC Gbagada" />
            <Detail k="Per child" v={`${naira(PRICE_PER_PERSON)} · includes a meal for one adult`} />
          </div>
        </div>
        <div className="overflow-hidden border-y border-white/15 bg-wine py-2.5" aria-hidden>
          <div className="ticker flex w-max whitespace-nowrap font-display text-xl tracking-wider">
            {[0, 1].map((k) => (
              <span key={k} className="flex">{ticker.map((t, i) => <span key={i} className="pr-2">{t}</span>)}</span>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="font-display text-4xl sm:text-6xl">Who’s coming?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Choice href="/register/kids" title="Kids" sub="Ages 1 – 12" body="A parent or guardian registers up to five children." />
          <Choice href="/register/teens" title="Teens" sub="Ages 13 – 17" body="Teens register themselves with a guardian’s contact." dark />
        </div>

        <h2 className="mt-16 font-display text-4xl sm:text-6xl">How it works</h2>
        <ol className="mt-6 grid gap-0 border-t-[3px] border-black sm:grid-cols-3">
          {STEPS.map(([n, t, d]) => (
            <li key={n} className="border-b border-line py-5 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
              <span className="font-display text-3xl text-wine">{n}</span>
              <h3 className="mt-1 text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </main>

      <footer className="bg-black px-4 py-8 text-center text-xs text-white/50">
        Harvesters International Christian Centre · Gbagada NextGen
      </footer>
    </Shell>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">{k}</p>
      <p className="mt-0.5 text-base">{v}</p>
    </div>
  );
}

function Choice({ href, title, sub, body, dark }: { href: string; title: string; sub: string; body: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={[
        "group flex min-h-56 flex-col justify-between border-[1.5px] border-black p-5 transition sm:min-h-72 sm:p-7",
        dark ? "bg-black text-white hover:bg-wine" : "bg-white hover:bg-wine hover:text-white",
      ].join(" ")}
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] opacity-60">{sub}</p>
        <h3 className="mt-2 font-display text-7xl leading-none sm:text-8xl">{title}</h3>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed opacity-75">{body}</p>
      </div>
      <span className="mt-6 flex items-center justify-between border-t border-current/30 pt-3 text-sm font-semibold uppercase tracking-[0.12em]">
        Register <span className="text-xl transition group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
