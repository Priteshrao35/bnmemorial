'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

const FALLBACK = [
  { id: 1, Main_Baner_Image: '/cover.jpg' },
  { id: 2, Main_Baner_Image: '/cover2.jpg' },
];

export default function MainSlider() {
  const [banners, setBanners] = useState([]);
  const [ready, setReady]     = useState(false);

  useEffect(() => {
    fetch(`${API}/apis/banners/`)
      .then((r) => r.json())
      .then((data) => {
        const filtered = data.filter((b) => b.category_name === 'KAMALA DEVI RAJJU PRASAD');
        setBanners(filtered.length ? filtered : FALLBACK);
      })
      .catch(() => setBanners(FALLBACK))
      .finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="relative w-full h-[55vh] md:h-[75vh] bg-gradient-to-br from-blue-900 to-blue-950 animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="h-8 bg-white/10 rounded-xl w-64 mb-4" />
          <div className="h-5 bg-white/10 rounded-xl w-48 mb-6" />
          <div className="flex gap-3">
            <div className="h-11 bg-white/10 rounded-full w-36" />
            <div className="h-11 bg-white/10 rounded-full w-36" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-blue-950 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={banners.length > 1}
        className="w-full h-[55vh] md:h-[80vh]"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={banner.id}>
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={banner.Main_Baner_Image}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-lg">
                    🎓 Admissions Open 2025-26
                  </div>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-3 drop-shadow-lg">
                    Best For<br />
                    <span className="text-orange-400">Education</span>
                  </h1>
                  <p className="text-blue-100 text-sm sm:text-base mb-6 leading-relaxed max-w-md">
                    Kamala Devi Rajju Prasad — shaping young minds with CBSE excellence,
                    modern infrastructure &amp; holistic development since 1999.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/admission"
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-orange-900/30 hover:scale-105 transition-all duration-200">
                      Apply Now →
                    </Link>
                    <Link href="/kamaladevirajjuprasad/aboutus"
                      className="inline-flex items-center gap-2 bg-white/15 backdrop-blur hover:bg-white/25 border border-white/30 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-200">
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating info strip */}
      <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:block">
        <div className="max-w-7xl mx-auto px-10 pb-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl grid grid-cols-4 divide-x divide-gray-100">
            {[
              { icon: '🎓', label: 'CBSE Affiliated', sub: 'Classes LKG – VIII' },
              { icon: '👨‍🎓', label: '1500+ Students', sub: 'Enrolled this session' },
              { icon: '🏆', label: '100% Board Result', sub: 'Consistent excellence' },
              { icon: '🏫', label: '10+ Facilities', sub: 'Modern infrastructure' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-4">
                <span className="text-3xl">{icon}</span>
                <div>
                  <p className="font-black text-gray-800 text-sm leading-tight">{label}</p>
                  <p className="text-gray-400 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
