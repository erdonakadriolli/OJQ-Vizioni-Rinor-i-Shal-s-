
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Project, NewsItem, StaffMember, VolunteerApplication, Partner, Stat } from '../types';

interface FirestoreContextType {
  staff: StaffMember[];
  projects: Project[];
  news: NewsItem[];
  partners: Partner[];
  stats: Stat[];
  applications: VolunteerApplication[];
  siteAssets: any[];
  siteContent: any[];
  isLoading: boolean;
}

const FirestoreContext = createContext<FirestoreContextType | undefined>(undefined);

export const FirestoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [siteAssets, setSiteAssets] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Centralized listeners to reduce Firestore read quota consumption
    // These listeners will run once for the entire application session
    
    const qStaff = query(collection(db, 'staff'));
    const unsubscribeStaff = onSnapshot(qStaff, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
      console.log('Firestore Staff loaded:', data.length);
      setStaff(data);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'staff');
      }
    });

    const qProjects = query(collection(db, 'projects'));
    const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      // Sort in memory to avoid excluding docs with missing fields
      data.sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));
      console.log('Firestore Projects loaded:', data.length);
      setProjects(data);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'projects');
      }
    });

    const qNews = query(collection(db, 'news'));
    const unsubscribeNews = onSnapshot(qNews, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      data.sort((a, b) => (b.datePosted || '').localeCompare(a.datePosted || ''));
      console.log('Firestore News loaded:', data.length);
      setNews(data);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'news');
      }
    });

    const qPartners = query(collection(db, 'partners'));
    const unsubscribePartners = onSnapshot(qPartners, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner));
      data.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      console.log('Firestore Partners loaded:', data.length);
      setPartners(data);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'partners');
      }
    });

    const qStats = query(collection(db, 'stats'));
    const unsubscribeStats = onSnapshot(qStats, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Stat));
      console.log('Firestore Stats loaded:', data.length);
      setStats(data);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'stats');
      }
    });

    const qApps = query(collection(db, 'applications'));
    const unsubscribeApps = onSnapshot(qApps, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VolunteerApplication));
      data.sort((a, b) => (b.dateApplied || '').localeCompare(a.dateApplied || ''));
      console.log('Firestore Applications loaded:', data.length);
      setApplications(data);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'applications');
      }
    });

    const qAssets = query(collection(db, 'site_assets'));
    const unsubscribeAssets = onSnapshot(qAssets, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Firestore Assets loaded:', data.length);
      setSiteAssets(data);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'site_assets');
      }
    });

    const qContent = query(collection(db, 'site_content'));
    const unsubscribeContent = onSnapshot(qContent, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Firestore Content loaded:', data.length);
      setSiteContent(data);
      setIsLoading(false);
    }, (err) => {
      if (!err.message.includes('quota')) {
        handleFirestoreError(err, OperationType.LIST, 'site_content');
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribeStaff();
      unsubscribeProjects();
      unsubscribeNews();
      unsubscribePartners();
      unsubscribeStats();
      unsubscribeApps();
      unsubscribeAssets();
      unsubscribeContent();
    };
  }, []);

  return (
    <FirestoreContext.Provider value={{ staff, projects, news, partners, stats, applications, siteAssets, siteContent, isLoading }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  const context = useContext(FirestoreContext);
  if (context === undefined) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }
  return context;
};
