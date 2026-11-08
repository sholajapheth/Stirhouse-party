import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { Star } from "@/components/Star";
import { BANK, EVENT, RECEIPT_CONTACT, naira } from "@/lib/config";
import { sql } from "@/lib/db";

export const metadata = { title: "Registration received · ST★R LIGHT" };
export const dynamic = "force-dynamic";

type Reg = { ref: string; kind: string; amount: number; status: string; email: string };
type Attendee = { name: string; age: number };

export default async function Page({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  const db = sql();
  const rows = (await db`select id, ref, kind, amount, status, email from registrations where ref = ${ref.toUpperCase()}`) as (Reg & { id: string })[];
  const reg = rows[0];
  if (!reg) notFound();
  const people = (await db`select name, age from attendees where registration_id = ${reg.id} order by name`) as Attendee[];

  const wa = (n: string) =>
    `https://wa.me/${n}?text=${encodeURIComponent(`Hello, I'm sending my payment receipt for ST★R LIGHT. Reference: ${reg.ref}`)}`;

  return (
    <Shell>
      <div className="text-center">
        <Star className="glow mx-auto size-12 text-gold" />
        <h1 className="mt-4 font-display text-3xl">You're registered!</h1>
        <p className="mt-2 text-white/65">One more step: pay, then send us your receipt.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-center">
        <p className="text-xs uppercase tracking-widest text-gold-soft/80">Your reference</p>
        <p className="mt-1 font-mono text-4xl font-bold tracking-widest text-gold">{reg.ref}</p>
        <p className="mt-2 text-sm text-white/70">Use this as your transfer narration so we can find your payment quickly.</p>
      </div>

      <section className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="font-display text-xl text-gold-soft">1. Make your transfer</h2>
        <Row k="Amount" v={naira(reg.amount)} strong />
        <Row k="Account name" v={BANK.accountName} />
        <Row k="Account number" v={BANK.accountNumber} mono />
        <Row k="Bank" v={BANK.bank} />
        <Row k="Narration" v={reg.ref} mono />
      </section>

      <section className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="font-display text-xl text-gold-soft">2. Send your receipt</h2>
        <div className="flex flex-wrap gap-2">
          {RECEIPT_CONTACT.whatsapp.map((w) => (
            <a key={w.intl} href={wa(w.intl)} className="rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-black">
              WhatsApp {w.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-white/65">
          or email it to <a className="text-gold underline" href={`mailto:${RECEIPT_CONTACT.email}?subject=${encodeURIComponent("Receipt " + reg.ref)}`}>{RECEIPT_CONTACT.email}</a>
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="font-display text-xl text-gold-soft">3. Get your entry code</h2>
        <p className="mt-2 text-sm text-white/65">
          Once we've confirmed your payment, we'll email your entry QR code to <strong className="text-white">{reg.email}</strong>.
          Bring it with you on {EVENT.date}.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="font-display text-xl text-gold-soft">Registered</h2>
        <ul className="mt-2 divide-y divide-white/10 text-sm">
          {people.map((p, i) => (
            <li key={i} className="flex justify-between py-2">
              <span>{p.name}</span>
              <span className="text-white/55">{p.age} yrs</span>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

function Row({ k, v, mono, strong }: { k: string; v: string; mono?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-white/55">{k}</span>
      <span className={[mono ? "font-mono tracking-wide" : "", strong ? "text-xl font-bold text-gold" : ""].join(" ")}>{v}</span>
    </div>
  );
}
