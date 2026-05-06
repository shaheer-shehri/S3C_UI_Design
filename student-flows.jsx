// Student app — request flows + list/detail/notifs/profile

// ─────────────────────────────────────────────────────────────
// NEW REQUEST — type chooser
// ─────────────────────────────────────────────────────────────
function StuNewRequest({ go, back }) {
  const primary = window.getPrimary();
  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 84, overflow:'auto', background: NUST.bg }}>
      <StuHeader title="New request" subtitle="What can S³C help you with today?" onBack={back}/>
      <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 12 }}>
        <BigChoice
          ico={ICO.cal} title="Appointment" body="Meet a professor, advisor, hostel warden or office."
          onClick={() => go('appt')}/>
        <BigChoice
          ico={ICO.doc} title="Document" body="Transcripts, bonafide letters, fee challans, elective approval."
          onClick={() => go('doc')}/>
        <BigChoice
          ico={ICO.warn} title="Walk-in / Other" body="Already at the S³C desk? File the in-person ticket here."
          onClick={() => go('appt')} muted/>
      </div>

      <SectionTitle title="Browse by category"/>
      <div style={{ padding: '0 16px 16px', display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap: 10 }}>
        {REQ_CATS.map(c => (
          <Card key={c} pad={12} onClick={() => go('doc', { cat: c })}
            style={{ display:'flex', alignItems:'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background:'#E6EFF5', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Ico d={CAT_ICONS[c]} size={18} stroke={primary}/>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: NUST.ink, lineHeight: 1.2 }}>{c}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BigChoice({ ico, title, body, onClick, muted }) {
  const primary = window.getPrimary();
  return (
    <Card pad={14} onClick={onClick} style={{ display:'flex', gap: 14, alignItems:'center' }}>
      <div style={{ width: 44, height: 44, borderRadius: 11, background: muted ? NUST.warnBg : '#E6EFF5',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Ico d={ico} size={22} stroke={muted ? NUST.warn : primary} strokeWidth={1.8}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: NUST.serif, fontSize: 17, fontWeight: 700, color: NUST.ink }}>{title}</div>
        <div style={{ fontSize: 12, color: NUST.ink3, marginTop: 2, lineHeight: 1.4 }}>{body}</div>
      </div>
      <Ico d={ICO.chev} size={18} stroke={NUST.ink3}/>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// APPOINTMENT FLOW (single-screen wizard with steps)
// ─────────────────────────────────────────────────────────────
function StuAppt({ back, onSubmit }) {
  const primary = window.getPrimary();
  const [cat, setCat] = React.useState('Academic');
  const [who, setWho] = React.useState('Dr. Tariq Saeed');
  const [day, setDay] = React.useState('Mon 12');
  const [slot, setSlot] = React.useState('11:00');
  const [note, setNote] = React.useState('');
  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 110, overflow:'auto', background: NUST.bg }}>
      <StuHeader title="Book appointment" subtitle="Step 1 of 1 · all fields are validated before submit" onBack={back}
        right={<Chip tone="blue">Appointment</Chip>}/>
      <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 16 }}>

        <FormGroup label="Category">
          <ChipRow options={REQ_CATS} value={cat} onChange={setCat}/>
        </FormGroup>

        <FormGroup label="Person / office">
          <Card pad={12} style={{ display:'flex', alignItems:'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius:'50%', background: primary, color:'#fff',
                          display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontFamily: NUST.serif }}>TS</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: NUST.ink, fontSize: 14 }}>{who}</div>
              <div style={{ fontSize: 11, color: NUST.ink3 }}>HoD, Computing · A-Block 304 · SEECS</div>
            </div>
            <a style={{ fontSize: 12, color: primary, fontWeight: 600 }}>Change</a>
          </Card>
        </FormGroup>

        <FormGroup label="Pick a day">
          <ChipRow options={['Mon 12','Tue 13','Wed 14','Thu 15','Fri 16']} value={day} onChange={setDay}/>
        </FormGroup>

        <FormGroup label="Available slots" hint="Working hours · 09:00–16:00">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: 8 }}>
            {['09:30','10:00','11:00','11:30','13:30','14:00','15:00','15:30'].map(s => (
              <button key={s} onClick={() => setSlot(s)} style={{
                height: 38, borderRadius: 8, fontFamily: NUST.sans, fontSize: 13, fontWeight: 600, cursor:'pointer',
                border: `1px solid ${slot===s ? primary : NUST.line}`,
                background: slot===s ? primary : NUST.paper,
                color: slot===s ? '#fff' : NUST.ink,
              }}>{s}</button>
            ))}
          </div>
        </FormGroup>

        <FormGroup label="Reason (visible to staff)" hint={`${note.length}/280 characters`}>
          <textarea value={note} onChange={e => setNote(e.target.value.slice(0,280))} rows={3}
            placeholder="Share context so the office can prepare…"
            style={{ width:'100%', boxSizing:'border-box', resize:'none', padding: 12, borderRadius: 10,
                     border: `1px solid ${NUST.line}`, fontFamily: NUST.sans, fontSize: 14, color: NUST.ink, outline:'none', background: NUST.paper }}/>
        </FormGroup>

        <FormGroup label="Attachments (optional)">
          <button style={{ width:'100%', height: 56, borderRadius: 10, border: `1.5px dashed ${NUST.line}`, background: 'transparent',
                           display:'flex', alignItems:'center', justifyContent:'center', gap: 8,
                           color: NUST.ink2, fontFamily: NUST.sans, fontSize: 13, fontWeight: 600, cursor:'pointer' }}>
            <Ico d={ICO.attach} size={18} stroke={NUST.ink2}/> Add file or photo
          </button>
        </FormGroup>
      </div>

      {/* Sticky submit footer */}
      <div style={{ position:'absolute', left: 0, right: 0, bottom: 84, padding: '12px 16px',
                    background: NUST.paper, borderTop: `1px solid ${NUST.line}` }}>
        <Btn variant="primary" full size="lg" onClick={onSubmit}>
          Submit appointment request
        </Btn>
      </div>
    </div>
  );
}

