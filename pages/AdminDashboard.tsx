
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FolderKanban, Users, 
  Plus, Edit2, Trash2, Check, X, Newspaper, Briefcase, Camera, Image as ImageIcon, Phone, Mail, FileText, Link as LinkIcon, Globe,
  // Fix: Added missing Upload icon import
  Upload
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem, StaffMember, VolunteerApplication } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'staff'>('overview');
  const [db, setDb] = useState(getDb());
  
  // Modals Visibility
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);

  // Selected Items for Editing
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  
  // Refs for file inputs
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryImagesRef = useRef<HTMLInputElement>(null);
  const newsFileRef = useRef<HTMLInputElement>(null);
  const staffImageRef = useRef<HTMLInputElement>(null);

  // Form States
  const [projectForm, setProjectForm] = useState({
    title: '', description: '', longDescription: '', startDate: '', endDate: '', image: '', gallery: [] as string[]
  });

  const [newsForm, setNewsForm] = useState({
    title: '', content: '', category: 'Lajmet e fundit', datePosted: new Date().toISOString().split('T')[0], fileUrl: ''
  });

  const [staffForm, setStaffForm] = useState({
    name: '', role: '', bio: '', image: '', socials: { facebook: '', instagram: '', linkedin: '' }
  });

  useEffect(() => {
    setDb(getDb());
  }, []);

  // Helper: File to Base64
  const handleFileRead = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  // --- PROJECT ACTIONS ---
  const handleOpenProjectModal = (proj?: Project) => {
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title, description: proj.description, longDescription: proj.longDescription || '',
        startDate: proj.startDate, endDate: proj.endDate, image: proj.image, gallery: proj.gallery || []
      });
    } else {
      setEditingProject(null);
      setProjectForm({ title: '', description: '', longDescription: '', startDate: '', endDate: '', image: '', gallery: [] });
    }
    setShowProjectModal(true);
  };

  const handleSaveProject = () => {
    if (!projectForm.title || !projectForm.image) return alert("Plotësoni titullin dhe foton.");
    const newProjects = editingProject 
      ? db.projects.map(p => p.id === editingProject.id ? { ...p, ...projectForm } : p)
      : [...db.projects, { id: 'p' + Date.now(), ...projectForm, status: ProjectStatus.ACTIVE, volunteerCount: 0 }];
    
    updateDb({ ...db, projects: newProjects });
    setShowProjectModal(false);
  };

  // --- NEWS ACTIONS ---
  const handleOpenNewsModal = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item);
      // Fix: Ensure optional fileUrl is handled to match newsForm type requirements
      setNewsForm({
        title: item.title,
        content: item.content,
        category: item.category,
        datePosted: item.datePosted,
        fileUrl: item.fileUrl || ''
      });
    } else {
      setEditingNews(null);
      setNewsForm({ title: '', content: '', category: 'Lajmet e fundit', datePosted: new Date().toISOString().split('T')[0], fileUrl: '' });
    }
    setShowNewsModal(true);
  };

  const handleSaveNews = () => {
    if (!newsForm.title || !newsForm.content) return alert("Plotësoni të gjitha fushat.");
    const newNews = editingNews
      ? db.news.map(n => n.id === editingNews.id ? { ...n, ...newsForm } : n)
      : [...db.news, { id: 'n' + Date.now(), ...newsForm }];
    
    updateDb({ ...db, news: newNews });
    setShowNewsModal(false);
  };

  // --- STAFF ACTIONS ---
  const handleOpenStaffModal = (member?: StaffMember) => {
    if (member) {
      setEditingStaff(member);
      // Fix: Explicitly map socials to ensure all required fields are present with defaults
      setStaffForm({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
        socials: {
          facebook: member.socials?.facebook || '',
          instagram: member.socials?.instagram || '',
          linkedin: member.socials?.linkedin || '',
        }
      });
    } else {
      setEditingStaff(null);
      setStaffForm({ name: '', role: '', bio: '', image: '', socials: { facebook: '', instagram: '', linkedin: '' } });
    }
    setShowStaffModal(true);
  };

  const handleSaveStaff = () => {
    if (!staffForm.name || !staffForm.image) return alert("Plotësoni emrin dhe foton.");
    const newStaff = editingStaff
      ? db.staff.map(s => s.id === editingStaff.id ? { ...s, ...staffForm } : s)
      : [...db.staff, { id: 's' + Date.now(), ...staffForm }];
    
    updateDb({ ...db, staff: newStaff });
    setShowStaffModal(false);
  };

  // Common DB Update
  const updateDb = (newDb: any) => {
    setDb(newDb);
    saveDb(newDb);
  };

  const deleteItem = (type: 'projects' | 'news' | 'staff', id: string) => {
    if (!confirm('A jeni të sigurt?')) return;
    const newData = { ...db, [type]: db[type].filter((item: any) => item.id !== id) };
    updateDb(newData);
  };

  const stats = [
    { label: 'Projekte', value: db.projects.length, icon: FolderKanban, color: 'bg-brand-pink' },
    { label: 'Aplikime', value: db.applications?.filter(a => a.status === ApplicationStatus.PENDING).length || 0, icon: Users, color: 'bg-brand-cyan' },
    { label: 'Staff', value: db.staff.length, icon: Briefcase, color: 'bg-brand-blue' },
    { label: 'Lajme', value: db.news.length, icon: Newspaper, color: 'bg-brand-lime' },
  ];

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
              { id: 'staff', icon: Briefcase, label: 'Stafi' },
              { id: 'news', icon: Newspaper, label: 'Lajmet' },
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
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tight">Menaxhimi i VRSH</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className={`${stat.color} w-12 h-12 rounded-2xl text-white flex items-center justify-center mb-6`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-brand-dark">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
             <div className="space-y-8 animate-in fade-in">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Projektet</h1>
                 <button onClick={() => handleOpenProjectModal()} className="bg-brand-pink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Shto Projekt
                 </button>
               </div>
               <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Emri</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-right">Veprimet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.projects.map(p => (
                      <tr key={p.id}>
                        <td className="px-8 py-6 flex items-center space-x-3">
                           <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                           <span className="font-bold">{p.title}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-4 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase">{p.status}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => handleOpenProjectModal(p)} className="p-2 text-slate-400 hover:text-brand-pink transition-colors"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('projects', p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
             </div>
          )}

          {/* NEWS SECTION */}
          {activeTab === 'news' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">Lajmet & Raportet</h1>
                <button onClick={() => handleOpenNewsModal()} className="bg-brand-lime text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Shto Lajm
                </button>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Titulli</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategoria</th>
                      <th className="px-8 py-5 text-right">Veprimet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.news.map(n => (
                      <tr key={n.id}>
                        <td className="px-8 py-6">
                           <span className="font-bold text-sm">{n.title}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-4 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase">{n.category}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => handleOpenNewsModal(n)} className="p-2 text-slate-400 hover:text-brand-pink transition-colors"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('news', n.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* STAFF SECTION */}
          {activeTab === 'staff' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">Stafi & Bordi</h1>
                <button onClick={() => handleOpenStaffModal()} className="bg-brand-cyan text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Shto Anëtar
                </button>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Anëtari</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Roli</th>
                      <th className="px-8 py-5 text-right">Veprimet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.staff.map(s => (
                      <tr key={s.id}>
                        <td className="px-8 py-6 flex items-center space-x-3">
                           <img src={s.image} className="w-10 h-10 rounded-full object-cover bg-slate-100" />
                           <span className="font-bold">{s.name}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-black uppercase text-slate-500">{s.role}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => handleOpenStaffModal(s)} className="p-2 text-slate-400 hover:text-brand-pink transition-colors"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('staff', s.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APPLICATIONS SECTION */}
          {activeTab === 'applications' && (
            <div className="space-y-8 animate-in fade-in">
               <h1 className="text-3xl font-black text-brand-dark uppercase">Aplikimet</h1>
               <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aplikanti</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-right">Veprimet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.applications?.map(app => (
                      <tr key={app.id}>
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                             <span className="font-bold text-brand-dark">{app.userName}</span>
                             <span className="text-[10px] text-slate-400">{app.userEmail}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${
                             app.status === ApplicationStatus.PENDING ? 'bg-brand-orange/10 text-brand-orange' :
                             app.status === ApplicationStatus.APPROVED ? 'bg-brand-lime/10 text-brand-lime' :
                             'bg-red-50 text-red-500'
                           }`}>
                             {app.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button onClick={() => { setSelectedApp(app); setShowAppModal(true); }} className="px-6 py-2 bg-slate-50 text-brand-dark rounded-full text-[9px] font-black uppercase tracking-widest">Shiko Detajet</button>
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

      {/* --- MODALS --- */}

      {/* Staff Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingStaff ? 'Edito Anëtarin' : 'Shto Anëtar të Ri'}</h2>
               <button onClick={() => setShowStaffModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Emri Mbiemri</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Roli</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Fotoja</label>
                  <div onClick={() => staffImageRef.current?.click()} className="cursor-pointer h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-50">
                    {staffForm.image ? <img src={staffForm.image} className="w-full h-full object-cover" /> : <Camera className="text-slate-300" />}
                  </div>
                  <input type="file" hidden ref={staffImageRef} accept="image/*" onChange={async e => {
                    // Fix: Properly handle target files with explicit type casting to avoid 'unknown' errors
                    const input = e.target as HTMLInputElement;
                    const file = input.files?.[0];
                    if (file) setStaffForm({...staffForm, image: await handleFileRead(file)});
                  }} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400">Bio e Shkurtër</label>
                   <textarea rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl" value={staffForm.bio} onChange={e => setStaffForm({...staffForm, bio: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                   <input type="text" placeholder="Facebook Link" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" value={staffForm.socials.facebook} onChange={e => setStaffForm({...staffForm, socials: {...staffForm.socials, facebook: e.target.value}})} />
                   <input type="text" placeholder="Instagram Link" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" value={staffForm.socials.instagram} onChange={e => setStaffForm({...staffForm, socials: {...staffForm.socials, instagram: e.target.value}})} />
                   <input type="text" placeholder="LinkedIn Link" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" value={staffForm.socials.linkedin} onChange={e => setStaffForm({...staffForm, socials: {...staffForm.socials, linkedin: e.target.value}})} />
                </div>
                <button onClick={handleSaveStaff} className="w-full py-5 bg-brand-cyan text-white rounded-2xl font-black uppercase">Ruaj Anëtarin</button>
             </div>
          </div>
        </div>
      )}

      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingNews ? 'Edito Lajmin' : 'Shto Lajm të Ri'}</h2>
               <button onClick={() => setShowNewsModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <input type="text" placeholder="Titulli" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})}>
                    <option>Lajmet e fundit</option>
                    <option>Media</option>
                    <option>Raportet</option>
                  </select>
                  <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={newsForm.datePosted} onChange={e => setNewsForm({...newsForm, datePosted: e.target.value})} />
                </div>
                <textarea rows={6} placeholder="Përmbajtja e lajmit..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium" value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} />
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Linku ose Dokumenti</label>
                  <div className="flex space-x-2">
                    <input type="text" placeholder="URL e burimit" className="flex-grow px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl" value={newsForm.fileUrl} onChange={e => setNewsForm({...newsForm, fileUrl: e.target.value})} />
                    <button onClick={() => newsFileRef.current?.click()} className="px-6 bg-slate-100 rounded-2xl border border-slate-200 text-slate-400"><Upload className="h-5 w-5" /></button>
                    <input type="file" hidden ref={newsFileRef} onChange={async e => {
                       // Fix: Explicitly type target to access files properly and avoid 'unknown' issues
                       const input = e.target as HTMLInputElement;
                       const file = input.files?.[0];
                       if (file) setNewsForm({...newsForm, fileUrl: await handleFileRead(file)});
                    }} />
                  </div>
                </div>

                <button onClick={handleSaveNews} className="w-full py-5 bg-brand-lime text-white rounded-2xl font-black uppercase">Publiko Lajmin</button>
             </div>
          </div>
        </div>
      )}

      {/* Project Modal (Existing) */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">Informacionet e Projektit</h2>
               <button onClick={() => setShowProjectModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <input type="text" placeholder="Titulli i projektit" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 block">Fotoja Kryesore</label>
                      <div onClick={() => mainImageRef.current?.click()} className="cursor-pointer h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-50">
                         {projectForm.image ? <img src={projectForm.image} className="w-full h-full object-cover" /> : <Camera className="text-slate-300" />}
                      </div>
                      <input type="file" hidden ref={mainImageRef} accept="image/*" onChange={async e => {
                        // Fix: Explicitly type target to access files properly and avoid 'unknown' issues
                        const input = e.target as HTMLInputElement;
                        const file = input.files?.[0];
                        if (file) setProjectForm({...projectForm, image: await handleFileRead(file)});
                      }} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 block">Galeria</label>
                      <div onClick={() => galleryImagesRef.current?.click()} className="cursor-pointer h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50">
                         <div className="flex flex-wrap gap-1 p-2">
                           {projectForm.gallery.slice(0, 4).map((img, i) => <img key={i} src={img} className="w-6 h-6 rounded" />)}
                           <ImageIcon className="text-slate-300" />
                         </div>
                      </div>
                      <input type="file" hidden ref={galleryImagesRef} multiple accept="image/*" onChange={async e => {
                        // Fix: Explicitly type target to access files properly and avoid 'unknown' issues
                        const input = e.target as HTMLInputElement;
                        const files = Array.from(input.files || []);
                        // Fix: Cast each item in the map to File to resolve 'unknown' type errors from Array.from
                        const base64s = await Promise.all(files.map(f => handleFileRead(f as File)));
                        setProjectForm({...projectForm, gallery: [...projectForm.gallery, ...base64s]});
                      }} />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="date" placeholder="Start Date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={projectForm.startDate} onChange={e => setProjectForm({...projectForm, startDate: e.target.value})} />
                  <input type="date" placeholder="End Date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={projectForm.endDate} onChange={e => setProjectForm({...projectForm, endDate: e.target.value})} />
                </div>

                <textarea rows={2} placeholder="Përshkrim i shkurtër" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                <textarea rows={6} placeholder="Detaje të plota të projektit..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl" value={projectForm.longDescription} onChange={e => setProjectForm({...projectForm, longDescription: e.target.value})} />
                
                <button onClick={handleSaveProject} className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black uppercase">Ruaj Projektin</button>
             </div>
          </div>
        </div>
      )}

      {/* Application Detail Modal (Existing) */}
      {showAppModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div>
                 <span className="text-[10px] font-black text-brand-pink uppercase tracking-widest mb-1 block">Detajet e Aplikimit</span>
                 <h2 className="text-2xl font-black text-brand-dark uppercase">{selectedApp.userName}</h2>
               </div>
               <button onClick={() => setShowAppModal(false)}><X className="h-8 w-8 text-slate-300 hover:text-red-500" /></button>
             </div>
             <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-8">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-cyan/10 text-brand-cyan rounded-xl flex items-center justify-center"><Mail className="h-5 w-5" /></div>
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase block">Email</span>
                        <span className="text-sm font-bold">{selectedApp.userEmail}</span>
                      </div>
                   </div>
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-lime/10 text-brand-lime rounded-xl flex items-center justify-center"><Phone className="h-5 w-5" /></div>
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase block">Telefoni</span>
                        <span className="text-sm font-bold">{selectedApp.phone}</span>
                      </div>
                   </div>
                </div>
                <div className="space-y-3">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Fushat e Interesit</span>
                   <div className="flex flex-wrap gap-2">
                      {selectedApp.interests.map((int, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-[9px] font-black uppercase text-slate-500 rounded-lg">{int}</span>
                      ))}
                   </div>
                </div>
                <div className="space-y-3">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Motivimi</span>
                   <div className="bg-slate-50 p-6 rounded-2xl text-slate-600 font-medium text-sm italic leading-relaxed">
                     "{selectedApp.motivation}"
                   </div>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                   <button 
                     onClick={() => {
                        const updatedApps = (db.applications || []).map(a => a.id === selectedApp.id ? { ...a, status: ApplicationStatus.APPROVED } : a);
                        updateDb({ ...db, applications: updatedApps });
                        setShowAppModal(false);
                     }}
                     className="flex-1 py-4 bg-brand-lime text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-brand-lime/20 flex items-center justify-center"
                   >
                     <Check className="h-4 w-4 mr-2" /> Mirato
                   </button>
                   <button 
                     onClick={() => {
                        const updatedApps = (db.applications || []).map(a => a.id === selectedApp.id ? { ...a, status: ApplicationStatus.REJECTED } : a);
                        updateDb({ ...db, applications: updatedApps });
                        setShowAppModal(false);
                     }}
                     className="flex-1 py-4 bg-slate-100 text-red-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                   >
                     <X className="h-4 w-4 mr-2" /> Refuzo
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
