'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiSave, FiCheck, FiPlus, FiTrash2, FiArrowUp, FiArrowDown, FiExternalLink, FiFileText } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;
const getToken = () => { try { return localStorage.getItem('admin_token') || ''; } catch { return ''; } };
const inp = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white';

/* ── PAGE DEFINITIONS ── */
const PAGES = [
  {
    slug: 'admission-process',
    label: 'Admission Process',
    icon: '📋',
    preview: '/kamaladevirajjuprasad/addmissionprocess',
    sections: [
      { key: 'steps',    label: 'Admission Steps',   type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'n',l:'Step No.',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {icon:'📋',n:'01',title:'',desc:''} },
      { key: 'policies', label: 'Fee Policies',       type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'text',l:'Policy Text',ta:true,full:true}], blank: {icon:'📘',text:''} },
      { key: 'grades',   label: 'Grade Names (table row headers)', type: 'strlist' },
      { key: 'adm_fee',  label: 'Admission Fee (per grade)',        type: 'strlist' },
      { key: 'comp_fee', label: 'Composite Fee (per grade)',        type: 'strlist' },
    ],
  },
  {
    slug: 'school-transport',
    label: 'School Transport',
    icon: '🚌',
    preview: '/kamaladevirajjuprasad/schooltransport',
    sections: [
      { key: 'rules',    label: 'Transport Rules',   type: 'objlist', fields: [{k:'num',l:'No.',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {num:'01',title:'',desc:''} },
      { key: 'features', label: 'Stats / Features',  type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'value',l:'Value',sm:true},{k:'sub',l:'Sub-label'}], blank: {icon:'🚌',title:'',value:'',sub:''} },
    ],
  },
  {
    slug: 'sport-academy',
    label: 'Sports Academy',
    icon: '🏆',
    preview: '/kamaladevirajjuprasad/sportacademy',
    sections: [
      { key: 'sports',   label: 'Sports List',       type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'name',l:'Sport Name'},{k:'desc',l:'Description',ta:true}], blank: {icon:'⚽',name:'',desc:''} },
      { key: 'values',   label: 'Stats Numbers',     type: 'objlist', fields: [{k:'n',l:'Number',sm:true},{k:'l',l:'Label'}], blank: {n:'',l:''} },
      { key: 'sections', label: 'Info Sections',     type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'text',l:'Body Text',ta:true,full:true}], blank: {icon:'🏆',title:'',text:'',accent:'#2563eb',light:'#eff6ff'} },
    ],
  },
  {
    slug: 'our-campus',
    label: 'Our Campus',
    icon: '🏫',
    preview: '/kamaladevirajjuprasad/ourcampus',
    sections: [
      { key: 'highlights', label: 'Campus Highlights', type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {icon:'🏫',title:'',desc:''} },
    ],
  },
  {
    slug: 'infrastructure',
    label: 'Infrastructure',
    icon: '🏗️',
    preview: '/kamaladevirajjuprasad/infrastructure',
    sections: [
      { key: 'features', label: 'Infrastructure Features', type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true,full:true}], blank: {icon:'🖥️',title:'',desc:'',grad:'from-blue-500 to-indigo-600',light:'bg-blue-50',border:'border-blue-100'} },
    ],
  },
  {
    slug: 'statement-philosophy',
    label: 'Statement & Philosophy',
    icon: '⚖️',
    preview: '/kamaladevirajjuprasad/statementphilosophy',
    sections: [
      { key: 'values',  label: 'Core Values',   type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {icon:'⚖️',title:'',desc:''} },
      { key: 'reasons', label: 'Why Choose Us', type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {icon:'📚',title:'',desc:''} },
    ],
  },
  {
    slug: 'cbse-guidelines',
    label: 'CBSE Guidelines',
    icon: '📘',
    preview: '/kamaladevirajjuprasad/cbseguidelineandphilosophy',
    sections: [
      { key: 'phases', label: 'Guideline Phases', type: 'phaselist' },
    ],
  },
  {
    slug: 'mandatory-disclosure',
    label: 'Mandatory Disclosure',
    icon: '📄',
    preview: '/kamaladevirajjuprasad/mandatorydisclosure',
    sections: [
      { key: 'sections', label: 'Disclosure Sections', type: 'disclosurelist' },
    ],
  },
  {
    slug: 'about-school',
    label: 'About School (BN Memorial)',
    icon: '🏫',
    preview: '/bnmemorial/aboutus',
    sections: [
      { key: 'hero_title',    label: 'Hero Title',       type: 'text' },
      { key: 'hero_subtitle', label: 'Hero Subtitle',    type: 'text' },
      { key: 'about_heading', label: 'About Heading',    type: 'text' },
      { key: 'about_text',    label: 'About Description', type: 'textarea' },
      { key: 'stats',        label: 'Stats Cards',       type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'value',l:'Value',sm:true},{k:'label',l:'Label'}], blank: {icon:'🎓',value:'',label:''} },
      { key: 'highlights',   label: 'School Highlights', type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {icon:'🏫',title:'',desc:''} },
      { key: 'milestones',   label: 'History / Milestones', type: 'objlist', fields: [{k:'year',l:'Year',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {year:'2024',title:'',desc:''} },
    ],
  },
  {
    slug: 'mission-vision',
    label: 'Mission & Vision (BN Memorial)',
    icon: '🎯',
    preview: '/bnmemorial/mission',
    sections: [
      { key: 'mission_statement', label: 'Mission Statement', type: 'textarea' },
      { key: 'vision_statement',  label: 'Vision Statement',  type: 'textarea' },
      { key: 'pledge_heading',    label: 'Pledge Heading',    type: 'text' },
      { key: 'pledge_text',       label: 'Pledge Text',       type: 'textarea' },
      { key: 'core_values', label: 'Core Values', type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {icon:'⭐',title:'',desc:''} },
      { key: 'goals', label: 'Strategic Goals', type: 'objlist', fields: [{k:'n',l:'No.',sm:true},{k:'title',l:'Title'},{k:'text',l:'Body Text',ta:true}], blank: {n:'01',title:'',text:''} },
    ],
  },
  {
    slug: 'video-gallery',
    label: 'Video Gallery',
    icon: '🎬',
    preview: '/kamaladevirajjuprasad/videogallery',
    sections: [
      { key: 'videos', label: 'Videos', type: 'objlist', fields: [
        {k:'title',l:'Title'},{k:'category',l:'Category',sm:true},{k:'youtube_id',l:'YouTube ID',sm:true},{k:'description',l:'Description',ta:true}
      ], blank: {title:'',category:'Events',youtube_id:'',description:''} },
    ],
  },
  {
    slug: 'virtual-tour',
    label: 'Virtual Tour',
    icon: '🗺️',
    preview: '/kamaladevirajjuprasad/virtualtour',
    sections: [
      { key: 'map_embed',       label: 'Google Maps Embed URL', type: 'text' },
      { key: 'tour_video_id',   label: 'YouTube Video ID (Campus Tour)', type: 'text' },
      { key: 'address',         label: 'School Address', type: 'text' },
      { key: 'areas', label: 'Campus Areas', type: 'objlist', fields: [{k:'icon',l:'Icon',sm:true},{k:'title',l:'Title'},{k:'desc',l:'Description',ta:true}], blank: {icon:'🏫',title:'',desc:''} },
    ],
  },
];

