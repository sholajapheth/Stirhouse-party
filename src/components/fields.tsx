import { MEMBER_OPTIONS } from "@/lib/config";

const base =
  "block w-full h-12 border-[1.5px] border-pine bg-field px-3.5 text-base text-pine placeholder:text-mute/60 " +
  "rounded-none outline-none transition focus:border-berry focus:ring-4 focus:ring-berry/15 " +
  "aria-[invalid=true]:border-berry aria-[invalid=true]:bg-berry-soft";

const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-pine";

export function Field({
  label, name, error, hint, defaultValue, type = "text", autoComplete, inputMode, placeholder,
}: {
  label: string; name: string; error?: string; hint?: string; defaultValue?: string;
  type?: string; autoComplete?: string; inputMode?: "tel" | "email" | "text"; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        name={name} type={type} defaultValue={defaultValue} autoComplete={autoComplete}
        inputMode={inputMode} placeholder={placeholder} className={base}
        aria-invalid={!!error} aria-describedby={error ? `${name}-err` : undefined}
      />
      {hint && !error && <span className="mt-1.5 block text-xs text-mute">{hint}</span>}
      {error && <span id={`${name}-err`} role="alert" className="mt-1.5 block text-sm font-medium text-berry">{error}</span>}
    </label>
  );
}

export function AgeSelect({
  name, ages, defaultValue, error, label = "Age",
}: { name: string; ages: number[]; defaultValue?: string; error?: string; label?: string }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <div className="relative">
        <select name={name} defaultValue={defaultValue ?? ""} className={base + " appearance-none pr-9"} aria-invalid={!!error}>
          <option value="" disabled>Select</option>
          {ages.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l5 5 5-5" /></svg>
      </div>
      {error && <span role="alert" className="mt-1.5 block text-sm font-medium text-berry">{error}</span>}
    </label>
  );
}

export function MemberStatus({ error, defaultValue, teen }: { error?: string; defaultValue?: string; teen?: boolean }) {
  return (
    <fieldset>
      <legend className={labelCls + " mb-3"}>
        {teen ? "Are you a guest or a member of Harvesters Stirhouse?" : "Guest or member of Harvesters NextGen?"}
      </legend>
      <div className="space-y-2.5">
        {MEMBER_OPTIONS.map((o) => (
          <label
            key={o.value}
            className="relative flex min-h-14 cursor-pointer items-center gap-3.5 border-[1.5px] border-pine bg-field px-3.5 py-3 text-[15px] leading-snug transition has-[:checked]:border-berry has-[:checked]:bg-berry has-[:checked]:text-on-berry has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-berry/20"
          >
            <input type="radio" name="memberStatus" value={o.value} defaultChecked={defaultValue === o.value} className="peer sr-only" />
            <span className="grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] border-current after:size-2.5 after:scale-0 after:rounded-full after:bg-current after:transition peer-checked:after:scale-100" aria-hidden />
            <span>{teen ? o.teen : o.label}</span>
          </label>
        ))}
      </div>
      {error && <span role="alert" className="mt-2 block text-sm font-medium text-berry">{error}</span>}
    </fieldset>
  );
}

export function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t-[3px] border-pine pt-4">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-display text-2xl text-berry">{n}</span>
        <h2 className="font-display text-3xl leading-none">{title}</h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

/** Sticky bottom bar: total on the left, submit on the right. Always reachable on mobile. */
export function CheckoutBar({ pending, total, detail, cta }: { pending: boolean; total: string; detail: string; cta: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t-[3px] border-pine bg-field pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] uppercase tracking-[0.14em] text-mute">{detail}</p>
          <p className="font-display text-3xl leading-none">{total}</p>
        </div>
        <button
          type="submit" disabled={pending}
          className="h-12 shrink-0 bg-berry px-6 text-sm font-semibold uppercase tracking-[0.1em] text-on-berry transition hover:bg-berry-deep active:translate-y-px disabled:opacity-60"
        >
          {pending ? "Saving…" : cta}
        </button>
      </div>
    </div>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="border-[1.5px] border-berry bg-berry-soft p-3.5 text-sm font-medium text-berry">{message}</p>;
}
