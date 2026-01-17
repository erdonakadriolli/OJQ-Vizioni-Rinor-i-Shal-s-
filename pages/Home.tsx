
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Target, Zap, Heart, Shield, Facebook, Instagram, Linkedin, Code, BookOpen, UserCheck, Star, MapPin, UserPlus, Bot, MessageSquare, Sparkles } from 'lucide-react';
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

      {/* AI Assistant Promo Section */}
      <section className="py-24 px-6 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-brand-dark to-slate-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
            
            <div className="flex-grow z-10 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-orange/20 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Sparkles className="h-3 w-3" />
                <span>Teknologjia e Re</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                Përshëndetje,<br/>
                unë jam <span className="text-brand-orange">Derdo</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-xl">
                Jam asistenti inteligjent i VRSH. Më pyet për çdo gjë rreth organizatës sonë, trajnimet digjitale, ose si mund të bëhesh pjesë e ekipit tonë.
              </p>
              <Link to="/derdo" className="inline-flex items-center space-x-3 bg-brand-orange text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-orange/20 group">
                <MessageSquare className="h-5 w-5" />
                <span>Bisedo me Derdon</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="w-full md:w-1/3 flex justify-center z-10">
               <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center animate-pulse">
                     <Bot className="h-32 w-32 md:h-48 md:w-48 text-brand-orange" />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white p-6 rounded-3xl shadow-2xl rotate-12">
                     <p className="text-brand-dark font-black text-sm uppercase">AI Powered</p>
                  </div>
               </div>
            </div>
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

      {/* Location Section */}
      <section className="py-24 px-6 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Na Gjeni</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">Lokacioni ynë në <span className="text-brand-pink">Shalë</span></h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Adresa</h4>
                    <p className="font-bold text-brand-dark">Fshati Shalë, Komuna Lipjan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-brand-lime/10 text-brand-lime rounded-2xl flex items-center justify-center">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Rajoni</h4>
                    <p className="font-bold text-brand-dark">Republika e Kosovës</p>
                  </div>
                </div>
                <a 
                  href="https://maps.app.goo.gl/N5XVp95AxwZyngCq8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-brand-dark text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-pink transition-all"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Hape në Google Maps</span>
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-2 h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11756.914594950346!2d20.968333!3d42.483333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353856e7290f05d%3A0xc06e00f98363359!2sShal%C3%AB!5e0!3m2!1sen!2s!4v1711710000000!5m2!1sen!2s" 
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
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
