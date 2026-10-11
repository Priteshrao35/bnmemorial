'use client';
import Navbar from '../homepage/navbar';
import FooterSection from '../homepage/footer_section';

export default function BNPage({ children, hero }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {hero && (
        <div className="relative overflow-hidden text-center py-16 px-6"
          style={{ background: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 60%, #2563eb 100%)' }}>
          <div className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: 'radial-gradient(#93c5fd 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"
            style={{ background: 'radial-gradient(circle,#60a5fa,transparent)' }} />
          <div className="relative z-10 max-w-3xl mx-auto">
            {hero.badge && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur text-white text-xs font-black uppercase tracking-[2px] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                {hero.badge}
              </span>
            )}
            <h1 className="font-black text-white leading-tight mb-3" style={{ fontSize: 'clamp(32px,5vw,60px)' }}>
              {hero.title}
            </h1>
            {hero.sub && <p className="text-blue-200 text-base max-w-xl mx-auto">{hero.sub}</p>}
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" fill="none" className="w-full">
              <path d="M0 40L720 10L1440 40V40H0Z" fill="white"/>
            </svg>
          </div>
        </div>
      )}
      {children}
      <FooterSection />
    </div>
  );
}
