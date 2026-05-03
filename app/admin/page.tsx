"use client";

import { useEffect, useMemo, useState } from "react";
import CbaMark from "@/components/portal/CbaMark";
import { INDUSTRY_OPTIONS, type IndustryKey, brandFromUrl } from "@/lib/data";

const GD = "#032D23";
const TL = "#2DCCD3";
const TD = "#086F78";
const PASSWORD_KEY = "cba-admin-password";
const AUTH_KEY = "cba-admin-authed";
const BOOKING_KEY = "cba-booking-url";
const CTA_KEY = "cba-cta-label";
const DEFAULT_PASSWORD = "cba2024";
const DEFAULT_BOOKING = "https://customboxagency.com/book";
const DEFAULT_CTA = "Schedule a Call";

type Client = {
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

type Tab = "dashboard" | "all" | "settings";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    const expected = localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (pw === expected) {
      localStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    } else {
      setErr("Wrong password");
    }
  }

  if (!authed) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: GD }}
      >
        <form
          onSubmit={login}
          className="bg-white p-10 w-full max-w-sm"
          style={{ borderTop: `4px solid ${TL}` }}
        >
          <div className="flex items-center gap-3">
            <CbaMark size={26} color={GD} />
            <span className="font-display text-sm tracking-[0.2em]" style={{ color: GD }}>
              Custom Box Agency
            </span>
          </div>
          <h1 className="font-display text-2xl mt-6" style={{ color: GD }}>
            Admin Login
          </h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
            autoFocus
          />
          {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
          <button
            className="font-ui mt-5 w-full py-3 text-xs uppercase tracking-[0.2em]"
            style={{ background: GD, color: "#fff" }}
          >
            Sign in
          </button>
        </form>
      </main>
    );
  }

  return <Dashboard />;
}

