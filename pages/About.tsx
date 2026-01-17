
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { 
  Target, Award, BookOpen, UserCheck, ArrowRight, 
  Users, ShieldCheck, Briefcase, LayoutList, 
  UserRound, Wrench, Globe, Megaphone, Heart, 
  Zap 
} from 'lucide-react';

const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  // Helper function to filter staff by a specific category tag in their role or bio (using role for grouping)
  const getStaffByCategory = (categoryName: string) => {
    // We assume the admin puts the category in the role or we handle it via string matching
    // For this version, we'll match based on the role string or a hidden tag if we had one.
    // Let's use string inclusion for the fixed categories.
    return staff.filter(member => 
      member.role.toLowerCase().includes(categoryName.toLowerCase())
    );
  };

  // Staff Actual is anyone who doesn't fit the other 4 "Fixed" categories
  const getStafiAktual = () => {
    const fixedCategories = ['kuvendi', 'bordi', 'drejtor ekzekutiv', 'vullnetar'];
    return staff.filter(member => {
      const roleLower = member.role.toLowerCase();
      return !fixedCategories.some(cat => roleLower.includes(cat));
    });
  };

  const StaffCard = ({ member, compact = false }: { member: StaffMember, compact?: boolean }) => (
    <div className={`flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-100 group hover:shadow-md transition-all duration-300 ${compact ? 'py-3' : 'py-4'}`}>
      <div className={`${compact ? 'w-10 h-10' : 'w-14 h-14'} rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-50 shadow-sm`}>
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h5 className={`font-black text-brand-dark leading-none mb-1 ${compact ? 'text-xs' : 'text-sm'}`}>{member.name}</h5>
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

      <section className="bg-brand-dark rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase mb-8 leading-tight">Veprimtaria & <span className="text-brand-lime">Ndikimi</span></h2>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Që nga themelimi, organizata ka realizuar dhjetëra aktivitete që kanë përfshirë qindra të rinj, gra dhe nxënës të fshatit Shalë dhe rrethinës në Komunën e Lipjanit.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">100+</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Aktivitete</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-brand-pink">500+</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Pjesëmarrës</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
             <div className="flex items-start space-x-4">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0"><BookOpen className="text-brand-cyan h-6 w-6" /></div>
               <div>
                 <h4 className="font-black uppercase text-sm mb-1">Edukimi</h4>
                 <p className="text-xs text-slate-500">Trajnime për aftësi të buta dhe profesionale falas.</p>
               </div>
             </div>
             <div className="flex items-start space-x-4">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0"><Zap className="text-brand-orange h-6 w-6" /></div>
               <div>
                 <h4 className="font-black uppercase text-sm mb-1">Inovacioni</h4>
                 <p className="text-xs text-slate-500">Aftësimi i të rinjve në teknologji dhe media digjitale.</p>
               </div>
             </div>
             <div className="flex items-start space-x-4">
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0"><UserCheck className="text-brand-lime h-6 w-6" /></div>
               <div>
                 <h4 className="font-black uppercase text-sm mb-1">Pjesëmarrja</h4>
                 <p className="text-xs text-slate-500">Nxitja e aktivizmit dhe lidershipit në Lipjan.</p>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Ekipi & Struktura</span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-6">Stafi dhe Udhëheqja</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-lg leading-relaxed">
            VRS funksionon falë një strukture të përkushtuar që ndahet në këto nivele:
          </p>
        </div>

        <div className="grid gap-10">
          
          {/* 1. Kuvendi i Anëtarëve */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-dark text-white rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Kuvendi i Anëtarëve <span className="text-slate-400 text-xs font-bold lowercase ml-2 tracking-normal">— organi më i lartë vendimmarrës</span></h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStaffByCategory('Kuvendi').map(m => <StaffCard key={m.id} member={m} compact />)}
            </div>
          </div>

          {/* 2. Bordi Drejtues */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-pink text-white rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Bordi Drejtues <span className="text-slate-400 text-xs font-bold lowercase ml-2 tracking-normal">— udhëheq strategjinë e organizatës</span></h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStaffByCategory('Bord').map(m => <StaffCard key={m.id} member={m} compact />)}
            </div>
          </div>

          {/* 3. Drejtor Ekzekutiv */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Drejtor Ekzekutiv <span className="text-slate-400 text-xs font-bold lowercase ml-2 tracking-normal">— përgjegjës për zbatimin e projekteve</span></h4>
            </div>
            <div className="max-w-sm">
              {getStaffByCategory('Drejtor Ekzekutiv').map(m => <StaffCard key={m.id} member={m} />)}
            </div>
          </div>

          {/* 4. Stafi Aktual (Custom Roles) */}
          <div className="bg-slate-900 p-10 md:p-14 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 bg-brand-cyan rounded-2xl flex items-center justify-center">
                  <LayoutList className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight">Stafi Aktual</h4>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getStafiAktual().map(m => (
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

          {/* 5. Vullnetarët */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-lime text-white rounded-xl flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Vullnetarët <span className="text-slate-400 text-xs font-bold lowercase ml-2 tracking-normal">— zemra dhe energjia e VRSH</span></h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getStaffByCategory('Vullnetar').map(m => <StaffCard key={m.id} member={m} compact />)}
            </div>
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
          <button onClick={() => window.location.hash = '#/about/staff'} className={`px-8 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${section === 'staff' ? 'bg-brand-dark text-white' : 'text-slate-400 hover:text-brand-dark'}`}>Stafi & Struktura</button>
        </div>
        {section === 'mission' && renderMission()}
        {section === 'staff' && renderStaff()}
        {!section && renderMission()}
      </div>
    </div>
  );
};

export default About;
