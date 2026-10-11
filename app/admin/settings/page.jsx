'use client';
import { useEffect, useState, useCallback } from 'react';
import { FiSettings, FiSave, FiCheck } from 'react-icons/fi';
import Toast from '../_components/Toast';

const API = process.env.NEXT_PUBLIC_API_URL;

const GROUPS = [
  { key: 'general', label: '🏫 General', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { key: 'contact', label: '📞 Contact & Timings', color: 'bg-green-50 border-green-200 text-green-700' },
  { key: 'social',  label: '📱 Social Media', color: 'bg-pink-50 border-pink-200 text-pink-700' },
  { key: 'stats',   label: '📊 Stats & Numbers', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { key: 'about',   label: '📝 About Text', color: 'bg-violet-50 border-violet-200 text-violet-700' },
];

const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({});
  const [meta, setMeta]         = useState({});
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [toast, setToast]       = useState(null);

  const load = useCallback(() => {
    fetch(`${API}/apis/settings/`)
      .then((r) => r.json())
      .then((arr) => {
        const vals = {}, m = {};
        arr.forEach((s) => { vals[s.key] = s.value; m[s.key] = s; });
        setSettings(vals);
        setMeta(m);
      })
      .catch(() => {});
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = (key, val) => setSettings((s) => ({ ...s, [key]: val }));

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch(`${API}/apis/settings/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!r.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setToast({ message: 'Settings saved!', type: 'success' });
    } catch {
      setToast({ message: 'Save failed', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const isTextarea = (key) => key.startsWith('about') || key === 'address' || key === 'tagline';

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2"><FiSettings /> Site Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Control all dynamic content across both school websites</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition">
          {saved ? <><FiCheck /> Saved!</> : <><FiSave /> {saving ? 'Saving…' : 'Save All'}</>}
        </button>
      </div>

      <div className="space-y-6">
        {GROUPS.map(({ key: gKey, label, color }) => {
          const items = Object.values(meta).filter((m) => m.group === gKey);
          if (!items.length) return null;
          return (
            <div key={gKey} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className={`px-5 py-3 border-b ${color} border font-bold text-sm`}>{label}</div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((m) => (
                  <div key={m.key} className={isTextarea(m.key) ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">{m.label}</label>
                    {isTextarea(m.key) ? (
                      <textarea
                        value={settings[m.key] || ''}
                        onChange={(e) => set(m.key, e.target.value)}
                        rows={3} className={`${inp} resize-none`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={settings[m.key] || ''}
                        onChange={(e) => set(m.key, e.target.value)}
                        className={inp}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 transition">
          {saved ? <><FiCheck /> All Saved!</> : <><FiSave /> {saving ? 'Saving…' : 'Save All Changes'}</>}
        </button>
      </div>
    </div>
  );
}
