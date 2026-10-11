'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BNPage from '../_components/BNPage';

const API = process.env.NEXT_PUBLIC_API_URL;

const D_BLOGS = [
  { id:1, title:'How We Achieve 100% Board Results Year After Year', category:'Academics', date:'15 Sep 2025', author:'Principal Desk', excerpt:'Our structured approach to academics, regular assessments and dedicated faculty have been the cornerstone of our consistent board results.', readTime:'5 min read' },
  { id:2, title:'Annual Sports Day 2025 — A Day to Remember', category:'Events', date:'10 Aug 2025', author:'Sports Dept.', excerpt:'This year\'s Annual Sports Day witnessed record participation with over 800 students competing across 25 different sports disciplines.', readTime:'4 min read' },
  { id:3, title:'CBSE New Curriculum 2025–26: What Parents Need to Know', category:'Academics', date:'01 Jul 2025', author:'Academic Team', excerpt:'A comprehensive guide for parents on the changes introduced in the CBSE curriculum for the new academic session.', readTime:'6 min read' },
  { id:4, title:'Our Students Win 12 Medals at District Science Olympiad', category:'Achievements', date:'20 Jun 2025', author:'Science Dept.', excerpt:'B.N. Memorial students shine at the District Science Olympiad, bringing home 12 medals including 4 gold.', readTime:'3 min read' },
  { id:5, title:'Smart Classrooms: How Technology is Changing Learning', category:'Innovation', date:'05 May 2025', author:'IT Dept.', excerpt:'We explore how our newly installed smart boards and digital labs are transforming the teaching and learning experience.', readTime:'4 min read' },
  { id:6, title:'Parent-Teacher Meeting: Building Stronger Partnerships', category:'Community', date:'15 Apr 2025', author:'Admin', excerpt:'Insights from our quarterly PTM and how open communication between parents and teachers benefits student growth.', readTime:'3 min read' },
];

const CATS = ['All','Academics','Events','Achievements','Innovation','Community'];
const CAT_COLORS = { Academics:'bg-blue-100 text-blue-700', Events:'bg-purple-100 text-purple-700', Achievements:'bg-amber-100 text-amber-700', Innovation:'bg-teal-100 text-teal-700', Community:'bg-rose-100 text-rose-700' };
const GRADS = ['from-blue-500 to-indigo-600','from-purple-500 to-violet-600','from-amber-500 to-orange-600','from-teal-500 to-cyan-600','from-rose-500 to-pink-600','from-emerald-500 to-green-600'];

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [selCat, setSelCat] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API}/apis/pages/blogs/`)
      .then(r => r.json())
      .then(d => setPosts(Array.isArray(d.posts) && d.posts.length ? d.posts : D_BLOGS))
      .catch(() => setPosts(D_BLOGS));
  }, []);

  const filtered = posts.filter(p => {
    const catOk = selCat === 'All' || p.category === selCat;
    const searchOk = !search.trim() || (p.title||'').toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  return (
    <BNPage hero={{ badge:'B.N. Memorial School', title:'Blogs & News', sub:'Stories, updates and insights from our school community' }}>
      {/* Filter bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 flex-1">
            {CATS.map(c => (
              <button key={c} onClick={() => setSelCat(c)}
                className={`text-xs font-black px-4 py-1.5 rounded-full border transition ${selCat===c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}>
                {c}
              </button>
            ))}
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blogs…"
            className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300 w-44" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📝</div>
            <p className="font-black text-xl text-gray-700">No posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <div key={post.id || i} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                {/* Color header */}
                <div className={`h-2 bg-gradient-to-r ${GRADS[i % GRADS.length]}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    {post.category && (
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full ${CAT_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>
                        {post.category}
                      </span>
                    )}
                    {post.readTime && <span className="text-gray-400 text-xs">{post.readTime}</span>}
                  </div>
                  <h3 className="font-black text-gray-900 text-base leading-snug mb-2 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div>
                      {post.author && <p className="text-gray-700 text-xs font-black">{post.author}</p>}
                      {post.date && <p className="text-gray-400 text-xs">{post.date}</p>}
                    </div>
                    <span className="text-blue-600 text-xs font-black group-hover:translate-x-1 transition-transform inline-block">Read more →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </BNPage>
  );
}
