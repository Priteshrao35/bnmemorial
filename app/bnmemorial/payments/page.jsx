'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_FEE = [
  {class:'Nursery – KG',annual:'₹25,000',monthly:'₹2,500'},
  {class:'Class 1 – 5',annual:'₹35,000',monthly:'₹3,200'},
  {class:'Class 6 – 8',annual:'₹42,000',monthly:'₹3,800'},
  {class:'Class 9 – 10',annual:'₹50,000',monthly:'₹4,500'},
  {class:'Class 11 – 12',annual:'₹58,000',monthly:'₹5,200'},
];

const D_MODES = [
  {icon:'🏦',title:'Online Transfer / NEFT',desc:'Transfer directly to school bank account. Contact admin for account details.'},
  {icon:'💳',title:'Online Portal',desc:'Pay fee through our secure online payment portal using credit/debit card or UPI.'},
  {icon:'🏢',title:'School Counter',desc:'Pay in cash or cheque at the school fee counter during office hours.'},
];

export default function Payments() {
  const [fees, setFees] = useState([]);
  const [modes, setModes] = useState([]);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`${API}/apis/pages/fee-structure/`)
      .then(r=>r.json())
      .then(d=>{
        setFees(Array.isArray(d.fees)&&d.fees.length?d.fees:D_FEE);
        setModes(Array.isArray(d.modes)&&d.modes.length?d.modes:D_MODES);
        setInfo(d||{});
      })
      .catch(()=>{setFees(D_FEE);setModes(D_MODES);});
  }, []);

  return (
    <BNPage hero={{ badge:'Fee & Payments', title:'Fee Structure & Payments', sub:'Transparent fee structure and convenient payment options' }}>
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        {/* Fee table */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Annual Fee Structure {info.year||'2025–26'}</h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3">
              {['Class / Grade','Annual Fee','Monthly Fee'].map(h=>(
                <p key={h} className="font-black text-white text-sm">{h}</p>
              ))}
            </div>
            <div className="divide-y divide-gray-50">
              {fees.map((f,i)=>(
                <div key={i} className={`grid grid-cols-3 px-6 py-4 hover:bg-blue-50/50 transition-colors ${i%2===0?'bg-white':'bg-gray-50/50'}`}>
                  <p className="text-gray-700 text-sm font-semibold">{f.class||f.grade}</p>
                  <p className="text-blue-700 text-sm font-black">{f.annual}</p>
                  <p className="text-gray-700 text-sm font-black">{f.monthly}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-xs text-center mt-3">* Fees subject to revision. Includes tuition + composite charges. Transport fee separate.</p>
        </div>

        {/* Payment modes */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Payment Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {modes.map((m,i)=>(
              <div key={i} className="bg-blue-50 rounded-2xl p-5 border border-blue-100 text-center">
                <div className="text-4xl mb-3">{m.icon}</div>
                <h3 className="font-black text-blue-900 text-sm mb-1">{m.title}</h3>
                <p className="text-gray-600 text-xs">{m.desc||m.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/bnmemorial/feepayment"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black px-8 py-4 rounded-2xl hover:opacity-90 transition shadow-xl shadow-blue-200">
            Pay Fee Online →
          </Link>
        </div>
      </div>
    </BNPage>
  );
}
