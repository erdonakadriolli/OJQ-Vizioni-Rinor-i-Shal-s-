
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import About from './pages/About';
import News from './pages/News';
import VolunteerApply from './pages/VolunteerApply';
import DerdoChat from './pages/DerdoChat';
import { User, UserRole } from './types';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-brand-dark text-slate-400 py-24 px-6 relative overflow-hidden mt-20">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink via-brand-orange to-brand-lime"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="col-span-1 md:col-span-1 space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5">
               <div className="w-4 h-4 bg-brand-pink rounded-full shadow-[0_0_15px_#e11d74]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Vizioni</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Rinor i Shalës</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed font-medium">
            {t('footer.desc')}
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/vizionirinorishales" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all duration-500 border border-white/5">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/vizionirinorishales/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all duration-500 border border-white/5">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="space-y-8">
          <h4 className="text-white font-black uppercase tracking-widest text-[10px] flex items-center">
            <div className="w-4 h-[2px] bg-brand-pink mr-3"></div>
            {t('footer.nav')}
          </h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
            <li><a href="#/" className="hover:text-brand-pink transition-all flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> {t('nav.home')}</a></li>
            <li><a href="#/projects" className="hover:text-brand-pink transition-all flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> {t('nav.projects')}</a></li>
            <li><a href="#/news" className="hover:text-brand-pink transition-all flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> {t('nav.news')}</a></li>
            <li><a href="#/about/mission" className="hover:text-brand-pink transition-all flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> {t('nav.mission')}</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black uppercase tracking-widest text-[10px] flex items-center">
            <div className="w-4 h-[2px] bg-brand-lime mr-3"></div>
            {t('footer.opp')}
          </h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
            <li><a href="#/join" className="hover:text-brand-lime transition-all flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> {t('nav.join')}</a></li>
            <li><a href="#/partner" className="hover:text-brand-cyan transition-all flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> Partneritete</a></li>
            <li><a href="#/derdo" className="hover:text-brand-orange transition-all flex items-center group"><ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all" /> {t('nav.derdo')} Chat</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-white font-black uppercase tracking-widest text-[10px] flex items-center">
            <div className="w-4 h-[2px] bg-brand-cyan mr-3"></div>
            {t('footer.find')}
          </h4>
          <ul className="space-y-5 text-sm font-medium">
            <li className="flex items-start space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-pink border border-white/5 flex-shrink-0"><MapPin className="h-5 w-5" /></div>
              <a href="https://maps.app.goo.gl/N5XVp95AxwZyngCq8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors pt-1">
                Fshati Shalë, Komuna Lipjan<br/>
                Republika e Kosovës
              </a>
            </li>
            <li className="flex items-center space-x-4 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan border border-white/5 flex-shrink-0"><Mail className="h-5 w-5" /></div>
              <span className="hover:text-white transition-colors">info@vizionirinorishales.org</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest">
           <Heart className="h-3 w-3 text-brand-pink" />
           <span>{t('footer.rights')}</span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          {t('footer.developedBy')} <span className="text-brand-pink">Erdona Kadriolli</span>
        </p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('ngo_user_session');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('ngo_user_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ngo_user_session');
  };

  return (
    <LanguageProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col selection:bg-brand-pink selection:text-white">
          <Navbar user={user} onLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/:section" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:category" element={<News />} />
              <Route path="/projects" element={<Projects user={user} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/join" element={<VolunteerApply />} />
              <Route path="/derdo" element={<DerdoChat />} />
              <Route 
                path="/admin/*" 
                element={
                  user?.role === UserRole.ADMIN ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
