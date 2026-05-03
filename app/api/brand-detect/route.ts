import { NextRequest, NextResponse } from "next/server";
import { brandFromUrl, normalizeHex, rgbToHex } from "@/lib/data";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Palette = {
  color1: string;
  color2: string;
  source: "html" | "fallback";
};

function ensureUrl(input: string): string | null {
  try {
    return new URL(input.startsWith("http") ? input : `https://${input}`).toString();
  } catch {
    return null;
  }
}

function colorfulness(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  const sat = (max - min) / max;
  const lum = (max + min) / 2 / 255;
  const lumPenalty = Math.abs(lum - 0.5) * 2;
  return sat * (1 - lumPenalty * 0.4);
}

function distance(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }) {
  return Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace(/^#/, "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function extractFromHtml(html: string): { color1: string; color2: string } | null {
  const tally = new Map<string, { r: number; g: number; b: number; n: number }>();

  const themeMatch = html.match(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/i);
  const themeColor = themeMatch ? normalizeHex(themeMatch[1]) : null;

  const hex6 = html.match(/#([0-9a-fA-F]{6})\b/g) ?? [];
  const hex3 = html.match(/#([0-9a-fA-F]{3})\b/g) ?? [];
  const rgbMatches =
    html.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/g) ?? [];

  const candidates: { r: number; g: number; b: number }[] = [];
  for (const h of hex6) candidates.push(hexToRgb(h));
  for (const h of hex3) candidates.push(hexToRgb(h));
  for (const r of rgbMatches) {
    const m = r.match(/(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
    if (m) candidates.push({ r: +m[1], g: +m[2], b: +m[3] });
  }
  if (themeColor) {
    const t = hexToRgb(themeColor);
    for (let i = 0; i < 5; i++) candidates.push(t);
  }

  if (candidates.length === 0) return null;

  for (const c of candidates) {
    const key = `${c.r >> 4},${c.g >> 4},${c.b >> 4}`;
    const cur = tally.get(key);
    if (cur) {
      cur.r += c.r;
      cur.g += c.g;
      cur.b += c.b;
      cur.n += 1;
    } else {
      tally.set(key, { ...c, n: 1 });
    }
  }

  const ranked = Array.from(tally.values())
    .map((b) => {
      const r = Math.round(b.r / b.n);
      const g = Math.round(b.g / b.n);
      const bl = Math.round(b.b / b.n);
      return { r, g, b: bl, score: b.n * (0.4 + colorfulness(r, g, bl)) };
    })
    .filter((c) => !(c.r > 240 && c.g > 240 && c.b > 240) && !(c.r < 15 && c.g < 15 && c.b < 15))
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) return null;

  const primary = ranked[0];
  const secondary =
    ranked.find((c) => distance(c, primary) > 90) ?? ranked[1] ?? primary;

  return {
    color1: rgbToHex(primary.r, primary.g, primary.b),
    color2: rgbToHex(secondary.r, secondary.g, secondary.b),
  };
}

async function fetchPalette(target: string): Promise<Palette> {
  const url = ensureUrl(target);
  if (!url) {
    const fb = brandFromUrl(target);
    return { ...fb, source: "fallback" };
  }
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; ExploreCBA/1.0; +https://customboxagency.com)",
        accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const html = await res.text();
    const extracted = extractFromHtml(html);
    if (!extracted) throw new Error("no colors found");
    return { ...extracted, source: "html" };
  } catch {
    const fb = brandFromUrl(url);
    return { ...fb, source: "fallback" };
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });
  return NextResponse.json(await fetchPalette(url));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (!body?.url) return NextResponse.json({ error: "url required" }, { status: 400 });
  return NextResponse.json(await fetchPalette(body.url));
}
