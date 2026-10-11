'use client';
import { useEffect, useState } from 'react';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_ITEMS = [
  {label:'School Name',value:'B.N. Memorial School'},
  {label:'Affiliation Number',value:'To be updated'},
  {label:'School Code',value:'To be updated'},
  {label:'Address',value:'Agra, Uttar Pradesh'},
  {label:'Principal Name',value:'To be updated'},
  {label:'Contact Number',value:'To be updated'},
  {label:'Email',value:'To be updated'},
  {label:'Year of Establishment',value:'1989'},
  {label:'Board of Affiliation',value:'CBSE, New Delhi'},
  {label:'Type of School',value:'Co-Educational'},
  {label:'Classes Offered',value:'Nursery to Class XII'},
  {label:'Medium of Instruction',value:'English & Hindi'},
];

export default function MandatoryDisclosure() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API}/apis/pages/mandatory-disclosure/`)
      .then(r=>r.json())
      .then(d=>{
        const arr = Array.isArray(d.items)&&d.items.length?d.items:D_ITEMS;
        setItems(arr);
      })
      .catch(()=>setItems(D_ITEMS));
  }, []);

  return (
    <BNPage hero={{ badge:'CBSE Requirement', title:'Mandatory Disclosure', sub:'Transparency in all school information as required by CBSE' }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <p className="font-black text-white text-sm uppercase tracking-wider">School Information (As per CBSE Norms)</p>
          </div>
          <div className="divide-y divide-gray-50">
            {items.map((item,i)=>(
              <div key={i} className={`flex px-6 py-4 hover:bg-blue-50/50 transition-colors ${i%2===0?'bg-white':'bg-gray-50/50'}`}>
                <span className="text-gray-500 text-sm font-semibold w-1/2">{item.label}</span>
                <span className="text-gray-900 text-sm font-black w-1/2">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          This disclosure is in compliance with CBSE affiliation bye-laws. Information updated regularly.
        </p>
      </div>
    </BNPage>
  );
}
