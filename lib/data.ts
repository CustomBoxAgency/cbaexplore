export type IndustryKey =
  | "ecommerce"
  | "retail"
  | "food"
  | "beauty"
  | "tech"
  | "healthcare"
  | "luxury"
  | "other";

export const INDUSTRY_OPTIONS: { value: IndustryKey; label: string }[] = [
  { value: "ecommerce", label: "Ecommerce" },
  { value: "retail", label: "Retail" },
  { value: "food", label: "Food & Beverage" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "tech", label: "Tech & Hardware" },
  { value: "healthcare", label: "Healthcare" },
  { value: "luxury", label: "Luxury" },
  { value: "other", label: "Other" },
];

export type IndustryCopy = {
  label: string;
  hook: string;
  acqP: string;
  onbP: string;
  retP: string;
};

export const INDUSTRY_COPY: Record<IndustryKey, IndustryCopy> = {
  ecommerce: {
    label: "Ecommerce",
    hook: "Your unboxing is your second ad spend.",
    acqP:
      "Custom Box Agency turns the moment a parcel hits a doorstep into a paid acquisition channel. Branded mailers earn organic shares, drive UGC and TikTok unboxing content, and convert curious visitors into first-time buyers without ever increasing your CAC. Our designers work from your existing brand palette to build mailers that look like a continuation of your site experience — so the discovery story you spent months on doesn't end at the checkout button.",
    onbP:
      "We help your team move from purchase confirmation to product-in-hand without friction. Inserts, QR-driven setup cards, and structurally engineered mailers reduce damage rates while teaching first-time buyers how to use, share, and re-engage with your product. Every onboarding touchpoint is on-brand, sustainable, and built around the unboxing arc that defines modern ecommerce.",
    retP:
      "The second order is where margin lives, and packaging is the cheapest retention lever you own. CBA designs reorder-friendly inserts, loyalty-card slots, subscription-renewal sleeves, and seasonal sleeve refreshes that keep your top customers excited every cycle. We track unboxing-driven repeat rates with you so each iteration of the box does measurably more for LTV than the last.",
  },
  retail: {
    label: "Retail",
    hook: "Shelf presence is brand presence.",
    acqP:
      "Whether you're launching in Whole Foods or scaling a pop-up, CBA designs primary packaging that wins the three-second shelf test. We engineer faces, finishes, and structural cues that pull eyes from across the aisle and convert browsers into buyers — backed by retail compliance, FSC sourcing, and merchandising-ready dielines that your buyers actually approve.",
    onbP:
      "Retail rollouts live or die on the back-of-house. We coordinate with your 3PLs and store-ops teams to deliver shelf-ready cases, easy-open POS displays, and stocking-friendly cartons that cut associate handling time. Your store teams unpack faster, your shelves stay full, and your launch hits its sell-through targets in week one.",
    retP:
      "Retail customers don't have a 'log in.' Your packaging is the loyalty program. CBA designs limited-edition runs, seasonal collector formats, and hidden-print details that turn one-time aisle pickups into search-and-share behavior. We help you build a packaging cadence that makes regulars stay regulars and turns shelf shoppers into brand fans.",
  },
  food: {
    label: "Food & Beverage",
    hook: "Packaging that protects flavor — and your margins.",
    acqP:
      "First taste matters. CBA designs F&B packaging that tells your origin story before the first bite — from artisanal coffee bags with valve venting to chef-grade meal-kit boxes that present like a gift. We balance shelf appeal with FDA-compliant materials and cold-chain durability so your trial purchase becomes a habit, not a one-time curiosity.",
    onbP:
      "Food brands win when product arrives at temperature, intact, and ready to use. Our insulated mailers, grease-resistant liners, tamper-evident seals, and structurally engineered cartons keep ingredients pristine through last-mile delivery. We design recipe cards, scan-to-cook QR inserts, and reusable freezer-to-table formats that turn the first meal into a learned ritual.",
    retP:
      "Subscription F&B lives on retention math: every box has to feel like the first. CBA designs rotating sleeve programs, seasonal limited editions, refer-a-friend insert kits, and sustainability storytelling printed straight on the carton. We help you compete with the next big DTC food launch by making your existing customers feel like insiders.",
  },
  beauty: {
    label: "Beauty & Personal Care",
    hook: "Luxury starts before the lid lifts.",
    acqP:
      "Beauty is bought with the eyes, then justified with the hands. CBA designs primary cartons, secondary sleeves, and PR-mailer kits with soft-touch finishes, foil stamping, embossing, and structural reveals that make influencers reach for the camera. We engineer first-impression unboxings designed to seed organic content and accelerate trial conversion.",
    onbP:
      "Routine adoption is where beauty brands lose customers. Our packaging includes rituals — application guides, regimen cards, dosing inserts, and structurally cued ordering — that teach customers how to use the product correctly the first time. Our PCR-validated, refill-friendly architectures also support the sustainability claims your buyers are demanding.",
    retP:
      "Repurchase is everything in beauty. CBA designs refill-program packaging, replenishment-cued inserts, and exclusive limited-run drops that turn first-time buyers into loyalty-program members. We engineer your packaging system so every reorder, refill, and gift-with-purchase reinforces the brand positioning that earned the first sale.",
  },
  tech: {
    label: "Tech & Hardware",
    hook: "First impressions = first reviews.",
    acqP:
      "Tech buyers research for weeks and decide in seconds. CBA designs unboxing experiences engineered for the YouTube reviewer arc — from foam-cradled reveals to magnetic lid mechanics that earn their own slow-motion shot. Our presentation packaging makes a $400 device feel like a $1,200 device, lifts perceived value, and shortens the gap from preorder to social proof.",
    onbP:
      "First-run setup is where tech products live or die. CBA designs structural inserts, color-coded cable nests, scan-to-pair quick-start cards, and ESD-safe trays that walk a first-time user from box to working product in under five minutes. Lower setup time correlates directly with lower returns and higher review scores.",
    retP:
      "Hardware retention is accessory retention. CBA designs the packaging system around your add-ons, replacement parts, and trade-in programs so customers stay in your ecosystem as their needs grow. From upgrade-bait sleeve programs to repair-friendly mailers, we engineer every secondary purchase to feel as considered as the first.",
  },
  healthcare: {
    label: "Healthcare",
    hook: "Compliance you can hold. Care you can feel.",
    acqP:
      "Healthcare packaging must inspire trust before the first dose. CBA designs HIPAA-aware, regulation-compliant primary and secondary packaging that signals clinical credibility without feeling cold. From DTC pharmacy mailers to clinic-shelf cartons, we balance the soft brand language of modern healthcare with the regulatory rigor your QA team requires.",
    onbP:
      "Adherence starts with how the product arrives. CBA designs dosing inserts, calendar-formatted blister sleeves, child-resistant + senior-friendly closures, and accessibility-tested onboarding materials that guide patients through first use safely. Our cold-chain validated mailers ship temperature-sensitive therapies anywhere in the country with audit-ready documentation.",
    retP:
      "Refill compliance is healthcare retention. We design auto-renewal sleeves, prescription-cycle reorder cards, and care-team check-in inserts that lift refill rates and reduce churn. Every touchpoint reinforces the trust patients placed in you when they signed up.",
  },
  luxury: {
    label: "Luxury",
    hook: "The box should feel inevitable.",
    acqP:
      "In luxury, the packaging is the product. CBA designs rigid setup boxes, magnetic-close presentation formats, and material treatments — Wibalin, GF Smith, soft-touch, edge-paint, foil — that make first-time buyers feel they've joined something. We collaborate with your atelier on bespoke structural reveals worthy of a flagship launch.",
    onbP:
      "Luxury onboarding is ceremony. CBA designs hand-tied ribbon kits, signature-card sleeves, and concierge-routed white-glove unboxing systems that turn first delivery into an event. Our finishes survive air freight, white-glove couriers, and showroom merchandising without ever looking like a shipping carton.",
    retP:
      "Luxury retention is whispered, not announced. CBA designs members-only packaging, archival-grade re-purchase boxes, and personalization touches — debossed initials, hand-signed cards, custom interior linings — that make every subsequent purchase feel more exclusive than the last.",
  },
  other: {
    label: "Custom",
    hook: "Packaging worth posting.",
    acqP:
      "Whatever the category, packaging is your highest-leverage acquisition surface. CBA partners with you to design first-impression formats — primary cartons, mailers, presentation kits — that convert curiosity into trial. We work from your brand system, your customer psychology, and your channel mix to build packaging that earns its place in the buying journey.",
    onbP:
      "We design end-to-end onboarding packaging: structurally engineered mailers, scan-to-setup inserts, ritual-driven reveals, and damage-resistant interiors that turn first delivery into a complete first-use experience. Whatever the product, the goal is the same — get your customer to value, faster.",
    retP:
      "Retention packaging is about being remembered. CBA helps you design cyclical drops, refill-friendly architectures, and seasonal updates that keep your most-loved customers leaning in. We measure what each iteration does for repeat rate so packaging stops being a cost center and starts being a growth lever.",
  },
};

