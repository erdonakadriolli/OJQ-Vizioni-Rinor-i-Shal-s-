
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts';
import { 
  LayoutDashboard, FolderKanban, Users, Calendar, Megaphone, 
  Plus, Search, Edit2, Trash2, Check, X, Sparkles, Wand2
} from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { Project, VolunteerApplication, ApplicationStatus, ProjectStatus } from '../types';
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
    { label: 'Total Projects', value: db.projects.length, icon: FolderKanban, color: 'bg-blue-500' },
    { label: 'Total Volunteers', value: db.users.filter(u => u.role === 'VOLUNTEER').length, icon: Users, color: 'bg-emerald-500' },
    { label: 'Pending Apps', value: db.applications.filter(a => a.status === ApplicationStatus.PENDING).length, icon: Calendar, color: 'bg-amber-500' },
    { label: 'News Updates', value: db.news.length, icon: Megaphone, color: 'bg-purple-500' },
  ];

  // Chart data
  const projectStats = db.projects.map(p => ({ name: p.title.substring(0, 10) + '...', volunteers: p.volunteerCount }));
  const appStatusData = [
    { name: 'Approved', value: db.applications.filter(a => a.status === ApplicationStatus.APPROVED).length },
    { name: 'Pending', value: db.applications.filter(a => a.status === ApplicationStatus.PENDING).length },
    { name: 'Rejected', value: db.applications.filter(a => a.status === ApplicationStatus.REJECTED).length },
  ];

  const handleAppStatus = (id: string, status: ApplicationStatus) => {
    const updatedApps = db.applications.map(a => a.id === id ? { ...a, status } : a);
    const newDb = { ...db, applications: updatedApps };
    setDb(newDb);
    saveDb(newDb);
  };

  const deleteProject = (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const updatedProjects = db.projects.filter(p => p.id !== id);
    const newDb = { ...db, projects: updatedProjects };
    setDb(newDb);
    saveDb(newDb);
  };

  const handleGeneratePitch = async () => {
    if (!newProject.title || !newProject.keywords) {
      alert("Please enter a title and keywords first.");
      return;
    }
    setAiLoading(true);
    const pitch = await generateProjectPitch(newProject.title, newProject.keywords);
    setNewProject(prev => ({ ...prev, description: pitch }));
    setAiLoading(false);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const createdProject: Project = {
      id: 'p_' + Date.now(),
      title: newProject.title,
      description: newProject.description,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      status: ProjectStatus.ACTIVE,
      volunteerCount: 0,
      image: `https://picsum.photos/seed/${newProject.title}/800/600`
    };
    
    const updatedDb = { ...db, projects: [...db.projects, createdProject] };
    setDb(updatedDb);
    saveDb(updatedDb);
    setShowProjectModal(false);
    setNewProject({ title: '', description: '', startDate: '', endDate: '', keywords: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0">
        <div className="p-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Management</p>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-semibold text-sm">Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FolderKanban className="h-5 w-5" />
              <span className="font-semibold text-sm">Projects</span>
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'applications' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Calendar className="h-5 w-5" />
              <span className="font-semibold text-sm">Applications</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-x-hidden">
        {activeTab === 'overview' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              <span className="text-sm text-slate-500">Last updated: Today, {new Date().toLocaleTimeString()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                  <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Volunteer Distribution</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectStats}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                      <Bar dataKey="volunteers" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Application Status</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={appStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          <Cell key="0" fill="#10b981" />, // Approved
                          <Cell key="1" fill="#f59e0b" />, // Pending
                          <Cell key="2" fill="#ef4444" />  // Rejected
                        ]}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Manage Projects</h1>
              <button 
                onClick={() => setShowProjectModal(true)}
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
              >
                <Plus className="h-5 w-5 mr-2" /> New Project
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Title</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Volunteers</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Dates</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {db.projects.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{p.title}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${p.status === ProjectStatus.ACTIVE ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{p.volunteerCount}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{p.startDate} - {p.endDate}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteProject(p.id)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          >
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

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Volunteer Applications</h1>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Volunteer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Project</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {db.applications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{app.userName}</p>
                        <p className="text-xs text-slate-500">{app.userEmail}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-700">{app.projectTitle}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === ApplicationStatus.APPROVED ? 'bg-emerald-100 text-emerald-700' : 
                          app.status === ApplicationStatus.PENDING ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{app.dateApplied}</td>
                      <td className="px-6 py-4 text-right">
                        {app.status === ApplicationStatus.PENDING && (
                          <div className="flex items-center justify-end space-x-2">
                            <button 
                              onClick={() => handleAppStatus(app.id, ApplicationStatus.APPROVED)}
                              className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleAppStatus(app.id, ApplicationStatus.REJECTED)}
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Project Creation Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Create New Project</h2>
                <p className="text-sm text-slate-500">Add a new initiative to UnityBridge</p>
              </div>
              <button onClick={() => setShowProjectModal(false)} className="text-slate-400 hover:text-slate-900">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateProject} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Project Title</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={newProject.startDate}
                    onChange={e => setNewProject({...newProject, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={newProject.endDate}
                    onChange={e => setNewProject({...newProject, endDate: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">AI Pitch Keywords</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. water, health, africa, solar"
                      className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={newProject.keywords}
                      onChange={e => setNewProject({...newProject, keywords: e.target.value})}
                    />
                    <button 
                      type="button"
                      onClick={handleGeneratePitch}
                      disabled={aiLoading}
                      className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-all flex items-center shadow-lg shadow-purple-500/20 disabled:opacity-50"
                    >
                      {aiLoading ? (
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-6 py-3 text-slate-600 font-bold hover:text-slate-900"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-10 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
