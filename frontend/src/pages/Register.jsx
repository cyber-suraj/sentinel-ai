import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import client from '../api/client';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await client.signup(email, password);
      localStorage.setItem('token', data.token);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error('REGISTRATION ERROR:', err);
      toast.error(err.extractedMessage || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-white dark:bg-slate-950">
      <div className="flex flex-col justify-center items-center p-8 relative animate-fadeIn">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create an account</h2>
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-indigo-500 transition-all pr-12 text-slate-900 dark:text-white"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3.5 font-semibold transition-all">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link></p>
        </div>
      </div>
      <div className="hidden lg:flex bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-12 flex-col justify-center items-center text-center">
        <div className="text-8xl mb-8">🛡️</div>
        <h2 className="text-4xl font-bold text-white mb-4">Every message deserves a second look.</h2>
      </div>
    </div>
  );
}
