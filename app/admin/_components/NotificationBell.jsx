'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

const TYPE_STYLES = {
  admission:   { bg: 'bg-blue-100',   text: 'text-blue-700',   icon: '📝' },
  payment:     { bg: 'bg-green-100',  text: 'text-green-700',  icon: '💳' },
  notice:      { bg: 'bg-violet-100', text: 'text-violet-700', icon: '🔔' },
  achievement: { bg: 'bg-amber-100',  text: 'text-amber-700',  icon: '🏆' },
  event:       { bg: 'bg-sky-100',    text: 'text-sky-700',    icon: '🗓️' },
  chat:        { bg: 'bg-emerald-100',text: 'text-emerald-700',icon: '💬' },
  info:        { bg: 'bg-gray-100',   text: 'text-gray-700',   icon: 'ℹ️' },
};

export default function NotificationBell() {
  const [count, setCount]  = useState(0);
  const [open, setOpen]    = useState(false);
  const [list, setList]    = useState([]);
  const [loading, setLoad] = useState(false);
  const ref                = useRef(null);

  const fetchCount = useCallback(async () => {
    try {
      const [nr, nc] = await Promise.all([
        fetch(`${API}/apis/notifications/count/`).then(r => r.json()),
        fetch(`${API}/apis/chat/count/`).then(r => r.json()),
      ]);
      setCount((nr.unread || 0) + (nc.unread || 0));
    } catch {}
  }, []);

  const fetchList = useCallback(() => {
    setLoad(true);
    fetch(`${API}/apis/notifications/`)
      .then((r) => r.json())
      .then(setList)
      .catch(() => {})
      .finally(() => setLoad(false));
  }, []);

  // Poll every 30s
  useEffect(() => {
    fetchCount();
    const t = setInterval(fetchCount, 30000);
    return () => clearInterval(t);
  }, [fetchCount]);

  // Click outside to close
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = () => {
    setOpen((o) => !o);
    if (!open) fetchList();
  };

  const markAll = async () => {
    await fetch(`${API}/apis/notifications/read-all/`, { method: 'PUT' });
    setCount(0);
    setList((l) => l.map((n) => ({ ...n, is_read: true })));
  };

  const markOne = async (id) => {
    await fetch(`${API}/apis/notifications/${id}/read/`, { method: 'PUT' });
    setList((l) => l.map((n) => n.id === id ? { ...n, is_read: true } : n));
    setCount((c) => Math.max(0, c - 1));
  };

  const remove = async (id) => {
    await fetch(`${API}/apis/notifications/${id}/`, { method: 'DELETE' });
    setList((l) => l.filter((n) => n.id !== id));
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={toggle}
        className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-gray-800 text-sm">Notifications</span>
            {count > 0 && (
              <button onClick={markAll} className="text-xs text-blue-600 hover:underline font-medium">
                Mark all read
              </button>
            )}
          </div>

          {/* Chat shortcut */}
          <Link href="/admin/chat" onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 transition border-b border-emerald-100">
            <span className="text-sm">💬</span>
            <span className="text-xs font-bold text-emerald-700">Open Chat Inbox</span>
          </Link>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {loading && <div className="p-4 text-center text-sm text-gray-400 animate-pulse">Loading…</div>}
            {!loading && list.length === 0 && (
              <div className="p-6 text-center text-gray-400 text-sm">No notifications</div>
            )}
            {list.map((n) => {
              const style = TYPE_STYLES[n.ntype] || TYPE_STYLES.info;
              return (
                <div key={n.id}
                  className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer ${!n.is_read ? 'bg-blue-50/40' : ''}`}
                  onClick={() => !n.is_read && markOne(n.id)}>
                  <span className={`${style.bg} ${style.text} w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 mt-0.5`}>
                    {style.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${!n.is_read ? 'text-gray-900' : 'text-gray-600'} leading-tight`}>{n.title}</p>
                    {n.message && <p className="text-[11px] text-gray-400 mt-0.5 truncate">{n.message}</p>}
                    <p className="text-[10px] text-gray-300 mt-1">{n.created_at}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                    className="text-gray-300 hover:text-red-400 transition text-xs flex-shrink-0 mt-0.5">✕</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
