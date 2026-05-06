// Staff portal — login, dashboard, queue, ticket detail, SLA monitor, reports, walk-in, management

const STAFF_NAV = [
  { id:'dashboard', label:'Dashboard', ico: ICO.graph },
  { id:'queue',     label:'Requests',  ico: ICO.flow,  badge: 14 },
  { id:'sla',       label:'SLA Monitor', ico: ICO.clock, badge: 4 },
  { id:'reports',   label:'Reports',   ico: ICO.graph },
  { id:'walkin',    label:'Walk-in',   ico: ICO.pin },
  { id:'mgmt',      label:'Management', ico: ICO.shield },
];

// ─────────────────────────────────────────────────────────────
// Sidebar shell
// ─────────────────────────────────────────────────────────────
function StaffShell({ active, onNav, children, dark }) {
  const primary = window.getPrimary();
  const bg = dark ? '#0B1620' : NUST.paper;
  const fg = dark ? '#fff' : NUST.ink;
  const ink2 = dark ? 'rgba(255,255,255,0.65)' : NUST.ink2;
  const ink3 = dark ? 'rgba(255,255,255,0.45)' : NUST.ink3;
  const line = dark ? 'rgba(255,255,255,0.08)' : NUST.line;
  return (
    <div style={{ display:'flex', height:'100%', background: dark ? '#070E15' : NUST.bgWarm, color: fg, fontFamily: NUST.sans }}>
      {/* Sidebar */}
      <aside style={{ width: 232, background: bg, borderRight: `1px solid ${line}`, display:'flex', flexDirection:'column', padding: '18px 12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10, padding: '4px 10px 18px' }}>
          <NustSeal size={28}/>
          <div>
            <S3CMark color={fg} size={18}/>
            <div style={{ fontSize: 10, color: ink3, letterSpacing: 0.7, textTransform:'uppercase' }}>Navigator portal</div>
          </div>
        </div>
        <div style={{ padding: '0 10px 12px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: ink3, letterSpacing: 0.8, textTransform:'uppercase', marginBottom: 6 }}>Workspace</div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 10px', border:`1px solid ${line}`, borderRadius: 8 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Pro-Rector (Academics)</div>
              <div style={{ fontSize: 10, color: ink3 }}>S³C HQ · Main Campus</div>
            </div>
            <Ico d={ICO.chevD} size={14} stroke={ink3}/>
          </div>
        </div>
        <nav style={{ display:'flex', flexDirection:'column', gap: 2, marginTop: 6 }}>
          {STAFF_NAV.map(n => {
            const on = n.id === active;
            return (
              <button key={n.id} onClick={() => onNav(n.id)} style={{
                display:'flex', alignItems:'center', gap: 12, padding: '10px 12px', borderRadius: 8,
                background: on ? (dark ? 'rgba(255,255,255,0.08)' : '#E6EFF5') : 'transparent',
                color: on ? primary : ink2, border:'none', cursor:'pointer', textAlign:'left',
                fontFamily: NUST.sans, fontSize: 13, fontWeight: on ? 700 : 500,
              }}>
                <Ico d={n.ico} size={18} stroke={on ? primary : ink2}/>
                <span style={{ flex: 1 }}>{n.label}</span>
                {n.badge && <Chip tone={n.id==='sla'?'bad':'blue'} size="sm">{n.badge}</Chip>}
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop:'auto', padding:'12px 10px 4px', display:'flex', alignItems:'center', gap: 10, borderTop: `1px solid ${line}` }}>
          <div style={{ width: 32, height: 32, borderRadius:'50%', background: primary, color:'#fff',
                        display:'flex', alignItems:'center', justifyContent:'center', fontFamily: NUST.serif, fontWeight: 700, fontSize: 13 }}>RJ</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>R. Jamil</div>
            <div style={{ fontSize: 10, color: ink3 }}>Navigator · L2</div>
          </div>
          <Ico d={ICO.more} size={16} stroke={ink3}/>
        </div>
      </aside>
      {/* Content */}
      <main style={{ flex: 1, overflow:'auto', display:'flex', flexDirection:'column' }}>
        <StaffTopBar dark={dark}/>
        {children}
      </main>
    </div>
  );
}

function StaffTopBar({ dark }) {
  const primary = window.getPrimary();
  const ink2 = dark ? 'rgba(255,255,255,0.7)' : NUST.ink2;
  const line = dark ? 'rgba(255,255,255,0.08)' : NUST.line;
  return (
    <div style={{
      height: 56, padding: '0 22px', display:'flex', alignItems:'center', gap: 12,
      borderBottom: `1px solid ${line}`, background: dark ? '#0B1620' : NUST.paper,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap: 8, flex: 1, maxWidth: 460,
                    border:`1px solid ${line}`, borderRadius: 8, padding:'0 12px', height: 36 }}>
        <Ico d={ICO.search} size={16} stroke={ink2}/>
        <input placeholder="Search by ticket #, student, school…"
          style={{ border:'none', outline:'none', flex: 1, fontFamily: NUST.sans, fontSize: 13, background:'transparent', color: dark?'#fff':NUST.ink }}/>
        <span style={{ fontSize: 10, color: ink2, fontFamily: NUST.mono, padding: '2px 6px', border: `1px solid ${line}`, borderRadius: 4 }}>⌘K</span>
      </div>
      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap: 10 }}>
        <Btn variant="soft" size="sm" dark={dark} icon={<Ico d={ICO.plus} size={14}/>}>Walk-in</Btn>
        <Btn variant="primary" size="sm">New report</Btn>
        <div style={{ width: 1, height: 20, background: line, margin: '0 4px' }}/>
        <Ico d={ICO.bell} size={18} stroke={ink2}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────
function StaffLogin({ onSignIn }) {
  const primary = window.getPrimary();
  return (
    <div style={{ display:'flex', height:'100%', fontFamily: NUST.sans }}>
      {/* Brand panel */}
      <div style={{ flex: 1, background: primary, color:'#fff', padding: '60px 56px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 14 }}>
          <div style={{ background:'#fff', borderRadius:'50%', padding: 8 }}>
            <NustSeal size={48}/>
          </div>
          <div>
            <S3CMark color="#fff" size={26}/>
            <div style={{ fontSize: 12, opacity: 0.8, letterSpacing: 1.2, textTransform:'uppercase' }}>Navigator portal</div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: NUST.serif, fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.4, maxWidth: 460 }}>
            One inbox for every student concern, across NUST.
          </div>
          <div style={{ marginTop: 18, fontSize: 14, opacity: 0.85, lineHeight: 1.6, maxWidth: 480 }}>
            Triage, route and resolve appointments and document requests from any school or directorate. SLAs are tracked automatically.
          </div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.65, fontFamily: NUST.mono, letterSpacing: 0.5 }}>
          Pro-Rector (Academics) · Student Service Support Centre · NUST Pakistan
        </div>
      </div>
      {/* Form panel */}
      <div style={{ width: 460, background: NUST.paper, padding: '60px 48px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div style={{ fontFamily: NUST.serif, fontSize: 24, fontWeight: 700, color: NUST.ink }}>Sign in</div>
        <div style={{ fontSize: 13, color: NUST.ink3, marginTop: 4 }}>Use your NUST staff credentials.</div>
        <div style={{ marginTop: 28, display:'flex', flexDirection:'column', gap: 14 }}>
          <Field label="NUST email" value="rjamil@nust.edu.pk"/>
          <Field label="Password" value="••••••••••" type="password" right={<Ico d={ICO.eye} size={18} stroke={NUST.ink3}/>}/>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize: 12, color: NUST.ink2 }}>
            <label style={{ display:'flex', alignItems:'center', gap: 6 }}><input type="checkbox" defaultChecked/> Remember this device</label>
            <a style={{ color: primary, fontWeight: 600 }}>Forgot password?</a>
          </div>
          <Btn variant="primary" full size="lg" onClick={onSignIn}>Sign in</Btn>
          <Btn variant="secondary" full>Sign in with Microsoft</Btn>
        </div>
        <div style={{ marginTop: 28, padding: 12, background: NUST.bg, borderRadius: 10, fontSize: 11, color: NUST.ink3, lineHeight: 1.5 }}>
          By signing in you accept the NUST staff acceptable use policy. All actions on this portal are logged for audit.
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────
function StaffDashboard({ go, dark }) {
  const primary = window.getPrimary();
  const fg = dark ? '#fff' : NUST.ink;
  const muted = dark ? 'rgba(255,255,255,0.6)' : NUST.ink3;
  return (
    <div style={{ padding: 28, display:'flex', flexDirection:'column', gap: 20 }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: muted, letterSpacing: 0.6, textTransform:'uppercase', fontWeight: 700 }}>Tuesday · 06 May 2026</div>
          <h1 style={{ fontFamily: NUST.serif, fontSize: 30, fontWeight: 700, color: fg, margin: '4px 0 0', letterSpacing: -0.3 }}>
            Good morning, R. Jamil.
          </h1>
          <div style={{ fontSize: 14, color: muted, marginTop: 4 }}>14 open tickets in your queue · 4 nearing SLA breach.</div>
        </div>
        <div style={{ display:'flex', gap: 10 }}>
          <Btn variant="soft" size="md" dark={dark} icon={<Ico d={ICO.dl} size={14}/>}>Export</Btn>
          <Btn variant="primary" size="md" icon={<Ico d={ICO.plus} size={14}/>}>Create ticket</Btn>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: 14 }}>
        <KPI label="Open tickets"       value="142"   delta="+8"   ok dark={dark}/>
        <KPI label="Due in 24h"         value="23"    delta="−4"   warn dark={dark}/>
        <KPI label="Breached SLA"       value="4"     delta="+2"   bad dark={dark}/>
        <KPI label="Avg. resolution"    value="1d 6h" delta="−2h"  ok dark={dark}/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 18 }}>
        {/* Inbox preview */}
        <Card dark={dark} pad={0}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom: `1px solid ${dark?'rgba(255,255,255,0.08)':NUST.line}` }}>
            <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 16 }}>My queue</div>
            <a onClick={() => go('queue')} style={{ fontSize: 12, fontWeight: 600, color: primary, cursor:'pointer' }}>Open full queue →</a>
          </div>
          <QueueTable rows={NUST_REQUESTS.slice(0,6)} compact onRow={() => go('ticket')} dark={dark}/>
        </Card>

        {/* Side stack */}
        <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
          <Card dark={dark}>
            <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 14, marginBottom: 12 }}>Tickets by category</div>
            <CategoryBars dark={dark}/>
          </Card>
          <Card dark={dark}>
            <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 14, marginBottom: 12 }}>Today's load</div>
            <Sparkline dark={dark}/>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize: 11, color: muted, marginTop: 6, fontFamily: NUST.mono }}>
              <span>09:00</span><span>13:00</span><span>17:00</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, delta, ok, warn, bad, dark }) {
  const fg = dark ? '#fff' : NUST.ink;
  const muted = dark ? 'rgba(255,255,255,0.55)' : NUST.ink3;
  const c = ok ? NUST.ok : warn ? NUST.warn : bad ? NUST.bad : NUST.ink3;
  return (
    <Card dark={dark} pad={16}>
      <div style={{ fontSize: 11, color: muted, letterSpacing: 0.7, textTransform:'uppercase', fontWeight: 700 }}>{label}</div>
      <div style={{ fontFamily: NUST.serif, fontSize: 32, fontWeight: 700, color: fg, marginTop: 6, letterSpacing: -0.4 }}>{value}</div>
      <div style={{ fontSize: 12, color: c, fontWeight: 600, marginTop: 4 }}>{delta} vs last week</div>
    </Card>
  );
}

