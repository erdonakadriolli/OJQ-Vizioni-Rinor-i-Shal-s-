
import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { 
  LayoutDashboard, FolderKanban, Users, Calendar, Megaphone, 
  Plus, Edit2, Trash2, Check, X, Sparkles, FileText, Newspaper, Tv, Clock, Download, ExternalLink, Upload, Link as LinkIcon, Briefcase, Camera, Facebook, Instagram, Linkedin, Image as ImageIcon, Phone, Mail, UserCheck
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem, StaffMember, VolunteerApplication } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'reports' | 'staff'>('overview');
  const [db, setDb] = useState(getDb());
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryImagesRef = useRef<HTMLInputElement>(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    startDate: '',
    endDate: '',
    keywords: '',
    image: '',
    gallery: [] as string[]
  });

  useEffect(() => {
    setDb(getDb());
  }, []);

  const stats = [
    { label: 'Projekte Totale', value: db.projects.length, icon: FolderKanban, color: 'bg-brand-pink' },
    { label: 'Aplikime të reja', value: db.applications?.filter(a => a.status === ApplicationStatus.PENDING).length || 0, icon: Users, color: 'bg-brand-cyan' },
    { label: 'Staff Aktiv', value: db.staff.length, icon: Briefcase, color: 'bg-brand-blue' },
    { label: 'Lajme & Raporte', value: db.news.length, icon: Megaphone, color: 'bg-brand-lime' },
  ];

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
        image: '',
        gallery: []
      });
    }
    setShowProjectModal(true);
  };

  const handleFileRead = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await handleFileRead(file);
      setProjectForm(prev => ({ ...prev, image: base64 }));
    }
  };

  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const base64s = await Promise.all(files.map(file => handleFileRead(file)));
      setProjectForm(prev => ({ ...prev, gallery: [...prev.gallery, ...base64s] }));
    }
  };

  const handleSaveProject = () => {
    if (!projectForm.title || !projectForm.image) {
      alert("Ju lutem plotësoni titullin dhe ngarkoni foton kryesore.");
      return;
    }
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

  const handleUpdateAppStatus = (id: string, status: ApplicationStatus) => {
    const updatedApps = (db.applications || []).map(a => a.id === id ? { ...a, status } : a);
    const newDb = { ...db, applications: updatedApps };
    setDb(newDb);
    saveDb(newDb);
    setShowAppModal(false);
  };

  const deleteProject = (id: string) => {
    if (!confirm('A jeni të sigurt që dëshironi të fshini këtë projekt?')) return;
    const updatedProjects = db.projects.filter(p => p.id !== id);
    const newDb = { ...db, projects: updatedProjects };
    setDb(newDb);
    saveDb(newDb);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
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

      <main className="flex-grow p-8 md:p-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
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

          {activeTab === 'projects' && (
             <div className="space-y-8">
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
                          <button onClick={() => deleteProject(p.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
             </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Aplikimet</h1>
               </div>
               <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aplikanti</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-right">Veprimet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {(db.applications || []).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                          Nuk ka aplikime të reja
                        </td>
                      </tr>
                    ) : (
                      db.applications.map(app => (
                        <tr key={app.id}>
                          <td className="px-8 py-6">
                             <div className="flex flex-col">
                               <span className="font-bold text-brand-dark">{app.userName}</span>
                               <span className="text-[10px] text-slate-400">{app.userEmail}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-slate-500 text-[10px] font-bold">
                             {app.dateApplied}
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
                             <button 
                               onClick={() => { setSelectedApp(app); setShowAppModal(true); }}
                               className="px-6 py-2 bg-slate-50 text-brand-dark rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-brand-pink hover:text-white transition-all"
                             >
                               Shiko Detajet
                             </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Application Detail Modal */}
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
                     onClick={() => handleUpdateAppStatus(selectedApp.id, ApplicationStatus.APPROVED)}
                     className="flex-1 py-4 bg-brand-lime text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-brand-lime/20 flex items-center justify-center"
                   >
                     <Check className="h-4 w-4 mr-2" /> Mirato Aplikimin
                   </button>
                   <button 
                     onClick={() => handleUpdateAppStatus(selectedApp.id, ApplicationStatus.REJECTED)}
                     className="flex-1 py-4 bg-slate-100 text-red-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                   >
                     <X className="h-4 w-4 mr-2" /> Refuzo
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
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
                      <input type="file" hidden ref={mainImageRef} accept="image/*" onChange={handleMainImageChange} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 block">Galeria (Shumë foto)</label>
                      <div onClick={() => galleryImagesRef.current?.click()} className="cursor-pointer h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 overflow-hidden">
                         <div className="flex flex-wrap gap-1 p-2">
                           {projectForm.gallery.slice(0, 4).map((img, i) => <img key={i} src={img} className="w-6 h-6 rounded" />)}
                           <ImageIcon className="text-slate-300" />
                         </div>
                      </div>
                      <input type="file" hidden ref={galleryImagesRef} multiple accept="image/*" onChange={handleGalleryImagesChange} />
                   </div>
                </div>

                <textarea rows={2} placeholder="Përshkrim i shkurtër" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                <textarea rows={6} placeholder="Detaje të plota të projektit..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl" value={projectForm.longDescription} onChange={e => setProjectForm({...projectForm, longDescription: e.target.value})} />
                
                <button onClick={handleSaveProject} className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black uppercase">Ruaj Projektin</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
