"use client";

import JourneyPage from "./JourneyPage";
import type { PageCtx } from "./types";

export default function PageRetention(ctx: PageCtx) {
  const rotated = [ctx.products[2], ctx.products[0], ctx.products[1]].filter(Boolean);
  return (
    <JourneyPage
      {...ctx}
      stage={3}
      stageName="Retention"
      headlineSuffix="Keeping Customers for Life."
      bigStat="5×"
      bigStatLabel="cheaper to retain an existing customer than to acquire a new one."
      body={ctx.copy.retP}
      tactics={[
        {
          title: "Subscription Boxes",
          body: "Cyclical packaging programs that make every reorder feel like the first.",
        },
        {
          title: "Awards & Recognition Kits",
          body: "Internal and partner recognition packaging that reinforces loyalty inside and out.",
        },
        {
          title: "Referral & Loyalty Packaging",
          body: "Insert programs and limited drops engineered to drive word-of-mouth and repeat purchase.",
        },
      ]}
      productSet={rotated as typeof ctx.products}
    />
  );
}
