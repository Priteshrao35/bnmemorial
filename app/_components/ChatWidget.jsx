'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL;
const WA_NUMBER = '919170475552';

const BOT_REPLIES = {
  default: 'Thank you for your message! Our team will reply shortly. For urgent queries call us or use WhatsApp.',
  admission: 'For admissions, please visit our Admission Process page or contact the school office directly.',
  fee: 'For fee details, please visit the Payments / Fee Structure section or contact the school office.',
  result: 'Results are posted on our notice board. Please check with your class teacher for details.',
  transport: 'For school transport enquiries, visit the Transport page or contact the school office.',
  career: 'Interested in joining our staff? Submit your application through the Staff Registration page.',
};

function getAutoReply(msg) {
  const t = msg.toLowerCase();
  if (/admission|apply|enrol|class|join|register/.test(t)) return BOT_REPLIES.admission;
  if (/fee|pay|payment|challan|dues/.test(t)) return BOT_REPLIES.fee;
  if (/result|mark|exam|score|grade/.test(t)) return BOT_REPLIES.result;
  if (/bus|transport|route|vehicle|pick/.test(t)) return BOT_REPLIES.transport;
  if (/job|career|teacher|staff|vacancy|work/.test(t)) return BOT_REPLIES.career;
  return BOT_REPLIES.default;
}

function getOrCreateSessionId() {
  try {
    let sid = sessionStorage.getItem('chat_session_id');
    if (!sid) {
      sid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('chat_session_id', sid);
    }
    return sid;
  } catch { return Math.random().toString(36).slice(2); }
}

