"use client";

import BoxMockup from "../BoxMockup";
import type { PageCtx } from "./types";

export default function PageOverview(ctx: PageCtx) {
  const { client, color1, color2, text2, copy, ctaLabel, onSchedule, bookingUrl } = ctx;
  return (
    <section>
      <div className="px-12 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="font-ui text-[11px] uppercase tracking-[0.3em]"
            style={{ color: color1 }}
          >
            For {client.name}
          </div>
          <h1
            className="font-display mt-4 text-5xl leading-[1.05]"
            style={{ color: color1 }}
          >
            {client.hook || copy.hook}
          </h1>
          <p className="mt-6 text-lg text-slate-700 max-w-xl">
            Custom Box Agency designs end-to-end packaging systems for{" "}
            {copy.label.toLowerCase()} brands like {client.name}. From first
            impression to repeat purchase, we engineer every box to do measurable
            work for your business.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onSchedule}
              className="font-ui px-6 py-3 text-xs uppercase tracking-[0.18em]"
              style={{ background: color2, color: text2 }}
            >
              {ctaLabel} →
            </button>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="font-ui px-6 py-3 text-xs uppercase tracking-[0.18em] border-2"
              style={{ color: color1, borderColor: color1 }}
            >
              View packaging guide
            </a>
          </div>
        </div>
        <div>
          <BoxMockup brandName={client.name} color1={color1} color2={color2} />
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-px"
        style={{ background: "#e5e7eb" }}
      >
        <Stat n="87%" label="Repurchase lift on branded unboxings" accent={color2} />
        <Stat n="3×" label="Average LTV gain across CBA clients" accent={color2} />
        <Stat n="40%" label="More organic UGC vs. stock packaging" accent={color2} />
      </div>
    </section>
  );
}

function Stat({ n, label, accent }: { n: string; label: string; accent: string }) {
  return (
    <div
      className="bg-white px-10 py-12"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div className="font-display text-5xl" style={{ color: accent }}>
        {n}
      </div>
      <div className="mt-3 text-sm text-slate-600 max-w-xs">{label}</div>
    </div>
  );
}
