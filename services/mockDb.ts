
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
      longDescription: 'Ky projekt synon të thyejë barrierat gjeografike duke sjellë trendet më të fundit të teknologjisë direkt në Shalë, Lipjan. Programi përfshin 12 javë mentorim dhe punë praktike.\n\nObjektivat:\n- Aftësimi i 30 të rinjve në teknologjitë moderne.\n- Krijimi i një laboratori digjital në qendrën tonë në Shalë.\n- Mbështetja e pjesëmarrësve për punësim në distancë (Freelance).',
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 12,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      gallery: []
    },
    {
      id: 'p2',
      title: 'Lidershipi Rinor në Komunën e Lipjanit',
      description: 'Fuqizimi i zërit të të rinjve në vendimmarrje lokale dhe aktivizëm komunitar në të gjithë zonën e Shalës.',
      longDescription: 'Përmes këtij projekti, Vizioni Rinor i Shalës po ndërton një gjeneratë të re udhëheqësish që do të përfaqësojnë interesat e fshatit tonë në nivel komunal në Lipjan.\n\nFushat e fokusit:\n- Komunikimi publik dhe avokimi.\n- Hartimi i projekteve me ndikim social.\n- Bashkëpunimi me asamblistët e Komunës së Lipjanit.',
      startDate: '2024-05-15',
      endDate: '2024-11-20',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 8,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      gallery: []
    }
  ],
  events: [],
  users: [
    { id: 'u1', name: 'Admin VRS', email: 'admin@vizionirinorishales.org', role: UserRole.ADMIN },
    { id: 'u2', name: 'Vullnetari', email: 'vullnetari@vizionirinorishales.org', role: UserRole.VOLUNTEER }
  ],
  applications: [],
  news: [
    {
      id: 'n1',
      title: 'Bashkëpunim i ri me Komunën e Lipjanit',
      content: 'Vizioni Rinor i Shalës ka nënshkruar memorandum bashkëpunimi për projektet e ardhshme rinore në fshatin Shalë, duke u fokusuar në edukimin joformal.',
      datePosted: '2024-03-28',
      category: 'Lajmet e fundit'
    }
  ],
  staff: [
    {
      id: 's1',
      name: 'Erdona Kadriolli',
      role: 'Drejtore Ekzekutive',
      bio: 'E përkushtuar për të sjellë ndryshim pozitiv në komunitetin e Shalës përmes inovacionit dhe edukimit.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      socials: { linkedin: '#' }
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
