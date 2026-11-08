"use client";

import { useActionState, useState } from "react";
import { registerKids, type FormState } from "@/app/actions";
import { AgeSelect, CheckoutBar, Field, FormError, MemberStatus, Section } from "@/components/fields";
import { KIDS_AGES, MAX_KIDS, PRICE_PER_PERSON, naira } from "@/lib/config";

const arr = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

export function KidsForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(registerKids, {});
  const e = state.errors ?? {};
  const v = state.values ?? {};
  const names = arr(v.childName);
  const ages = arr(v.childAge);
  const [count, setCount] = useState(Math.max(1, names.length));

  return (
    <form action={action} className="space-y-10" noValidate>
      <FormError message={state.message} />

      <Section n="01" title="Your details">
        <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" defaultValue={v.email as string} error={e.email} hint="Your entry QR code is sent here." />
        <Field label="Parent / guardian name" name="contactName" autoComplete="name" defaultValue={v.contactName as string} error={e.contactName} />
        <Field label="Phone number" name="contactPhone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0801 234 5678" defaultValue={v.contactPhone as string} error={e.contactPhone} />
      </Section>

      <Section n="02" title="Your children">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="border-[1.5px] border-line bg-white p-4">
            <p className="mb-3 font-display text-xl text-berry">Child {i + 1}</p>
            <div className="grid grid-cols-[1fr_6.5rem] gap-3">
              <Field label="Name" name="childName" autoComplete="off" defaultValue={names[i]} error={e[`children.${i}.name`]} />
              <AgeSelect name="childAge" ages={KIDS_AGES} defaultValue={ages[i]} error={e[`children.${i}.age`]} />
            </div>
          </div>
        ))}
        {e.children && <p role="alert" className="text-sm font-medium text-berry">{e.children}</p>}
        <div className="flex gap-3">
          {count < MAX_KIDS && (
            <button type="button" onClick={() => setCount(count + 1)} className="h-12 flex-1 border-[1.5px] border-dashed border-pine text-sm font-semibold uppercase tracking-[0.1em] hover:border-berry hover:text-berry">
              + Add a child
            </button>
          )}
          {count > 1 && (
            <button type="button" onClick={() => setCount(count - 1)} className="h-12 px-4 text-sm text-mute underline underline-offset-4">
              Remove
            </button>
          )}
        </div>
      </Section>

      <Section n="03" title="About you">
        <MemberStatus error={e.memberStatus} defaultValue={v.memberStatus as string} />
      </Section>

      <CheckoutBar
        pending={pending}
        total={naira(count * PRICE_PER_PERSON)}
        detail={`${count} ${count === 1 ? "child" : "children"} × ${naira(PRICE_PER_PERSON)}`}
        cta="Register"
      />
    </form>
  );
}
