"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import CbaMark from "@/components/portal/CbaMark";

type DetectStatus = "idle" | "analyzing" | "done" | "error";

export default function LandingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [palette, setPalette] = useState<{ color1: string; color2: string } | null>(
    null
  );
  const [status, setStatus] = useState<DetectStatus>("idle");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!url || url.length < 4) {
      setStatus("idle");
      setPalette(null);
      return;
    }
    setStatus("analyzing");
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/brand-detect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        if (!res.ok) throw new Error("detect failed");
        const data = await res.json();
        setPalette({ color1: data.color1, color2: data.color2 });
        setStatus("done");
      } catch {
        setStatus("error");
      }
    }, 800);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [url]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          url,
          color1: palette?.color1,
          color2: palette?.color2,
          status: "draft",
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "failed");
      const created = await res.json();
      router.push(`/${created.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <main
      className="min-h-screen"
      style={{ background: "#032D23", color: "#ffffff" }}
    >
      <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <CbaMark size={26} color="#2DCCD3" />
          <span className="font-display text-sm tracking-[0.25em]">
            Custom Box Agency
          </span>
        </div>
        <a
          href="/admin"
          className="font-ui text-[11px] uppercase tracking-[0.2em] px-4 py-2 border-2 hover:bg-white hover:text-[#032D23] transition"
          style={{ borderColor: "#2DCCD3", color: "#2DCCD3" }}
        >
          Admin Login
        </a>
      </nav>

      <section className="max-w-7xl mx-auto px-10 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div
            className="font-ui text-[11px] uppercase tracking-[0.3em]"
            style={{ color: "#2DCCD3" }}
          >
            We Create Experiences
          </div>
          <h1 className="font-display mt-4 text-6xl leading-[1.05] max-w-xl">
            Build a personalized sales portal in 10 seconds.
          </h1>
          <p className="mt-6 text-lg max-w-lg" style={{ color: "#cbd5e1" }}>
            Enter a brand. We'll auto-theme a six-section walkthrough — color
            matched, industry tailored, ready to send to your prospect before the
            coffee cools.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Chip>Brand auto-theming</Chip>
            <Chip>6-section journey portal</Chip>
            <Chip>10 seconds to generate</Chip>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="bg-white text-[#0f172a] p-8"
          style={{ borderTop: "4px solid #2DCCD3" }}
        >
          <div className="font-display text-xl" style={{ color: "#032D23" }}>
            Self-serve portal builder
          </div>
          <p className="mt-1 text-sm text-slate-600">
            We'll detect brand colors automatically.
          </p>

          <div className="mt-6 space-y-5">
            <Field label="Company name" required>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Coffee"
                className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
              />
            </Field>
            <Field label="Website URL">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="acmecoffee.com"
                className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
              />
              <DetectStatusLine status={status} palette={palette} />
            </Field>
          </div>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={busy || !name}
            className="font-ui mt-6 w-full py-3 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
            style={{ background: "#032D23", color: "#ffffff" }}
          >
            {busy ? "Generating…" : "Generate My Portal →"}
          </button>
        </form>
      </section>
    </main>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-ui text-[10px] uppercase tracking-[0.18em] px-3 py-2 border"
      style={{ borderColor: "#2DCCD3", color: "#2DCCD3" }}
    >
      {children}
    </span>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-ui text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {label}
        {required && <span style={{ color: "#086F78" }}> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function DetectStatusLine({
  status,
  palette,
}: {
  status: DetectStatus;
  palette: { color1: string; color2: string } | null;
}) {
  if (status === "idle") return null;
  if (status === "analyzing")
    return <div className="mt-2 text-xs text-slate-500">Analyzing brand…</div>;
  if (status === "error")
    return (
      <div className="mt-2 text-xs text-amber-700">
        Couldn't detect — we'll use a brand-derived palette.
      </div>
    );
  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-emerald-700">
      <span>✓ Brand profile detected</span>
      {palette && (
        <span className="flex gap-1">
          <span className="inline-block h-3 w-3" style={{ background: palette.color1 }} />
          <span className="inline-block h-3 w-3" style={{ background: palette.color2 }} />
        </span>
      )}
    </div>
  );
}
