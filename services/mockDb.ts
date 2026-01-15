
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
      title: 'Youth Leadership Academy',
      description: 'Empowering the next generation of leaders in the Shala region through workshops on civic engagement, public speaking, and project management.',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 15,
      image: 'https://images.unsplash.com/photo-1523240715630-9978613ff983?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p2',
      title: 'Green Shala Community Cleanup',
      description: 'A regional initiative to preserve the natural beauty of Shala valley. Organizing weekly cleanup sessions and waste management education.',
      startDate: '2024-03-01',
      endDate: '2024-10-20',
      status: ProjectStatus.ACTIVE,
      volunteerCount: 34,
      image: 'https://images.unsplash.com/photo-1595273670150-db0a3d39d0c5?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p3',
      title: 'Cultural Heritage Festival',
      description: 'Celebrating the unique traditions of Shala through music, dance, and craft exhibitions. Connecting youth with their regional identity.',
      startDate: '2023-08-01',
      endDate: '2023-08-20',
      status: ProjectStatus.COMPLETED,
      volunteerCount: 50,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800'
    }
  ],
  events: [
    {
      id: 'e1',
      title: 'Networking Meetup for Volunteers',
      description: 'Join us for an evening of connection and sharing experiences with fellow volunteers.',
      date: '2024-05-15',
      location: 'Community Hub, Shala',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800'
    }
  ],
  users: [
    { id: 'u1', name: 'Admin Vizioni', email: 'admin@vizionirinorishales.org', role: UserRole.ADMIN },
    { id: 'u2', name: 'Volunteer User', email: 'volunteer@vizionirinorishales.org', role: UserRole.VOLUNTEER }
  ],
  applications: [
    {
      id: 'a1',
      userId: 'u2',
      userName: 'Volunteer User',
      userEmail: 'volunteer@vizionirinorishales.org',
      projectId: 'p1',
      projectTitle: 'Youth Leadership Academy',
      status: ApplicationStatus.PENDING,
      dateApplied: '2024-03-22'
    }
  ],
  news: [
    {
      id: 'n1',
      title: 'New Partnership with Regional Youth Council',
      content: 'Vizioni Rinor i Shales is proud to announce a new collaboration to boost regional youth programs.',
      datePosted: '2024-03-20',
      category: 'Announcements'
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
