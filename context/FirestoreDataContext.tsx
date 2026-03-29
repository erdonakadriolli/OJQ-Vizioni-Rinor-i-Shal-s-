
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  getDocs,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db as firestore, handleFirestoreError, OperationType } from '../firebase';
import { Project, NewsItem, StaffMember, Partner, Stat } from '../types';

interface FirestoreData {
  projects: Project[];
  news: NewsItem[];
  staff: StaffMember[];
  partners: Partner[];
  stats: Stat[];
  assets: any[];
  loading: {
    projects: boolean;
    news: boolean;
    staff: boolean;
    partners: boolean;
    stats: boolean;
    assets: boolean;
  };
  error: string | null;
  refreshData: (collectionName: string) => Promise<void>;
}

const FirestoreDataContext = createContext<FirestoreData | undefined>(undefined);

export const useFirestoreData = () => {
  const context = useContext(FirestoreDataContext);
  if (!context) {
    throw new Error('useFirestoreData must be used within a FirestoreDataProvider');
  }
  return context;
};

export const FirestoreDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  
  const [loading, setLoading] = useState({
    projects: true,
    news: true,
    staff: true,
    partners: true,
    stats: true,
    assets: true
  });
  
  const [error, setError] = useState<string | null>(null);

  // Helper to handle snapshot errors
  const onSnapshotError = (err: any, path: string) => {
    if (err.code === 'resource-exhausted' || err.message?.includes('Quota exceeded')) {
      setError('Firebase Quota Exceeded. Some data might not be visible. Please try again tomorrow.');
    } else {
      try {
        handleFirestoreError(err, OperationType.LIST, path);
      } catch (e: any) {
        setError(e.message);
      }
    }
  };

  useEffect(() => {
    // 1. Projects - Real-time might be good for admin, but for public getDocs is fine.
    // However, to keep it simple and centralized, we use onSnapshot but we can optimize.
    const qProjects = query(collection(firestore, 'projects'), orderBy('startDate', 'desc'));
    const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
      setLoading(prev => ({ ...prev, projects: false }));
    }, (err) => onSnapshotError(err, 'projects'));

    // 2. News
    const qNews = query(collection(firestore, 'news'), orderBy('datePosted', 'desc'));
    const unsubscribeNews = onSnapshot(qNews, (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem)));
      setLoading(prev => ({ ...prev, news: false }));
    }, (err) => onSnapshotError(err, 'news'));

    // 3. Staff
    const qStaff = query(collection(firestore, 'staff'));
    const unsubscribeStaff = onSnapshot(qStaff, (snapshot) => {
      setStaff(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember)));
      setLoading(prev => ({ ...prev, staff: false }));
    }, (err) => onSnapshotError(err, 'staff'));

    // 4. Partners - Static enough for getDocs? Let's use onSnapshot for now but centralized.
    const qPartners = query(collection(firestore, 'partners'), orderBy('name'));
    const unsubscribePartners = onSnapshot(qPartners, (snapshot) => {
      setPartners(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner)));
      setLoading(prev => ({ ...prev, partners: false }));
    }, (err) => onSnapshotError(err, 'partners'));

    // 5. Stats
    const qStats = query(collection(firestore, 'stats'), orderBy('label'));
    const unsubscribeStats = onSnapshot(qStats, (snapshot) => {
      setStats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Stat)));
      setLoading(prev => ({ ...prev, stats: false }));
    }, (err) => onSnapshotError(err, 'stats'));

    // 6. Assets
    const qAssets = query(collection(firestore, 'site_assets'));
    const unsubscribeAssets = onSnapshot(qAssets, (snapshot) => {
      setAssets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(prev => ({ ...prev, assets: false }));
    }, (err) => onSnapshotError(err, 'site_assets'));

    return () => {
      unsubscribeProjects();
      unsubscribeNews();
      unsubscribeStaff();
      unsubscribePartners();
      unsubscribeStats();
      unsubscribeAssets();
    };
  }, []);

  const refreshData = async (collectionName: string) => {
    setLoading(prev => ({ ...prev, [collectionName]: true }));
    try {
      const q = query(collection(firestore, collectionName));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      switch(collectionName) {
        case 'projects': setProjects(data as Project[]); break;
        case 'news': setNews(data as NewsItem[]); break;
        case 'staff': setStaff(data as StaffMember[]); break;
        case 'partners': setPartners(data as Partner[]); break;
        case 'stats': setStats(data as Stat[]); break;
        case 'site_assets': setAssets(data); break;
      }
    } catch (err) {
      onSnapshotError(err, collectionName);
    } finally {
      setLoading(prev => ({ ...prev, [collectionName]: false }));
    }
  };

  return (
    <FirestoreDataContext.Provider value={{ 
      projects, news, staff, partners, stats, assets,
      loading, error, refreshData 
    }}>
      {children}
    </FirestoreDataContext.Provider>
  );
};
