
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { 
  Target, Award, BookOpen, UserCheck, ArrowRight, 
  Users, ShieldCheck, Briefcase, LayoutList, 
  UserRound, Wrench, Globe, Megaphone, Heart, 
  Facebook, Instagram, Linkedin, Zap 
} from 'lucide-react';

const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  // Helper function to filter staff by role category
  const getStaffByRole = (roleKey: string) => {
    return staff.filter(member => 
      member.role.toLowerCase().includes(roleKey.toLowerCase())
    );
  };

  const StaffCard = ({ member }: { member: StaffMember }) => (
    <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-md transition-all duration-300">
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h5 className="font-black text-brand-dark text-sm leading-none mb-1">{member.name}</h5>
        <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest">{member.role}</p>
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
               {/* Fixed: Zap icon import added to lucide-react list */}
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
    <div className="space-y-24 animate-in slide-in-from-bottom-8 duration-700">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Struktura jonë</span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-6">Anëtarët, Stafi dhe Vullnetarët</h2>
          <p className="text-slate-500 max-w-3xl mx-auto font-bold text-lg leading-relaxed">
            VRS funksionon falë një strukture të përkushtuar që përfshin:
          </p>
        </div>

        <div className="grid gap-8">
          {/* 1. Asambleja e Anëtarëve */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-brand-dark text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase">Asamblenë e Anëtarëve <span className="text-slate-400 text-sm font-bold block normal-case">— organi më i lartë vendimmarrës</span></h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStaffByRole('Asamble').map(m => <StaffCard key={m.id} member={m} />)}
              {getStaffByRole('Asamble').length === 0 && <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic p-4">Nuk ka anëtarë të regjistruar akoma</p>}
            </div>
          </div>

          {/* 2. Bordin e Drejtorëve */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-brand-pink text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase">Bordin e Drejtorëve <span className="text-slate-400 text-sm font-bold block normal-case">— udhëheq dhe mbikëqyr strategjinë</span></h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStaffByRole('Bord').map(m => <StaffCard key={m.id} member={m} />)}
              {getStaffByRole('Bord').length === 0 && <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic p-4">Nuk ka anëtarë të regjistruar akoma</p>}
            </div>
          </div>

          {/* 3. Drejtorin Ekzekutiv */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-brand-orange text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase">Drejtorin Ekzekutiv <span className="text-slate-400 text-sm font-bold block normal-case">— përgjegjës për menaxhimin dhe zbatimin</span></h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStaffByRole('Drejtor Ekzekutiv').map(m => <StaffCard key={m.id} member={m} />)}
            </div>
          </div>

          {/* 4. Koordinatorët dhe Stafi i Zyrës */}
          <div className="bg-slate-900 text-white p-10 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 bg-brand-cyan rounded-2xl flex items-center justify-center">
                  <LayoutList className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-black uppercase">Koordinatorët e Projekteve dhe Stafi i Zyrës</h4>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h5 className="text-brand-cyan font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center">
                      <UserRound className="h-3 w-3 mr-2" /> Koordinatorët e projekteve
                    </h5>
                    <div className="space-y-3">
                      {getStaffByRole('Koordinator').map(m => <StaffCard key={m.id} member={m} />)}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-brand-lime font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center">
                      <Wrench className="h-3 w-3 mr-2" /> Asistentët e trajnimeve
                    </h5>
                    <div className="space-y-3">
                      {getStaffByRole('Asistent').map(m => <StaffCard key={m.id} member={m} />)}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h5 className="text-brand-orange font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center">
                      <Globe className="h-3 w-3 mr-2" /> Administrata dhe logjistika
                    </h5>
                    <div className="space-y-3">
                      {getStaffByRole('Administrata').map(m => <StaffCard key={m.id} member={m} />)}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-brand-pink font-black text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center">
                      <Megaphone className="h-3 w-3 mr-2" /> Komunikimi dhe marketingu
                    </h5>
                    <div className="space-y-3">
                      {getStaffByRole('Komunikimi').map(m => <StaffCard key={m.id} member={m} />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Vullnetarët */}
          <div className="bg-brand-lime/10 p-8 rounded-[3rem] border border-brand-lime/20 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-brand-lime text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase">Vullnetarët <span className="text-slate-500 text-sm font-bold block normal-case">— zemra e organizatës</span></h4>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getStaffByRole('Vullnetar').map(m => <StaffCard key={m.id} member={m} />)}
              {getStaffByRole('Vullnetar').length === 0 && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic p-4">Nuk ka vullnetarë zyrtarë të shfaqur akoma</p>}
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
