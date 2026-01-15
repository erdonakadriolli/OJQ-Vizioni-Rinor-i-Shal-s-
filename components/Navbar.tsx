
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, LayoutDashboard, LogOut, LogIn, Briefcase } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-emerald-600 fill-emerald-600" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">UnityBridge</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}>
              Home
            </Link>
            <Link to="/projects" className={`text-sm font-medium transition-colors ${isActive('/projects') ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}>
              Projects
            </Link>
            
            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="flex items-center space-x-1 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4 border-l pl-4 ml-4">
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-shadow shadow-sm">
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
            <Link to="/" className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Home</Link>
            <Link to="/projects" className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Projects</Link>
            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="block px-3 py-2 text-base font-medium text-emerald-600 hover:bg-slate-50">Dashboard</Link>
            )}
            {user ? (
              <button 
                onClick={onLogout}
                className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:bg-slate-50"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="block px-3 py-2 text-base font-medium text-emerald-600 hover:bg-slate-50">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
