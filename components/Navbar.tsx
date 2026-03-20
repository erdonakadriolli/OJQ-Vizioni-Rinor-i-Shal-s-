
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, LogOut, LogIn, ChevronDown, UserPlus, MessageSquare, LayoutDashboard, X } from 'lucide-react';
import { User, UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';

import Logo from './Logo';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <nav className={`absolute top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-4">
            <Logo size="md" />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black text-brand-dark tracking-tighter uppercase leading-none">Vizioni</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">Rinor i Shalës</span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-2">
          <Link to="/" className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/' ? 'text-brand-pink bg-brand-pink/5' : 'text-slate-600 hover:text-brand-pink'}`}>
            {t('nav.home')}
          </Link>

          <Link to="/projects" className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/projects') ? 'text-brand-cyan bg-brand-cyan/5' : 'text-slate-600 hover:text-brand-cyan'}`}>
            {t('nav.projects')}
          </Link>

          <div className="relative group" onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
            <button className={`flex items-center space-x-1 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/about') ? 'text-brand-pink bg-brand-pink/5' : 'text-slate-600 hover:text-brand-pink'}`}>
              <span>{t('nav.about')}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 mt-2 w-48 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] p-2 transition-all transform origin-top ${activeDropdown === 'about' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-2'}`}>
              <Link to="/about/staff" className="flex items-center space-x-2 px-4 py-3 rounded-xl text-[9px] font-black text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-widest transition-all">
                <div className="w-1 h-1 rounded-full bg-brand-lime"></div>
                <span>{t('nav.staff')}</span>
              </Link>
              <Link to="/about/mission" className="flex items-center space-x-2 px-4 py-3 rounded-xl text-[9px] font-black text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-widest transition-all">
                <div className="w-1 h-1 rounded-full bg-brand-pink"></div>
                <span>{t('nav.mission')}</span>
              </Link>
            </div>
          </div>

          <div className="relative group" onMouseEnter={() => setActiveDropdown('news')} onMouseLeave={() => setActiveDropdown(null)}>
            <button className={`flex items-center space-x-1 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/news') ? 'text-brand-pink bg-brand-pink/5' : 'text-slate-600 hover:text-brand-pink'}`}>
              <span>{t('nav.news')}</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'news' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 mt-2 w-56 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] p-2 transition-all transform origin-top ${activeDropdown === 'news' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 pointer-events-none -translate-y-2'}`}>
              <Link to="/news/latest" className="flex items-center space-x-2 px-4 py-3 rounded-xl text-[9px] font-black text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-widest transition-all">
                <div className="w-1 h-1 rounded-full bg-brand-pink"></div>
                <span>{t('news.title.latest')}</span>
              </Link>
              <Link to="/news/reports" className="flex items-center space-x-2 px-4 py-3 rounded-xl text-[9px] font-black text-slate-600 hover:bg-slate-50 hover:text-brand-cyan uppercase tracking-widest transition-all">
                <div className="w-1 h-1 rounded-full bg-brand-cyan"></div>
                <span>{t('news.title.reports')}</span>
              </Link>
              <Link to="/news/media" className="flex items-center space-x-2 px-4 py-3 rounded-xl text-[9px] font-black text-slate-600 hover:bg-slate-50 hover:text-brand-orange uppercase tracking-widest transition-all">
                <div className="w-1 h-1 rounded-full bg-brand-orange"></div>
                <span>{t('news.title.media')}</span>
              </Link>
            </div>
          </div>

          <Link to="/derdo" className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/derdo') ? 'text-brand-orange bg-brand-orange/5' : 'text-slate-600 hover:text-brand-orange'}`}>
            <MessageSquare className="h-4 w-4" />
            <span>{t('nav.derdo')}</span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/join" className={`flex items-center space-x-2 px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-brand-dark/10 ${isActive('/join') ? 'bg-brand-lime text-white' : 'bg-brand-dark text-white hover:bg-brand-lime'}`}>
            <UserPlus className="h-4 w-4" />
            <span>{t('nav.join')}</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-2">
              {user.role === UserRole.ADMIN && (
                <Link to="/admin" className="p-3.5 bg-brand-cyan/10 text-brand-cyan rounded-full hover:bg-brand-cyan hover:text-white transition-all shadow-lg">
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              )}
              <button onClick={onLogout} className="p-3.5 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-3.5 bg-slate-50 text-brand-dark rounded-full hover:bg-brand-pink hover:text-white transition-all shadow-lg">
              <LogIn className="h-5 w-5" />
            </Link>
          )}
          
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 p-3 bg-slate-50 rounded-full">{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>

      
      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-[90] bg-white/95 backdrop-blur-xl transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-8">
           <Link to="/" className="text-4xl font-black uppercase tracking-tighter text-brand-dark" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
           <Link to="/about/mission" className="text-4xl font-black uppercase tracking-tighter text-brand-pink" onClick={() => setIsOpen(false)}>{t('nav.about')}</Link>
           <Link to="/projects" className="text-4xl font-black uppercase tracking-tighter text-brand-cyan" onClick={() => setIsOpen(false)}>{t('nav.projects')}</Link>
           <Link to="/news" className="text-4xl font-black uppercase tracking-tighter text-brand-pink" onClick={() => setIsOpen(false)}>{t('nav.news')}</Link>
           <Link to="/derdo" className="text-4xl font-black uppercase tracking-tighter text-brand-orange" onClick={() => setIsOpen(false)}>{t('nav.derdo')}</Link>
           <Link to="/join" className="px-12 py-5 bg-brand-lime text-white rounded-full text-xl font-black uppercase tracking-widest shadow-2xl" onClick={() => setIsOpen(false)}>{t('nav.join')}</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
