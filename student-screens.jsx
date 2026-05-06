// Student app — full clickable flow on iOS frame.
// Uses IOSDevice as the shell; we OVERRIDE its content (no nav bar, no scroll wrap)
// because we want our own headers per screen + bottom tab bar.

const STU_TABS = [
  { id: 'home',     label: 'Home',     ico: ICO.home },
  { id: 'new',      label: 'New',      ico: ICO.plus },
  { id: 'requests', label: 'Requests', ico: ICO.flow },
  { id: 'notifs',   label: 'Alerts',   ico: ICO.bell },
  { id: 'profile',  label: 'Profile',  ico: ICO.user },
];

const REQ_CATS = ['Academic','Finance','Hostel','Career','Student Affairs','IT / LMS','Library'];

// ─────────────────────────────────────────────────────────────
// Bottom tab bar
// ─────────────────────────────────────────────────────────────
function StuTabBar({ active, onChange }) {
  const primary = window.getPrimary();
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40,
      background: NUST.paper, borderTop: `1px solid ${NUST.line}`,
      paddingBottom: 24, paddingTop: 6,
      fontFamily: NUST.sans,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        {STU_TABS.map(t => {
          const on = t.id === active;
          return (
            <button key={t.id} onClick={(e) => { e.stopPropagation(); onChange(t.id); }} style={{
              background: 'transparent', border: 'none', padding: '6px 8px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: on ? primary : NUST.ink3, cursor: 'pointer', minWidth: 56,
            }}>
              <Ico d={t.ico} size={22} stroke={on ? primary : NUST.ink3} strokeWidth={on ? 2 : 1.6}/>
              <span style={{ fontSize: 10.5, fontWeight: on ? 700 : 500, letterSpacing: 0.2 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Top header (used on most non-modal screens)
// ─────────────────────────────────────────────────────────────
function StuHeader({ title, subtitle, onBack, right, primary }) {
  primary = primary || window.getPrimary();
  return (
    <div style={{
      paddingTop: 56, paddingBottom: 14, padding: '56px 18px 14px',
      background: NUST.paper, borderBottom: `1px solid ${NUST.line2}`,
      fontFamily: NUST.sans,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: 32 }}>
        {onBack ? (
          <button onClick={onBack} style={{ background:'transparent', border:'none', padding:0, cursor:'pointer', color: primary, display:'flex', alignItems:'center', gap:4, fontFamily: NUST.sans, fontSize: 14, fontWeight: 600 }}>
            <Ico d={ICO.back} size={18} stroke={primary}/> Back
          </button>
        ) : <div/>}
        <div>{right}</div>
      </div>
      <h1 style={{
        margin: '8px 0 0', fontFamily: NUST.serif, fontSize: 26,
        fontWeight: 700, color: NUST.ink, lineHeight: 1.15, letterSpacing: -0.2,
      }}>{title}</h1>
      {subtitle && (
        <div style={{ fontSize: 13, color: NUST.ink3, marginTop: 4, fontFamily: NUST.sans }}>{subtitle}</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SPLASH
// ─────────────────────────────────────────────────────────────
function StuSplash({ onContinue }) {
  const primary = window.getPrimary();
  return (
    <div onClick={onContinue} style={{
      position:'absolute', inset:0, background: primary, color:'#fff',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between',
      padding: '120px 28px 60px', cursor:'pointer', fontFamily: NUST.sans,
    }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 26 }}>
        <div style={{ background:'#fff', borderRadius: '50%', padding: 14 }}>
          <NustSeal size={84}/>
        </div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontFamily: NUST.serif, fontSize: 44, fontWeight: 700, letterSpacing: 1 }}>
            <S3CMark color="#fff" size={44}/>
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6, letterSpacing: 1.5, textTransform:'uppercase' }}>
            Student Service Support Centre
          </div>
        </div>
      </div>
      <div style={{ textAlign:'center', fontSize: 12, opacity: 0.75, letterSpacing: 0.4 }}>
        National University of Sciences &amp; Technology · Pakistan
        <div style={{ marginTop: 12, fontFamily: NUST.mono, fontSize: 10, opacity: 0.6 }}>
          tap anywhere to continue
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────
function StuLogin({ onSignIn }) {
  const primary = window.getPrimary();
  const [id, setId] = React.useState('cs-21-103');
  return (
    <div style={{ position:'absolute', inset:0, background: NUST.paper, padding:'72px 24px 40px', fontFamily: NUST.sans, display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
        <NustSeal size={48}/>
        <div>
          <div style={{ fontFamily: NUST.serif, fontSize: 22, color: NUST.ink, fontWeight: 700 }}>
            <S3CMark size={22}/> <span style={{ fontSize: 16, color: NUST.ink2 }}>· Student</span>
          </div>
          <div style={{ fontSize: 11, color: NUST.ink3, letterSpacing: 0.8, textTransform:'uppercase' }}>Sign in with your NUST ID</div>
        </div>
      </div>
      <div style={{ marginTop: 36, display:'flex', flexDirection:'column', gap: 16 }}>
        <Field label="NUST ID" value={id} onChange={setId} placeholder="e.g. cs-21-103"/>
        <Field label="Password" value="••••••••••" type="password" right={<Ico d={ICO.eye} size={18} stroke={NUST.ink3}/>}/>
        <a style={{ alignSelf:'flex-end', fontSize: 12, color: primary, fontWeight: 600 }}>Forgot password?</a>
      </div>
      <div style={{ marginTop:'auto', display:'flex', flexDirection:'column', gap: 12 }}>
        <Btn variant="primary" full size="lg" onClick={onSignIn}>Sign in</Btn>
        <Btn variant="secondary" full size="md">Sign in with Qalam SSO</Btn>
        <div style={{ textAlign:'center', fontSize: 11, color: NUST.ink3, marginTop: 4 }}>
          By continuing you accept the NUST Acceptable Use Policy.
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type='text', right }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: NUST.ink2, letterSpacing: 0.8, textTransform:'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ display:'flex', alignItems:'center', border: `1px solid ${NUST.line}`, borderRadius: 10, padding: '0 14px', height: 48, background: NUST.paper }}>
        <input value={value} onChange={onChange ? e => onChange(e.target.value) : undefined} placeholder={placeholder} type={type}
          style={{ border:'none', outline:'none', flex: 1, fontFamily: NUST.sans, fontSize: 15, color: NUST.ink, background:'transparent' }}/>
        {right}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
function StuHome({ go }) {
  const primary = window.getPrimary();
  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 84, overflow:'auto', background: NUST.bg, fontFamily: NUST.sans }}>
      {/* Brand header band */}
      <div style={{ background: primary, color:'#fff', padding: '56px 20px 22px', position:'relative' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            <div style={{ background:'#fff', borderRadius:'50%', padding: 4 }}>
              <NustSeal size={28}/>
            </div>
            <S3CMark color="#fff" size={20}/>
          </div>
          <Ico d={ICO.bell} size={22} stroke="#fff"/>
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 12, opacity: 0.8, letterSpacing: 0.4 }}>Asalam-o-alaikum,</div>
          <div style={{ fontFamily: NUST.serif, fontSize: 24, fontWeight: 700, marginTop: 2 }}>Hamza Rauf</div>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>SEECS · BSCS · Semester 6 · cs-21-103</div>
        </div>
      </div>
      {/* Quick actions card overlapping band */}
      <div style={{ padding: '0 16px', marginTop: -24 }}>
        <Card pad={14} style={{ boxShadow:'0 6px 24px rgba(0,30,70,0.08)' }}>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <QuickAct label="New Request" ico={ICO.plus} onClick={() => go('new')}/>
            <QuickAct label="Appointment" ico={ICO.cal} onClick={() => go('appt')}/>
            <QuickAct label="Document"   ico={ICO.doc} onClick={() => go('doc')}/>
            <QuickAct label="My Tickets" ico={ICO.flow} onClick={() => go('requests')}/>
          </div>
        </Card>
      </div>

      {/* Open requests strip */}
      <SectionTitle title="Open requests" right={<a onClick={() => go('requests')} style={{ color: primary, fontSize: 12, fontWeight:600 }}>View all</a>}/>
      <div style={{ padding: '0 16px', display:'flex', flexDirection:'column', gap: 10 }}>
        {NUST_REQUESTS.filter(r => r.stage !== 'Resolved').slice(0,2).map(r => (
          <RequestCard key={r.id} r={r} onClick={() => go('detail', r)}/>
        ))}
      </div>

      {/* LMS / Qalam glances */}
      <SectionTitle title="LMS & Qalam" right={<span style={{ fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono }}>synced 2m ago</span>}/>
      <div style={{ padding: '0 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
        <GlanceCard tag="LMS" title="Today's classes" lines={['CS-370 · 09:30 · A-2','EE-241 Lab · 14:00 · L-3']}/>
        <GlanceCard tag="Qalam" title="Latest result" lines={['CS-370 Mid-term','Grade A-  ·  87/100']}/>
        <GlanceCard tag="LMS" title="Due this week" lines={['Lab 5 — Fri','Reading quiz — Sun']}/>
        <GlanceCard tag="Qalam" title="Attendance" lines={['Avg 84%','MATH-241 below 75%']} warn/>
      </div>

      {/* Announcements */}
      <SectionTitle title="From your school" right={<a style={{ color: primary, fontSize: 12, fontWeight:600 }}>SEECS</a>}/>
      <div style={{ padding: '0 16px 16px', background:'transparent' }}>
        <Card pad={0}>
          {NUST_NOTIFS.slice(0,3).map((n, i) => (
            <div key={i} style={{ padding: '0 14px' }}>
              <MiniRow tag={n.tag} title={n.title} body={n.body} time={n.time} tone={n.tag==='Qalam'?'gold':n.tag==='LMS'?'blue':'neutral'}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function QuickAct({ label, ico, onClick }) {
  const primary = window.getPrimary();
  return (
    <button onClick={onClick} style={{
      flex: 1, background:'transparent', border:'none', cursor:'pointer',
      display:'flex', flexDirection:'column', alignItems:'center', gap: 6,
      padding: '6px 4px', fontFamily: NUST.sans,
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: '#E6EFF5',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Ico d={ico} size={22} stroke={primary} strokeWidth={1.8}/>
      </div>
      <span style={{ fontSize: 11, color: NUST.ink, fontWeight: 600 }}>{label}</span>
    </button>
  );
}

function SectionTitle({ title, right }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding: '20px 18px 8px', fontFamily: NUST.sans,
    }}>
      <div style={{ fontFamily: NUST.serif, fontWeight: 700, fontSize: 16, color: NUST.ink }}>{title}</div>
      {right}
    </div>
  );
}

function GlanceCard({ tag, title, lines, warn }) {
  return (
    <Card pad={12} style={{ display:'flex', flexDirection:'column', gap: 6 }}>
      <Chip tone={tag==='Qalam' ? 'gold' : tag==='LMS' ? 'blue' : 'neutral'} size="sm">{tag}</Chip>
      <div style={{ fontWeight: 700, fontSize: 13, color: NUST.ink }}>{title}</div>
      <div style={{ fontSize: 11.5, color: warn ? NUST.bad : NUST.ink2, lineHeight: 1.45 }}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </Card>
  );
}

function RequestCard({ r, onClick }) {
  return (
    <Card pad={12} onClick={onClick} style={{ display:'flex', flexDirection:'column', gap: 8 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background:'#E6EFF5', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Ico d={CAT_ICONS[r.cat]} size={16} stroke={NUST.blue}/>
          </div>
          <div>
            <div style={{ fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono }}>{r.id} · {r.type}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: NUST.ink, lineHeight: 1.3 }}>{r.subject}</div>
          </div>
        </div>
        <Ico d={ICO.chev} size={16} stroke={NUST.ink3}/>
      </div>
      <div style={{ display:'flex', gap: 6, alignItems:'center', flexWrap:'wrap' }}>
        <StageChip stage={r.stage}/>
        <SLABadge sla={r.sla}/>
        <span style={{ fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono, marginLeft:'auto' }}>{r.age} ago</span>
      </div>
    </Card>
  );
}

Object.assign(window, { StuTabBar, StuHeader, StuSplash, StuLogin, StuHome, RequestCard, SectionTitle });
