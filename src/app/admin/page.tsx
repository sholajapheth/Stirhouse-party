import Link from "next/link";
import { logout } from "./actions";
import { RegCard, type Reg } from "./reg-card";
import { requireAdmin } from "@/lib/auth";
import { naira } from "@/lib/config";
import { sql } from "@/lib/db";

export const metadata = { title: "Admin · Wonderfest", robots: { index: false } };
export const dynamic = "force-dynamic";

const TABS = [
  ["pending", "Awaiting payment"],
  ["paid", "Paid"],
  ["all", "All"],
] as const;

export default async function Page({ searchParams }: { searchParams: Promise<{ tab?: string; q?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const tab = TABS.some(([t]) => t === sp.tab) ? sp.tab! : "pending";
  const q = (sp.q ?? "").trim();
  const like = `%${q}%`;
  const db = sql();

  const [stats] = (await db`
    select
      count(*)::int as total,
      count(*) filter (where status = 'paid')::int as paid,
      coalesce(sum(amount) filter (where status = 'paid'), 0)::int as revenue,
      (select count(*)::int from attendees a join registrations r on r.id = a.registration_id where r.status = 'paid') as expected,
      (select count(*)::int from attendees a join registrations r on r.id = a.registration_id where r.checked_in_at is not null) as in_room
    from registrations`) as { total: number; paid: number; revenue: number; expected: number; in_room: number }[];

  const regs = (await db`
    select r.id, r.ref, r.kind, r.email, r.contact_name, r.contact_phone, r.guardian_name, r.guardian_phone,
           r.member_status, r.amount, r.status, r.code, r.paid_at, r.created_at, r.checked_in_at,
           coalesce(json_agg(json_build_object('name', a.name, 'age', a.age) order by a.name) filter (where a.id is not null), '[]') as people
    from registrations r left join attendees a on a.registration_id = r.id
    where (${tab} = 'all' or r.status = ${tab})
      and (${q} = '' or r.ref ilike ${like} or r.contact_name ilike ${like} or r.email ilike ${like}
           or r.contact_phone ilike ${like} or r.code ilike ${like}
           or exists (select 1 from attendees x where x.registration_id = r.id and x.name ilike ${like}))
    group by r.id
    order by r.created_at desc
    limit 200`) as Reg[];

  const pending = stats.total - stats.paid;

  return (
    <div className="min-h-dvh bg-bone">
      <header className="sticky top-0 z-30 bg-black text-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <span className="font-display text-2xl leading-none">WONDER<span className="text-[#c8506b]">FEST</span> <span className="text-white/50">Admin</span></span>
          <div className="flex items-center gap-1">
            <Link href="/admin/checkin" className="flex h-10 items-center bg-wine px-4 text-xs font-semibold uppercase tracking-[0.1em]">Check-in</Link>
            <form action={logout}><button className="h-10 px-3 text-xs text-white/60 hover:text-white">Sign out</button></form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-16 pt-5">
        <dl className="grid grid-cols-2 gap-px border-[1.5px] border-black bg-black sm:grid-cols-4">
          <Stat k="Awaiting" v={pending} accent />
          <Stat k="Paid" v={stats.paid} />
          <Stat k="Revenue" v={naira(stats.revenue)} />
          <Stat k="In the room" v={`${stats.in_room} / ${stats.expected}`} />
        </dl>

        <form className="mt-5 flex gap-2" role="search">
          <input type="hidden" name="tab" value={tab} />
          <input
            name="q" defaultValue={q} placeholder="Search name, ref, phone, email, code" aria-label="Search"
            className="h-12 min-w-0 flex-1 rounded-none border-[1.5px] border-black bg-white px-3.5 text-base outline-none focus:border-wine focus:ring-4 focus:ring-wine/15"
          />
          <button className="h-12 bg-black px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white">Search</button>
        </form>

        <nav className="mt-4 flex gap-1 overflow-x-auto border-b-[3px] border-black" aria-label="Filter">
          {TABS.map(([t, label]) => (
            <Link
              key={t} href={`/admin?tab=${t}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={["shrink-0 px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em]", tab === t ? "bg-black text-white" : "text-mute hover:text-black"].join(" ")}
              aria-current={tab === t ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <ul className="mt-4 space-y-3">
          {regs.map((r) => <RegCard key={r.id} r={r} />)}
        </ul>
        {regs.length === 0 && (
          <p className="mt-10 text-center text-mute">{q ? "No matches." : tab === "pending" ? "Nothing waiting. All caught up." : "Nothing here yet."}</p>
        )}
      </main>
    </div>
  );
}

function Stat({ k, v, accent }: { k: string; v: string | number; accent?: boolean }) {
  return (
    <div className={["p-4", accent ? "bg-wine text-white" : "bg-white"].join(" ")}>
      <dt className="text-[11px] uppercase tracking-[0.16em] opacity-65">{k}</dt>
      <dd className="mt-1 font-display text-4xl leading-none">{v}</dd>
    </div>
  );
}
