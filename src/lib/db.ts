import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | undefined;

export function sql() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  return (client ??= neon(process.env.DATABASE_URL));
}
