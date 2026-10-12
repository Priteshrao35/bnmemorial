'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../navigationbar';
import FooterSection from '../footersections';

const API = process.env.NEXT_PUBLIC_API_URL;
const SCHOOL = 'kamala';

const CERT_TYPES = [
  { id: 'primary',      label: 'Primary (1–5)' },
  { id: 'junior',       label: 'Junior (6–8)' },
  { id: 'highschool',   label: 'High School (9–10)' },
  { id: 'intermediate', label: 'Intermediate (11–12)' },
];

function classToType(c) {
  const n = parseInt(c);
  if (!c||c==='LKG'||c==='UKG'||n<=5) return 'primary';
  if (n<=8) return 'junior';
  if (n<=10) return 'highschool';
  return 'intermediate';
}

const DEFAULT_SUBJECTS = {
  primary:      ['हिन्दी','अंग्रेजी','गणित','पर्यावरण अध्ययन','कला/संगीत','कार्यानुभव'],
  junior:       ['हिन्दी','अंग्रेजी','गणित','सामाजिक विज्ञान','संस्कृत/उर्दू','बेसिक/क्राफ्ट','कला/संगीत','विज्ञान','खेल व स्वास्थ्य','पर्यावरणीय अध्ययन','कम्प्यूटर'],
  highschool:   ['हिन्दी','अंग्रेजी','गणित','विज्ञान','सामाजिक विज्ञान','संस्कृत'],
  intermediate: ['हिन्दी','अंग्रेजी','भौतिक विज्ञान','रसायन विज्ञान','जीव विज्ञान'],
};

const EXAM_TYPES  = ['half_yearly','annual','quarterly','unit_test'];
const EXAM_LABELS = { half_yearly:'अर्द्धवार्षिक', annual:'वार्षिक', quarterly:'त्रैमासिक', unit_test:'Unit Test' };

function gradeOf(p) {
  if (p>=90) return 'A+'; if (p>=80) return 'A'; if (p>=70) return 'B+';
  if (p>=60) return 'B';  if (p>=50) return 'C'; return 'D';
}

