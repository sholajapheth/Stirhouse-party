import { notFound } from "next/navigation";
import { Bauble, Lights, Snow, Stars } from "@/components/Christmas";
import { Shell } from "@/components/Shell";
import { BALL, BANK, EVENT, RECEIPT_CONTACT, naira } from "@/lib/config";
import { sql } from "@/lib/db";

export const metadata = { title: "Registration received · Wonderfest 2026" };
export const dynamic = "force-dynamic";

type Reg = { id: string; ref: string; kind: string; amount: number; status: string; email: string };
type Attendee = { name: string; age: number };

export default async function Page({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const db = sql();
  const rows = (await db`select id, ref, kind, amount, status, email from registrations where ref = ${ref.toUpperCase()}`) as Reg[];
  const reg = rows[0];
  if (!reg) notFound();
  const people = (await db`select name, age from attendees where registration_id = ${reg.id} order by name`) as Attendee[];

  const ball = reg.kind === "teens";
  const wa = (n: string) =>
    `https://wa.me/${n}?text=${encodeURIComponent(`Hello, I'm sending my payment receipt for ${ball ? BALL.name : "Wonderfest 2026"}. Reference: ${reg.ref}`)}`;

  return (
    <Shell theme={ball ? "ball" : "xmas"}>
      <div className={["grain relative overflow-hidden text-white", ball ? "bg-pine-deep" : "bg-berry"].join(" ")}>
        <Snow count={16} />
        <Stars count={14} tone={ball ? "gold" : "light"} />
        {ball ? (
          <div className="absolute left-3 top-0 flex gap-3" aria-hidden>
            <Bauble tone="gold" length={22} size={24} />
            <Bauble tone="black" length={44} size={28} delay={0.8} />
          </div>
        ) : (
          <Lights />
        )}
        <div className={["relative mx-auto max-w-2xl px-4 pb-10 sm:px-6", ball ? "pt-24" : "pt-6"].join(" ")}>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">Registration received</p>
          <h1 className={["mt-2 font-display text-6xl leading-[0.9] sm:text-8xl", ball ? "gold-text" : ""].join(" ")}>You’re in.<br />Now, pay.</h1>
          <div className="mt-8 border-[1.5px] border-white p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Your reference · use as narration</p>
            <p className="mt-1 font-display text-6xl tracking-[0.08em]">{reg.ref}</p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-2xl space-y-10 px-4 py-10 sm:px-6">
        <p className="border-[1.5px] border-berry bg-berry-soft p-4 text-[15px] font-semibold leading-snug">
          Your seat is not reserved yet. Registration alone does not validate your seat: payment does. Please pay now and send your receipt.
        </p>

        <Step n="01" title="Make your transfer">
          <dl className="divide-y divide-line border-y-[1.5px] border-pine bg-field">
            <Row k="Amount" v={naira(reg.amount)} big />
            <Row k="Account name" v={BANK.accountName} />
            <Row k="Account number" v={BANK.accountNumber} mono />
            <Row k="Bank" v={BANK.bank} />
            <Row k="Narration" v={reg.ref} mono />
          </dl>
        </Step>

        <Step n="02" title="Send your receipt">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {RECEIPT_CONTACT.whatsapp.map((w) => (
              <a key={w.intl} href={wa(w.intl)} className="flex h-12 items-center justify-center bg-pine text-sm font-semibold uppercase tracking-[0.08em] text-snow hover:bg-berry hover:text-on-berry">
                WhatsApp {w.label}
              </a>
            ))}
          </div>
          <p className="mt-3 text-[15px] text-mute">
            Or email it to{" "}
            <a className="font-medium text-pine underline underline-offset-4" href={`mailto:${RECEIPT_CONTACT.email}?subject=${encodeURIComponent("Receipt " + reg.ref)}`}>
              {RECEIPT_CONTACT.email}
            </a>
          </p>
        </Step>

        <Step n="03" title="Get your QR pass">
          <p className="text-[15px] leading-relaxed">
            Once we’ve confirmed your payment we’ll send your entry QR code to <strong>{reg.email}</strong>.{" "}
            {ball ? (
              <>We’ll announce the date and venue of the {BALL.name} shortly. Dress code: <strong>{BALL.theme}</strong>.</>
            ) : (
              <>
                Bring it with you on <strong>{EVENT.date}</strong>, <strong>{EVENT.time}</strong>, at {EVENT.venue}, {EVENT.address} ({EVENT.landmark.toLowerCase()}).{" "}
                <a className="font-semibold text-berry underline underline-offset-4" href={EVENT.mapUrl} target="_blank" rel="noreferrer">Get directions</a>.
              </>
            )}
          </p>
        </Step>

        <section>
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]">Registered</h2>
          <ul className="divide-y divide-line border-y border-line">
            {people.map((p, i) => (
              <li key={i} className="flex justify-between py-3 text-[15px]">
                <span>{p.name}</span>
                <span className="text-mute">{p.age} yrs</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Shell>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-[3px] border-pine pt-4">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-display text-2xl text-berry">{n}</span>
        <h2 className="font-display text-3xl leading-none">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Row({ k, v, mono, big }: { k: string; v: string; mono?: boolean; big?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-mute">{k}</dt>
      <dd className={["text-right", mono ? "font-mono tracking-wide" : "", big ? "font-display text-4xl text-berry" : "font-medium"].join(" ")}>{v}</dd>
    </div>
  );
}
