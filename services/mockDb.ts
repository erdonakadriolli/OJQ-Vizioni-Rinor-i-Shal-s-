
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
      title: 'Digital Academy for Youth - Shale',
      description: 'Intensive training program in coding, graphic design, and digital marketing for the youth of Shale village.',
      longDescription: 'This project aims to break geographic barriers by bringing the latest technology trends directly to Shale, Lipjan. The program includes 12 weeks of mentoring and practical work.',
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
    { id: 'u1', name: 'VRSH Admin', email: 'admin@vizionirinorishales.org', role: UserRole.ADMIN },
  ],
  applications: [],
  news: [
    {
      id: 'n1',
      title: 'New Partnership with Lipjan Municipality',
      content: 'Youth Vision of Shale has signed a memorandum of cooperation for future youth projects in Shale village.',
      datePosted: '2024-03-28',
      category: 'Latest News'
    }
  ],
  staff: [
    {
      id: 's1',
      name: 'Leotrim Pajaziti',
      role: 'Executive Director',
      category: 'Executive Director',
      bio: 'Leader of the organization\'s projects and vision.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's2',
      name: 'Bleriana Kadriolli',
      role: 'Project Assistant',
      category: 'Current Staff',
      bio: 'Support in coordinating and implementing activities.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's3',
      name: 'Dijellëza Selmani',
      role: 'Project Assistant',
      category: 'Current Staff',
      bio: 'Responsible for the smooth running of trainings.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's4',
      name: 'Euresa Karpuzi',
      role: 'Head of Members Assembly',
      category: 'Members Assembly',
      bio: '',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's5',
      name: 'Miranda Karpuzi',
      role: 'Assembly Member',
      category: 'Members Assembly',
      bio: '',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's6',
      name: 'Shkelzen Karpuzi',
      role: 'Board Director',
      category: 'Board of Directors',
      bio: '',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    {
      id: 's7',
      name: 'Burim Shamolli',
      role: 'Board Director',
      category: 'Board of Directors',
      bio: '',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      socials: {}
    },
    { id: 'v1', name: 'Erdona Kadriolli', role: 'Volunteer', category: 'Volunteers', bio: '', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400', socials: {} },
    { id: 'v2', name: 'Erjona Kadriolli', role: 'Volunteer', category: 'Volunteers', bio: '', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', socials: {} },
    { id: 'v3', name: 'Viola Hetemi', role: 'Volunteer', category: 'Volunteers', bio: '', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400', socials: {} }
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
