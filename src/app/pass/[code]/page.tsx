import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { Bauble, Lights, Snow, Stars } from "@/components/Christmas";
import { Shell } from "@/components/Shell";
import { BALL, EVENT } from "@/lib/config";
import { sql } from "@/lib/db";

export const metadata = { title: "Your pass", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const code = (await params).code.toUpperCase();
  const db = sql();
  const rows = (await db`select id, contact_name, kind from registrations where code = ${code} and status = 'paid'`) as { id: string; contact_name: string; kind: string }[];
  const reg = rows[0];
  if (!reg) notFound();
  const ball = reg.kind === "teens";
  const people = (await db`select name, age from attendees where registration_id = ${reg.id} order by name`) as { name: string; age: number }[];
  // The QR content is exactly the code.
  const svg = await QRCode.toString(code, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: ball ? "#1a1305" : "#14382b", light: "#ffffff" } });

  return (
    <Shell theme={ball ? "ball" : "xmas"}>
      <div className={["grain relative overflow-hidden text-white", ball ? "bg-pine-deep" : "bg-berry"].join(" ")}>
        <Snow count={14} />
        <Stars count={14} tone={ball ? "gold" : "light"} />
        {ball ? (
          <div className="absolute left-3 top-0 flex gap-3" aria-hidden>
            <Bauble tone="gold" length={22} size={24} />
            <Bauble tone="black" length={44} size={28} delay={0.8} />
          </div>
        ) : (
          <Lights />
        )}
        <div className={["relative mx-auto max-w-md px-4 pb-24 text-center", ball ? "pt-16" : "pt-6"].join(" ")}>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">Entry pass</p>
          <h1 className={["mt-1 font-display leading-[0.9]", ball ? "gold-text text-5xl" : "text-6xl"].join(" ")}>{ball ? BALL.name : "Wonderfest 2026"}</h1>
          {ball ? (
            <p className="mt-2 text-sm text-white/90">Theme: {BALL.theme} · Date &amp; venue to be announced</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-white/90">{EVENT.date} · {EVENT.time}</p>
              <p className="text-sm text-white/90">{EVENT.venue}</p>
              <p className="text-xs text-white/70">{EVENT.address}</p>
            </>
          )}
        </div>
      </div>
      <main className="relative z-10 mx-auto -mt-16 max-w-md px-4 pb-12">
        <div className="border-[1.5px] border-pine bg-white p-5 text-center">
          <div className="mx-auto w-full max-w-[17rem] [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          <p className="mt-3 font-mono text-2xl font-bold tracking-[0.12em] text-[#14382b]">{code}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#5f6b5c]">Show this at the door</p>
        </div>
        <section className="mt-6">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]">Admits · {reg.contact_name}</h2>
          <ul className="divide-y divide-line border-y border-line bg-field">
            {people.map((p, i) => (
              <li key={i} className="flex justify-between px-3 py-3 text-[15px]"><span>{p.name}</span><span className="text-mute">{p.age} yrs</span></li>
            ))}
          </ul>
        </section>
      </main>
    </Shell>
  );
}
