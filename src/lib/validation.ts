import { z } from "zod";
import { KIDS_AGES, MAX_KIDS, TEEN_AGES } from "./config";

const phone = z
  .string()
  .trim()
  .transform((s) => s.replace(/[\s()-]/g, ""))
  .refine((s) => /^\+?\d{10,15}$/.test(s), "Enter a valid phone number");

const name = z.string().trim().min(2, "Enter a name").max(80);
const email = z.string().trim().toLowerCase().email("Enter a valid email address");
const member = z.enum(["member_with_kids", "member_no_kids", "guest"], {
  message: "Please choose one",
});

export const kidsSchema = z.object({
  email,
  contactName: name,
  contactPhone: phone,
  memberStatus: member,
  children: z
    .array(
      z.object({
        name,
        age: z.coerce.number({ message: "Pick an age" }).int().refine((a) => KIDS_AGES.includes(a), "Pick an age (1–12)"),
      }),
    )
    .min(1, "Add at least one child")
    .max(MAX_KIDS, `Up to ${MAX_KIDS} children per registration`),
});

export const teensSchema = z.object({
  email,
  contactName: name,
  contactPhone: phone,
  guardianName: name,
  guardianPhone: phone,
  memberStatus: member,
  age: z.coerce.number({ message: "Pick an age" }).int().refine((a) => TEEN_AGES.includes(a), "Pick an age (13–17)"),
});
