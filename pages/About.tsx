
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { 
  Target, Award, BookOpen, UserCheck, ArrowRight, 
  Users, ShieldCheck, Briefcase, LayoutList, 
  Heart, Zap 
} from 'lucide-react';

const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  const getStaffByCategory = (category: string) => {
    return staff.filter(member => member.category === category);
  };

  const StaffCard = ({ member, compact = false }: { member: StaffMember, compact?: boolean }) => (
    <div className={`flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-100 group hover:shadow-md transition-all duration-300 ${compact ? 'py-3' : 'py-4'}`}>
      <div className={`${compact ? 'w-10 h-10' : 'w-14 h-14'} rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-50 shadow-sm`}>
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h5 className={`font-black text-brand-dark leading-none mb-1 ${compact ? 'text-[11px]' : 'text-sm'}`}>{member.name}</h5>
        <p className="text-[9px] font-bold text-brand-pink uppercase tracking-widest">{member.role}</p>
      </div>
    </div>
  );

  const renderMission = () => (
    <div className="space-y-20 animate-in fade-in duration-700">
      <section className="text-center max-w-4xl mx-auto">
        <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Kush jemi ne</span>
        <h1 className="text-4xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter mb-8">Vizioni Rinor i Shalës</h1>
        <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
          "VRSH është një organizatë joqeveritare rinore e përkushtuar fuqizimit të të rinjve dhe zhvillimit të komunitetit përmes edukimit, inovacionit dhe pjesëmarrjes aktive qytetare."
        </p>
        <div className="h-2 w-32 bg-brand-pink mx-auto mt-12 rounded-full"></div>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
           <h3 className="text-2xl font-black text-brand-dark uppercase mb-6 flex items-center">
             <Target className="mr-3 text-brand-pink h-6 w-6" /> Fushat e Veprimit
           </h3>
           <ul className="space-y-4">
             {[
               'Fuqizimi i të rinjve dhe lidershipi rinor',
               'Edukimi joformal dhe zhvillimi profesional',
               'Aftësitë digjitale dhe teknologjia (IT, Web, Media)',
               'Vullnetarizmi dhe angazhimi qytetar në Shalë',
               'Barazia gjinore dhe përfshirja sociale'
             ].map((item, idx) => (
               <li key={idx} className="flex items-center text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-lime mr-3"></div>
                 {item}
               </li>
             ))}
           </ul>
        </div>
        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
           <h3 className="text-2xl font-black text-brand-dark uppercase mb-6 flex items-center">
             <Award className="mr-3 text-brand-orange h-6 w-6" /> Qëllimi ynë
           </h3>
           <div className="space-y-6">
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Ne synojmë që fshati Shalë të jetë një shembull i aktivizmit rinor në Kosovë, ku teknologjia dhe tradita bashkohen për të krijuar mundësi të reja.
              </p>
              <div className="flex items-center space-x-2 text-brand-pink font-black text-[10px] uppercase tracking-widest cursor-pointer hover:translate-x-1 transition-transform">
                <span>Mëso më shumë rreth projekteve</span>
                <ArrowRight className="h-4 w-4" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Ekipi & Struktura</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter mb-4">Stafi dhe Udhëheqja</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-lg leading-relaxed">
            Struktura e përkushtuar e VRSH-së që punon çdo ditë për komunitetin tonë.
          </p>
        </div>

        <div className="grid gap-12">
          
          {/* 1. Drejtor Ekzekutiv */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Drejtor Ekzekutiv</h4>
            </div>
            <div className="max-w-md">
              {getStaffByCategory('Drejtor Ekzekutiv').map(m => <StaffCard key={m.id} member={m} />)}
            </div>
          </div>

          {/* 2. Stafi Aktual */}
          <div className="bg-slate-900 p-10 md:p-14 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 bg-brand-cyan rounded-2xl flex items-center justify-center">
                  <LayoutList className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight">Stafi Aktual & Koordinatorët</h4>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getStaffByCategory('Stafi Aktual').map(m => (
                  <div key={m.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/20">
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h5 className="font-black text-white text-sm leading-none mb-1">{m.name}</h5>
                      <p className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Kuvendi i Anëtarëve */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-dark text-white rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Kuvendi i Anëtarëve</h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getStaffByCategory('Kuvendi i Anëtarëve').map(m => <StaffCard key={m.id} member={m} compact />)}
            </div>
          </div>

          {/* 4. Bordi i Drejtorëve */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-pink text-white rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Bordi i Drejtorëve</h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getStaffByCategory('Bordi i Drejtorëve').map(m => <StaffCard key={m.id} member={m} compact />)}
            </div>
          </div>

          {/* 5. Vullnetarët */}
          <div className="bg-brand-lime/5 p-10 rounded-[3rem] border border-brand-lime/10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-brand-lime text-white rounded-xl flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Vullnetarët</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shtylla kryesore e VRSH</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {getStaffByCategory('Vullnetarët').map(m => (
                <div key={m.id} className="text-center group">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <h6 className="text-[10px] font-black text-brand-dark uppercase leading-tight line-clamp-1">{m.name}</h6>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-slate-400 italic text-center font-medium">
              Vullnetarët janë shtylla kryesore e VRS, të përfshirë në planifikim, zbatim dhe promovim të aktiviteteve.
            </p>
          </div>

        </div>
      </section>
    </div>
  );

  return (
    <div className="py-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 mb-16 bg-white p-2 rounded-3xl inline-flex border border-slate-100 shadow-sm">
          <button onClick={() => window.location.hash = '#/about/mission'} className={`px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${(!section || section === 'mission') ? 'bg-brand-dark text-white' : 'text-slate-400 hover:text-brand-dark'}`}>Misioni & Veprimtaria</button>
          <button onClick={() => window.location.hash = '#/about/staff'} className={`px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${section === 'staff' ? 'bg-brand-dark text-white' : 'text-slate-400 hover:text-brand-dark'}`}>Ekipi & Struktura</button>
        </div>
        {section === 'staff' ? renderStaff() : renderMission()}
      </div>
    </div>
  );
};

export default About;