export default function ChatWidget({ school = 'kamala', whatsapp = WA_NUMBER }) {
  const [open, setOpen]           = useState(false);
  const [msgs, setMsgs]           = useState([
    { from: 'bot', text: '👋 Hello! Welcome to BN Memorial Group of Schools. How can we help you today?', ts: new Date(), img: null },
  ]);
  const [input, setInput]         = useState('');
  const [name, setName]           = useState('');
  const [nameSet, setNameSet]     = useState(false);
  const [imgFile, setImgFile]     = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [sending, setSending]     = useState(false);
  const [unread, setUnread]       = useState(0);
  const [lightbox, setLightbox]   = useState(null);
  const [adminOnline, setAdminOnline] = useState(false);
  const adminActiveRef                = useRef(false); // true = admin ne reply kiya, auto-reply band
  const sessionId                 = useRef(null);
  const bottomRef                 = useRef(null);
  const fileRef                   = useRef(null);
  const sseRef                    = useRef(null);
  const lastIdRef                 = useRef(0);

  useEffect(() => {
    sessionId.current = getOrCreateSessionId();
  }, []);

  // SSE connect — ek baar session ready hone ke baad
  useEffect(() => {
    if (!sessionId.current) return;
    const sid = sessionId.current;

    const connect = () => {
      const es = new EventSource(
        `${API}/apis/chat/stream/${sid}/?last_id=${lastIdRef.current}`
      );
      sseRef.current = es;

      es.addEventListener('message', (e) => {
        try {
          const data = JSON.parse(e.data);
          lastIdRef.current = data.id;
          setAdminOnline(true);
          adminActiveRef.current = true; // admin ne reply kiya — auto-reply band
          setMsgs(m => [...m, {
            from: 'admin',
            text: data.message,
            img:  data.image_url || null,
            ts:   new Date(data.created_at || Date.now()),
          }]);
          setUnread(u => u + 1);
        } catch {}
      });

      es.addEventListener('ping', () => setAdminOnline(true));

      es.onerror = () => {
        es.close();
        setAdminOnline(false);
        // Reconnect after 5 seconds
        setTimeout(connect, 5000);
      };
    };

    connect();
    return () => { sseRef.current?.close(); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  const addMsg = useCallback((from, text, img = null) => {
    setMsgs(m => [...m, { from, text, img, ts: new Date() }]);
  }, []);

  const pickImage = (file) => {
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = e => setImgPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => { setImgFile(null); setImgPreview(null); };

  const sendToBackend = async (text, senderName, imageFile) => {
    try {
      const fd = new FormData();
      fd.append('sender', senderName);
      fd.append('message', text || '');
      fd.append('school', school);
      fd.append('session_id', sessionId.current || '');
      if (imageFile) fd.append('image', imageFile);
      await fetch(`${API}/apis/chat/`, { method: 'POST', body: fd });
    } catch {}
  };

  const handleSend = async () => {
    const hasText  = input.trim().length > 0;
    const hasImage = !!imgFile;
    if ((!hasText && !hasImage) || sending) return;

    const txt     = input.trim();
    const imgToSend = imgFile;
    const previewToShow = imgPreview;

    // Clear immediately
    setInput('');
    clearImage();

    // Handle name capture first
    if (!nameSet) {
      if (!txt) return;
      setName(txt);
      setNameSet(true);
      addMsg('user', txt);
      setTimeout(() => addMsg('bot', `Nice to meet you, ${txt}! 😊 Please type your question or message below.`), 400);
      return;
    }

    // Add user message
    addMsg('user', txt, previewToShow);
    setSending(true);

    // Send to backend (don't await — fire and forget for speed)
    sendToBackend(txt, name || 'Guest', imgToSend);

    // Auto-reply — sirf tab jab admin active nahi hai
    const delay = imgToSend ? 1200 : 800;
    setTimeout(() => {
      if (!adminActiveRef.current) {
        if (imgToSend && !txt) {
          addMsg('bot', 'Thanks for sharing the image! Our team will review it and get back to you shortly.');
        } else {
          addMsg('bot', getAutoReply(txt));
        }
        if (!open) setUnread(u => u + 1);
      }
      setSending(false);
    }, delay);
  };

  const waUrl = `https://wa.me/${whatsapp}?text=Hello%2C%20I%20have%20a%20query%20about%20${school === 'kamala' ? 'Kamala%20Devi%20Rajju%20Prasad' : 'BN%20Memorial'}.`;

  return (
    <>
      {/* WhatsApp Button — Left */}
      <a href={waUrl} target="_blank" rel="noreferrer"
        className="fixed left-4 bottom-6 z-50 w-11 h-11 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200"
        title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Chat Button — Right */}
      <button
        onClick={() => { setOpen(o => !o); setUnread(0); }}
        className="fixed right-4 bottom-6 z-50 w-11 h-11 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200"
        title="Chat with us">
        <span className="relative flex items-center justify-center w-full h-full">
        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </>
        )}
        </span>
      </button>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-[95vw] max-h-[95vh]" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt="full" className="max-w-full max-h-[88vh] object-contain rounded-lg" />
            <button onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white text-lg leading-none">
              ×
            </button>
            <a href={lightbox} download target="_blank" rel="noreferrer"
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-white/20 hover:bg-white/40 rounded-full text-white text-xs font-bold">
              ⬇ Download
            </a>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed right-4 bottom-24 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ height: '460px' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">🏫</div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">BN Memorial Schools</p>
              <p className="text-blue-200 text-[10px] flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${adminOnline ? 'bg-green-400' : 'bg-yellow-400'}`} />
                {adminOnline ? 'Online · Typically replies instantly' : 'Connecting…'}
              </p>
            </div>
            <a href={waUrl} target="_blank" rel="noreferrer" title="Open WhatsApp"
              className="text-white/60 hover:text-white transition flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50">
            {!nameSet && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 font-medium text-center">
                Please enter your name to start chatting 👇
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] ${m.from === 'user' ? '' : 'flex items-start gap-2'}`}>
                  {(m.from === 'bot' || m.from === 'admin') && (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 ${m.from === 'admin' ? 'bg-indigo-100' : 'bg-blue-100'}`}>
                      {m.from === 'admin' ? '👨‍💼' : '🏫'}
                    </div>
                  )}
                  <div className={`rounded-2xl overflow-hidden ${
                    m.from === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : m.from === 'admin'
                      ? 'bg-indigo-50 text-gray-800 shadow-sm border border-indigo-100 rounded-bl-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}>
                    {m.img && (
                      <div className="relative group/img cursor-pointer"
                        style={{ width: 160, height: 120 }}
                        onClick={() => setLightbox(m.img)}>
                        <img src={m.img} alt="shared"
                          className="w-full h-full object-cover block" />
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors rounded-t-2xl" />
                        <a href={m.img} download target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      </div>
                    )}
                    {m.text && (
                      <div className="px-3 py-2">
                        <p className="text-sm leading-relaxed">{m.text}</p>
                        <p className={`text-[9px] mt-1 ${m.from === 'user' ? 'text-blue-200 text-right' : 'text-gray-400'}`}>
                          {m.ts.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    )}
                    {m.img && !m.text && (
                      <div className="px-2 pb-1 pt-0.5">
                        <p className={`text-[9px] ${m.from === 'user' ? 'text-blue-200 text-right' : 'text-gray-400'}`}>
                          {m.ts.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] flex-shrink-0">🏫</div>
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Image preview strip */}
          {imgPreview && (
            <div className="px-3 py-2 border-t border-gray-100 bg-white flex items-center gap-2 flex-shrink-0">
              <div className="relative">
                <img src={imgPreview} alt="preview" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                <button onClick={clearImage}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-black leading-none">
                  ✕
                </button>
              </div>
              <span className="text-xs text-gray-400 truncate flex-1">{imgFile?.name}</span>
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100 bg-white flex gap-2 items-end flex-shrink-0">
            {/* Image attach button */}
            {nameSet && (
              <button
                onClick={() => fileRef.current?.click()}
                title="Send image"
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-blue-600 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            )}
            <input type="file" accept="image/*" className="hidden" ref={fileRef}
              onChange={e => pickImage(e.target.files[0])} />

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder={nameSet ? 'Type your message…' : 'Enter your name first…'}
              className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:bg-white transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() && !imgFile}
              className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 rounded-xl flex items-center justify-center transition flex-shrink-0">
              <svg className="w-4 h-4 text-white rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
