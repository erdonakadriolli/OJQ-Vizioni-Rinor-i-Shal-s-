
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FolderKanban, Users, 
  Plus, Edit2, Trash2, Check, X, Newspaper, Briefcase, Camera, Image as ImageIcon, Phone, Mail, FileText, Link as LinkIcon, Globe,
  Upload, LayoutList
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem, StaffMember, VolunteerApplication } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'staff'>('overview');
  const [db, setDb] = useState(getDb());
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);

  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryImagesRef = useRef<HTMLInputElement>(null);
  const newsFileRef = useRef<HTMLInputElement>(null);
  const staffImageRef = useRef<HTMLInputElement>(null);

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', longDescription: '', startDate: '', endDate: '', image: '', gallery: [] as string[]
  });

  const [newsForm, setNewsForm] = useState({
    title: '', content: '', category: 'Lajmet e fundit', datePosted: new Date().toISOString().split('T')[0], fileUrl: ''
  });

  const [staffForm, setStaffForm] = useState({
    name: '', role: '', category: 'Stafi Aktual', bio: '', image: '', socials: { facebook: '', instagram: '', linkedin: '' }
  });

  // Fixed categories for organization
  const staffCategories = [
    'Kuvendi i Anëtarëve',
    'Bordi Drejtues',
    'Drejtor Ekzekutiv',
    'Stafi Aktual',
    'Vullnetar'
  ];

  useEffect(() => {
    setDb(getDb());
  }, []);

  const handleFileRead = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

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

  const handleOpenNewsModal = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item);
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

  const handleOpenStaffModal = (member?: StaffMember) => {
    if (member) {
      setEditingStaff(member);
      // Try to determine category from the role or bio if we had it, 
      // but for now we'll let admin re-pick if editing
      let initialCategory = 'Stafi Aktual';
      if (member.role.includes('Kuvendi')) initialCategory = 'Kuvendi i Anëtarëve';
      else if (member.role.includes('Bord')) initialCategory = 'Bordi Drejtues';
      else if (member.role.includes('Drejtor Ekzekutiv')) initialCategory = 'Drejtor Ekzekutiv';
      else if (member.role.includes('Vullnetar')) initialCategory = 'Vullnetar';

      setStaffForm({
        name: member.name,
        role: member.role,
        category: initialCategory,
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
      setStaffForm({ name: '', role: '', category: 'Stafi Aktual', bio: '', image: '', socials: { facebook: '', instagram: '', linkedin: '' } });
    }
    setShowStaffModal(true);
  };

  const handleSaveStaff = () => {
    if (!staffForm.name || !staffForm.image || !staffForm.role) return alert("Plotësoni emrin, foton dhe pozitën.");
    
    // We combine category knowledge into the role string for simple filtering on About page
    // If it's a fixed category, we make sure that keyword is in the role
    let finalRole = staffForm.role;
    if (staffForm.category === 'Kuvendi i Anëtarëve' && !finalRole.includes('Kuvendi')) {
        finalRole = `Anëtar i Kuvendit (${finalRole})`;
    } else if (staffForm.category === 'Bordi Drejtues' && !finalRole.includes('Bord')) {
        finalRole = `Anëtar i Bordit (${finalRole})`;
    } else if (staffForm.category === 'Drejtor Ekzekutiv') {
        finalRole = 'Drejtor Ekzekutiv';
    } else if (staffForm.category === 'Vullnetar' && !finalRole.includes('Vullnetar')) {
        finalRole = `Vullnetar (${finalRole})`;
    }

    const newStaff = editingStaff
      ? db.staff.map(s => s.id === editingStaff.id ? { ...s, ...staffForm, role: finalRole } : s)
      : [...db.staff, { id: 's' + Date.now(), ...staffForm, role: finalRole }];
    
    updateDb({ ...db, staff: newStaff });
    setShowStaffModal(false);
  };

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

          {/* PROJECTS, STAFF, NEWS ... (the sections are same but we update modal) */}
          {activeTab === 'projects' && (
             <div className="space-y-8 animate-in fade-in">
               <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-black text-brand-dark uppercase">Projektet</h1>
                 <button onClick={() => handleOpenProjectModal()} className="bg-brand-pink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center">
                   <Plus className="h-4 w-4 mr-2" /> Shto Projekt
                 </button>
               </div>
               {/* table here as before... */}
             </div>
          )}

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
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Roli / Pozita</th>
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
          
          {/* applications, news tabs as before... */}
        </div>
      </main>

      {/* --- STAFF MODAL (UPDATED) --- */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingStaff ? 'Edito Anëtarin' : 'Shto Anëtar të Ri'}</h2>
               <button onClick={() => setShowStaffModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Emri Mbiemri</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-brand-cyan outline-none" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Kategoria Organizative</label>
                    <select 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-brand-cyan outline-none" 
                      value={staffForm.category} 
                      onChange={e => setStaffForm({...staffForm, category: e.target.value})}
                    >
                      {staffCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400">Pozita / Roli (Shkruaj manualisht)</label>
                   <input 
                      type="text" 
                      placeholder="P.sh. Financier, Web Developer, Anëtar i Bordit..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-brand-cyan outline-none" 
                      value={staffForm.role} 
                      onChange={e => setStaffForm({...staffForm, role: e.target.value})}
                   />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Fotoja</label>
                  <div onClick={() => staffImageRef.current?.click()} className="cursor-pointer h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-50">
                    {staffForm.image ? <img src={staffForm.image} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center"><Camera className="text-slate-300 mb-1" /><span className="text-[8px] font-black uppercase text-slate-400">Ngarko Foto</span></div>}
                  </div>
                  <input type="file" hidden ref={staffImageRef} accept="image/*" onChange={async e => {
                    const input = e.target as HTMLInputElement;
                    const file = input.files?.[0];
                    if (file) setStaffForm({...staffForm, image: await handleFileRead(file)});
                  }} />
                </div>
                
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400">Bio e Shkurtër</label>
                   <textarea rows={2} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium focus:ring-2 focus:ring-brand-cyan outline-none" value={staffForm.bio} onChange={e => setStaffForm({...staffForm, bio: e.target.value})} />
                </div>

                <button onClick={handleSaveStaff} className="w-full py-5 bg-brand-cyan text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-cyan/20">Ruaj Anëtarin</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
