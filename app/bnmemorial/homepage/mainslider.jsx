'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay, Navigation, EffectFade } from 'swiper/modules';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

/* Static slide data — overlays on each banner image */
const SLIDES_META = [
  {
    badge: '🏆 CBSE Affiliated School',
    title: 'B.N. Memorial',
    subtitle: 'Senior Secondary School',
    desc: 'Shaping confident, compassionate leaders for Classes 6–12 through world-class education and holistic development.',
  },
  {
    badge: '📚 Academic Excellence',
    title: 'Where Knowledge',
    subtitle: 'Meets Ambition',
    desc: '100% board results year after year — our students excel in Science, Commerce and Arts streams.',
  },
  {
    badge: '🌟 Holistic Development',
    title: 'Beyond Academics',
    subtitle: 'Building Champions',
    desc: 'Sports, cultural events, NCC, Scouts & Guides — we nurture every dimension of student potential.',
  },
];

/* Fallback slides when no banners are uploaded */
const FALLBACK_SLIDES = [
  { grad: 'from-blue-950 via-blue-900 to-indigo-900', ...SLIDES_META[0] },
  { grad: 'from-indigo-950 via-purple-900 to-blue-900', ...SLIDES_META[1] },
  { grad: 'from-slate-900 via-blue-950 to-indigo-900', ...SLIDES_META[2] },
];

function SlideContent({ meta }) {
  return (
    <div className="relative z-10 flex items-center h-full w-full">
      <div className="w-full px-6 sm:px-12 lg:px-24 py-8 max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-black px-4 py-2 rounded-full mb-6 shadow-lg">
          {meta.badge}
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-1 drop-shadow-xl">
          {meta.title}
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-300 leading-tight mb-4 drop-shadow-xl">
          {meta.subtitle}
        </h2>

        {/* Divider */}
        <div className="w-14 h-1 bg-orange-400 rounded-full mb-4" />

        {/* Description */}
        <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-xl drop-shadow">
          {meta.desc}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link href="/admission"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-7 py-3.5 rounded-full shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-0.5">
            Apply Now →
          </Link>
          <Link href="/bnmemorial#about"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm px-7 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300">
            Know More
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 mt-5">
          {[
            { v: '35+', l: 'Years' },
            { v: '3500+', l: 'Students' },
            { v: '100%', l: 'Results' },
          ].map(({ v, l }) => (
            <div key={l}>
              <p className="text-xl sm:text-2xl font-black text-white">{v}</p>
              <p className="text-blue-300 text-xs font-semibold">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MainSlider() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/apis/banners/`)
      .then(r => r.json())
      .then(data => setBanners(data.filter(b => b.category_name === 'BN MEMORIAL')))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const hasBanners = banners.length > 0;

  return (
    <>
      <section className="w-full" style={{ height: '72vh', minHeight: 460 }}>
        <Swiper
          effect="fade"
          spaceBetween={0}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay, Navigation, EffectFade]}
          className="w-full h-full bn-hero-swiper"
        >
          {loading ? (
            <SwiperSlide>
              <div className="w-full h-full bg-gradient-to-br from-blue-950 to-indigo-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin" />
              </div>
            </SwiperSlide>
          ) : hasBanners ? (
            banners.map((banner, i) => {
              const meta = SLIDES_META[i % SLIDES_META.length];
              return (
                <SwiperSlide key={banner.id}>
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Background image */}
                    <img
                      src={banner.Main_Baner_Image}
                      alt={`Slide ${banner.id}`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <SlideContent meta={meta} />
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            FALLBACK_SLIDES.map((slide, i) => (
              <SwiperSlide key={i}>
                <div className={`relative w-full h-full bg-gradient-to-br ${slide.grad} overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  <SlideContent meta={slide} />
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </section>

      <style jsx global>{`
        .bn-hero-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4);
          width: 8px; height: 8px;
          opacity: 1;
        }
        .bn-hero-swiper .swiper-pagination-bullet-active {
          background: #f97316;
          width: 24px;
          border-radius: 4px;
        }
        .bn-hero-swiper .swiper-button-next,
        .bn-hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          width: 44px; height: 44px;
          border-radius: 50%;
        }
        .bn-hero-swiper .swiper-button-next:after,
        .bn-hero-swiper .swiper-button-prev:after {
          font-size: 14px; font-weight: 900;
        }
        .bn-hero-swiper .swiper-button-next:hover,
        .bn-hero-swiper .swiper-button-prev:hover {
          background: rgba(249,115,22,0.8);
        }
        .bn-hero-swiper .swiper-pagination {
          bottom: 20px;
        }
      `}</style>
    </>
  );
}
