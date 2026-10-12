'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiPlus, FiSearch, FiTrash2, FiBarChart2, FiFilter } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

const EXAM_TYPES  = ['half_yearly', 'annual', 'quarterly', 'unit_test'];
const EXAM_LABELS = { half_yearly: 'अर्द्धवार्षिक', annual: 'वार्षिक', quarterly: 'त्रैमासिक', unit_test: 'Unit Test' };
const CLASSES = ['LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];
const SCHOOL_SUBJECTS = {
  primary:  ['हिन्दी','अंग्रेजी','गणित','पर्यावरण अध्ययन','कला/संगीत','कार्यानुभव'],
  junior:   ['हिन्दी','अंग्रेजी','गणित','सामाजिक विज्ञान','संस्कृत','विज्ञान','कम्प्यूटर','खेल व स्वास्थ्य','कला/संगीत'],
  high:     ['हिन्दी','अंग्रेजी','गणित','विज्ञान','सामाजिक विज्ञान','संस्कृत'],
  inter:    ['हिन्दी','अंग्रेजी','भौतिक विज्ञान','रसायन विज्ञान','जीव विज्ञान','गणित'],
};

function classToGroup(c) {
  const n = parseInt(c);
  if (c==='LKG'||c==='UKG'||n<=5) return 'primary';
  if (n<=8) return 'junior';
  if (n<=10) return 'high';
  return 'inter';
}

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
}

function gradeOf(p) {
  if (p>=90) return 'A+';
  if (p>=80) return 'A';
  if (p>=70) return 'B+';
  if (p>=60) return 'B';
  if (p>=50) return 'C';
  return 'D';
}

