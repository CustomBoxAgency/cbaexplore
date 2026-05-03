"use client";

import JourneyPage from "./JourneyPage";
import type { PageCtx } from "./types";

export default function PageAcquisition(ctx: PageCtx) {
  return (
    <JourneyPage
      {...ctx}
      stage={1}
      stageName="Acquisition"
      headlineSuffix="Winning the First Impression."
      bigStat="72%"
      bigStatLabel="of buying decisions are made at the moment the customer first encounters your packaging."
      body={ctx.copy.acqP}
      tactics={[
        {
          title: "Shelf Presence",
          body: "Primary packaging engineered to win the three-second test in retail and online thumbnails.",
        },
        {
          title: "Social Shareability",
          body: "Structural reveals and finish details designed to earn organic UGC and influencer reach.",
        },
        {
          title: "Gift & Trial Kits",
          body: "PR-ready presentation kits that turn cold prospects into warm advocates.",
        },
      ]}
      productSet={ctx.products}
    />
  );
}
