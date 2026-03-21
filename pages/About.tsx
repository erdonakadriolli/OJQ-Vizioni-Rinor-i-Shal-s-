
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, Shield, Rocket, Target, 
  Heart, X, Facebook, Instagram, Linkedin, 
  Sparkles, Mail, Star, Quote, Award, Zap
} from 'lucide-react';

const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  const getStaffByCategory = (category: string) => {
    return staff.filter(member => member.category === category);
  };

  const renderMission = () => (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      {/* Premium Hero Mission Split */}
      <section className="grid lg:grid-cols-12 gap-16 items-center pt-8">
        <div className="lg:col-span-5 space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-pink/5 text-brand-pink rounded-full text-[8px] font-black uppercase tracking-[0.4em]">
            <Zap className="h-3 w-3 fill-current" />
            <span>Misioni ynë</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter leading-[0.9]">
            Fuqizimi i <br/>
            <span className="text-brand-pink italic underline decoration-brand-lime/30 underline-offset-8">Gjeneratës</span> <br/>
            së re
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            {t('about.main.desc')}
          </p>
          <div className="flex items-center space-x-4 pt-4">
             <div className="w-12 h-12 rounded-2xl bg-brand-dark flex items-center justify-center text-white shadow-xl shadow-brand-dark/20">
                <Target className="h-6 w-6" />
             </div>
             <div className="h-px flex-1 bg-slate-200"></div>
          </div>
        </div>

        {/* Micro-Bento Compact Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-2 micro-bento-card bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group">
            <div className="w-10 h-10 bg-brand-pink/10 rounded-xl flex items-center justify-center text-brand-pink mb-12 group-hover:scale-110 transition-transform">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-lg font-black text-brand-dark uppercase tracking-tight mb-2">{t('about.fields.1')}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('about.main.goal')}</p>
            </div>
          </div>

          <div className="col-span-1 micro-bento-card bg-brand-dark p-8 rounded-[2.5rem] text-white flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/20 blur-3xl -mr-16 -mt-16"></div>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-lime mb-12">
              <Rocket className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-black uppercase tracking-tight leading-tight">{t('about.fields.2')}</h4>
          </div>

          <div className="micro-bento-card bg-brand-cyan/5 p-6 rounded-[2rem] border border-brand-cyan/10 group hover:bg-brand-cyan hover:text-white transition-all">
             <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-brand-cyan">
               <Sparkles className="h-4 w-4" />
             </div>
             <h4 className="text-[9px] font-black uppercase tracking-widest leading-tight">{t('about.fields.3')}</h4>
          </div>

          <div className="micro-bento-card bg-brand-orange/5 p-6 rounded-[2rem] border border-brand-orange/10 group hover:bg-brand-orange hover:text-white transition-all">
             <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-brand-orange">
               <Users className="h-4 w-4" />
             </div>
             <h4 className="text-[9px] font-black uppercase tracking-widest leading-tight">{t('about.fields.4')}</h4>
          </div>

          <div className="micro-bento-card bg-brand-pink/5 p-6 rounded-[2rem] border border-brand-pink/10 group hover:bg-brand-pink hover:text-white transition-all">
             <div className="w-8 h-8 bg-brand-pink rounded-lg flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-brand-pink">
               <Shield className="h-4 w-4" />
             </div>
             <h4 className="text-[9px] font-black uppercase tracking-widest leading-tight">{t('about.fields.5')}</h4>
          </div>
        </div>
      </section>

      {/* Simplified Banner for Activities */}
      <section className="bg-white rounded-[3.5rem] p-10 md:p-14 border border-slate-100 flex flex-col md:flex-row items-center gap-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-pink"></div>
        <div className="md:w-1/3">
           <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight mb-4">{t('about.activities.title')}</h3>
           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{t('about.activities.desc')}</p>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
           {[1, 2, 3, 4, 5].map(i => (
             <div key={i} className="flex items-center space-x-4 p-4 bg-slate-50/50 rounded-2xl group hover:bg-white hover:shadow-lg hover:shadow-brand-pink/5 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-pink group-hover:scale-150 transition-transform"></div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-tight group-hover:text-brand-dark">{t(`about.activities.list${i}`)}</span>
             </div>
           ))}
        </div>
      </section>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      {/* Executive Spotlight */}
      <section>
        <div className="flex flex-col items-center mb-24">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-pink/5 text-brand-pink rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-4">
            <Sparkles className="h-3 w-3" />
            <span>Ekipi</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter text-center">Meet The Team</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto px-4">
          {[...getStaffByCategory('Executive Director'), ...getStaffByCategory('Current Staff')].map(m => (
            <div key={m.id} onClick={() => setSelectedMember(m)} className="group cursor-pointer flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="w-64 h-64 border-[12px] border-brand-pink transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 shadow-2xl overflow-hidden bg-slate-100">
                  <img src={m.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <h3 className="font-black text-brand-dark uppercase text-2xl mb-1 tracking-tight">{m.name}</h3>
              <p className="text-xs font-black text-brand-pink uppercase tracking-[0.2em] mb-4">{m.role}</p>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3 px-4">
                {m.bio || "Një vizionar/e që punon pa rreshtur për të fuqizuar rininë e Shalës."}
              </p>
              <div className="flex space-x-6">
                <Facebook className="h-5 w-5 text-brand-dark hover:text-brand-pink transition-colors" />
                <Instagram className="h-5 w-5 text-brand-dark hover:text-brand-pink transition-colors" />
                <Linkedin className="h-5 w-5 text-brand-dark hover:text-brand-pink transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Members Assembly Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-cyan/5 text-brand-cyan rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-4">
            <Users className="h-3 w-3" />
            <span>Struktura</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter text-center mb-8">{t('about.structure.assembly')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {getStaffByCategory('Members Assembly').map(m => (
            <div key={m.id} onClick={() => setSelectedMember(m)} className="group cursor-pointer flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-brand-cyan/20 group-hover:border-brand-cyan transition-all duration-500 overflow-hidden bg-slate-100">
                  <img src={m.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <h3 className="font-black text-brand-dark uppercase text-[10px] mb-1 tracking-tight">{m.name}</h3>
              <p className="text-[8px] font-black text-brand-cyan uppercase tracking-[0.2em]">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section>
        <div className="flex flex-col items-center mb-24">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-blue/5 text-brand-blue rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-4">
            <Shield className="h-3 w-3" />
            <span>Bordi</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter text-center">{t('about.structure.board')}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto px-4">
          {getStaffByCategory('Board of Directors').map(m => (
            <div key={m.id} onClick={() => setSelectedMember(m)} className="group cursor-pointer flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="w-56 h-56 border-[10px] border-brand-blue transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2 shadow-xl overflow-hidden bg-slate-100">
                  <img src={m.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <h3 className="font-black text-brand-dark uppercase text-xl mb-1 tracking-tight">{m.name}</h3>
              <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em] mb-4">{m.role}</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2 px-4">
                {m.bio || "Anëtar i bordit drejtues me përvojë të gjerë në menaxhim."}
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-4 w-4 text-brand-dark hover:text-brand-blue transition-colors" />
                <Linkedin className="h-4 w-4 text-brand-dark hover:text-brand-blue transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteers */}
      <section>
        <div className="flex flex-col items-center mb-24">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-lime/5 text-brand-lime rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-4">
            <Heart className="h-3 w-3" />
            <span>Vullnetarët</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter text-center">{t('about.structure.volunteers')}</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-6xl mx-auto px-4">
          {getStaffByCategory('Volunteers').map(m => (
            <div key={m.id} onClick={() => setSelectedMember(m)} className="group cursor-pointer flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-40 h-40 border-[8px] border-brand-lime transition-all duration-500 group-hover:scale-105 shadow-lg overflow-hidden bg-slate-100">
                  <img src={m.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <h3 className="font-black text-brand-dark uppercase text-sm mb-1 tracking-tight">{m.name}</h3>
              <p className="text-[8px] font-black text-brand-lime uppercase tracking-[0.2em]">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Luxury Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-brand-dark/95 backdrop-blur-xl animate-in fade-in duration-500">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative animate-in zoom-in duration-400">
              <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 p-4 bg-slate-50 hover:bg-brand-pink hover:text-white rounded-full transition-all z-20 shadow-sm"><X className="h-5 w-5" /></button>
              <div className="flex flex-col md:flex-row h-full">
                 <div className="w-full md:w-1/2 aspect-square bg-slate-100">
                    <img src={selectedMember.image} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1 p-10 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                      <span className="text-[9px] font-black text-brand-pink uppercase tracking-[0.4em] mb-3 block">{selectedMember.category}</span>
                      <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-2 leading-none">{selectedMember.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{selectedMember.role}</p>
                    </div>
                    <div className="relative mb-10">
                       <Quote className="absolute -top-6 -left-6 h-12 w-12 text-slate-50 -z-10" />
                       <p className="text-base text-slate-600 font-medium leading-relaxed italic relative z-10">
                          {selectedMember.bio || "Një vizionar/e që punon pa rreshtur për të fuqizuar rininë e Shalës."}
                       </p>
                    </div>
                    <div className="flex items-center space-x-4 pt-8 border-t border-slate-100">
                       <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-pink hover:text-white transition-all"><Facebook className="h-4 w-4" /></a>
                       <a href="#" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-pink hover:text-white transition-all"><Instagram className="h-4 w-4" /></a>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Modern Compact Switcher */}
        <div className="flex items-center justify-center mb-24">
          <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-[2.5rem] border border-slate-100 shadow-lg flex items-center group">
            <button 
              onClick={() => window.location.hash = '#/about/mission'} 
              className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${(!section || section === 'mission') ? 'bg-brand-dark text-white shadow-xl scale-105' : 'text-slate-400 hover:text-brand-dark hover:bg-white'}`}
            >
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>{t('nav.mission')}</span>
              </div>
            </button>
            <button 
              onClick={() => window.location.hash = '#/about/staff'} 
              className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${section === 'staff' ? 'bg-brand-dark text-white shadow-xl scale-105' : 'text-slate-400 hover:text-brand-dark hover:bg-white'}`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Ekipi</span>
              </div>
            </button>
          </div>
        </div>
        
        {section === 'staff' ? renderStaff() : renderMission()}
      </div>
    </div>
  );
};

export default About;
