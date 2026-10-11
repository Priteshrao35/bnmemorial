'use client';
import Link from 'next/link';
import BNPage from '../_components/BNPage';

export default function AboutKD() {
  return (
    <BNPage hero={{ badge:'Our Sister Institution', title:'Kamala Devi Rajju Prasad School', sub:'Excellence in education since 1989 — our senior sister school' }}>
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        {/* Info card */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <p className="text-gray-600 leading-relaxed">
              Kamala Devi Rajju Prasad School is our senior sister institution, operating under the same educational trust. Together, both schools share a common vision of holistic, value-based education following the CBSE curriculum.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The school offers classes from Nursery to Class XII with a strong emphasis on academics, sports, arts, and character building.
            </p>
            <Link href="/kamaladevirajjuprasad"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black px-6 py-3 rounded-xl hover:opacity-90 transition">
              Visit KD School Website →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{v:'1989',l:'Est. Year'},{v:'CBSE',l:'Board'},{v:'35+',l:'Years'},{v:'5000+',l:'Alumni'}].map((s,i)=>(
              <div key={i} className="text-center bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <p className="font-black text-blue-900 text-2xl mb-1">{s.v}</p>
                <p className="text-blue-600 text-xs font-semibold">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {icon:'🏫',title:'Senior School',desc:'Offering education from Nursery to Class XII.'},
              {icon:'🏆',title:'Academic Excellence',desc:'Consistently strong board results and achievements.'},
              {icon:'⚽',title:'Sports Academy',desc:'Multi-sport training with dedicated coaches.'},
              {icon:'🎭',title:'Arts & Culture',desc:'Rich tradition of annual events and cultural programs.'},
              {icon:'🔬',title:'Modern Labs',desc:'Well-equipped science and computer labs.'},
              {icon:'🚌',title:'Transport',desc:'GPS-enabled buses covering all major routes.'},
            ].map((f,i)=>(
              <div key={i} className="flex gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-black text-gray-900 text-sm">{f.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BNPage>
  );
}
