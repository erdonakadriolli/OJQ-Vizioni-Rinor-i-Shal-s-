
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'AL' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  AL: {
    // Nav
    'nav.home': 'Kreu',
    'nav.about': 'Rreth Nesh',
    'nav.mission': 'Misioni',
    'nav.staff': 'Ekipi',
    'nav.projects': 'Projekte',
    'nav.news': 'Lajmet',
    'nav.join': 'Bashkohu me Ne',
    'nav.login': 'Kyçu',
    'nav.admin': 'Admin',
    'nav.derdo': 'Derdo AI',
    
    // About Page
    'about.mission.tag': 'Misioni & Vizioni',
    'about.mission.title1': 'Për Rininë,',
    'about.mission.title2': 'Për të Ardhmen',
    'about.mission.quote': '"Vizioni Rinor i Shalës (VRSH) transformon potencialin e të rinjve në forcë lëvizëse për zhvillimin e komunitetit në Shalë dhe Lipjan."',
    'about.history.tag': 'Si filloi gjithçka',
    'about.history.title': 'Rrënjët tona në',
    'about.history.p1': 'Vizioni Rinor i Shalës u themelua si iniciativë vullnetare nga një grup të rinjsh entuziastë që besonin se ndryshimi fillon nga shtëpia. Me bazë në fshatin Shalë, organizata u rrit shpejt për t\'u bërë një zë i fuqishëm për nevojat e të rinjve ruralë në komunën e Lipjanit.',
    'about.history.p2': 'Sot, ne jemi kryqëzimi i inovacionit dhe traditës, duke u ofruar të rinjve mjete dhe njohuri që dikur ishin të qasshme vetëm në qendrat e mëdha urbane.',
    'about.values.title': 'Vlerat që na',
    'about.values.title2': 'Udhëheqin',
    'about.values.transparency': 'Transparenca',
    'about.values.transparency.desc': 'Llogaridhënie e plotë ndaj anëtarëve dhe donatorëve tanë.',
    'about.values.innovation': 'Inovacioni',
    'about.values.innovation.desc': 'Përdorimi i teknologjisë për zgjidhjen e problemeve.',
    'about.values.inclusion': 'Gjithëpërfshirja',
    'about.values.inclusion.desc': 'Mundësi të barabarta për çdo të ri pa dallim.',
    'about.strategy.tag': 'Strategjia 2024-2027',
    'about.strategy.title': 'Objektivat tona',
    'about.strategy.key': 'Kryesore',
    'about.strategy.digital': 'Digjitalizimi i Rinisë',
    'about.strategy.digital.desc': 'Krijimi i laboratorit të parë digjital në fshatin Shalë.',
    'about.strategy.leadership': 'Lidershipi Rinor',
    'about.strategy.leadership.desc': 'Fuqizimi i të rinjve në vendimmarrje lokale.',
    'about.strategy.env': 'Mjedisi & Klima',
    'about.strategy.env.desc': 'Iniciativa për pyllëzim dhe menaxhim mbetjesh.',
    'about.strategy.network': 'Rrjetëzimi Ndërkombëtar',
    'about.strategy.network.desc': 'Anëtarësimi në rrjete evropiane si Erasmus+.',
    'about.fields.title': 'Fushat e Veprimit',
    'about.collab.title': 'Bashkëpunëtorët Tanë',
    'about.office.title': 'Shtëpia e Ideve',
    'about.office.desc': 'Zyra jonë në Shalë, Lipjan — ku fillon ndryshimi.',
    'about.team.tag': 'Ekipi & Struktura',
    'about.team.title': 'Stafi i',
    'about.team.title2': 'Vizionit',
    'about.team.desc': 'Lidership që bën ndryshimin çdo ditë.',

    // News Page
    'news.title.all': 'Të gjitha Lajmet',
    'news.title.media': 'Media & Intervista',
    'news.title.latest': 'Lajmet e Fundit',
    'news.title.reports': 'Raportet & Publikimet',
    'news.empty': 'Nuk u gjet asnjë lajm në këtë kategori.',
    'news.download': 'Shkarko PDF',
    'news.source': 'Shiko Burimin',

    // Home & Others
    'hero.title1': 'Fuqizimi i Rinisë',
    'hero.title2': 'në fshatin Shalë.',
    'hero.subtitle': 'Vizioni Rinor i Shalës — Komuna Lipjan',
    'hero.desc': 'Një organizatë joqeveritare e përkushtuar ndaj zhvillimit të komunitetit në Shalë, Lipjan, duke ofruar platforma konkrete për edukim joformal, inovacion dhe aktivizëm qytetar.',
    'hero.apply': 'Apliko si Vullnetar',
    'hero.projects': 'Projektet tona',
    'derdo.promo.tag': 'Teknologjia e Re',
    'derdo.greeting': 'Përshëndetje, unë jam Derdo',
    'derdo.desc': 'Jam asistenti inteligjent i VRSH. Më pyet për çdo gjë rreth organizatës sonë, trajnimet digjitale, ose si mund të bëhesh pjesë e ekipit tonë.',
    'derdo.chat': 'Bisedo me Derdon',
    'mission.title': 'Misioni i Vizionit Rinor',
    'mission.desc': 'Vizioni Rinor i Shalës (VRSH) është një platformë dedikuar fuqizimit të të rinjve dhe zhvillimit të komunitetit në rajonin e Shalës, Lipjan. Ne synojmë të transformojmë fshatin tonë në një qendër të inovacionit dhe lidershipit rinor.',
    'mission.pillar.tech': 'Teknologji',
    'mission.pillar.lead': 'Lidership',
    'mission.pillar.edu': 'Edukimi',
    'mission.pillar.impact': 'Ndikimi',
    'testimonials.tag': 'Dëshmitë tona',
    'testimonials.title': 'Përvoja e Vullnetarëve',
    'values.title': 'Vlerat tona',
    'values.transparency': 'Transparenca',
    'values.transparency.desc': 'Transparencë dhe llogaridhënie e plotë në çdo veprimtari tonën.',
    'values.collab': 'Bashkëpunimi',
    'values.collab.desc': 'Përfshirje e të gjithë akterëve relevantë për të mirën e komunitetit.',
    'values.innovation': 'Inovacioni',
    'values.innovation.desc': 'Zgjidhje kreative dhe teknologjike për sfidat e të rinjve.',
    'values.change': 'Ndryshimi',
    'values.change.desc': 'Angazhim i palodhur për ndryshim pozitiv në fshatin Shalë.',
    'partners.title': 'Partnerët Strategjikë',
    'cta.title': 'Bëhu pjesë e ndryshimit',
    'cta.desc': 'Vizioni Rinor i Shalës mbetet një platformë e hapur për çdo të ri që dëshiron të mësojë dhe të kontribuojë në fshatin tonë në Lipjan.',
    'footer.desc': 'Vizioni Rinor i Shalës (Shalë, Lipjan) është një organizatë dedikuar fuqizimit të të rinjve përmes edukimit, inovacionit dhe vullnetarizmit.',
    'footer.nav': 'Navigimi',
    'footer.opp': 'Mundësitë',
    'footer.find': 'Na Gjeni',
    'login.title': 'Mirësevini',
    'login.subtitle': 'Kyçuni për të menaxhuar vullnetarizmin tuaj',
    'login.email': 'Email',
    'login.password': 'Fjalëkalimi',
    'login.remember': 'Më mbaj mend',
    'login.forgot': 'Harruat fjalëkalimin?',
    'login.button': 'Kyçu Tani',
    'login.noaccount': 'Nuk keni llogari?',
    'login.register': 'Regjistrohu si Vullnetar',
    'projects.tag': 'Aktivitetet dhe Ndikimi',
    'projects.title': 'Projektet e Vizionit',
    'projects.desc': 'Eksploroni iniciativat tona që po transformojnë komunitetin. Çdo projekt mbart një tregim suksesi dhe përkushtimi.',
    'projects.search': 'Kërko projekte...',
    'projects.filter.all': 'Të gjitha',
    'projects.filter.active': 'Aktive',
    'projects.filter.completed': 'Të mbyllura',
    'projects.details': 'Detajet',
    'projects.summary': 'Përmbledhja',
    'projects.impl': 'Detajet e Implementimit',
    'projects.period': 'Periudha',
    'projects.participants': 'Pjesëmarresit',
    'join.tag': 'Bashkohu me Ne',
    'join.title': 'Bëhu Vullnetar',
    'join.desc': 'Ndërto të ardhmen e fshatit Shalë bashkë me ne. Apliko sot për t\'u bërë pjesë e iniciativave tona në Komunën e Lipjanit.',
    'join.why': 'Pse të aplikosh?',
    'join.benefit1': 'Fito përvojë pune dhe certifikata vullnetarizmi.',
    'join.benefit2': 'Zhvillo aftësi të reja profesionale dhe digjitale.',
    'join.benefit3': 'Kontribuo direkt në zhvillimin e komunitetit në Shalë.',
    'join.form.name': 'Emri i plotë',
    'join.form.email': 'Email',
    'join.form.phone': 'Numri i telefonit',
    'join.form.interests': 'Interesat',
    'join.form.motivation': 'Pse dëshironi t\'i bashkoheni VRSH?',
    'join.form.submit': 'Dërgo Aplikimin',
    'join.success.title': 'Aplikimi u dërgua me sukses!',
    'join.success.desc': 'Faleminderit që dëshironi të jeni pjesë e Vizionit Rinor të Shalës. Ekipi ynë do të shqyrtojë aplikimin tuaj dhe do t\'ju kontaktojë së shpejti.',
    'join.success.button': 'Kthehu në Kreu'
  },
  EN: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.mission': 'Mission',
    'nav.staff': 'Staff',
    'nav.projects': 'Projects',
    'nav.news': 'News',
    'nav.join': 'Join Us',
    'nav.login': 'Login',
    'nav.admin': 'Admin',
    'nav.derdo': 'Derdo AI',

    // About Page
    'about.mission.tag': 'Mission & Vision',
    'about.mission.title1': 'For Youth,',
    'about.mission.title2': 'For the Future',
    'about.mission.quote': '"Youth Vision of Shale (VRSH) transforms youth potential into a driving force for community development in Shale and Lipjan."',
    'about.history.tag': 'How it all began',
    'about.history.title': 'Our Roots in',
    'about.history.p1': 'Youth Vision of Shale was founded as a voluntary initiative by a group of enthusiastic young people who believed that change starts from home. Based in the village of Shale, the organization grew rapidly to become a powerful voice for rural youth needs in the Lipjan municipality.',
    'about.history.p2': 'Today, we are the intersection of innovation and tradition, offering young people tools and knowledge that were once accessible only in large urban centers.',
    'about.values.title': 'Values that',
    'about.values.title2': 'Lead Us',
    'about.values.transparency': 'Transparency',
    'about.values.transparency.desc': 'Full accountability to our members and donors.',
    'about.values.innovation': 'Innovation',
    'about.values.innovation.desc': 'Using technology to solve community problems.',
    'about.values.inclusion': 'Inclusion',
    'about.values.inclusion.desc': 'Equal opportunities for every young person, regardless of gender or status.',
    'about.strategy.tag': 'Strategy 2024-2027',
    'about.strategy.title': 'Our Key',
    'about.strategy.key': 'Objectives',
    'about.strategy.digital': 'Youth Digitalization',
    'about.strategy.digital.desc': 'Creating the first digital lab in Shale village for IT training.',
    'about.strategy.leadership': 'Youth Leadership',
    'about.strategy.leadership.desc': 'Empowering young people to actively participate in local decision-making processes.',
    'about.strategy.env': 'Environment & Climate Change',
    'about.strategy.env.desc': 'Initiatives for reforestation and waste management in the region.',
    'about.strategy.network': 'International Networking',
    'about.strategy.network.desc': 'Membership in European youth networks and Erasmus+ exchanges.',
    'about.fields.title': 'Fields of Action',
    'about.collab.title': 'Our Collaborators',
    'about.office.title': 'Home of Ideas',
    'about.office.desc': 'Our office in Shale, Lipjan — where change begins.',
    'about.team.tag': 'Team & Structure',
    'about.team.title': 'Vision',
    'about.team.title2': 'Staff',
    'about.team.desc': 'Leadership that makes a difference every day.',

    // News Page
    'news.title.all': 'All News',
    'news.title.media': 'Media & Interviews',
    'news.title.latest': 'Latest News',
    'news.title.reports': 'Reports & Publications',
    'news.empty': 'No news found in this category.',
    'news.download': 'Download PDF',
    'news.source': 'View Source',

    // Hero
    'hero.title1': 'Empowering Youth',
    'hero.title2': 'in Shale Village.',
    'hero.subtitle': 'Youth Vision of Shale — Lipjan Municipality',
    'hero.desc': 'A non-governmental organization dedicated to community development in Shale, Lipjan, providing concrete platforms for non-formal education, innovation, and civic activism.',
    'hero.apply': 'Apply as Volunteer',
    'hero.projects': 'Our Projects',
    'derdo.promo.tag': 'New Technology',
    'derdo.greeting': 'Hello, I am Derdo',
    'derdo.desc': "I am the intelligent assistant of VRSH. Ask me anything about our organization, digital trainings, or how you can become part of our team.",
    'derdo.chat': 'Chat with Derdo',
    'mission.title': 'The Mission of Youth Vision',
    'mission.desc': 'Youth Vision of Shale (VRSH) is a platform dedicated to empowering youth and community development in the region of Shale, Lipjan. We aim to transform our village into a center for innovation and youth leadership.',
    'mission.pillar.tech': 'Technology',
    'mission.pillar.lead': 'Leadership',
    'mission.pillar.edu': 'Education',
    'mission.pillar.impact': 'Impact',
    'testimonials.tag': 'Our Testimonials',
    'testimonials.title': 'Volunteer Experience',
    'values.title': 'Our Values',
    'values.transparency': 'Transparency',
    'values.transparency.desc': 'Full transparency and accountability in every activity we perform.',
    'values.collab': 'Collaboration',
    'values.collab.desc': 'Involvement of all relevant stakeholders for the benefit of the community.',
    'values.innovation': 'Innovation',
    'values.innovation.desc': 'Creative and technological solutions for youth challenges.',
    'values.change': 'Change',
    'values.change.desc': 'Relentless commitment to positive change in Shale village.',
    'partners.title': 'Strategic Partners',
    'cta.title': 'Be part of the change',
    'cta.desc': 'Youth Vision of Shale remains an open platform for every young person who wants to learn and contribute to our village in Lipjan.',
    'footer.desc': 'Youth Vision of Shale (Shale, Lipjan) is an organization dedicated to empowering youth through education, innovation, and volunteerism.',
    'footer.nav': 'Navigation',
    'footer.opp': 'Opportunities',
    'footer.find': 'Find Us',
    'login.title': 'Welcome',
    'login.subtitle': 'Login to manage your volunteerism',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot password?',
    'login.button': 'Login Now',
    'login.noaccount': "Don't have an account?",
    'login.register': 'Register as Volunteer',
    'projects.tag': 'Activities and Impact',
    'projects.title': 'Vision Projects',
    'projects.desc': 'Explore our initiatives transforming the community. Every project carries a story of success and dedication.',
    'projects.search': 'Search projects...',
    'projects.filter.all': 'All',
    'projects.filter.active': 'Active',
    'projects.filter.completed': 'Completed',
    'projects.details': 'Details',
    'projects.summary': 'Summary',
    'projects.impl': 'Implementation Details',
    'projects.period': 'Period',
    'projects.participants': 'Participants',
    'join.tag': 'Join Us',
    'join.title': 'Become a Volunteer',
    'join.desc': 'Build the future of Shale village together with us. Apply today to become part of our initiatives in the Lipjan Municipality.',
    'join.why': 'Why apply?',
    'join.benefit1': 'Gain work experience and volunteer certificates.',
    'join.benefit2': 'Develop new professional and digital skills.',
    'join.benefit3': 'Contribute directly to community development in Shale.',
    'join.form.name': 'Full Name',
    'join.form.email': 'Email',
    'join.form.phone': 'Phone Number',
    'join.form.interests': 'Interests',
    'join.form.motivation': 'Why do you want to join VRSH?',
    'join.form.submit': 'Send Application',
    'join.success.title': 'Application sent successfully!',
    'join.success.desc': 'Thank you for wanting to be part of Youth Vision of Shale. Our team will review your application and contact you soon.',
    'join.success.button': 'Back to Home'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('app_lang') as Language) || 'AL';
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
