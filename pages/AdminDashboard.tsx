
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, FolderKanban, Users, 
  Plus, Edit2, Trash2, X, Newspaper, Briefcase, Camera, 
  Facebook, Instagram, Linkedin, Calendar, Sparkles, Loader2,
  CheckCircle, XCircle, Eye, FileText, ExternalLink
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, ApplicationStatus, ProjectStatus, NewsItem, StaffMember, VolunteerApplication } from '../types';
import { GoogleGenAI } from "@google/genai";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'applications' | 'news' | 'staff'>('overview');
  const [db, setDb] = useState(getDb());
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showAppDetails, setShowAppDetails] = useState<VolunteerApplication | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  
  const staffImageRef = useRef<HTMLInputElement>(null);
  const projectImageRef = useRef<HTMLInputElement>(null);

  const [staffForm, setStaffForm] = useState({
    name: '', role: '', category: 'Current Staff', bio: '', image: '', 
    socials: { facebook: '', instagram: '', linkedin: '' }
  });

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', longDescription: '', startDate: '', endDate: '',
    status: ProjectStatus.Active, image: '', volunteerCount: 0
  });

  const [newsForm, setNewsForm] = useState({
    title: '', content: '', datePosted: '', category: 'Latest News', fileUrl: ''
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

  // AI Generation Function
  const generateWithAi = async (promptType: 'project' | 'news') => {
    const title = promptType === 'project' ? projectForm.title : newsForm.title;
    if (!title) return alert("Please enter a title first.");
    
    setIsAiGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = promptType === 'project' 
        ? `Write a professional and inspiring NGO project description for "Youth Vision of Shale" with the title "${title}". Mention its importance for rural youth in Shale and Lipjan. Around 100 words.`
        : `Write a formal news article for the NGO "VRSH" titled "${title}". Use professional journalistic tone, mention community impact. Around 150 words.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      
      const result = response.text || "";
      if (promptType === 'project') setProjectForm(prev => ({ ...prev, description: result }));
      else setNewsForm(prev => ({ ...prev, content: result }));
    } catch (err) {
      alert("Error during AI generation.");
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
        fileUrl: item.fileUrl || ''
      });
    } else {
      setEditingNews(null);
      setNewsForm({
        title: '', content: '', datePosted: new Date().toISOString().split('T')[0],
        category: 'Latest News', fileUrl: ''
      });
    }
    setShowNewsModal(true);
  };

  const handleSaveNews = () => {
    if (!newsForm.title || !newsForm.content) return alert("Fill in title and content.");
    const newItem: NewsItem = { id: editingNews ? editingNews.id : 'n_' + Date.now(), ...newsForm };
    const updatedNews = editingNews ? db.news.map(n => n.id === editingNews.id ? newItem : n) : [...db.news, newItem];
    updateDb({ ...db, news: updatedNews });
    setShowNewsModal(false);
  };

  const handleAppAction = (id: string, status: ApplicationStatus) => {
    const updatedApps = db.applications.map(app => app.id === id ? { ...app, status } : app);
    updateDb({ ...db, applications: updatedApps });
    if (showAppDetails?.id === id) setShowAppDetails({ ...showAppDetails, status });
  };

  const deleteItem = (type: 'projects' | 'news' | 'staff' | 'applications', id: string) => {
    if (!confirm('Are you sure?')) return;
    updateDb({ ...db, [type]: db[type].filter((item: any) => item.id !== id) });
  };

  const handleOpenProjectModal = (p?: Project) => {
    if (p) { 
      setEditingProject(p); 
      setProjectForm({ 
        title: p.title, 
        description: p.description, 
        longDescription: p.longDescription || '', 
        startDate: p.startDate, 
        endDate: p.endDate, 
        status: p.status, 
        image: p.image, 
        volunteerCount: p.volunteerCount 
      }); 
    }
    else { setEditingProject(null); setProjectForm({ title: '', description: '', longDescription: '', startDate: new Date().toISOString().split('T')[0], endDate: '', status: ProjectStatus.Active, image: '', volunteerCount: 0 }); }
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
        name: s.name,
        role: s.role,
        category: s.category,
        bio: s.bio,
        image: s.image,
        socials: { 
          facebook: s.socials?.facebook || '', 
          instagram: s.socials?.instagram || '', 
          linkedin: s.socials?.linkedin || '' 
        } 
      }); 
    }
    else { setEditingStaff(null); setStaffForm({ name: '', role: '', category: 'Current Staff', bio: '', image: '', socials: { facebook: '', instagram: '', linkedin: '' } }); }
    setShowStaffModal(true);
  };

  const handleSaveStaff = () => {
    if (!staffForm.name) return;
    const newS = { id: editingStaff ? editingStaff.id : 's_' + Date.now(), ...staffForm };
    const updated = editingStaff ? db.staff.map(s => s.id === editingStaff.id ? newS : s) : [...db.staff, newS];
    updateDb({ ...db, staff: updated });
    setShowStaffModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-brand-dark flex-shrink-0 text-white z-20">
        <div className="p-8 sticky top-0 h-screen flex flex-col">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-8 h-8 rounded-full border-2 border-brand-pink flex items-center justify-center">
              <div className="w-3 h-3 bg-brand-pink rounded-full"></div>
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em]">ADMIN PANEL</span>
          </div>
          <nav className="space-y-2 flex-grow">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'projects', icon: FolderKanban, label: 'Projects' },
              { id: 'news', icon: Newspaper, label: 'News' },
              { id: 'staff', icon: Briefcase, label: 'Staff' },
              { id: 'applications', icon: Users, label: 'Applications' },
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
            <div className="space-y-12 animate-in fade-in">
              <h1 className="text-4xl font-black text-brand-dark uppercase tracking-tight">VRSH Management</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Projects', value: db.projects.length, icon: FolderKanban, color: 'bg-brand-pink' },
                  { label: 'Applications', value: db.applications?.length || 0, icon: Users, color: 'bg-brand-cyan' },
                  { label: 'Staff', value: db.staff.length, icon: Briefcase, color: 'bg-brand-blue' },
                  { label: 'News', value: db.news.length, icon: Newspaper, color: 'bg-brand-lime' },
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

          {activeTab === 'news' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">News & Publications</h1>
                <button onClick={() => handleOpenNewsModal()} className="bg-brand-pink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center shadow-lg shadow-brand-pink/20">
                  <Plus className="h-4 w-4 mr-2" /> Add News
                </button>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.news.map(n => (
                      <tr key={n.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-sm text-brand-dark line-clamp-1">{n.title}</td>
                        <td className="px-8 py-6">
                           <span className="px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                             {n.category}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-[10px] font-bold text-slate-400">{n.datePosted}</td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => handleOpenNewsModal(n)} className="p-2 text-slate-400 hover:text-brand-pink"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('news', n.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-8 animate-in fade-in">
              <h1 className="text-3xl font-black text-brand-dark uppercase">Volunteer Applications</h1>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Applicant</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.applications.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                             <span className="font-bold text-sm text-brand-dark">{app.userName}</span>
                             <span className="text-[10px] text-slate-400">{app.userEmail}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                             app.status === ApplicationStatus.APPROVED ? 'bg-brand-lime/10 text-brand-lime' :
                             app.status === ApplicationStatus.REJECTED ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-400'
                           }`}>
                             {app.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-[10px] font-bold text-slate-400">{app.dateApplied}</td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => setShowAppDetails(app)} className="p-2 text-slate-400 hover:text-brand-cyan"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('applications', app.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">Projects</h1>
                <button onClick={() => handleOpenProjectModal()} className="bg-brand-pink text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </button>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {db.projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="px-8 py-6 flex items-center space-x-3">
                           <img src={p.image} className="w-10 h-10 rounded-xl object-cover" />
                           <span className="font-bold text-sm">{p.title}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => handleOpenProjectModal(p)} className="p-2 text-slate-400 hover:text-brand-pink"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('projects', p.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-brand-dark uppercase">Team</h1>
                <button onClick={() => handleOpenStaffModal()} className="bg-brand-cyan text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Add Staff
                </button>
              </div>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-50">
                    {db.staff.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="px-8 py-6 flex items-center space-x-3">
                           <img src={s.image} className="w-10 h-10 rounded-full object-cover" />
                           <span className="font-bold text-sm">{s.name}</span>
                        </td>
                        <td className="px-8 py-6 text-right space-x-2">
                          <button onClick={() => handleOpenStaffModal(s)} className="p-2 text-slate-400 hover:text-brand-pink"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => deleteItem('staff', s.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
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

      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingNews ? 'Edit News' : 'Add New News'}</h2>
               <button onClick={() => setShowNewsModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Title</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-brand-pink" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})}>
                      <option value="Latest News">Latest News</option>
                      <option value="Media">Media</option>
                      <option value="Reports">Reports</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Publication Date</label>
                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={newsForm.datePosted} onChange={e => setNewsForm({...newsForm, datePosted: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center">
                     <label className="text-[10px] font-black uppercase text-slate-400">Content</label>
                     <button onClick={() => generateWithAi('news')} disabled={isAiGenerating} className="text-[9px] font-black text-brand-orange uppercase flex items-center hover:opacity-80 disabled:opacity-50">
                       {isAiGenerating ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />}
                       Write with AI
                     </button>
                   </div>
                   <textarea rows={8} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none resize-none" value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">File/Media Link (Optional)</label>
                  <input type="text" placeholder="https://..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={newsForm.fileUrl} onChange={e => setNewsForm({...newsForm, fileUrl: e.target.value})} />
                </div>
                <button onClick={handleSaveNews} className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-brand-pink/20">Save Publication</button>
             </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {showAppDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in">
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                <div>
                   <span className="text-[10px] font-black text-brand-pink uppercase tracking-widest mb-1 block">Application Details</span>
                   <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tight">{showAppDetails.userName}</h2>
                </div>
                <button onClick={() => setShowAppDetails(null)}><X className="h-8 w-8 text-slate-300" /></button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Contacts</h4>
                       <p className="text-sm font-bold text-brand-dark">{showAppDetails.userEmail}</p>
                       <p className="text-sm font-bold text-slate-500">{showAppDetails.phone}</p>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Interests</h4>
                       <div className="flex flex-wrap gap-2">
                          {showAppDetails.interests.map(i => <span key={i} className="px-2 py-1 bg-slate-100 rounded-lg text-[8px] font-black uppercase text-slate-500">{i}</span>)}
                       </div>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Motivation</h4>
                    <p className="text-sm text-slate-600 italic leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">"{showAppDetails.motivation}"</p>
                 </div>
                 <div className="flex gap-4 pt-6">
                    <button 
                      onClick={() => handleAppAction(showAppDetails.id, ApplicationStatus.APPROVED)}
                      disabled={showAppDetails.status === ApplicationStatus.APPROVED}
                      className="flex-1 py-4 bg-brand-lime text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center disabled:opacity-50"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Approve
                    </button>
                    <button 
                      onClick={() => handleAppAction(showAppDetails.id, ApplicationStatus.REJECTED)}
                      disabled={showAppDetails.status === ApplicationStatus.REJECTED}
                      className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Reject
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
               <button onClick={() => setShowProjectModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Project Title</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                </div>
                <div className="space-y-2 relative">
                   <div className="flex items-center justify-between">
                     <label className="text-[10px] font-black uppercase text-slate-400">Short Description</label>
                     <button onClick={() => generateWithAi('project')} disabled={isAiGenerating} className="text-[9px] font-black text-brand-orange uppercase flex items-center hover:opacity-80">
                        <Sparkles className="h-3 w-3 mr-1" /> Generate with AI
                     </button>
                   </div>
                   <textarea rows={3} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Image (Upload)</label>
                  <div onClick={() => projectImageRef.current?.click()} className="cursor-pointer h-40 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center overflow-hidden bg-slate-50">
                    {projectForm.image ? <img src={projectForm.image} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center"><Camera className="text-slate-300 mb-1" /><span className="text-[8px] font-black uppercase text-slate-400">Upload Image</span></div>}
                  </div>
                  <input type="file" hidden ref={projectImageRef} accept="image/*" onChange={async e => {
                    const file = e.target.files?.[0];
                    if (file) setProjectForm({...projectForm, image: await handleFileRead(file)});
                  }} />
                </div>
                <button onClick={handleSaveProject} className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl">Save Project</button>
             </div>
          </div>
        </div>
      )}

      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between">
               <h2 className="text-2xl font-black text-brand-dark uppercase">{editingStaff ? 'Edit Staff' : 'Add Staff'}</h2>
               <button onClick={() => setShowStaffModal(false)}><X className="h-8 w-8 text-slate-300" /></button>
             </div>
             <div className="p-10 space-y-6">
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} />
                <input type="text" placeholder="Position" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})} />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Photo</label>
                  <div onClick={() => staffImageRef.current?.click()} className="cursor-pointer h-32 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden bg-slate-50">
                    {staffForm.image ? <img src={staffForm.image} className="w-full h-full object-cover" /> : <Camera className="text-slate-300" />}
                  </div>
                  <input type="file" hidden ref={staffImageRef} accept="image/*" onChange={async e => {
                    const file = e.target.files?.[0];
                    if (file) setStaffForm({...staffForm, image: await handleFileRead(file)});
                  }} />
                </div>
                <button onClick={handleSaveStaff} className="w-full py-5 bg-brand-cyan text-white rounded-2xl font-black uppercase text-sm tracking-widest">Save Person</button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
