import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set (put it in .env.local)");

const sql = neon(url);
const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
// split on statement boundaries; the schema has no semicolons inside strings
for (const stmt of schema.split(/;\s*\n/).map((s) => s.trim()).filter(Boolean)) {
  await sql.query(stmt);
}
console.log("Schema applied.");
