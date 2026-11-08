"use server";

import { redirect } from "next/navigation";
import { PRICE_PER_PERSON } from "@/lib/config";
import { sql } from "@/lib/db";
import { makeRef } from "@/lib/ref";
import { kidsSchema, teensSchema } from "@/lib/validation";

export type FormState = {
  errors?: Record<string, string>;
  message?: string;
  values?: Record<string, string | string[]>;
};

function flatten(issues: { path: PropertyKey[]; message: string }[]) {
  const errors: Record<string, string> = {};
  for (const i of issues) {
    const key = i.path.join(".");
    errors[key] ??= i.message;
  }
  return errors;
}

function rawValues(fd: FormData) {
  const values: Record<string, string | string[]> = {};
  for (const key of new Set(fd.keys())) {
    const all = fd.getAll(key).map(String);
    values[key] = all.length > 1 ? all : all[0];
  }
  return values;
}

type Person = { name: string; age: number };

async function save(input: {
  kind: "kids" | "teens";
  email: string;
  contactName: string;
  contactPhone: string;
  guardianName?: string;
  guardianPhone?: string;
  memberStatus: string;
  people: Person[];
}): Promise<string> {
  const db = sql();
  const id = crypto.randomUUID();
  const amount = PRICE_PER_PERSON * input.people.length;

  for (let attempt = 0; attempt < 5; attempt++) {
    const ref = makeRef();
    try {
      await db.transaction([
        db`insert into registrations
            (id, ref, kind, email, contact_name, contact_phone, guardian_name, guardian_phone, member_status, amount)
          values
            (${id}, ${ref}, ${input.kind}, ${input.email}, ${input.contactName}, ${input.contactPhone},
             ${input.guardianName ?? null}, ${input.guardianPhone ?? null}, ${input.memberStatus}, ${amount})`,
        ...input.people.map(
          (p) => db`insert into attendees (registration_id, name, age) values (${id}, ${p.name}, ${p.age})`,
        ),
      ]);
      return ref;
    } catch (e) {
      // 23505 = unique violation on ref → try another one
      if ((e as { code?: string }).code !== "23505") throw e;
    }
  }
  throw new Error("Could not allocate a reference");
}

export async function registerKids(_: FormState, fd: FormData): Promise<FormState> {
  const names = fd.getAll("childName").map(String);
  const ages = fd.getAll("childAge").map(String);
  const parsed = kidsSchema.safeParse({
    email: fd.get("email"),
    contactName: fd.get("contactName"),
    contactPhone: fd.get("contactPhone"),
    memberStatus: fd.get("memberStatus"),
    children: names.map((name, i) => ({ name, age: ages[i] })),
  });
  if (!parsed.success) {
    return { errors: flatten(parsed.error.issues), values: rawValues(fd) };
  }
  const d = parsed.data;
  let ref: string;
  try {
    ref = await save({
      kind: "kids",
      email: d.email,
      contactName: d.contactName,
      contactPhone: d.contactPhone,
      memberStatus: d.memberStatus,
      people: d.children,
    });
  } catch (e) {
    console.error(e);
    return { message: "Something went wrong saving your registration. Please try again.", values: rawValues(fd) };
  }
  redirect(`/registered/${ref}`);
}

export async function registerTeen(_: FormState, fd: FormData): Promise<FormState> {
  const parsed = teensSchema.safeParse({
    email: fd.get("email"),
    contactName: fd.get("contactName"),
    contactPhone: fd.get("contactPhone"),
    guardianName: fd.get("guardianName"),
    guardianPhone: fd.get("guardianPhone"),
    memberStatus: fd.get("memberStatus"),
    age: fd.get("age"),
  });
  if (!parsed.success) {
    return { errors: flatten(parsed.error.issues), values: rawValues(fd) };
  }
  const d = parsed.data;
  let ref: string;
  try {
    ref = await save({
      kind: "teens",
      email: d.email,
      contactName: d.contactName,
      contactPhone: d.contactPhone,
      guardianName: d.guardianName,
      guardianPhone: d.guardianPhone,
      memberStatus: d.memberStatus,
      people: [{ name: d.contactName, age: d.age }],
    });
  } catch (e) {
    console.error(e);
    return { message: "Something went wrong saving your registration. Please try again.", values: rawValues(fd) };
  }
  redirect(`/registered/${ref}`);
}
