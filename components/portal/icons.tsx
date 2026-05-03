type IconProps = { size?: number; className?: string };
const base = (p: IconProps) => ({
  width: p.size ?? 18,
  height: p.size ?? 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: p.className,
});

export const IconOverview = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

export const IconAbout = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

export const IconAcq = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 12h12l-3-3M15 12l-3 3" />
    <path d="M21 6v12" />
  </svg>
);

export const IconOnb = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 7l9-4 9 4-9 4-9-4z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 17l9 4 9-4" />
  </svg>
);

export const IconRet = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M21 12a9 9 0 1 1-3-6.7" />
    <path d="M21 4v5h-5" />
  </svg>
);

export const IconCalendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="16" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);
