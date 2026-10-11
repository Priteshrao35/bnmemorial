'use client';
import { useEffect, useState } from 'react';
import {
  FiInfo, FiSave, FiCheck, FiChevronDown, FiPlus, FiTrash2, FiArrowUp, FiArrowDown,
  FiUpload, FiExternalLink, FiRotateCcw,
} from 'react-icons/fi';
import Toast from '../_components/Toast';
import { ABOUT_DEFAULTS, ABOUT_SLUG, mergeAbout } from '../../kamaladevirajjuprasad/aboutus/aboutContent';

const API = process.env.NEXT_PUBLIC_API_URL;
const inp = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white';
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '');

function Field({ label, value, onChange, area = false, rows = 3, small = false }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</span>
      {area ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows} className={`${inp} resize-y`} />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${inp} ${small ? 'text-center text-lg' : ''}`} />
      )}
    </label>
  );
}

function ImageField({ label, value, onChange, onError }) {
  const [busy, setBusy] = useState(false);
  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const r = await fetch(`${API}/apis/pages/upload/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      if (!r.ok) throw new Error(r.status === 401 ? 'Session expired — please log in again' : 'Upload failed');
      onChange((await r.json()).url);
    } catch (e) {
      onError(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div>
      <span className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</span>
      <div className="flex gap-3 items-start">
        <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
          {value && <img src={value} alt="" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inp} placeholder="Image URL" />
          <label className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${busy ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
            <FiUpload /> {busy ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" className="hidden" disabled={busy}
              onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
        </div>
      </div>
    </div>
  );
}

function RowTools({ i, len, onMove, onRemove }) {
  const btn = 'p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <div className="flex items-center gap-0.5 flex-shrink-0">
      <button type="button" className={btn} disabled={i === 0} onClick={() => onMove(i, -1)} title="Move up"><FiArrowUp /></button>
      <button type="button" className={btn} disabled={i === len - 1} onClick={() => onMove(i, 1)} title="Move down"><FiArrowDown /></button>
      <button type="button" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600" onClick={() => onRemove(i)} title="Remove"><FiTrash2 /></button>
    </div>
  );
}

function useListOps(list, setList) {
  return {
    move: (i, d) => {
      const next = [...list];
      [next[i], next[i + d]] = [next[i + d], next[i]];
      setList(next);
    },
    remove: (i) => setList(list.filter((_, j) => j !== i)),
    update: (i, val) => setList(list.map((x, j) => (j === i ? val : x))),
  };
}

function StringList({ label, items, onChange, addLabel = 'Add item' }) {
  const ops = useListOps(items, onChange);
  return (
    <div>
      <span className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</span>
      <div className="space-y-2">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-6 text-xs font-bold text-gray-400 text-center flex-shrink-0">{i + 1}</span>
            <input type="text" value={t} onChange={(e) => ops.update(i, e.target.value)} className={inp} />
            <RowTools i={i} len={items.length} onMove={ops.move} onRemove={ops.remove} />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, ''])}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800">
        <FiPlus /> {addLabel}
      </button>
    </div>
  );
}

function ObjectList({ items, onChange, fields, blank, addLabel }) {
  const ops = useListOps(items, onChange);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/60 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black text-gray-400">#{i + 1}</span>
            <RowTools i={i} len={items.length} onMove={ops.move} onRemove={ops.remove} />
          </div>
          <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[80px_1fr] gap-3">
            {fields.map((f) => (
              <div key={f.key} className={f.icon ? '' : f.full ? 'col-span-2' : 'col-span-2 sm:col-span-1 sm:col-start-2'}>
                <Field label={f.label} value={item[f.key]} area={f.area} rows={f.rows || 2} small={f.icon}
                  onChange={(v) => ops.update(i, { ...item, [f.key]: v })} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, { ...blank }])}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 w-full justify-center">
        <FiPlus /> {addLabel}
      </button>
    </div>
  );
}

