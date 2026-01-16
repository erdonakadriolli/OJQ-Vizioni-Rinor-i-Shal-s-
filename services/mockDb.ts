
import { Project, Event, User, VolunteerApplication, NewsItem, ProjectStatus, UserRole, ApplicationStatus, StaffMember } from '../types';

const STORAGE_KEY = 'ngo_app_data_v1';

interface DbSchema {
  projects: Project[];
  events: Event[];
  users: User[];
  applications: VolunteerApplication[];
  news: NewsItem[];
  staff: StaffMember[];
}

const initialData: DbSchema = {
  projects: [
    {
      id: 'p1',
      title: 'Trajnime për Aftësi Digjitale',
      description: 'Trajnime profesionale në IT, Web Development dhe Media Digjitale për të rinjtë e rajonit të Shales.',
      longDescription: 'Ky projekt synon të pajisë të rinjtë me mjetet e nevojshme për tregun modern të punës. Gjatë 6 muajve, pjesëmarrësit do të mësojnë bazat e programimit, dizajnit grafik dhe menaxhimit të rrjeteve sociale.\n\nObjektivat kryesore:\n1. Certifikimi i 50 të rinjve në HTML/CSS.\n2. Krijimi i portofolios digjitale për secilin pjesëmarrës.\n3. Lidhja me biznese lokale për praktikë pune.',
      startDate: '2024-05-01',
      endDate: '2024-10-30',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 28,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      gallery: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800'
      ]
    },
    {
      id: 'p2',
      title: 'Lidershipi Rinor dhe Aftësitë e Buta',
      description: 'Punëtori edukative mbi komunikimin efektiv dhe punën në ekip.',
      longDescription: 'Projekti fokusohet në zhvillimin e personalitetit dhe aftësive udhëheqëse. Përmes metodave të edukimit joformal, të rinjtë sfidohen të marrin role drejtuese në projekte simuluese.\n\nModulet përfshijnë:\n- Komunikimi joverbal dhe publik.\n- Menaxhimi i konflikteve.\n- Hartimi i projekteve komunitare.',
      startDate: '2024-06-10',
      endDate: '2024-08-15',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 15,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      gallery: [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
      ]
    },
    {
      id: 'p3',
      title: 'Demokracia Lokale dhe Pjesëmarrja',
      description: 'Inkurajimi i të rinjve për pjesëmarrje aktive në vendimmarrje lokale.',
      longDescription: 'Ky ishte një ndër projektet tona më të suksesshme ku të rinjtë patën mundësinë të takojnë zyrtarë komunalë dhe të propozojnë ndryshime në rregulloret lokale për rininë.\n\nRezultatet:\n- Miratimi i Strategjisë Lokale për Rininë.\n- Formimi i Këshillit Rinor Lokal.',
      startDate: '2023-09-01',
      endDate: '2023-12-20',
      status: ProjectStatus.COMPLETED,
      volunteerCount: 35,
      image: 'https://images.unsplash.com/photo-1541873676947-d7977a1e8f74?auto=format&fit=crop&q=80&w=800'
    }
  ],
  events: [
    {
      id: 'e1',
      title: 'Java e Shkencës dhe Edukimit',
      description: 'Panele diskutimi, kuize dhe prezantime shkencore për nxënësit e shkollave.',
      date: '2024-04-15',
      location: 'Qendra Rinore, Mitrovicë',
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800'
    }
  ],
  users: [
    { id: 'u1', name: 'Admin VRS', email: 'admin@vizionirinorishales.org', role: UserRole.ADMIN },
    { id: 'u2', name: 'Vullnetari VRS', email: 'vullnetari@vizionirinorishales.org', role: UserRole.VOLUNTEER }
  ],
  applications: [],
  news: [
    {
      id: 'n1',
      title: 'Ngritje e kapaciteteve për stafin',
      content: 'Sesione trajnimi menaxheriale dhe digjitale për stafin dhe vullnetarët e VRS.',
      datePosted: '2024-03-25',
      category: 'Lajmet e fundit'
    },
    {
      id: 'n2',
      title: 'Vizioni Rinor në RTK',
      content: 'Përfaqësuesit tanë folën për rëndësinë e edukimit digjital në emisionin e mëngjesit.',
      datePosted: '2024-03-20',
      category: 'Media'
    },
    {
      id: 'n3',
      title: 'Raporti Vjetor 2023',
      content: 'Shikoni arritjet tona dhe ndikimin që kemi pasur gjatë vitit që lamë pas.',
      datePosted: '2024-01-15',
      category: 'Raportet',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  ],
  staff: [
    {
      id: 's1',
      name: 'Drejtori Ekzekutiv',
      role: 'Udhëheqës i VRS',
      bio: 'Përgjegjës për menaxhimin e përditshëm, zbatimin e projekteve dhe përfaqësimin institucional të organizatës.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      socials: { linkedin: '#' }
    },
    {
      id: 's2',
      name: 'Bordi i Drejtorëve',
      role: 'Organi Mbikëqyrës',
      bio: 'Mbikëqyr funksionimin e organizatës, siguron transparencë dhe udhëzon politikat afatgjata strategjike.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
      socials: { facebook: '#' }
    }
  ]
};

export const getDb = (): DbSchema => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
};

export const saveDb = (data: DbSchema) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