function CategoryBars({ dark }) {
  const data = [
    { c:'Academic', n: 58 },
    { c:'Finance',  n: 24 },
    { c:'Hostel',   n: 19 },
    { c:'Career',   n: 14 },
    { c:'Stu. Aff.', n: 12 },
    { c:'IT / LMS', n: 10 },
    { c:'Library',  n:  5 },
  ];
  const max = Math.max(...data.map(d => d.n));
  const fg = dark ? '#fff' : NUST.ink;
  const primary = window.getPrimary();
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
      {data.map(d => (
        <div key={d.c} style={{ display:'flex', alignItems:'center', gap: 10, fontSize: 11, color: fg, fontFamily: NUST.sans }}>
          <div style={{ width: 70, color: dark?'rgba(255,255,255,0.7)':NUST.ink2 }}>{d.c}</div>
          <div style={{ flex: 1, height: 8, background: dark?'rgba(255,255,255,0.08)':NUST.line2, borderRadius: 999 }}>
            <div style={{ width: `${d.n/max*100}%`, height:'100%', borderRadius: 999, background: primary }}/>
          </div>
          <div style={{ width: 28, textAlign:'right', fontFamily: NUST.mono, fontWeight: 600 }}>{d.n}</div>
        </div>
      ))}
    </div>
  );
}

