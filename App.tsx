
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
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

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
        
        <footer className="bg-brand-dark text-slate-400 py-20 px-6 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -mr-32 blur-3xl"></div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left relative z-10">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden">
                   <div className="w-5 h-5 bg-brand-pink rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white uppercase tracking-tight leading-none">Vizioni</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Rinor i Shalës</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6 font-medium">
                Vizioni Rinor i Shalës (Shalë, Lipjan) është një organizatë dedikuar fuqizimit të të rinjve përmes edukimit, inovacionit dhe vullnetarizmit.
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="https://www.facebook.com/vizionirinorishales" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/vizionirinorishales/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-pink hover:text-white transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Navigimi</h4>
              <ul className="space-y-3 text-sm font-bold uppercase tracking-wider text-[11px]">
                <li><a href="#/" className="hover:text-brand-pink transition-colors">Kreu</a></li>
                <li><a href="#/projects" className="hover:text-brand-pink transition-colors">Projekte</a></li>
                <li><a href="#/news" className="hover:text-brand-pink transition-colors">Lajmet</a></li>
                <li><a href="#/about/mission" className="hover:text-brand-pink transition-colors">Misioni ynë</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Mundësitë</h4>
              <ul className="space-y-3 text-sm font-bold uppercase tracking-wider text-[11px]">
                <li><a href="#/join" className="hover:text-brand-lime transition-colors">Bëhu Vullnetar</a></li>
                <li><a href="#/partner" className="hover:text-brand-cyan transition-colors">Partneritete</a></li>
                <li><a href="#/derdo" className="hover:text-brand-orange transition-colors">Derdo AI Chat</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Na Gjeni</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-start justify-center md:justify-start space-x-3">
                  <MapPin className="h-5 w-5 text-brand-pink mt-1 flex-shrink-0" />
                  <a href="https://maps.app.goo.gl/N5XVp95AxwZyngCq8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Fshati Shalë, Komuna Lipjan<br/>
                    Republika e Kosovës
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start space-x-3">
                  <Mail className="h-4 w-4 text-brand-cyan" />
                  <span>info@vizionirinorishales.org</span>
                </li>
                <li className="flex items-center justify-center md:justify-start space-x-3">
                  <Phone className="h-4 w-4 text-brand-lime" />
                  <span>+383 44 000 000</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
              &copy; 2026 Vizioni Rinor i Shalës. Të gjitha të drejtat të rezervuara.
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">
              Project by <span className="text-brand-pink">Erdona Kadriolli</span>
            </p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
