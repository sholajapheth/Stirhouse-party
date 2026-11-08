export const EVENT = {
  name: "WONDERFEST",
  tagline: "NextGen Christmas Celebration",
  date: "December 2026",
  venue: "Harvesters Gbagada Main Auditorium",
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
    { label: "0813 304 6771", intl: "2348133046771" },
  ],
  email: "gbagadanextgen@gmail.com",
};

export const MAX_KIDS = 5;
export const KIDS_AGES = Array.from({ length: 12 }, (_, i) => i + 1); // 1–12
export const TEEN_AGES = [13, 14, 15, 16, 17];

export const MEMBER_OPTIONS = [
  { value: "member_with_kids", label: "I attend Harvesters Gbagada and my child(ren) attend Kidzzone or Stirhouse" },
  { value: "member_no_kids", label: "I attend Harvesters Gbagada but my child(ren) do not attend Kidzzone or Stirhouse" },
  { value: "guest", label: "I do not attend Harvesters Gbagada" },
] as const;

export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
