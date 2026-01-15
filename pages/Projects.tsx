
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

    // Simulate API delay
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
      setSuccessMessage(`Successfully applied for ${project.title}!`);
      
      setTimeout(() => setSuccessMessage(null), 5000);
    }, 1500);
  };

  return (
    <div className="py-12 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Explore Projects</h1>
            <p className="text-slate-600">Discover initiatives where your skills can create real value.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
              {['All', 'Active', 'Completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="mb-8 p-4 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-lg flex items-center shadow-sm animate-bounce">
            <CheckCircle2 className="h-5 w-5 mr-3" />
            {successMessage}
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <Filter className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No projects found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col group">
                <div className="relative h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      project.status === ProjectStatus.ACTIVE ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-1">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-xs text-slate-500">
                      <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>{project.startDate} to {project.endDate}</span>
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <Users className="h-4 w-4 mr-2 text-emerald-600" />
                      <span>{project.volunteerCount} Volunteers participating</span>
                    </div>
                  </div>

                  <button 
                    disabled={project.status !== ProjectStatus.ACTIVE || applyingTo === project.id}
                    onClick={() => handleApply(project)}
                    className={`mt-auto w-full py-3 rounded-xl font-bold text-sm transition-all ${
                      project.status !== ProjectStatus.ACTIVE 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20'
                    }`}
                  >
                    {applyingTo === project.id ? (
                      <div className="flex items-center justify-center">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Applying...
                      </div>
                    ) : project.status === ProjectStatus.ACTIVE ? 'Apply as Volunteer' : 'Project Ended'}
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