/* ── Utility: move/remove ── */
function moveItem(arr, i, d) { const n=[...arr]; [n[i],n[i+d]]=[n[i+d],n[i]]; return n; }
function removeItem(arr, i) { return arr.filter((_,j)=>j!==i); }

/* ── Row Controls ── */
function RowCtrl({ i, len, onMove, onDel }) {
  const b = 'p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30';
  return (
    <div className="flex items-center gap-0.5 flex-shrink-0">
      <button type="button" className={b} disabled={i===0} onClick={()=>onMove(i,-1)}><FiArrowUp size={13}/></button>
      <button type="button" className={b} disabled={i===len-1} onClick={()=>onMove(i,1)}><FiArrowDown size={13}/></button>
      <button type="button" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50" onClick={()=>onDel(i)}><FiTrash2 size={13}/></button>
    </div>
  );
}

/* ── String list editor ── */
function StrList({ items, onChange }) {
  return (
    <div className="space-y-2">
      {items.map((v,i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-5 text-xs font-bold text-gray-400 text-center">{i+1}</span>
          <input className={inp} value={v} onChange={e=>{ const n=[...items]; n[i]=e.target.value; onChange(n); }} />
          <RowCtrl i={i} len={items.length} onMove={(idx,d)=>onChange(moveItem(items,idx,d))} onDel={idx=>onChange(removeItem(items,idx))} />
        </div>
      ))}
      <button type="button" onClick={()=>onChange([...items,''])} className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 mt-1"><FiPlus/> Add item</button>
    </div>
  );
}

