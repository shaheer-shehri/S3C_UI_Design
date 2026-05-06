// Clickable iOS prototype — wires all student screens together with React state

function StudentIOS() {
  const [route, setRoute] = React.useState('splash'); // splash, login, home, new, appt, doc, confirm, requests, detail, notifs, profile
  const [tab, setTab] = React.useState('home');
  const [ctx, setCtx] = React.useState({});

  const go = (r, c) => {
    if (c) setCtx(prev => ({ ...prev, ...(typeof c === 'object' ? c : { current: c }) }));
    if (['home','requests','notifs','profile','new'].includes(r)) setTab(r === 'new' ? 'new' : r);
    setRoute(r);
  };

  // tab → route binding (when bottom bar tapped)
  const onTab = (t) => {
    setTab(t);
    if (t === 'home')     setRoute('home');
    if (t === 'new')      setRoute('new');
    if (t === 'requests') setRoute('requests');
    if (t === 'notifs')   setRoute('notifs');
    if (t === 'profile')  setRoute('profile');
  };

  let screen, showTabs = false;
  if (route === 'splash')   screen = <StuSplash onContinue={() => go('login')}/>;
  else if (route === 'login')    screen = <StuLogin onSignIn={() => go('home')}/>;
  else if (route === 'home')     { screen = <StuHome go={go}/>; showTabs = true; }
  else if (route === 'new')      { screen = <StuNewRequest go={go} back={() => go('home')}/>; showTabs = true; }
  else if (route === 'appt')     { screen = <StuAppt back={() => go('new')} onSubmit={() => go('confirm')}/>; }
  else if (route === 'doc')      { screen = <StuDoc back={() => go('new')} onSubmit={() => go('confirm')} presetCat={ctx.cat}/>; }
  else if (route === 'confirm')  { screen = <StuConfirm go={go}/>; }
  else if (route === 'requests') { screen = <StuRequests go={go}/>; showTabs = true; }
  else if (route === 'detail')   { screen = <StuDetail r={ctx.current || NUST_REQUESTS[0]} back={() => go('requests')}/>; }
  else if (route === 'notifs')   { screen = <StuNotifs/>; showTabs = true; }
  else if (route === 'profile')  { screen = <StuProfile/>; showTabs = true; }

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      {screen}
      {showTabs && <StuTabBar active={tab} onChange={onTab}/>}
    </div>
  );
}

// Wrap iOS frame — empties the default chrome (no nav title) so screens own their layout
function StudentIOSFrame() {
  return (
    <IOSDevice width={390} height={844}>
      <div style={{ position:'relative', width:'100%', height:'100%' }}>
        <StudentIOS/>
      </div>
    </IOSDevice>
  );
}

// Static Android twin — same Home for parity
function StudentAndroidFrame() {
  return (
    <AndroidDevice width={390} height={844}>
      <div style={{ position:'relative', width:'100%', height:'100%' }}>
        {/* Reuse same screens but inside Android shell. Use small screen-only state. */}
        <StudentAndroidInner/>
      </div>
    </AndroidDevice>
  );
}

function StudentAndroidInner() {
  const [route, setRoute] = React.useState('home');
  const [tab, setTab] = React.useState('home');
  const [ctx, setCtx] = React.useState({});
  const go = (r, c) => {
    if (c) setCtx(prev => ({ ...prev, ...(typeof c === 'object' ? c : { current: c }) }));
    if (['home','requests','notifs','profile','new'].includes(r)) setTab(r === 'new' ? 'new' : r);
    setRoute(r);
  };
  const onTab = (t) => {
    setTab(t);
    if (t === 'home')     setRoute('home');
    if (t === 'new')      setRoute('new');
    if (t === 'requests') setRoute('requests');
    if (t === 'notifs')   setRoute('notifs');
    if (t === 'profile')  setRoute('profile');
  };
  let screen, showTabs = false;
  if (route === 'home')     { screen = <StuHome go={go}/>; showTabs = true; }
  else if (route === 'new')      { screen = <StuNewRequest go={go} back={() => go('home')}/>; showTabs = true; }
  else if (route === 'appt')     screen = <StuAppt back={() => go('new')} onSubmit={() => go('confirm')}/>;
  else if (route === 'doc')      screen = <StuDoc back={() => go('new')} onSubmit={() => go('confirm')} presetCat={ctx.cat}/>;
  else if (route === 'confirm')  screen = <StuConfirm go={go}/>;
  else if (route === 'requests') { screen = <StuRequests go={go}/>; showTabs = true; }
  else if (route === 'detail')   screen = <StuDetail r={ctx.current || NUST_REQUESTS[0]} back={() => go('requests')}/>;
  else if (route === 'notifs')   { screen = <StuNotifs/>; showTabs = true; }
  else if (route === 'profile')  { screen = <StuProfile/>; showTabs = true; }
  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      {screen}
      {showTabs && <StuTabBar active={tab} onChange={onTab}/>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Clickable Staff portal
// ─────────────────────────────────────────────────────────────
function StaffPortal({ dark = false, startRoute = 'dashboard' }) {
  const [route, setRoute] = React.useState(startRoute);
  let body;
  if (route === 'dashboard') body = <StaffDashboard go={setRoute} dark={dark}/>;
  else if (route === 'queue') body = <StaffQueue go={setRoute} dark={dark}/>;
  else if (route === 'ticket') body = <StaffTicket back={() => setRoute('queue')} dark={dark}/>;
  else if (route === 'sla') body = <StaffSLA go={setRoute} dark={dark}/>;
  else if (route === 'reports') body = <StaffReports dark={dark}/>;
  else if (route === 'walkin') body = <StaffWalkin dark={dark}/>;
  else if (route === 'mgmt') body = <StaffMgmt dark={dark}/>;
  return <StaffShell active={route} onNav={setRoute} dark={dark}>{body}</StaffShell>;
}

Object.assign(window, { StudentIOS, StudentIOSFrame, StudentAndroidFrame, StaffPortal });
