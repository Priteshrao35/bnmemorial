const POINTS = [
  { icon: '🎯', title: 'Student-Centred Learning',    desc: 'Every lesson designed around individual needs — no student is left behind.',        grad: 'from-blue-500 to-indigo-600'   },
  { icon: '🏅', title: 'Proven Academic Excellence',  desc: '100% board results year after year, ranked best CBSE school in Agra.',              grad: 'from-amber-400 to-orange-500'  },
  { icon: '🌱', title: 'Holistic Development',         desc: 'Sports, arts, culture & life skills woven into everyday school life.',              grad: 'from-emerald-500 to-teal-600'  },
  { icon: '👩‍🏫', title: 'Experienced Faculty',        desc: '75+ dedicated educators who mentor, guide and inspire every student.',              grad: 'from-violet-500 to-purple-600' },
  { icon: '🔬', title: 'World-Class Infrastructure',   desc: 'Smart classrooms, modern labs, a rich library and a 2-acre sports campus.',         grad: 'from-cyan-500 to-blue-600'     },
  { icon: '📜', title: 'Values-Driven Education',      desc: 'Guided by 17 UN SDGs — nurturing compassionate, accountable global citizens.',      grad: 'from-rose-500 to-pink-600'     },
];

const STATS = [
  { value: '25+',  label: 'Years of Excellence' },
  { value: '5000+',label: 'Students Alumni'     },
  { value: '100%', label: 'Board Results'       },
  { value: '75+',  label: 'Expert Teachers'     },
];

export default function WhyDifferent() {
  return (
    <section className="w-full py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#f0f4ff 0%,#faf5ff 50%,#fff 100%)' }}>

      {/* Decorative bg circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 font-black text-xs px-5 py-2 rounded-full mb-4 border border-indigo-100 shadow-sm">
            ✨ Our Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">Why We Are Different</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            What sets Kamala Devi Rajju Prasad apart is our unwavering commitment to nurturing every child
            into a compassionate, self-assured, and responsible global citizen.
          </p>
          <div className="w-12 h-1 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — 6 feature points */}
          <div className="grid sm:grid-cols-2 gap-4">
            {POINTS.map(({ icon, title, desc, grad }) => (
              <div key={title}
                className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border border-gray-100 hover:border-transparent transition-all duration-300 overflow-hidden hover:-translate-y-1">

                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-2xl shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {icon}
                </div>

                <p className="font-black text-gray-800 text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* RIGHT — Mission card */}
          <div className="sticky top-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl text-white"
              style={{ background: 'linear-gradient(135deg,#1e3a8a 0%,#4f46e5 60%,#7c3aed 100%)' }}>

              {/* Blobs */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute top-1/2 right-8 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2" />

              <div className="relative z-10 p-8">
                {/* Mission badge */}
                <span className="inline-block bg-white/15 text-indigo-100 text-[10px] font-black px-4 py-1.5 rounded-full mb-5 border border-white/20 tracking-widest uppercase">
                  Our Mission
                </span>

                <h3 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
                  To Initiate,<br />
                  To Inspire &amp;<br />
                  <span className="text-blue-300">To Innovate</span>
                </h3>

                <p className="text-indigo-200 text-sm leading-relaxed mb-8">
                  Driving a learning revolution that prepares every student to lead, contribute,
                  and thrive in an ever-changing world. Join us on this exciting journey of
                  exploration, growth, and achievement!
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {STATS.map(({ value, label }) => (
                    <div key={label}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15 hover:bg-white/15 transition-colors duration-200">
                      <p className="text-white font-black text-2xl leading-none">{value}</p>
                      <p className="text-indigo-200 text-[11px] mt-1 font-semibold">{label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href="/kamaladevirajjuprasad/aboutus"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-white text-indigo-700 font-black text-sm py-3 rounded-2xl hover:bg-indigo-50 transition-colors duration-200 shadow-lg">
                  Know More About Us →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
