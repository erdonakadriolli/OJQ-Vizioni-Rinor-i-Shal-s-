
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut, LogIn, ChevronDown } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const VizioniLogo = () => (
  <div className="relative flex items-center justify-center w-10 h-10">
    <div className="absolute inset-0 rounded-full border-4 border-transparent" 
         style={{ borderTopColor: '#e11d74', borderRightColor: '#f39237', borderBottomColor: '#95d03a', borderLeftColor: '#00adb5' }}></div>
    <div className="w-4 h-4 bg-brand-dark rounded-full"></div>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="gradient-border w-full absolute top-0 left-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 pt-1">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <VizioniLogo />
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-bold text-brand-dark tracking-tight leading-none uppercase">Vizioni</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Rinor i Shales</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}>
              Home
            </Link>

            {/* Dropdown: Rreth Nesh */}
            <div className="relative group">
              <button 
                className={`flex items-center space-x-1 text-sm font-semibold transition-colors ${isActive('/about') ? 'text-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}
                onMouseEnter={() => setActiveDropdown('about')}
              >
                <span>Rreth Nesh</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <div 
                className={`absolute left-0 mt-0 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 transition-all transform origin-top ${activeDropdown === 'about' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/about/mission" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Misioni & Vlerat</Link>
                <Link to="/about/staff" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Stafi & Struktura</Link>
                <Link to="/about/partners" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Partnerët</Link>
              </div>
            </div>

            <Link to="/projects" className={`text-sm font-semibold transition-colors ${isActive('/projects') ? 'text-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}>
              Projekte
            </Link>

            {/* Dropdown: Lajmet */}
            <div className="relative group">
              <button 
                className={`flex items-center space-x-1 text-sm font-semibold transition-colors ${isActive('/news') ? 'text-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}
                onMouseEnter={() => setActiveDropdown('news')}
              >
                <span>Lajmet</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <div 
                className={`absolute left-0 mt-0 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 transition-all transform origin-top ${activeDropdown === 'news' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/news/latest" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Lajmet e Fundit</Link>
                <Link to="/news/media" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Media</Link>
                <Link to="/news/reports" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Raportet</Link>
              </div>
            </div>
            
            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="flex items-center space-x-1 text-sm font-semibold text-slate-600 hover:text-brand-cyan transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4 border-l pl-4 ml-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest">{user.role}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 bg-brand-dark text-white px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-md">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-bold text-slate-700 hover:bg-slate-50">Home</Link>
            <div className="px-3 py-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Rreth Nesh</p>
              <div className="pl-4 space-y-1">
                <Link to="/about/mission" className="block py-1 text-sm font-bold text-slate-600">Misioni & Vlerat</Link>
                <Link to="/about/staff" className="block py-1 text-sm font-bold text-slate-600">Stafi & Struktura</Link>
              </div>
            </div>
            <Link to="/projects" className="block px-3 py-2 text-base font-bold text-slate-700 hover:bg-slate-50">Projekte</Link>
            <div className="px-3 py-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Lajmet</p>
              <div className="pl-4 space-y-1">
                <Link to="/news/latest" className="block py-1 text-sm font-bold text-slate-600">Lajmet e Fundit</Link>
                <Link to="/news/media" className="block py-1 text-sm font-bold text-slate-600">Media</Link>
                <Link to="/news/reports" className="block py-1 text-sm font-bold text-slate-600">Raportet</Link>
              </div>
            </div>
            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="block px-3 py-2 text-base font-bold text-brand-cyan hover:bg-slate-50">Dashboard</Link>
            )}
            {user ? (
              <button 
                onClick={onLogout}
                className="w-full text-left block px-3 py-2 text-base font-bold text-red-600 hover:bg-slate-50"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-base font-bold text-brand-pink hover:bg-slate-50">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
