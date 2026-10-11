'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

function Skeleton() {
  return (
    <div className="animate-pulse rounded-3xl overflow-hidden bg-white/10">
      <div className="w-full h-72 bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/20 rounded-full w-2/3 mx-auto" />
        <div className="h-3 bg-white/10 rounded-full" />
        <div className="h-3 bg-white/10 rounded-full w-4/5" />
      </div>
    </div>
  );
}

export default function ManagementTeam() {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/ourmanagement/`)
      .then(r => r.json()).then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e3a8a 50%,#1e1b4b 100%)' }}>

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="w-full px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 text-blue-200 font-black text-xs px-5 py-2 rounded-full mb-4 border border-white/20">
            👔 Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Our Management Team</h2>
          <p className="text-blue-300 text-sm mt-2">The visionaries guiding our institution forward</p>
          <div className="w-12 h-1 bg-blue-400 mx-auto mt-4 rounded-full" />
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <Skeleton key={i} />)}
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              640:  { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-12"
          >
            {data.map((item, idx) => (
              <SwiperSlide key={item.id}>
                <div className="group relative rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
                  style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}>

                  {/* Photo */}
                  <div className="relative overflow-hidden" style={{ height: 280 }}>
                    <img
                      src={item.image || '/team-2.jpg'}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Index badge */}
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-black text-xs shadow-lg">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-black text-white text-base leading-snug mb-2 group-hover:text-blue-300 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-blue-400 rounded-full mb-3 group-hover:w-16 transition-all duration-300" />
                    <p className="text-blue-200/80 text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover glow border */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 1.5px rgba(96,165,250,0.5)' }} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet { background: rgba(255,255,255,0.4) !important; }
        .swiper-pagination-bullet-active { background: #60a5fa !important; width: 20px !important; border-radius: 4px !important; }
      `}</style>
    </section>
  );
}
