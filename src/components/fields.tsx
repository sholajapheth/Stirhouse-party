import { MEMBER_OPTIONS } from "@/lib/config";

const input =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-base text-white placeholder:text-white/35 " +
  "outline-none transition focus:border-gold focus:bg-white/10 focus:ring-2 focus:ring-gold/30";

export function Field({
  label, name, error, hint, defaultValue, type = "text", autoComplete, inputMode, placeholder,
}: {
  label: string; name: string; error?: string; hint?: string; defaultValue?: string;
  type?: string; autoComplete?: string; inputMode?: "tel" | "email" | "text"; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gold-soft">{label}</span>
      <input
        name={name} type={type} defaultValue={defaultValue} autoComplete={autoComplete}
        inputMode={inputMode} placeholder={placeholder} className={input}
        aria-invalid={!!error}
      />
      {hint && !error && <span className="mt-1 block text-xs text-white/45">{hint}</span>}
      {error && <span role="alert" className="mt-1 block text-sm text-red-300">{error}</span>}
    </label>
  );
}

export function AgeSelect({
  name, ages, defaultValue, error, label = "Age",
}: { name: string; ages: number[]; defaultValue?: string; error?: string; label?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gold-soft">{label}</span>
      <select name={name} defaultValue={defaultValue ?? ""} className={input + " appearance-none"} aria-invalid={!!error}>
        <option value="" disabled className="text-black">Select</option>
        {ages.map((a) => (
          <option key={a} value={a} className="text-black">{a}</option>
        ))}
      </select>
      {error && <span role="alert" className="mt-1 block text-sm text-red-300">{error}</span>}
    </label>
  );
}

export function MemberStatus({ error, defaultValue, teen }: { error?: string; defaultValue?: string; teen?: boolean }) {
  const options = teen ? MEMBER_OPTIONS.filter((o) => o.value !== "member_with_kids") : MEMBER_OPTIONS;
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-gold-soft">
        {teen ? "Do you attend Harvesters Gbagada?" : "Are you a guest or a member of Harvesters NextGen?"}
      </legend>
      <div className="space-y-2">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-white/[0.04] p-3 text-sm transition has-[:checked]:border-gold has-[:checked]:bg-gold/10"
          >
            <input type="radio" name="memberStatus" value={o.value} defaultChecked={defaultValue === o.value} className="mt-0.5 accent-[#f6c453]" />
            <span>
              {teen
                ? o.value === "member_no_kids" ? "Yes, I attend Harvesters Gbagada" : "No, I'm a guest"
                : o.label}
            </span>
          </label>
        ))}
      </div>
      {error && <span role="alert" className="mt-1 block text-sm text-red-300">{error}</span>}
    </fieldset>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit" disabled={pending}
      className="w-full rounded-xl bg-gradient-to-b from-gold to-[#e9a92b] px-6 py-3.5 text-base font-semibold text-night shadow-lg shadow-gold/20 transition hover:brightness-110 active:scale-[.99] disabled:opacity-60"
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
