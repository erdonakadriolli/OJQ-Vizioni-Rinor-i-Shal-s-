
import { Project, Event, User, VolunteerApplication, NewsItem, ProjectStatus, UserRole, ApplicationStatus } from '../types';

const STORAGE_KEY = 'ngo_app_data_v1';

interface DbSchema {
  projects: Project[];
  events: Event[];
  users: User[];
  applications: VolunteerApplication[];
  news: NewsItem[];
}

const initialData: DbSchema = {
  projects: [
    {
      id: 'p1',
      title: 'Clean Water Initiative',
      description: 'Providing sustainable clean water sources to rural communities in East Africa.',
      startDate: '2024-01-15',
      endDate: '2024-12-30',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 12,
      image: 'https://picsum.photos/seed/water/800/600'
    },
    {
      id: 'p2',
      title: 'EduTech for All',
      description: 'Digital literacy program for underprivileged schools in urban areas.',
      startDate: '2024-02-01',
      endDate: '2024-11-20',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 8,
      image: 'https://picsum.photos/seed/edu/800/600'
    },
    {
      id: 'p3',
      title: 'Green City Reforestation',
      description: 'Planting 10,000 trees across major metropolitan parks to improve air quality.',
      startDate: '2023-06-01',
      endDate: '2023-12-31',
      status: ProjectStatus.COMPLETED,
      volunteerCount: 45,
      image: 'https://picsum.photos/seed/tree/800/600'
    }
  ],
  events: [
    {
      id: 'e1',
      title: 'Annual Charity Gala 2024',
      description: 'Our flagship fundraising event featuring guest speakers and silent auction.',
      date: '2024-09-12',
      location: 'City Convention Center',
      image: 'https://picsum.photos/seed/gala/800/600'
    }
  ],
  users: [
    { id: 'u1', name: 'Admin User', email: 'admin@ngo.org', role: UserRole.ADMIN },
    { id: 'u2', name: 'John Doe', email: 'john@volunteer.com', role: UserRole.VOLUNTEER }
  ],
  applications: [
    {
      id: 'a1',
      userId: 'u2',
      userName: 'John Doe',
      userEmail: 'john@volunteer.com',
      projectId: 'p1',
      projectTitle: 'Clean Water Initiative',
      status: ApplicationStatus.PENDING,
      dateApplied: '2024-03-20'
    }
  ],
  news: [
    {
      id: 'n1',
      title: 'Grant Received from Global Foundation',
      content: 'We are thrilled to announce a $50,000 grant for our educational projects.',
      datePosted: '2024-03-15',
      category: 'Funding'
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
