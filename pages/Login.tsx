
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldAlert } from 'lucide-react';
import { User, UserRole } from '../types';
import { getDb } from '../services/mockDb';

const VizioniLogo = () => (
  <div className="relative flex items-center justify-center w-20 h-20 mx-auto">
    <div className="absolute inset-0 rounded-full border-[6px] border-transparent" 
         style={{ borderTopColor: '#e11d74', borderRightColor: '#f39237', borderBottomColor: '#95d03a', borderLeftColor: '#00adb5' }}></div>
    <div className="w-8 h-8 bg-brand-dark rounded-full"></div>
  </div>
);

const Login: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const db = getDb();
      const user = db.users.find(u => u.email === email);

      if (user) {
        onLogin(user);
        navigate(user.role === UserRole.ADMIN ? '/admin' : '/projects');
      } else {
        setError('Kredencialet janë të pasakta. Provoni: admin@vizionirinorishales.org');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-10">
            <div className="text-center mb-10">
              <VizioniLogo />
              <h2 className="text-3xl font-black text-brand-dark uppercase mt-6 tracking-tight">Mirësevini</h2>
              <p className="text-slate-500 mt-2 font-medium">Kyçuni për të menaxhuar vullnetarizmin tuaj</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded-r-xl flex items-center uppercase tracking-wider">
                <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="email@vizionirinorishales.org"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Fjalëkalimi</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 text-brand-pink focus:ring-brand-pink border-slate-300 rounded" />
                  <label htmlFor="remember" className="ml-3 block text-xs font-bold text-slate-500 uppercase">Më mbaj mend</label>
                </div>
                <a href="#" className="text-xs font-bold text-brand-pink uppercase tracking-wider hover:underline">Harruat fjalëkalimin?</a>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-brand-dark text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-brand-pink transition-all shadow-xl shadow-brand-pink/10 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-3" />
                    Kyçu Tani
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-slate-50 p-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Nuk keni llogari? <a href="#" className="font-black text-brand-pink uppercase hover:underline">Regjistrohu si Vullnetar</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
