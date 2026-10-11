'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function getNoticePage(notice) {
  const t = (notice.title || '').toLowerCase();
  if (t.includes('fee') || t.includes('payment'))      return '/collegefee';
  if (t.includes('admission') || t.includes('enrol'))  return '/admission';
  if (t.includes('result') || t.includes('exam'))      return '/studentDetails';
  if (t.includes('certificate'))                        return '/kamaladevirajjuprasad/certificate';
  if (t.includes('sport') || t.includes('game'))       return '/kamaladevirajjuprasad/sportacademy';
  if (t.includes('transport') || t.includes('bus'))    return '/kamaladevirajjuprasad/schooltransport';
  if (notice.link) return notice.link;
  return null;
}

export default function Noticeboard() {
  const [notices, setNotices] = useState([]);
  const [paused, setPaused]   = useState(false);
  const [error, setError]     = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/notices/`)
      .then(r => r.json())
      .then(setNotices)
      .catch(() => setError(true));
  }, []);

  return (
    <section id="notices" className="w-full">

      {/* ── Hero Banner ── */}
      <div className="w-full relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a3a8f 0%, #2563eb 50%, #1d4ed8 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />

        <div className="relative w-full px-4 sm:px-8 lg:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-2">
              WELCOME TO THE KAMALA DEVI RAJJU PRASAD
            </p>
            <h2 className="text-white font-black text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Best For Education
            </h2>
          </div>
          <Link href="/admission"
            className="flex-shrink-0 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-black text-sm px-7 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm whitespace-nowrap">
            Online Registration →
          </Link>
        </div>
      </div>

      {/* ── Horizontal live ticker ── */}
      {notices.length > 0 && (
        <div className="w-full bg-blue-950 flex items-center overflow-hidden" style={{ height: 40 }}>
          <div className="flex-shrink-0 flex items-center gap-2 bg-red-600 px-4 h-full">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="text-white font-black text-[11px] tracking-widest whitespace-nowrap">LIVE</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-14 whitespace-nowrap w-max"
              style={{ animation: 'marquee 30s linear infinite' }}>
              {[...notices, ...notices].map((n, i) => (
                <span key={i} className="text-blue-100 text-xs">
                  <span className="text-red-400 mr-1.5">▶</span>{n.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 2-column body ── */}
      <div className="w-full bg-gray-50 px-4 sm:px-8 lg:px-16 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* LEFT — About content */}
          <div>

            {/* About text block */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-6">
              <h3 className="font-black text-gray-900 text-lg uppercase mb-4">
                About Kamala Devi Rajju Prasad!
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                At <strong className="text-gray-800">Kamala Devi Rajju Prasad</strong>, we believe that a school&apos;s true worth
                is measured by how well it prepares and inspires each child on their journey toward success and accomplishment.
                We are dedicated to creating a safe and nurturing environment where every student can grow into a compassionate,
                self-assured, and responsible global citizen.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Through our innovative learning practices, <strong className="text-gray-800">Kamala Devi Rajju Prasad</strong> has
                earned its place as the leading CBSE school in Agra. Our effective teaching methods simplify complex concepts,
                making learning accessible and enjoyable for all — enabling students to explore their potential and excel in their
                chosen fields.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We embody <strong className="text-gray-800">&apos;To Initiate, To Inspire &amp; To Innovate&apos;</strong> — driving
                a learning revolution that prepares every student to lead, contribute, and thrive in an ever-changing world.
                Join us on this exciting journey of exploration, growth, and achievement!
              </p>
              <Link href="/kamaladevirajjuprasad/aboutus"
                className="text-blue-600 hover:text-blue-800 font-bold text-sm transition">
                Read More →
              </Link>
            </div>

          </div>

          {/* RIGHT — Notice Board marquee */}
          {notices.length > 0 && (
            <div className="border-2 border-blue-200 rounded-xl overflow-hidden shadow-md bg-white flex flex-col">
              {/* Card header */}
              <div className="flex items-center gap-3 px-5 py-3.5 bg-blue-950">
                <span className="text-red-400 text-lg">🔔</span>
                <h3 className="text-white font-black text-sm tracking-wide uppercase">Notice Board</h3>
                <span className="ml-auto text-[10px] text-blue-300 font-semibold">Hover to pause</span>
              </div>

              {/* Vertical marquee */}
              <div className="overflow-hidden cursor-pointer" style={{ height: 230 }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onClick={() => setPaused(p => !p)}>
                <div style={{ animation: 'scrollUp 20s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
                  {[...notices, ...notices, ...notices].map((n, i) => {
                    const page = getNoticePage(n);
                    const isNew = i % notices.length < 2;
                    return (
                      <div key={i}
                        className="flex items-start gap-3 px-5 py-3.5 border-b border-gray-100 hover:bg-blue-50 transition-colors group">
                        <span className="text-blue-600 mt-0.5 flex-shrink-0 text-xs">▶</span>
                        <div className="flex-1 min-w-0">
                          {page ? (
                            <a href={page}
                              className="text-blue-800 hover:text-blue-600 font-semibold text-sm leading-snug group-hover:underline line-clamp-2">
                              {n.title}
                            </a>
                          ) : (
                            <p className="text-gray-700 font-semibold text-sm leading-snug line-clamp-2">{n.title}</p>
                          )}
                          {n.description && (
                            <p className="text-gray-400 text-[11px] mt-0.5 line-clamp-1">{n.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {isNew && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-red-500 text-white">NEW</span>
                          )}
                          {page && (
                            <a href={page} onClick={e => e.stopPropagation()}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap">
                              View →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <Link href="/kamaladevirajjuprasad/aboutus"
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 transition">
                  View All Notices →
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
      `}</style>
    </section>
  );
}
