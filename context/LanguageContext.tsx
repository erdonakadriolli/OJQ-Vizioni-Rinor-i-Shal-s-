
import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
  getFont: (key: string) => string;
  updateTranslation: (key: string, value: string) => void;
  updateFont: (key: string, font: string) => void;
  language: 'AL' | 'EN';
  setLanguage: (lang: 'AL' | 'EN') => void;
}

const initialTranslations: Record<string, Record<'AL' | 'EN', string>> = {
  // Navigimi
  'nav.home': { AL: 'Kryefaqja', EN: 'Home' },
  'nav.about': { AL: 'Rreth Nesh', EN: 'About Us' },
  'nav.mission': { AL: 'Vizioni dhe Misioni', EN: 'Vision & Mission' },
  'nav.staff': { AL: 'Struktura', EN: 'Staff' },
  'nav.projects': { AL: 'Projektet', EN: 'Projects' },
  'nav.news': { AL: 'Lajmet', EN: 'News' },
  'nav.join': { AL: 'Vullnetarizimi', EN: 'Volunteer' },
  'nav.login': { AL: 'Kyçu', EN: 'Login' },
  'nav.derdo': { AL: 'Vizioni AI', EN: 'Vision AI' },

  // Hero Section
  'hero.subtitle': { AL: 'Vizioni Rinor i Shalës', EN: 'Shala Youth Vision' },
  'hero.title1': { AL: 'Fuqizimi i Rinisë', EN: 'Empowering Youth' },
  'hero.title2': { AL: 'për të ardhmen', EN: 'for the future' },
  'hero.desc': { AL: 'VRSH është një organizatë joqeveritare rinore e përkushtuar fuqizimit të të rinjve dhe zhvillimit të komunitetit përmes edukimit, inovacionit dhe pjesëmarrjes aktive qytetare në Shalë dhe rrethinë.', EN: 'VRSH is a youth non-governmental organization dedicated to empowering youth and community development through education, innovation, and active civic participation in Shala and surrounding areas.' },
  'hero.apply': { AL: 'Bëhu Vullnetar', EN: 'Become a Volunteer' },
  'hero.projects': { AL: 'Eksploro Projektet', EN: 'Explore Projects' },
  'hero.badge': { AL: 'Iniciativa e Shpresës', EN: 'Initiative of Hope' },
  'hero.location': { AL: 'Fshati Shalë, Lipjan', EN: 'Shala Village, Lipjan' },

  // Faqja Rreth Nesh
  'about.main.title': { AL: 'Vizioni Rinor i Shalës (VRSH)', EN: 'Shala Youth Vision (VRSH)' },
  'about.hero.title1': { AL: 'Misioni ynë', EN: 'Our Mission' },
  'about.hero.title2': { AL: 'për rininë', EN: 'for youth' },
  'about.hero.title3': { AL: 'dhe komunitetin', EN: 'and community' },
  'about.hero.badge': { AL: 'Misioni ynë', EN: 'Our Mission' },
  'about.staff.title': { AL: 'Struktura Organizative', EN: 'Organizational Structure' },
  'about.staff.bio_fallback': { AL: 'Një vizionar/e që punon pa rreshtur për të fuqizuar rininë e Shalës.', EN: 'A visionary working tirelessly to empower the youth of Shala.' },
  'about.main.desc': { AL: 'Misioni ynë është të krijojmë një ambient mbështetës ku të rinjtë mund të zhvillojnë potencialin e tyre të plotë dhe të kontribuojnë në mënyrë aktive në shoqëri.', EN: 'Our mission is to create a supportive environment where youth can develop their full potential and actively contribute to society.' },
  'about.main.goal': { AL: 'Ne synojmë të krijojmë mundësi konkrete për të rinjtë që të zhvillojnë aftësi personale, profesionale dhe digjitale, si dhe të nxisim lidershipin rinor dhe aktivizmin komunitar.', EN: 'We aim to create concrete opportunities for youth to develop personal, professional, and digital skills, as well as to foster youth leadership and community activism.' },
  
  'about.fields.title': { AL: 'Fushat Kryesore të Veprimit', EN: 'Main Fields of Action' },
  'about.fields.1': { AL: 'Fuqizimi i të rinjve dhe lidershipi rinor', EN: 'Youth empowerment and youth leadership' },
  'about.fields.2': { AL: 'Edukimi joformal dhe zhvillimi profesional', EN: 'Non-formal education and professional development' },
  'about.fields.3': { AL: 'Aftësitë digjitale dhe teknologjia', EN: 'Digital skills and technology' },
  'about.fields.4': { AL: 'Vullnetarizmi dhe angazhimi qytetar', EN: 'Volunteerism and civic engagement' },
  'about.fields.5': { AL: 'Barazia gjinore dhe përfshirja sociale', EN: 'Gender equality and social inclusion' },

  'about.activities.title': { AL: 'Aktivitetet tona', EN: 'Our Activities' },
  'about.activities.desc': { AL: 'VRS zbaton projekte të ndryshme të fokusuara në trajnime, punëtori dhe fushata vetëdijesimi për të rinjtë.', EN: 'VRSH implements various projects focused on training, workshops, and awareness campaigns for youth.' },
  'about.activities.list1': { AL: 'Trajnime për aftësi të buta (soft skills)', EN: 'Soft skills training' },
  'about.activities.list2': { AL: 'Kurse profesionale në teknologji dhe dizajm', EN: 'Professional courses in technology and design' },
  'about.activities.list3': { AL: 'Punëtori edukative dhe forume rinore', EN: 'Educational workshops and youth forums' },
  'about.activities.list4': { AL: 'Aktivitete komunitare dhe fushata vetëdijesimi', EN: 'Community activities and awareness campaigns' },
  'about.activities.list5': { AL: 'Mentorim për karrierë dhe punësim', EN: 'Career mentoring and employment' },

  // Struktura
  'about.structure.title': { AL: 'Struktura Organizative', EN: 'Organizational Structure' },
  'about.structure.assembly': { AL: 'Asambleja e Anëtarëve', EN: 'Members Assembly' },
  'about.structure.board': { AL: 'Bordi i Drejtorëve', EN: 'Board of Directors' },
  'about.structure.director': { AL: 'Drejtori Ekzekutiv', EN: 'Executive Director' },
  'about.structure.staff': { AL: 'Stafi i Zyrës', EN: 'Office Staff' },
  'about.structure.volunteers': { AL: 'Vullnetarët tanë', EN: 'Our Volunteers' },
  'about.structure.volunteers.desc': { AL: 'Vullnetarët janë zemra e organizatës sonë, duke kontribuar në çdo projekt me pasion dhe përkushtim.', EN: 'Volunteers are the heart of our organization, contributing to every project with passion and dedication.' },

  // Statistikat
  'stats.trained': { AL: 'Të rinj të trajnuar', EN: 'Trained youth' },
  'stats.trained.value': { AL: '500+', EN: '500+' },
  'stats.completed': { AL: 'Projekte të përfunduara', EN: 'Completed projects' },
  'stats.completed.value': { AL: '25+', EN: '25+' },
  'stats.volunteers': { AL: 'Vullnetarë aktivë', EN: 'Active volunteers' },
  'stats.volunteers.value': { AL: '100+', EN: '100+' },
  'stats.region': { AL: 'Rajoni i mbuluar', EN: 'Region covered' },
  'stats.region.value': { AL: 'Lipjan', EN: 'Lipjan' },

  // Footer
  'footer.desc': { AL: 'Vizioni Rinor i Shalës (VRSH) — Organizatë udhëheqëse për fuqizimin e rinisë dhe zhvillimin e qëndrueshëm komunitar në Kosovë.', EN: 'Shala Youth Vision (VRSH) — Leading organization for youth empowerment and sustainable community development in Kosovo.' },
  'footer.nav': { AL: 'Navigimi', EN: 'Navigation' },
  'footer.opp': { AL: 'Mundësitë', EN: 'Opportunities' },
  'footer.find': { AL: 'Na gjeni', EN: 'Find us' },
  'footer.rights': { AL: '2026 Vizioni Rinor i Shalës. Të gjitha të drejtat të rezervuara.', EN: '2026 Shala Youth Vision. All rights reserved.' },
  'footer.developedBy': { AL: 'Zhvilluar nga', EN: 'Developed by' },
  
  // Projektet
  'projects.tag': { AL: 'Veprimtaria jonë', EN: 'Our Work' },
  'projects.title': { AL: 'Projektet tona', EN: 'Our Projects' },
  'projects.desc': { AL: 'Zbuloni iniciativat tona që po ndryshojnë jetën e të rinjve në Shalë dhe më gjerë.', EN: 'Discover our initiatives that are changing the lives of youth in Shala and beyond.' },
  'projects.search': { AL: 'Kërko projekte...', EN: 'Search projects...' },
  'projects.filter.all': { AL: 'Të gjitha', EN: 'All' },
  'projects.filter.active': { AL: 'Aktive', EN: 'Active' },
  'projects.filter.completed': { AL: 'Të përfunduara', EN: 'Completed' },
  'projects.details': { AL: 'Detajet e projektit', EN: 'Project details' },
  'projects.summary': { AL: 'Përmbledhja', EN: 'Summary' },
  'projects.impl': { AL: 'Zbatimi dhe Detajet', EN: 'Implementation & Details' },
  'projects.period': { AL: 'Periudha', EN: 'Period' },
  'projects.participants': { AL: 'Pjesëmarrësit', EN: 'Participants' },

  // Login
  'login.title': { AL: 'Mirë se vini', EN: 'Welcome' },
  'login.subtitle': { AL: 'Kyçu në panelin e menaxhimit', EN: 'Login to the management panel' },
  'login.email': { AL: 'Adresa Email', EN: 'Email Address' },
  'login.password': { AL: 'Fjalëkalimi', EN: 'Password' },
  'login.button': { AL: 'Kyçu tani', EN: 'Login now' },
  'login.error': { AL: 'Të dhënat janë gabim.', EN: 'Data is incorrect.' },
  'login.remember': { AL: 'Më mbaj mend', EN: 'Remember me' },
  'login.forgot': { AL: 'Harruat fjalëkalimin?', EN: 'Forgot password?' },
  'login.noaccount': { AL: 'Nuk keni llogari?', EN: 'Don\'t have an account?' },
  'login.register': { AL: 'Bëhu vullnetar', EN: 'Become a volunteer' },

  // Volunteer Apply
  'join.tag': { AL: 'Bëhu pjesë e ndryshimit', EN: 'Be part of the change' },
  'join.title': { AL: 'Vullnetarizimi në VRSH', EN: 'Volunteering at VRSH' },
  'join.desc': { AL: 'Bashkohu me ne për të dhënë kontributin tënd dhe për të fituar përvoja të reja të paharrueshme.', EN: 'Join us to give your contribution and gain new unforgettable experiences.' },
  'join.why': { AL: 'Pse të bëhesh vullnetar?', EN: 'Why become a volunteer?' },
  'join.benefit1': { AL: 'Zhvillim i aftësive të reja profesionale', EN: 'Development of new professional skills' },
  'join.benefit2': { AL: 'Rrjetëzim me profesionistë dhe liderë të rinj', EN: 'Networking with professionals and young leaders' },
  'join.benefit3': { AL: 'Certifikim dhe njohje e punës vullnetare', EN: 'Certification and recognition of volunteer work' },
  'join.form.name': { AL: 'Emri dhe Mbiemri', EN: 'Full Name' },
  'join.form.email': { AL: 'Email', EN: 'Email' },
  'join.form.phone': { AL: 'Numri i telefonit', EN: 'Phone Number' },
  'join.form.interests': { AL: 'Fushat e interesit', EN: 'Areas of Interest' },
  'join.form.motivation': { AL: 'Pse dëshironi të bëheni vullnetar?', EN: 'Why do you want to volunteer?' },
  'join.form.submit': { AL: 'Dërgo Aplikimin', EN: 'Submit Application' },
  'join.success.title': { AL: 'Aplikimi u dërgua!', EN: 'Application sent!' },
  'join.success.desc': { AL: 'Faleminderit për interesimin tuaj. Ekipi ynë do t\'ju kontaktojë së shpejti.', EN: 'Thank you for your interest. Our team will contact you soon.' },
  'join.success.button': { AL: 'Kthehu në Kreu', EN: 'Back to Home' },

  // Derdo AI
  'derdo.promo.tag': { AL: 'Inovacioni Digjital', EN: 'Digital Innovation' },
  'derdo.greeting': { AL: 'Bisedo me Vizioni AI', EN: 'Chat with Vision AI' },
  'derdo.desc': { AL: 'Vizioni AI është asistenti ynë inteligjent që ju ndihmon me informacione rreth organizatës, projekteve dhe vullnetarizmit.', EN: 'Vision AI is our intelligent assistant that helps you with information about the organization, projects, and volunteering.' },
  'derdo.chat': { AL: 'Fillo bisedën', EN: 'Start conversation' },

  // Lajmet
  'news.title.all': { AL: 'Të gjitha lajmet', EN: 'All news' },
  'news.title.latest': { AL: 'Lajmet', EN: 'News' },
  'news.title.media': { AL: 'Media', EN: 'Media' },
  'news.readMore': { AL: 'Lexo më shumë', EN: 'Read more' },
  'news.title.reports': { AL: 'Raporte dhe Publikime', EN: 'Reports & Publications' },
  'news.empty': { AL: 'Nuk u gjet asnjë lajm në këtë kategori.', EN: 'No news found in this category.' },
  'news.download': { AL: 'Shkarko dokumentin', EN: 'Download document' },
  'news.source': { AL: 'Burimi i lajmit', EN: 'News source' },

  // Partnerët
  'home.partners.badge': { AL: 'Bashkëpunimi', EN: 'Collaboration' },
  'home.partners.title': { AL: 'Partnerët & Donatorët tanë', EN: 'Our Partners & Donors' },

  // Admin Panel
  'admin.panel': { AL: 'Paneli i Adminit', EN: 'Admin Panel' },
  'admin.overview': { AL: 'Përmbledhja', EN: 'Overview' },
  'admin.projects': { AL: 'Projektet', EN: 'Projects' },
  'admin.news': { AL: 'Lajmet & Publikimet', EN: 'News & Publications' },
  'admin.staff': { AL: 'Stafi & Ekipi', EN: 'Staff & Team' },
  'admin.applications': { AL: 'Aplikimet', EN: 'Applications' },
  'admin.management': { AL: 'Menaxhimi i Organizatës', EN: 'Organization Management' },
  'admin.addProject': { AL: 'Shto Projekt', EN: 'Add Project' },
  'admin.editProject': { AL: 'Edito Projektin', EN: 'Edit Project' },
  'admin.addNews': { AL: 'Shto Lajm/Raport', EN: 'Add News/Report' },
  'admin.editNews': { AL: 'Edito Lajmin', EN: 'Edit News' },
  'admin.addStaff': { AL: 'Shto Anëtar Stafi', EN: 'Add Staff Member' },
  'admin.editStaff': { AL: 'Edito Stafin', EN: 'Edit Staff' },
  'admin.title': { AL: 'Titulli', EN: 'Title' },
  'admin.status': { AL: 'Statusi', EN: 'Status' },
  'admin.actions': { AL: 'Veprimet', EN: 'Actions' },
  'admin.delete': { AL: 'Fshije', EN: 'Delete' },
  'admin.deleteConfirm': { AL: 'A jeni të sigurt që dëshironi ta fshini këtë zë?', EN: 'Are you sure you want to delete this item?' },
  'admin.save': { AL: 'Ruaj Ndryshimet', EN: 'Save Changes' },
  'admin.cancel': { AL: 'Anulo', EN: 'Cancel' },
  'admin.generateAi': { AL: 'Gjenero me AI', EN: 'Generate with AI' },
  'admin.mainImage': { AL: 'Imazhi Kryesor', EN: 'Main Image' },
  'admin.gallery': { AL: 'Galeria e Fotos', EN: 'Photo Gallery' },
  'admin.category': { AL: 'Kategoria', EN: 'Category' },
  'admin.date': { AL: 'Data', EN: 'Date' },
  'admin.applicant': { AL: 'Aplikuesi', EN: 'Applicant' },
  'admin.partners': { AL: 'Partnerët & Donatorët', EN: 'Partners & Donors' },
  'admin.addPartner': { AL: 'Shto Partner', EN: 'Add Partner' },
  'admin.editPartner': { AL: 'Edito Partnerin', EN: 'Edit Partner' },
  'admin.partnerName': { AL: 'Emri i Partnerit', EN: 'Partner Name' },
  'admin.partnerLogo': { AL: 'Logo e Partnerit', EN: 'Partner Logo' },
  'admin.partnerWebsite': { AL: 'Uebfaqja (Opsionale)', EN: 'Website (Optional)' },
  'ui.ask': { AL: 'Pyet', EN: 'Ask' },
  'ui.upload': { AL: 'Ngarko', EN: 'Upload' },

  // Imazhet
  'home.hero.image': { AL: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200', EN: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200' },
  'about.mission.image': { AL: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200', EN: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200' }
};/images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
  'about.mission.image': 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200'
};