function Section({ title, hint, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left hover:bg-gray-50 transition">
        <div>
          <p className="font-bold text-gray-800 text-sm sm:text-base">{title}</p>
          {hint && <p className="text-gray-400 text-xs mt-0.5">{hint}</p>}
        </div>
        <FiChevronDown className={`text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-gray-100">{children}</div>}
    </div>
  );
}

const grid2 = 'grid grid-cols-1 sm:grid-cols-2 gap-4';

export default function AboutPageAdmin() {
  const [c, setC] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(`${API}/apis/pages/${ABOUT_SLUG}/`)
      .then((r) => r.json())
      .then((d) => setC(mergeAbout(d)))
      .catch(() => setC(mergeAbout({})));
  }, []);

  if (!c) return <div className="text-gray-400 text-sm py-20 text-center">Loading…</div>;

  const setTop = (key, val) => setC((p) => ({ ...p, [key]: val }));
  const setIn = (key, field) => (val) => setC((p) => ({ ...p, [key]: { ...p[key], [field]: val } }));
  const showError = (message) => setToast({ message, type: 'error' });

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch(`${API}/apis/pages/${ABOUT_SLUG}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(c),
      });
      if (r.status === 401) throw new Error('Session expired — please log in again');
      if (!r.ok) throw new Error('Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setToast({ message: 'About page updated!', type: 'success' });
    } catch (e) {
      showError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const resetDefaults = () => {
    if (confirm('Reset all About page content to the original defaults? (Not saved until you click Save)')) {
      setC(mergeAbout({}));
    }
  };

  const SaveBtn = ({ big }) => (
    <button onClick={save} disabled={saving}
      className={`flex items-center gap-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition ${big ? 'px-8 py-3' : 'px-5 py-2.5 text-sm'}`}>
      {saved ? <><FiCheck /> Saved!</> : <><FiSave /> {saving ? 'Saving…' : 'Save Changes'}</>}
    </button>
  );

  return (
    <div className="pb-24">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2"><FiInfo /> About Page</h1>
          <p className="text-gray-500 text-sm mt-1">Kamala Devi — edit every section of the About Us page</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <a href="/kamaladevirajjuprasad/aboutus" target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <FiExternalLink /> Preview
          </a>
          <button onClick={resetDefaults}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            <FiRotateCcw /> Defaults
          </button>
          <SaveBtn />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 text-blue-800 text-xs rounded-xl px-4 py-3 mb-5">
        💡 <b>Leadership</b> photos & messages come from <a href="/admin/management" className="underline font-bold">Management</a>, and the facility cards come from <a href="/admin/facilities" className="underline font-bold">Facilities</a> (Kamala school). Icons are emojis — paste any emoji 🎓📚⚽.
      </div>

      <div className="space-y-4">
        <Section title="🏞️ Hero Banner" hint="Top banner text and background photo" defaultOpen>
          <Field label="Badge" value={c.hero.badge} onChange={setIn('hero', 'badge')} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Title — first part" value={c.hero.title_line1} onChange={setIn('hero', 'title_line1')} />
            <Field label="Title — highlighted (orange)" value={c.hero.title_highlight} onChange={setIn('hero', 'title_highlight')} />
            <Field label="Title — last part" value={c.hero.title_line2} onChange={setIn('hero', 'title_line2')} />
          </div>
          <Field label="Subtitle" area value={c.hero.subtitle} onChange={setIn('hero', 'subtitle')} />
          <ImageField label="Background photo" value={c.hero.image} onChange={setIn('hero', 'image')} onError={showError} />
        </Section>

        <Section title="📊 Stats Card" hint="Numbers shown on the white card under the banner">
          <ObjectList items={c.stats} onChange={(v) => setTop('stats', v)} addLabel="Add stat"
            blank={{ icon: '⭐', value: '', label: '' }}
            fields={[{ key: 'icon', label: 'Icon', icon: true }, { key: 'value', label: 'Value (e.g. 1500+)' }, { key: 'label', label: 'Label' }]} />
        </Section>

        <Section title="🏫 Introduction" hint="Photo collage + school description">
          <Field label="Small heading" value={c.intro.eyebrow} onChange={setIn('intro', 'eyebrow')} />
          <div className={grid2}>
            <Field label="Title" value={c.intro.title} onChange={setIn('intro', 'title')} />
            <Field label="Title — blue part" value={c.intro.title_highlight} onChange={setIn('intro', 'title_highlight')} />
          </div>
          <Field label="Paragraph 1" area rows={4} value={c.intro.text} onChange={setIn('intro', 'text')} />
          <Field label="Paragraph 2" area rows={3} value={c.intro.text2} onChange={setIn('intro', 'text2')} />
          <StringList label="Checkmark points" items={c.intro.points} onChange={setIn('intro', 'points')} addLabel="Add point" />
          <div className={grid2}>
            <ImageField label="Main photo" value={c.intro.image_main} onChange={setIn('intro', 'image_main')} onError={showError} />
            <ImageField label="Small overlapping photo" value={c.intro.image_small} onChange={setIn('intro', 'image_small')} onError={showError} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Badge title" value={c.intro.badge_title} onChange={setIn('intro', 'badge_title')} />
            <Field label="Badge subtitle" value={c.intro.badge_sub} onChange={setIn('intro', 'badge_sub')} />
            <Field label="Phone" value={c.intro.phone} onChange={setIn('intro', 'phone')} />
          </div>
        </Section>

        <Section title="👔 Leadership Heading" hint="People & messages are managed in Management">
          <div className={grid2}>
            <Field label="Small heading" value={c.leadership.eyebrow} onChange={setIn('leadership', 'eyebrow')} />
            <Field label="Title" value={c.leadership.title} onChange={setIn('leadership', 'title')} />
          </div>
          <Field label="Subtitle" value={c.leadership.subtitle} onChange={setIn('leadership', 'subtitle')} />
        </Section>

        <Section title="✨ Why Choose Us" hint="Dark section with feature cards">
          <div className={grid2}>
            <Field label="Small heading" value={c.features_heading.eyebrow} onChange={setIn('features_heading', 'eyebrow')} />
            <Field label="Subtitle" value={c.features_heading.subtitle} onChange={setIn('features_heading', 'subtitle')} />
            <Field label="Title" value={c.features_heading.title} onChange={setIn('features_heading', 'title')} />
            <Field label="Title — highlighted" value={c.features_heading.title_highlight} onChange={setIn('features_heading', 'title_highlight')} />
          </div>
          <ObjectList items={c.features} onChange={(v) => setTop('features', v)} addLabel="Add feature"
            blank={{ icon: '⭐', title: '', desc: '' }}
            fields={[{ key: 'icon', label: 'Icon', icon: true }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', area: true, full: true }]} />
        </Section>

        <Section title="🪜 Teaching Approach" hint="Numbered steps">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Small heading" value={c.approach_heading.eyebrow} onChange={setIn('approach_heading', 'eyebrow')} />
            <Field label="Title" value={c.approach_heading.title} onChange={setIn('approach_heading', 'title')} />
            <Field label="Subtitle" value={c.approach_heading.subtitle} onChange={setIn('approach_heading', 'subtitle')} />
          </div>
          <ObjectList items={c.approach} onChange={(v) => setTop('approach', v)} addLabel="Add step"
            blank={{ icon: '⭐', title: '', desc: '' }}
            fields={[{ key: 'icon', label: 'Icon', icon: true }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', area: true, full: true }]} />
        </Section>

        <Section title="🚀 Mission, Vision & Values">
          <div className={grid2}>
            <div className="space-y-3">
              <Field label="Mission title" value={c.mission.title} onChange={setIn('mission', 'title')} />
              <StringList label="Mission points" items={c.mission.items} onChange={setIn('mission', 'items')} addLabel="Add mission point" />
            </div>
            <div className="space-y-3">
              <Field label="Vision title" value={c.vision.title} onChange={setIn('vision', 'title')} />
              <StringList label="Vision points" items={c.vision.items} onChange={setIn('vision', 'items')} addLabel="Add vision point" />
            </div>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-500 mb-1.5">Core values</span>
            <ObjectList items={c.values} onChange={(v) => setTop('values', v)} addLabel="Add value"
              blank={{ icon: '⭐', label: '' }}
              fields={[{ key: 'icon', label: 'Icon', icon: true }, { key: 'label', label: 'Value', full: false }]} />
          </div>
        </Section>

        <Section title="🏢 Facilities Heading" hint="Cards are managed in Facilities">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Small heading" value={c.facilities_heading.eyebrow} onChange={setIn('facilities_heading', 'eyebrow')} />
            <Field label="Title" value={c.facilities_heading.title} onChange={setIn('facilities_heading', 'title')} />
            <Field label="Subtitle" value={c.facilities_heading.subtitle} onChange={setIn('facilities_heading', 'subtitle')} />
          </div>
        </Section>

        <Section title="❓ FAQs" hint="Questions parents often ask">
          <div className={grid2}>
            <Field label="Small heading" value={c.faq_heading.eyebrow} onChange={setIn('faq_heading', 'eyebrow')} />
            <Field label="Title" value={c.faq_heading.title} onChange={setIn('faq_heading', 'title')} />
          </div>
          <ObjectList items={c.faqs} onChange={(v) => setTop('faqs', v)} addLabel="Add question"
            blank={{ q: '', a: '' }}
            fields={[{ key: 'q', label: 'Question', full: true }, { key: 'a', label: 'Answer', area: true, rows: 3, full: true }]} />
        </Section>

        <Section title="📞 Contact Banner" hint="Bottom call-to-action">
          <div className={grid2}>
            <Field label="Small heading" value={c.cta.eyebrow} onChange={setIn('cta', 'eyebrow')} />
            <Field label="Phone (also used in FAQ)" value={c.cta.phone} onChange={setIn('cta', 'phone')} />
          </div>
          <Field label="Title" value={c.cta.title} onChange={setIn('cta', 'title')} />
          <Field label="Subtitle" value={c.cta.subtitle} onChange={setIn('cta', 'subtitle')} />
        </Section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-56 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 flex justify-end z-30">
        <SaveBtn big />
      </div>
    </div>
  );
}
