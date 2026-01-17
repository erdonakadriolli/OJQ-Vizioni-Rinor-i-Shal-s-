
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { StaffMember } from '../types';
import { 
  Target, Award, BookOpen, UserCheck, ArrowRight, 
  Users, ShieldCheck, Briefcase, LayoutList, 
  Heart, Zap, X, Facebook, Instagram, Linkedin, Mail, MapPin, 
  History, Rocket, Shield, Star, Globe
} from 'lucide-react';

const About: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  useEffect(() => {
    const db = getDb();
    setStaff(db.staff || []);
  }, []);

  const getStaffByCategory = (category: string) => {
    return staff.filter(member => member.category === category);
  };

  const StaffCard = ({ member, size = 'md' }: { member: StaffMember, size?: 'sm' | 'md' | 'lg' }) => {
    const isLarge = size === 'lg';
    const isSmall = size === 'sm';

    return (
      <div 
        onClick={() => setSelectedMember(member)}
        className={`group cursor-pointer glass-card rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col items-center text-center p-5 ${isLarge ? 'md:p-7' : ''}`}
      >
        <div className={`relative mb-4 ${isLarge ? 'w-24 h-24' : isSmall ? 'w-14 h-14' : 'w-20 h-20'} rounded-full overflow-hidden border-2 border-white group-hover:border-brand-pink transition-colors duration-300 shadow-sm`}>
          <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div>
          <h5 className={`font-black text-brand-dark leading-tight mb-1 uppercase tracking-tight ${isLarge ? 'text-lg' : isSmall ? 'text-[10px]' : 'text-sm'}`}>{member.name}</h5>
          <p className="text-[9px] font-bold text-brand-pink uppercase tracking-[0.15em] mb-3">{member.role}</p>
          {!isSmall && (
             <span className="inline-flex items-center text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:text-brand-dark transition-colors">
               Profile <ArrowRight className="ml-1 h-2.5 w-2.5" />
             </span>
          )}
        </div>
      </div>
    );
  };

  const renderMission = () => (
    <div className="space-y-16 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <section className="text-center max-w-4xl mx-auto py-12">
        <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[9px] mb-3 block">Mission & Vision</span>
        <h1 className="text-4xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter mb-6 leading-none">For Youth, <br/><span className="text-brand-pink">For the Future</span></h1>
        <p className="text-xl text-slate-600 leading-relaxed font-semibold italic max-w-2xl mx-auto">
          "Youth Vision of Shale (VRSH) transforms youth potential into a driving force for community development in Shale and Lipjan."
        </p>
        <div className="h-1.5 w-24 bg-gradient-to-r from-brand-pink via-brand-orange to-brand-lime mx-auto mt-8 rounded-full"></div>
      </section>

      {/* Origin Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-lg text-[10px] font-black uppercase tracking-widest">
            <History className="h-3.5 w-3.5" />
            <span>How it all began</span>
          </div>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tight">Our Roots in <span className="text-brand-orange">Shale</span></h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Youth Vision of Shale was founded as a voluntary initiative by a group of enthusiastic young people who believed that change starts from home. Based in the village of Shale, the organization grew rapidly to become a powerful voice for rural youth needs in the Lipjan municipality.
          </p>
          <p className="text-slate-500 font-medium leading-relaxed">
            Today, we are the intersection of innovation and tradition, offering young people tools and knowledge that were once accessible only in large urban centers.
          </p>
        </div>
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[350px]">
           <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" 
              alt="Youth Collaboration" 
              className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-[1px]"></div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-12">
        <div className="text-center mb-12">
           <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight">Values that <span className="text-brand-pink">Lead Us</span></h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Transparency', desc: 'Full accountability to our members and donors.', color: 'text-brand-pink' },
            { icon: Zap, title: 'Innovation', desc: 'Using technology to solve community problems.', color: 'text-brand-orange' },
            { icon: Users, title: 'Inclusion', desc: 'Equal opportunities for every young person, regardless of gender or status.', color: 'text-brand-lime' }
          ].map((v, i) => (
            <div key={i} className="glass-card p-8 rounded-[2.5rem] border border-white text-center group hover:bg-white transition-all">
              <div className={`${v.color} mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                <v.icon className="h-10 w-10" />
              </div>
              <h4 className="font-black text-brand-dark uppercase text-sm mb-2">{v.title}</h4>
              <p className="text-xs text-slate-400 font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Pillars Section */}
      <div className="bg-brand-dark/95 p-10 md:p-16 rounded-[4rem] text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         <div className="relative z-10 grid md:grid-cols-2 gap-16">
            <div>
               <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6">
                 <Rocket className="h-3.5 w-3.5 text-brand-lime" />
                 <span>Strategy 2024-2027</span>
               </div>
               <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">Our Key <br/><span className="text-brand-lime">Objectives</span></h3>
               <ul className="space-y-6">
                 {[
                   { t: 'Youth Digitalization', d: 'Creating the first digital lab in Shale village for IT training.' },
                   { t: 'Youth Leadership', d: 'Empowering young people to actively participate in local decision-making processes.' },
                   { t: 'Environment & Climate Change', d: 'Initiatives for reforestation and waste management in the region.' },
                   { t: 'International Networking', d: 'Membership in European youth networks and Erasmus+ exchanges.' }
                 ].map((pill, i) => (
                   <li key={i} className="flex space-x-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-lime mt-2 group-hover:scale-150 transition-transform"></div>
                      <div>
                        <h5 className="font-black uppercase text-xs text-brand-lime mb-1">{pill.t}</h5>
                        <p className="text-xs text-white/60 font-medium leading-relaxed">{pill.d}</p>
                      </div>
                   </li>
                 ))}
               </ul>
            </div>
            <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 flex flex-col justify-center">
               <h4 className="text-xl font-black uppercase mb-6 flex items-center">
                 <Target className="mr-3 h-6 w-6 text-brand-pink" /> Fields of Action
               </h4>
               <div className="grid grid-cols-2 gap-4">
                 {[
                   'Coding & Web', 'Graphic Design', 'Media & PR', 'Volunteerism', 'Culture', 'Sports', 'Debate', 'Eco-Activism'
                 ].map((field, i) => (
                   <div key={i} className="px-4 py-3 bg-white/5 rounded-xl border border-white/5 text-[9px] font-bold uppercase tracking-widest hover:bg-brand-pink hover:border-brand-pink transition-all text-center">
                     {field}
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </div>

      {/* Partners Section */}
      <section className="py-12 border-t border-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-xs">
              <h4 className="text-lg font-black text-brand-dark uppercase tracking-tight">Our Collaborators</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">VRSH works with institutional and organizational partners.</p>
           </div>
           <div className="flex flex-wrap justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all">
              <span className="font-black text-sm uppercase tracking-tighter">Lipjan Municipality</span>
              <span className="font-black text-sm uppercase tracking-tighter">Ministry of Youth</span>
              <span className="font-black text-sm uppercase tracking-tighter">Erasmus+</span>
              <span className="font-black text-sm uppercase tracking-tighter">UNICEF Kosovo</span>
           </div>
        </div>
      </section>

      {/* Office Photo Background Section */}
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 h-[450px] flex items-center justify-center group mt-10">
         <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
            alt="VRSH Office" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
         <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-[1px]"></div>
         <div className="relative z-10 text-center text-white px-6">
            <MapPin className="h-10 w-10 mx-auto mb-4 text-brand-cyan animate-bounce" />
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Home of Ideas</h3>
            <p className="text-lg font-bold text-white/80 max-w-xl mx-auto uppercase tracking-widest text-xs">Our office in Shale, Lipjan — where change begins.</p>
         </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-16 animate-in slide-in-from-bottom-4 duration-500">
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-pink font-black uppercase tracking-[0.3em] text-[9px] mb-3 block">Team & Structure</span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-3 leading-none">Vision <span className="text-brand-pink">Staff</span></h2>
          <p className="text-slate-500 max-w-xl mx-auto font-bold text-sm uppercase tracking-widest text-center">
            Leadership that makes a difference every day.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* 1. Executive Director */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <div className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-orange/20">
                <Briefcase className="h-5 w-5" />
              </div>
              <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Executive Director</h4>
            </div>
            <div className="max-w-xs mx-auto md:mx-0">
              {getStaffByCategory('Executive Director').map(m => <StaffCard key={m.id} member={m} size="md" />)}
            </div>
          </div>

          {/* 2. Current Staff */}
          <div className="bg-brand-dark/95 p-10 md:p-14 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-10 h-10 bg-brand-cyan rounded-xl flex items-center justify-center">
                  <LayoutList className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight">Current Staff & Coordinators</h4>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getStaffByCategory('Current Staff').map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => setSelectedMember(m)}
                    className="flex flex-col items-center text-center p-6 bg-white/5 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all cursor-pointer hover:shadow-2xl"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-brand-cyan transition-colors">
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <h5 className="font-black text-white text-base uppercase tracking-tight mb-1">{m.name}</h5>
                    <p className="text-[8px] font-bold text-brand-cyan uppercase tracking-widest">{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 & 4. Assembly and Board */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-brand-dark text-white rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-black text-brand-dark uppercase tracking-tight">Members Assembly</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {getStaffByCategory('Members Assembly').map(m => <StaffCard key={m.id} member={m} size="sm" />)}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-brand-pink text-white rounded-xl flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-lg font-black text-brand-dark uppercase tracking-tight">Board of Directors</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {getStaffByCategory('Board of Directors').map(m => <StaffCard key={m.id} member={m} size="sm" />)}
              </div>
            </div>
          </div>

          {/* 5. Volunteers */}
          <div className="glass-card p-10 rounded-[3rem] border border-white shadow-sm">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-brand-lime text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-lime/20">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xl font-black text-brand-dark uppercase tracking-tight">Volunteers</h4>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
              {getStaffByCategory('Volunteers').map(m => (
                <div 
                  key={m.id} 
                  onClick={() => setSelectedMember(m)}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden mb-3 border-2 border-white group-hover:border-brand-lime transition-all shadow-sm">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <h6 className="text-[9px] font-black text-brand-dark uppercase leading-tight group-hover:text-brand-lime">{m.name}</h6>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Profile Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in duration-200">
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 z-[70] bg-slate-100 p-2 rounded-full hover:bg-brand-pink hover:text-white transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="w-full md:w-1/3 h-64 md:h-auto bg-slate-50">
                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 p-8 md:p-10 flex flex-col">
                 <div className="mb-6">
                   <span className="text-[8px] font-black text-brand-pink uppercase tracking-[0.2em] mb-2 block">{selectedMember.category}</span>
                   <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight mb-1">{selectedMember.name}</h3>
                   <p className="text-xs font-bold text-slate-400 uppercase">{selectedMember.role}</p>
                 </div>

                 <div className="flex-grow">
                   <h4 className="text-[9px] font-black text-brand-dark uppercase tracking-widest mb-3 flex items-center">
                     <BookOpen className="h-3.5 w-3.5 mr-2 text-brand-pink" /> Biography
                   </h4>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                     {selectedMember.bio || "This dedicated member contributes to VRSH for community empowerment."}
                   </p>
                 </div>

                 <div className="mt-8 pt-6 border-t border-slate-100 flex space-x-3">
                      {selectedMember.socials?.facebook && (
                        <a href={selectedMember.socials.facebook} target="_blank" className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-brand-pink hover:text-white transition-all">
                          <Facebook className="h-4 w-4" />
                        </a>
                      )}
                      {selectedMember.socials?.instagram && (
                        <a href={selectedMember.socials.instagram} target="_blank" className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-brand-pink hover:text-white transition-all">
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {selectedMember.socials?.linkedin && (
                        <a href={selectedMember.socials.linkedin} target="_blank" className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-brand-pink hover:text-white transition-all">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="py-16 px-6 min-h-screen relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-2 mb-12 glass-card p-1.5 rounded-2xl inline-flex shadow-sm">
          <button onClick={() => window.location.hash = '#/about/mission'} className={`px-6 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${(!section || section === 'mission') ? 'bg-brand-dark text-white' : 'text-slate-400 hover:text-brand-dark'}`}>Mission</button>
          <button onClick={() => window.location.hash = '#/about/staff'} className={`px-6 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${section === 'staff' ? 'bg-brand-dark text-white' : 'text-slate-400 hover:text-brand-dark'}`}>Team</button>
        </div>
        {section === 'staff' ? renderStaff() : renderMission()}
      </div>
    </div>
  );
};

export default About;
