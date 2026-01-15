
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Target, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://picsum.photos/seed/ngo-hero/1920/1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Small Actions,<br/><span className="text-emerald-400">Huge Impact.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
            UnityBridge connects passionate volunteers with projects that transform lives. 
            Join us in building a more equitable and sustainable world for everyone.
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center md:justify-start">
            <Link to="/projects" className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center">
              Browse Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/about" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-all flex items-center justify-center">
              Learn Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">15k+</p>
              <p className="text-slate-600 font-medium">Volunteers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">120+</p>
              <p className="text-slate-600 font-medium">Active Projects</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">$2.4M</p>
              <p className="text-slate-600 font-medium">Funds Raised</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600 mb-2">50+</p>
              <p className="text-slate-600 font-medium">Partner NGOs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Action */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission & Vision</h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We operate on four core principles to ensure that every effort leads to measurable change in the communities we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: 'Global Reach', desc: 'Operating in 12 countries to solve localized issues with international standards.' },
              { icon: Users, title: 'Community Led', desc: 'Our projects are designed and managed with the active participation of locals.' },
              { icon: Target, title: 'Sustainable', desc: 'Moving beyond short-term aid to long-term systemic improvement and self-reliance.' },
              { icon: ShieldCheck, title: 'Transparent', desc: '100% financial transparency with real-time reporting on project spending.' },
            ].map((pillar, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <pillar.icon className="h-8 w-8 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Callout */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <img 
              src="https://picsum.photos/seed/impact/800/800" 
              alt="Social Impact" 
              className="rounded-3xl shadow-2xl rotate-2"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">Spotlight Project</span>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Clean Water for All: The Samburu Project</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We've successfully installed 12 solar-powered water filtration systems in the Samburu district, reducing water-borne diseases by 85%. Our goal is to reach 50 more villages by 2025.
            </p>
            <Link to="/projects" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-700">
              See the full report <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-emerald-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Globe className="h-64 w-64 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to make a difference?</h2>
          <p className="text-emerald-50 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Join thousands of volunteers who are already contributing their time and skills to meaningful causes.
          </p>
          <Link to="/login" className="bg-white text-emerald-600 px-10 py-4 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-xl relative z-10 inline-block">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
