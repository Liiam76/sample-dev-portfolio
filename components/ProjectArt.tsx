// Drawn SVG artwork for each project, so every variant ships imagery without
// stock photos. Colors come from the variant that renders it.

export type ArtPalette = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
};

type Props = {
  slug: string;
  palette: ArtPalette;
  title: string;
  className?: string;
};

export default function ProjectArt({ slug, palette, title, className }: Props) {
  return (
    <svg
      viewBox="0 0 400 260"
      role="img"
      aria-label={title}
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="260" fill={palette.bg} />
      {slug === "ledgerline" && <Ledger p={palette} />}
      {slug === "offgrid-sync" && <Sync p={palette} />}
      {slug === "shipnote" && <Changelog p={palette} />}
      {slug === "busstop" && <RouteMap p={palette} />}
    </svg>
  );
}

function Ledger({ p }: { p: ArtPalette }) {
  const rows = [
    ["Wallet 0142", "5,000.00", ""],
    ["Payouts pool", "", "5,000.00"],
    ["Fees", "35.00", ""],
    ["Wallet 0142", "", "35.00"],
  ];
  return (
    <g fontFamily="ui-monospace, monospace" fontSize="12">
      <text x="32" y="44" fill={p.muted}>ACCOUNT</text>
      <text x="228" y="44" fill={p.muted}>DEBIT</text>
      <text x="310" y="44" fill={p.muted}>CREDIT</text>
      <line x1="32" y1="56" x2="368" y2="56" stroke={p.muted} strokeOpacity="0.5" />
      {rows.map(([a, d, c], i) => (
        <g key={i}>
          <text x="32" y={86 + i * 30} fill={p.fg}>{a}</text>
          <text x="228" y={86 + i * 30} fill={p.fg}>{d}</text>
          <text x="310" y={86 + i * 30} fill={p.fg}>{c}</text>
        </g>
      ))}
      <line x1="32" y1="196" x2="368" y2="196" stroke={p.fg} strokeWidth="2" />
      <text x="32" y="224" fill={p.accent} fontWeight="700">BALANCED</text>
      <text x="228" y="224" fill={p.accent} fontWeight="700">5,035.00</text>
      <text x="310" y="224" fill={p.accent} fontWeight="700">5,035.00</text>
    </g>
  );
}

function Phone({ x, p, label }: { x: number; p: ArtPalette; label: string }) {
  return (
    <g>
      <rect x={x} y="36" width="96" height="188" rx="14" fill="none" stroke={p.fg} strokeWidth="2" />
      <rect x={x + 12} y="60" width="72" height="10" rx="3" fill={p.muted} fillOpacity="0.6" />
      <rect x={x + 12} y="80" width="52" height="10" rx="3" fill={p.muted} fillOpacity="0.4" />
      <rect x={x + 12} y="100" width="64" height="10" rx="3" fill={p.accent} />
      <rect x={x + 12} y="120" width="44" height="10" rx="3" fill={p.muted} fillOpacity="0.4" />
      <text x={x + 48} y="206" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill={p.muted}>{label}</text>
    </g>
  );
}

function Sync({ p }: { p: ArtPalette }) {
  return (
    <g>
      <Phone x={36} p={p} label="offline" />
      <Phone x={268} p={p} label="offline" />
      <path d="M140 105 C 180 105, 180 130, 200 130" fill="none" stroke={p.accent} strokeWidth="2" strokeDasharray="5 5" />
      <path d="M260 105 C 220 105, 220 130, 200 130" fill="none" stroke={p.accent} strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="200" cy="130" r="18" fill={p.accent} />
      <path d="M192 130 l6 6 l10 -12" fill="none" stroke={p.bg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="200" y="176" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill={p.fg}>merged, 0 lost</text>
    </g>
  );
}

function Changelog({ p }: { p: ArtPalette }) {
  const lines = [
    { t: "$ shipnote --since v2.3.0", c: p.fg },
    { t: "reading 41 commits across 9 pull requests", c: p.muted },
    { t: "", c: p.fg },
    { t: "## v2.4.0", c: p.accent },
    { t: "- Payouts retry safely on flaky networks", c: p.fg },
    { t: "- Faster balance checks on transfers", c: p.fg },
    { t: "- Fixed duplicate receipt emails", c: p.fg },
    { t: "wrote CHANGELOG.md in 4.2s", c: p.muted },
  ];
  return (
    <g fontFamily="ui-monospace, monospace" fontSize="12">
      <rect x="24" y="22" width="352" height="216" rx="10" fill="none" stroke={p.muted} strokeOpacity="0.6" />
      <circle cx="44" cy="40" r="4" fill={p.muted} />
      <circle cx="58" cy="40" r="4" fill={p.muted} />
      <circle cx="72" cy="40" r="4" fill={p.accent} />
      {lines.map((l, i) => (
        <text key={i} x="44" y={74 + i * 21} fill={l.c}>{l.t}</text>
      ))}
    </g>
  );
}

function RouteMap({ p }: { p: ArtPalette }) {
  const stops: Array<[number, number]> = [
    [50, 200], [110, 160], [170, 170], [230, 110], [300, 90], [350, 50],
  ];
  const d = stops.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  return (
    <g>
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 32} x2="400" y2={i * 32 + 18} stroke={p.muted} strokeOpacity="0.18" />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40 - 20} y2="260" stroke={p.muted} strokeOpacity="0.18" />
      ))}
      <path d={d} fill="none" stroke={p.accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {stops.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={p.bg} stroke={p.fg} strokeWidth="3" />
      ))}
      <rect x="196" y="140" width="148" height="44" rx="22" fill={p.fg} />
      <text x="270" y="167" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="13" fill={p.bg}>Obalende · 3 min</text>
    </g>
  );
}
