"use client";

import { useActionState } from "react";
import { registerTeen, type FormState } from "@/app/actions";
import { AgeSelect, Field, MemberStatus, SubmitButton } from "@/components/fields";
import { TEEN_AGES } from "@/lib/config";

export function TeenForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(registerTeen, {});
  const e = state.errors ?? {};
  const v = (state.values ?? {}) as Record<string, string>;

  return (
    <form action={action} className="space-y-6">
      {state.message && (
        <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.message}
        </p>
      )}

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="font-display text-xl text-gold-soft">About you</h2>
        <Field label="Your full name" name="contactName" autoComplete="name" defaultValue={v.contactName} error={e.contactName} />
        <div className="grid grid-cols-[1fr_6.5rem] gap-3">
          <Field label="Your phone number" name="contactPhone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.contactPhone} error={e.contactPhone} />
          <AgeSelect name="age" ages={TEEN_AGES} defaultValue={v.age} error={e.age} />
        </div>
        <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" defaultValue={v.email} error={e.email} hint="Your entry code will be sent here." />
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="font-display text-xl text-gold-soft">Parent / guardian</h2>
        <Field label="Parent / guardian's name" name="guardianName" defaultValue={v.guardianName} error={e.guardianName} />
        <Field label="Parent / guardian's phone number" name="guardianPhone" type="tel" inputMode="tel" defaultValue={v.guardianPhone} error={e.guardianPhone} />
      </section>

      <MemberStatus teen error={e.memberStatus} defaultValue={v.memberStatus} />

      <SubmitButton pending={pending}>Register &amp; get payment details</SubmitButton>
    </form>
  );
}