/* ── Object list editor ── */
function ObjList({ items, onChange, fields, blank }) {
  return (
    <div className="space-y-3">
      {items.map((item,i)=>(
        <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-gray-400">#{i+1}</span>
            <RowCtrl i={i} len={items.length} onMove={(idx,d)=>onChange(moveItem(items,idx,d))} onDel={idx=>onChange(removeItem(items,idx))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {fields.map(f=>(
              <div key={f.k} className={f.full?'sm:col-span-2':''}>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">{f.l}</label>
                {f.ta
                  ? <textarea rows={2} className={`${inp} resize-none text-xs`} value={item[f.k]||''} onChange={e=>{ const n=[...items]; n[i]={...n[i],[f.k]:e.target.value}; onChange(n); }} />
                  : <input className={`${inp} ${f.sm?'text-center font-bold':''}`} value={item[f.k]||''} onChange={e=>{ const n=[...items]; n[i]={...n[i],[f.k]:e.target.value}; onChange(n); }} />
                }
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={()=>onChange([...items,{...blank}])} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 w-full justify-center"><FiPlus/> Add item</button>
    </div>
  );
}

/* ── Phase list (CBSE) ── */
function PhaseList({ items, onChange }) {
  return (
    <div className="space-y-4">
      {items.map((ph,i)=>(
        <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
          <div className="flex justify-between mb-3">
            <span className="text-xs font-black text-gray-400">Phase #{i+1}</span>
            <RowCtrl i={i} len={items.length} onMove={(idx,d)=>onChange(moveItem(items,idx,d))} onDel={idx=>onChange(removeItem(items,idx))} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
            {[{k:'num',l:'No.'},{k:'icon',l:'Icon'},{k:'label',l:'Label'},{k:'start',l:'Start #'}].map(f=>(
              <div key={f.k}>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">{f.l}</label>
                <input className={inp} value={ph[f.k]||''} onChange={e=>{ const n=[...items]; n[i]={...n[i],[f.k]:e.target.value}; onChange(n); }} />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1.5">Guidelines (one per line)</label>
            <div className="space-y-1.5">
              {(ph.guidelines||[]).map((g,gi)=>(
                <div key={gi} className="flex gap-2 items-start">
                  <span className="text-[10px] font-black text-gray-400 w-5 text-center mt-2">{gi+1}</span>
                  <textarea rows={2} className={`${inp} resize-none text-xs flex-1`} value={g} onChange={e=>{ const n=[...items]; const gl=[...n[i].guidelines]; gl[gi]=e.target.value; n[i]={...n[i],guidelines:gl}; onChange(n); }} />
                  <button type="button" className="text-red-400 hover:text-red-600 mt-1.5" onClick={()=>{ const n=[...items]; const gl=n[i].guidelines.filter((_,x)=>x!==gi); n[i]={...n[i],guidelines:gl}; onChange(n); }}><FiTrash2 size={12}/></button>
                </div>
              ))}
              <button type="button" className="text-xs font-bold text-blue-600 mt-1" onClick={()=>{ const n=[...items]; n[i]={...n[i],guidelines:[...(n[i].guidelines||[]),'new guideline']}; onChange(n); }}><FiPlus className="inline mr-1"/>Add guideline</button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={()=>onChange([...items,{num:'0'+((items.length||0)+1),label:'New Phase',icon:'📘',color:'#1d4ed8',bg:'#eff6ff',border:'#bfdbfe',guidelines:[''],start:(items[items.length-1]?.start||0)+4}])} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 w-full justify-center"><FiPlus/> Add phase</button>
    </div>
  );
}

/* ── Disclosure section list ── */
function DisclosureList({ items, onChange }) {
  return (
    <div className="space-y-4">
      {items.map((sec,i)=>(
        <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
          <div className="flex justify-between mb-3">
            <span className="text-xs font-black text-gray-400">Section #{i+1}</span>
            <RowCtrl i={i} len={items.length} onMove={(idx,d)=>onChange(moveItem(items,idx,d))} onDel={idx=>onChange(removeItem(items,idx))} />
          </div>
          <div className="grid grid-cols-3 gap-2.5 mb-3">
            {[{k:'id',l:'ID (A,B…)'},{k:'icon',l:'Icon'},{k:'label',l:'Label'}].map(f=>(
              <div key={f.k}>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">{f.l}</label>
                <input className={inp} value={sec[f.k]||''} onChange={e=>{ const n=[...items]; n[i]={...n[i],[f.k]:e.target.value}; onChange(n); }} />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label className="block text-[10px] font-bold text-gray-500 mb-1">Note (optional)</label>
            <textarea rows={2} className={`${inp} resize-none text-xs`} value={sec.note||''} onChange={e=>{ const n=[...items]; n[i]={...n[i],note:e.target.value}; onChange(n); }} />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1.5">Table Rows (S.No. | Info | Detail)</label>
            <div className="space-y-1.5">
              {(sec.rows||[]).map((row,ri)=>(
                <div key={ri} className="flex gap-1.5 items-center">
                  <span className="text-[10px] font-black text-gray-400 w-4">{ri+1}</span>
                  {row.map((cell,ci)=>(
                    <input key={ci} className={`${inp} text-xs flex-1`} value={cell} onChange={e=>{ const n=[...items]; const rows=[...n[i].rows]; rows[ri]=[...rows[ri]]; rows[ri][ci]=e.target.value; n[i]={...n[i],rows}; onChange(n); }} />
                  ))}
                  <button type="button" className="text-red-400 hover:text-red-600" onClick={()=>{ const n=[...items]; n[i]={...n[i],rows:n[i].rows.filter((_,x)=>x!==ri)}; onChange(n); }}><FiTrash2 size={12}/></button>
                </div>
              ))}
              <button type="button" className="text-xs font-bold text-blue-600 mt-1" onClick={()=>{ const n=[...items]; n[i]={...n[i],rows:[...(n[i].rows||[]),[(n[i].rows||[]).length+1+'','','']]}; onChange(n); }}><FiPlus className="inline mr-1"/>Add row</button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={()=>onChange([...items,{id:String.fromCharCode(65+(items.length||0)),label:'New Section',icon:'📄',accent:'#2563eb',light:'#eff6ff',border:'#bfdbfe',cols:['S.No.','Information','Details'],rows:[]}])} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 w-full justify-center"><FiPlus/> Add section</button>
    </div>
  );
}

/* ══ MAIN ══ */
export default function PageContentAdmin() {
  const [activeSlug, setActiveSlug] = useState(PAGES[0].slug);
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);

  const activePage = PAGES.find(p => p.slug === activeSlug);

  const load = useCallback(async (slug) => {
    try {
      const r = await fetch(`${API}/apis/pages/${slug}/`);
      const d = await r.json();
      setData(prev => ({ ...prev, [slug]: d || {} }));
    } catch { setData(prev => ({ ...prev, [slug]: {} })); }
  }, []);

  useEffect(() => { load(activeSlug); }, [activeSlug, load]);

  const pageData = data[activeSlug] || {};
  const setSection = (key, val) => setData(prev => ({ ...prev, [activeSlug]: { ...prev[activeSlug], [key]: val } }));

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch(`${API}/apis/pages/${activeSlug}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(pageData),
      });
      if (r.status === 401) throw new Error('Session expired');
      if (!r.ok) throw new Error('Save failed');
      setSaved(true); setTimeout(() => setSaved(false), 2000);
      setToast({ message: `${activePage.label} saved!`, type: 'success' });
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-5">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-gray-800 flex items-center gap-2"><FiFileText /> Page Content Editor</h1>
          <p className="text-sm text-gray-400 mt-0.5">Edit content for Kamala Devi pages</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {activePage?.preview && (
            <a href={activePage.preview} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
              <FiExternalLink size={14}/> Preview
            </a>
          )}
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl disabled:opacity-60 transition">
            {saved ? <><FiCheck/> Saved!</> : <><FiSave/> {saving ? 'Saving…' : 'Save'}</>}
          </button>
        </div>
      </div>

      {/* Page selector */}
      <div className="flex flex-wrap gap-2">
        {PAGES.map(p => (
          <button key={p.slug} onClick={() => setActiveSlug(p.slug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition ${activeSlug===p.slug ? 'bg-blue-600 text-white shadow' : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300'}`}>
            <span>{p.icon}</span> {p.label}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {activePage?.sections.map(sec => (
          <div key={sec.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-black text-gray-800 text-sm mb-4">{sec.label}</h3>
            {sec.type === 'strlist' && (
              <StrList items={pageData[sec.key] || []} onChange={val => setSection(sec.key, val)} />
            )}
            {sec.type === 'objlist' && (
              <ObjList items={pageData[sec.key] || []} onChange={val => setSection(sec.key, val)} fields={sec.fields} blank={sec.blank} />
            )}
            {sec.type === 'phaselist' && (
              <PhaseList items={pageData[sec.key] || []} onChange={val => setSection(sec.key, val)} />
            )}
            {sec.type === 'disclosurelist' && (
              <DisclosureList items={pageData[sec.key] || []} onChange={val => setSection(sec.key, val)} />
            )}
            {sec.type === 'text' && (
              <input className={inp} value={pageData[sec.key] || ''} onChange={e => setSection(sec.key, e.target.value)} />
            )}
            {sec.type === 'textarea' && (
              <textarea rows={4} className={`${inp} resize-y`} value={pageData[sec.key] || ''} onChange={e => setSection(sec.key, e.target.value)} />
            )}
          </div>
        ))}
      </div>

      {/* Sticky save */}
      <div className="fixed bottom-0 left-0 right-0 md:left-56 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 flex justify-between items-center z-30">
        <p className="text-xs text-gray-400">Editing: <span className="font-bold text-gray-700">{activePage?.label}</span></p>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl disabled:opacity-60">
          {saved ? <><FiCheck/> Saved!</> : <><FiSave/> {saving ? 'Saving…' : 'Save Changes'}</>}
        </button>
      </div>
    </div>
  );
}
