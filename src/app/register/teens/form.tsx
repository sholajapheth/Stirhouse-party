"use client";

import { useActionState } from "react";
import { registerTeen, type FormState } from "@/app/actions";
import { AgeSelect, CheckoutBar, Field, FormError, MemberStatus, Section } from "@/components/fields";
import { PRICE_PER_PERSON, TEEN_AGES, naira } from "@/lib/config";

export function TeenForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(registerTeen, {});
  const e = state.errors ?? {};
  const v = (state.values ?? {}) as Record<string, string>;

  return (
    <form action={action} className="space-y-10" noValidate>
      <FormError message={state.message} />

      <Section n="01" title="About you">
        <Field label="Full name" name="contactName" autoComplete="name" defaultValue={v.contactName} error={e.contactName} />
        <div className="grid grid-cols-[1fr_6.5rem] gap-3">
          <Field label="Phone number" name="contactPhone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.contactPhone} error={e.contactPhone} />
          <AgeSelect name="age" ages={TEEN_AGES} defaultValue={v.age} error={e.age} />
        </div>
        <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" defaultValue={v.email} error={e.email} hint="Your entry QR code is sent here." />
      </Section>

      <Section n="02" title="Parent / guardian">
        <Field label="Name" name="guardianName" defaultValue={v.guardianName} error={e.guardianName} />
        <Field label="Phone number" name="guardianPhone" type="tel" inputMode="tel" defaultValue={v.guardianPhone} error={e.guardianPhone} />
      </Section>

      <Section n="03" title="Stirhouse">
        <MemberStatus teen error={e.memberStatus} defaultValue={v.memberStatus} />
      </Section>

      <CheckoutBar pending={pending} total={naira(PRICE_PER_PERSON)} detail="1 ball pass" cta="Register" />
    </form>
  );
}
