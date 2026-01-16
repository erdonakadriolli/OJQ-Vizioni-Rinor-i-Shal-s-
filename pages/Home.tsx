
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Target, Zap, Heart, Shield, Facebook, Instagram, Linkedin, Code, BookOpen, UserCheck, Star } from 'lucide-react';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';

const Home: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1510797215324-95aa89f43c33?auto=format&fit=crop&q=80&w=1920" 
            alt="Shala Region Landscape" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="px-4 py-2 bg-brand-pink/20 backdrop-blur-md border border-brand-pink/30 text-brand-pink rounded-full font-black uppercase text-[10px] tracking-[0.3em] mb-8 animate-pulse">
            Vizioni Rinor i Shalës
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
            Fuqizimi i Rinisë<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink via-brand-orange to-brand-lime">
              për Komunitetin.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mb-12 font-medium leading-relaxed">
            Vizioni Rinor i Shalës është një organizatë joqeveritare rinore e përkushtuar ndaj edukimit, inovacionit dhe pjesëmarrjes aktive qytetare në rajonin e Shalës.
          </p>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-6">
            <Link to="/projects" className="px-12 py-5 bg-white text-brand-dark rounded-full font-black uppercase text-sm hover:bg-brand-pink hover:text-white transition-all shadow-2xl flex items-center justify-center tracking-widest group">
              Eksploro Aktivitetet <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Derived from PDF Page 1 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-brand-dark uppercase mb-8 leading-tight">Misioni i <span className="text-brand-pink">VRS</span></h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Organizata synon të krijojë mundësi konkrete për të rinjtë që të zhvillojnë aftësi personale, profesionale dhe digjitale, si dhe të nxisë lidershipin rinor dhe aktivizmin komunitar.
            </p>
            <div className="space-y-4">
              {[
                'Trajnime falas për të rinjtë dhe të papunët',
                'Mentorim dhe mbështetje për zhvillim karriere',
                'Ngritje kapacitetesh për stafin dhe vullnetarët',
                'Aktivitete komunitare në terren'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-slate-700 font-bold uppercase text-[10px] tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-brand-lime"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <Code className="h-10 w-10 text-brand-cyan mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">Aftësi Digjitale</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <UserCheck className="h-10 w-10 text-brand-pink mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">Lidership Rinor</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <BookOpen className="h-10 w-10 text-brand-orange mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">Edukimi Joformal</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <Target className="h-10 w-10 text-brand-lime mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">Inovacion</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Derived from PDF Page 1 */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-brand-dark mb-6 uppercase tracking-tighter">Vlerat e Organizatës</h2>
            <div className="h-2 w-40 bg-brand-pink mx-auto rounded-full mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Shield, title: 'Transparencë', color: 'bg-brand-pink', desc: 'Transparencë dhe përgjegjësi në çdo veprimtari tonën.' },
              { icon: Users, title: 'Bashkëpunim', color: 'bg-brand-lime', desc: 'Bashkëpunim dhe përfshirje e të gjithë akterëve relevantë.' },
              { icon: Zap, title: 'Inovacion', color: 'bg-brand-orange', desc: 'Inovacion dhe kreativitet në zgjidhjen e sfidave.' },
              { icon: Star, title: 'Ndryshim', color: 'bg-brand-cyan', desc: 'Angazhim për ndryshim pozitiv në komunitet.' },
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                <div className={`w-20 h-20 ${pillar.color} rounded-[1.5rem] flex items-center justify-center mb-8 text-white shadow-xl group-hover:-translate-y-2 transition-transform`}>
                  <pillar.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase leading-none">{pillar.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-semibold">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure Section - Derived from PDF Page 2 */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-brand-pink font-bold uppercase tracking-widest text-[10px] mb-4 block">Struktura Organizative</span>
            <h2 className="text-5xl font-black text-brand-dark uppercase tracking-tighter mb-4">Ekipi dhe Struktura</h2>
            <div className="h-1.5 w-24 bg-brand-pink mx-auto rounded-full"></div>
            <p className="mt-8 text-slate-500 max-w-2xl mx-auto font-medium">VRS funksionon falë një strukture të përkushtuar që siguron arritjen e misionit tonë afatgjatë.</p>
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
                    <h4 className="text-xl font-black text-white uppercase leading-tight mb-1">{member.name}</h4>
                    <p className="text-brand-pink text-[10px] font-black uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
                <div className="mt-6 px-4">
                  <p className="text-slate-500 text-xs font-medium leading-relaxed italic line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Impact - Derived from PDF Page 3 */}
      <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-lime rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-pink rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-5xl font-black uppercase mb-8 leading-tight">Vizion <span className="text-brand-lime">Afatgjatë</span></h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium">
              VRS synon të zgjerojë ndikimin e saj duke krijuar më shumë hapësira për edukim joformal, inovacion rinor, projekte digjitale dhe bashkëpunime ndërkombëtare, me qëllim ndërtimin e një shoqërie aktive, të barabartë dhe të qëndrueshme.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-brand-pink font-black uppercase text-[10px] tracking-widest mb-2">Partneritete</h4>
                <p className="text-xs text-slate-400">Institucione publike lokale dhe OJQ ndërkombëtare.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <h4 className="text-brand-cyan font-black uppercase text-[10px] tracking-widest mb-2">Ndikimi</h4>
                <p className="text-xs text-slate-400">Qindra të rinj të trajnuar dhe aktivë në terren.</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" 
              alt="Community interaction" 
              className="rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-slate-100">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Target className="h-64 w-64 text-brand-pink" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-brand-dark mb-8 uppercase tracking-tighter">Bëhu pjesë e VRS</h2>
          <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Vizioni Rinor i Shalës mbetet një platformë e hapur për të rinjtë që dëshirojnë të kontribuojnë, të mësojnë dhe të ndërtojnë një të ardhme më të mirë.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/login" className="bg-brand-pink text-white px-16 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-pink/20 inline-block">
              Regjistrohu si Vullnetar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
