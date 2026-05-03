"use client";

import type { PageCtx } from "./types";

const VALUES = [
  {
    title: "Create an Experience",
    body: "Packaging is a stage. We design the moment the lid comes off — every angle, every reveal, every haptic.",
  },
  {
    title: "Build Brand Loyalty",
    body: "Repurchase isn't accidental. We engineer packaging programs that keep your most-loved customers leaning in.",
  },
  {
    title: "Differentiate via Innovation",
    body: "Structural design, sustainable materials, custom finishes. We deploy what's possible to make you unmistakable.",
  },
  {
    title: "Enhance Brand Equity",
    body: "Every box compounds. We design packaging systems that grow brand value with each impression.",
  },
];

export default function PageAbout({ color1 }: PageCtx) {
  return (
    <section style={{ background: "#f5f4f0" }} className="px-12 py-20">
      <div className="max-w-4xl">
        <div
          className="font-ui text-[11px] uppercase tracking-[0.3em]"
          style={{ color: color1 }}
        >
          About Custom Box Agency
        </div>
        <h2
          className="font-display mt-4 text-4xl leading-tight"
          style={{ color: color1 }}
        >
          We are a packaging agency, not a packaging vendor.
        </h2>

        <div className="mt-8 space-y-5 text-slate-700 max-w-2xl">
          <p>
            CBA was founded by a team of brand strategists, structural engineers,
            and former DTC operators who got tired of treating packaging as an
            afterthought. We rebuilt the agency model around the box itself.
          </p>
          <p>
            Today we partner with the brands you order from, the brands you save
            in your camera roll, and the brands that show up in unboxing reels you
            can't stop watching. We design every piece — from primary cartons to
            PR mailers to seasonal limited drops — as part of a single brand system.
          </p>
          <p>
            We work in close residency with your team. No overseas account
            managers, no design-by-committee. Just packaging strategy, structural
            design, and production management owned by one accountable team.
          </p>
        </div>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 gap-px max-w-4xl" style={{ background: "#e5e0d6" }}>
        {VALUES.map((v) => (
          <div key={v.title} className="bg-[#f5f4f0] p-8">
            <div
              className="font-display text-lg"
              style={{ color: color1 }}
            >
              {v.title}
            </div>
            <p className="mt-3 text-sm text-slate-600">{v.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