export type Product = {
  name: string;
  description: string;
  icon: string;
};

export const PRODUCTS: Record<IndustryKey, Product[]> = {
  ecommerce: [
    {
      name: "Custom Mailer Box",
      description: "Full-color exterior + interior print. The unboxing standard.",
      icon: "📦",
    },
    {
      name: "Tissue + Sticker Kit",
      description: "Branded inner-wrap that earns organic UGC.",
      icon: "🎁",
    },
    {
      name: "Branded Shipper",
      description: "Outer corrugated shipper printed inside and out.",
      icon: "🚚",
    },
  ],
  retail: [
    {
      name: "Folding Carton",
      description: "Lightweight, retail-ready primary packaging.",
      icon: "🛍️",
    },
    {
      name: "Shelf-Ready Display",
      description: "POS case that doubles as a merchandising tray.",
      icon: "🪧",
    },
    {
      name: "Master Case",
      description: "Compliant outer for distribution and back-of-house.",
      icon: "📚",
    },
  ],
  food: [
    {
      name: "Insulated Mailer",
      description: "Cold-chain validated for temperature-sensitive shipping.",
      icon: "❄️",
    },
    {
      name: "Grease-Resistant Carton",
      description: "FDA-compliant primary packaging for prepared food.",
      icon: "🥡",
    },
    {
      name: "Coffee Bag w/ Valve",
      description: "One-way degassing valve, full-bleed printable surface.",
      icon: "☕",
    },
  ],
  beauty: [
    {
      name: "Rigid Magnetic Box",
      description: "Soft-touch with magnetic closure — PR-kit ready.",
      icon: "💄",
    },
    {
      name: "Folded Carton w/ Foil",
      description: "Foil-stamped primary carton with embossed logo.",
      icon: "✨",
    },
    {
      name: "Refill Sleeve",
      description: "Lower-cost refill format that reinforces sustainability claims.",
      icon: "♻️",
    },
  ],
  tech: [
    {
      name: "Foam-Cradle Setup Box",
      description: "Custom EVA foam insert with structured product reveal.",
      icon: "🎧",
    },
    {
      name: "ESD-Safe Inner Tray",
      description: "Static-protective insert for sensitive electronics.",
      icon: "⚡",
    },
    {
      name: "Magnetic Lid Box",
      description: "Premium presentation box with one-handed opening.",
      icon: "📱",
    },
  ],
  healthcare: [
    {
      name: "Cold-Chain Mailer",
      description: "Validated insulated mailer with audit-ready documentation.",
      icon: "🧊",
    },
    {
      name: "Compliant Carton",
      description: "Child-resistant + senior-friendly primary packaging.",
      icon: "💊",
    },
    {
      name: "Patient Onboarding Kit",
      description: "Multi-component kit with dosing inserts and care card.",
      icon: "🩺",
    },
  ],
  luxury: [
    {
      name: "Rigid Setup Box",
      description: "Wibalin-wrapped, edge-painted, hand-finished.",
      icon: "🎩",
    },
    {
      name: "Magnetic Presentation Case",
      description: "Soft-touch lid with foil-stamped monogram.",
      icon: "💎",
    },
    {
      name: "Bespoke Reveal Insert",
      description: "Custom-fabricated interior with ribbon-pull mechanism.",
      icon: "🎀",
    },
  ],
  other: [
    {
      name: "Custom Mailer",
      description: "Brand-matched corrugated mailer with full-color print.",
      icon: "📦",
    },
    {
      name: "Folding Carton",
      description: "Retail-ready primary packaging in any configuration.",
      icon: "🗂️",
    },
    {
      name: "Branded Insert",
      description: "Printed inner card for product story or promo.",
      icon: "📝",
    },
  ],
};

