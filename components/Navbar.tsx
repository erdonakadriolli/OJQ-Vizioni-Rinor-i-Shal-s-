
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut, LogIn, ChevronDown, UserPlus, MessageSquare } from 'lucide-react';
import { User, UserRole } from '../types';

// Define the NavbarProps interface
interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const VizioniLogo = () => (
  <div className="relative flex items-center justify-center w-10 h-10">
    <div className="absolute inset-0 rounded-full border-4 border-transparent" 
         style={{ borderTopColor: '#e11d74', borderRightColor: '#f39237', borderBottomColor: '#95d03a', borderLeftColor: '#00adb5' }}></div>
    <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

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
              Kreu
            </Link>

            <div className="relative group" onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className={`flex items-center space-x-1 text-sm font-semibold transition-colors ${isActive('/about') ? 'text-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}>
                <span>Rreth Nesh</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <div className={`absolute left-0 mt-0 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 transition-all transform origin-top ${activeDropdown === 'about' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <Link to="/about/mission" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Misioni</Link>
                <Link to="/about/staff" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-pink uppercase tracking-wider">Stafi</Link>
              </div>
            </div>

            <Link to="/projects" className={`text-sm font-semibold transition-colors ${isActive('/projects') ? 'text-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}>
              Projekte
            </Link>

            <Link to="/derdo" className={`flex items-center space-x-1 text-sm font-semibold transition-colors ${isActive('/derdo') ? 'text-brand-orange' : 'text-slate-600 hover:text-brand-orange'}`}>
              <MessageSquare className="h-4 w-4" />
              <span>Derdo AI</span>
            </Link>
            
            <Link to="/join" className={`flex items-center space-x-2 px-6 py-2 rounded-full text-xs font-bold transition-all border-2 ${isActive('/join') ? 'bg-brand-lime border-brand-lime text-white' : 'border-brand-lime text-brand-lime hover:bg-brand-lime hover:text-white'}`}>
              <UserPlus className="h-4 w-4" />
              <span>Bashkohu me Ne</span>
            </Link>

            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="flex items-center space-x-1 text-sm font-semibold text-brand-cyan hover:opacity-80 transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}

            {user ? (
              <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><LogOut className="h-5 w-5" /></button>
            ) : (
              <Link to="/login" className="flex items-center space-x-2 bg-brand-dark text-white px-5 py-2 rounded-full text-xs font-bold hover:opacity-90 shadow-md">
                <LogIn className="h-4 w-4" />
                <span>Kyçu</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