function Dashboard() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  async function refresh() {
    setLoading(true);
    const r = await fetch("/api/clients", { cache: "no-store" });
    setClients(await r.json());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    location.reload();
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f4f0" }}>
      <aside
        className="fixed left-0 top-0 bottom-0 w-60 flex flex-col p-6"
        style={{ background: GD, color: "#fff" }}
      >
        <div className="flex items-center gap-3">
          <CbaMark size={24} color={TL} />
          <div className="font-display text-sm tracking-[0.2em]">CBA Admin</div>
        </div>

        <nav className="mt-10 flex flex-col">
          <SideNavItem active={tab === "dashboard"} onClick={() => setTab("dashboard")}>
            Dashboard
          </SideNavItem>
          <SideNavItem active={tab === "all"} onClick={() => setTab("all")}>
            All Portals
          </SideNavItem>
          <SideNavItem active={tab === "settings"} onClick={() => setTab("settings")}>
            Settings
          </SideNavItem>
        </nav>

        <button
          onClick={() => setModalOpen(true)}
          className="font-ui mt-auto py-3 text-xs uppercase tracking-[0.18em]"
          style={{ background: TL, color: GD }}
        >
          + New Portal
        </button>
        <button
          onClick={logout}
          className="mt-3 text-xs text-white/60 hover:text-white"
        >
          Sign out
        </button>
      </aside>

      <main className="ml-60 flex-1">
        <header
          className="bg-white px-10 py-6 flex items-center justify-between"
          style={{ borderBottom: `2px solid ${TL}` }}
        >
          <div>
            <div className="font-ui text-[10px] uppercase tracking-[0.25em] text-slate-500">
              {tab === "dashboard" && "Overview"}
              {tab === "all" && "Portals"}
              {tab === "settings" && "Configuration"}
            </div>
            <h1 className="font-display text-3xl mt-1" style={{ color: GD }}>
              {tab === "dashboard" && "Dashboard"}
              {tab === "all" && "All Portals"}
              {tab === "settings" && "Settings"}
            </h1>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="font-ui px-4 py-2.5 text-[11px] uppercase tracking-[0.18em]"
            style={{ background: GD, color: "#fff" }}
          >
            + New Portal
          </button>
        </header>

        <div className="p-10">
          {tab === "dashboard" && (
            <DashboardTab clients={clients} loading={loading} />
          )}
          {tab === "all" && <AllPortalsTab clients={clients} onRefresh={refresh} />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </main>

      {modalOpen && (
        <NewPortalModal
          onClose={() => setModalOpen(false)}
          onCreated={() => {
            setModalOpen(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}

function SideNavItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left px-3 py-2.5 text-sm transition"
      style={{
        borderLeft: `3px solid ${active ? TL : "transparent"}`,
        color: active ? "#fff" : "rgba(255,255,255,0.7)",
        background: active ? "rgba(255,255,255,0.06)" : "transparent",
        fontWeight: active ? 800 : 600,
      }}
    >
      {children}
    </button>
  );
}

function DashboardTab({
  clients,
  loading,
}: {
  clients: Client[];
  loading: boolean;
}) {
  const total = clients.length;
  const active = clients.filter((c) => c.status === "active").length;
  const viewed = clients.filter((c) => c.viewed > 0).length;
  const recent = clients.slice(0, 6);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-px" style={{ background: "#e5e0d6" }}>
        <StatCard label="Total Portals" value={total} />
        <StatCard label="Active" value={active} accent />
        <StatCard label="Viewed" value={viewed} />
      </div>

      <div className="mt-10">
        <div className="font-display text-sm tracking-[0.2em]" style={{ color: GD }}>
          Recent Portals
        </div>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e5e0d6" }}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white p-6 h-32 animate-pulse" />
              ))
            : recent.map((c) => <ClientCard key={c.id} client={c} />)}
          {!loading && recent.length === 0 && (
            <div className="bg-white p-6 col-span-full text-sm text-slate-500">
              No portals yet — click "New Portal" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className="bg-white p-8"
      style={{ borderTop: `3px solid ${accent ? TL : GD}` }}
    >
      <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-slate-500">
        {label}
      </div>
      <div className="font-display text-5xl mt-3" style={{ color: accent ? TD : GD }}>
        {value}
      </div>
    </div>
  );
}

function AllPortalsTab({
  clients,
  onRefresh,
}: {
  clients: Client[];
  onRefresh: () => void;
}) {
  async function remove(slug: string) {
    if (!confirm(`Delete portal /${slug}?`)) return;
    await fetch(`/api/clients/${slug}`, { method: "DELETE" });
    onRefresh();
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "#e5e0d6" }}>
        {clients.map((c) => (
          <ClientCard key={c.id} client={c} onDelete={() => remove(c.slug)} />
        ))}
        {clients.length === 0 && (
          <div className="bg-white p-6 col-span-full text-sm text-slate-500">
            No portals yet.
          </div>
        )}
      </div>
    </div>
  );
}