export const BRAND_PALETTES: { color1: string; color2: string }[] = [
  { color1: "#032D23", color2: "#2DCCD3" },
  { color1: "#1E3A8A", color2: "#F59E0B" },
  { color1: "#7C2D12", color2: "#FACC15" },
  { color1: "#831843", color2: "#FB7185" },
  { color1: "#064E3B", color2: "#34D399" },
  { color1: "#1E1B4B", color2: "#A78BFA" },
  { color1: "#0C4A6E", color2: "#38BDF8" },
  { color1: "#451A03", color2: "#FB923C" },
  { color1: "#3F1D38", color2: "#E879F9" },
  { color1: "#0F172A", color2: "#6366F1" },
  { color1: "#134E4A", color2: "#5EEAD4" },
  { color1: "#365314", color2: "#A3E635" },
];

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function brandFromUrl(url: string | null | undefined): {
  color1: string;
  color2: string;
} {
  if (!url) return BRAND_PALETTES[0];
  let host: string;
  try {
    host = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
  } catch {
    host = url;
  }
  const idx = hashString(host) % BRAND_PALETTES.length;
  return BRAND_PALETTES[idx];
}

export function detectIndustry(url: string | null | undefined): IndustryKey {
  if (!url) return "other";
  const u = url.toLowerCase();
  if (/(beauty|cosmet|skin|makeup|fragrance)/.test(u)) return "beauty";
  if (/(food|coffee|tea|snack|chocolat|bakery|brew|kitchen|dine)/.test(u)) return "food";
  if (/(health|clinic|pharma|med|care|wellness)/.test(u)) return "healthcare";
  if (/(luxury|atelier|maison|couture|bespoke)/.test(u)) return "luxury";
  if (/(tech|hardware|gadget|electronic|labs|robotics)/.test(u)) return "tech";
  if (/(retail|store|shop|market|outlet)/.test(u)) return "retail";
  if (/(commerce|cart|goods|co\.|shop)/.test(u)) return "ecommerce";
  return "other";
}

