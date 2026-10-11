'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router   = useRouter();
  const [form, setForm]     = useState({ username: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow]     = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const fd = new FormData();
      fd.append('username', form.username);
      fd.append('password', form.password);
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/auth/login/`, { method: 'POST', body: fd });
      if (!r.ok) { const d = await r.json(); throw new Error(d.detail || 'Login failed'); }
      const data = await r.json();
      localStorage.setItem('admin_token', data.access_token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      // Set cookie so middleware can protect routes
      document.cookie = `admin_token=${data.access_token}; path=/; max-age=86400; SameSite=Strict`;
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white/5"
            style={{ width: `${(i+1)*80}px`, height: `${(i+1)*80}px`, top: `${10+i*15}%`, left: `${i%2===0 ? 5+i*8 : 60-i*5}%` }} />
        ))}
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top brand */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-8 pt-8 pb-6 text-center">
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur">
              <span className="text-white font-black text-2xl">BN</span>
            </div>
            <h1 className="text-white font-black text-xl">Admin Panel</h1>
            <p className="text-blue-200 text-sm mt-1">BN Memorial School System</p>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <h2 className="font-bold text-gray-800 text-lg mb-1">Welcome back</h2>
            <p className="text-gray-400 text-sm mb-6">Sign in to manage school content</p>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Username</label>
                <input
                  type="text" required autoComplete="username"
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="Enter username"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'} required autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="Enter password"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition pr-12"
                  />
                  <button type="button" onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold py-3.5 rounded-xl hover:from-blue-800 hover:to-indigo-800 transition-all disabled:opacity-60 shadow-md hover:shadow-lg">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Forgot password? Contact superadmin
            </p>
          </div>
        </div>

        <p className="text-center text-blue-300 text-xs mt-4 opacity-70">
          Protected system · Unauthorized access prohibited
        </p>
      </div>
    </div>
  );
}
