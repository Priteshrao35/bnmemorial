'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { FiRefreshCw, FiSend, FiTrash2, FiSearch, FiImage, FiX, FiChevronDown } from 'react-icons/fi';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Rewrite stored image URLs to point to current API server (handles dev vs prod mismatch)
const fixImgUrl = (url) => {
  if (!url) return url;
  const mediaIdx = url.indexOf('/media/');
  if (mediaIdx !== -1) return `${API}${url.slice(mediaIdx)}`;
  return url;
};

const SCHOOL_LABEL = { kamala: 'Kamala Devi', bnmemorial: 'BN Memorial' };
const SCHOOL_COLOR = { kamala: 'text-violet-600', bnmemorial: 'text-blue-600' };

function timeStr(ts) {
  if (!ts) return '';
  try {
    const d = new Date(ts.replace(' ', 'T'));
    if (isNaN(d)) return ts.slice(11, 16) || '';
    const now = new Date();
    const diffDays = Math.floor((now - d) / 86400000);
    if (diffDays === 0) return d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
    if (diffDays === 1) return 'Yesterday';
    return d.toLocaleDateString('en', { day: 'numeric', month: 'short' });
  } catch { return ''; }
}

export default function ChatInbox() {
  const [sessions,  setSessions]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState(null);
  const [thread,    setThread]    = useState([]);
  const [threadLoading, setTL]    = useState(false);
  const [reply,     setReply]     = useState('');
  const [imgFile,   setImgFile]   = useState(null);
  const [imgPreview,setImgPreview]= useState(null);
  const [lightbox,  setLightbox]  = useState(null); // full-screen image URL
  const [sending,   setSending]   = useState(false);
  const [search,    setSearch]    = useState('');
  const [filter,    setFilter]    = useState('all');
  const [menuMsg,   setMenuMsg]   = useState(null); // id of message whose menu is open
  const [selectedMsgs, setSelectedMsgs] = useState(new Set()); // selected message ids
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const fileRef   = useRef(null);

  /* ── load sessions ── */
  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/apis/chat/sessions/`);
      const d = await r.json();
      setSessions(Array.isArray(d) ? d : []);
    } catch { setSessions([]); }
    setLoading(false);
  }, []);

  useEffect(() => { loadSessions(); }, [loadSessions]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread]);

  /* ── open conversation ── */
  const openSession = async (s) => {
    setSelected(s);
    setThread([]);
    setReply('');
    setImgFile(null);
    setImgPreview(null);
    setMenuMsg(null);
    clearSelection();
    setTL(true);
    try {
      const r = await fetch(`${API}/apis/chat/session/${encodeURIComponent(s.session_id)}/`);
      const d = await r.json();
      setThread(Array.isArray(d) ? d : []);
      setSessions(prev => prev.map(x =>
        x.session_id === s.session_id ? { ...x, unread_count: 0 } : x
      ));
    } catch (e) {
      console.error('Thread load error:', e);
      setThread([]);
    }
    setTL(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  /* ── pick image ── */
  const pickImg = (file) => {
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = e => setImgPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  /* ── send reply ── */
  const sendReply = async () => {
    const text = reply.trim();
    if ((!text && !imgFile) || !selected || sending) return;

    setSending(true);
    const sentText = text;
    const sentPreview = imgPreview;
    setReply('');
    setImgFile(null);
    setImgPreview(null);

    const fd = new FormData();
    fd.append('message', sentText);
    if (imgFile) fd.append('image', imgFile);

    try {
      const r = await fetch(
        `${API}/apis/chat/session/${encodeURIComponent(selected.session_id)}/reply/`,
        { method: 'POST', body: fd }
      );
      if (r.ok) {
        const newMsg = await r.json();
        // Show admin message immediately in thread
        setThread(prev => [...prev, {
          ...newMsg,
          image_url: sentPreview && imgFile ? (newMsg.image_url || sentPreview) : (newMsg.image_url || ''),
        }]);
        setSessions(prev => prev.map(x =>
          x.session_id === selected.session_id
            ? { ...x, has_reply: true, last_message: sentText || '📷 Image' }
            : x
        ));
      }
    } catch (e) { console.error('Reply error:', e); }

    setSending(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  /* ── select / deselect message ── */
  const toggleSelect = (id) => {
    if (id == null) return;
    setSelectedMsgs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setMenuMsg(null);
  };

  const clearSelection = () => setSelectedMsgs(new Set());

  /* ── delete single message ── */
  const deleteMessage = async (msgId) => {
    if (!confirm('Delete this message?')) return;
    await fetch(`${API}/apis/chat/${msgId}/`, { method: 'DELETE' });
    setThread(prev => prev.filter(m => m.id !== msgId));
    setMenuMsg(null);
  };

  /* ── delete selected messages ── */
  const deleteSelected = async () => {
    if (!selectedMsgs.size) return;
    if (!confirm(`Delete ${selectedMsgs.size} message(s)?`)) return;
    await Promise.all([...selectedMsgs].map(id =>
      fetch(`${API}/apis/chat/${id}/`, { method: 'DELETE' })
    ));
    setThread(prev => prev.filter(m => !selectedMsgs.has(m.id)));
    clearSelection();
  };

  /* ── delete session ── */
  const deleteSession = async (sid, e) => {
    e?.stopPropagation();
    if (!confirm('Delete this conversation?')) return;
    await fetch(`${API}/apis/chat/session/${encodeURIComponent(sid)}/`, { method: 'DELETE' });
    setSessions(prev => prev.filter(x => x.session_id !== sid));
    if (selected?.session_id === sid) { setSelected(null); setThread([]); }
  };

  /* ── filter ── */
  const visible = sessions.filter(s => {
    if (filter === 'unread' && !s.unread_count) return false;
    if (filter === 'kamala' && s.school !== 'kamala') return false;
    if (filter === 'bn' && s.school !== 'bnmemorial') return false;
    if (search && !s.sender.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalUnread = sessions.reduce((n, s) => n + (s.unread_count || 0), 0);

  /* ════════════════════════════════ RENDER ════════════════════════════════ */
  return (
    <>
    <div className="flex bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
      style={{ height: 'calc(100vh - 80px)' }}>

      {/* ── LEFT PANEL ── */}
      <div className="w-80 flex-shrink-0 flex flex-col border-r border-gray-100">

        <div className="px-4 pt-3 pb-2 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-black text-gray-800 flex items-center gap-2">
              Chats
              {totalUnread > 0 && (
                <span className="text-[10px] font-black bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                  {totalUnread}
                </span>
              )}
            </h2>
            <button onClick={loadSessions}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 transition">
              <FiRefreshCw size={13} />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5 mb-2">
            <FiSearch size={13} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-300" />
          </div>
          <div className="flex gap-1">
            {[['all','All'],['unread','Unread'],['kamala','KD'],['bn','BNM']].map(([v,l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                  filter === v ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="p-6 text-center text-gray-300 text-sm">Loading…</p>
          ) : visible.length === 0 ? (
            <div className="p-8 text-center text-gray-300">
              <p className="text-3xl mb-1">💬</p>
              <p className="text-sm">No conversations</p>
            </div>
          ) : visible.map(s => (
            <div key={s.session_id}
              onClick={() => openSession(s)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 hover:bg-gray-50 transition relative group ${
                selected?.session_id === s.session_id
                  ? 'bg-green-50 border-l-4 border-l-green-500'
                  : ''
              }`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-black flex-shrink-0 shadow-sm">
                {(s.sender || '?')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-bold truncate ${s.unread_count ? 'text-gray-900' : 'text-gray-600'}`}>
                    {s.sender}
                  </p>
                  <span className="text-[10px] text-gray-400 ml-1 flex-shrink-0">{timeStr(s.last_time)}</span>
                </div>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {s.has_reply && <span className="text-green-500 mr-1">✓</span>}
                  {s.last_image && !s.last_message ? '📷 Image' : (s.last_message || '')}
                </p>
                <span className={`text-[9px] font-semibold ${SCHOOL_COLOR[s.school] || 'text-gray-400'}`}>
                  {SCHOOL_LABEL[s.school] || s.school}
                </span>
              </div>
              {s.unread_count > 0 && (
                <span className="absolute right-3 bottom-3 min-w-[18px] h-[18px] bg-green-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">
                  {s.unread_count > 9 ? '9+' : s.unread_count}
                </span>
              )}
              <button onClick={e => deleteSession(s.session_id, e)}
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition">
                <FiTrash2 size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      {!selected ? (
        <div className="flex-1 flex items-center justify-center"
          style={{ backgroundColor: '#f0fdf4' }}>
          <div className="text-center">
            <p className="text-6xl mb-3">💬</p>
            <p className="text-gray-400 font-semibold">Select a conversation</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: '#f0fdf4' }}>

          {/* header */}
          <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-black shadow">
                {(selected.sender || '?')[0].toUpperCase()}
              </div>
              <div>
                <p className="font-black text-gray-800 text-sm leading-tight">{selected.sender}</p>
                <p className={`text-xs font-semibold ${SCHOOL_COLOR[selected.school] || 'text-gray-400'}`}>
                  {SCHOOL_LABEL[selected.school] || selected.school}
                </p>
              </div>
            </div>
            <button onClick={e => deleteSession(selected.session_id, e)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-400 hover:bg-red-50 rounded-lg transition">
              <FiTrash2 size={12} /> Delete
            </button>
          </div>

          {/* selected messages bar */}
          {selectedMsgs.size > 0 && (
            <div className="flex items-center justify-between px-4 py-2 bg-blue-50 border-b border-blue-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={clearSelection}
                  className="w-6 h-6 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition">
                  <FiX size={12} className="text-blue-700" />
                </button>
                <span className="text-sm font-bold text-blue-700">{selectedMsgs.size} selected</span>
              </div>
              <button onClick={deleteSelected}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition shadow-sm">
                <FiTrash2 size={12} /> Delete
              </button>
            </div>
          )}

          {/* messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
            onClick={() => { setMenuMsg(null); }}>
            {threadLoading ? (
              <div className="flex justify-center pt-10">
                <span className="bg-white/90 px-4 py-1.5 rounded-full text-sm text-gray-400 shadow-sm">
                  Loading…
                </span>
              </div>
            ) : thread.length === 0 ? (
              <div className="flex justify-center pt-10">
                <span className="bg-white/90 px-4 py-1.5 rounded-full text-sm text-gray-400 shadow-sm">
                  No messages
                </span>
              </div>
            ) : (
              <>
                {/* date label */}
                <div className="flex justify-center mb-2">
                  <span className="bg-white/90 text-gray-400 text-[10px] px-3 py-1 rounded-full shadow-sm">
                    {thread[0]?.created_at?.slice(0, 10) || 'Today'}
                  </span>
                </div>

                {thread.map((m, idx) => {
                  const isAdmin = m.sender === 'Admin';
                  const hasMsg  = m.message && m.message.trim().length > 0;
                  const hasImg  = m.image_url && m.image_url.trim().length > 0;
                  const imgSrc  = fixImgUrl(m.image_url);

                  const menuOpen = menuMsg === (m.id ?? idx);

                  return (
                    <div key={`${m.id || idx}`}
                      className={`flex items-end gap-1 group/row ${isAdmin ? 'justify-end' : 'justify-start'}`}
                      onClick={() => menuOpen && setMenuMsg(null)}>

                      {/* delete menu — left side for admin, right side for guest */}
                      {!isAdmin && (
                        <div className="relative flex-shrink-0 self-center">
                          <button
                            onClick={e => { e.stopPropagation(); setMenuMsg(menuOpen ? null : (m.id ?? idx)); }}
                            className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity">
                            <FiChevronDown size={11} className="text-gray-500" />
                          </button>
                          {menuOpen && (
                            <div className="absolute left-0 top-6 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[110px]"
                              onClick={e => e.stopPropagation()}>
                              <button onClick={() => deleteMessage(m.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition">
                                <FiTrash2 size={11} /> Delete message
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`relative max-w-[68%] rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-transform ${
                          isAdmin
                            ? 'bg-green-500 rounded-tr-sm'
                            : 'bg-white border border-gray-100 rounded-tl-sm'
                        } ${selectedMsgs.has(m.id) ? 'ring-2 ring-blue-400 scale-[0.98]' : ''}`}
                        onClick={e => { e.stopPropagation(); toggleSelect(m.id); setMenuMsg(null); }}
                      >

                        {/* image thumbnail — WhatsApp style */}
                        {hasImg && (
                          <div className="relative group/img cursor-pointer"
                            style={{ width: 200, height: 160 }}
                            onClick={() => setLightbox(imgSrc)}>
                            <img
                              src={imgSrc}
                              alt="attachment"
                              className="w-full h-full object-cover block"
                              onError={e => { e.currentTarget.style.opacity = '0.3'; }}
                            />
                            {/* dark overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors" />
                            {/* download button */}
                            <a
                              href={imgSrc}
                              download
                              target="_blank"
                              rel="noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                              title="Download">
                              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </a>
                          </div>
                        )}

                        {hasMsg && (
                          <p className={`px-3 py-2 text-sm leading-relaxed ${
                            isAdmin ? 'text-white' : 'text-gray-800'
                          }`}>{m.message}</p>
                        )}

                        <p className={`px-3 pb-1.5 text-[10px] text-right ${
                          isAdmin ? 'text-green-200' : 'text-gray-400'
                        }`}>
                          {m.created_at?.slice(11, 16) || ''}
                          {isAdmin && ' ✓✓'}
                        </p>

                        {/* selected checkmark overlay */}
                        {selectedMsgs.has(m.id) && (
                          <div className="absolute inset-0 bg-blue-400/10 flex items-center justify-center pointer-events-none rounded-2xl">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* admin-side dropdown */}
                      {isAdmin && (
                        <div className="relative flex-shrink-0 self-center">
                          <button
                            onClick={e => { e.stopPropagation(); setMenuMsg(menuOpen ? null : (m.id ?? idx)); }}
                            className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity">
                            <FiChevronDown size={11} className="text-gray-500" />
                          </button>
                          {menuOpen && (
                            <div className="absolute right-0 top-6 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[110px]"
                              onClick={e => e.stopPropagation()}>
                              <button onClick={() => deleteMessage(m.id)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition">
                                <FiTrash2 size={11} /> Delete message
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
            <div ref={bottomRef} />
          </div>

          {/* image preview strip — compact WhatsApp style */}
          {imgPreview && (
            <div className="mx-3 mb-1 flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-2 py-2 flex-shrink-0">
              <div className="relative flex-shrink-0">
                <img src={imgPreview} className="w-14 h-14 rounded-lg object-cover block border border-gray-100" alt="preview" />
                <button onClick={() => { setImgFile(null); setImgPreview(null); }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition">
                  <FiX size={10} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">{imgFile?.name}</p>
                <p className="text-[10px] text-gray-400">Click send to attach</p>
              </div>
            </div>
          )}

          {/* input bar */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex items-center gap-2 flex-shrink-0">
            <input type="file" accept="image/*" className="hidden" ref={fileRef}
              onChange={e => pickImg(e.target.files[0])} />
            <button onClick={() => fileRef.current?.click()} title="Send image"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-green-600 transition flex-shrink-0">
              <FiImage size={16} />
            </button>
            <input
              ref={inputRef}
              value={reply}
              onChange={e => setReply(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendReply(); } }}
              placeholder="Type a message…"
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-green-200 transition"
            />
            <button
              onClick={sendReply}
              disabled={(!reply.trim() && !imgFile) || sending}
              className="w-9 h-9 bg-green-500 hover:bg-green-600 disabled:opacity-40 rounded-full flex items-center justify-center text-white transition shadow flex-shrink-0">
              <FiSend size={15} />
            </button>
          </div>

        </div>
      )}
    </div>
    {/* ── LIGHTBOX ── */}
    {lightbox && (
      <div
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        onClick={() => setLightbox(null)}>
        <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
          <img src={fixImgUrl(lightbox)} alt="full"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
          {/* close */}
          <button onClick={() => setLightbox(null)}
            className="absolute -top-3 -right-3 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition">
            <FiX size={16} />
          </button>
          {/* download */}
          <a href={fixImgUrl(lightbox)} download target="_blank" rel="noreferrer"
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/40 rounded-full text-white text-xs font-bold transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>
        </div>
      </div>
    )}
    </>
  );
}
