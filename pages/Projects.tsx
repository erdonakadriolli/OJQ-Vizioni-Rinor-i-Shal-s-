
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Filter, CheckCircle2 } from 'lucide-react';
import { Project, ProjectStatus, User, UserRole, ApplicationStatus } from '../types';
import { getDb, saveDb } from '../services/mockDb';

interface ProjectsProps {
  user: User | null;
}

const Projects: React.FC<ProjectsProps> = ({ user }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const db = getDb();
    setProjects(db.projects);
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApply = (project: Project) => {
    if (!user) {
      window.location.hash = '/login';
      return;
    }

    setApplyingTo(project.id);

    setTimeout(() => {
      const db = getDb();
      const newApp = {
        id: 'app_' + Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        projectId: project.id,
        projectTitle: project.title,
        status: ApplicationStatus.PENDING,
        dateApplied: new Date().toISOString().split('T')[0]
      };
      
      db.applications.push(newApp);
      saveDb(db);
      
      setApplyingTo(null);
      setSuccessMessage(`Aplikimi juaj për "${project.title}" u dërgua me sukses!`);
      
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 1500);
  };

  return (
    <div className="py-16 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-brand-pink font-bold uppercase tracking-widest text-[10px] mb-2 block">Veprimtaria dhe Ndikimi</span>
            <h1 className="text-5xl font-black text-brand-dark mb-4 uppercase">Llojet e Projekteve</h1>
            <p className="text-slate-500 font-medium max-w-xl">Shikoni projektet tona edukative, mjedisore dhe fushatat sociale në rajonin e Shalës.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Kërko aktivitetin..." 
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-full focus:ring-2 focus:ring-brand-pink outline-none w-full sm:w-72 shadow-sm font-medium transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-full p-1 shadow-sm">
              {['All', 'Active', 'Completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {f === 'All' ? 'Të gjitha' : f === 'Active' ? 'Aktive' : 'Të mbyllura'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="mb-10 p-5 bg-white border-l-4 border-brand-lime text-brand-dark rounded-r-2xl flex items-center shadow-xl animate-in slide-in-from-top-4">
            <div className="bg-brand-lime p-2 rounded-full mr-4 text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="font-bold">{successMessage}</p>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-300">
            <Filter className="h-16 w-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-xl font-black text-brand-dark uppercase">Nuk u gjet asnjë projekt</h3>
            <p className="text-slate-400 font-medium mt-2">Provoni të ndryshoni filtrat ose termat e kërkimit.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col group border-b-4 border-b-transparent hover:border-b-brand-pink">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg ${
                      project.status === ProjectStatus.ACTIVE ? 'bg-brand-lime text-white' : 'bg-slate-700 text-white'
                    }`}>
                      {project.status === ProjectStatus.ACTIVE ? 'Aktive' : 'Mbyllur'}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white uppercase leading-tight">{project.title}</h3>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <p className="text-slate-600 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4 mb-10 pt-6 border-t border-slate-50">
                    <div className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      <Calendar className="h-4 w-4 mr-3 text-brand-pink" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                    <div className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      <Users className="h-4 w-4 mr-3 text-brand-cyan" />
                      <span>{project.volunteerCount} Vullnetarë pjesëmarrës</span>
                    </div>
                  </div>

                  <button 
                    disabled={project.status !== ProjectStatus.ACTIVE || applyingTo === project.id}
                    onClick={() => handleApply(project)}
                    className={`mt-auto w-full py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-lg ${
                      project.status !== ProjectStatus.ACTIVE 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-brand-dark text-white hover:bg-brand-pink shadow-brand-pink/10'
                    }`}
                  >
                    {applyingTo === project.id ? (
                      <div className="flex items-center justify-center">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Duke aplikuar...
                      </div>
                    ) : project.status === ProjectStatus.ACTIVE ? 'Apliko si Vullnetar' : 'Projekti i Mbyllur'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