export function safePalette(
  c1?: string | null,
  c2?: string | null,
  fallbackUrl?: string | null
): { color1: string; color2: string } {
  const fb = brandFromUrl(fallbackUrl);
  return {
    color1: normalizeHex(c1) ?? fb.color1,
    color2: normalizeHex(c2) ?? fb.color2,
  };
}

export function normalizeHex(input?: string | null): string | null {
  if (!input) return null;
  const hex = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  return `#${hex.toLowerCase()}`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

export const SAMPLE_CLIENTS = [
  {
    name: "Luminary Goods",
    contact: "buyer@luminarygoods.com",
    url: "https://luminarygoods.com",
    slug: "luminary-goods",
    industry: "luxury" as IndustryKey,
    hook: "The box should feel inevitable.",
  },
  {
    name: "Bloom & Wild",
    contact: "ops@bloomandwild.com",
    url: "https://bloomandwild.com",
    slug: "bloom-and-wild",
    industry: "ecommerce" as IndustryKey,
    hook: "Your unboxing is your second ad spend.",
  },
  {
    name: "Kinto Coffee",
    contact: "hello@kinto.co",
    url: "https://kinto.co",
    slug: "kinto-coffee",
    industry: "food" as IndustryKey,
    hook: "Packaging that protects flavor — and your margins.",
  },
];
