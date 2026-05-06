// NUST design tokens — single source of truth
window.NUST = {
  // Brand colors (NUST official + cluster palette)
  blue:     '#00548E',  // primary
  navy:     '#01273E',
  gold:     '#FBAF17',
  gray:     '#8C8E90',
  maroon:   '#800000',
  // System
  ink:      '#0F1B2A',
  ink2:     '#3B4858',
  ink3:     '#6B7785',
  line:     '#E5E9EE',
  line2:    '#EEF1F5',
  paper:    '#FFFFFF',
  bg:       '#F6F8FB',
  bgWarm:   '#F2F5F9',
  ok:       '#1B7F50',
  okBg:     '#E6F4ED',
  warn:     '#B36B00',
  warnBg:   '#FFF3DE',
  bad:      '#A11D1D',
  badBg:    '#FCEAEA',
  // Type
  serif:    'Georgia, "Times New Roman", serif',
  sans:     '"Inter", "Helvetica Neue", Helvetica, system-ui, -apple-system, sans-serif',
  mono:     '"JetBrains Mono", ui-monospace, Menlo, monospace',
};

// Default tweaks state — edited by Tweaks panel
window.NUST_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#00548E",
  "darkMode": false
}/*EDITMODE-END*/;

// Live primary getter (overridden by tweaks panel)
window.getPrimary = () => (window.__nustPrimary || window.NUST.blue);
window.getDark = () => !!window.__nustDark;

// Sample request data — used across student + staff views
window.NUST_REQUESTS = [
  { id: 'S3C-2487', cat: 'Academic',        type: 'Document Request',     subject: 'Official transcript for Fall 2024',          school: 'SEECS', stage: 'In Progress', sla: 'amber', age: '1d 4h',  owner: 'R. Jamil',     priority: 'High'   },
  { id: 'S3C-2486', cat: 'Academic',        type: 'Appointment',          subject: 'Meet Dr. Tariq re: FYP scope',               school: 'SEECS', stage: 'Pending',     sla: 'green', age: '6h',     owner: 'Unassigned',   priority: 'Normal' },
  { id: 'S3C-2484', cat: 'Finance',         type: 'Document Request',     subject: 'Fee challan correction — semester 6',        school: 'NBS',   stage: 'Escalated',   sla: 'red',   age: '3d 2h',  owner: 'A. Nawaz',     priority: 'High'   },
  { id: 'S3C-2481', cat: 'Hostel',          type: 'Appointment',          subject: 'Room change request — Hostel 4',             school: 'SMME',  stage: 'In Progress', sla: 'green', age: '12h',    owner: 'Hostel Office', priority: 'Normal' },
  { id: 'S3C-2479', cat: 'Career',          type: 'Appointment',          subject: 'CV review — internship at Systems Ltd',      school: 'SEECS', stage: 'Resolved',    sla: 'green', age: '4d',     owner: 'CDC',          priority: 'Low'    },
  { id: 'S3C-2476', cat: 'Student Affairs', type: 'Document Request',     subject: 'Bonafide letter for visa application',       school: 'SCEE',  stage: 'In Progress', sla: 'amber', age: '1d 9h',  owner: 'M. Bilal',     priority: 'Normal' },
  { id: 'S3C-2472', cat: 'IT / LMS',        type: 'Document Request',     subject: 'LMS access reset — locked out of Qalam',     school: 'NBS',   stage: 'Resolved',    sla: 'green', age: '5d',     owner: 'IT Helpdesk',  priority: 'Normal' },
  { id: 'S3C-2469', cat: 'Library',         type: 'Document Request',     subject: 'Inter-library loan — Springer chapter',      school: 'SEECS', stage: 'Pending',     sla: 'green', age: '2h',     owner: 'Unassigned',   priority: 'Low'    },
  { id: 'S3C-2465', cat: 'Academic',        type: 'Document Request',     subject: 'Elective approval — CS-471 swap',            school: 'SEECS', stage: 'In Progress', sla: 'red',   age: '2d 18h', owner: 'R. Jamil',     priority: 'High'   },
  { id: 'S3C-2461', cat: 'Academic',        type: 'Appointment',          subject: 'Advisor meeting — academic probation',       school: 'SMME',  stage: 'In Progress', sla: 'amber', age: '1d',     owner: 'A. Nawaz',     priority: 'High'   },
];

window.NUST_NOTIFS = [
  { kind: 'qalam',  title: 'Mid-term grade posted',           body: 'CS-370 Database Systems — A-',            time: '12m', tag: 'Qalam' },
  { kind: 'ticket', title: 'Request S3C-2487 updated',        body: 'Routed to Registrar Office',              time: '1h',  tag: 'S³C'   },
  { kind: 'lms',    title: 'New announcement in EE-241',      body: 'Lab 5 deadline extended to Friday',       time: '3h',  tag: 'LMS'   },
  { kind: 'ticket', title: 'Appointment confirmed',           body: 'Dr. Tariq · Mon 11:00 · A-Block 304',     time: '1d',  tag: 'S³C'   },
  { kind: 'qalam',  title: 'Attendance below 75% — MATH-241', body: 'Reach out to your advisor',               time: '2d',  tag: 'Qalam' },
];
