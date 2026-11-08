import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { Lights, Snow, Stars } from "@/components/Christmas";
import { Shell } from "@/components/Shell";
import { EVENT } from "@/lib/config";
import { sql } from "@/lib/db";

export const metadata = { title: "Your pass · Wonderfest 2026", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const code = (await params).code.toUpperCase();
  const db = sql();
  const rows = (await db`select id, contact_name from registrations where code = ${code} and status = 'paid'`) as { id: string; contact_name: string }[];
  const reg = rows[0];
  if (!reg) notFound();
  const people = (await db`select name, age from attendees where registration_id = ${reg.id} order by name`) as { name: string; age: number }[];
  const svg = await QRCode.toString(code, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#14382b", light: "#ffffff" } });

  return (
    <Shell>
      <div className="grain relative overflow-hidden bg-berry text-white">
        <Snow count={14} />
        <Stars count={14} tone="light" />
        <Lights />
        <div className="relative mx-auto max-w-md px-4 pb-24 pt-6 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">Entry pass</p>
          <h1 className="mt-1 font-display text-6xl leading-[0.9]">Wonderfest 2026</h1>
          <p className="mt-2 text-sm text-white/90">{EVENT.date} · {EVENT.time}</p>
          <p className="text-sm text-white/90">{EVENT.venue}</p>
          <p className="text-xs text-white/70">{EVENT.address}</p>
        </div>
      </div>
      <main className="relative z-10 mx-auto -mt-16 max-w-md px-4 pb-12">
        <div className="border-[1.5px] border-pine bg-white p-5 text-center">
          <div className="mx-auto w-full max-w-[17rem] [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          <p className="mt-3 font-mono text-2xl font-bold tracking-[0.12em]">{code}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-mute">Show this at the door</p>
        </div>
        <section className="mt-6">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]">Admits · {reg.contact_name}</h2>
          <ul className="divide-y divide-line border-y border-line bg-white">
            {people.map((p, i) => (
              <li key={i} className="flex justify-between px-3 py-3 text-[15px]"><span>{p.name}</span><span className="text-mute">{p.age} yrs</span></li>
            ))}
          </ul>
        </section>
      </main>
    </Shell>
  );
}
