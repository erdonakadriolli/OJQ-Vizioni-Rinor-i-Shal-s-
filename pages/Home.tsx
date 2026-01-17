
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Target, Zap, Heart, Shield, Facebook, Instagram, Linkedin, Code, BookOpen, UserCheck, Star, MapPin, UserPlus } from 'lucide-react';
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
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1920" 
            alt="Shalë, Lipjan Youth" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="px-4 py-2 bg-brand-pink/20 backdrop-blur-md border border-brand-pink/30 text-brand-pink rounded-full font-black uppercase text-[10px] tracking-[0.3em] mb-8 animate-pulse">
            Vizioni Rinor i Shalës — Komuna Lipjan
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
            Fuqizimi i Rinisë<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink via-brand-orange to-brand-lime">
              në fshatin Shalë.
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mb-12 font-medium leading-relaxed">
            Një organizatë joqeveritare e përkushtuar ndaj zhvillimit të komunitetit në Shalë, Lipjan, duke ofruar platforma konkrete për edukim joformal, inovacion dhe aktivizëm qytetar.
          </p>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-6">
            <Link to="/join" className="px-12 py-5 bg-brand-pink text-white rounded-full font-black uppercase text-sm hover:bg-white hover:text-brand-pink transition-all shadow-2xl flex items-center justify-center tracking-widest group">
              Apliko si Vullnetar <UserPlus className="ml-3 h-5 w-5" />
            </Link>
            <Link to="/projects" className="px-12 py-5 bg-white text-brand-dark rounded-full font-black uppercase text-sm hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center tracking-widest group">
              Projektet tona <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-brand-dark uppercase mb-8 leading-tight">Misioni i <span className="text-brand-pink">Vizionit Rinor</span></h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Vizioni Rinor i Shalës (VRSH) është një platformë dedikuar fuqizimit të të rinjve dhe zhvillimit të komunitetit në rajonin e Shalës, Lipjan. Ne synojmë të transformojmë fshatin tonë në një qendër të inovacionit dhe lidershipit rinor.
            </p>
            <div className="space-y-4">
              {[
                'Fuqizimi i të rinjve dhe lidershipi rinor lokal',
                'Edukimi joformal dhe zhvillimi profesional',
                'Aftësitë digjitale dhe teknologjia për të ardhmen',
                'Vullnetarizmi dhe angazhimi qytetar në Lipjan'
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
              <h4 className="font-black text-brand-dark uppercase text-xs">Teknologji</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <UserCheck className="h-10 w-10 text-brand-pink mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">Lidership</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <BookOpen className="h-10 w-10 text-brand-orange mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">Edukimi</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <Target className="h-10 w-10 text-brand-lime mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">Ndikimi</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-black text-brand-dark mb-6 uppercase tracking-tighter">Vlerat tona</h2>
          <div className="h-2 w-40 bg-brand-pink mx-auto rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: Shield, title: 'Transparenca', color: 'bg-brand-pink', desc: 'Transparencë dhe llogaridhënie e plotë në çdo veprimtari tonën.' },
            { icon: Users, title: 'Bashkëpunimi', color: 'bg-brand-lime', desc: 'Përfshirje e të gjithë akterëve relevantë për të mirën e komunitetit.' },
            { icon: Zap, title: 'Inovacioni', color: 'bg-brand-orange', desc: 'Zgjidhje kreative dhe teknologjike për sfidat e të rinjve.' },
            { icon: Star, title: 'Ndryshimi', color: 'bg-brand-cyan', desc: 'Angazhim i palodhur për ndryshim pozitiv në fshatin Shalë.' },
          ].map((pillar, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:-translate-y-2 transition-all">
              <div className={`w-20 h-20 ${pillar.color} rounded-[1.5rem] flex items-center justify-center mb-8 text-white shadow-xl`}>
                <pillar.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase leading-none">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-semibold">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto bg-brand-dark rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <MapPin className="h-64 w-64 text-brand-pink" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Bëhu pjesë e ndryshimit</h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium">
            Vizioni Rinor i Shalës mbetet një platformë e hapur për çdo të ri që dëshiron të mësojë dhe të kontribuojë në fshatin tonë në Lipjan.
          </p>
          <div className="flex justify-center">
            <Link to="/join" className="bg-brand-pink text-white px-16 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white hover:text-brand-pink transition-all shadow-xl shadow-brand-pink/20 flex items-center">
               Apliko si Vullnetar <UserPlus className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
