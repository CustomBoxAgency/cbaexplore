import { NextRequest, NextResponse } from "next/server";
import { deleteClient, getClientBySlug, markViewed, updateClient } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const client = await getClientBySlug(params.slug);
  if (!client) return NextResponse.json({ error: "not found" }, { status: 404 });
  await markViewed(params.slug);
  return NextResponse.json({ ...client, viewed: 1 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const patch = await req.json();
    const updated = await updateClient(params.slug, patch);
    if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "bad request" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const ok = await deleteClient(params.slug);
  if (!ok) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
