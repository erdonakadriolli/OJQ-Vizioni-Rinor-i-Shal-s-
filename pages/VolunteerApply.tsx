
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Send, CheckCircle, Heart, Star, Sparkles, MapPin } from 'lucide-react';
import { getDb, saveDb } from '../services/mockDb';
import { VolunteerApplication, ApplicationStatus } from '../types';

const VolunteerApply: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [] as string[],
    motivation: ''
  });

  const interestsList = [
    'Teknologji & IT',
    'Dizajn Grafik',
    'Marketing Digjital',
    'Aktivizëm Qytetar',
    'Mbrojtje e Mjedisit',
    'Kulturë & Sport',
    'Lidership',
    'Edukimi'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const db = getDb();
    
    const newApplication: VolunteerApplication = {
      id: 'app_' + Date.now(),
      userName: formData.name,
      userEmail: formData.email,
      phone: formData.phone,
      interests: formData.interests,
      motivation: formData.motivation,
      status: ApplicationStatus.PENDING,
      dateApplied: new Date().toISOString().split('T')[0]
    };

    const updatedApplications = [...(db.applications || []), newApplication];
    saveDb({ ...db, applications: updatedApplications });
    
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-24 px-6 bg-slate-50 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-[3.5rem] p-12 md:p-20 text-center shadow-2xl border border-slate-100 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-brand-lime/20 text-brand-lime rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter mb-6">Aplikimi u dërgua me sukses!</h2>
          <p className="text-slate-500 text-lg mb-10 font-medium">
            Faleminderit që dëshironi të bëheni pjesë e Vizionit Rinor të Shalës. Ekipi ynë do ta rishikojë aplikimin tuaj dhe do t'ju kontaktojë së shpejti në Lipjan.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-12 py-5 bg-brand-dark text-white rounded-full font-black uppercase text-sm tracking-widest hover:bg-brand-pink transition-all shadow-xl"
          >
            Kthehu në Fillim
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-pink/10 text-brand-pink rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Heart className="h-3 w-3" />
            <span>Bashkohu me Ne</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter mb-6">
            Bëhu <span className="text-brand-pink">Vullnetar</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Ndërtoni të ardhmen e fshatit Shalë së bashku me ne. Aplikoni sot për t'u bërë pjesë e iniciativave tona në Komunën e Lipjanit.
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="bg-brand-dark p-12 text-white">
              <h3 className="text-2xl font-black uppercase mb-8">Pse të aplikosh?</h3>
              <div className="space-y-8">
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-lime"><Star className="h-5 w-5" /></div>
                  <p className="text-sm font-medium text-slate-400">Përfitoni përvojë pune dhe certifikata vullnetarizmi.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-cyan"><Sparkles className="h-5 w-5" /></div>
                  <p className="text-sm font-medium text-slate-400">Zhvilloni aftësi të reja profesionale dhe digjitale.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-orange"><MapPin className="h-5 w-5" /></div>
                  <p className="text-sm font-medium text-slate-400">Kontribuoni direkt në zhvillimin e komunitetit në Shalë.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Emri & Mbiemri</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Filan Fisteku"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-bold"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="email@shembull.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-bold"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Numri i Telefonit</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+383 44 000 000"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-bold"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Fushat e Interesit</label>
                  <div className="flex flex-wrap gap-2">
                    {interestsList.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                          formData.interests.includes(interest)
                            ? 'bg-brand-pink border-brand-pink text-white shadow-lg'
                            : 'bg-white border-slate-200 text-slate-400 hover:border-brand-pink hover:text-brand-pink'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Pse dëshironi të bëheni pjesë e VRSH?</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Shkruani motivimin tuaj këtu..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-pink outline-none font-bold resize-none"
                    value={formData.motivation}
                    onChange={e => setFormData({...formData, motivation: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-pink text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-pink/20 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-3" />
                  Dërgo Aplikimin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerApply;