/* ─── KD Certificate Preview (green/purple theme) ─── */
function CertPreview({ d, rows, certType }) {
  const isBlue = certType==='primary'||certType==='intermediate';
  const bg     = isBlue ? '#ede9fe' : '#fef9c3';
  const border = isBlue ? '#7c3aed' : '#92400e';
  const hdr    = isBlue ? '#7c3aed' : '#92400e';
  const TITLES = { primary:'प्रगति-पत्र (Primary)', junior:'जूनियर अंक-पत्र', highschool:'हाईस्कूल प्रगति-पत्र', intermediate:'इंटरमीडिएट प्रगति-पत्र' };

  return (
    <div style={{ background:bg, border:`3px double ${border}`, padding:'12px', fontFamily:'serif', fontSize:'11px', width:'100%', boxSizing:'border-box' }}>
      <div style={{ textAlign:'center', borderBottom:`2px solid ${border}`, paddingBottom:'6px', marginBottom:'8px' }}>
        <div style={{ fontWeight:'bold', fontSize:'14px' }}>कमला देवी राजू प्रसाद इण्टर कॉलेज</div>
        <div style={{ fontSize:'10px' }}>बामरौली कटारा, फतेहाबाद रोड, आगरा — 282006</div>
        <div style={{ border:`2px solid ${border}`, display:'inline-block', padding:'2px 24px', fontWeight:'bold', fontSize:'13px', margin:'4px 0', background:'white', letterSpacing:'1px' }}>
          {TITLES[certType]}
        </div>
        <div style={{ fontSize:'11px' }}>शैक्षिक सत्र: {d.session||'——'} &nbsp;|&nbsp; कक्षा: {d.class_name||'——'} {d.section||''}</div>
      </div>

      <table style={{ width:'100%', borderCollapse:'collapse', marginBottom:'8px', fontSize:'11px' }}>
        <tbody>
          <tr>
            <td style={{ width:'28%' }}>छात्र/छात्रा का नाम:</td>
            <td style={{ fontWeight:'bold', borderBottom:'1px solid #333', width:'30%' }}>{d.student_name||'——'}</td>
            <td style={{ width:'22%' }}>अनुक्रमांक:</td>
            <td style={{ fontWeight:'bold', borderBottom:'1px solid #333' }}>{d.roll_number||'——'}</td>
          </tr>
          <tr>
            <td>पिता का नाम:</td>
            <td style={{ fontWeight:'bold', borderBottom:'1px solid #333' }}>{d.fathers_name||'——'}</td>
            <td>माता का नाम:</td>
            <td style={{ fontWeight:'bold', borderBottom:'1px solid #333' }}>{d.mothers_name||'——'}</td>
          </tr>
          <tr>
            <td>जन्मतिथि:</td>
            <td style={{ fontWeight:'bold', borderBottom:'1px solid #333' }}>{d.dob||'——'}</td>
            <td>छात्र पंजिका संख्या:</td>
            <td style={{ fontWeight:'bold', borderBottom:'1px solid #333' }}>{d.regNo||'——'}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'10px', marginBottom:'8px' }}>
        <thead>
          <tr style={{ background:hdr, color:'white' }}>
            <th style={{ border:'1px solid #333', padding:'2px 4px', textAlign:'left', width:'26%' }}>विषय</th>
            <th style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>पूर्णांक</th>
            <th style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>अर्द्धवार्षिक<br/>प्राप्तांक</th>
            <th style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>वार्षिक<br/>प्राप्तांक</th>
            <th style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>ग्रेड</th>
            {(certType==='highschool'||certType==='intermediate') && (
              <th style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>परीक्षाफल</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.filter(r=>r.subject).map((r, i) => {
            const am  = parseFloat(r.annual_marks);
            const mm  = parseFloat(r.max_marks)||100;
            const pct = !isNaN(am) ? (am/mm*100) : null;
            const grade = r.grade || (pct!==null ? gradeOf(pct) : '');
            const passed = pct!==null ? pct>=33 : null;
            return (
              <tr key={i} style={{ background: i%2===0 ? (isBlue?'#f5f3ff':'#fffbeb') : bg }}>
                <td style={{ border:'1px solid #333', padding:'2px 4px', fontWeight:'bold' }}>{r.subject}</td>
                <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>{mm}</td>
                <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center', fontWeight:'bold' }}>{r.half_yearly_marks||'—'}</td>
                <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center', fontWeight:'bold' }}>{r.annual_marks||'—'}</td>
                <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center', fontWeight:'bold' }}>{grade}</td>
                {(certType==='highschool'||certType==='intermediate') && (
                  <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center', fontWeight:'bold', color:passed===null?'#333':passed?'green':'red' }}>
                    {passed===null?'—':passed?'पास':'फेल'}
                  </td>
                )}
              </tr>
            );
          })}
          <tr style={{ background:hdr, color:'white', fontWeight:'bold' }}>
            <td style={{ border:'1px solid #333', padding:'2px 4px' }}>कुल योग</td>
            <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>{rows.reduce((a,r)=>a+(parseFloat(r.max_marks)||100),0)}</td>
            <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>{rows.reduce((a,r)=>a+(!isNaN(parseFloat(r.half_yearly_marks))?parseFloat(r.half_yearly_marks):0),0).toFixed(0)||'—'}</td>
            <td style={{ border:'1px solid #333', padding:'2px', textAlign:'center' }}>{rows.reduce((a,r)=>a+(!isNaN(parseFloat(r.annual_marks))?parseFloat(r.annual_marks):0),0).toFixed(0)||'—'}</td>
            <td colSpan={(certType==='highschool'||certType==='intermediate')?2:1} style={{ border:'1px solid #333' }}/>
          </tr>
        </tbody>
      </table>

      <table style={{ width:'100%', fontSize:'11px', marginBottom:'8px', borderCollapse:'collapse' }}>
        <tbody>
          <tr>
            <td style={{ border:`1px solid ${border}`, padding:'3px 6px' }}>कक्षा में स्थान: <strong>{d.position||'——'}</strong></td>
            <td style={{ border:`1px solid ${border}`, padding:'3px 6px' }}>उपस्थिति: <strong>{d.attendance||'——'}%</strong></td>
            <td style={{ border:`1px solid ${border}`, padding:'3px 6px' }}>श्रेणी: <strong>{d.division||'——'}</strong></td>
            <td style={{ border:`1px solid ${border}`, padding:'3px 6px' }}>प्रतिशत: <strong>{d.percentage||'——'}%</strong></td>
          </tr>
          <tr>
            <td colSpan={4} style={{ border:`1px solid ${border}`, padding:'3px 6px' }}>
              उत्तीर्ण/प्रोन्नत/अनुत्तीर्ण: <strong>{d.result||'——'}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'18px', paddingTop:'6px', borderTop:`1px solid ${border}` }}>
        {['कक्षाध्यापक/कक्षाध्यापिका','जाँचकर्ता','हस्ताक्षर अभिभावक','प्रधानाचार्य/प्रधानाचार्या'].map((l,i)=>(
          <div key={i} style={{ textAlign:'center' }}>
            <div style={{ borderBottom:'1px solid #333', width:'110px', marginBottom:'2px' }}/>
            <div style={{ fontSize:'9px' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportCardContent() {
  const searchParams = useSearchParams();
  const previewRef   = useRef(null);

  const urlStudentId = searchParams.get('student_id');
  const urlYear      = searchParams.get('year') || '2025-26';

  const [students,   setStudents]   = useState([]);
  const [search,     setSearch]     = useState('');
  const [selected,   setSelected]   = useState(null);
  const [certType,   setCertType]   = useState('junior');
  const [examType,   setExamType]   = useState('half_yearly');
  const [acadYear,   setAcadYear]   = useState(urlYear);
  const [rows,       setRows]       = useState([]);
  const [details,    setDetails]    = useState({ session:urlYear, regNo:'', position:'', attendance:'', division:'', percentage:'', result:'उत्तीर्ण' });
  const [loadingRes, setLoadingRes] = useState(false);

  useEffect(() => {
    if (!search || search.length < 2) { setStudents([]); return; }
    const t = setTimeout(() => {
      fetch(`${API}/apis/students/?school=${SCHOOL}&search=${encodeURIComponent(search)}`)
        .then(r=>r.json()).then(setStudents).catch(()=>setStudents([]));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (!urlStudentId) return;
    fetch(`${API}/apis/students/?school=${SCHOOL}`)
      .then(r=>r.json())
      .then(list => { const s=list.find(x=>String(x.id)===String(urlStudentId)); if(s) pickStudent(s); })
      .catch(()=>{});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlStudentId]);

  const loadResults = async (sid, yr) => {
    setLoadingRes(true);
    try {
      const [half, annual] = await Promise.all([
        fetch(`${API}/apis/results/?student_id=${sid}&exam_type=half_yearly&academic_year=${yr}`).then(r=>r.json()),
        fetch(`${API}/apis/results/?student_id=${sid}&exam_type=annual&academic_year=${yr}`).then(r=>r.json()),
      ]);
      setRows(prev => prev.map(r => {
        const h = half.find(x=>x.subject===r.subject);
        const a = annual.find(x=>x.subject===r.subject);
        return { ...r, half_yearly_marks:h?String(h.marks):'', annual_marks:a?String(a.marks):'', max_marks:h?.max_marks||a?.max_marks||100, grade:a?.grade||h?.grade||'' };
      }));
    } catch { /**/ } finally { setLoadingRes(false); }
  };

  const pickStudent = (stu) => {
    setSelected(stu); setSearch(''); setStudents([]);
    const ct = classToType(stu.class_name);
    setCertType(ct);
    setRows(DEFAULT_SUBJECTS[ct].map(s=>({ subject:s, max_marks:100, half_yearly_marks:'', annual_marks:'', grade:'' })));
    loadResults(stu.id, acadYear);
  };

  useEffect(() => {
    if (!selected) return;
    loadResults(selected.id, acadYear);
    setDetails(p=>({...p, session:acadYear}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acadYear]);

  const setD   = (k,v) => setDetails(p=>({...p,[k]:v}));
  const setRow = (i,k,v) => setRows(prev=>prev.map((r,j)=>j===i?{...r,[k]:v}:r));

  const handlePrint = () => {
    const content = previewRef.current?.innerHTML;
    const win = window.open('','_blank','width=900,height=700');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>प्रगति-पत्र — ${selected?.student_name||''}</title>
    <style>body{margin:0;padding:20px;font-family:serif;-webkit-print-color-adjust:exact;print-color-adjust:exact;}@page{size:A4;margin:10mm;}@media print{body{padding:0;}}</style>
    </head><body>${content}</body></html>`);
    win.document.close(); win.focus();
    setTimeout(()=>{ win.print(); }, 500);
  };

  const inp = 'w-full px-2 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400';
  const fullDetails = { ...(selected||{}), ...details };

  return (
    <>
      <Navbar/>
      {/* Hero */}
      <div className="w-full text-white text-center py-14 px-4" style={{ background:'linear-gradient(120deg,#4c1d95 0%,#7c3aed 60%,#8b5cf6 100%)' }}>
        <span className="inline-block bg-white/15 border border-white/20 rounded-full px-4 py-1 text-xs font-bold mb-3">Kamala Devi School</span>
        <h1 className="text-3xl font-black mb-2">Report Card Generator</h1>
        <p className="text-purple-200 text-sm">छात्र का नाम डालें → marks auto-fill होंगे → certificate download करें</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Type selector */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {CERT_TYPES.map(t=>(
            <button key={t.id} onClick={()=>{ setCertType(t.id); if(!selected) setRows(DEFAULT_SUBJECTS[t.id].map(s=>({ subject:s, max_marks:100, half_yearly_marks:'', annual_marks:'', grade:'' }))); }}
              className={`px-5 py-2.5 rounded-xl font-black text-sm border-2 transition ${certType===t.id?'bg-purple-600 text-white border-purple-600 shadow-lg':'bg-white text-gray-700 border-gray-200 hover:border-purple-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* FORM */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div>
              <h2 className="font-black text-gray-900 text-lg border-b pb-3 mb-3">🔍 छात्र खोजें (DB से auto-fill)</h2>
              <div className="relative">
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="छात्र का नाम टाइप करें…"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                {students.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 mt-1 max-h-64 overflow-y-auto">
                    {students.map(s=>(
                      <button key={s.id} onClick={()=>pickStudent(s)}
                        className="w-full text-left px-4 py-3 hover:bg-purple-50 transition border-b border-gray-50 last:border-0 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-black text-sm">{s.student_name?.[0]}</div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{s.student_name}</p>
                          <p className="text-xs text-gray-500">Class {s.class_name}{s.section} · {s.roll_number}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {selected && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <p className="font-black text-green-800 text-sm">{selected.student_name}</p>
                    <p className="text-green-600 text-xs">Class {selected.class_name}{selected.section} · {selected.roll_number}</p>
                  </div>
                  <button onClick={()=>{ setSelected(null); setRows([]); }} className="ml-auto text-green-400 hover:text-green-600 text-xs font-bold">✕</button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">परीक्षा प्रकार</label>
                <select value={examType} onChange={e=>setExamType(e.target.value)} className={inp}>
                  {EXAM_TYPES.map(t=><option key={t} value={t}>{EXAM_LABELS[t]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">शैक्षिक सत्र</label>
                <input value={acadYear} onChange={e=>setAcadYear(e.target.value)} className={inp} placeholder="2025-26"/>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[['regNo','पंजिका संख्या'],['position','कक्षा में स्थान'],['attendance','उपस्थिति (%)'],['percentage','प्रतिशत (%)'],['division','श्रेणी']].map(([k,l])=>(
                <div key={k}>
                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">{l}</label>
                  <input value={details[k]||''} onChange={e=>setD(k,e.target.value)} className={inp} placeholder={l}/>
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">परिणाम</label>
                <select value={details.result} onChange={e=>setD('result',e.target.value)} className={inp}>
                  <option>उत्तीर्ण</option><option>प्रोन्नत</option><option>अनुत्तीर्ण</option>
                </select>
              </div>
            </div>

            {rows.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2 border-b pb-1">
                  <h3 className="font-black text-gray-800 text-sm">📚 विषयवार अंक</h3>
                  {loadingRes && <span className="text-xs text-purple-500 animate-pulse">⏳ लोड हो रहे हैं…</span>}
                </div>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="p-1 border border-purple-700 text-left">विषय</th>
                      <th className="p-1 border border-purple-700">पूर्णांक</th>
                      <th className="p-1 border border-purple-700">अर्द्धवार्षिक</th>
                      <th className="p-1 border border-purple-700">वार्षिक</th>
                      <th className="p-1 border border-purple-700">ग्रेड</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r,i)=>(
                      <tr key={i} className={i%2===0?'bg-white':'bg-purple-50'}>
                        <td className="border border-gray-200 p-0.5">
                          <input value={r.subject} onChange={e=>setRow(i,'subject',e.target.value)} className="w-full px-1 py-1 text-xs focus:outline-none bg-transparent font-semibold"/>
                        </td>
                        {['max_marks','half_yearly_marks','annual_marks','grade'].map(k=>(
                          <td key={k} className="border border-gray-200 p-0.5">
                            <input value={r[k]||''} onChange={e=>setRow(i,k,e.target.value)} className="w-full px-1 py-1 text-xs text-center focus:outline-none bg-transparent"/>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button onClick={handlePrint}
              className="w-full text-white font-black py-3.5 rounded-2xl hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2 text-base"
              style={{ background:'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
              🖨️ Download / Print Certificate
            </button>
            <p className="text-center text-gray-400 text-xs">Print dialog mein "Save as PDF" chunein</p>
          </div>

          {/* PREVIEW */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-gray-900 text-lg">👁️ Preview</h2>
              <button onClick={handlePrint}
                className="text-white font-black text-sm px-5 py-2 rounded-xl transition"
                style={{ background:'#7c3aed' }}>
                🖨️ Print
              </button>
            </div>
            <div ref={previewRef} className="overflow-auto border border-gray-200 rounded-2xl p-2 shadow-inner bg-gray-50" style={{ minHeight:400 }}>
              <CertPreview d={fullDetails} rows={rows} certType={certType}/>
            </div>
          </div>
        </div>
      </div>
      <FooterSection/>
    </>
  );
}

export default function ReportCard() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-gray-400">Loading…</div>}>
      <ReportCardContent/>
    </Suspense>
  );
}
