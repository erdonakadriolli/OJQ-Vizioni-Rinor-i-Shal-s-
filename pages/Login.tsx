
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, LogIn, ShieldAlert } from 'lucide-react';
import { User, UserRole } from '../types';
import { getDb } from '../services/mockDb';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate DB check
    setTimeout(() => {
      const db = getDb();
      const user = db.users.find(u => u.email === email);

      if (user) {
        onLogin(user);
        navigate(user.role === UserRole.ADMIN ? '/admin' : '/projects');
      } else {
        setError('Invalid credentials. Hint: Use admin@ngo.org or john@volunteer.com');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 mb-4">
                <Heart className="h-10 w-10 text-emerald-600 fill-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
              <p className="text-slate-500 mt-2">Log in to manage your contributions</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center">
                <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="admin@ngo.org"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded" />
                  <label htmlFor="remember" className="ml-2 block text-sm text-slate-600">Remember me</label>
                </div>
                <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Forgot password?</a>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account? <a href="#" className="font-bold text-emerald-600 hover:text-emerald-700">Register as a Volunteer</a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Demo Credentials</p>
          <div className="flex justify-center space-x-4 text-xs">
            <code className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-600">admin@ngo.org</code>
            <code className="bg-white px-2 py-1 rounded border border-slate-200 text-slate-600">john@volunteer.com</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
