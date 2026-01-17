
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'AL' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  AL: {
    'nav.home': 'Kreu',
    'nav.about': 'Rreth Nesh',
    'nav.mission': 'Misioni',
    'nav.staff': 'Ekipi',
    'nav.projects': 'Projekte',
    'nav.join': 'Bashkohu me Ne',
    'nav.login': 'Kyçu',
    'hero.title1': 'Fuqizimi i Rinisë',
    'hero.title2': 'në fshatin Shalë.',
    'hero.desc': 'Një organizatë joqeveritare e përkushtuar ndaj zhvillimit të komunitetit në Shalë, Lipjan, duke ofruar platforma konkrete për edukim joformal, inovacion dhe aktivizëm qytetar.',
    'hero.apply': 'Apliko si Vullnetar',
    'hero.projects': 'Projektet tona',
    'derdo.greeting': 'Përshëndetje, unë jam Derdo',
    'derdo.desc': 'Jam asistenti inteligjent i VRSH. Më pyet për çdo gjë rreth organizatës sonë, trajnimet digjitale, ose si mund të bëhesh pjesë e ekipit tonë.',
    'derdo.chat': 'Bisedo me Derdon',
    'mission.title': 'Misioni i Vizionit Rinor',
    'mission.desc': 'Vizioni Rinor i Shalës (VRSH) është një platformë dedikuar fuqizimit të të rinjve dhe zhvillimit të komunitetit në rajonin e Shalës, Lipjan. Ne synojmë të transformojmë fshatin tonë në një qendër të inovacionit dhe lidershipit rinor.',
    'testimonials.title': 'Përvoja e Vullnetarëve',
    'partners.title': 'Partnerët Strategjikë',
    'footer.desc': 'Vizioni Rinor i Shalës (Shalë, Lipjan) është një organizatë dedikuar fuqizimit të të rinjve përmes edukimit, inovacionit dhe vullnetarizmit.',
    'footer.nav': 'Navigimi',
    'footer.opp': 'Mundësitë',
    'footer.find': 'Na Gjeni'
  },
  EN: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.mission': 'Mission',
    'nav.staff': 'Staff',
    'nav.projects': 'Projects',
    'nav.join': 'Join Us',
    'nav.login': 'Login',
    'hero.title1': 'Empowering Youth',
    'hero.title2': 'in Shale Village.',
    'hero.desc': 'A non-governmental organization dedicated to community development in Shale, Lipjan, providing concrete platforms for non-formal education, innovation, and civic activism.',
    'hero.apply': 'Apply as Volunteer',
    'hero.projects': 'Our Projects',
    'derdo.greeting': 'Hello, I am Derdo',
    'derdo.desc': "I am the intelligent assistant of VRSH. Ask me anything about our organization, digital trainings, or how you can become part of our team.",
    'derdo.chat': 'Chat with Derdo',
    'mission.title': 'The Mission of Youth Vision',
    'mission.desc': 'Youth Vision of Shale (VRSH) is a platform dedicated to empowering youth and community development in the region of Shale, Lipjan. We aim to transform our village into a center for innovation and youth leadership.',
    'testimonials.title': 'Volunteer Experience',
    'partners.title': 'Strategic Partners',
    'footer.desc': 'Youth Vision of Shale (Shale, Lipjan) is an organization dedicated to empowering youth through education, innovation, and volunteerism.',
    'footer.nav': 'Navigation',
    'footer.opp': 'Opportunities',
    'footer.find': 'Find Us'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Default to 'EN' instead of 'AL'
    return (localStorage.getItem('app_lang') as Language) || 'EN';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
