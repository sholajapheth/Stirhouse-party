"use client";

import { useActionState, useState } from "react";
import { registerKids, type FormState } from "@/app/actions";
import { AgeSelect, Field, MemberStatus, SubmitButton } from "@/components/fields";
import { KIDS_AGES, MAX_KIDS, PRICE_PER_PERSON, naira } from "@/lib/config";

const arr = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

export function KidsForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(registerKids, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const initialNames = arr(v.childName);
  const [count, setCount] = useState(Math.max(1, initialNames.length));
  const ages = arr(v.childAge);
  const names = initialNames;

  return (
    <form action={action} className="space-y-6">
      {state.message && (
        <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}

      <Section title="Your details">
        <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" defaultValue={v.email as string} error={e.email} hint="Your entry code will be sent here." />
        <Field label="Parent / guardian's name" name="contactName" autoComplete="name" defaultValue={v.contactName as string} error={e.contactName} />
        <Field label="Parent / guardian's phone number" name="contactPhone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.contactPhone as string} error={e.contactPhone} />
      </Section>

      <Section title="Your children">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="grid grid-cols-[1fr_6.5rem] gap-3">
            <Field label={`Name of child ${i + 1}`} name="childName" defaultValue={names[i]} error={e[`children.${i}.name`]} />
            <AgeSelect name="childAge" ages={KIDS_AGES} defaultValue={ages[i]} error={e[`children.${i}.age`]} />
          </div>
        ))}
        {e.children && <p role="alert" className="text-sm text-red-300">{e.children}</p>}
        <div className="flex gap-4 text-sm">
          {count < MAX_KIDS && (
            <button type="button" onClick={() => setCount(count + 1)} className="text-gold underline-offset-4 hover:underline">
              + Add another child
            </button>
          )}
          {count > 1 && (
            <button type="button" onClick={() => setCount(count - 1)} className="text-white/55 underline-offset-4 hover:underline">
              Remove last
            </button>
          )}
        </div>
      </Section>

      <MemberStatus error={e.memberStatus} defaultValue={v.memberStatus as string} />

      <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm">
        <div className="flex justify-between">
          <span>{count} {count === 1 ? "child" : "children"} × {naira(PRICE_PER_PERSON)}</span>
          <strong className="text-gold-soft">{naira(count * PRICE_PER_PERSON)}</strong>
        </div>
      </div>

      <SubmitButton pending={pending}>Register &amp; get payment details</SubmitButton>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h2 className="font-display text-xl text-gold-soft">{title}</h2>
      {children}
    </section>
  );
}