function Sparkline({ dark }) {
  const primary = window.getPrimary();
  const pts = [12, 18, 22, 19, 28, 35, 30, 22, 26, 32, 24, 18];
  const max = Math.max(...pts);
  const w = 280, h = 70;
  const path = pts.map((v, i) => `${i===0?'M':'L'} ${i*(w/(pts.length-1))} ${h - v/max*h}`).join(' ');
  const area = path + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
      <path d={area} fill={primary} opacity="0.1"/>
      <path d={path} fill="none" stroke={primary} strokeWidth="2"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// QUEUE TABLE — used in dashboard + queue + sla
// ─────────────────────────────────────────────────────────────
function QueueTable({ rows, compact, onRow, dark }) {
  const fg = dark ? '#fff' : NUST.ink;
  const muted = dark ? 'rgba(255,255,255,0.6)' : NUST.ink3;
  const line = dark ? 'rgba(255,255,255,0.08)' : NUST.line2;
  const cols = compact
    ? ['Ticket','Subject','Stage','SLA','Owner','Age']
    : ['Ticket','Subject','Category','School','Stage','SLA','Owner','Age',''];
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns: compact ? '110px 1fr 130px 130px 120px 70px' : '110px 2fr 110px 70px 130px 130px 120px 80px 28px',
                    padding: '10px 18px', fontSize: 10.5, color: muted, fontWeight: 700, letterSpacing: 0.6, textTransform:'uppercase', borderBottom: `1px solid ${line}` }}>
        {cols.map(c => <div key={c}>{c}</div>)}
      </div>
      {rows.map(r => (
        <div key={r.id} onClick={onRow} style={{
          display:'grid', gridTemplateColumns: compact ? '110px 1fr 130px 130px 120px 70px' : '110px 2fr 110px 70px 130px 130px 120px 80px 28px',
          padding: '12px 18px', borderBottom: `1px solid ${line}`, alignItems:'center',
          fontSize: 13, color: fg, fontFamily: NUST.sans, cursor: onRow ? 'pointer' : undefined,
        }}>
          <div style={{ fontFamily: NUST.mono, fontSize: 11.5, color: muted }}>{r.id}</div>
          <div style={{ paddingRight: 12 }}>
            <div style={{ fontWeight: 600, lineHeight: 1.3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.subject}</div>
            {compact && <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>{r.cat} · {r.school} · {r.type}</div>}
          </div>
          {!compact && <div style={{ fontSize: 12 }}>{r.cat}</div>}
          {!compact && <div style={{ fontSize: 12, color: muted }}>{r.school}</div>}
          <div><StageChip stage={r.stage}/></div>
          <div><SLABadge sla={r.sla}/></div>
          <div style={{ fontSize: 12 }}>{r.owner}</div>
          <div style={{ fontSize: 12, fontFamily: NUST.mono, color: muted }}>{r.age}</div>
          {!compact && <Ico d={ICO.chev} size={14} stroke={muted}/>}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// REQUEST QUEUE (filterable)
// ─────────────────────────────────────────────────────────────
function StaffQueue({ go, dark }) {
  const fg = dark ? '#fff' : NUST.ink;
  const [filter, setFilter] = React.useState('All');
  const filters = ['All','Pending','In Progress','Escalated','Resolved'];
  const rows = NUST_REQUESTS.filter(r => filter === 'All' || r.stage === filter);
  return (
    <div style={{ padding: 28, display:'flex', flexDirection:'column', gap: 16 }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <div>
          <h1 style={{ fontFamily: NUST.serif, fontSize: 26, fontWeight: 700, color: fg, margin: 0, letterSpacing: -0.2 }}>Request queue</h1>
          <div style={{ fontSize: 13, color: dark?'rgba(255,255,255,0.6)':NUST.ink3, marginTop: 4 }}>Filter, route, escalate, expedite — all in one place.</div>
        </div>
        <div style={{ display:'flex', gap: 8 }}>
          <Btn variant="soft" size="sm" dark={dark} icon={<Ico d={ICO.filter} size={14}/>}>Filters · 2</Btn>
          <Btn variant="soft" size="sm" dark={dark} icon={<Ico d={ICO.dl} size={14}/>}>Export CSV</Btn>
        </div>
      </div>
      {/* Filter pills */}
      <div style={{ display:'flex', gap: 6, alignItems:'center' }}>
        {filters.map(f => {
          const on = f === filter;
          return (
            <button key={f} onClick={() => setFilter(f)} style={{
              height: 32, padding: '0 12px', borderRadius: 999, fontFamily: NUST.sans, fontSize: 12, fontWeight: 600, cursor:'pointer',
              border: `1px solid ${on ? window.getPrimary() : (dark?'rgba(255,255,255,0.12)':NUST.line)}`,
              background: on ? window.getPrimary() : 'transparent',
              color: on ? '#fff' : (dark?'#fff':NUST.ink2),
            }}>{f}</button>
          );
        })}
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 11, color: dark?'rgba(255,255,255,0.55)':NUST.ink3, fontFamily: NUST.mono }}>{rows.length} of {NUST_REQUESTS.length}</span>
      </div>
      <Card dark={dark} pad={0}>
        <QueueTable rows={rows} onRow={() => go('ticket')} dark={dark}/>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TICKET DETAIL
// ─────────────────────────────────────────────────────────────
function StaffTicket({ back, dark }) {
  const primary = window.getPrimary();
  const fg = dark ? '#fff' : NUST.ink;
  const muted = dark ? 'rgba(255,255,255,0.6)' : NUST.ink3;
  return (
    <div style={{ padding: 28, display:'grid', gridTemplateColumns:'1fr 320px', gap: 18 }}>
      <div style={{ display:'flex', flexDirection:'column', gap: 16 }}>
        <div>
          <a onClick={back} style={{ fontSize: 12, color: primary, fontWeight: 600, cursor:'pointer' }}>← Back to queue</a>
          <div style={{ display:'flex', alignItems:'center', gap: 10, marginTop: 6 }}>
            <h1 style={{ fontFamily: NUST.serif, fontSize: 24, fontWeight: 700, color: fg, margin: 0 }}>Official transcript for Fall 2024</h1>
            <Chip tone="bad">SLA breached</Chip>
          </div>
          <div style={{ fontSize: 12, color: muted, fontFamily: NUST.mono, marginTop: 4 }}>S3C-2487 · Document Request · Academic · opened 1d 4h ago</div>
        </div>

        {/* Action bar */}
        <Card dark={dark} pad={14}>
          <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
            <Btn variant="primary" size="sm">Mark in progress</Btn>
            <Btn variant="secondary" size="sm" icon={<Ico d={ICO.flag} size={14}/>}>Expedite</Btn>
            <Btn variant="soft" size="sm" dark={dark} icon={<Ico d={ICO.arrow} size={14}/>}>Re-route</Btn>
            <Btn variant="danger" size="sm" icon={<Ico d={ICO.warn} size={14}/>}>Escalate</Btn>
            <div style={{ flex: 1 }}/>
            <Btn variant="ghost" size="sm" dark={dark} icon={<Ico d={ICO.check} size={14}/>}>Resolve &amp; close</Btn>
          </div>
        </Card>

        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 10 }}>Request summary</div>
          <div style={{ fontSize: 13, color: dark?'rgba(255,255,255,0.85)':NUST.ink2, lineHeight: 1.6 }}>
            Student requests 2 copies of the official Fall 2024 transcript for a higher-studies application. Pickup requested at the S³C desk; CNIC will be presented at collection. Requires Registrar Office sign-off.
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: 10, marginTop: 14 }}>
            <KV k="Copies" v="2"/>
            <KV k="Fee" v="Rs. 500.00"/>
            <KV k="Delivery" v="Pickup"/>
            <KV k="Channel" v="Mobile app"/>
          </div>
        </Card>

        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 12 }}>Activity</div>
          <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
            <ActivityRow ts="1d 4h" who="System" body="Auto-routed to Registrar Office (SEECS)"/>
            <ActivityRow ts="22h"   who="R. Jamil" body="Acknowledged · assigned to self"/>
            <ActivityRow ts="14h"   who="Records team" body="Document prepared, awaiting signature" pill={<Chip tone="warn" size="sm">awaiting</Chip>}/>
            <ActivityRow ts="2h"    who="System" body="SLA breached — escalation suggested" pill={<Chip tone="bad" size="sm">SLA</Chip>}/>
          </div>
          <div style={{ display:'flex', gap: 8, marginTop: 14, padding: 10, border:`1px solid ${dark?'rgba(255,255,255,0.1)':NUST.line}`, borderRadius: 10 }}>
            <input placeholder="Reply to student or leave an internal note…"
              style={{ border:'none', outline:'none', flex: 1, fontFamily: NUST.sans, fontSize: 13, background:'transparent', color: fg }}/>
            <Btn variant="soft" size="sm" dark={dark}>Internal</Btn>
            <Btn variant="primary" size="sm">Reply</Btn>
          </div>
        </Card>
      </div>

      {/* Right rail */}
      <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
        <Card dark={dark}>
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius:'50%', background: primary, color:'#fff',
                          display:'flex', alignItems:'center', justifyContent:'center', fontFamily: NUST.serif, fontWeight: 700 }}>HR</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: fg }}>Hamza Rauf</div>
              <div style={{ fontSize: 11, color: muted }}>cs-21-103 · BSCS · Sem 6</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginTop: 12, fontSize: 11, color: muted, fontFamily: NUST.sans }}>
            <KV k="School" v="SEECS"/>
            <KV k="Advisor" v="Dr. Tariq"/>
            <KV k="CGPA" v="3.62"/>
            <KV k="Standing" v="Good"/>
          </div>
          <Btn variant="soft" full size="sm" dark={dark} style={{ marginTop: 12 }}>View student profile</Btn>
        </Card>

        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 14, marginBottom: 8 }}>SLA</div>
          <div style={{ display:'flex', alignItems:'baseline', gap: 6 }}>
            <span style={{ fontFamily: NUST.serif, fontSize: 28, fontWeight: 700, color: NUST.bad }}>04:18</span>
            <span style={{ fontSize: 11, color: muted }}>over deadline</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: dark?'rgba(255,255,255,0.08)':NUST.line2, marginTop: 8, overflow:'hidden' }}>
            <div style={{ width:'100%', height:'100%', background: NUST.bad }}/>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop: 6, fontSize: 11, color: muted, fontFamily: NUST.mono }}>
            <span>opened 1d 4h ago</span><span>target 24h</span>
          </div>
        </Card>

        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 14, marginBottom: 8 }}>Routing</div>
          <RouteRow label="School" v="SEECS"/>
          <RouteRow label="Directorate" v="Registrar Office"/>
          <RouteRow label="Owner" v="R. Jamil (you)"/>
          <RouteRow label="Cc" v="Pro-Rector (Acad.)"/>
        </Card>

        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 14, marginBottom: 8 }}>Attachments</div>
          <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
            <FileRow name="cnic-front.pdf" size="240 KB"/>
            <FileRow name="form-A4.pdf" size="118 KB"/>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ActivityRow({ ts, who, body, pill }) {
  return (
    <div style={{ display:'flex', gap: 12, alignItems:'flex-start' }}>
      <div style={{ width: 70, fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono, paddingTop: 2 }}>{ts}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: NUST.ink, fontFamily: NUST.sans }}>{who}</div>
        <div style={{ fontSize: 12, color: NUST.ink3, lineHeight: 1.45 }}>{body}</div>
      </div>
      {pill}
    </div>
  );
}

