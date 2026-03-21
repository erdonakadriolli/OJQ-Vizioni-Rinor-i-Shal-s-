
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ShieldAlert } from 'lucide-react';
import Logo from '../components/Logo';
import { User, UserRole } from '../types';
import { getDb } from '../services/mockDb';
import { useLanguage } from '../context/LanguageContext';

const Login: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

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
        setError(t('login.error') || 'Credentials incorrect. Try: admin@vizionirinorishales.org');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-12 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-10">
            <div className="text-center mb-10">
              <Logo size="lg" className="mx-auto" />
              <h2 className="text-3xl font-black text-brand-dark uppercase mt-6 tracking-tight">{t('login.title')}</h2>
              <p className="text-slate-500 mt-2 font-medium">{t('login.subtitle')}</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded-r-xl flex items-center uppercase tracking-wider">
                <ShieldAlert className="h-5 w-5 mr-3 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">{t('login.email')}</label>
                <input 
                  type="email" 
                  required
                  placeholder="admin@vizionirinorishales.org"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">{t('login.password')}</label>
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
                  <label htmlFor="remember" className="ml-3 block text-xs font-bold text-slate-500 uppercase">{t('login.remember')}</label>
                </div>
                <a href="#" className="text-xs font-bold text-brand-pink uppercase tracking-wider hover:underline">{t('login.forgot')}</a>
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
                    {t('login.button')}
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-slate-50 p-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              {t('login.noaccount')} <Link to="/join" className="font-black text-brand-pink uppercase hover:underline">{t('login.register')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
