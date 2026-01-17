
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FolderKanban, Users, 
  Plus, Edit2, Trash2, X, Newspaper, Briefcase, Camera, 
  LayoutList
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem, StaffMember, VolunteerApplication } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'staff'>('overview');
  const [db, setDb] = useState(getDb());
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  
  const staffImageRef = useRef<HTMLInputElement>(null);

  const [staffForm, setStaffForm] = useState({
    name: '', role: '', category: 'Stafi Aktual', bio: '', image: '', socials: {}
  });

  const staffCategories = [
    'Kuvendi i Anëtarëve',
    'Bordi i Drejtorëve',
    'Drejtor Ekzekutiv',
    'Stafi Aktual',
    'Vullnetarët'
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

  const handleOpenStaffModal = (member?: StaffMember) => {
    if (member) {
      setEditingStaff(member);
      setStaffForm({
        name: member.name,
        role: member.role,
        category: member.category || 'Stafi Aktual',
        bio: member.bio || '',
        image: member.image || '',
        socials: member.socials || {}
      });
    } else {
      setEditingStaff(null);
      setStaffForm({ name: '', role: '', category: 'Stafi Aktual', bio: '', image: '', socials: {} });
    }
    setShowStaffModal(true);
  };

  const handleSaveStaff = () => {
    if (!staffForm.name || !staffForm.role) return alert("Ju lutem plotësoni emrin dhe pozitën.");
    
    const newStaffMember: StaffMember = {
      id: editingStaff ? editingStaff.id : 's_' + Date.now(),
      name: staffForm.name,
      role: staffForm.role,
      category: staffForm.category,
      bio: staffForm.bio,
      image: staffForm.image || 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&q=80&w=100',
      socials: staffForm.socials
    };

    const updatedStaff = editingStaff
      ? db.staff.map(s => s.id === editingStaff.id ? newStaffMember : s)
      : [...db.staff, newStaffMember];
    
    updateDb({ ...db, staff: updatedStaff });
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
    { label: 'Aplikime', value: db.applications?.length || 0, icon: Users, color: 'bg-brand-cyan' },
    { label: 'Staff', value: db.staff.length, icon: Briefcase, color: 'bg-brand-blue' },
    { label: 'Lajme', value: db.news.length, icon: Newspaper, color: 'bg-brand-lime' },
  ];

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
              { id: 'staff', icon: Briefcase, label: 'Stafi & Ekipi' },
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

      <main className="flex-grow p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in">
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

          {activeTab === 'staff' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">Stafi & Ekipi</h1>
                <button onClick={() => handleOpenStaffModal()} className="bg-brand-cyan text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center shadow-lg shadow-brand-cyan/20">
                  <Plus className="h-4 w-4 mr-2" /> Shto Person
                </button>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Emri</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategoria</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pozita</th>
                      <th className="px-8 py-5 text-right">Veprimet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.staff.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6 flex items-center space-x-3">
                           <img src={s.image} className="w-10 h-10 rounded-full object-cover bg-slate-100" />
                           <span className="font-bold text-sm">{s.name}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-bold uppercase text-slate-400">{s.category}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-black uppercase text-brand-pink">{s.role}</span>
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
        </div>
      </main>

      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingStaff ? 'Edito Personin' : 'Shto Person të Ri'}</h2>
               <button onClick={() => setShowStaffModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="P.sh. Asistente e Projekteve, Anëtar i Bordit..."
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
                
                <button onClick={handleSaveStaff} className="w-full py-5 bg-brand-cyan text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-cyan/20">Ruaj Të Dhënat</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
