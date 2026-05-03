"use client";

import type { PageCtx } from "./types";

export default function PageSchedule({
  client,
  color1,
  color2,
  text2,
  ctaLabel,
  bookingUrl,
}: PageCtx) {
  return (
    <section className="px-12 py-20">
      <div className="max-w-3xl">
        <div
          className="font-ui text-[11px] uppercase tracking-[0.3em]"
          style={{ color: color2 }}
        >
          Let's build something for {client.name}
        </div>
        <h1
          className="font-display mt-4 text-5xl leading-tight"
          style={{ color: color1 }}
        >
          Schedule a 20-minute kickoff.
        </h1>
        <p className="mt-5 text-slate-700 max-w-2xl">
          We'll cover product picks, target unboxing date, and quantities.
          Bring your timeline — we'll bring the structural sketches.
        </p>
      </div>

      <a
        href={bookingUrl}
        target="_blank"
        rel="noreferrer"
        className="font-ui mt-12 inline-flex items-center gap-3 px-10 py-6 text-sm uppercase tracking-[0.18em]"
        style={{ background: color2, color: text2 }}
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </a>

      <div className="mt-16 grid sm:grid-cols-2 gap-px max-w-3xl" style={{ background: "#e5e7eb" }}>
        <OptionCard
          title="Discovery Call"
          body="20 minutes. Your team + ours. We'll scope the right packaging strategy for your launch window."
          cta="Book a discovery call"
          href={bookingUrl}
          color1={color1}
          color2={color2}
          text2={text2}
        />
        <OptionCard
          title="Sample Request"
          body="We'll ship physical samples in your brand colors so you can hold the structure before you commit."
          cta="Request samples"
          href={`mailto:${client.contact ?? "hello@customboxagency.com"}?subject=Sample request — ${encodeURIComponent(client.name)}`}
          color1={color1}
          color2={color2}
          text2={text2}
        />
      </div>
    </section>
  );
}

function OptionCard({
  title,
  body,
  cta,
  href,
  color1,
  color2,
  text2,
}: {
  title: string;
  body: string;
  cta: string;
  href: string;
  color1: string;
  color2: string;
  text2: string;
}) {
  return (
    <div className="bg-white p-8" style={{ borderTop: `3px solid ${color2}` }}>
      <div className="font-display text-xl" style={{ color: color1 }}>
        {title}
      </div>
      <p className="mt-3 text-sm text-slate-600">{body}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-ui mt-6 inline-block px-5 py-2.5 text-[11px] uppercase tracking-[0.18em]"
        style={{ background: color2, color: text2 }}
      >
        {cta} →
      </a>
    </div>
  );
}
