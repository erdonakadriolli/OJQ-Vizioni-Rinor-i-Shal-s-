
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Target, Zap, Heart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1920" 
            alt="Youth Vision Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Zgjimi i Shpresës,<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-pink via-brand-orange to-brand-lime">
              Fuqizimi i Rinisë.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mb-10">
            Vizioni Rinor i Shales është platforma kryesore për rininë e rajonit tonë. Ne punojmë së bashku për të ndërtuar një të ardhme më të ndritur, duke ruajtur vlerat tona dhe duke përqafuar inovacionin.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link to="/projects" className="px-10 py-4 bg-white text-brand-dark rounded-full font-bold hover:bg-brand-pink hover:text-white transition-all shadow-xl flex items-center justify-center">
              Eksploro Projektet <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/about" className="px-10 py-4 bg-transparent border-2 border-white/40 text-white rounded-full font-bold hover:border-white transition-all flex items-center justify-center">
              Misioni Ynë
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: '200+', label: 'Vullnetarë Aktivë', color: 'text-brand-pink' },
              { val: '24+', label: 'Projekte të Realizuara', color: 'text-brand-cyan' },
              { val: '1500+', label: 'Pjesëmarrës', color: 'text-brand-orange' },
              { val: '12+', label: 'Partnerë Rajonalë', color: 'text-brand-lime' }
            ].map((stat, i) => (
              <div key={i} className="group">
                <p className={`text-5xl font-extrabold mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</p>
                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-brand-dark mb-4 uppercase">Shtylla e Veprimit</h2>
            <div className="h-1.5 w-32 bg-brand-pink mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium">
              Vizioni ynë bazohet në katër vlerat themelore që drejtojnë çdo nismë dhe bashkëpunim tonin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Energji Rinore', color: 'bg-brand-orange', desc: 'Transformojmë pasionin e rinisë në veprime konkrete për komunitetin tonë.' },
              { icon: Heart, title: 'Gjithëpërfshirje', color: 'bg-brand-pink', desc: 'Çdo zë ka rëndësi. Ne krijojmë hapësirë për të gjithë të rinjtë pa dallim.' },
              { icon: Users, title: 'Bashkëpunim', color: 'bg-brand-lime', desc: 'Besojmë se ndryshimi i vërtetë vjen vetëm kur punojmë si një trup i vetëm.' },
              { icon: Target, title: 'Inovacion', color: 'bg-brand-cyan', desc: 'Përdorim teknologjinë dhe metodat e reja për të zgjidhur sfidat e vjetra.' },
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-slate-100 group relative overflow-hidden">
                <div className={`w-16 h-16 ${pillar.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                  <pillar.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-brand-dark mb-3 uppercase">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Focus */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 relative">
            <div className="absolute -inset-4 bg-brand-lime/10 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
              alt="Shala Region" 
              className="rounded-3xl shadow-2xl relative z-10 -rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          <div className="flex-1">
            <span className="bg-brand-orange text-white px-4 py-1 rounded-full font-bold uppercase text-[10px] mb-6 inline-block">Fokus Rajonal</span>
            <h2 className="text-4xl font-black text-brand-dark mb-6 uppercase leading-tight">Mbrojtja e Natyrës dhe Trashëgimisë së Shales</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
              Rajoni i Shales është pasuria jonë. Vizioni Rinor i Shales është i përkushtuar në mbrojtjen e mjedisit dhe promovimin e vlerave kulturore që na bëjnë unikë.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-lime flex items-center justify-center flex-shrink-0 mt-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
                <p className="text-slate-700 font-semibold">Turizmi i qëndrueshëm dhe ekologjik.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-brand-lime flex items-center justify-center flex-shrink-0 mt-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
                <p className="text-slate-700 font-semibold">Arkivimi i tregimeve dhe traditave të vjetra.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-brand-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <VizioniLogoLarge />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">Bëhu pjesë e ndryshimit!</h2>
          <p className="text-slate-300 text-lg mb-12 max-w-xl mx-auto font-medium">
            Bashkohu me qindra të rinj të Shales që po marrin në dorë fatin e komunitetit të tyre.
          </p>
          <Link to="/login" className="bg-white text-brand-dark px-12 py-5 rounded-full font-black uppercase text-sm hover:bg-brand-pink hover:text-white transition-all shadow-2xl inline-block tracking-widest">
            Regjistrohu Tani
          </Link>
        </div>
      </section>
    </div>
  );
};

const VizioniLogoLarge = () => (
  <div className="relative flex items-center justify-center w-64 h-64">
    <div className="absolute inset-0 rounded-full border-8 border-transparent" 
         style={{ borderTopColor: '#e11d74', borderRightColor: '#f39237', borderBottomColor: '#95d03a', borderLeftColor: '#00adb5' }}></div>
  </div>
);

export default Home;