function RouteRow({ label, v }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', padding: '8px 0', borderBottom: `1px solid ${NUST.line2}`, fontSize: 12 }}>
      <span style={{ color: NUST.ink3 }}>{label}</span>
      <span style={{ color: NUST.ink, fontWeight: 600 }}>{v}</span>
    </div>
  );
}

function FileRow({ name, size }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 10, padding: '8px 10px', border: `1px solid ${NUST.line2}`, borderRadius: 8 }}>
      <Ico d={ICO.doc} size={16} stroke={NUST.blue}/>
      <div style={{ flex: 1, fontSize: 12, color: NUST.ink, fontWeight: 600 }}>{name}</div>
      <div style={{ fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono }}>{size}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SLA MONITOR
// ─────────────────────────────────────────────────────────────
function StaffSLA({ go, dark }) {
  const fg = dark ? '#fff' : NUST.ink;
  const muted = dark ? 'rgba(255,255,255,0.6)' : NUST.ink3;
  const breached = NUST_REQUESTS.filter(r => r.sla === 'red');
  const warn = NUST_REQUESTS.filter(r => r.sla === 'amber');
  return (
    <div style={{ padding: 28, display:'flex', flexDirection:'column', gap: 18 }}>
      <div>
        <h1 style={{ fontFamily: NUST.serif, fontSize: 26, fontWeight: 700, color: fg, margin: 0 }}>SLA monitor</h1>
        <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>Live deadlines across all open tickets in your purview.</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 14 }}>
        <KPI label="Breached" value={String(breached.length)} delta="needs action now" bad dark={dark}/>
        <KPI label="Due in 24h" value={String(warn.length)}   delta="schedule today"   warn dark={dark}/>
        <KPI label="On track"  value={String(NUST_REQUESTS.length - breached.length - warn.length)} delta="all clear" ok dark={dark}/>
      </div>
      <Card dark={dark} pad={0}>
        <div style={{ padding:'12px 18px', borderBottom: `1px solid ${dark?'rgba(255,255,255,0.08)':NUST.line2}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15 }}>At-risk tickets</div>
          <span style={{ fontSize: 11, color: muted, fontFamily: NUST.mono }}>{breached.length + warn.length} of {NUST_REQUESTS.length}</span>
        </div>
        <QueueTable rows={[...breached, ...warn]} onRow={() => go('ticket')} dark={dark}/>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// REPORTS / PERFORMANCE DASHBOARD
// ─────────────────────────────────────────────────────────────
function StaffReports({ dark }) {
  const fg = dark ? '#fff' : NUST.ink;
  const muted = dark ? 'rgba(255,255,255,0.6)' : NUST.ink3;
  return (
    <div style={{ padding: 28, display:'flex', flexDirection:'column', gap: 18 }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
        <div>
          <h1 style={{ fontFamily: NUST.serif, fontSize: 26, fontWeight: 700, color: fg, margin: 0 }}>Performance</h1>
          <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>Last 30 days · all schools · all directorates.</div>
        </div>
        <div style={{ display:'flex', gap: 8 }}>
          <Btn variant="soft" size="sm" dark={dark}>Last 30 days ▾</Btn>
          <Btn variant="soft" size="sm" dark={dark}>All schools ▾</Btn>
          <Btn variant="primary" size="sm" icon={<Ico d={ICO.dl} size={14}/>}>Export</Btn>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: 14 }}>
        <KPI label="Resolved"      value="892"   delta="+14% vs prev." ok dark={dark}/>
        <KPI label="Pending"       value="142"   delta="+8 since Mon"  warn dark={dark}/>
        <KPI label="Escalated"     value="23"    delta="+3 vs prev."   bad dark={dark}/>
        <KPI label="CSAT"          value="4.6 / 5" delta="+0.2" ok dark={dark}/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap: 18 }}>
        <Card dark={dark}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 12 }}>
            <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15 }}>Volume by week</div>
            <div style={{ display:'flex', gap: 12, fontSize: 11, color: muted }}>
              <Legend color={window.getPrimary()} label="Submitted"/>
              <Legend color={NUST.gold} label="Resolved"/>
            </div>
          </div>
          <BarChart dark={dark}/>
        </Card>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 12 }}>Resolution time</div>
          <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
            <ResolutionRow label="Document" v="22h" pct={0.7}/>
            <ResolutionRow label="Appointment" v="9h" pct={0.3}/>
            <ResolutionRow label="Walk-in" v="2h" pct={0.07}/>
            <ResolutionRow label="Escalated" v="3d 12h" pct={1}/>
          </div>
        </Card>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 18 }}>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 12 }}>Top schools</div>
          <SchoolList dark={dark}/>
        </Card>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 12 }}>Navigator leaderboard</div>
          <LeaderRow rank="1" name="A. Nawaz" v="142 closed · 4.8 CSAT"/>
          <LeaderRow rank="2" name="R. Jamil" v="118 closed · 4.7 CSAT" me/>
          <LeaderRow rank="3" name="M. Bilal" v="97 closed · 4.5 CSAT"/>
          <LeaderRow rank="4" name="S. Khan"  v="84 closed · 4.6 CSAT"/>
        </Card>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 12 }}>Student satisfaction</div>
          <div style={{ display:'flex', alignItems:'baseline', gap: 8 }}>
            <span style={{ fontFamily: NUST.serif, fontSize: 40, fontWeight: 700, color: window.getPrimary() }}>4.6</span>
            <span style={{ fontSize: 13, color: muted }}>/ 5</span>
          </div>
          <div style={{ marginTop: 10, display:'flex', flexDirection:'column', gap: 6 }}>
            {[5,4,3,2,1].map(r => (
              <div key={r} style={{ display:'flex', alignItems:'center', gap: 8, fontSize: 11, color: muted, fontFamily: NUST.sans }}>
                <span style={{ width: 12 }}>{r}★</span>
                <div style={{ flex: 1, height: 6, background: dark?'rgba(255,255,255,0.08)':NUST.line2, borderRadius: 999 }}>
                  <div style={{ width: `${[68,21,7,3,1][5-r]}%`, height:'100%', background: window.getPrimary(), borderRadius: 999 }}/>
                </div>
                <span style={{ width: 28, textAlign:'right', fontFamily: NUST.mono }}>{[68,21,7,3,1][5-r]}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return <span style={{ display:'inline-flex', alignItems:'center', gap: 5 }}>
    <span style={{ width: 10, height: 10, borderRadius: 2, background: color }}/> {label}
  </span>;
}

function BarChart({ dark }) {
  const primary = window.getPrimary();
  const data = [
    [42,38],[55,48],[61,53],[58,62],[72,66],[68,71],[80,74],
  ];
  const max = Math.max(...data.flat());
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap: 10, height: 180, padding: '0 4px' }}>
      {data.map(([a,b], i) => (
        <div key={i} style={{ flex: 1, display:'flex', flexDirection:'column', alignItems:'center', gap: 6 }}>
          <div style={{ display:'flex', gap: 4, alignItems:'flex-end', height: 150, width:'100%' }}>
            <div style={{ flex: 1, background: primary, height: `${a/max*100}%`, borderRadius:'4px 4px 0 0' }}/>
            <div style={{ flex: 1, background: NUST.gold, height: `${b/max*100}%`, borderRadius:'4px 4px 0 0' }}/>
          </div>
          <div style={{ fontSize: 10, color: dark?'rgba(255,255,255,0.55)':NUST.ink3, fontFamily: NUST.mono }}>W{i+1}</div>
        </div>
      ))}
    </div>
  );
}

function ResolutionRow({ label, v, pct }) {
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize: 12, color: NUST.ink2, marginBottom: 4 }}>
        <span>{label}</span><span style={{ fontFamily: NUST.mono, color: NUST.ink, fontWeight: 600 }}>{v}</span>
      </div>
      <div style={{ height: 6, background: NUST.line2, borderRadius: 999 }}>
        <div style={{ width: `${pct*100}%`, height:'100%', background: window.getPrimary(), borderRadius: 999 }}/>
      </div>
    </div>
  );
}

function SchoolList({ dark }) {
  const items = [
    ['SEECS', 312, 'School of Electrical Eng. & CS'],
    ['NBS',   148, 'NUST Business School'],
    ['SMME',   97, 'School of Mechanical & Mfg.'],
    ['SCEE',   84, 'School of Civil & Env. Eng.'],
    ['S3H',    62, 'School of Social Sciences'],
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
      {items.map(([k, n, sub]) => (
        <div key={k} style={{ display:'flex', alignItems:'center', gap: 10, padding: '8px 0' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: window.getPrimary(), color:'#fff',
                        display:'flex', alignItems:'center', justifyContent:'center', fontFamily: NUST.serif, fontWeight: 700, fontSize: 12 }}>{k}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: dark?'#fff':NUST.ink }}>{k}</div>
            <div style={{ fontSize: 10.5, color: dark?'rgba(255,255,255,0.55)':NUST.ink3 }}>{sub}</div>
          </div>
          <div style={{ fontFamily: NUST.mono, fontSize: 12, color: dark?'#fff':NUST.ink, fontWeight: 600 }}>{n}</div>
        </div>
      ))}
    </div>
  );
}

function LeaderRow({ rank, name, v, me }) {
  const primary = window.getPrimary();
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${NUST.line2}` }}>
      <div style={{ width: 22, fontFamily: NUST.serif, fontWeight: 700, fontSize: 14, color: rank==='1' ? NUST.gold : NUST.ink2 }}>{rank}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: NUST.ink }}>{name} {me && <Chip tone="blue" size="sm" style={{ marginLeft: 4 }}>you</Chip>}</div>
        <div style={{ fontSize: 11, color: NUST.ink3 }}>{v}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WALK-IN ENTRY
