
export enum UserRole {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  GUEST = 'GUEST'
}

export enum ProjectStatus {
  Active = 'Active',
  Completed = 'Completed',
  Upcoming = 'Upcoming'
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
  password?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  volunteerCount: number;
  image: string;
  gallery?: string[];
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
  userId?: string;
  userName: string;
  userEmail: string;
  phone: string;
  interests: string[];
  motivation: string;
  projectId?: string;
  projectTitle?: string;
  status: ApplicationStatus;
  dateApplied: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  datePosted: string;
  category: string;
  fileUrl?: string;
  fileName?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  category: string;
  bio: string;
  image: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  iconName: string;
  color: string;
  bg: string;
}
