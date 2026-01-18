
import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
  language: string;
}

const translations: Record<string, string> = {
  // Navigimi
  'nav.home': 'Kreu',
  'nav.about': 'Rreth Nesh',
  'nav.mission': 'Misioni & Vizioni',
  'nav.staff': 'Ekipi ynë',
  'nav.projects': 'Projektet',
  'nav.news': 'Lajmet',
  'nav.join': 'Vullnetarizimi',
  'nav.login': 'Kyçu',
  'nav.derdo': 'Derdo AI',

  // Hero Section
  'hero.subtitle': 'Vizioni Rinor i Shalës',
  'hero.title1': 'Fuqizimi i Rinisë',
  'hero.title2': 'për të ardhmen',
  'hero.desc': 'VRSH është një organizatë joqeveritare rinore e përkushtuar fuqizimit të të rinjve dhe zhvillimit të komunitetit përmes edukimit, inovacionit dhe pjesëmarrjes aktive qytetare në Shalë dhe rrethinë.',
  'hero.apply': 'Bëhu Vullnetar',
  'hero.projects': 'Eksploro Projektet',

  // Faqja Rreth Nesh
  'about.main.title': 'Vizioni Rinor i Shalës (VRSH)',
  'about.main.desc': 'Misioni ynë është të krijojmë një ambient mbështetës ku të rinjtë mund të zhvillojnë potencialin e tyre të plotë dhe të kontribuojnë në mënyrë aktive në shoqëri.',
  'about.main.goal': 'Ne synojmë të krijojmë mundësi konkrete për të rinjtë që të zhvillojnë aftësi personale, profesionale dhe digjitale, si dhe të nxisim lidershipin rinor dhe aktivizmin komunitar.',
  
  'about.fields.title': 'Fushat Kryesore të Veprimit',
  'about.fields.1': 'Fuqizimi i të rinjve dhe lidershipi rinor',
  'about.fields.2': 'Edukimi joformal dhe zhvillimi profesional',
  'about.fields.3': 'Aftësitë digjitale dhe teknologjia',
  'about.fields.4': 'Vullnetarizmi dhe angazhimi qytetar',
  'about.fields.5': 'Barazia gjinore dhe përfshirja sociale',

  'about.activities.title': 'Aktivitetet tona',
  'about.activities.desc': 'VRS zbaton projekte të ndryshme të fokusuara në trajnime, punëtori dhe fushata vetëdijesimi për të rinjtë.',
  'about.activities.list1': 'Trajnime për aftësi të buta (soft skills)',
  'about.activities.list2': 'Kurse profesionale në teknologji dhe dizajm',
  'about.activities.list3': 'Punëtori edukative dhe forume rinore',
  'about.activities.list4': 'Aktivitete komunitare dhe fushata vetëdijesimi',
  'about.activities.list5': 'Mentorim për karrierë dhe punësim',

  // Struktura
  'about.structure.title': 'Struktura Organizative',
  'about.structure.assembly': 'Asambleja e Anëtarëve',
  'about.structure.board': 'Bordi i Drejtorëve',
  'about.structure.director': 'Drejtori Ekzekutiv',
  'about.structure.staff': 'Stafi i Zyrës',
  'about.structure.volunteers': 'Vullnetarët tanë',
  'about.structure.volunteers.desc': 'Vullnetarët janë zemra e organizatës sonë, duke kontribuar në çdo projekt me pasion dhe përkushtim.',

  // Statistikat
  'stats.trained': 'Të rinj të trajnuar',
  'stats.completed': 'Projekte të përfunduara',
  'stats.volunteers': 'Vullnetarë aktivë',
  'stats.region': 'Rajoni i mbuluar',

  // Footer
  'footer.desc': 'Vizioni Rinor i Shalës (VRSH) — Organizatë udhëheqëse për fuqizimin e rinisë dhe zhvillimin e qëndrueshëm komunitar në Kosovë.',
  'footer.nav': 'Navigimi',
  'footer.opp': 'Mundësitë',
  'footer.find': 'Na gjeni',
  'footer.rights': '2026 Vizioni Rinor i Shalës. Të gjitha të drejtat të rezervuara.',
  'footer.developedBy': 'Zhvilluar nga',
  
  // Projektet
  'projects.tag': 'Veprimtaria jonë',
  'projects.title': 'Projektet tona',
  'projects.desc': 'Zbuloni iniciativat tona që po ndryshojnë jetën e të rinjve në Shalë dhe më gjerë.',
  'projects.search': 'Kërko projekte...',
  'projects.filter.all': 'Të gjitha',
  'projects.filter.active': 'Aktive',
  'projects.filter.completed': 'Të përfunduara',
  'projects.details': 'Detajet e projektit',
  'projects.summary': 'Përmbledhja',
  'projects.impl': 'Zbatimi dhe Detajet',
  'projects.period': 'Periudha',
  'projects.participants': 'Pjesëmarrësit',

  // Login
  'login.title': 'Mirë se vini',
  'login.subtitle': 'Kyçu në panelin e menaxhimit',
  'login.email': 'Adresa Email',
  'login.password': 'Fjalëkalimi',
  'login.button': 'Kyçu tani',
  'login.error': 'Të dhënat janë gabim.',
  'login.remember': 'Më mbaj mend',
  'login.forgot': 'Harruat fjalëkalimin?',
  'login.noaccount': 'Nuk keni llogari?',
  'login.register': 'Bëhu vullnetar',

  // Volunteer Apply
  'join.tag': 'Bëhu pjesë e ndryshimit',
  'join.title': 'Vullnetarizimi në VRSH',
  'join.desc': 'Bashkohu me ne për të dhënë kontributin tënd dhe për të fituar përvoja të reja të paharrueshme.',
  'join.why': 'Pse të bëhesh vullnetar?',
  'join.benefit1': 'Zhvillim i aftësive të reja profesionale',
  'join.benefit2': 'Rrjetëzim me profesionistë dhe liderë të rinj',
  'join.benefit3': 'Certifikim dhe njohje e punës vullnetare',
  'join.form.name': 'Emri dhe Mbiemri',
  'join.form.email': 'Email',
  'join.form.phone': 'Numri i telefonit',
  'join.form.interests': 'Fushat e interesit',
  'join.form.motivation': 'Pse dëshironi të bëheni vullnetar?',
  'join.form.submit': 'Dërgo Aplikimin',
  'join.success.title': 'Aplikimi u dërgua!',
  'join.success.desc': 'Faleminderit për interesimin tuaj. Ekipi ynë do t\'ju kontaktojë së shpejti.',
  'join.success.button': 'Kthehu në Kreu',

  // Derdo AI
  'derdo.promo.tag': 'Inovacioni Digjital',
  'derdo.greeting': 'Bisedo me Derdon',
  'derdo.desc': 'Derdo është asistenti ynë inteligjent që ju ndihmon me informacione rreth organizatës, projekteve dhe vullnetarizmit.',
  'derdo.chat': 'Fillo bisedën',

  // Lajmet
  'news.title.all': 'Të gjitha lajmet',
  'news.title.latest': 'Lajmet e fundit',
  'news.title.media': 'Media & TV',
  'news.title.reports': 'Publikimet & Raportet',
  'news.empty': 'Nuk u gjet asnjë lajm në këtë kategori.',
  'news.download': 'Shkarko dokumentin',
  'news.source': 'Burimi i lajmit'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useCallback((key: string) => {
    return translations[key] || key;
  }, []);

  const value = useMemo(() => ({ t, language: 'AL' }), [t]);

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
