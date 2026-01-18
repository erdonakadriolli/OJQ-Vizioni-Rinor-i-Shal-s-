
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
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter text-center">Ekipi Ekzekutiv</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {getStaffByCategory('Executive Director').map(m => (
            <div key={m.id} onClick={() => setSelectedMember(m)} className="group relative pt-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-pink/10 rounded-full blur-[70px] group-hover:bg-brand-pink/20 transition-all"></div>
              <div className="relative bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-pink scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden -mt-24 mb-6 shadow-xl border-4 border-white transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                  <img src={m.image} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-brand-dark uppercase text-xl mb-1">{m.name}</h3>
                <p className="text-[9px] font-black text-brand-pink uppercase tracking-[0.3em] mb-6 bg-brand-pink/5 px-4 py-1 rounded-full">{m.role}</p>
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-brand-pink hover:text-white transition-all"><Facebook className="h-4 w-4" /></div>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-brand-pink hover:text-white transition-all"><Instagram className="h-4 w-4" /></div>
                </div>
              </div>
            </div>
          ))}
          
          {getStaffByCategory('Current Staff').map(m => (
            <div key={m.id} onClick={() => setSelectedMember(m)} className="group relative pt-16">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-cyan/10 rounded-full blur-[60px] group-hover:bg-brand-cyan/20 transition-all"></div>
              <div className="relative bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></div>
                <div className="w-28 h-28 rounded-[2.2rem] overflow-hidden -mt-20 mb-6 shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                  <img src={m.image} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-brand-dark uppercase text-lg mb-1">{m.name}</h3>
                <p className="text-[9px] font-black text-brand-cyan uppercase tracking-[0.3em] mb-6 bg-brand-cyan/5 px-4 py-1 rounded-full">{m.role}</p>
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                   <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-brand-cyan hover:text-white transition-all"><Mail className="h-4 w-4" /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Assembly & Board */}
      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-3xl"></div>
          <div className="flex items-center space-x-4 mb-10 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple"><Users className="h-5 w-5" /></div>
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-tight">{t('about.structure.assembly')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
            {getStaffByCategory('Members Assembly').map(m => (
              <div key={m.id} onClick={() => setSelectedMember(m)} className="p-3 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                <img src={m.image} className="w-11 h-11 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <h5 className="text-[10px] font-black text-brand-dark uppercase tracking-tight">{m.name}</h5>
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl"></div>
          <div className="flex items-center space-x-4 mb-10 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue"><Shield className="h-5 w-5" /></div>
            <h2 className="text-xl font-black text-brand-dark uppercase tracking-tight">{t('about.structure.board')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
            {getStaffByCategory('Board of Directors').map(m => (
              <div key={m.id} onClick={() => setSelectedMember(m)} className="p-3 rounded-2xl flex items-center space-x-4 cursor-pointer hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                <img src={m.image} className="w-11 h-11 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div>
                  <h5 className="text-[10px] font-black text-brand-dark uppercase tracking-tight">{m.name}</h5>
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Volunteer Galaxy */}
      <section className="relative py-24 px-10 rounded-[4rem] bg-brand-dark text-white text-center overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-pink rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-lime rounded-full blur-[100px] animate-pulse-slow"></div>
        </div>
        
        <div className="relative z-10">
          <Heart className="h-10 w-10 text-brand-pink mx-auto mb-8 animate-float" />
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">{t('about.structure.volunteers')}</h2>
          <p className="text-slate-400 font-medium text-base max-w-2xl mx-auto mb-16 italic opacity-80">"{t('about.structure.volunteers.desc')}"</p>
          
          <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
            {getStaffByCategory('Volunteers').map(m => (
              <div key={m.id} className="group cursor-pointer flex flex-col items-center" onClick={() => setSelectedMember(m)}>
                 <div className="relative w-20 h-20 mb-4">
                    <img src={m.image} className="w-full h-full rounded-full object-cover border-2 border-brand-dark group-hover:border-brand-pink shadow-lg relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="absolute -bottom-1 -right-1 bg-brand-pink text-white p-1.5 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 z-20">
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                 </div>
                 <h6 className="text-[9px] font-black uppercase mt-1 tracking-widest group-hover:text-brand-pink transition-colors">{m.name}</h6>
              </div>
            ))}
          </div>
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
    <div className="min-h-screen pt-40 px-6">
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
                <span>Misioni</span>
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