// ─────────────────────────────────────────────────────────────
function StaffWalkin({ dark }) {
  const fg = dark ? '#fff' : NUST.ink;
  return (
    <div style={{ padding: 28, display:'grid', gridTemplateColumns:'minmax(0, 720px) 1fr', gap: 24, justifyContent:'center' }}>
      <div style={{ display:'flex', flexDirection:'column', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: NUST.serif, fontSize: 26, fontWeight: 700, color: fg, margin: 0 }}>Walk-in request</h1>
          <div style={{ fontSize: 13, color: NUST.ink3, marginTop: 4 }}>For students filing a request in person at the S³C desk.</div>
        </div>
        <Card dark={dark}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
            <Field label="Student NUST ID" value="cs-21-103"/>
            <Field label="Name (auto)" value="Hamza Rauf"/>
            <Field label="School (auto)" value="SEECS"/>
            <Field label="Phone" value="+92 333 1234567"/>
          </div>
          <div style={{ marginTop: 14 }}>
            <FormGroup label="Category">
              <ChipRow options={REQ_CATS} value="Academic" onChange={()=>{}}/>
            </FormGroup>
          </div>
          <div style={{ marginTop: 14, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
            <FormGroup label="Type">
              <Field value="Document Request"/>
            </FormGroup>
            <FormGroup label="Priority">
              <Field value="Normal"/>
            </FormGroup>
          </div>
          <div style={{ marginTop: 14 }}>
            <FormGroup label="Subject">
              <Field value="Course registration adjustment"/>
            </FormGroup>
          </div>
          <div style={{ marginTop: 14 }}>
            <FormGroup label="Notes (visible to all assignees)">
              <textarea rows={4} placeholder="Capture any details the student shared verbally…"
                style={{ width:'100%', boxSizing:'border-box', resize:'none', padding: 12, borderRadius: 10,
                         border: `1px solid ${NUST.line}`, fontFamily: NUST.sans, fontSize: 14, color: NUST.ink, outline:'none', background: NUST.paper }}/>
            </FormGroup>
          </div>
          <div style={{ marginTop: 14, display:'flex', justifyContent:'flex-end', gap: 8 }}>
            <Btn variant="soft" size="md" dark={dark}>Save draft</Btn>
            <Btn variant="primary" size="md">Create ticket</Btn>
          </div>
        </Card>
      </div>
      <div>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 8 }}>Tips</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: NUST.ink3, lineHeight: 1.7 }}>
            <li>Always confirm CNIC against the NUST ID before creating.</li>
            <li>Walk-ins are auto-flagged so management can track desk traffic.</li>
            <li>If the request belongs to another directorate, route after creating.</li>
          </ul>
        </Card>
        <div style={{ height: 14 }}/>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 8 }}>Today at the desk</div>
          <KV k="Walk-ins" v="11"/>
          <div style={{ height: 8 }}/>
          <KV k="Avg. handle time" v="6m 12s"/>
          <div style={{ height: 8 }}/>
          <KV k="Queue ahead" v="2 students"/>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MANAGEMENT VIEW (Pro-Rector)
