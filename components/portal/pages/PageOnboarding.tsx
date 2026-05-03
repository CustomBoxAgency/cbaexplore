"use client";

import JourneyPage from "./JourneyPage";
import type { PageCtx } from "./types";

export default function PageOnboarding(ctx: PageCtx) {
  const rotated = [...ctx.products.slice(1), ctx.products[0]];
  return (
    <JourneyPage
      {...ctx}
      stage={2}
      stageName="Onboarding & Delivery"
      headlineSuffix="Delivering the Brand Promise."
      bigStat="68%"
      bigStatLabel="of customers say packaging quality directly shapes their perception of product value."
      body={ctx.copy.onbP}
      tactics={[
        {
          title: "Delivery-First Design",
          body: "Structural engineering that protects product integrity through last-mile and international transit.",
        },
        {
          title: "Guided Unboxing Journey",
          body: "Reveal-driven inserts and scan-to-setup cues that get customers to first value, faster.",
        },
        {
          title: "Personalized Welcome Kits",
          body: "Branded onboarding kits that turn first delivery into a deliberate ritual.",
        },
      ]}
      productSet={rotated}
    />
  );
}
