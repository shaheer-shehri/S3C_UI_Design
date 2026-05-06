// Shared atoms used across all student + staff screens

// ── Brand mark ──────────────────────────────────────────────
function NustSeal({ size = 56 }) {
  return (
    <img
      src="assets/nust-logo.png"
      alt="NUST seal"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}

function S3CMark({ color, size = 28, weight = 700 }) {
  const c = color || NUST.blue;
  return (
    <span style={{
      fontFamily: NUST.serif, fontWeight: weight, fontSize: size,
      color: c, letterSpacing: 0.2, lineHeight: 1,
    }}>
      S<sup style={{ fontSize: size * 0.55, top: -size * 0.35, position: 'relative' }}>3</sup>C
    </span>
  );
}

// ── Generic UI atoms ────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', icon, onClick, style = {}, full = false, dark = false }) {
  const primary = window.getPrimary();
  const sizes = {
    sm: { h: 32, px: 12, fs: 13 },
    md: { h: 44, px: 18, fs: 15 },
    lg: { h: 52, px: 22, fs: 16 },
  }[size];
  const variants = {
    primary:   { bg: primary,        fg: '#fff',           bd: primary },
    secondary: { bg: 'transparent',  fg: primary,          bd: primary },
    ghost:     { bg: 'transparent',  fg: dark?'#fff':NUST.ink,  bd: 'transparent' },
    soft:      { bg: dark?'rgba(255,255,255,0.08)':NUST.line2, fg: dark?'#fff':NUST.ink, bd: 'transparent' },
    danger:    { bg: NUST.bad,       fg: '#fff',           bd: NUST.bad },
    gold:      { bg: NUST.gold,      fg: NUST.navy,        bd: NUST.gold },
  }[variant];
  return (
    <button onClick={onClick} style={{
      height: sizes.h, padding: `0 ${sizes.px}px`,
      background: variants.bg, color: variants.fg,
      border: `1px solid ${variants.bd}`, borderRadius: 10,
      fontFamily: NUST.sans, fontSize: sizes.fs, fontWeight: 600,
      letterSpacing: 0.1, cursor: 'pointer', display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center', gap: 8,
      width: full ? '100%' : undefined, transition: 'transform .08s ease',
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

function Chip({ children, tone = 'neutral', size = 'sm', style = {}, icon }) {
  const tones = {
    neutral: { bg: NUST.line2, fg: NUST.ink2,  bd: 'transparent' },
    blue:    { bg: '#E6EFF5', fg: NUST.blue,   bd: 'transparent' },
    gold:    { bg: '#FFF3D6', fg: '#7A5400',   bd: 'transparent' },
    ok:      { bg: NUST.okBg, fg: NUST.ok,     bd: 'transparent' },
    warn:    { bg: NUST.warnBg, fg: NUST.warn, bd: 'transparent' },
    bad:     { bg: NUST.badBg, fg: NUST.bad,   bd: 'transparent' },
    outline: { bg: 'transparent', fg: NUST.ink2, bd: NUST.line },
  }[tone];
  const sz = size === 'md' ? { h: 26, px: 10, fs: 12 } : { h: 22, px: 8, fs: 11 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: sz.h, padding: `0 ${sz.px}px`, borderRadius: 999,
      background: tones.bg, color: tones.fg, border: `1px solid ${tones.bd}`,
      fontFamily: NUST.sans, fontSize: sz.fs, fontWeight: 600,
      letterSpacing: 0.2, whiteSpace: 'nowrap', ...style,
    }}>
      {icon}
      {children}
    </span>
  );
}

// SLA: dot + countdown / ratio. Tone ok/warn/bad.
function SLABadge({ sla, age, deadline = '48h', mode = 'chip' }) {
  const tone = sla === 'red' ? 'bad' : sla === 'amber' ? 'warn' : 'ok';
  const label = sla === 'red' ? 'SLA breached' : sla === 'amber' ? 'Due soon' : 'On track';
  if (mode === 'dot') {
    return <span style={{
      display: 'inline-block', width: 8, height: 8, borderRadius: 999,
      background: tone === 'bad' ? NUST.bad : tone === 'warn' ? NUST.warn : NUST.ok,
    }} />;
  }
  return <Chip tone={tone}>● {label}</Chip>;
}

function StageChip({ stage }) {
  const map = {
    'Pending':     'neutral',
    'In Progress': 'blue',
    'Escalated':   'bad',
    'Resolved':    'ok',
  };
  return <Chip tone={map[stage] || 'neutral'}>{stage}</Chip>;
}

// ── Iconography (simple line icons, brand blue) ─────────────
const Ico = ({ d, size = 20, stroke, fill = 'none', strokeWidth = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
       stroke={stroke || 'currentColor'} strokeWidth={strokeWidth}
       strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {typeof d === 'string' ? <path d={d}/> : d}
  </svg>
);
const ICO = {
  home:    'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  doc:    'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h4',
  cal:    'M3 8h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zM8 3v4M16 3v4',
  bell:   'M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 004 0',
  user:   'M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  plus:   'M12 5v14M5 12h14',
  search: <g><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></g>,
  chev:   'M9 6l6 6-6 6',
  chevD:  'M6 9l6 6 6-6',
  back:   'M19 12H5M12 19l-7-7 7-7',
  check:  'M20 6L9 17l-5-5',
  flag:   'M4 21V4h12l-2 4 2 4H4',
  attach: 'M21 11l-9 9a5 5 0 11-7-7l9-9a3.5 3.5 0 015 5l-9 9a2 2 0 11-3-3l8-8',
  filter: 'M3 6h18M6 12h12M10 18h4',
  more:   <g><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></g>,
  send:   'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
  warn:   'M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0zM12 9v4M12 17h.01',
  briefcase: 'M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16M3 10h18v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z',
  bed:    'M2 20v-7h20v7M2 13V8a2 2 0 012-2h6v7M22 13V8a2 2 0 00-2-2h-2',
  money:  'M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6',
  book:   'M4 19.5V5a2 2 0 012-2h13v18H6a2 2 0 010-4h13',
  it:     'M2 20h20M6 16V8a2 2 0 012-2h8a2 2 0 012 2v8',
  mortarboard: 'M22 10L12 5 2 10l10 5 10-5zM6 12v5c3 2.5 9 2.5 12 0v-5',
  flow:   'M3 7h18M3 12h18M3 17h12',
  ticket: 'M3 9V6a2 2 0 012-2h14a2 2 0 012 2v3a2 2 0 000 4v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 000-4z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  graph:  'M3 3v18h18M7 14l4-4 4 4 5-6',
  clock:  <g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
  pin:    <g><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></g>,
  dl:    'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  arrow:  'M5 12h14M13 5l7 7-7 7',
  lock:   <g><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 118 0v4"/></g>,
  eye:    <g><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></g>,
  edit:   'M12 20h9M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4 12.5-12.5z',
  trash:  'M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6',
};

// ── Category icon mapping ───────────────────────────────────
const CAT_ICONS = {
  'Academic':         ICO.mortarboard,
  'Finance':          ICO.money,
  'Hostel':           ICO.bed,
  'Career':           ICO.briefcase,
  'Student Affairs':  ICO.shield,
  'IT / LMS':         ICO.it,
  'Library':          ICO.book,
};

// ── Card primitive ──────────────────────────────────────────
function Card({ children, style = {}, dark = false, pad = 16, onClick, hover = false }) {
  return (
    <div onClick={onClick} style={{
      background: dark ? '#15202C' : NUST.paper,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : NUST.line}`,
      borderRadius: 14, padding: pad, boxSizing: 'border-box',
      cursor: onClick ? 'pointer' : undefined,
      ...style,
    }}>{children}</div>
  );
}

// ── Striped placeholder (for imagery slots) ────────────────
function PlaceholderImg({ label = 'image', h = 120, w = '100%' }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 10,
      background: 'repeating-linear-gradient(135deg,#EEF1F5 0 8px,#E5E9EE 8px 16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: NUST.ink3, fontFamily: NUST.mono, fontSize: 11,
      letterSpacing: 0.5, textTransform: 'uppercase',
    }}>{label}</div>
  );
}

// ── Mini-row used on home/notifications ─────────────────────
function MiniRow({ tag, title, body, time, tone = 'blue' }) {
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '10px 0',
      borderBottom: `1px solid ${NUST.line2}`,
      fontFamily: NUST.sans,
    }}>
      <Chip tone={tone} size="sm">{tag}</Chip>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: NUST.ink, lineHeight: 1.35 }}>{title}</div>
        <div style={{ fontSize: 12, color: NUST.ink3, lineHeight: 1.4, marginTop: 2 }}>{body}</div>
      </div>
      <div style={{ fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono }}>{time}</div>
    </div>
  );
}

Object.assign(window, {
  NustSeal, S3CMark, Btn, Chip, SLABadge, StageChip,
  Ico, ICO, CAT_ICONS, Card, PlaceholderImg, MiniRow,
});
