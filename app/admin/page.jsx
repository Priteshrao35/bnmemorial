'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  FiUsers, FiAward, FiBriefcase, FiBell, FiCalendar,
  FiCamera, FiClipboard, FiFileText, FiTrendingUp, FiTrendingDown,
  FiBook, FiGrid, FiStar, FiImage, FiMessageSquare,
  FiArrowRight, FiUserCheck, FiInfo, FiActivity, FiPercent,
  FiCheckCircle, FiClock, FiPlus, FiEye, FiAlertCircle,
} from 'react-icons/fi';
import { useSchool } from './_context/SchoolContext';

const API = process.env.NEXT_PUBLIC_API_URL;

function useCount(endpoint, schoolParam) {
  const [n, setN] = useState(null);
  useEffect(() => {
    const url = schoolParam ? `${API}${endpoint}?school=${schoolParam}` : `${API}${endpoint}`;
    fetch(url)
      .then(r => r.json())
      .then(d => setN(Array.isArray(d) ? d.length : (d?.items?.length ?? 0)))
      .catch(() => setN('—'));
  }, [endpoint, schoolParam]);
  return n;
}

/* ── Sparkline SVG ── */
function Sparkline({ data, color = '#3b82f6', height = 32 }) {
  const w = 80;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const area = `0,${height} ${pts} ${w},${height}`;
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${color.replace('#','')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Bar Chart ── */
function BarChart({ data, color = '#3b82f6', height = 140 }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => {
        const barH = Math.max(4, (d.v / max) * (height - 28));
        return (
          <div key={i} className="flex flex-col items-center flex-1 group relative">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
              {d.v}
            </div>
            <div
              className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80"
              style={{ height: barH, background: `linear-gradient(to top, ${color}cc, ${color})` }}
            />
            <span className="text-[9px] text-gray-400 mt-1 font-medium">{d.l}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Donut Chart ── */
function DonutChart({ segments, size = 120 }) {
  const r = 40, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.v, 0) || 1;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="18" />
      {segments.map((seg, i) => {
        const dash = (seg.v / total) * circ;
        const gap = circ - dash;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={seg.color} strokeWidth="18"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" className="text-xs font-black fill-gray-800" fontSize="14" fontWeight="800">{total}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="text-xs fill-gray-400" fontSize="9" fill="#9ca3af">Total</text>
    </svg>
  );
}

/* ── Line Chart ── */
function LineChart({ lines, labels, height = 100 }) {
  const w = 400;
  const allVals = lines.flatMap(l => l.data);
  const max = Math.max(...allVals);
  const min = Math.min(...allVals);
  const range = max - min || 1;
  const xStep = w / (labels.length - 1);

  const getPath = (data) =>
    data.map((v, i) => {
      const x = i * xStep;
      const y = height - ((v - min) / range) * (height - 16) - 8;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${w} ${height + 20}`} className="w-full" preserveAspectRatio="none" style={{ height: height + 20 }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1="0" y1={8 + t * (height - 16)} x2={w} y2={8 + t * (height - 16)}
            stroke="#f1f5f9" strokeWidth="1" />
        ))}
        {lines.map((line, li) => (
          <g key={li}>
            <path d={getPath(line.data)} fill="none" stroke={line.color} strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
            {line.data.map((v, i) => (
              <circle key={i} cx={i * xStep} cy={height - ((v - min) / range) * (height - 16) - 8}
                r="3" fill={line.color} stroke="white" strokeWidth="1.5" />
            ))}
          </g>
        ))}
        {/* X labels */}
        {labels.map((l, i) => (
          <text key={i} x={i * xStep} y={height + 16} textAnchor="middle" fontSize="9" fill="#9ca3af">{l}</text>
        ))}
      </svg>
    </div>
  );
}

/* ── Progress Bar ── */
function ProgressBar({ label, value, max, color = '#3b82f6', icon }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">{icon && <span>{icon}</span>}{label}</span>
        <span className="text-xs font-black" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

/* ─────────────── KAMALA DASHBOARD ─────────────── */
function KamalaDashboard() {
  const students      = useCount('/apis/students/');
  const staff         = useCount('/apis/staff/', 'kamala');
  const admissions    = useCount('/apis/admissions/');
  const notices       = useCount('/apis/notices/', 'kamala');
  const events        = useCount('/apis/events/', 'kamala');
  const gallery       = useCount('/apis/gallery/', 'kamala');
  const achievements  = useCount('/apis/achievements/');
  const facilities    = useCount('/apis/facilities/', 'kamala');
  const banners       = useCount('/apis/banners/', 'kamala');
  const toppers       = useCount('/apis/toppers/', 'kamala');
  const management    = useCount('/apis/ourmanagement/');
  const curriculum    = useCount('/apis/curriculum/', 'kamala');
  const testimonials  = useCount('/apis/testimonials/', 'kamala');
  const certificates  = useCount('/apis/certificates/');
  const careers       = useCount('/apis/careers/');

  const [notices_list, setNoticesList] = useState([]);
  const [events_list, setEventsList]   = useState([]);
  const [admissions_list, setAdmList]  = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/notices/?school=kamala`).then(r=>r.json()).then(d=>setNoticesList(Array.isArray(d)?d.slice(0,5):[])).catch(()=>{});
    fetch(`${API}/apis/events/?school=kamala`).then(r=>r.json()).then(d=>setEventsList(Array.isArray(d)?d.slice(0,4):[])).catch(()=>{});
    fetch(`${API}/apis/admissions/`).then(r=>r.json()).then(d=>setAdmList(Array.isArray(d)?d.slice(0,6):[])).catch(()=>{});
  }, []);

  const monthly = [
    {l:'Jan',v:12},{l:'Feb',v:18},{l:'Mar',v:31},{l:'Apr',v:28},{l:'May',v:15},
    {l:'Jun',v:9},{l:'Jul',v:22},{l:'Aug',v:45},{l:'Sep',v:38},{l:'Oct',v:20},
  ];
  const donutSegs = [
    {label:'Primary (I–V)',   v:340, color:'#3b82f6'},
    {label:'Middle (VI–VIII)',v:280, color:'#8b5cf6'},
    {label:'Secondary (IX–X)',v:220, color:'#10b981'},
    {label:'Senior (XI–XII)', v:160, color:'#f59e0b'},
  ];
  const attendanceLines = [
    { color:'#3b82f6', data:[88,91,87,93,90,94,89,92,95,91] },
    { color:'#10b981', data:[82,85,80,88,84,89,83,87,90,86] },
  ];
  const sparkData = [4,7,5,9,6,11,8,12,10,14];

  const KPI = [
    { label:'Students',    value: students,    icon:'👤', color:'#3b82f6', light:'#eff6ff', sub:'+12 this month',  href:'/admin/students',   spark:sparkData },
    { label:'Staff',       value: staff,       icon:'👩‍🏫', color:'#8b5cf6', light:'#f5f3ff', sub:'Active teachers', href:'/admin/staff',      spark:[8,9,8,10,9,11,10,12,11,13] },
    { label:'Admissions',  value: admissions,  icon:'📋', color:'#10b981', light:'#ecfdf5', sub:'Applications',    href:'/admin/admissions',  spark:[2,5,4,8,6,9,7,12,10,14] },
    { label:'Notices',     value: notices,     icon:'🔔', color:'#f59e0b', light:'#fffbeb', sub:'Active alerts',   href:'/admin/notices',     spark:[3,2,4,3,5,4,6,5,7,6] },
    { label:'Events',      value: events,      icon:'📅', color:'#ef4444', light:'#fef2f2', sub:'Scheduled',      href:'/admin/events',      spark:[1,2,1,3,2,4,3,5,4,6] },
    { label:'Facilities',  value: facilities,  icon:'🏫', color:'#0891b2', light:'#ecfeff', sub:'On campus',      href:'/admin/facilities',  spark:[10,10,11,11,12,12,12,13,13,14] },
  ];

  const goals = [
    {label:'Admission Target (500)',  value: Math.min(parseInt(admissions)||8, 500), max:500, color:'#3b82f6', icon:'📋'},
    {label:'Staff Strength (80)',     value: Math.min(parseInt(staff)||16, 80),      max:80,  color:'#8b5cf6', icon:'👩‍🏫'},
    {label:'Gallery Photos (200)',    value: Math.min(parseInt(gallery)||38, 200),   max:200, color:'#10b981', icon:'📸'},
    {label:'Achievements (50)',       value: Math.min(parseInt(achievements)||8, 50), max:50, color:'#f59e0b', icon:'🏆'},
  ];

  const quickActions = [
    {label:'Add Notice',    icon:'🔔', href:'/admin/notices',    color:'bg-blue-500'},
    {label:'Add Staff',     icon:'👤', href:'/admin/staff',      color:'bg-purple-500'},
    {label:'Add Event',     icon:'📅', href:'/admin/events',     color:'bg-green-500'},
    {label:'Add Photo',     icon:'📸', href:'/admin/gallery',    color:'bg-pink-500'},
    {label:'Admissions',    icon:'📋', href:'/admin/admissions', color:'bg-amber-500'},
    {label:'Achievements',  icon:'🏆', href:'/admin/achievements',color:'bg-rose-500'},
    {label:'Certificates',  icon:'📄', href:'/admin/certificates',color:'bg-cyan-500'},
    {label:'Settings',      icon:'⚙️', href:'/admin/settings',   color:'bg-gray-500'},
  ];

  const statusColor = {Pending:'bg-amber-100 text-amber-700', Approved:'bg-green-100 text-green-700', Rejected:'bg-red-100 text-red-700'};

  return (
    <div className="px-4 py-4 sm:px-6 space-y-6 pb-12">

      {/* ── Header Banner ── */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #0891b2 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage:'radial-gradient(#fff 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">KAMALA DEVI RAJJU PRASAD INTER COLLEGE</p>
          <h1 className="text-white text-2xl font-black">School Dashboard</h1>
          <p className="text-blue-300 text-sm mt-0.5">{new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
        </div>
        <div className="relative flex gap-3">
          <a href="/kamaladevirajjuprasad" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition">
            <FiEye size={14}/> View Site ↗
          </a>
          <Link href="/admin/admissions"
            className="flex items-center gap-2 bg-white text-blue-800 text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition">
            <FiPlus size={14}/> New Admission
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {KPI.map(kpi => (
          <Link key={kpi.label} href={kpi.href} className="block group">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: kpi.light }}>
                  {kpi.icon}
                </div>
                <FiTrendingUp size={12} className="text-green-500" />
              </div>
              <p className="text-2xl font-black mb-0.5" style={{ color: kpi.color }}>
                {kpi.value === null ? <span className="inline-block w-8 h-6 bg-gray-100 animate-pulse rounded" /> : kpi.value}
              </p>
              <p className="text-xs font-bold text-gray-600">{kpi.label}</p>
              <p className="text-[10px] text-gray-400 mb-2">{kpi.sub}</p>
              <Sparkline data={kpi.spark} color={kpi.color} />
            </div>
          </Link>
        ))}
      </div>

      {/* ── Row 2: Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Monthly Admissions Bar */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-black text-gray-800">Monthly Admissions</h3>
              <p className="text-xs text-gray-400 mt-0.5">Applications received per month — 2025–26</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
              <FiActivity size={11}/> This Year
            </div>
          </div>
          <BarChart data={monthly} color="#3b82f6" height={150} />
          <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-3 gap-4">
            {[{l:'Total Applications',v:'238',c:'#3b82f6'},{l:'Approved',v:'185',c:'#10b981'},{l:'Pending',v:'53',c:'#f59e0b'}].map(s=>(
              <div key={s.l} className="text-center">
                <p className="text-xl font-black" style={{color:s.c}}>{s.v}</p>
                <p className="text-[10px] text-gray-400 font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Donut: Student Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-black text-gray-800 mb-1">Student Distribution</h3>
          <p className="text-xs text-gray-400 mb-4">By class group</p>
          <div className="flex flex-col items-center gap-4">
            <DonutChart segments={donutSegs} size={130} />
            <div className="w-full space-y-2">
              {donutSegs.map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:s.color}} />
                    <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
                  <span className="text-xs font-black" style={{color:s.color}}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Attendance + Admissions Table ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Attendance Line Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-black text-gray-800">Attendance Trend</h3>
              <p className="text-xs text-gray-400">Last 10 weeks (%)</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-full bg-blue-500 inline-block"/>Boys</span>
              <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-full bg-emerald-500 inline-block"/>Girls</span>
            </div>
          </div>
          <LineChart lines={attendanceLines} labels={['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10']} height={100} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-blue-700">91%</p>
              <p className="text-[10px] text-blue-500 font-medium">Boys Avg.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-xl font-black text-emerald-700">86%</p>
              <p className="text-[10px] text-emerald-500 font-medium">Girls Avg.</p>
            </div>
          </div>
        </div>

        {/* Recent Admissions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-800">Recent Admissions</h3>
            <Link href="/admin/admissions" className="text-xs font-bold text-blue-600 hover:text-blue-800">View all →</Link>
          </div>
          {admissions_list.length === 0
            ? <div className="text-center py-8 text-gray-400 text-sm">No admissions yet</div>
            : (
              <div className="space-y-2">
                {admissions_list.map((a, i) => (
                  <div key={a.id || i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                      style={{background:`hsl(${i*47+210},65%,52%)`}}>
                      {(a.student_name||'A')[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{a.student_name || '—'}</p>
                      <p className="text-[10px] text-gray-400">Class {a.class_applying || '—'}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[a.status] || 'bg-gray-100 text-gray-500'}`}>
                      {a.status || 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>

      {/* ── Row 4: Goals + Notices + Events ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Annual Goals */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-black text-gray-800 mb-1">Annual Goals</h3>
          <p className="text-xs text-gray-400 mb-4">Progress vs targets 2025–26</p>
          <div className="space-y-4">
            {goals.map(g => <ProgressBar key={g.label} {...g} />)}
          </div>
        </div>

        {/* Notice Board */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-800">Notice Board</h3>
            <Link href="/admin/notices" className="text-xs font-bold text-blue-600">Manage →</Link>
          </div>
          {notices_list.length === 0
            ? <p className="text-sm text-gray-400 text-center py-6">No notices</p>
            : (
              <div className="space-y-3">
                {notices_list.map((n, i) => (
                  <div key={n.id||i} className="flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-800 line-clamp-1">{n.title}</p>
                      <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{n.description || ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-800">Upcoming Events</h3>
            <Link href="/admin/events" className="text-xs font-bold text-blue-600">View all →</Link>
          </div>
          {events_list.length === 0
            ? <p className="text-sm text-gray-400 text-center py-6">No events</p>
            : (
              <div className="space-y-3">
                {events_list.map((ev, i) => {
                  const d = ev.event_date ? new Date(ev.event_date) : null;
                  const colors = ['#3b82f6','#8b5cf6','#10b981','#f59e0b'];
                  return (
                    <div key={ev.id||i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white"
                        style={{background:colors[i%4]}}>
                        {d ? <>
                          <span className="text-[9px] font-black uppercase leading-none">{d.toLocaleDateString('en',{month:'short'})}</span>
                          <span className="text-sm font-black leading-tight">{d.getDate()}</span>
                        </> : <span className="text-xs font-black">—</span>}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-800 line-clamp-1">{ev.title}</p>
                        <p className="text-[10px] text-gray-400 capitalize">{ev.event_type||'general'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {quickActions.map(a => (
            <Link key={a.label} href={a.href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition group text-center">
              <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm`}>
                {a.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-600 leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── All Modules Grid ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-gray-800 mb-4">All Modules</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            {l:'Banners',      c:banners,      icon:'🖼️', color:'bg-blue-500',   href:'/admin/banners'},
            {l:'Staff',        c:staff,        icon:'👩‍🏫', color:'bg-purple-500', href:'/admin/staff'},
            {l:'Toppers',      c:toppers,      icon:'🥇', color:'bg-amber-500',  href:'/admin/toppers'},
            {l:'Management',   c:management,   icon:'👔', color:'bg-indigo-500', href:'/admin/management'},
            {l:'Events',       c:events,       icon:'📅', color:'bg-green-500',  href:'/admin/events'},
            {l:'Achievements', c:achievements, icon:'🏆', color:'bg-rose-500',   href:'/admin/achievements'},
            {l:'Curriculum',   c:curriculum,   icon:'📚', color:'bg-teal-500',   href:'/admin/curriculum'},
            {l:'Facilities',   c:facilities,   icon:'🏫', color:'bg-orange-500', href:'/admin/facilities'},
            {l:'Gallery',      c:gallery,      icon:'📸', color:'bg-pink-500',   href:'/admin/gallery'},
            {l:'Testimonials', c:testimonials, icon:'💬', color:'bg-cyan-500',   href:'/admin/testimonials'},
            {l:'Certificates', c:certificates, icon:'📄', color:'bg-violet-500', href:'/admin/certificates'},
            {l:'Careers',      c:careers,      icon:'💼', color:'bg-gray-500',   href:'/admin/careers'},
          ].map(m => (
            <Link key={m.l} href={m.href}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition group">
              <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform`}>
                {m.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-700">{m.l}</p>
                <p className="text-xs text-gray-400">{m.c === null ? '…' : `${m.c} records`}</p>
              </div>
              <FiArrowRight size={12} className="text-gray-300 group-hover:text-blue-400 ml-auto flex-shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── BN DASHBOARD ─────────────── */
function BnDashboard() {
  const staff        = useCount('/apis/staff/', 'bnmemorial');
  const notices      = useCount('/apis/notices/', 'bnmemorial');
  const gallery      = useCount('/apis/gallery/', 'bnmemorial');
  const testimonials = useCount('/apis/testimonials/', 'bnmemorial');
  const events       = useCount('/apis/events/', 'bnmemorial');
  const facilities   = useCount('/apis/facilities/', 'bnmemorial');

  const [notices_list, setNoticesList] = useState([]);
  const [events_list,  setEventsList]  = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/notices/?school=bnmemorial`).then(r=>r.json()).then(d=>setNoticesList(Array.isArray(d)?d.slice(0,5):[])).catch(()=>{});
    fetch(`${API}/apis/events/?school=bnmemorial`).then(r=>r.json()).then(d=>setEventsList(Array.isArray(d)?d.slice(0,4):[])).catch(()=>{});
  }, []);

  const monthly = [
    {l:'Jan',v:8},{l:'Feb',v:12},{l:'Mar',v:18},{l:'Apr',v:15},
    {l:'May',v:9},{l:'Jun',v:6},{l:'Jul',v:14},{l:'Aug',v:22},{l:'Sep',v:19},{l:'Oct',v:11},
  ];
  const donutSegs = [
    {label:'Nursery–KG', v:80,  color:'#10b981'},
    {label:'Primary',    v:120, color:'#3b82f6'},
    {label:'Middle',     v:95,  color:'#8b5cf6'},
    {label:'Secondary',  v:60,  color:'#f59e0b'},
  ];
  const sparkData = [5,7,6,9,7,10,8,11,9,12];

  const KPI = [
    {label:'Staff',        value:staff,        icon:'👩‍🏫', color:'#10b981', light:'#ecfdf5', sub:'Teaching & Support', href:'/admin/staff',       spark:sparkData},
    {label:'Notices',      value:notices,       icon:'🔔', color:'#3b82f6', light:'#eff6ff', sub:'Active notices',     href:'/admin/notices',     spark:[3,2,4,3,5,4,6,5,7,6]},
    {label:'Gallery',      value:gallery,       icon:'📸', color:'#8b5cf6', light:'#f5f3ff', sub:'Photos uploaded',    href:'/admin/gallery',     spark:[10,15,12,18,14,20,16,22,18,24]},
    {label:'Testimonials', value:testimonials,  icon:'💬', color:'#f59e0b', light:'#fffbeb', sub:'Parent reviews',     href:'/admin/testimonials', spark:[1,2,2,3,3,3,4,4,5,5]},
    {label:'Events',       value:events,        icon:'📅', color:'#ef4444', light:'#fef2f2', sub:'Scheduled',          href:'/admin/events',      spark:[1,2,1,3,2,4,3,5,4,6]},
    {label:'Facilities',   value:facilities,    icon:'🏫', color:'#0891b2', light:'#ecfeff', sub:'On campus',          href:'/admin/facilities',  spark:[6,6,7,7,8,8,8,9,9,10]},
  ];

  const quickActions = [
    {label:'Add Notice',   icon:'🔔', href:'/admin/notices',      color:'bg-blue-500'},
    {label:'Add Staff',    icon:'👤', href:'/admin/staff',        color:'bg-purple-500'},
    {label:'Add Event',    icon:'📅', href:'/admin/events',       color:'bg-green-500'},
    {label:'Add Photo',    icon:'📸', href:'/admin/gallery',      color:'bg-pink-500'},
    {label:'Testimonials', icon:'💬', href:'/admin/testimonials', color:'bg-amber-500'},
    {label:'Facilities',   icon:'🏫', href:'/admin/facilities',   color:'bg-teal-500'},
    {label:'About Page',   icon:'📝', href:'/admin/aboutpage',    color:'bg-indigo-500'},
    {label:'Settings',     icon:'⚙️', href:'/admin/settings',     color:'bg-gray-500'},
  ];

  return (
    <div className="px-4 py-4 sm:px-6 space-y-6 pb-12">

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: 'linear-gradient(135deg, #064e3b 0%, #059669 60%, #0891b2 100%)' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage:'radial-gradient(#fff 1px,transparent 1px)', backgroundSize:'24px 24px' }} />
        <div className="relative">
          <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">BN MEMORIAL SCHOOL</p>
          <h1 className="text-white text-2xl font-black">School Dashboard</h1>
          <p className="text-emerald-300 text-sm mt-0.5">{new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
        </div>
        <div className="relative flex gap-3">
          <a href="/bnmemorial" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition">
            <FiEye size={14}/> View Site ↗
          </a>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {KPI.map(kpi => (
          <Link key={kpi.label} href={kpi.href} className="block group">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:kpi.light}}>{kpi.icon}</div>
                <FiTrendingUp size={12} className="text-green-500" />
              </div>
              <p className="text-2xl font-black mb-0.5" style={{color:kpi.color}}>
                {kpi.value === null ? <span className="inline-block w-8 h-6 bg-gray-100 animate-pulse rounded"/> : kpi.value}
              </p>
              <p className="text-xs font-bold text-gray-600">{kpi.label}</p>
              <p className="text-[10px] text-gray-400 mb-2">{kpi.sub}</p>
              <Sparkline data={kpi.spark} color={kpi.color} />
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-black text-gray-800">Monthly Enquiries</h3>
              <p className="text-xs text-gray-400">Walk-ins & online enquiries — 2025–26</p>
            </div>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full"><FiActivity size={11}/> This Year</span>
          </div>
          <BarChart data={monthly} color="#10b981" height={150} />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-black text-gray-800 mb-1">Student Distribution</h3>
          <p className="text-xs text-gray-400 mb-4">By class group</p>
          <div className="flex flex-col items-center gap-4">
            <DonutChart segments={donutSegs} size={130} />
            <div className="w-full space-y-2">
              {donutSegs.map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{background:s.color}} />
                    <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
                  <span className="text-xs font-black" style={{color:s.color}}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notices + Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-800">Notice Board</h3>
            <Link href="/admin/notices" className="text-xs font-bold text-emerald-600">Manage →</Link>
          </div>
          {notices_list.length === 0 ? <p className="text-sm text-gray-400 text-center py-6">No notices</p>
            : notices_list.map((n,i) => (
              <div key={n.id||i} className="flex items-start gap-2.5 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-xs font-bold text-gray-800 line-clamp-1">{n.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{n.description||''}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-gray-800">Upcoming Events</h3>
            <Link href="/admin/events" className="text-xs font-bold text-emerald-600">View all →</Link>
          </div>
          {events_list.length === 0 ? <p className="text-sm text-gray-400 text-center py-6">No events</p>
            : events_list.map((ev,i) => {
              const d = ev.event_date ? new Date(ev.event_date) : null;
              const colors = ['#10b981','#3b82f6','#8b5cf6','#f59e0b'];
              return (
                <div key={ev.id||i} className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0" style={{background:colors[i%4]}}>
                    {d ? <><span className="text-[9px] font-black uppercase">{d.toLocaleDateString('en',{month:'short'})}</span><span className="text-sm font-black">{d.getDate()}</span></> : '—'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{ev.title}</p>
                    <p className="text-[10px] text-gray-400 capitalize">{ev.event_type||'general'}</p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {quickActions.map(a => (
            <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition group text-center">
              <div className={`w-10 h-10 ${a.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm`}>{a.icon}</div>
              <span className="text-[10px] font-bold text-gray-600">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Root Export ── */
export default function AdminDashboard() {
  const { school } = useSchool();
  return school.key === 'bnmemorial' ? <BnDashboard /> : <KamalaDashboard />;
}
