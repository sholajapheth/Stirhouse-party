import { readdirSync } from "node:fs";
import { join } from "node:path";

/** Shows whatever photos are in /public/photos. Renders nothing until some are added. */
export function Gallery({ heading = "Moments of joy" }: { heading?: string }) {
  let files: string[] = [];
  try {
    files = readdirSync(join(process.cwd(), "public", "photos"))
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && !f.startsWith("hero"))
      .sort();
  } catch {
    /* no photos yet */
  }
  if (!files.length) return null;
  return (
    <section className="bg-snow">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-5xl text-pine sm:text-7xl">{heading}</h2>
        <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {files.slice(0, 9).map((f, i) => (
            <li key={f} className={["overflow-hidden border-[1.5px] border-gold bg-line", i % 5 === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2" : ""].join(" ")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/photos/${f}`} alt="" loading="lazy" className="size-full min-h-40 object-cover transition duration-500 hover:scale-105" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
