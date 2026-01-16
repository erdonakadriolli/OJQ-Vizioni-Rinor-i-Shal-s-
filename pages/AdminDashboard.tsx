
import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { 
  LayoutDashboard, FolderKanban, Users, Calendar, Megaphone, 
  Plus, Edit2, Trash2, Check, X, Sparkles, FileText, Newspaper, Tv, Clock, Download, ExternalLink, Upload, Link as LinkIcon, Briefcase, Camera, Facebook, Instagram, Linkedin, Image as ImageIcon
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem, StaffMember } from '../types';
import { generateProjectPitch } from '../services/gemini';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'reports' | 'staff'>('overview');
  const [db, setDb] = useState(getDb());
  
  // Modal visibility states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  
  // Editing states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  
  const [aiLoading, setAiLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    startDate: '',
    endDate: '',
    keywords: '',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    gallery: [] as string[]
  });

  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    category: 'Lajmet e fundit',
    datePosted: new Date().toISOString().split('T')[0],
    fileUrl: '',
    fileName: ''
  });

  const [staffForm, setStaffForm] = useState({
    name: '',
    role: '',
    bio: '',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    socials: { facebook: '', instagram: '', linkedin: '' }
  });

  useEffect(() => {
    setDb(getDb());
  }, []);

  // Stats for the overview
  const stats = [
    { label: 'Projekte Totale', value: db.projects.length, icon: FolderKanban, color: 'bg-brand-pink' },
    { label: 'Vullnetarë', value: db.users.filter(u => u.role === 'VOLUNTEER').length, icon: Users, color: 'bg-brand-cyan' },
    { label: 'Staff Aktiv', value: db.staff.length, icon: Briefcase, color: 'bg-brand-blue' },
    { label: 'Lajme & Raporte', value: db.news.length, icon: Megaphone, color: 'bg-brand-lime' },
  ];

  const projectStats = db.projects.map(p => ({ name: p.title.substring(0, 10) + '...', volunteers: p.volunteerCount }));
  const appStatusData = [
    { name: 'Aprovuar', value: db.applications.filter(a => a.status === ApplicationStatus.APPROVED).length },
    { name: 'Pritje', value: db.applications.filter(a => a.status === ApplicationStatus.PENDING).length },
    { name: 'Refuzuar', value: db.applications.filter(a => a.status === ApplicationStatus.REJECTED).length },
  ];

  // Helper to open project modal
  const handleOpenProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        description: proj.description,
        longDescription: proj.longDescription || '',
        startDate: proj.startDate,
        endDate: proj.endDate,
        keywords: '',
        image: proj.image,
        gallery: proj.gallery || []
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        longDescription: '',
        startDate: '',
        endDate: '',
        keywords: '',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        gallery: []
      });
    }
    setShowProjectModal(true);
  };

  // Helper to open news modal
  const handleOpenNewsModal = (item?: NewsItem, defaultCategory?: string) => {
    if (item) {
      setEditingNews(item);
      setNewsForm({
        title: item.title,
        content: item.content,
        category: item.category,
        datePosted: item.datePosted,
        fileUrl: item.fileUrl || '',
        fileName: item.fileUrl ? 'Dokumenti i ngarkuar' : ''
      });
    } else {
      setEditingNews(null);
      setNewsForm({
        title: '',
        content: '',
        category: defaultCategory || 'Lajmet e fundit',
        datePosted: new Date().toISOString().split('T')[0],
        fileUrl: '',
        fileName: ''
      });
    }
    setShowNewsModal(true);
  };

  // Helper to open staff modal
  const handleOpenStaffModal = (member?: StaffMember) => {
    if (member) {
      setEditingStaff(member);
      setStaffForm({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
        // Fix: Provide default values for optional socials properties to match staffForm state type
        socials: {
          facebook: member.socials?.facebook || '',
          instagram: member.socials?.instagram || '',
          linkedin: member.socials?.linkedin || ''
        }
      });
    } else {
      setEditingStaff(null);
      setStaffForm({
        name: '',
        role: '',
        bio: '',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
        socials: { facebook: '', instagram: '', linkedin: '' }
      });
    }
    setShowStaffModal(true);
  };

  const handleSaveProject = () => {
    let newProjects;
    if (editingProject) {
      newProjects = db.projects.map(p => p.id === editingProject.id ? {
        ...p,
        ...projectForm,
        volunteerCount: p.volunteerCount
      } : p);
    } else {
      const project: Project = {
        id: 'p' + Date.now(),
        ...projectForm,
        status: ProjectStatus.ACTIVE,
        volunteerCount: 0,
      };
      newProjects = [...db.projects, project];
    }
    const newDb = { ...db, projects: newProjects };
    setDb(newDb);
    saveDb(newDb);
    setShowProjectModal(false);
  };

  const handleSaveNews = () => {
    if (!newsForm.title || !newsForm.content) {
      alert("Ju lutem plotësoni titullin dhe përmbajtjen.");
      return;
    }
    
    let updatedNews;
    if (editingNews) {
      updatedNews = db.news.map(n => n.id === editingNews.id ? {
        ...n,
        title: newsForm.title,
        content: newsForm.content,
        category: newsForm.category,
        datePosted: newsForm.datePosted,
        fileUrl: newsForm.fileUrl || undefined
      } : n);
    } else {
      const item: NewsItem = {
        id: 'n' + Date.now(),
        title: newsForm.title,
        content: newsForm.content,
        category: newsForm.category,
        datePosted: newsForm.datePosted,
        fileUrl: newsForm.fileUrl || undefined
      };
      updatedNews = [item, ...db.news];
    }
    
    const newDb = { ...db, news: updatedNews };
    setDb(newDb);
    saveDb(newDb);
    setShowNewsModal(false);
  };

  const handleSaveStaff = () => {
    if (!staffForm.name || !staffForm.role) {
      alert("Ju lutem plotësoni emrin dhe rolin.");
      return;
    }
    
    let updatedStaff;
    if (editingStaff) {
      updatedStaff = db.staff.map(s => s.id === editingStaff.id ? {
        ...s,
        name: staffForm.name,
        role: staffForm.role,
        bio: staffForm.bio,
        image: staffForm.image,
        socials: { ...staffForm.socials }
      } : s);
    } else {
      const staff: StaffMember = {
        id: 's' + Date.now(),
        name: staffForm.name,
        role: staffForm.role,
        bio: staffForm.bio,
        image: staffForm.image,
        socials: { ...staffForm.socials }
      };
      updatedStaff = [...db.staff, staff];
    }
    
    const newDb = { ...db, staff: updatedStaff };
    setDb(newDb);
    saveDb(newDb);
    setShowStaffModal(false);
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

  const deleteStaff = (id: string) => {
    if (!confirm('Fshij këtë anëtar të stafit?')) return;
    const updatedStaff = db.staff.filter(s => s.id !== id);
    const newDb = { ...db, staff: updatedStaff };
    setDb(newDb);
    saveDb(newDb);
  };

  const handleAppStatus = (id: string, status: ApplicationStatus) => {
    const updatedApps = db.applications.map(a => a.id === id ? { ...a, status } : a);
    const newDb = { ...db, applications: updatedApps };
    setDb(newDb);
    saveDb(newDb);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsForm(prev => ({ 
          ...prev, 
          fileUrl: reader.result as string,
          fileName: file.name
        }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePitch = async () => {
    if (!projectForm.title) return;
    setAiLoading(true);
    const pitch = await generateProjectPitch(projectForm.title, projectForm.keywords || "rininë e Shales, komunitet, rajon, zhvillim");
    setProjectForm(prev => ({ ...prev, description: pitch }));
    setAiLoading(false);
  };

  const addGalleryImage = () => {
    const url = prompt("Vendos URL-në e fotos për galeri:");
    if (url) {
      setProjectForm(prev => ({ ...prev, gallery: [...prev.gallery, url] }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
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
              { id: 'staff', icon: Briefcase, label: 'Stafi' },
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

      {/* Main Dashboard Content */}
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
              {/* Analytics Charts */}
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
                        <Pie data={appStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value">
                          {[<Cell key="0" fill="#95d03a" />, <Cell key="1" fill="#f39237" />, <Cell key="2" fill="#e11d74" />]}
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
                 <button onClick={() => handleOpenProjectModal()} className="bg-brand-pink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-pink/20 hover:scale-105 transition-all flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Shto Projekt
                 </button>
               </div>
               <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Projekti</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Veprime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center space-x-3">
                              <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="font-bold text-brand-dark">{p.title}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === ProjectStatus.ACTIVE ? 'bg-brand-lime text-white' : 'bg-slate-200 text-slate-500'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button onClick={() => handleOpenProjectModal(p)} className="p-2 text-slate-400 hover:text-brand-cyan transition-colors" title="Edito">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => deleteProject(p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Fshij">
                              <Trash2 className="h-4 w-4" />
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

          {/* STAFF TAB */}
          {activeTab === 'staff' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Menaxho Stafin</h1>
                 <button onClick={() => handleOpenStaffModal()} className="bg-brand-blue text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-blue/20 hover:scale-105 transition-all flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Shto Anëtar Stafi
                 </button>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {db.staff.map(s => (
                   <div key={s.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col group hover:shadow-xl transition-all relative">
                     <div className="absolute top-6 right-6 flex space-x-1">
                       <button onClick={() => handleOpenStaffModal(s)} className="p-2 text-slate-300 hover:text-brand-cyan transition-colors" title="Edito">
                         <Edit2 className="h-4 w-4" />
                       </button>
                       <button onClick={() => deleteStaff(s.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors" title="Fshij">
                         <Trash2 className="h-4 w-4" />
                       </button>
                     </div>
                     <div className="flex items-center space-x-4 mb-6">
                        <img src={s.image} alt={s.name} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                        <div>
                          <h4 className="font-black text-brand-dark uppercase tracking-tight">{s.name}</h4>
                          <p className="text-[10px] font-black text-brand-pink uppercase tracking-widest">{s.role}</p>
                        </div>
                     </div>
                     <p className="text-xs text-slate-500 line-clamp-3 italic mb-4">"{s.bio}"</p>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* NEWS TAB */}
          {activeTab === 'news' && (
             <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Lajmet & Njoftimet</h1>
                 <button onClick={() => handleOpenNewsModal()} className="bg-brand-orange text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-orange/20 hover:scale-105 transition-all flex items-center">
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
                     <div className="flex space-x-1">
                       <button onClick={() => handleOpenNewsModal(n)} className="p-3 text-slate-300 hover:text-brand-orange transition-colors" title="Edito">
                          <Edit2 className="h-5 w-5" />
                       </button>
                       <button onClick={() => deleteNews(n.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors" title="Fshij">
                          <Trash2 className="h-5 w-5" />
                       </button>
                     </div>
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
                 <button onClick={() => handleOpenNewsModal(undefined, 'Raportet')} className="bg-brand-cyan text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg shadow-brand-cyan/20 hover:scale-105 transition-all flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Ngarko Raport (PDF)
                 </button>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                 {db.news.filter(n => n.category === 'Raportet').map(r => (
                   <div key={r.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-brand-cyan transition-all flex flex-col group relative">
                     <div className="absolute top-8 right-8 flex space-x-1">
                       <button onClick={() => handleOpenNewsModal(r)} className="p-2 text-slate-300 hover:text-brand-cyan transition-colors" title="Edito">
                          <Edit2 className="h-4 w-4" />
                       </button>
                       <button onClick={() => deleteNews(r.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors" title="Fshij">
                          <Trash2 className="h-4 w-4" />
                       </button>
                     </div>
                     <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                        <FileText className="h-8 w-8" />
                     </div>
                     <h4 className="text-xl font-black text-brand-dark uppercase mb-2 leading-tight">{r.title}</h4>
                     <p className="text-sm text-slate-500 font-medium mb-8 line-clamp-2">{r.content}</p>
                     <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{r.datePosted}</span>
                        {r.fileUrl && <span className="text-[9px] font-black text-brand-cyan uppercase tracking-widest flex items-center"><Download className="h-3 w-3 mr-1" /> PDF</span>}
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
                        </td>
                        <td className="px-8 py-6 font-bold text-slate-600 text-sm">{app.projectTitle}</td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${app.status === ApplicationStatus.APPROVED ? 'bg-brand-lime text-white' : app.status === ApplicationStatus.PENDING ? 'bg-brand-orange text-white' : 'bg-brand-pink text-white'}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                             <button onClick={() => handleAppStatus(app.id, ApplicationStatus.APPROVED)} className="p-2 bg-slate-50 text-brand-lime hover:bg-brand-lime hover:text-white rounded-xl transition-all" title="Aprovo"><Check className="h-4 w-4" /></button>
                             <button onClick={() => handleAppStatus(app.id, ApplicationStatus.REJECTED)} className="p-2 bg-slate-50 text-brand-pink hover:bg-brand-pink hover:text-white rounded-xl transition-all" title="Refuzo"><X className="h-4 w-4" /></button>
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

      {/* MODALS SECTION */}

      {/* Project Modal (Add/Edit) */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingProject ? 'Edito Projektin' : 'Krijo Projekt të Ri'}</h2>
               <button onClick={() => setShowProjectModal(false)} className="text-slate-300 hover:text-brand-dark"><X className="h-8 w-8" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Titulli</label>
                   <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-bold" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Data Fillimit</label>
                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={projectForm.startDate} onChange={e => setProjectForm({...projectForm, startDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Data Mbarimit</label>
                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={projectForm.endDate} onChange={e => setProjectForm({...projectForm, endDate: e.target.value})} />
                  </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Përshkrimi i Shkurtër</label>
                   <div className="relative">
                      <textarea rows={2} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-medium resize-none" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                      <button type="button" onClick={handleGeneratePitch} disabled={aiLoading} className="absolute bottom-4 right-4 bg-brand-pink text-white p-3 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50">
                        {aiLoading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Sparkles className="h-4 w-4" />}
                      </button>
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Detajet e Projektit (Informacioni i gjatë)</label>
                   <textarea rows={6} placeholder="Shkruani detaje rreth projektit..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-medium resize-none" value={projectForm.longDescription} onChange={e => setProjectForm({...projectForm, longDescription: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Fotoja Kryesore (URL)</label>
                      <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} />
                   </div>
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Galeria e Fotove</label>
                      <button onClick={addGalleryImage} className="w-full px-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-400 hover:border-brand-pink hover:text-brand-pink transition-all flex items-center justify-center">
                        <ImageIcon className="h-4 w-4 mr-2" /> Shto Foto
                      </button>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {projectForm.gallery.map((img, i) => (
                           <div key={i} className="relative group">
                              <img src={img} className="w-10 h-10 rounded-lg object-cover" />
                              <button 
                                onClick={() => setProjectForm(prev => ({...prev, gallery: prev.gallery.filter((_, idx) => idx !== i)}))}
                                className="absolute -top-1 -right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-2 w-2" />
                              </button>
                           </div>
                        ))}
                      </div>
                   </div>
                </div>
                <button onClick={handleSaveProject} className="w-full py-5 bg-brand-dark text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-brand-pink transition-all">
                   {editingProject ? 'Ruaj Ndryshimet' : 'Publiko Projektin'}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Staff Modal (Add/Edit) */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingStaff ? 'Edito Anëtarin' : 'Shto Anëtar Stafi'}</h2>
               <button onClick={() => setShowStaffModal(false)} className="text-slate-300 hover:text-brand-dark"><X className="h-8 w-8" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Emri i Plotë</label>
                   <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Roli / Pozita</label>
                   <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Biografia</label>
                   <textarea rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium" value={staffForm.bio} onChange={e => setStaffForm({...staffForm, bio: e.target.value})} />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">URL e Fotos</label>
                   <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.image} onChange={e => setStaffForm({...staffForm, image: e.target.value})} />
                </div>
                <button onClick={handleSaveStaff} className="w-full py-5 bg-brand-blue text-white rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:bg-brand-dark transition-all">
                   {editingStaff ? 'Përditëso Anëtarin' : 'Shto në Ekip'}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* News Modal (Add/Edit) */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingNews ? 'Edito Lajmin' : 'Shto Lajm / Raport'}</h2>
               <button onClick={() => setShowNewsModal(false)} className="text-slate-300 hover:text-brand-dark"><X className="h-8 w-8" /></button>
             </div>
             <div className="p-10 space-y-6">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Kategoria</label>
                   <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value, fileUrl: '', fileName: ''})}>
                     <option>Lajmet e fundit</option>
                     <option>Media</option>
                     <option>Raportet</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Titulli</label>
                   <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-brand-orange" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} />
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Përmbajtja</label>
                   <textarea rows={5} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium resize-none outline-none focus:ring-2 focus:ring-brand-orange" value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} />
                </div>
                
                {newsForm.category === 'Media' && (
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Linku i Medias (URL)</label>
                    <div className="relative">
                      <input type="text" placeholder="https://youtube.com/..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={newsForm.fileUrl} onChange={e => setNewsForm({...newsForm, fileUrl: e.target.value})} />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"><LinkIcon className="h-5 w-5" /></div>
                    </div>
                  </div>
                )}

                {newsForm.category === 'Raportet' && (
                   <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Ngarko Dokumentin (PDF)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-brand-cyan hover:bg-slate-50 transition-all flex flex-col items-center justify-center"
                      >
                         <input type="file" accept=".pdf" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                         {isUploading ? (
                           <div className="h-8 w-8 border-4 border-slate-200 border-t-brand-cyan rounded-full animate-spin"></div>
                         ) : newsForm.fileName ? (
                           <>
                             <FileText className="h-10 w-10 text-brand-cyan mb-2" />
                             <p className="text-xs font-bold text-brand-dark uppercase truncate max-w-xs">{newsForm.fileName}</p>
                           </>
                         ) : (
                           <>
                             <Upload className="h-10 w-10 text-slate-300 mb-2" />
                             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kliko për të zgjedhur PDF</p>
                           </>
                         )}
                      </div>
                   </div>
                )}

                <button onClick={handleSaveNews} className={`w-full py-5 text-white rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:bg-brand-dark transition-all ${newsForm.category === 'Raportet' ? 'bg-brand-cyan' : 'bg-brand-orange'}`}>
                   {editingNews ? 'Përditëso' : 'Ruaj'} {newsForm.category === 'Raportet' ? 'Raportin' : 'Lajmin'}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
