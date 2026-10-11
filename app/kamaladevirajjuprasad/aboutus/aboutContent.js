export const ABOUT_SLUG = 'kd-about';

export const ABOUT_DEFAULTS = {
  hero: {
    badge: 'About Us',
    title_line1: 'Knowledge, Values &',
    title_highlight: 'A Bright Future',
    title_line2: 'Start Here',
    subtitle: 'Kamala Devi Rajju Prasad Inter College — where every child gets the opportunity for excellent education and holistic development.',
    image: '/WhatsApp_Image_2024-12-09_at_7.56.46_AM.jpeg',
  },

  stats: [
    { icon: '👨‍🎓', value: '1500+', label: 'Students' },
    { icon: '👩‍🏫', value: '75+', label: 'Experienced Teachers' },
    { icon: '🏆', value: '100%', label: 'Board Results' },
    { icon: '🎓', value: 'CBSE', label: 'Affiliated School' },
  ],

  intro: {
    eyebrow: 'About the Institution',
    title: 'Kamala Devi Rajju Prasad',
    title_highlight: 'Inter College',
    text: 'Kamala Devi Rajju Prasad Inter College is a prestigious educational institution dedicated to providing excellent education and holistic development to every student. Our goal is to empower students with knowledge, values, and skills so they can become responsible citizens in the future.',
    text2: 'From LKG to Class 8, we walk alongside every child — from play-based early learning to a strong academic foundation. Small class sizes, individual attention, and regular parent-teacher communication define our identity.',
    points: [
      'Experienced and dedicated teachers',
      'Smart Class facility',
      'Safe, CCTV-equipped campus',
      'Sports and cultural activities',
      'Individual attention for every child',
      'Regular Parent-Teacher meetings',
    ],
    image_main: '/WhatsApp_Image_2024-12-09_at_7.56.46_AM.jpeg',
    image_small: '/cover.jpg',
    badge_title: 'CBSE Affiliated',
    badge_sub: 'LKG – Class 8',
    phone: '+91 98107 98015',
  },

  leadership: {
    eyebrow: 'Leadership',
    title: "Principal's Message",
    subtitle: 'Experienced leadership committed to a bright future for every student.',
  },

  features_heading: {
    eyebrow: 'Our Strengths',
    title: 'Why Choose',
    title_highlight: 'Kamala Devi',
    subtitle: 'Quality education and dedicated teachers — we inspire every student toward a bright future.',
  },
  features: [
    { icon: '📚', title: 'High Quality Education', desc: 'Our curriculum helps students achieve academic excellence. A blend of modern technology and traditional teaching methods.' },
    { icon: '⚽', title: 'Sports & Cultural Activities', desc: 'Various cultural and sports activities that aid the mental and physical development of students.' },
    { icon: '💻', title: 'Smart Class & Digital Learning', desc: 'Digital boards and audio-visual content make even difficult subjects simple and engaging.' },
    { icon: '🛡️', title: 'Safe & Clean Campus', desc: 'CCTV surveillance, trained staff and a clean environment — child safety is our top priority.' },
    { icon: '🤝', title: 'Community Contribution', desc: 'Organizing social programs and awareness campaigns to bring positive change to society.' },
    { icon: '🎯', title: 'Values & Discipline', desc: 'Educating students with ethics and discipline to make them better citizens.' },
  ],

  approach_heading: {
    eyebrow: 'Teaching Methodology',
    title: 'How We Teach',
    subtitle: 'A four-step approach based on understanding rather than rote learning.',
  },
  approach: [
    { icon: '🔍', title: 'Spark Curiosity', desc: 'Every lesson starts with a question so the child learns to think independently.' },
    { icon: '🧠', title: 'Learn by Understanding', desc: 'Concepts are clarified through activities, experiments and examples.' },
    { icon: '✍️', title: 'Regular Practice', desc: 'Worksheets, projects and weekly assessments strengthen the grasp of subjects.' },
    { icon: '🏅', title: 'Towards Excellence', desc: 'Personal feedback and encouragement bring out the full potential of every child.' },
  ],

  mission: {
    title: 'Our Mission',
    items: [
      'Provide quality education to every student.',
      'Focus on the all-round development of students.',
      'Develop a sense of ethics and social responsibility.',
      'Bring positive change to society through education.',
    ],
  },
  vision: {
    title: 'Our Vision',
    items: [
      'Make students successful in life through quality education.',
      'Promote innovation and excellence in the field of education.',
      'Increase awareness about the importance of education in society.',
      'Prepare students for the bright future of the nation.',
    ],
  },
  values: [
    { icon: '⚖️', label: 'Discipline' },
    { icon: '💎', label: 'Integrity' },
    { icon: '🌟', label: 'Excellence' },
    { icon: '🙏', label: 'Respect' },
    { icon: '💡', label: 'Innovation' },
    { icon: '❤️', label: 'Service' },
  ],

  facilities_heading: {
    eyebrow: 'Facilities',
    title: 'Campus with Modern Facilities',
    subtitle: 'Every facility needed for learning, playing and growing.',
  },

  faq_heading: {
    eyebrow: 'FAQ',
    title: "Parents' Questions",
  },
  faqs: [
    { q: 'Which classes are available at the school?', a: 'We offer LKG, UKG and Classes 1 to 8 following the CBSE curriculum.' },
    { q: 'What is the admission process?', a: 'You can fill in the online application form on the website or visit the school office. Our team will contact you after the form is submitted.' },
    { q: 'What are the school timings?', a: 'The school is open Monday to Saturday from 7:30 AM to 2:00 PM. Sunday is a holiday.' },
    { q: 'Is school transport available?', a: 'Yes, safe school bus service is available for various areas. Visit the School Transport page for route and fee details.' },
    { q: 'How do I pay the fees?', a: 'Fees can be paid online via the "Pay Fee Online" option or at the school office.' },
  ],

  cta: {
    eyebrow: 'Admissions Open 2025-26',
    title: 'Contact us for more information',
    subtitle: 'We are ready to answer all your questions.',
    phone: '+91 98107 98015',
  },
};

// Saved content may be missing sections added later; fill gaps from defaults.
export function mergeAbout(saved) {
  const out = { ...ABOUT_DEFAULTS };
  if (!saved || typeof saved !== 'object') return out;
  for (const key of Object.keys(ABOUT_DEFAULTS)) {
    const def = ABOUT_DEFAULTS[key];
    const val = saved[key];
    if (val === undefined || val === null) continue;
    if (Array.isArray(def)) out[key] = Array.isArray(val) ? val : def;
    else if (typeof def === 'object') out[key] = { ...def, ...val };
    else out[key] = val;
  }
  return out;
}
