export const EVENT = {
  name: "WONDERFEST",
  tagline: "NextGen Christmas Celebration",
  date: "Saturday, December 12, 2026",
  time: "10:00 AM",
  venue: "HICC Gbagada",
  address: "Plot 5–7, Gbagada–Oshodi Expressway, Gbagada, Lagos",
  landmark: "Opposite the Mobil filling station",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Harvesters+International+Christian+Centre+Gbagada+Plot+5-7+Gbagada+Oshodi+Expressway+Lagos",
};

/** The teens' event is separate from Wonderfest: same day and venue, different hall and time. */
export const BALL = {
  name: "Teens Christmas Ball",
  theme: "Black & Gold",
  date: "Saturday, December 12, 2026",
  time: "11:00 AM",
  venue: "HICC Gbagada",
  hall: "East Auditorium",
};

export const PRICE_PER_PERSON = Number(process.env.PRICE_PER_PERSON ?? 20000);

export const BANK = {
  accountName: "Harvesters Int'l Christian Centre",
  accountNumber: "1304248376",
  bank: "Providus Bank",
};

export const RECEIPT_CONTACT = {
  whatsapp: [
    { label: "0902 207 6642", intl: "2349022076642" },
    { label: "0811 319 9535", intl: "2348113199535" },
  ],
  email: "gbagadanextgen@gmail.com",
};

export const MAX_KIDS = 5;
export const KIDS_AGES = Array.from({ length: 12 }, (_, i) => i + 1); // 1–12
export const TEEN_AGES = [13, 14, 15, 16, 17];

export const MEMBER_OPTIONS = [
  { value: "member_with_kids", label: "I attend Harvesters Gbagada and my child(ren) attend Kidzzone", teen: "I attend Harvesters Stirhouse" },
  { value: "member_no_kids", label: "I attend Harvesters Gbagada but my child(ren) do not attend Kidzzone", teen: "I attend Harvesters Gbagada, but not Stirhouse" },
  { value: "guest", label: "I do not attend Harvesters Gbagada", teen: "I’m a guest (I don’t attend Harvesters Gbagada)" },
] as const;

export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const SITE_URL = process.env.SITE_URL ?? "https://wonder-fest.vercel.app";

/** 0801 234 5678 or +234… → 234801… for wa.me links */
export function waNumber(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.startsWith("234")) return d;
  if (d.startsWith("0")) return "234" + d.slice(1);
  return d;
}