const initialFonts: Record<string, string> = {
  'hero.title1': 'font-sans',
  'hero.title2': 'font-sans',
  'hero.subtitle': 'font-outfit',
  'about.main.title': 'font-sans',
  'projects.title': 'font-sans',
  'join.title': 'font-sans',
  'derdo.greeting': 'font-sans',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'AL' | 'EN'>(() => {
    const saved = localStorage.getItem('ngo_language');
    return (saved as 'AL' | 'EN') || 'AL';
  });

  const [currentTranslations, setCurrentTranslations] = useState<Record<string, Record<'AL' | 'EN', string>>>(() => {
    const saved = localStorage.getItem('ngo_translations');
    return saved ? JSON.parse(saved) : initialTranslations;
  });

  const [currentFonts, setCurrentFonts] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('ngo_fonts');
    return saved ? JSON.parse(saved) : initialFonts;
  });

  const setLanguage = useCallback((lang: 'AL' | 'EN') => {
    setLanguageState(lang);
    localStorage.setItem('ngo_language', lang);
  }, []);

  const t = useCallback((key: string) => {
    const translation = currentTranslations[key];
    if (!translation) return key;
    return translation[language] || translation['AL'] || key;
  }, [currentTranslations, language]);

  const getFont = useCallback((key: string) => {
    return currentFonts[key] || 'font-sans';
  }, [currentFonts]);

  const updateTranslation = useCallback((key: string, value: string) => {
    setCurrentTranslations(prev => {
      const current = prev[key] || { AL: '', EN: '' };
      const next = { 
        ...prev, 
        [key]: { ...current, [language]: value } 
      };
      localStorage.setItem('ngo_translations', JSON.stringify(next));
      return next;
    });
  }, [language]);

  const updateFont = useCallback((key: string, font: string) => {
    setCurrentFonts(prev => {
      const next = { ...prev, [key]: font };
      localStorage.setItem('ngo_fonts', JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(() => ({ 
    t, 
    getFont, 
    updateTranslation, 
    updateFont, 
    language,
    setLanguage
  }), [t, getFont, updateTranslation, updateFont, language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
