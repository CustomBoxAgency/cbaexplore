import type { Client } from "@/lib/db";
import type { IndustryCopy, Product } from "@/lib/data";

export type PageCtx = {
  client: Client;
  color1: string;
  color2: string;
  text1: string;
  text2: string;
  copy: IndustryCopy;
  products: Product[];
  bookingUrl: string;
  ctaLabel: string;
  onSchedule: () => void;
};
