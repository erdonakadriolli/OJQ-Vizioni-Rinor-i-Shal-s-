
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, UserPlus, Bot, MessageSquare, Sparkles, Star, Globe, Shield, Handshake
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getDb } from '../services/mockDb';
import { Partner } from '../types';
import { db as firestoreDb, auth } from '../firebase';
import { collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'donakadriolli@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const db = getDb();
    setPartners(db.partners || []);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Born from the Logo Colors */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Dynamic Background Accents */}
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-15 pointer-events-none">
           <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-pink rounded-full blur-[150px] animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-lime rounded-full blur-[120px] animate-pulse-slow"></div>
           <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-brand-orange rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center space-x-2 px-5 py-2 bg-white/60 backdrop-blur-md border border-slate-100 text-brand-pink rounded-full font-black uppercase text-[10px] tracking-[0.3em] mb-8 animate-in slide-in-from-left duration-700">
              <Sparkles className="h-3 w-3" />
              <span>{t('hero.subtitle')}</span>
            </div>
            <h1 className="text-6xl md:text-[7.5rem] font-black text-brand-dark leading-[0.9] mb-10 uppercase tracking-tighter animate-in slide-in-from-left duration-1000">
              {t('hero.title1')}<br/>
              <span className="gradient-text">
                {t('hero.title2')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-xl mb-12 font-medium leading-relaxed animate-in fade-in duration-1000 delay-300">
              {t('hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Link to="/join" className="px-12 py-5 bg-brand-pink text-white rounded-full font-black uppercase text-xs btn-glow-pink transition-all shadow-2xl shadow-brand-pink/30 tracking-widest flex items-center justify-center">
                {t('hero.apply')} <UserPlus className="ml-3 h-5 w-5" />
              </Link>
              <Link to="/projects" className="px-12 py-5 bg-brand-dark text-white rounded-full font-black uppercase text-xs hover:bg-slate-800 transition-all shadow-2xl shadow-brand-dark/20 tracking-widest flex items-center justify-center group">
                {t('hero.projects')} <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative h-[600px] animate-in zoom-in duration-1000 delay-200">
             {/* Gradient Borders around the image stack */}
             <div className="absolute inset-0 bg-brand-pink rounded-[4rem] rotate-3 translate-x-4 translate-y-4 opacity-10"></div>
             <div className="absolute inset-0 bg-brand-lime rounded-[4rem] -rotate-3 -translate-x-4 -translate-y-4 opacity-10"></div>
             <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Rinia e Shalës" 
                  className="w-full h-full object-cover transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                         <Shield className="h-6 w-6" />
                      </div>
                      <div className="text-white">
                         <h4 className="font-black uppercase text-xs tracking-widest">Iniciativa e Shpresës</h4>
                         <p className="text-[10px] font-bold text-slate-300 uppercase">Fshati Shalë, Lipjan</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Color Coded based on Logo */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: '500+', label: t('stats.trained'), color: 'text-brand-pink', icon: Star, bg: 'bg-brand-pink/5' },
            { value: '25+', label: t('stats.completed'), color: 'text-brand-lime', icon: Globe, bg: 'bg-brand-lime/5' },
            { value: '100+', label: t('stats.volunteers'), color: 'text-brand-cyan', icon: UserPlus, bg: 'bg-brand-cyan/5' },
            { value: 'Lipjan', label: t('stats.region'), color: 'text-brand-orange', icon: Sparkles, bg: 'bg-brand-orange/5' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-10 rounded-[3.5rem] bg-white border border-slate-50 shadow-sm hover:shadow-2xl transition-all group">
              <div className={`mb-8 p-5 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div className={`text-5xl font-black uppercase tracking-tighter mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners & Donors Section */}
      {partners.length > 0 && (
        <section className="py-24 px-6 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-4">
                <Handshake className="h-3 w-3" />
                <span>Bashkëpunimi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter">
                {t('home.partners.title')}
              </h2>
            </div>
            
            <div className="relative">
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                {partners.map((partner) => (
                  <a 
                    key={partner.id} 
                    href={partner.website || '#'} 
                    target={partner.website ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4">
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-xl transition-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                      <span className="text-[8px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-full">
                        {partner.name}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI Bot Section - Deep Dark with Orange Glow (Logo Right) */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-dark rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-16 group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/15 to-transparent pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px]"></div>
            
            <div className="flex-grow z-10 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-5 py-2 bg-white/5 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                <Bot className="h-4 w-4" /> <span>{t('derdo.promo.tag')}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                {t('derdo.greeting')}
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-xl leading-relaxed">
                {t('derdo.desc')}
              </p>
              <Link to="/derdo" className="inline-flex items-center space-x-4 bg-white text-brand-dark px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-2xl shadow-white/5 btn-glow-cyan">
                <MessageSquare className="h-5 w-5" /> <span>{t('derdo.chat')}</span>
              </Link>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center z-10">
               <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 bg-brand-orange rounded-full opacity-10 animate-ping"></div>
                  <div className="absolute inset-4 border-2 border-brand-orange/30 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-10 border-2 border-white/10 rounded-full"></div>
                  <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-700">
                     <Bot className="h-40 w-40 md:h-56 md:w-56 text-brand-orange drop-shadow-[0_0_40px_rgba(243,146,55,0.4)]" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
