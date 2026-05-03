 
# Explore CBA

Sales portal generator for **Custom Box Agency**. Each prospect gets a personalized, color-matched walkthrough at `/[slug]`.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- SQLite via `better-sqlite3` (file at `data/cba.db`)
- Brand-color extraction by scraping page HTML for hex/theme-color, with a deterministic hash-based fallback palette

## Routes

| Path                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `/`                  | Self-serve landing — generate a portal   |
| `/[slug]`            | Public client portal                     |
| `/admin`             | Admin dashboard (password protected)     |
| `/api/clients`       | `GET` list, `POST` create                |
| `/api/clients/:slug` | `GET` / `PATCH` / `DELETE` one           |
| `/api/brand-detect`  | URL → `{ color1, color2 }`               |

## Local dev

```bash
npm install
npm run dev
```

Admin password defaults to `cba2024`. Change it in the Settings tab.

## Database

SQLite file lives at `data/cba.db` and is auto-created on first run with three sample clients seeded. Schema:

```
clients(id, name, contact, url, slug, color1, color2,
        industry, status, viewed, created_at, hook)
```
