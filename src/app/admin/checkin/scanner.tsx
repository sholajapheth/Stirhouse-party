"use client";

import jsQR from "jsqr";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { checkIn, undoCheckIn, type CheckIn } from "../actions";

const time = (s: string) => new Date(s).toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });

export function Scanner() {
  const video = useRef<HTMLVideoElement>(null);
  const busy = useRef(false);
  const [on, setOn] = useState(false);
  const [err, setErr] = useState("");
  const [res, setRes] = useState<CheckIn | null>(null);
  const [manual, setManual] = useState("");
  const [pending, start] = useTransition();

  const submit = useCallback((code: string) => {
    if (busy.current) return;
    busy.current = true;
    start(async () => {
      const r = await checkIn(code);
      setRes(r);
      if (navigator.vibrate) navigator.vibrate(r.result === "admitted" ? 80 : [60, 40, 60]);
      // brief cooldown so the same QR isn't re-read instantly
      setTimeout(() => { busy.current = false; }, 2500);
    });
  }, []);

  useEffect(() => {
    if (!on) return;
    let stream: MediaStream | undefined;
    let raf = 0;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
        const v = video.current!;
        v.srcObject = stream;
        await v.play();
        const tick = () => {
          if (v.readyState === v.HAVE_ENOUGH_DATA && !busy.current) {
            canvas.width = v.videoWidth; canvas.height = v.videoHeight;
            ctx.drawImage(v, 0, 0);
            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const hit = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
            if (hit?.data) submit(hit.data);
          }
          raf = requestAnimationFrame(tick);
        };
        tick();
      } catch {
        setErr("Camera unavailable. Allow camera access, or type the code below.");
        setOn(false);
      }
    })();

    return () => { cancelAnimationFrame(raf); stream?.getTracks().forEach((t) => t.stop()); };
  }, [on, submit]);

  return (
    <main className="mx-auto max-w-md px-4 pb-10">
      <div className="relative aspect-square w-full overflow-hidden border-[1.5px] border-white/30 bg-ink">
        <video ref={video} playsInline muted className={on ? "size-full object-cover" : "hidden"} />
        {on && <div className="pointer-events-none absolute inset-[18%] border-2 border-white/80" aria-hidden />}
        {!on && (
          <button onClick={() => { setErr(""); setOn(true); }} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/80">
            <span className="font-display text-5xl">Tap to scan</span>
            <span className="text-sm text-white/50">Opens the camera</span>
          </button>
        )}
      </div>
      {err && <p role="alert" className="mt-3 text-sm text-[#ff8da1]">{err}</p>}
      {on && <button onClick={() => setOn(false)} className="mt-2 text-sm text-white/60 underline underline-offset-4">Stop camera</button>}

      <form
        onSubmit={(e) => { e.preventDefault(); if (manual.trim()) { busy.current = false; submit(manual); setManual(""); } }}
        className="mt-4 flex gap-2"
      >
        <input
          value={manual} onChange={(e) => setManual(e.target.value)} placeholder="Or type the code"
          autoCapitalize="characters" autoCorrect="off" spellCheck={false} aria-label="Entry code"
          className="h-12 min-w-0 flex-1 rounded-none border-[1.5px] border-white/40 bg-transparent px-3.5 font-mono text-base uppercase text-white outline-none placeholder:normal-case placeholder:text-white/35 focus:border-white"
        />
        <button disabled={pending} className="h-12 bg-wine px-5 text-xs font-semibold uppercase tracking-[0.1em] disabled:opacity-60">Check in</button>
      </form>

      <div aria-live="assertive" className="mt-5">
        {res && <Result res={res} onUndo={(code) => start(async () => { await undoCheckIn(code); setRes(null); busy.current = false; })} onClear={() => { setRes(null); busy.current = false; }} />}
      </div>
    </main>
  );
}

function Result({ res, onUndo, onClear }: { res: CheckIn; onUndo: (code: string) => void; onClear: () => void }) {
  if (res.result === "invalid" || res.result === "unpaid") {
    return (
      <div className="border-[1.5px] border-[#ff8da1] bg-wine p-5">
        <p className="font-display text-5xl leading-none">{res.result === "unpaid" ? "Not paid" : "Invalid code"}</p>
        <p className="mt-2 text-sm text-white/80">{res.result === "unpaid" ? "This registration hasn't been approved." : "No registration matches that code."}</p>
        <button onClick={onClear} className="mt-4 h-11 border border-white/60 px-4 text-xs font-semibold uppercase tracking-[0.1em]">Scan next</button>
      </div>
    );
  }
  const ok = res.result === "admitted";
  return (
    <div className={["border-[1.5px] p-5", ok ? "border-[#4ade80] bg-[#0f2a1a]" : "border-[#f5b942] bg-[#2e2209]"].join(" ")}>
      <p className={["font-display text-6xl leading-none", ok ? "text-[#4ade80]" : "text-[#f5b942]"].join(" ")}>{ok ? "Admit" : "Already in"}</p>
      <p className="mt-1 text-sm text-white/75">{ok ? "Checked in just now" : `First checked in at ${time(res.at)}`}</p>
      <p className="mt-4 text-xl font-semibold">{res.name}</p>
      <p className="font-mono text-xs text-white/50">{res.code}</p>
      <ul className="mt-3 divide-y divide-white/15 border-y border-white/15">
        {res.people.map((p, i) => <li key={i} className="flex justify-between py-2 text-[15px]"><span>{p.name}</span><span className="text-white/55">{p.age} yrs</span></li>)}
      </ul>
      <p className="mt-3 text-sm text-white/70">{res.people.length} {res.people.length === 1 ? "person" : "people"}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={onClear} className="h-11 flex-1 bg-white text-xs font-semibold uppercase tracking-[0.1em] text-black">Scan next</button>
        {ok && <button onClick={() => onUndo(res.code)} className="h-11 border border-white/40 px-4 text-xs uppercase tracking-[0.1em]">Undo</button>}
      </div>
    </div>
  );
}
