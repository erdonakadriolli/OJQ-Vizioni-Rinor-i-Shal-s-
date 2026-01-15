
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { 
  LayoutDashboard, FolderKanban, Users, Calendar, Megaphone, 
  Plus, Edit2, Trash2, Check, X, Sparkles, Circle
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus } from '../types';
import { generateProjectPitch } from '../services/gemini';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications'>('overview');
  const [db, setDb] = useState(getDb());
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    keywords: ''
  });

  useEffect(() => {
    setDb(getDb());
  }, []);

  const stats = [
    { label: 'Projekte Totale', value: db.projects.length, icon: FolderKanban, color: 'bg-brand-pink' },
    { label: 'Vullnetarë', value: db.users.filter(u => u.role === 'VOLUNTEER').length, icon: Users, color: 'bg-brand-cyan' },
    { label: 'Aplikime Pendim', value: db.applications.filter(a => a.status === ApplicationStatus.PENDING).length, icon: Calendar, color: 'bg-brand-orange' },
    { label: 'Lajme/Postime', value: db.news.length, icon: Megaphone, color: 'bg-brand-lime' },
  ];

  const projectStats = db.projects.map(p => ({ name: p.title.substring(0, 8) + '..', volunteers: p.volunteerCount }));
  const appStatusData = [
    { name: 'Aprovuar', value: db.applications.filter(a => a.status === ApplicationStatus.APPROVED).length },
    { name: 'Pritje', value: db.applications.filter(a => a.status === ApplicationStatus.PENDING).length },
    { name: 'Refuzuar', value: db.applications.filter(a => a.status === ApplicationStatus.REJECTED).length },
  ];

  const handleAppStatus = (id: string, status: ApplicationStatus) => {
    const updatedApps = db.applications.map(a => a.id === id ? { ...a, status } : a);
    const newDb = { ...db, applications: updatedApps };
    setDb(newDb);
    saveDb(newDb);
  };

  const deleteProject = (id: string) => {
    if (!confirm('A jeni të sigurt?')) return;
    const updatedProjects = db.projects.filter(p => p.id !== id);
    const newDb = { ...db, projects: updatedProjects };
    setDb(newDb);
    saveDb(newDb);
  };

  const handleGeneratePitch = async () => {
    if (!newProject.title) return;
    setAiLoading(true);
    const pitch = await generateProjectPitch(newProject.title, newProject.keywords || "rininë e Shales, komunitet, rajon");
    setNewProject(prev => ({ ...prev, description: pitch }));
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-brand-dark border-r border-slate-800 flex-shrink-0 text-white">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-6 h-6 rounded-full border-2 border-brand-pink"></div>
            <span className="text-sm font-black uppercase tracking-[0.2em]">Paneli i Admin</span>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Pasqyra' },
              { id: 'projects', icon: FolderKanban, label: 'Menaxho Projektet' },
              { id: 'applications', icon: Calendar, label: 'Aplikimet' },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all font-bold uppercase text-[10px] tracking-widest ${activeTab === item.id ? 'bg-white/10 text-brand-pink shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Paneli Administrativ</h1>
                  <p className="text-slate-500 font-medium mt-1">Mirësevini përsëri në Vizioni Rinor i Shales.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date().toLocaleDateString('sq-AL')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all">
                    <div className={`${stat.color} w-12 h-12 rounded-2xl text-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-brand-dark">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-10">Angazhimi i Vullnetarëve</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectStats}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }} />
                        <Bar dataKey="volunteers" fill="#e11d74" radius={[6, 6, 0, 0]} barSize={32} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-10">Statusi i Aplikimeve</h3>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {[
                            <Cell key="0" fill="#95d03a" />,
                            <Cell key="1" fill="#f39237" />,
                            <Cell key="2" fill="#e11d74" />
                          ]}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ... Other tabs follow similar Vizioni-themed styling ... */}
          {activeTab === 'projects' && (
             <div className="space-y-8">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Projektet</h1>
                 <button onClick={() => setShowProjectModal(true)} className="bg-brand-pink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-pink/20 hover:scale-105 transition-all">
                   Shto Projekt të Ri
                 </button>
               </div>
               {/* Table implementation ... */}
               <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Titulli</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vullnetarë</th>
                      <th className="px-8 py-5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6 font-bold text-brand-dark">{p.title}</td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === ProjectStatus.ACTIVE ? 'bg-brand-lime text-white' : 'bg-slate-200 text-slate-500'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-slate-600">{p.volunteerCount}</td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => deleteProject(p.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
             </div>
          )}
        </div>
      </main>

      {/* Project Modal Updated with AI functionality and brand colors */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">Krijo Projekt</h2>
               <button onClick={() => setShowProjectModal(false)} className="text-slate-300 hover:text-brand-dark"><X className="h-8 w-8" /></button>
             </div>
             <div className="p-10 space-y-8">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Titulli i Projektit</label>
                   <input 
                      type="text" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-bold"
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                   />
                </div>
                <div className="flex gap-4">
                  <div className="flex-grow">
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Përshkrim me Inteligjencë Artificiale</label>
                     <div className="relative">
                        <textarea 
                           rows={4}
                           className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-medium resize-none"
                           value={newProject.description}
                           onChange={e => setNewProject({...newProject, description: e.target.value})}
                        />
                        <button 
                          type="button"
                          onClick={handleGeneratePitch}
                          disabled={aiLoading}
                          className="absolute bottom-4 right-4 bg-brand-pink text-white p-3 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
                        >
                          {aiLoading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Sparkles className="h-4 w-4" />}
                        </button>
                     </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProjectModal(false)}
                  className="w-full py-5 bg-brand-dark text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-brand-pink transition-all"
                >
                   Publiko Projektin
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
