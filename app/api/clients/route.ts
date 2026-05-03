import { NextRequest, NextResponse } from "next/server";
import { createClient, listClients, uniqueSlug } from "@/lib/db";
import { brandFromUrl, detectIndustry, normalizeHex } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(listClients());
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.name || typeof body.name !== "string") {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    const slug = uniqueSlug(body.slug || body.name);
    const industry = body.industry || detectIndustry(body.url);
    const fallbackPalette = brandFromUrl(body.url);
    const created = createClient({
      name: body.name,
      contact: body.contact ?? null,
      url: body.url ?? null,
      slug,
      color1: normalizeHex(body.color1) ?? fallbackPalette.color1,
      color2: normalizeHex(body.color2) ?? fallbackPalette.color2,
      industry,
      hook: body.hook ?? null,
      status: body.status ?? "draft",
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 500 }
    );
  }
}