function ClientCard({
  client,
  onDelete,
}: {
  client: Client;
  onDelete?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const initials = client.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  const domain = (() => {
    if (!client.url) return "—";
    try {
      return new URL(
        client.url.startsWith("http") ? client.url : `https://${client.url}`
      ).hostname.replace(/^www\./, "");
    } catch {
      return client.url;
    }
  })();

  function copy() {
    const link = `${location.origin}/${client.slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="bg-white p-6 flex flex-col" style={{ borderTop: `3px solid ${TL}` }}>
      <div className="flex items-start gap-4">
        <div
          className="font-display flex items-center justify-center w-12 h-12 text-sm"
          style={{ background: client.color1 || GD, color: "#fff" }}
        >
          {initials || "?"}
        </div>
        <div className="flex-1 min-w-0">
          <a
            href={`/${client.slug}`}
            target="_blank"
            rel="noreferrer"
            className="font-display text-base block truncate hover:underline"
            style={{ color: GD }}
          >
            {client.name}
          </a>
          <div className="text-xs text-slate-500 truncate">{domain}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge color={client.status === "active" ? TD : "#94a3b8"}>
          {client.status}
        </Badge>
        {client.industry && <Badge color={GD}>{client.industry}</Badge>}
        {client.viewed > 0 && <Badge color={TL} dark>viewed</Badge>}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={copy}
          className="font-ui flex-1 py-2 text-[10px] uppercase tracking-[0.18em] border-2"
          style={{ borderColor: GD, color: GD }}
        >
          {copied ? "Copied ✓" : "Copy Link"}
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="font-ui px-3 py-2 text-[10px] uppercase tracking-[0.18em] border-2 border-red-300 text-red-600 hover:bg-red-50"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

function Badge({
  color,
  dark,
  children,
}: {
  color: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className="font-ui text-[9px] uppercase tracking-[0.18em] px-2 py-1"
      style={{ background: color, color: dark ? GD : "#fff" }}
    >
      {children}
    </span>
  );
}

function SettingsTab() {
  const [bookingUrl, setBookingUrl] = useState(DEFAULT_BOOKING);
  const [ctaLabel, setCtaLabel] = useState(DEFAULT_CTA);
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    setBookingUrl(localStorage.getItem(BOOKING_KEY) || DEFAULT_BOOKING);
    setCtaLabel(localStorage.getItem(CTA_KEY) || DEFAULT_CTA);
  }, []);

  function saveGeneral(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(BOOKING_KEY, bookingUrl);
    localStorage.setItem(CTA_KEY, ctaLabel);
    setSaved("general");
    setTimeout(() => setSaved(null), 1500);
  }

  function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirm) {
      setSaved("mismatch");
      return;
    }
    if (newPw.length < 4) {
      setSaved("short");
      return;
    }
    localStorage.setItem(PASSWORD_KEY, newPw);
    setNewPw("");
    setConfirm("");
    setSaved("password");
    setTimeout(() => setSaved(null), 1500);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">
      <form
        onSubmit={saveGeneral}
        className="bg-white p-8"
        style={{ borderTop: `3px solid ${TL}` }}
      >
        <div className="font-display text-lg" style={{ color: GD }}>
          General
        </div>
        <SettingField label="Booking URL">
          <input
            value={bookingUrl}
            onChange={(e) => setBookingUrl(e.target.value)}
            placeholder="https://calendly.com/your-link"
            className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
          />
        </SettingField>
        <SettingField label="CTA Button Label">
          <input
            value={ctaLabel}
            onChange={(e) => setCtaLabel(e.target.value)}
            placeholder="Schedule a Call"
            className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
          />
        </SettingField>
        <button
          className="font-ui mt-6 px-6 py-2.5 text-xs uppercase tracking-[0.2em]"
          style={{ background: GD, color: "#fff" }}
        >
          Save
        </button>
        {saved === "general" && (
          <span className="ml-3 text-xs text-emerald-700">Saved ✓</span>
        )}
      </form>

      <form
        onSubmit={savePassword}
        className="bg-white p-8"
        style={{ borderTop: `3px solid ${TL}` }}
      >
        <div className="font-display text-lg" style={{ color: GD }}>
          Change Password
        </div>
        <SettingField label="New password">
          <input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
          />
        </SettingField>
        <SettingField label="Confirm password">
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
          />
        </SettingField>
        <button
          className="font-ui mt-6 px-6 py-2.5 text-xs uppercase tracking-[0.2em]"
          style={{ background: GD, color: "#fff" }}
        >
          Update
        </button>
        {saved === "password" && (
          <span className="ml-3 text-xs text-emerald-700">Updated ✓</span>
        )}
        {saved === "mismatch" && (
          <span className="ml-3 text-xs text-red-600">Passwords don't match</span>
        )}
        {saved === "short" && (
          <span className="ml-3 text-xs text-red-600">Too short</span>
        )}
      </form>
    </div>
  );
}

function SettingField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block mt-5">
      <span className="font-ui text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function NewPortalModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");
  const [color1, setColor1] = useState("#032D23");
  const [color2, setColor2] = useState("#2DCCD3");
  const [industry, setIndustry] = useState<IndustryKey>("other");
  const [slug, setSlug] = useState("");
  const [hook, setHook] = useState("");
  const [status, setStatus] = useState<string>("idle");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const slugSuggestion = useMemo(
    () =>
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    [name]
  );

  async function detectFromUrl() {
    if (!url) return;
    setStatus("analyzing");
    try {
      const r = await fetch("/api/brand-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await r.json();
      setColor1(data.color1);
      setColor2(data.color2);
      setStatus("done");
    } catch {
      const fb = brandFromUrl(url);
      setColor1(fb.color1);
      setColor2(fb.color2);
      setStatus("error");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          url,
          slug: slug || slugSuggestion,
          color1,
          color2,
          industry,
          hook,
          status: "active",
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "failed");
      onCreated();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "failed");
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-6 overflow-auto"
      style={{ background: "rgba(3,45,35,0.7)" }}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl mt-12 mb-12"
        style={{ borderTop: `4px solid ${TL}` }}
      >
        <div
          className="px-8 py-5 flex items-center justify-between"
          style={{ background: GD, color: "#fff" }}
        >
          <div className="font-display text-lg tracking-[0.15em]">New Portal</div>
          <button type="button" onClick={onClose} className="text-xl leading-none">
            ×
          </button>
        </div>

        <div className="p-8 grid sm:grid-cols-2 gap-5">
          <Field label="Company name" required>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
            />
          </Field>
          <Field label="Contact email">
            <input
              type="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
            />
          </Field>
          <Field label="Brand URL" full>
            <div className="flex gap-2">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onBlur={detectFromUrl}
                placeholder="brand.com"
                className="flex-1 border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
              />
              <button
                type="button"
                onClick={detectFromUrl}
                disabled={!url}
                className="font-ui px-3 py-2 text-[10px] uppercase tracking-[0.18em] border-2 disabled:opacity-50"
                style={{ borderColor: GD, color: GD }}
              >
                Detect
              </button>
            </div>
            {status === "analyzing" && (
              <div className="mt-2 text-xs text-slate-500">Analyzing brand…</div>
            )}
            {status === "done" && (
              <div className="mt-2 text-xs text-emerald-700">
                ✓ Brand profile detected
              </div>
            )}
            {status === "error" && (
              <div className="mt-2 text-xs text-amber-700">
                Used hash-based fallback palette
              </div>
            )}
          </Field>

          <Field label="Color 1 (primary)">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="h-11 w-full border-2 border-slate-200"
            />
          </Field>
          <Field label="Color 2 (accent)">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="h-11 w-full border-2 border-slate-200"
            />
          </Field>

          <Field label="Industry">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as IndustryKey)}
              className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
            >
              {INDUSTRY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Slug">
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={slugSuggestion}
              className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
            />
          </Field>
          <Field label="Custom hook (overrides industry default)" full>
            <input
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="The box should feel inevitable."
              className="w-full border-2 border-slate-200 px-3 py-2.5 focus:outline-none focus:border-[#032D23]"
            />
          </Field>

          {err && (
            <div className="sm:col-span-2 text-sm text-red-600">{err}</div>
          )}

          <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="font-ui px-5 py-2.5 text-xs uppercase tracking-[0.18em] border-2"
              style={{ borderColor: "#94a3b8", color: "#475569" }}
            >
              Cancel
            </button>
            <button
              disabled={busy || !name}
              className="font-ui px-5 py-2.5 text-xs uppercase tracking-[0.18em] disabled:opacity-50"
              style={{ background: GD, color: "#fff" }}
            >
              {busy ? "Creating…" : "Create Portal"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-ui text-[10px] uppercase tracking-[0.18em] text-slate-500">
        {label}
        {required && <span style={{ color: TD }}> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
