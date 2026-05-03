import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { SAMPLE_CLIENTS, brandFromUrl } from "./data";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "cba.db");

let _db: Database.Database | null = null;

function ensureDb(): Database.Database {
  if (_db) return _db;
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      contact     TEXT,
      url         TEXT,
      slug        TEXT UNIQUE NOT NULL,
      color1      TEXT,
      color2      TEXT,
      industry    TEXT,
      status      TEXT DEFAULT 'draft',
      viewed      INTEGER DEFAULT 0,
      created_at  TEXT DEFAULT (datetime('now')),
      hook        TEXT
    );
  `);

  _db = db;
  seedIfEmpty(db);
  return db;
}

function seedIfEmpty(db: Database.Database) {
  const row = db.prepare("SELECT COUNT(*) AS n FROM clients").get() as { n: number };
  if (row.n > 0) return;
  const insert = db.prepare(`
    INSERT INTO clients (name, contact, url, slug, color1, color2, industry, status, hook)
    VALUES (@name, @contact, @url, @slug, @color1, @color2, @industry, 'active', @hook)
  `);
  for (const s of SAMPLE_CLIENTS) {
    const palette = brandFromUrl(s.url);
    insert.run({
      name: s.name,
      contact: s.contact,
      url: s.url,
      slug: s.slug,
      color1: palette.color1,
      color2: palette.color2,
      industry: s.industry,
      hook: s.hook,
    });
  }
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

export function listClients(): Client[] {
  return ensureDb().prepare("SELECT * FROM clients ORDER BY created_at DESC").all() as Client[];
}

export function getClientBySlug(slug: string): Client | undefined {
  return ensureDb()
    .prepare("SELECT * FROM clients WHERE slug = ?")
    .get(slug) as Client | undefined;
}

export function createClient(c: NewClient): Client {
  const stmt = ensureDb().prepare(`
    INSERT INTO clients (name, contact, url, slug, color1, color2, industry, status, hook)
    VALUES (@name, @contact, @url, @slug, @color1, @color2, @industry, @status, @hook)
  `);
  const info = stmt.run({
    name: c.name,
    contact: c.contact ?? null,
    url: c.url ?? null,
    slug: c.slug,
    color1: c.color1 ?? null,
    color2: c.color2 ?? null,
    industry: c.industry ?? null,
    status: c.status ?? "draft",
    hook: c.hook ?? null,
  });
  return ensureDb()
    .prepare("SELECT * FROM clients WHERE id = ?")
    .get(info.lastInsertRowid) as Client;
}

export function updateClient(slug: string, patch: Partial<NewClient>): Client | undefined {
  const existing = getClientBySlug(slug);
  if (!existing) return undefined;
  const fields = Object.keys(patch);
  if (fields.length === 0) return existing;
  const set = fields.map((f) => `${f} = @${f}`).join(", ");
  ensureDb().prepare(`UPDATE clients SET ${set} WHERE slug = @slug`).run({ ...patch, slug });
  return getClientBySlug(slug);
}

export function deleteClient(slug: string): boolean {
  const info = ensureDb().prepare("DELETE FROM clients WHERE slug = ?").run(slug);
  return info.changes > 0;
}

export function markViewed(slug: string): void {
  ensureDb().prepare("UPDATE clients SET viewed = 1 WHERE slug = ?").run(slug);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function uniqueSlug(base: string): string {
  const root = slugify(base) || `client-${Date.now()}`;
  let candidate = root;
  let n = 2;
  while (getClientBySlug(candidate)) {
    candidate = `${root}-${n++}`;
  }
  return candidate;
}
