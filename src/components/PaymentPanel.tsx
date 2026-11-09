import { BANK, PRICE_PER_PERSON, RECEIPT_CONTACT, naira } from "@/lib/config";
import { CopyButton } from "./CopyButton";

/**
 * Payment details shown BEFORE registering, so nobody assumes that filling in the form reserves a seat.
 * Colours come from theme tokens, so it works on both the Christmas and the Black & Gold pages.
 */
export function PaymentPanel({ unit = "child", compact = false }: { unit?: "child" | "teen"; compact?: boolean }) {
  const waMsg = encodeURIComponent("Hello, I'm sending my payment receipt for NextGen Christmas 2026.");
  return (
    <section className="border-[1.5px] border-berry bg-berry-soft" aria-labelledby="pay-title">
      <div className="bg-berry px-4 py-3 text-on-berry">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">Important</p>
        <h2 id="pay-title" className="font-display text-3xl leading-[1.02] sm:text-4xl">
          Registration alone does not reserve your seat.
          <br />
          Payment does.
        </h2>
      </div>

      <div className="space-y-4 p-4 text-pine">
        <p className="text-[15px] leading-relaxed">
          Your seat is only confirmed after we receive and confirm your payment of <strong>{naira(PRICE_PER_PERSON)} per {unit}</strong>.
          {compact ? " Pay to the account below, then send your receipt." : " Pay by bank transfer to the account below, register, then send us your receipt. We’ll send your QR pass once payment is confirmed."}
        </p>

        <dl className="divide-y divide-line border-y-[1.5px] border-pine bg-field">
          <Row k="Account name" v={BANK.accountName} />
          <Row k="Account number" v={BANK.accountNumber} mono copy />
          <Row k="Bank" v={BANK.bank} />
          <Row k="Narration" v="Your reference (you’ll get it when you register)" small />
        </dl>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">Then send your receipt to</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {RECEIPT_CONTACT.whatsapp.map((w) => (
              <a
                key={w.intl}
                href={`https://wa.me/${w.intl}?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 bg-pine text-sm font-semibold uppercase tracking-[0.06em] text-snow transition hover:bg-berry hover:text-on-berry"
              >
                WhatsApp {w.label}
              </a>
            ))}
          </div>
          <p className="mt-2 text-sm">
            or email{" "}
            <a className="font-semibold underline underline-offset-4" href={`mailto:${RECEIPT_CONTACT.email}`}>
              {RECEIPT_CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, mono, copy, small }: { k: string; v: string; mono?: boolean; copy?: boolean; small?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-mute">{k}</dt>
      <dd className="flex items-center gap-3 text-right">
        <span className={[mono ? "font-mono text-xl font-bold tracking-wider" : small ? "text-sm text-mute" : "font-medium"].join(" ")}>{v}</span>
        {copy && <CopyButton value={v} />}
      </dd>
    </div>
  );
}
