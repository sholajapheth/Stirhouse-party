import QRCode from "qrcode";
import { sql } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const rows = (await sql()`select 1 from registrations where code = ${code.toUpperCase()} and status = 'paid'`) as unknown[];
  if (!rows.length) return new Response("Not found", { status: 404 });
  // The QR content is exactly the code.
  const png = await QRCode.toBuffer(code.toUpperCase(), { type: "png", width: 640, margin: 2, errorCorrectionLevel: "M" });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=3600" } });
}
