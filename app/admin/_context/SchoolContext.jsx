'use client';
import { createContext, useContext, useState, useEffect } from 'react';

export const SCHOOLS = {
  kamala: {
    key:      'kamala',
    label:    'Kamala Devi Rajju Prasad',
    short:    'KD College',
    color:    'from-blue-900 via-blue-800 to-indigo-900',
    accent:   '#3b82f6',
    site:     '/',
    apiParam: 'kamala',
  },
  bnmemorial: {
    key:      'bnmemorial',
    label:    'BN Memorial School',
    short:    'BN Memorial',
    color:    'from-emerald-900 via-emerald-800 to-teal-900',
    accent:   '#10b981',
    site:     '/bnmemorial',
    apiParam: 'bnmemorial',
  },
};

const SchoolContext = createContext({
  school: SCHOOLS.kamala,
  setSchool: () => {},
});

export function SchoolProvider({ children }) {
  const [school, setSchoolState] = useState(SCHOOLS.kamala);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('admin_school');
      if (saved && SCHOOLS[saved]) setSchoolState(SCHOOLS[saved]);
    } catch {}
  }, []);

  const setSchool = (key) => {
    if (!SCHOOLS[key]) return;
    setSchoolState(SCHOOLS[key]);
    try { localStorage.setItem('admin_school', key); } catch {}
  };

  return (
    <SchoolContext.Provider value={{ school, setSchool }}>
      {children}
    </SchoolContext.Provider>
  );
}

export const useSchool = () => useContext(SchoolContext);
