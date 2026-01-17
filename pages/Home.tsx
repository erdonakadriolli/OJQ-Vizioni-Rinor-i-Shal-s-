
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Globe, Users, Target, Zap, Heart, Shield, 
  Facebook, Instagram, Linkedin, Code, BookOpen, UserCheck, 
  Star, MapPin, UserPlus, Bot, MessageSquare, Sparkles, Quote,
  CheckCircle2, Building2
} from 'lucide-react';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  const testimonials = [
    {
      name: "Erdona Kadriolli",
      role: language === 'AL' ? "Vullnetare aktive" : "Active Volunteer",
      quote: language === 'AL' 
        ? "VRSH nuk është vetëm një organizatë, është një familje ku çdo ide e jona dëgjohet dhe kthehet në projekt konkret për rininë e Shalës."
        : "VRSH is not just an organization, it is a family where every idea of ours is heard and turned into a concrete project for the youth of Shale.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Viola Hetemi",
      role: language === 'AL' ? "Pjesëmarrese në Akademi" : "Academy Participant",
      quote: language === 'AL'
        ? "Përmes trajnimeve në Akademinë Digjitale, fitova aftësi që nuk mendova se do t'i kisha mundësinë t'i mësoja këtu në fshatin tonë."
        : "Through the training at the Digital Academy, I gained skills that I never thought I would have the opportunity to learn here in our village.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Erjona Kadriolli",
      role: language === 'AL' ? "Vullnetare" : "Volunteer",
      quote: language === 'AL'
        ? "Të punosh për komunitetin tënd është ndjenja më e mirë. VRSH na ka dhënë mundësinë të jemi ne ata që sjellim ndryshimin në Lipjan."
        : "Working for your community is the best feeling. VRSH has given us the chance to be the ones bringing change to Lipjan.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const partners = [
    { name: language === 'AL' ? "Komuna Lipjan" : "Lipjan Municipality", logo: "🏛️" },
    { name: "UNICEF Kosovo", logo: "🌏" },
    { name: "Erasmus+", logo: "🇪🇺" },
    { name: language === 'AL' ? "Ministria e Rinisë" : "Ministry of Youth", logo: "⚖️" },
    { name: "GIZ Kosovo", logo: "🇩🇪" },
    { name: "KCSF", logo: "🤝" }
  ];

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
            {t('hero.subtitle')}
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
            {t('hero.title1')}<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink via-brand-orange to-brand-lime">
              {t('hero.title2')}
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 max-w-4xl mb-12 font-medium leading-relaxed">
            {t('hero.desc')}
          </p>
          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-6">
            <Link to="/join" className="px-12 py-5 bg-brand-pink text-white rounded-full font-black uppercase text-sm hover:bg-white hover:text-brand-pink transition-all shadow-2xl flex items-center justify-center tracking-widest group">
              {t('hero.apply')} <UserPlus className="ml-3 h-5 w-5" />
            </Link>
            <Link to="/projects" className="px-12 py-5 bg-white text-brand-dark rounded-full font-black uppercase text-sm hover:bg-slate-100 transition-all shadow-2xl flex items-center justify-center tracking-widest group">
              {t('hero.projects')} <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
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
                <span>{t('derdo.promo.tag')}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                {t('derdo.greeting')}
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-xl">
                {t('derdo.desc')}
              </p>
              <Link to="/derdo" className="inline-flex items-center space-x-3 bg-brand-orange text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-orange/20 group">
                <MessageSquare className="h-5 w-5" />
                <span>{t('derdo.chat')}</span>
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
            <h2 className="text-4xl font-black text-brand-dark uppercase mb-8 leading-tight">{t('mission.title')}</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              {t('mission.desc')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <Code className="h-10 w-10 text-brand-cyan mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">{t('mission.pillar.tech')}</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <UserCheck className="h-10 w-10 text-brand-pink mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">{t('mission.pillar.lead')}</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <BookOpen className="h-10 w-10 text-brand-orange mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">{t('mission.pillar.edu')}</h4>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
              <Target className="h-10 w-10 text-brand-lime mb-4" />
              <h4 className="font-black text-brand-dark uppercase text-xs">{t('mission.pillar.impact')}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-pink font-black uppercase tracking-[0.2em] text-[10px] mb-4 block">{t('testimonials.tag')}</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">{t('testimonials.title')}</h2>
            <div className="h-1.5 w-24 bg-brand-pink mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 relative group hover:shadow-xl transition-all duration-500">
                <Quote className="absolute top-8 right-8 h-10 w-10 text-slate-50 group-hover:text-brand-pink/10 transition-colors" />
                <div className="relative z-10">
                  <p className="text-slate-600 italic font-medium mb-8 leading-relaxed">
                    "{test.quote}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm">
                      <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-black text-brand-dark uppercase text-xs tracking-tight">{test.name}</h4>
                      <p className="text-[10px] font-bold text-brand-pink uppercase tracking-widest">{test.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-black text-brand-dark mb-6 uppercase tracking-tighter">{t('values.title')}</h2>
          <div className="h-2 w-40 bg-brand-pink mx-auto rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: Shield, title: t('values.transparency'), color: 'bg-brand-pink', desc: t('values.transparency.desc') },
            { icon: Users, title: t('values.collab'), color: 'bg-brand-lime', desc: t('values.collab.desc') },
            { icon: Zap, title: t('values.innovation'), color: 'bg-brand-orange', desc: t('values.innovation.desc') },
            { icon: Star, title: t('values.change'), color: 'bg-brand-cyan', desc: t('values.change.desc') },
          ].map((pillar, i) => (
            <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:-translate-y-2 transition-all">
              <div className={`w-20 h-20 ${pillar.color} rounded-[1.5rem] flex items-center justify-center mb-8 text-white shadow-xl`}>
                <pillar.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-brand-dark mb-4 uppercase leading-none">{pillar.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-semibold">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <Building2 className="h-6 w-6 text-slate-300" />
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em]">{t('partners.title')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {partners.map((p, i) => (
              <div key={i} className="flex flex-col items-center group cursor-default">
                <span className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{p.logo}</span>
                <span className="font-black text-[10px] uppercase tracking-tighter text-brand-dark">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto bg-brand-dark rounded-[3.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <MapPin className="h-64 w-64 text-brand-pink" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tighter">{t('cta.title')}</h2>
          <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium">
            {t('cta.desc')}
          </p>
          <div className="flex justify-center">
            <Link to="/join" className="bg-brand-pink text-white px-16 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white hover:text-brand-pink transition-all shadow-xl shadow-brand-pink/20 flex items-center">
               {t('hero.apply')} <UserPlus className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
