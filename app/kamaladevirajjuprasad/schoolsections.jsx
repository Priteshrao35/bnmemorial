import Link from 'next/link';

const JUNIOR = [
  { grade: 'LKG', label: 'Lower KG', emoji: '🎈' },
  { grade: 'UKG', label: 'Upper KG', emoji: '🎠' },
  { grade: 'Class 1', label: 'Grade I', emoji: '✏️' },
  { grade: 'Class 2', label: 'Grade II', emoji: '📚' },
  { grade: 'Class 3', label: 'Grade III', emoji: '🔢' },
  { grade: 'Class 4', label: 'Grade IV', emoji: '🌍' },
  { grade: 'Class 5', label: 'Grade V', emoji: '🔬' },
];

const SENIOR = [
  { grade: 'Class 6', label: 'Grade VI', emoji: '⚗️' },
  { grade: 'Class 7', label: 'Grade VII', emoji: '📐' },
  { grade: 'Class 8', label: 'Grade VIII', emoji: '💡' },
  { grade: 'Class 9', label: 'Grade IX', emoji: '🧮' },
  { grade: 'Class 10', label: 'Board Year', emoji: '🏆' },
  { grade: 'Class 11', label: 'Pre-Board', emoji: '🎯' },
  { grade: 'Class 12', label: 'Final Year', emoji: '🎓' },
];

function SectionCard({ grade, label, emoji }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <span className="text-2xl">{emoji}</span>
      <p className="font-bold text-gray-800 text-xs">{grade}</p>
      <p className="text-gray-400 text-[9px]">{label}</p>
    </div>
  );
}

export default function SchoolSections() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 pb-6">
      <div className="grid md:grid-cols-2 gap-4">

        {/* Junior School */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎈</span>
                <h2 className="text-lg font-black text-orange-800">Junior School</h2>
              </div>
              <p className="text-xs text-orange-600 font-semibold mt-0.5 ml-8">Classes LKG – V · Age 3–10</p>
            </div>
            <Link href="/admission"
              className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-orange-600 transition">
              Enrol Now
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {JUNIOR.map((g) => <SectionCard key={g.grade} {...g} />)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[['Play-Based', '🎮'], ['Activity Kits', '🎨'], ['Story Time', '📖']].map(([t, e]) => (
              <div key={t} className="bg-orange-100 rounded-xl py-2 px-1">
                <span className="text-lg">{e}</span>
                <p className="text-[10px] font-bold text-orange-700 mt-0.5">{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Senior School */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                <h2 className="text-lg font-black text-blue-900">Senior School</h2>
              </div>
              <p className="text-xs text-blue-600 font-semibold mt-0.5 ml-8">Classes VI – XII · CBSE Board</p>
            </div>
            <Link href="/admission"
              className="bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-blue-800 transition">
              Enrol Now
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {SENIOR.map((g) => <SectionCard key={g.grade} {...g} />)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[['CBSE Board', '📋'], ['Lab Sessions', '🔬'], ['Smart Class', '💻']].map(([t, e]) => (
              <div key={t} className="bg-blue-100 rounded-xl py-2 px-1">
                <span className="text-lg">{e}</span>
                <p className="text-[10px] font-bold text-blue-700 mt-0.5">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