export default function ResultsAdmin() {
  const [toast,    setToast]    = useState(null);
  const [students, setStudents] = useState([]);
  const [results,  setResults]  = useState([]);
  const [saving,   setSaving]   = useState(false);

  /* filters */
  const [filterSchool, setFilterSchool] = useState('bnmemorial');
  const [filterClass,  setFilterClass]  = useState('');
  const [searchStu,    setSearchStu]    = useState('');

  /* selected student + exam form */
  const [selected, setSelected] = useState(null);
  const [examType, setExamType] = useState('half_yearly');
  const [acadYear, setAcadYear] = useState('2025-26');
  const [rows,     setRows]     = useState([]);  /* [{subject, max_marks, marks}] */

  /* load students */
  const loadStudents = useCallback(() => {
    const q = new URLSearchParams({ school: filterSchool });
    if (filterClass) q.set('class_name', filterClass);
    if (searchStu)   q.set('search', searchStu);
    fetch(`${API}/apis/students/?${q}`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json()).then(setStudents)
      .catch(() => setToast({ message: 'Failed to load students', type: 'error' }));
  }, [filterSchool, filterClass, searchStu]);

  useEffect(() => { loadStudents(); }, [loadStudents]);

  /* when student selected — build subject rows and load existing results */
  const selectStudent = async (stu) => {
    setSelected(stu);
    const subjects = SCHOOL_SUBJECTS[classToGroup(stu.class_name)] || SCHOOL_SUBJECTS.high;
    setRows(subjects.map(s => ({ subject: s, max_marks: 100, marks: '' })));
    // load existing results for this student
    try {
      const r = await fetch(`${API}/apis/results/?student_id=${stu.id}&exam_type=${examType}&academic_year=${acadYear}`);
      const data = await r.json();
      setResults(data);
      // pre-fill marks if already entered
      setRows(subjects.map(s => {
        const ex = data.find(d => d.subject === s && d.exam_type === examType && d.academic_year === acadYear);
        return { subject: s, max_marks: ex ? ex.max_marks : 100, marks: ex ? String(ex.marks) : '' };
      }));
    } catch { /* ignore */ }
  };

  /* reload results when exam type changes */
  useEffect(() => {
    if (!selected) return;
    fetch(`${API}/apis/results/?student_id=${selected.id}&exam_type=${examType}&academic_year=${acadYear}`)
      .then(r => r.json())
      .then(data => {
        setResults(data);
        setRows(prev => prev.map(r => {
          const ex = data.find(d => d.subject === r.subject && d.exam_type === examType && d.academic_year === acadYear);
          return ex ? { ...r, marks: String(ex.marks), max_marks: ex.max_marks } : { ...r, marks: '' };
        }));
      }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examType, acadYear]);

  const setRow = (i, k, v) => setRows(prev => prev.map((r, j) => j === i ? { ...r, [k]: v } : r));

  const saveResults = async () => {
    if (!selected) return;
    setSaving(true);
    let ok = 0, fail = 0;
    for (const row of rows) {
      if (row.marks === '' || isNaN(parseFloat(row.marks))) continue;
      // delete existing result for this subject+type+year first
      const existing = results.find(d => d.subject === row.subject && d.exam_type === examType && d.academic_year === acadYear);
      if (existing) {
        await fetch(`${API}/apis/results/${existing.id}/`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } }).catch(() => {});
      }
      const fd = new FormData();
      fd.append('student_id', selected.id);
      fd.append('subject', row.subject);
      fd.append('max_marks', row.max_marks);
      fd.append('marks', parseFloat(row.marks));
      fd.append('exam_type', examType);
      fd.append('academic_year', acadYear);
      const r = await fetch(`${API}/apis/results/`, { method: 'POST', body: fd, headers: { Authorization: `Bearer ${getToken()}` } });
      r.ok ? ok++ : fail++;
    }
    setSaving(false);
    if (ok > 0) setToast({ message: `${ok} विषय के अंक सुरक्षित!`, type: 'success' });
    if (fail > 0) setToast({ message: `${fail} विषय सहेजने में त्रुटि`, type: 'error' });
    // reload
    selectStudent(selected);
  };

  const deleteResult = async (id) => {
    if (!confirm('Delete this result?')) return;
    await fetch(`${API}/apis/results/${id}/`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } });
    setResults(prev => prev.filter(r => r.id !== id));
    setToast({ message: 'Deleted', type: 'success' });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Exam Results</h1>
          <p className="text-gray-500 text-sm">छात्र का चयन करें → अंक भरें → सहेजें</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <select value={filterSchool} onChange={e => { setFilterSchool(e.target.value); setSelected(null); }}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
            <option value="bnmemorial">BN Memorial</option>
            <option value="kamala">Kamala Devi</option>
          </select>
          <select value={filterClass} onChange={e => setFilterClass(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
            <option value="">All Classes</option>
            {CLASSES.map(c => <option key={c}>{c}</option>)}
          </select>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"/>
            <input value={searchStu} onChange={e => setSearchStu(e.target.value)}
              placeholder="छात्र खोजें…" className="pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* ─── Student list ─── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="font-black text-sm text-gray-700">छात्र सूची ({students.length})</p>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 520 }}>
            {students.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">कोई छात्र नहीं मिला</div>
            ) : students.map(stu => (
              <button key={stu.id} onClick={() => selectStudent(stu)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-blue-50 transition flex items-center gap-3 ${selected?.id === stu.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black text-sm flex-shrink-0">
                  {stu.student_name?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate">{stu.student_name}</p>
                  <p className="text-xs text-gray-500">Class {stu.class_name}{stu.section} · {stu.roll_number}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${stu.school === 'bnmemorial' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {stu.school === 'bnmemorial' ? 'BN' : 'KD'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Marks entry ─── */}
        <div className="lg:col-span-3 space-y-4">
          {!selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-gray-400">
              <FiBarChart2 size={40} className="mb-3 text-blue-300"/>
              <p className="font-bold text-sm">बाईं तरफ से छात्र चुनें</p>
              <p className="text-xs text-gray-300 mt-1">उसके अंक यहाँ दिखेंगे</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-black text-base">{selected.student_name}</p>
                  <p className="text-blue-100 text-xs">Class {selected.class_name}{selected.section} · {selected.roll_number} · {selected.school === 'bnmemorial' ? 'BN Memorial' : 'Kamala Devi'}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select value={examType} onChange={e => setExamType(e.target.value)}
                    className="bg-white/20 border border-white/30 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none">
                    {EXAM_TYPES.map(t => <option key={t} value={t} className="text-gray-900">{EXAM_LABELS[t]}</option>)}
                  </select>
                  <input value={acadYear} onChange={e => setAcadYear(e.target.value)}
                    className="bg-white/20 border border-white/30 rounded-lg px-2 py-1.5 text-xs text-white w-24 focus:outline-none" placeholder="सत्र"/>
                </div>
              </div>

              {/* Marks table */}
              <div className="p-5">
                <table className="w-full text-sm border-collapse mb-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2.5 font-black text-gray-700 border border-gray-100">विषय</th>
                      <th className="px-3 py-2.5 font-black text-gray-700 border border-gray-100 w-28">पूर्णांक</th>
                      <th className="px-3 py-2.5 font-black text-gray-700 border border-gray-100 w-28">प्राप्तांक</th>
                      <th className="px-3 py-2.5 font-black text-gray-700 border border-gray-100 w-20">%</th>
                      <th className="px-3 py-2.5 font-black text-gray-700 border border-gray-100 w-20">ग्रेड</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => {
                      const pct = r.marks !== '' && !isNaN(parseFloat(r.marks)) ? (parseFloat(r.marks) / r.max_marks * 100) : null;
                      const grade = pct !== null ? gradeOf(pct) : '';
                      return (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="border border-gray-100 px-3 py-2 font-semibold text-gray-800">{r.subject}</td>
                          <td className="border border-gray-100 px-2 py-1">
                            <input type="number" value={r.max_marks} onChange={e => setRow(i,'max_marks',e.target.value)}
                              className="w-full text-center px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                          </td>
                          <td className="border border-gray-100 px-2 py-1">
                            <input type="number" value={r.marks} onChange={e => setRow(i,'marks',e.target.value)}
                              placeholder="अंक" min={0} max={r.max_marks}
                              className="w-full text-center px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"/>
                          </td>
                          <td className="border border-gray-100 px-3 py-2 text-center text-xs text-gray-500 font-semibold">
                            {pct !== null ? `${pct.toFixed(1)}%` : '—'}
                          </td>
                          <td className={`border border-gray-100 px-3 py-2 text-center font-black text-sm ${grade==='A+'?'text-green-600':grade==='A'?'text-blue-600':grade==='D'?'text-red-500':'text-orange-500'}`}>
                            {grade || '—'}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Total row */}
                    {(() => {
                      const totalMax   = rows.reduce((a,r) => a + Number(r.max_marks||0), 0);
                      const totalMarks = rows.reduce((a,r) => a + (r.marks!==''&&!isNaN(parseFloat(r.marks)) ? parseFloat(r.marks) : 0), 0);
                      const totalPct   = totalMax > 0 ? (totalMarks/totalMax*100) : 0;
                      return (
                        <tr className="bg-blue-50 font-black">
                          <td className="border border-gray-200 px-3 py-2.5 text-blue-800">कुल</td>
                          <td className="border border-gray-200 px-3 py-2.5 text-center text-blue-800">{totalMax}</td>
                          <td className="border border-gray-200 px-3 py-2.5 text-center text-blue-800">{totalMarks.toFixed(0)}</td>
                          <td className="border border-gray-200 px-3 py-2.5 text-center text-blue-800">{totalPct.toFixed(1)}%</td>
                          <td className="border border-gray-200 px-3 py-2.5 text-center text-blue-800">{gradeOf(totalPct)}</td>
                        </tr>
                      );
                    })()}
                  </tbody>
                </table>

                <div className="flex items-center justify-between gap-3">
                  <a href={`/${selected.school === 'bnmemorial' ? 'bnmemorial' : 'kamaladevirajjuprasad'}/reportcard?student_id=${selected.id}&exam_type=${examType}&year=${acadYear}`}
                    target="_blank"
                    className="flex-1 text-center border border-blue-600 text-blue-600 font-black py-3 rounded-2xl hover:bg-blue-50 transition text-sm">
                    🖨️ Report Card Preview
                  </a>
                  <button onClick={saveResults} disabled={saving}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-3 rounded-2xl transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
                    {saving ? '⏳ सहेज रहे हैं…' : '💾 अंक सहेजें'}
                  </button>
                </div>
              </div>

              {/* Saved results list */}
              {results.length > 0 && (
                <div className="px-5 pb-5">
                  <p className="font-black text-xs text-gray-500 uppercase tracking-wider mb-2">पहले से दर्ज अंक</p>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {results.map(res => (
                      <div key={res.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 text-xs">
                        <span className="font-semibold text-gray-700">{res.subject}</span>
                        <span className="text-gray-500">{EXAM_LABELS[res.exam_type] || res.exam_type} · {res.academic_year}</span>
                        <span className="font-black text-blue-700">{res.marks}/{res.max_marks}</span>
                        <span className="font-black text-green-600">{res.grade}</span>
                        <button onClick={() => deleteResult(res.id)} className="text-red-400 hover:text-red-600 transition ml-1">
                          <FiTrash2 size={13}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
