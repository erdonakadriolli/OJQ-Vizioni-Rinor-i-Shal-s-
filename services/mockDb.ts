
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
      description: 'Trajnime profesionale në IT, Web Development dhe Media Digjitale për të rinjtë e rajonit të Shales, me qëllim rritjen e punësueshmërisë.',
      startDate: '2024-05-01',
      endDate: '2024-10-30',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 28,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p2',
      title: 'Lidershipi Rinor dhe Aftësitë e Buta',
      description: 'Punëtori edukative mbi komunikimin efektiv, punën në ekip dhe mendimin kritik për të nxitur aktivizmin qytetar.',
      startDate: '2024-06-10',
      endDate: '2024-08-15',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 15,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p3',
      title: 'Demokracia Lokale dhe Pjesëmarrja',
      description: 'Inkurajimi i të rinjve për pjesëmarrje aktive në vendimmarrje lokale dhe debate publike.',
      startDate: '2023-09-01',
      endDate: '2023-12-20',
      status: ProjectStatus.COMPLETED,
      volunteerCount: 35,
      image: 'https://images.unsplash.com/photo-1541873676947-d7977a1e8f74?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p4',
      title: 'Barazia Gjinore dhe Përfshirja Sociale',
      description: 'Fushata ndërgjegjësimi dhe aktivitete sociale që promovojnë barazinë dhe gjithëpërfshirjen në komunitet.',
      startDate: '2024-09-01',
      endDate: '2024-12-30',
      status: ProjectStatus.UPCOMING,
      volunteerCount: 0,
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800'
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
      category: 'Brendshme'
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
    },
    {
      id: 's3',
      name: 'Stafi dhe Asistentët',
      role: 'Koordinimi',
      bio: 'Koordinojnë aktivitetet, raportimin, logjistikën dhe komunikimin me partnerët vendorë dhe ndërkombëtarë.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      socials: { instagram: '#' }
    },
    {
      id: 's4',
      name: 'Vullnetarët',
      role: 'Zemra e Organizatës',
      bio: 'Shtylla kryesore e VRS, të përfshirë në planifikim, zbatim dhe promovim të aktiviteteve komunitare.',
      image: 'https://images.unsplash.com/photo-1559027615-cd76efc4125c?auto=format&fit=crop&q=80&w=400',
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
