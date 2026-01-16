
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { 
  LayoutDashboard, FolderKanban, Users, Calendar, Megaphone, 
  Plus, Edit2, Trash2, Check, X, Sparkles, FileText, Newspaper, Tv, Clock
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem } from '../types';
import { generateProjectPitch } from '../services/gemini';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'reports'>('overview');
  const [db, setDb] = useState(getDb());
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Form States
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    keywords: '',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  });

  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
    category: 'Lajmet e fundit',
    datePosted: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    setDb(getDb());
  }, []);

  const refreshData = () => setDb(getDb());

  const stats = [
    { label: 'Projekte Totale', value: db.projects.length, icon: FolderKanban, color: 'bg-brand-pink' },
    { label: 'Vullnetarë', value: db.users.filter(u => u.role === 'VOLUNTEER').length, icon: Users, color: 'bg-brand-cyan' },
    { label: 'Aplikime Pendim', value: db.applications.filter(a => a.status === ApplicationStatus.PENDING).length, icon: Calendar, color: 'bg-brand-orange' },
    { label: 'Lajme & Raporte', value: db.news.length, icon: Megaphone, color: 'bg-brand-lime' },
  ];

  const projectStats = db.projects.map(p => ({ name: p.title.substring(0, 10) + '...', volunteers: p.volunteerCount }));
  const appStatusData = [
    { name: 'Aprovuar', value: db.applications.filter(a => a.status === ApplicationStatus.APPROVED).length },
    { name: 'Pritje', value: db.applications.filter(a => a.status === ApplicationStatus.PENDING).length },
    { name: 'Refuzuar', value: db.applications.filter(a => a.status === ApplicationStatus.REJECTED).length },
  ];

  // Logic Handlers
  const handleAppStatus = (id: string, status: ApplicationStatus) => {
    const updatedApps = db.applications.map(a => a.id === id ? { ...a, status } : a);
    const newDb = { ...db, applications: updatedApps };
    setDb(newDb);
    saveDb(newDb);
  };

  const deleteProject = (id: string) => {
    if (!confirm('A jeni të sigurt që dëshironi të fshini këtë projekt?')) return;
    const updatedProjects = db.projects.filter(p => p.id !== id);
    const newDb = { ...db, projects: updatedProjects };
    setDb(newDb);
    saveDb(newDb);
  };

  const deleteNews = (id: string) => {
    if (!confirm('Fshij këtë lajm?')) return;
    const updatedNews = db.news.filter(n => n.id !== id);
    const newDb = { ...db, news: updatedNews };
    setDb(newDb);
    saveDb(newDb);
  };

  const handleAddProject = () => {
    const project: Project = {
      id: 'p' + Date.now(),
      title: newProject.title,
      description: newProject.description,
      startDate: newProject.startDate || '2024-01-01',
      endDate: newProject.endDate || '2024-12-31',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 0,
      image: newProject.image
    };
    const newDb = { ...db, projects: [...db.projects, project] };
    setDb(newDb);
    saveDb(newDb);
    setShowProjectModal(false);
    setNewProject({ title: '', description: '', startDate: '', endDate: '', keywords: '', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' });
  };

  const handleAddNews = () => {
    const item: NewsItem = {
      id: 'n' + Date.now(),
      title: newNews.title,
      content: newNews.content,
      category: newNews.category,
      datePosted: newNews.datePosted
    };
    const newDb = { ...db, news: [item, ...db.news] };
    setDb(newDb);
    saveDb(newDb);
    setShowNewsModal(false);
    setNewNews({ title: '', content: '', category: 'Lajmet e fundit', datePosted: new Date().toISOString().split('T')[0] });
  };

  const handleGeneratePitch = async () => {
    if (!newProject.title) return;
    setAiLoading(true);
    const pitch = await generateProjectPitch(newProject.title, newProject.keywords || "rininë e Shales, komunitet, rajon, zhvillim");
    setNewProject(prev => ({ ...prev, description: pitch }));
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-brand-dark border-r border-slate-800 flex-shrink-0 text-white z-20">
        <div className="p-8 sticky top-0">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-8 h-8 rounded-full border-2 border-brand-pink flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-pink rounded-full"></div>
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em]">ADMIN PANEL</span>
          </div>
          
          <nav className="space-y-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Pasqyra' },
              { id: 'projects', icon: FolderKanban, label: 'Projektet' },
              { id: 'news', icon: Newspaper, label: 'Lajmet' },
              { id: 'reports', icon: FileText, label: 'Raportet' },
              { id: 'applications', icon: Users, label: 'Aplikimet' },
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
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Paneli Administrativ</h1>
                  <p className="text-slate-500 font-medium mt-1">Menaxhoni të gjitha aktivitetet e Vizioni Rinor i Shalës.</p>
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
                  <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-10">Volumi i Vullnetarëve</h3>
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

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Menaxho Projektet</h1>
                 <button onClick={() => setShowProjectModal(true)} className="bg-brand-pink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-pink/20 hover:scale-105 transition-all flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Shto Projekt
                 </button>
               </div>
               
               <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Projekti</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vullnetarë</th>
                      <th className="px-8 py-5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-8 py-6 font-bold text-brand-dark">{p.title}</td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === ProjectStatus.ACTIVE ? 'bg-brand-lime text-white' : 'bg-slate-200 text-slate-500'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-slate-600">{p.volunteerCount}</td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => deleteProject(p.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
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

          {/* NEWS TAB */}
          {activeTab === 'news' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Lajmet & Njoftimet</h1>
                 <button onClick={() => setShowNewsModal(true)} className="bg-brand-orange text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-orange/20 hover:scale-105 transition-all flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Shpall Lajm
                 </button>
               </div>
               
               <div className="grid gap-6">
                 {db.news.map(n => (
                   <div key={n.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-6 group hover:shadow-lg transition-all">
                     <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors">
                        <Megaphone className="h-6 w-6" />
                     </div>
                     <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">{n.category}</span>
                          <span className="text-[9px] text-slate-400 font-bold">{n.datePosted}</span>
                        </div>
                        <h4 className="font-black text-brand-dark uppercase tracking-tight">{n.title}</h4>
                     </div>
                     <button onClick={() => deleteNews(n.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 className="h-5 w-5" />
                     </button>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Raportet Zyrtare</h1>
                 <button onClick={() => { setNewNews({...newNews, category: 'Raportet'}); setShowNewsModal(true); }} className="bg-brand-cyan text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-cyan/20 hover:scale-105 transition-all flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Ngarko Raport
                 </button>
               </div>
               
               <div className="grid md:grid-cols-2 gap-8">
                 {db.news.filter(n => n.category === 'Raportet').map(r => (
                   <div key={r.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-brand-cyan transition-all flex flex-col group">
                     <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                        <FileText className="h-8 w-8" />
                     </div>
                     <h4 className="text-xl font-black text-brand-dark uppercase mb-2 leading-tight">{r.title}</h4>
                     <p className="text-sm text-slate-500 font-medium mb-8 line-clamp-2">{r.content}</p>
                     <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{r.datePosted}</span>
                        <button onClick={() => deleteNews(r.id)} className="text-red-500 font-black uppercase text-[10px] tracking-widest hover:underline">Fshij</button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* APPLICATIONS TAB */}
          {activeTab === 'applications' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <h1 className="text-3xl font-black text-brand-dark uppercase">Aplikimet e Vullnetarëve</h1>
               
               <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vullnetari</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Projekti</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statusi</th>
                      <th className="px-8 py-5 text-right">Veprime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.applications.length === 0 ? (
                      <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">Nuk ka aplikime momentalisht</td></tr>
                    ) : db.applications.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-brand-dark">{app.userName}</p>
                          <p className="text-xs text-slate-400">{app.userEmail}</p>
                        </td>
                        <td className="px-8 py-6 font-bold text-slate-600 text-sm">{app.projectTitle}</td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                             app.status === ApplicationStatus.APPROVED ? 'bg-brand-lime text-white' : 
                             app.status === ApplicationStatus.PENDING ? 'bg-brand-orange text-white' : 
                             'bg-brand-pink text-white'
                           }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                             <button 
                                onClick={() => handleAppStatus(app.id, ApplicationStatus.APPROVED)}
                                className="p-2 bg-slate-50 text-brand-lime hover:bg-brand-lime hover:text-white rounded-xl transition-all"
                                title="Aprovo"
                             >
                               <Check className="h-4 w-4" />
                             </button>
                             <button 
                                onClick={() => handleAppStatus(app.id, ApplicationStatus.REJECTED)}
                                className="p-2 bg-slate-50 text-brand-pink hover:bg-brand-pink hover:text-white rounded-xl transition-all"
                                title="Refuzo"
                             >
                               <X className="h-4 w-4" />
                             </button>
                          </div>
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

      {/* MODALS */}
      
      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">Krijo Projekt të Ri</h2>
               <button onClick={() => setShowProjectModal(false)} className="text-slate-300 hover:text-brand-dark"><X className="h-8 w-8" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Titulli</label>
                   <input 
                      type="text" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-bold"
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Data Fillimit</label>
                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" onChange={e => setNewProject({...newProject, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Data Mbarimit</label>
                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" onChange={e => setNewProject({...newProject, endDate: e.target.value})} />
                  </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Përshkrimi (Mund ta gjenerosh me AI)</label>
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
                <button 
                  onClick={handleAddProject}
                  className="w-full py-5 bg-brand-dark text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-brand-pink transition-all"
                >
                   Publiko Projektin
                </button>
             </div>
          </div>
        </div>
      )}

      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">Shto Lajm / Raport</h2>
               <button onClick={() => setShowNewsModal(false)} className="text-slate-300 hover:text-brand-dark"><X className="h-8 w-8" /></button>
             </div>
             <div className="p-10 space-y-6">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Kategoria</label>
                   <select 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
                      value={newNews.category}
                      onChange={e => setNewNews({...newNews, category: e.target.value})}
                   >
                     <option>Lajmet e fundit</option>
                     <option>Media</option>
                     <option>Raportet</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Titulli</label>
                   <input 
                      type="text" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-brand-orange"
                      value={newNews.title}
                      onChange={e => setNewNews({...newNews, title: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Përmbajtja</label>
                   <textarea 
                      rows={5}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium resize-none outline-none focus:ring-2 focus:ring-brand-orange"
                      value={newNews.content}
                      onChange={e => setNewNews({...newNews, content: e.target.value})}
                   />
                </div>
                <button 
                  onClick={handleAddNews}
                  className="w-full py-5 bg-brand-orange text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-brand-dark transition-all"
                >
                   Ruaj Lajmin
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
