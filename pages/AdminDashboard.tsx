
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FolderKanban, Users, 
  Plus, Edit2, Trash2, X, Newspaper, Briefcase, Camera, 
  Facebook, Instagram, Linkedin, Calendar, Sparkles, Loader2,
  CheckCircle, XCircle, Eye, FileText, ExternalLink, Image as ImageIcon,
  Save, Globe, Search as SearchIcon, Filter, Upload, File
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem, StaffMember, VolunteerApplication } from '../types';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../context/LanguageContext';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'staff'>('overview');
  const [db, setDb] = useState(getDb());
  // Fix: language property is now correctly provided by useLanguage()
  const { t, language } = useLanguage();
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showAppDetails, setShowAppDetails] = useState<VolunteerApplication | null>(null);
  
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [newsSearch, setNewsSearch] = useState('');
  const [newsFilter, setNewsFilter] = useState('All');

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  
  const staffImageRef = useRef<HTMLInputElement>(null);
  const projectImageRef = useRef<HTMLInputElement>(null);
  const projectGalleryRef = useRef<HTMLInputElement>(null);
  const reportFileRef = useRef<HTMLInputElement>(null);

  const [staffForm, setStaffForm] = useState({
    name: '', role: '', category: 'Current Staff', bio: '', image: '', 
    socials: { facebook: '', instagram: '', linkedin: '' }
  });

  const [projectForm, setProjectForm] = useState<{
    title: string;
    description: string;
    longDescription: string;
    startDate: string;
    endDate: string;
    status: ProjectStatus;
    image: string;
    volunteerCount: number;
    gallery: string[];
  }>({
    title: '', description: '', longDescription: '', startDate: '', endDate: '',
    status: ProjectStatus.Active, image: '', volunteerCount: 0, gallery: []
  });

  const [newsForm, setNewsForm] = useState({
    title: '', content: '', datePosted: '', category: 'Latest News', fileUrl: '', fileName: ''
  });

  useEffect(() => {
    setDb(getDb());
  }, []);

  const updateDb = (newDb: any) => {
    setDb(newDb);
    saveDb(newDb);
  };

  const handleFileRead = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        alert(language === 'AL' ? "Skedari shumë i madh (Max 2.5MB)." : "File too large (Max 2.5MB).");
        return;
      }
      const base64 = await handleFileRead(file);
      setNewsForm({ ...newsForm, fileUrl: base64, fileName: file.name });
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const base64 = await handleFileRead(files[i]);
      newImages.push(base64);
    }
    setProjectForm(prev => ({ ...prev, gallery: [...prev.gallery, ...newImages] }));
  };

  const generateWithAi = async (promptType: 'project' | 'news') => {
    const title = promptType === 'project' ? projectForm.title : newsForm.title;
    if (!title) return alert(t('admin.title') + " required!");
    
    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = promptType === 'project' 
        ? `Write an inspiring description for "${title}" in the village of Shale, Lipjan. Language: ${language === 'AL' ? 'Albanian' : 'English'}.`
        : `Write a professional news summary for "${title}" for an NGO in Kosovo. Language: ${language === 'AL' ? 'Albanian' : 'English'}.`;

      // Fix: Use simple string for contents to comply with latest SDK guidelines for text generation
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      const result = response.text || "";
      if (promptType === 'project') setProjectForm(prev => ({ ...prev, description: result }));
      else setNewsForm(prev => ({ ...prev, content: result }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleOpenNewsModal = (item?: NewsItem) => {
    if (item) {
      setEditingNews(item);
      setNewsForm({
        title: item.title,
        content: item.content,
        datePosted: item.datePosted,
        category: item.category,
        fileUrl: item.fileUrl || '',
        fileName: (item as any).fileName || ''
      });
    } else {
      setEditingNews(null);
      setNewsForm({
        title: '', content: '', datePosted: new Date().toISOString().split('T')[0],
        category: 'Latest News', fileUrl: '', fileName: ''
      });
    }
    setShowNewsModal(true);
  };

  const handleSaveNews = () => {
    if (!newsForm.title) return;
    const newItem = { id: editingNews ? editingNews.id : 'n_' + Date.now(), ...newsForm };
    const updated = editingNews ? db.news.map(n => n.id === editingNews.id ? newItem : n) : [...db.news, newItem];
    updateDb({ ...db, news: updated });
    setShowNewsModal(false);
  };

  const handleOpenProjectModal = (p?: Project) => {
    if (p) {
      setEditingProject(p);
      setProjectForm({
        title: p.title, description: p.description, longDescription: p.longDescription || '',
        startDate: p.startDate, endDate: p.endDate, status: p.status,
        image: p.image, volunteerCount: p.volunteerCount, gallery: p.gallery || []
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '', description: '', longDescription: '', startDate: new Date().toISOString().split('T')[0],
        endDate: '', status: ProjectStatus.Active, image: '', volunteerCount: 0, gallery: []
      });
    }
    setShowProjectModal(true);
  };

  const handleSaveProject = () => {
    if (!projectForm.title) return;
    const newP = { id: editingProject ? editingProject.id : 'p_' + Date.now(), ...projectForm };
    const updated = editingProject ? db.projects.map(p => p.id === editingProject.id ? newP : p) : [...db.projects, newP];
    updateDb({ ...db, projects: updated });
    setShowProjectModal(false);
  };

  const handleOpenStaffModal = (s?: StaffMember) => {
    if (s) {
      setEditingStaff(s);
      setStaffForm({
        name: s.name, role: s.role, category: s.category, bio: s.bio, image: s.image,
        socials: { facebook: s.socials?.facebook || '', instagram: s.socials?.instagram || '', linkedin: s.socials?.linkedin || '' }
      });
    } else {
      setEditingStaff(null);
      setStaffForm({ name: '', role: '', category: 'Current Staff', bio: '', image: '', socials: { facebook: '', instagram: '', linkedin: '' } });
    }
    setShowStaffModal(true);
  };

  const handleSaveStaff = () => {
    if (!staffForm.name) return;
    const newS = { id: editingStaff ? editingStaff.id : 's_' + Date.now(), ...staffForm };
    const updated = editingStaff ? db.staff.map(s => s.id === editingStaff.id ? newS : s) : [...db.staff, newS];
    updateDb({ ...db, staff: updated });
    setShowStaffModal(false);
  };

  const handleAppAction = (appId: string, status: ApplicationStatus) => {
    const updatedApps = db.applications.map(app => app.id === appId ? { ...app, status } : app);
    updateDb({ ...db, applications: updatedApps });
    setShowAppDetails(null);
  };

  const deleteItem = (type: string, id: string) => {
    if (!confirm(t('admin.deleteConfirm'))) return;
    updateDb({ ...db, [type]: (db as any)[type].filter((item: any) => item.id !== id) });
  };

  const filteredAdminNews = db.news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(newsSearch.toLowerCase());
    const matchesFilter = newsFilter === 'All' || n.category === newsFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Nav */}
      <aside className="w-full md:w-72 bg-brand-dark flex-shrink-0 text-white z-20">
        <div className="p-8 sticky top-0 h-screen flex flex-col">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-8 h-8 rounded-full border-2 border-brand-pink flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-pink rounded-full"></div>
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em]">{t('admin.panel')}</span>
          </div>
          <nav className="space-y-2 flex-grow">
            {[
              { id: 'overview', icon: LayoutDashboard, label: t('admin.overview') },
              { id: 'projects', icon: FolderKanban, label: t('admin.projects') },
              { id: 'news', icon: Newspaper, label: t('admin.news') },
              { id: 'staff', icon: Briefcase, label: t('admin.staff') },
              { id: 'applications', icon: Users, label: t('admin.applications') },
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tight">{t('admin.management')}</h1>
                <div className="bg-white px-6 py-2 rounded-full border border-slate-100 flex items-center shadow-sm">
                  <Globe className="h-4 w-4 text-brand-cyan mr-2" />
                  <span className="text-[10px] font-black uppercase text-slate-400">{language}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: t('admin.projects'), value: db.projects.length, icon: FolderKanban, color: 'bg-brand-pink' },
                  { label: t('admin.applications'), value: db.applications?.length || 0, icon: Users, color: 'bg-brand-cyan' },
                  { label: t('admin.staff'), value: db.staff.length, icon: Briefcase, color: 'bg-brand-blue' },
                  { label: t('admin.news'), value: db.news.length, icon: Newspaper, color: 'bg-brand-lime' },
                ].map((stat, i) => (
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

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">{t('admin.projects')}</h1>
                <button onClick={() => handleOpenProjectModal()} className="bg-brand-pink text-white px-8 py-3.5 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center shadow-lg hover:scale-105 transition-all">
                  <Plus className="h-4 w-4 mr-2" /> {t('admin.addProject')}
                </button>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">{t('admin.title')}</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">{t('admin.status')}</th>
                      <th className="px-8 py-5 text-right">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 flex items-center space-x-4">
                           <img src={p.image} className="w-12 h-12 rounded-2xl object-cover" />
                           <span className="font-bold text-sm text-brand-dark">{p.title}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="px-3 py-1 bg-slate-100 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-500">{p.status}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-1">
                          <button onClick={() => handleOpenProjectModal(p)} className="p-2.5 text-slate-400 hover:text-brand-pink rounded-xl"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('projects', p.id)} className="p-2.5 text-slate-400 hover:text-red-500 rounded-xl"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <h1 className="text-3xl font-black text-brand-dark uppercase">{t('admin.news')}</h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input 
                      type="text" 
                      placeholder={t('projects.search')}
                      className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-full text-xs font-bold outline-none focus:ring-2 focus:ring-brand-pink shadow-sm w-48 sm:w-64"
                      value={newsSearch}
                      onChange={(e) => setNewsSearch(e.target.value)}
                    />
                  </div>
                  <button onClick={() => handleOpenNewsModal()} className="bg-brand-lime text-white px-8 py-3.5 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center shadow-lg hover:scale-105 transition-all">
                    <Plus className="h-4 w-4 mr-2" /> {t('admin.addNews')}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.title')}</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('admin.category')}</th>
                      <th className="px-8 py-5 text-right">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredAdminNews.map(n => (
                      <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 font-bold text-sm text-brand-dark line-clamp-1">{n.title}</td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                             n.category === 'Reports' ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-slate-100 text-slate-500'
                           }`}>
                             {n.category === 'Reports' ? t('news.title.reports') : n.category}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-1">
                          <button onClick={() => handleOpenNewsModal(n)} className="p-2.5 text-slate-400 hover:text-brand-pink rounded-xl"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('news', n.id)} className="p-2.5 text-slate-400 hover:text-red-500 rounded-xl"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === 'staff' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">{t('admin.staff')}</h1>
                <button onClick={() => handleOpenStaffModal()} className="bg-brand-cyan text-white px-8 py-3.5 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center shadow-lg hover:scale-105 transition-all">
                  <Plus className="h-4 w-4 mr-2" /> {t('admin.addStaff')}
                </button>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {db.staff.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 flex items-center space-x-4">
                           <img src={s.image} className="w-12 h-12 rounded-full object-cover" />
                           <span className="font-bold text-sm text-brand-dark">{s.name}</span>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-slate-600">{s.role}</td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => handleOpenStaffModal(s)} className="p-2.5 text-slate-400 hover:text-brand-pink rounded-xl"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('staff', s.id)} className="p-2.5 text-slate-400 hover:text-red-500 rounded-xl"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-8 animate-in fade-in">
              <h1 className="text-3xl font-black text-brand-dark uppercase">{t('admin.applications')}</h1>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">{t('admin.applicant')}</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase">{t('admin.status')}</th>
                      <th className="px-8 py-5 text-right">{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.applications?.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 font-bold text-sm text-brand-dark">{app.userName}</td>
                        <td className="px-8 py-6">
                           <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${app.status === ApplicationStatus.APPROVED ? 'bg-brand-lime/10 text-brand-lime' : 'bg-slate-100 text-slate-500'}`}>{app.status}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => setShowAppDetails(app)} className="p-2.5 text-slate-400 hover:text-brand-cyan rounded-xl"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('applications', app.id)} className="p-2.5 text-slate-400 hover:text-red-500 rounded-xl"><Trash2 className="h-4 w-4" /></button>
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

      {/* NEWS & REPORTS MODAL */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight">
                 {editingNews ? t('admin.editNews') : t('admin.addNews')}
               </h2>
               <button onClick={() => setShowNewsModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all"><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('admin.title')}</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('admin.category')}</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})}>
                      <option value="Latest News">{t('news.title.latest')}</option>
                      <option value="Media">{t('news.title.media')}</option>
                      <option value="Reports">{t('news.title.reports')}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('admin.date')}</label>
                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={newsForm.datePosted} onChange={e => setNewsForm({...newsForm, datePosted: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Përmbajtja</label>
                     <button onClick={() => generateWithAi('news')} disabled={isAiGenerating} className="text-[9px] font-black text-brand-orange uppercase flex items-center">
                       {isAiGenerating ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Sparkles className="h-3 w-3 mr-1" />}
                       {t('admin.generateAi')}
                     </button>
                   </div>
                   <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none resize-none" value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} />
                </div>
                <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    {newsForm.category === 'Reports' ? 'Ngarko Dokument (PDF/DOC)' : 'Linku i Burimit / URL'}
                  </label>
                  {newsForm.category === 'Reports' ? (
                    <div className="space-y-4">
                      <div onClick={() => reportFileRef.current?.click()} className="cursor-pointer py-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-white hover:bg-slate-100 transition-all">
                        {newsForm.fileName ? (
                          <div className="flex items-center text-brand-cyan">
                            <File className="h-6 w-6 mr-2" />
                            <span className="text-xs font-bold">{newsForm.fileName}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-6 w-6 text-slate-300 mb-2" />
                            <span className="text-[10px] font-black uppercase text-slate-400">{t('ui.upload')}</span>
                          </>
                        )}
                      </div>
                      <input type="file" hidden ref={reportFileRef} accept=".pdf,.doc,.docx" onChange={handleDocUpload} />
                    </div>
                  ) : (
                    <input type="text" placeholder="https://..." className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold outline-none" value={newsForm.fileUrl} onChange={e => setNewsForm({...newsForm, fileUrl: e.target.value})} />
                  )}
                </div>
                <div className="flex gap-4 pt-4">
                   <button onClick={() => setShowNewsModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-xs tracking-widest">{t('admin.cancel')}</button>
                   <button onClick={handleSaveNews} className="flex-[2] py-4 bg-brand-lime text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center">
                     <Save className="h-4 w-4 mr-2" /> Ruaj Publikimin
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{editingProject ? t('admin.editProject') : t('admin.addProject')}</h2>
               <button onClick={() => setShowProjectModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all"><X className="h-8 w-8 text-slate-400" /></button>
             </div>
             <div className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">{t('admin.title')}</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">{t('admin.status')}</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value as ProjectStatus})}>
                      <option value={ProjectStatus.Active}>{t('projects.filter.active')}</option>
                      <option value={ProjectStatus.Completed}>{t('projects.filter.completed')}</option>
                      <option value={ProjectStatus.Upcoming}>Upcoming</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase text-slate-400">Përmbledhja (AI)</label>
                    <button onClick={() => generateWithAi('project')} disabled={isAiGenerating} className="text-[9px] font-black text-brand-orange uppercase flex items-center">
                       {isAiGenerating ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Sparkles className="h-3 w-3 mr-1" />} Gjenero
                    </button>
                  </div>
                  <textarea rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none resize-none" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">{t('projects.impl')}</label>
                  <textarea rows={5} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none resize-none" value={projectForm.longDescription} onChange={e => setProjectForm({...projectForm, longDescription: e.target.value})} />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400">{t('admin.mainImage')}</label>
                    <div onClick={() => projectImageRef.current?.click()} className="cursor-pointer aspect-video border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden bg-slate-50 hover:bg-slate-100 transition-all">
                      {projectForm.image ? <img src={projectForm.image} className="w-full h-full object-cover" /> : <Camera className="text-slate-300 h-10 w-10" />}
                    </div>
                    <input type="file" hidden ref={projectImageRef} accept="image/*" onChange={async e => {
                      const file = e.target.files?.[0];
                      if (file) setProjectForm({...projectForm, image: await handleFileRead(file)});
                    }} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400">{t('admin.gallery')}</label>
                    <div className="flex flex-col space-y-4">
                      <button onClick={() => projectGalleryRef.current?.click()} className="py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50"><Plus className="h-4 w-4 mr-2" /> Shto Foto</button>
                      <input type="file" hidden ref={projectGalleryRef} multiple accept="image/*" onChange={handleGalleryUpload} />
                      <div className="grid grid-cols-4 gap-2">
                        {projectForm.gallery.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-slate-100">
                            <img src={img} className="w-full h-full object-cover" />
                            <button onClick={() => setProjectForm({...projectForm, gallery: projectForm.gallery.filter((_, i) => i !== idx)})} className="absolute inset-0 bg-red-500/50 opacity-0 hover:opacity-100 flex items-center justify-center text-white"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={handleSaveProject} className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center">
                  <Save className="h-4 w-4 mr-2" /> {t('admin.save')}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* STAFF MODAL */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50">
               <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{editingStaff ? t('admin.editStaff') : t('admin.addStaff')}</h2>
               <button onClick={() => setShowStaffModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition-all"><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Emri i Plotë</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Roli / Pozita</label>
                    <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Kategoria</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={staffForm.category} onChange={e => setStaffForm({...staffForm, category: e.target.value})}>
                    <option value="Executive Director">Executive Director</option>
                    <option value="Current Staff">Current Staff</option>
                    <option value="Members Assembly">Members Assembly</option>
                    <option value="Board of Directors">Board of Directors</option>
                    <option value="Volunteers">Volunteers</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-slate-400">Foto e Profilat</label>
                  <div onClick={() => staffImageRef.current?.click()} className="cursor-pointer h-40 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden bg-slate-50 hover:bg-slate-100 transition-all">
                    {staffForm.image ? <img src={staffForm.image} className="w-full h-full object-cover" /> : <Camera className="text-slate-300 h-8 w-8" />}
                  </div>
                  <input type="file" hidden ref={staffImageRef} accept="image/*" onChange={async e => {
                    const file = e.target.files?.[0];
                    if (file) setStaffForm({...staffForm, image: await handleFileRead(file)});
                  }} />
                </div>
                <button onClick={handleSaveStaff} className="w-full py-5 bg-brand-cyan text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center">
                  <Save className="h-4 w-4 mr-2" /> {t('admin.save')}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* APPLICATION DETAILS MODAL */}
      {showAppDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in">
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                <div>
                   <span className="text-[10px] font-black text-brand-pink uppercase tracking-widest mb-1 block">Aplikimi</span>
                   <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{showAppDetails.userName}</h2>
                </div>
                <button onClick={() => setShowAppDetails(null)}><X className="h-8 w-8 text-slate-300" /></button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Motivimi</h4>
                    <p className="text-sm text-slate-600 italic">"{showAppDetails.motivation}"</p>
                 </div>
                 <div className="flex gap-4 pt-6">
                    <button onClick={() => handleAppAction(showAppDetails.id, ApplicationStatus.APPROVED)} className="flex-1 py-4 bg-brand-lime text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-brand-lime/20">Prano</button>
                    <button onClick={() => handleAppAction(showAppDetails.id, ApplicationStatus.REJECTED)} className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-red-500/20">Refuzo</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
