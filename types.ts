
export enum UserRole {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  GUEST = 'GUEST'
}

export enum ProjectStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  UPCOMING = 'Upcoming'
}

export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  volunteerCount: number;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export interface VolunteerApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  projectId: string;
  projectTitle: string;
  status: ApplicationStatus;
  dateApplied: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  datePosted: string;
  category: string;
}
