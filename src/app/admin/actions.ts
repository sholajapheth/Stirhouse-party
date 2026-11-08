"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, isAdmin, requireAdmin, startSession } from "@/lib/auth";
import { sql } from "@/lib/db";
import { sendPassEmail } from "@/lib/email";
import { makeCode } from "@/lib/ref";

export async function login(_: { error?: string }, fd: FormData) {
  if (!checkPassword(String(fd.get("password") ?? ""))) {
    await new Promise((r) => setTimeout(r, 700)); // slow down guessing
    return { error: "Wrong password" };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/** Mark payment confirmed, generate the code, and email the pass if email is configured. */
export async function approve(ref: string) {
  await requireAdmin();
  const db = sql();
  for (let i = 0; i < 5; i++) {
    try {
      const rows = (await db`
        update registrations set status = 'paid', paid_at = now(), code = ${makeCode()}
        where ref = ${ref} and status = 'pending'
        returning code, email, contact_name, id, kind`) as { code: string; email: string; contact_name: string; id: string; kind: string }[];
      const r = rows[0];
      if (r) {
        const people = (await db`select name from attendees where registration_id = ${r.id} order by name`) as { name: string }[];
        await sendPassEmail(r.email, r.contact_name, r.code, people.map((p) => p.name), r.kind).catch(() => false);
      }
      break;
    } catch (e) {
      if ((e as { code?: string }).code !== "23505") throw e; // retry on code collision
    }
  }
  revalidatePath("/admin");
  // Land on the approved registration so the admin can send the pass straight away.
  redirect(`/admin?tab=paid&q=${encodeURIComponent(ref)}`);
}

export async function resendEmail(ref: string): Promise<{ ok: boolean; configured: boolean }> {
  await requireAdmin();
  const db = sql();
  const rows = (await db`select id, code, email, contact_name, kind from registrations where ref = ${ref} and status = 'paid'`) as { id: string; code: string; email: string; contact_name: string; kind: string }[];
  const r = rows[0];
  if (!r) return { ok: false, configured: true };
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) return { ok: false, configured: false };
  const people = (await db`select name from attendees where registration_id = ${r.id} order by name`) as { name: string }[];
  return { ok: await sendPassEmail(r.email, r.contact_name, r.code, people.map((p) => p.name), r.kind), configured: true };
}

export async function unapprove(ref: string) {
  await requireAdmin();
  await sql()`update registrations set status = 'pending', code = null, paid_at = null, checked_in_at = null where ref = ${ref}`;
  revalidatePath("/admin");
}

type Family = { ref: string; code: string; name: string; people: { name: string; age: number }[]; at: string };
export type CheckIn =
  | ({ result: "admitted" } & Family)
  | ({ result: "already" } & Family)
  | { result: "unpaid" }
  | { result: "invalid" };

/** Look up a scanned/typed code and check the family in. Idempotent: a second scan reports "already". */
export async function checkIn(raw: string): Promise<CheckIn> {
  if (!(await isAdmin())) return { result: "invalid" };
  const code = raw.trim().toUpperCase();
  const db = sql();
  const rows = (await db`select id, ref, code, contact_name, status, checked_in_at from registrations where code = ${code}`) as {
    id: string; ref: string; code: string; contact_name: string; status: string; checked_in_at: string | null;
  }[];
  const r = rows[0];
  if (!r) return { result: "invalid" };
  if (r.status !== "paid") return { result: "unpaid" };
  const people = (await db`select name, age from attendees where registration_id = ${r.id} order by name`) as { name: string; age: number }[];
  if (r.checked_in_at) {
    return { result: "already", ref: r.ref, code: r.code, name: r.contact_name, people, at: r.checked_in_at };
  }
  const upd = (await db`update registrations set checked_in_at = now() where id = ${r.id} and checked_in_at is null returning checked_in_at`) as { checked_in_at: string }[];
  revalidatePath("/admin");
  return upd[0]
    ? { result: "admitted", ref: r.ref, code: r.code, name: r.contact_name, people, at: upd[0].checked_in_at }
    : { result: "already", ref: r.ref, code: r.code, name: r.contact_name, people, at: new Date().toISOString() };
}

export async function undoCheckIn(code: string) {
  await requireAdmin();
  await sql()`update registrations set checked_in_at = null where code = ${code}`;
  revalidatePath("/admin");
}
