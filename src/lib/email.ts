import { EVENT, SITE_URL } from "./config";

/** Sends the pass via Resend. Returns false (without throwing) if email isn't configured. */
export async function sendPassEmail(to: string, name: string, code: string, people: string[]): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return false;
  const pass = `${SITE_URL}/pass/${code}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#14382b">
    <h1 style="font-size:28px;margin:0;color:#b3172b">Your Wonderfest pass 🎄</h1>
    <p>Hi ${esc(name)}, your payment is confirmed. Show this QR code at the door on ${EVENT.date} at ${EVENT.time}, ${EVENT.venue}, ${EVENT.address}.</p>
    <p style="text-align:center"><img src="${pass}/qr" width="240" height="240" alt="QR ${code}"></p>
    <p style="text-align:center;font-size:22px;letter-spacing:2px"><b>${code}</b></p>
    <p>Admits: ${people.map(esc).join(", ")}</p>
    <p><a href="${pass}">Open your pass</a></p></div>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject: "Your Wonderfest 2026 pass", html }),
  });
  return res.ok;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
