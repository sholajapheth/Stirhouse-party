"use client";

import { useState, useTransition } from "react";
import { approve, resendEmail, unapprove } from "./actions";
import { SITE_URL, naira, waNumber } from "@/lib/config";

export type Reg = {
  id: string; ref: string; kind: "kids" | "teens"; email: string; contact_name: string; contact_phone: string;
  guardian_name: string | null; guardian_phone: string | null; member_status: string; amount: number;
  status: "pending" | "paid"; code: string | null; paid_at: string | null; created_at: string; checked_in_at: string | null;
  people: { name: string; age: number }[];
};

const when = (s: string) =>
  new Date(s).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

export function RegCard({ r }: { r: Reg }) {
  const [pending, start] = useTransition();
  const [note, setNote] = useState("");
  const paid = r.status === "paid";
  const pass = r.code ? `${SITE_URL}/pass/${r.code}` : "";
  const msg = `Hello ${r.contact_name}, your payment for Wonderfest 2026 is confirmed. 🎉 Here is your entry pass (show the QR code at the door): ${pass}`;

  return (
    <li className={["border-[1.5px] bg-white", paid ? "border-black" : "border-wine"].join(" ")}>
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="font-mono text-sm font-bold tracking-wider text-wine">{r.ref}</p>
          <p className="mt-0.5 truncate text-lg font-semibold">{r.contact_name}</p>
          <p className="text-sm text-mute">{r.kind === "teens" ? "Teen" : "Kids"} · {when(r.created_at)}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-3xl leading-none">{naira(r.amount)}</p>
          <span className={["mt-1 inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]", paid ? "bg-black text-white" : "bg-wine-soft text-wine"].join(" ")}>
            {r.checked_in_at ? "Checked in" : paid ? "Paid" : "Awaiting"}
          </span>
        </div>
      </div>

      <div className="border-t border-line px-4 py-3 text-sm">
        <p className="text-mute">{r.people.map((p) => `${p.name} (${p.age})`).join(" · ")}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <a className="underline underline-offset-4" href={`tel:${r.contact_phone}`}>{r.contact_phone}</a>
          <a className="break-all underline underline-offset-4" href={`mailto:${r.email}`}>{r.email}</a>
        </p>
        {r.guardian_name && <p className="mt-1 text-mute">Guardian: {r.guardian_name} · {r.guardian_phone}</p>}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line p-3">
        {!paid ? (
          <button
            disabled={pending}
            onClick={() => {
              if (confirm(`Confirm payment of ${naira(r.amount)} from ${r.contact_name} (${r.ref})?`)) start(() => approve(r.ref));
            }}
            className="h-12 flex-1 bg-wine px-5 text-sm font-semibold uppercase tracking-[0.1em] text-white hover:bg-wine-deep disabled:opacity-60"
          >
            {pending ? "Approving…" : "Confirm payment"}
          </button>
        ) : (
          <>
            <a
              href={`https://wa.me/${waNumber(r.contact_phone)}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer"
              className="flex h-12 flex-1 items-center justify-center bg-black px-4 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-wine"
            >
              Send on WhatsApp
            </a>
            <a href={pass} target="_blank" rel="noreferrer" className="flex h-12 items-center border-[1.5px] border-black px-4 text-sm font-semibold uppercase tracking-[0.08em]">
              View pass
            </a>
            <button
              onClick={() => start(async () => {
                const res = await resendEmail(r.ref);
                setNote(!res.configured ? "Email isn't set up yet." : res.ok ? "Email sent." : "Email failed.");
              })}
              disabled={pending}
              className="h-12 border-[1.5px] border-black px-4 text-sm font-semibold uppercase tracking-[0.08em] disabled:opacity-60"
            >
              Email
            </button>
          </>
        )}
      </div>

      {paid && (
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-xs text-mute">
          <span>Code <b className="font-mono text-black">{r.code}</b>{note && <> · {note}</>}</span>
          <button
            className="underline underline-offset-4 hover:text-wine"
            onClick={() => { if (confirm(`Undo payment for ${r.ref}? Its code will stop working.`)) start(() => unapprove(r.ref)); }}
          >
            Undo
          </button>
        </div>
      )}
    </li>
  );
}
