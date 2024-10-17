// pages/index.js
'use client'
import Image from 'next/image';

export default function LearningEnvironment() {
  return (
    <div className="bg-white">
      <section className="w-full bg-cover bg-center" style={{ backgroundImage: 'url(/counter-bg-1.png)' }}>
        <div className="container mx-auto py-10">
          <div className="text-center py-10">
            <h2 className="mt-[-8px] mb-6 text-5xl font-bold text-white">Unique Learning Environment</h2>
            <p className="mt-2 md:px-40 text-lg text-white">
              Here is what you can expect from a house cleaning from a Handy professional. Download the app to share further cleaning details and instructions!
            </p>
          </div>

          <div className="flex flex-nowrap justify-center px-5 md:px-0">
            <CounterBox count="3,500" label="Students Enrolled" imgSrc="/counter-icon-1.png" position="up" />
            <CounterBox count="912" label="Best Awards Won" imgSrc="/counter-icon-2.png" position="down" />
            <CounterBox count="370" label="Classes Completed" imgSrc="/counter-icon-3.png" position="up" />
            <CounterBox count="648" label="Our Total Courses" imgSrc="/counter-icon-4.png" position="down" />
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes vibrate {
          0% { transform: translateY(0); }
          25% { transform: translateY(-3px); }
          50% { transform: translateY(3px); }
          75% { transform: translateY(-1px); }
          100% { transform: translateY(0); }
        }
        
        .vibrate {
          animation: vibrate 0.3s infinite;
        }
      `}</style>
    </div>
  );
}

const CounterBox = ({ count, label, imgSrc, position }) => {
  return (
    <div className={`m-5 flex flex-col items-center w-1/6 relative`}>
      <div className={`mb-2 transition-transform duration-300 transform hover:scale-110 ${position === 'up' ? '-mt-6' : 'mt-6'}`}>
        <Image
          src={imgSrc}
          alt={label}
          width={160} // Increased size
          height={160} // Increased size
          className={`filter-shadow hover:vibrate`} // Add vibrate effect on hover
        />
      </div>
      <h2 className="mb-2 text-4xl font-semibold text-white">{count}</h2>
      <p className="text-sm text-white">{label}</p>
    </div>
  );
}
