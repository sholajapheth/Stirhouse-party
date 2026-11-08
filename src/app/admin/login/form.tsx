"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {} as { error?: string });
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em]">Password</span>
        <input
          name="password" type="password" autoFocus autoComplete="current-password" required
          className="block h-12 w-full rounded-none border-[1.5px] border-white bg-transparent px-3.5 text-base text-white outline-none focus:border-[#c8506b] focus:ring-4 focus:ring-wine/40"
        />
      </label>
      {state.error && <p role="alert" className="text-sm font-medium text-[#ff8da1]">{state.error}</p>}
      <button disabled={pending} className="h-12 w-full bg-wine text-sm font-semibold uppercase tracking-[0.1em] hover:bg-[#8a1a33] disabled:opacity-60">
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
