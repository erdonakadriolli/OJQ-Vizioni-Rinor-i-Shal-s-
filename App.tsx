
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { User, UserRole } from './types';
import { getDb } from './services/mockDb';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Load existing session if any
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
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects user={user} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
            {/* Admin Routes */}
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
        
        <footer className="bg-slate-900 text-slate-400 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">UnityBridge NGO</h3>
              <p className="text-sm">Building bridges between resources and needs since 2010. Empowering communities through sustainable action.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#/" className="hover:text-emerald-400">Home</a></li>
                <li><a href="#/projects" className="hover:text-emerald-400">Our Projects</a></li>
                <li><a href="#/about" className="hover:text-emerald-400">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <p className="text-sm">123 Purpose Way, Impact City<br/>info@unitybridge.org<br/>+1 (555) 000-1234</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            &copy; 2024 UnityBridge NGO. All rights reserved.
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
