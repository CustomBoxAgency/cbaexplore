import { sql } from "@vercel/postgres";
import { SAMPLE_CLIENTS, brandFromUrl } from "./data";

let _initialized = false;

async function ensureInit(): Promise<void> {
  if (_initialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      contact     TEXT,
      url         TEXT,
      slug        TEXT UNIQUE NOT NULL,
      color1      TEXT,
      color2      TEXT,
      industry    TEXT,
      status      TEXT DEFAULT 'draft',
      viewed      INTEGER DEFAULT 0,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      hook        TEXT
    )
  `;
  const { rows } = await sql<{ count: string }>`SELECT COUNT(*)::text AS count FROM clients`;
  if (Number(rows[0].count) === 0) {
    for (const s of SAMPLE_CLIENTS) {
      const palette = brandFromUrl(s.url);
      await sql`
        INSERT INTO clients (name, contact, url, slug, color1, color2, industry, status, hook)
        VALUES (${s.name}, ${s.contact}, ${s.url}, ${s.slug},
                ${palette.color1}, ${palette.color2}, ${s.industry}, 'active', ${s.hook})
      `;
    }
  }
  _initialized = true;
}

export type Client = {
  id: number;
  name: string;
  contact: string | null;
  url: string | null;
  slug: string;
  color1: string | null;
  color2: string | null;
  industry: string | null;
  status: string;
  viewed: number;
  created_at: string;
  hook: string | null;
};

export type NewClient = Omit<Client, "id" | "viewed" | "created_at" | "status"> & {
  status?: string;
};

export async function listClients(): Promise<Client[]> {
  await ensureInit();
  const { rows } = await sql<Client>`SELECT * FROM clients ORDER BY created_at DESC`;
  return rows;
}

export async function getClientBySlug(slug: string): Promise<Client | undefined> {
  await ensureInit();
  const { rows } = await sql<Client>`SELECT * FROM clients WHERE slug = ${slug}`;
  return rows[0];
}

export async function createClient(c: NewClient): Promise<Client> {
  await ensureInit();
  const { rows } = await sql<Client>`
    INSERT INTO clients (name, contact, url, slug, color1, color2, industry, status, hook)
    VALUES (${c.name}, ${c.contact ?? null}, ${c.url ?? null}, ${c.slug},
            ${c.color1 ?? null}, ${c.color2 ?? null}, ${c.industry ?? null},
            ${c.status ?? "draft"}, ${c.hook ?? null})
    RETURNING *
  `;
  return rows[0];
}

const PATCHABLE = [
  "name",
  "contact",
  "url",
  "color1",
  "color2",
  "industry",
  "status",
  "hook",
] as const;

export async function updateClient(
  slug: string,
  patch: Partial<NewClient>
): Promise<Client | undefined> {
  await ensureInit();
  const existing = await getClientBySlug(slug);
  if (!existing) return undefined;

  for (const key of PATCHABLE) {
    if (!(key in patch)) continue;
    const value = (patch as Record<string, unknown>)[key] ?? null;
    switch (key) {
      case "name":
        await sql`UPDATE clients SET name = ${value as string} WHERE slug = ${slug}`;
        break;
      case "contact":
        await sql`UPDATE clients SET contact = ${value as string | null} WHERE slug = ${slug}`;
        break;
      case "url":
        await sql`UPDATE clients SET url = ${value as string | null} WHERE slug = ${slug}`;
        break;
      case "color1":
        await sql`UPDATE clients SET color1 = ${value as string | null} WHERE slug = ${slug}`;
        break;
      case "color2":
        await sql`UPDATE clients SET color2 = ${value as string | null} WHERE slug = ${slug}`;
        break;
      case "industry":
        await sql`UPDATE clients SET industry = ${value as string | null} WHERE slug = ${slug}`;
        break;
      case "status":
        await sql`UPDATE clients SET status = ${value as string} WHERE slug = ${slug}`;
        break;
      case "hook":
        await sql`UPDATE clients SET hook = ${value as string | null} WHERE slug = ${slug}`;
        break;
    }
  }
  return getClientBySlug(slug);
}

export async function deleteClient(slug: string): Promise<boolean> {
  await ensureInit();
  const { rowCount } = await sql`DELETE FROM clients WHERE slug = ${slug}`;
  return (rowCount ?? 0) > 0;
}

export async function markViewed(slug: string): Promise<void> {
  await ensureInit();
  await sql`UPDATE clients SET viewed = 1 WHERE slug = ${slug}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || `client-${Date.now()}`;
  let candidate = root;
  let n = 2;
  while (await getClientBySlug(candidate)) {
    candidate = `${root}-${n++}`;
  }
  return candidate;
}