// ─────────────────────────────────────────────────────────────
function StaffMgmt({ dark }) {
  const fg = dark ? '#fff' : NUST.ink;
  const muted = dark ? 'rgba(255,255,255,0.6)' : NUST.ink3;
  return (
    <div style={{ padding: 28, display:'flex', flexDirection:'column', gap: 18 }}>
      <div>
        <div style={{ fontSize: 11, color: muted, letterSpacing: 0.7, textTransform:'uppercase', fontWeight: 700 }}>Pro-Rector (Academics) view</div>
        <h1 style={{ fontFamily: NUST.serif, fontSize: 28, fontWeight: 700, color: fg, margin: '4px 0 0' }}>S³C across NUST</h1>
        <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>A read-only summary of all student concerns university-wide.</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap: 14 }}>
        <KPI label="Tickets MTD" value="1,287" delta="+9%"  ok dark={dark}/>
        <KPI label="Resolved"    value="892"   delta="+14%" ok dark={dark}/>
        <KPI label="Open"        value="395"   delta="+22"  warn dark={dark}/>
        <KPI label="Escalations" value="23"    delta="+3"   bad dark={dark}/>
        <KPI label="CSAT"        value="4.6"   delta="+0.2" ok dark={dark}/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 18 }}>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 12 }}>By school</div>
          <SchoolList dark={dark}/>
        </Card>
        <Card dark={dark}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15, marginBottom: 12 }}>Hot spots</div>
          <Hot label="Fee challan corrections" v="42 open · 8 breached" tone="bad"/>
          <Hot label="Elective approvals — SEECS" v="31 open · 4 breached" tone="warn"/>
          <Hot label="Hostel room changes" v="19 open · 0 breached" tone="ok"/>
          <Hot label="LMS access reset" v="14 open · 1 breached" tone="warn"/>
        </Card>
      </div>

      <Card dark={dark} pad={0}>
        <div style={{ padding:'12px 18px', borderBottom: `1px solid ${dark?'rgba(255,255,255,0.08)':NUST.line2}` }}>
          <div style={{ fontFamily: NUST.serif, fontWeight: 700, color: fg, fontSize: 15 }}>Recent escalations</div>
        </div>
        <QueueTable rows={NUST_REQUESTS.filter(r => r.stage==='Escalated' || r.sla==='red')} dark={dark}/>
      </Card>
    </div>
  );
}

function Hot({ label, v, tone }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${NUST.line2}` }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: tone==='bad'?NUST.bad:tone==='warn'?NUST.warn:NUST.ok }}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: NUST.ink }}>{label}</div>
        <div style={{ fontSize: 11, color: NUST.ink3 }}>{v}</div>
      </div>
      <Ico d={ICO.chev} size={14} stroke={NUST.ink3}/>
    </div>
  );
}

Object.assign(window, {
  StaffShell, StaffLogin, StaffDashboard, StaffQueue, StaffTicket,
  StaffSLA, StaffReports, StaffWalkin, StaffMgmt,
});