function FormGroup({ label, hint, children }) {
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: NUST.ink2, letterSpacing: 0.8, textTransform:'uppercase', fontFamily: NUST.sans }}>{label}</div>
        {hint && <div style={{ fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function ChipRow({ options, value, onChange }) {
  const primary = window.getPrimary();
  return (
    <div style={{ display:'flex', gap: 6, overflowX:'auto', paddingBottom: 4, marginRight: -16 }}>
      {options.map(o => {
        const on = value === o;
        return (
          <button key={o} onClick={() => onChange(o)} style={{
            flex:'0 0 auto', height: 34, padding: '0 14px', borderRadius: 999,
            border: `1px solid ${on ? primary : NUST.line}`,
            background: on ? primary : NUST.paper,
            color: on ? '#fff' : NUST.ink, fontFamily: NUST.sans, fontSize: 13, fontWeight: 600, cursor:'pointer',
          }}>{o}</button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOCUMENT REQUEST FLOW
// ─────────────────────────────────────────────────────────────
function StuDoc({ back, onSubmit, presetCat }) {
  const primary = window.getPrimary();
  const [cat, setCat] = React.useState(presetCat || 'Academic');
  const [docType, setDocType] = React.useState('Official transcript');
  const [copies, setCopies] = React.useState(1);
  const [purpose, setPurpose] = React.useState('Higher studies application');
  const docTypes = {
    'Academic': ['Official transcript','Bonafide letter','Course registration','Elective approval','Degree certificate'],
    'Finance':  ['Fee challan correction','Refund request','Scholarship verification'],
    'Hostel':   ['Room allocation letter','No-objection certificate'],
    'Career':   ['Internship NOC','Recommendation letter'],
    'Student Affairs': ['Student status letter','Visa support letter'],
    'IT / LMS': ['LMS access reset','Email account issue'],
    'Library':  ['Library no-dues','Inter-library loan'],
  };
  const types = docTypes[cat] || ['General request'];
  React.useEffect(() => { setDocType(types[0]); }, [cat]);

  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 110, overflow:'auto', background: NUST.bg }}>
      <StuHeader title="Document request" subtitle="Submitted to the relevant directorate" onBack={back}
        right={<Chip tone="blue">Document</Chip>}/>
      <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 16 }}>

        <FormGroup label="Category">
          <ChipRow options={REQ_CATS} value={cat} onChange={setCat}/>
        </FormGroup>

        <FormGroup label="Document type">
          <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
            {types.map(t => {
              const on = t === docType;
              return (
                <button key={t} onClick={() => setDocType(t)} style={{
                  textAlign:'left', padding: '12px 14px', borderRadius: 10,
                  border: `1px solid ${on ? primary : NUST.line}`,
                  background: on ? '#E6EFF5' : NUST.paper, cursor:'pointer',
                  display:'flex', alignItems:'center', gap: 10, fontFamily: NUST.sans,
                }}>
                  <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${on ? primary : NUST.line}`,
                                background: on ? primary : 'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {on && <Ico d={ICO.check} size={10} stroke="#fff" strokeWidth={3}/>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: NUST.ink }}>{t}</div>
                </button>
              );
            })}
          </div>
        </FormGroup>

        <FormGroup label="Number of copies">
          <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
            <button onClick={() => setCopies(Math.max(1, copies-1))} style={stepBtn(NUST.line)}>−</button>
            <div style={{ fontFamily: NUST.serif, fontSize: 24, fontWeight: 700, color: NUST.ink, minWidth: 40, textAlign:'center' }}>{copies}</div>
            <button onClick={() => setCopies(copies+1)} style={stepBtn(NUST.line)}>+</button>
            <div style={{ marginLeft:'auto', fontSize: 12, color: NUST.ink3, fontFamily: NUST.mono }}>Rs. {copies * 250}.00</div>
          </div>
        </FormGroup>

        <FormGroup label="Purpose">
          <Field value={purpose} onChange={setPurpose}/>
        </FormGroup>

        <FormGroup label="Delivery">
          <ChipRow options={['Pickup at S³C desk','Courier (paid)','Email PDF (where applicable)']} value="Pickup at S³C desk" onChange={()=>{}}/>
        </FormGroup>

        <Card pad={12} style={{ background: NUST.warnBg, border: `1px solid ${NUST.warnBg}` }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap: 10 }}>
            <Ico d={ICO.warn} size={18} stroke={NUST.warn}/>
            <div style={{ fontSize: 12, color: NUST.warn, lineHeight: 1.5 }}>
              Document requests have a standard SLA of <b>48 hours</b>. You'll be notified at every status change.
            </div>
          </div>
        </Card>
      </div>
      <div style={{ position:'absolute', left: 0, right: 0, bottom: 84, padding: '12px 16px',
                    background: NUST.paper, borderTop: `1px solid ${NUST.line}` }}>
        <Btn variant="primary" full size="lg" onClick={onSubmit}>Submit · Rs. {copies*250}.00</Btn>
      </div>
    </div>
  );
}

function stepBtn(border) {
  return {
    width: 38, height: 38, borderRadius: 10, border: `1px solid ${border}`,
    background: NUST.paper, fontFamily: NUST.serif, fontSize: 20, color: NUST.ink, cursor:'pointer',
  };
}

// ─────────────────────────────────────────────────────────────
// SUBMIT CONFIRMATION
// ─────────────────────────────────────────────────────────────
function StuConfirm({ go }) {
  const primary = window.getPrimary();
  return (
    <div style={{ position:'absolute', inset:0, background: NUST.paper,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  padding: '60px 28px', fontFamily: NUST.sans, textAlign:'center' }}>
      <div style={{ width: 80, height: 80, borderRadius:'50%', background: NUST.okBg,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Ico d={ICO.check} size={36} stroke={NUST.ok} strokeWidth={2.4}/>
      </div>
      <h2 style={{ fontFamily: NUST.serif, fontSize: 26, fontWeight: 700, color: NUST.ink, marginTop: 22, marginBottom: 6 }}>
        Request submitted
      </h2>
      <div style={{ color: NUST.ink3, fontSize: 14, lineHeight: 1.5, maxWidth: 280 }}>
        Your ticket has been routed to the appropriate directorate. You'll get push updates at every stage.
      </div>
      <div style={{ marginTop: 24, padding: 14, border:`1px dashed ${NUST.line}`, borderRadius: 12, fontFamily: NUST.mono, fontSize: 13, color: NUST.ink }}>
        Ticket number<br/>
        <span style={{ fontFamily: NUST.serif, fontSize: 24, color: primary, fontWeight: 700 }}>S3C-2488</span>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap: 10, marginTop: 28, width:'100%' }}>
        <Btn variant="primary" full size="lg" onClick={() => go('detail', { id:'S3C-2488', cat:'Academic', type:'Document Request', subject:'Official transcript · 1 copy', school:'SEECS', stage:'Pending', sla:'green', age:'just now', priority:'Normal' })}>
          View ticket status
        </Btn>
        <Btn variant="ghost" full onClick={() => go('home')}>Back to home</Btn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MY REQUESTS
// ─────────────────────────────────────────────────────────────
function StuRequests({ go }) {
  const primary = window.getPrimary();
  const [tab, setTab] = React.useState('Open');
  const list = NUST_REQUESTS.filter(r => tab === 'Open' ? r.stage !== 'Resolved' : r.stage === 'Resolved');
  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 84, overflow:'auto', background: NUST.bg }}>
      <StuHeader title="My requests" subtitle={`${NUST_REQUESTS.length} total · ${NUST_REQUESTS.filter(r=>r.sla!=='green').length} need attention`}/>
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ display:'flex', background: NUST.line2, borderRadius: 10, padding: 4 }}>
          {['Open','Resolved'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '8px 0', border:'none', borderRadius: 8,
              background: tab===t ? NUST.paper : 'transparent',
              color: tab===t ? NUST.ink : NUST.ink2,
              fontFamily: NUST.sans, fontSize: 13, fontWeight: 600, cursor:'pointer',
              boxShadow: tab===t ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
            }}>{t} {tab===t && `· ${list.length}`}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 10 }}>
        {list.map(r => <RequestCard key={r.id} r={r} onClick={() => go('detail', r)}/>)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// REQUEST DETAIL — status timeline
// ─────────────────────────────────────────────────────────────
function StuDetail({ r, back }) {
  const primary = window.getPrimary();
  const timeline = [
    { stage: 'Submitted',     ts: '2d 18h', body: 'Auto-routed to Registrar Office (SEECS)', done: true },
    { stage: 'Under review',  ts: '2d 12h', body: 'Acknowledged by R. Jamil',                done: true },
    { stage: 'In Progress',   ts: '1d 4h',  body: 'Document being prepared by Records team', done: r.stage !== 'Pending' },
    { stage: 'Ready',         ts: '—',      body: 'Pickup at S³C desk · NUST main campus',   done: r.stage === 'Resolved' },
    { stage: 'Closed',        ts: '—',      body: '—',                                        done: r.stage === 'Resolved' },
  ];
  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 84, overflow:'auto', background: NUST.bg }}>
      <StuHeader title={r.subject} subtitle={`${r.id} · ${r.cat} · ${r.type}`} onBack={back}
        right={<Ico d={ICO.more} size={20} stroke={NUST.ink2}/>}/>
      <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 14 }}>
        <Card pad={14}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap: 8 }}>
            <StageChip stage={r.stage}/>
            <SLABadge sla={r.sla}/>
            <Chip tone="outline">Priority · {r.priority || 'Normal'}</Chip>
          </div>
          <div style={{ marginTop: 12, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10, fontSize: 12, color: NUST.ink2 }}>
            <KV k="Owner" v={r.owner || 'Registrar Office'}/>
            <KV k="School" v={r.school || 'SEECS'}/>
            <KV k="Submitted" v={`${r.age} ago`}/>
            <KV k="ETA" v="< 24h"/>
          </div>
        </Card>

        <SectionTitle title="Status timeline"/>
        <Card pad={16}>
          <div style={{ display:'flex', flexDirection:'column' }}>
            {timeline.map((t, i) => (
              <TimelineRow key={i} t={t} last={i===timeline.length-1}/>
            ))}
          </div>
        </Card>

        <SectionTitle title="Message thread"/>
        <Card pad={14}>
          <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
            <Bubble who="R. Jamil · Registrar" me={false}
              text="Salam Hamza, your transcript is being prepared. Please bring CNIC at pickup."/>
            <Bubble who="You" me={true}
              text="Thank you, will do."/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 8, marginTop: 14, padding: 8,
                        border: `1px solid ${NUST.line}`, borderRadius: 999 }}>
            <Ico d={ICO.attach} size={18} stroke={NUST.ink3}/>
            <input placeholder="Reply…" style={{ border:'none', outline:'none', flex: 1, fontFamily: NUST.sans, fontSize: 14 }}/>
            <button style={{ width:32, height:32, borderRadius:'50%', border:'none', background: primary, cursor:'pointer',
                             display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Ico d={ICO.send} size={16} stroke="#fff"/>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function KV({ k, v }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: NUST.ink3, textTransform:'uppercase', letterSpacing: 0.6, fontWeight: 700 }}>{k}</div>
      <div style={{ fontSize: 13, color: NUST.ink, fontWeight: 600, marginTop: 2 }}>{v}</div>
    </div>
  );
}

function TimelineRow({ t, last }) {
  const primary = window.getPrimary();
  const color = t.done ? primary : NUST.line;
  return (
    <div style={{ display:'flex', gap: 12, paddingBottom: last ? 0 : 16 }}>
      <div style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ width: 14, height: 14, borderRadius:'50%',
                      background: t.done ? primary : NUST.paper,
                      border: `2px solid ${t.done ? primary : NUST.line}` }}/>
        {!last && <div style={{ width: 2, flex: 1, background: color, marginTop: 2 }}/>}
      </div>
      <div style={{ flex: 1, paddingTop: -2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <div style={{ fontFamily: NUST.serif, fontSize: 14, fontWeight: 700, color: t.done ? NUST.ink : NUST.ink3 }}>{t.stage}</div>
          <div style={{ fontFamily: NUST.mono, fontSize: 11, color: NUST.ink3 }}>{t.ts}</div>
        </div>
        <div style={{ fontSize: 12, color: NUST.ink3, marginTop: 2, lineHeight: 1.4 }}>{t.body}</div>
      </div>
    </div>
  );
}

function Bubble({ who, text, me }) {
  const primary = window.getPrimary();
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems: me ? 'flex-end' : 'flex-start', gap: 4 }}>
      <div style={{ fontSize: 11, color: NUST.ink3, fontFamily: NUST.sans }}>{who}</div>
      <div style={{ maxWidth:'85%', padding:'10px 14px', borderRadius: 14,
                    background: me ? primary : NUST.line2,
                    color: me ? '#fff' : NUST.ink, fontSize: 13, lineHeight: 1.45 }}>
        {text}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────────────────────────
function StuNotifs() {
  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 84, overflow:'auto', background: NUST.bg }}>
      <StuHeader title="Notifications" subtitle="Across S³C, LMS, and Qalam"/>
      <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 8 }}>
        <Card pad={12}>
          {NUST_NOTIFS.map((n, i) => (
            <MiniRow key={i} tag={n.tag} title={n.title} body={n.body} time={n.time}
              tone={n.tag==='Qalam'?'gold':n.tag==='LMS'?'blue':'neutral'}/>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────
function StuProfile() {
  const primary = window.getPrimary();
  return (
    <div style={{ position:'absolute', inset:0, paddingBottom: 84, overflow:'auto', background: NUST.bg }}>
      <StuHeader title="Profile"/>
      <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 14 }}>
        <Card pad={16} style={{ display:'flex', alignItems:'center', gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius:'50%', background: primary, color:'#fff',
                        display:'flex', alignItems:'center', justifyContent:'center', fontFamily: NUST.serif, fontWeight: 700, fontSize: 22 }}>HR</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: NUST.serif, fontSize: 18, fontWeight: 700, color: NUST.ink }}>Hamza Rauf</div>
            <div style={{ fontSize: 12, color: NUST.ink3, lineHeight: 1.5 }}>cs-21-103 · BSCS, Semester 6<br/>School of Electrical Engineering &amp; Computer Science</div>
          </div>
          <Ico d={ICO.edit} size={18} stroke={NUST.ink3}/>
        </Card>

        <ProfileGroup title="Account">
          <ProfileRow ico={ICO.user}   label="Personal information"/>
          <ProfileRow ico={ICO.shield} label="Privacy &amp; data"/>
          <ProfileRow ico={ICO.bell}   label="Notifications" right="On"/>
        </ProfileGroup>

        <ProfileGroup title="Connected services">
          <ProfileRow ico={ICO.book}      label="LMS · Moodle"   right={<Chip tone="ok" size="sm">linked</Chip>}/>
          <ProfileRow ico={ICO.mortarboard} label="Qalam"        right={<Chip tone="ok" size="sm">linked</Chip>}/>
          <ProfileRow ico={ICO.it}        label="NUST email"     right={<Chip tone="ok" size="sm">linked</Chip>}/>
        </ProfileGroup>

        <ProfileGroup title="Support">
          <ProfileRow ico={ICO.flag}  label="Report an issue"/>
          <ProfileRow ico={ICO.doc}   label="Acceptable Use Policy"/>
          <ProfileRow ico={ICO.warn}  label="Sign out" danger/>
        </ProfileGroup>

        <div style={{ textAlign:'center', fontSize: 11, color: NUST.ink3, fontFamily: NUST.mono, marginTop: 8 }}>
          v 1.0.0 · build 2026.05 · NUST · S³C
        </div>
      </div>
    </div>
  );
}

function ProfileGroup({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: NUST.ink3, letterSpacing: 0.8, textTransform:'uppercase', padding: '4px 4px 8px', fontFamily: NUST.sans }}>{title}</div>
      <Card pad={0}>{children}</Card>
    </div>
  );
}

function ProfileRow({ ico, label, right, danger }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap: 12, padding: '14px 16px',
                  borderBottom: `1px solid ${NUST.line2}`, fontFamily: NUST.sans }}>
      <Ico d={ico} size={18} stroke={danger ? NUST.bad : NUST.ink2}/>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: danger ? NUST.bad : NUST.ink }} dangerouslySetInnerHTML={{ __html: label }}/>
      {right && (typeof right === 'string'
        ? <span style={{ fontSize: 12, color: NUST.ink3 }}>{right}</span>
        : right)}
      {!danger && <Ico d={ICO.chev} size={14} stroke={NUST.ink3}/>}
    </div>
  );
}

Object.assign(window, {
  StuNewRequest, StuAppt, StuDoc, StuConfirm,
  StuRequests, StuDetail, StuNotifs, StuProfile,
});
