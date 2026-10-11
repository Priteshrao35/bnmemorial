'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const API = process.env.NEXT_PUBLIC_API_URL;

const INITIALS_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
];

export default function Testimonial() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/apis/testimonials/?school=bnmemorial`)
      .then(r => r.json())
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && items.length === 0) return null;

  return (
    <div className="relative py-0">
      <Swiper
        direction="vertical"
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className="w-full"
        style={{ height: '75vh', minHeight: 380 }}
      >
        {(loading ? Array(2).fill(null) : items).map((t, i) => (
          <SwiperSlide key={t?.id || i}
            className="flex bg-cover bg-center"
            style={{ backgroundImage: "url('/testimonial-bg.jpg')", backgroundColor: '#1e1b4b' }}>
            <div className="flex flex-col md:flex-row items-center w-full h-full p-6 md:px-40 gap-8">

              {/* Avatar / Photo */}
              <div className="md:w-1/3 w-full flex-shrink-0 flex justify-center">
                {t?.image ? (
                  <img src={t.image} alt={t.name}
                    className="w-52 h-52 md:w-64 md:h-64 rounded-2xl object-cover shadow-2xl" />
                ) : (
                  <div className={`w-52 h-52 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br ${INITIALS_COLORS[i % INITIALS_COLORS.length]} flex items-center justify-center shadow-2xl`}>
                    {loading ? (
                      <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse" />
                    ) : (
                      <span className="text-white font-black text-5xl">
                        {t?.name?.charAt(0) || '?'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="md:w-2/3 flex flex-col justify-center text-white text-center md:text-left">
                <img src="/quote.png" alt="quote" className="w-16 md:w-24 h-auto object-contain mx-auto md:mx-0 mb-3 opacity-80" />
                <p className="text-2xl md:text-4xl font-bold py-2 text-blue-100">What Parents Say?</p>
                {loading ? (
                  <div className="space-y-2 my-4">
                    <div className="h-4 bg-white/20 rounded animate-pulse" />
                    <div className="h-4 bg-white/20 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-white/20 rounded animate-pulse w-4/6" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm md:text-lg italic mb-4 text-blue-100 leading-relaxed">&ldquo;{t?.feedback}&rdquo;</p>

                    {/* Stars */}
                    <div className="flex justify-center md:justify-start gap-1 mb-3">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={s <= Math.round(t?.rating || 5) ? 'text-yellow-400' : 'text-white/30'}>★</span>
                      ))}
                    </div>

                    <h3 className="text-xl font-black text-white">{t?.name}</h3>
                    {t?.designation && <p className="text-blue-300 text-sm mt-1">{t.designation}</p>}
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
