
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
      title: 'Akademia Digjitale për Rininë - Shalë',
      description: 'Program intensiv trajnimi në kodim, dizajm grafik dhe marketing digjital për të rinjtë e fshatit Shalë.',
      longDescription: 'Ky projekt synon të thyejë barrierat gjeografike duke sjellë trendet më të fundit të teknologjisë direkt në Shalë, Lipjan. Programi përfshin 12 javë mentorim dhe punë praktike.',
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      status: ProjectStatus.Active,
      volunteerCount: 12,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      gallery: []
    }
  ],
  events: [],
  users: [
    { id: 'u1', name: 'Admin VRS', email: 'admin@vizionirinorishales.org', role: UserRole.ADMIN },
  ],
  applications: [],
  news: [
    {
      id: 'n1',
      title: 'Bashkëpunim i ri me Komunën e Lipjanit',
      content: 'Vizioni Rinor i Shalës ka nënshkruar memorandum bashkëpunimi për projektet e ardhshme rinore në fshatin Shalë.',
      datePosted: '2024-03-28',
      category: 'Lajmet e fundit'
    }
  ],
  staff: [
    {
      id: 's1',
      name: 'Leotrim Pajaziti',
      role: 'Drejtor Ekzekutiv',
      category: 'Drejtor Ekzekutiv',
      bio: 'Udhëheqës i projekteve dhe vizionit të organizatës.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's2',
      name: 'Bleriana Kadriolli',
      role: 'Asistente e Projekteve',
      category: 'Stafi Aktual',
      bio: 'Mbështetje në koordinimin dhe zbatimin e aktiviteteve.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's3',
      name: 'Dijellëza Selmani',
      role: 'Asistente e Projekteve',
      category: 'Stafi Aktual',
      bio: 'Përgjegjëse për mbarëvajtjen e trajnimeve.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's4',
      name: 'Euresa Karpuzi',
      role: 'Kryetare e Asamblesë së Anëtarëve',
      category: 'Kuvendi i Anëtarëve',
      bio: '',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's5',
      name: 'Miranda Karpuzi',
      role: 'Anëtare e Asamblesë',
      category: 'Kuvendi i Anëtarëve',
      bio: '',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's6',
      name: 'Shkelzen Karpuzi',
      role: 'Anëtar i Bordit të Drejtorëve',
      category: 'Bordi i Drejtorëve',
      bio: '',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's7',
      name: 'Burim Shamolli',
      role: 'Anëtar i Bordit të Drejtorëve',
      category: 'Bordi i Drejtorëve',
      bio: '',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    { id: 'v1', name: 'Erdona Kadriolli', role: 'Vullnetare', category: 'Vullnetarët', bio: '', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', socials: {} },
    { id: 'v2', name: 'Erjona Kadriolli', role: 'Vullnetare', category: 'Vullnetarët', bio: '', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', socials: {} },
    { id: 'v3', name: 'Viola Hetemi', role: 'Vullnetare', category: 'Vullnetarët', bio: '', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400', socials: {} }
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
