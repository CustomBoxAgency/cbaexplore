"use client";

import BoxMockup from "../BoxMockup";
import type { Product } from "@/lib/data";
import type { PageCtx } from "./types";

type Props = PageCtx & {
  stage: 1 | 2 | 3;
  stageName: "Acquisition" | "Onboarding & Delivery" | "Retention";
  headlineSuffix: string;
  bigStat: string;
  bigStatLabel: string;
  body: string;
  tactics: { title: string; body: string }[];
  productSet: Product[];
};

export default function JourneyPage({
  stage,
  stageName,
  headlineSuffix,
  bigStat,
  bigStatLabel,
  body,
  tactics,
  productSet,
  client,
  color1,
  color2,
  text2,
  ctaLabel,
  onSchedule,
}: Props) {
  return (
    <section className="px-12 py-16">
      <div
        className="font-ui text-[11px] uppercase tracking-[0.3em]"
        style={{ color: color2 }}
      >
        Customer Journey · Stage {stage} · {stageName}
      </div>

      <div className="mt-12 grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <h1
            className="font-display text-4xl leading-tight"
            style={{ color: color1 }}
          >
            {client.name} — {headlineSuffix}
          </h1>

          <div className="mt-10 flex items-end gap-6">
            <div
              className="font-display text-7xl leading-none"
              style={{ color: color2 }}
            >
              {bigStat}
            </div>
            <div className="text-sm text-slate-600 max-w-[16rem] pb-2">
              {bigStatLabel}
            </div>
          </div>

          <p className="mt-10 text-slate-700 leading-relaxed max-w-2xl">{body}</p>
        </div>

        <div>
          <BoxMockup
            brandName={client.name}
            color1={color1}
            color2={color2}
            size="sm"
          />
        </div>
      </div>

      <div className="mt-16">
        <h3
          className="font-display text-sm tracking-[0.2em]"
          style={{ color: color1 }}
        >
          Tactics
        </h3>
        <div className="mt-5 grid sm:grid-cols-3 gap-px" style={{ background: "#e5e7eb" }}>
          {tactics.map((t) => (
            <div
              key={t.title}
              className="bg-white p-6"
              style={{ borderTop: `3px solid ${color2}` }}
            >
              <div
                className="font-display text-base"
                style={{ color: color1 }}
              >
                {t.title}
              </div>
              <p className="mt-3 text-sm text-slate-600">{t.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3
          className="font-display text-sm tracking-[0.2em]"
          style={{ color: color1 }}
        >
          Recommended Products
        </h3>
        <div className="mt-5 grid sm:grid-cols-3 gap-px" style={{ background: "#e5e7eb" }}>
          {productSet.map((p) => (
            <div
              key={p.name}
              className="bg-white p-6 flex flex-col"
              style={{ borderTop: `3px solid ${color2}` }}
            >
              <div className="text-3xl">{p.icon}</div>
              <div
                className="font-display text-base mt-3"
                style={{ color: color1 }}
              >
                {p.name}
              </div>
              <p className="mt-2 text-sm text-slate-600 flex-1">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <button
          onClick={onSchedule}
          className="font-ui px-6 py-3 text-xs uppercase tracking-[0.18em]"
          style={{ background: color2, color: text2 }}
        >
          {ctaLabel} →
        </button>
      </div>
    </section>
  );
}
