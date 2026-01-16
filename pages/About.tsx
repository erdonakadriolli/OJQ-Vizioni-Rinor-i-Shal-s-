
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { Shield, Users, Zap, Star, Facebook, Instagram, Linkedin } from 'lucide-react';

const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  const renderMission = () => (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-6">Misioni & Vlerat tona</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Vizioni Rinor i Shalës (VRS) është një organizatë joqeveritare rinore e përkushtuar fuqizimit të të rinjve dhe zhvillimit të komunitetit përmes edukimit, inovacionit dhe pjesëmarjes aktive qytetare.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Shield, title: 'Transparencë', color: 'bg-brand-pink', desc: 'Transparencë dhe përgjegjësi në çdo veprimtari tonën.' },
          { icon: Users, title: 'Bashkëpunim', color: 'bg-brand-lime', desc: 'Bashkëpunim dhe përfshirje e të gjithë akterëve relevantë.' },
          { icon: Zap, title: 'Inovacion', color: 'bg-brand-orange', desc: 'Inovacion dhe kreativitet në zgjidhjen e sfidave.' },
          { icon: Star, title: 'Ndryshim', color: 'bg-brand-cyan', desc: 'Angazhim për ndryshim pozitiv në komunitet.' },
        ].map((pillar, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className={`w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
              <pillar.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-brand-dark mb-3 uppercase leading-none">{pillar.title}</h3>
            <p className="text-slate-500 text-sm font-semibold">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter mb-4">Stafi & Struktura</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Njihuni me ekipin që punon çdo ditë për të realizuar vizionin tonë në rajonin e Shalës.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {staff.map((member) => (
          <div key={member.id} className="group relative">
            <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-slate-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex space-x-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   {member.socials?.facebook && <Facebook className="h-4 w-4 text-white hover:text-brand-pink cursor-pointer" />}
                   {member.socials?.instagram && <Instagram className="h-4 w-4 text-white hover:text-brand-pink cursor-pointer" />}
                   {member.socials?.linkedin && <Linkedin className="h-4 w-4 text-white hover:text-brand-pink cursor-pointer" />}
                </div>
                <h4 className="text-xl font-black text-white uppercase leading-tight mb-1">{member.name}</h4>
                <p className="text-brand-pink text-[10px] font-black uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
            <div className="mt-4 px-2">
              <p className="text-slate-500 text-xs font-medium italic">"{member.bio}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {section === 'mission' && renderMission()}
        {section === 'staff' && renderStaff()}
        {!section && renderMission()}
      </div>
    </div>
  );
};

export default About;
