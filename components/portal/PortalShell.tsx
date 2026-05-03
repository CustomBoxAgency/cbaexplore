"use client";

import { useState } from "react";
import type { Client } from "@/lib/db";
import type { IndustryKey } from "@/lib/data";
import { INDUSTRY_COPY, PRODUCTS, safePalette } from "@/lib/data";
import { readableOn, withAlpha } from "@/lib/theme";
import CbaMark from "./CbaMark";
import {
  IconAbout,
  IconAcq,
  IconCalendar,
  IconOnb,
  IconOverview,
  IconRet,
} from "./icons";
import PageOverview from "./pages/PageOverview";
import PageAbout from "./pages/PageAbout";
import PageAcquisition from "./pages/PageAcquisition";
import PageOnboarding from "./pages/PageOnboarding";
import PageRetention from "./pages/PageRetention";
import PageSchedule from "./pages/PageSchedule";

export type PageKey =
  | "overview"
  | "about"
  | "acq"
  | "onb"
  | "ret"
  | "schedule";

const DEFAULT_BOOKING = "https://customboxagency.com/book";
const DEFAULT_CTA_LABEL = "Schedule a Call";

type Props = { client: Client };

export default function PortalShell({ client }: Props) {
  const [active, setActive] = useState<PageKey>("overview");

  const palette = safePalette(client.color1, client.color2, client.url);
  const color1 = palette.color1;
  const color2 = palette.color2;
  const text1 = readableOn(color1);
  const text2 = readableOn(color2);

  const industryKey: IndustryKey = (client.industry as IndustryKey) ?? "other";
  const copy = INDUSTRY_COPY[industryKey] ?? INDUSTRY_COPY.other;
  const products = PRODUCTS[industryKey] ?? PRODUCTS.other;

  const bookingUrl =
    typeof window !== "undefined"
      ? localStorage.getItem("cba-booking-url") || DEFAULT_BOOKING
      : DEFAULT_BOOKING;
  const ctaLabel =
    typeof window !== "undefined"
      ? localStorage.getItem("cba-cta-label") || DEFAULT_CTA_LABEL
      : DEFAULT_CTA_LABEL;

  const ctx = {
    client,
    color1,
    color2,
    text1,
    text2,
    copy,
    products,
    bookingUrl,
    ctaLabel,
    onSchedule: () => setActive("schedule"),
  };

  const navTop: { key: PageKey; label: string; icon: JSX.Element }[] = [
    { key: "overview", label: "Overview", icon: <IconOverview /> },
    { key: "about", label: "About CBA", icon: <IconAbout /> },
  ];
  const navJourney: { key: PageKey; label: string; icon: JSX.Element }[] = [
    { key: "acq", label: "Acquisition", icon: <IconAcq /> },
    { key: "onb", label: "Onboarding & Delivery", icon: <IconOnb /> },
    { key: "ret", label: "Retention", icon: <IconRet /> },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={
        {
          ["--brand1" as string]: color1,
          ["--brand2" as string]: color2,
          ["--brand-text" as string]: text1,
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 bottom-0 w-60 flex flex-col p-6 z-20"
        style={{ background: color1, color: text1 }}
      >
        <div className="flex items-center gap-3">
          <CbaMark size={24} color={color2} />
          <div className="font-display text-sm tracking-wider">Explore CBA</div>
        </div>

        <nav className="mt-10 flex flex-col">
          {navTop.map((item) => (
            <NavItem
              key={item.key}
              active={active === item.key}
              accent={color2}
              text={text1}
              onClick={() => setActive(item.key)}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>

        <div
          className="mt-10 mb-3 text-[10px] uppercase tracking-[0.25em]"
          style={{ color: withAlpha(text1, 0.55) }}
        >
          Customer Journey
        </div>
        <nav className="flex flex-col">
          {navJourney.map((item) => (
            <NavItem
              key={item.key}
              active={active === item.key}
              accent={color2}
              text={text1}
              onClick={() => setActive(item.key)}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>

        <div
          className="my-6 h-px"
          style={{ background: withAlpha(text1, 0.18) }}
        />

        <NavItem
          active={active === "schedule"}
          accent={color2}
          text={text1}
          onClick={() => setActive("schedule")}
          icon={<IconCalendar />}
          label="Schedule a Call"
        />

        <button
          onClick={() => setActive("schedule")}
          className="font-ui mt-auto py-3 text-xs uppercase tracking-[0.18em]"
          style={{ background: color2, color: text2 }}
        >
          {ctaLabel}
        </button>
      </aside>

      {/* Top bar */}
      <header
        className="fixed top-0 left-60 right-0 h-14 flex items-center justify-between px-8 z-10"
        style={{ background: "#ffffff", borderBottom: `2px solid ${color2}` }}
      >
        <div className="flex items-center gap-3">
          <CbaMark size={20} color={color1} />
          <span
            className="font-display text-xs tracking-[0.2em]"
            style={{ color: color1 }}
          >
            Custom Box Agency
          </span>
          <span className="ml-3 text-xs text-slate-500">
            for <span style={{ color: color1 }}>{client.name}</span>
          </span>
        </div>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="font-ui text-[11px] uppercase tracking-[0.18em] px-4 py-2"
          style={{ background: color2, color: text2 }}
        >
          {ctaLabel}
        </a>
      </header>

      {/* Content */}
      <main className="ml-60 mt-14 flex-1 min-h-[calc(100vh-3.5rem)]">
        {active === "overview" && <PageOverview {...ctx} />}
        {active === "about" && <PageAbout {...ctx} />}
        {active === "acq" && <PageAcquisition {...ctx} />}
        {active === "onb" && <PageOnboarding {...ctx} />}
        {active === "ret" && <PageRetention {...ctx} />}
        {active === "schedule" && <PageSchedule {...ctx} />}
      </main>
    </div>
  );
}

function NavItem({
  active,
  onClick,
  icon,
  label,
  accent,
  text,
}: {
  active: boolean;
  onClick: () => void;
  icon: JSX.Element;
  label: string;
  accent: string;
  text: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 text-sm text-left transition"
      style={{
        borderLeft: `3px solid ${active ? accent : "transparent"}`,
        background: active ? withAlpha(text, 0.08) : "transparent",
        color: active ? text : withAlpha(text, 0.75),
        fontWeight: active ? 800 : 600,
      }}
    >
      <span style={{ color: active ? accent : withAlpha(text, 0.65) }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
