'use client';
import { useEffect, useState, useRef } from 'react';

const GRAD = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
];

function StaffCard({ staff, index }) {
  const initials = staff.full_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const grad = GRAD[index % GRAD.length];

  return (
    <div className="flex-shrink-0 w-52 bg-white shadow-md rounded-2xl p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      <div className={`relative w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-md overflow-hidden`}>
        {staff.Profile_Pic ? (
          <img src={staff.Profile_Pic} alt={staff.full_name} loading="lazy" className="w-full h-full object-cover object-top" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <span className="text-white font-black text-2xl">{initials}</span>
          </div>
        )}
      </div>
      <h5 className="text-sm font-black text-blue-950 leading-tight truncate">{staff.full_name}</h5>
      <p className={`text-xs font-bold mt-1 truncate bg-gradient-to-r ${grad} bg-clip-text text-transparent`}>
        {staff.position || staff.specialization}
      </p>
      <div className="mt-3 text-xs text-gray-500 space-y-1 border-t border-gray-50 pt-3">
        {staff.degree   && <p><span className="font-semibold text-gray-600">Degree:</span> {staff.degree}</p>}
        {staff.class_name && <p><span className="font-semibold text-gray-600">Class:</span> {staff.class_name}</p>}
      </div>
    </div>
  );
}

function StaffSkeleton() {
  return (
    <div className="flex-shrink-0 w-52 bg-white shadow rounded-2xl p-5 animate-pulse border border-gray-100">
      <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4" />
      <div className="h-4 bg-gray-100 rounded-full w-3/4 mx-auto mb-2" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2 mx-auto mb-3" />
      <div className="space-y-2 pt-3 border-t border-gray-50">
        <div className="h-2 bg-gray-100 rounded-full" />
        <div className="h-2 bg-gray-100 rounded-full w-4/5 mx-auto" />
      </div>
    </div>
  );
}

const MeetOurStaff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/staff/`)
      .then(r => r.json())
      .then(data => {
        const srSchool = data.filter(s => s.category === 2);
        setStaffMembers(srSchool.length > 0 ? srSchool : data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
          Our Educators
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mt-4">Meet Our Senior Faculty</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Experienced educators guiding Classes 6–12 at B.N. Memorial School.
        </p>
      </div>

      {/* Horizontal scroll row */}
      <div className="relative px-4">
        {/* Left fade */}
        <div className="absolute left-16 top-0 bottom-4 w-12 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-16 top-0 bottom-4 w-12 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />

        {/* Left arrow button */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border-2 border-blue-200 rounded-full shadow-lg flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-200"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow button */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border-2 border-blue-200 rounded-full shadow-lg flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-200"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 px-10 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <StaffSkeleton key={i} />)
            : staffMembers.map((staff, i) => <StaffCard key={staff.id} staff={staff} index={i} />)
          }
        </div>
      </div>

      {!loading && staffMembers.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-2">👩‍🏫</p>
          <p className="text-sm font-semibold">No faculty added yet.</p>
          <p className="text-xs mt-1">Add staff from Admin → Staff (Sr. School category)</p>
        </div>
      )}

      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default MeetOurStaff;
