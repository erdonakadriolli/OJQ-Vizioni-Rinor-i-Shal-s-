
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { Shield, Users, Zap, Star, Facebook, Instagram, Linkedin, Target, Award, BookOpen, UserCheck } from 'lucide-react';

const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

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
             <Award className="mr-3 text-brand-orange h-6 w-6" /> Struktura Organizative
           </h3>
           <div className="space-y-6">
              <div>
                <h4 className="text-xs font-black text-brand-dark uppercase mb-1">Asambleja e Anëtarëve</h4>
                <p className="text-xs text-slate-500 font-medium">Organi më i lartë vendimmarrës i organizatës.</p>
              </div>
              <div>
                <h4 className="text-xs font-black text-brand-dark uppercase mb-1">Bordi i Drejtorëve</h4>
                <p className="text-xs text-slate-500 font-medium">Mbikëqyr funksionimin dhe siguron transparencën.</p>
              </div>
              <div>
                <h4 className="text-xs font-black text-brand-dark uppercase mb-1">Vullnetarët</h4>
                <p className="text-xs text-slate-500 font-medium">Zemra e VRS, të angazhuar në çdo iniciativë komunitare.</p>
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
      <div className="text-center">
        <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Ekipi ynë</span>
        <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-4">Struktura Udhëheqëse</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Njihuni me stafin dhe bordin e dedikuar që punon çdo ditë për të realizuar vizionin tonë në Shalë.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {staff.map((member) => (
          <div key={member.id} className="group relative">
            <div className="relative overflow-hidden rounded-[3rem] aspect-[4/5] bg-slate-100 shadow-sm group-hover:shadow-2xl transition-all duration-700">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-80 group-hover:opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex space-x-3 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                   <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-pink transition-colors"><Facebook className="h-4 w-4 text-white" /></a>
                   <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-pink transition-colors"><Instagram className="h-4 w-4 text-white" /></a>
                   <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-pink transition-colors"><Linkedin className="h-4 w-4 text-white" /></a>
                </div>
                <h4 className="text-2xl font-black text-white uppercase leading-none mb-2">{member.name}</h4>
                <p className="text-brand-pink text-[9px] font-black uppercase tracking-[0.2em]">{member.role}</p>
              </div>
            </div>
            <div className="mt-6 px-4">
              <p className="text-slate-500 text-xs font-bold italic leading-relaxed">"{member.bio}"</p>
            </div>
          </div>
        ))}
      </div>
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
