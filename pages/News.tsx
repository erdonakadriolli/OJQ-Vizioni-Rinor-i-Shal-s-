
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { NewsItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Newspaper, Tv, FileText, Download, ExternalLink, Search, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { t, language } = useLanguage();

  useEffect(() => {
    const newsQuery = query(collection(db, 'news'), orderBy('datePosted', 'desc'));
    const unsubscribe = onSnapshot(newsQuery, (snapshot) => {
      let items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      
      if (category) {
        const mapping: Record<string, string[]> = {
          'latest': ['Latest News', 'Lajmet e fundit'],
          'media': ['Media'],
          'reports': ['Reports', 'Raportet']
        };
        const dbCategories = mapping[category];
        if (dbCategories) {
          items = items.filter(n => dbCategories.includes(n.category));
        }
      }
      setNews(items);
    });

    return () => unsubscribe();
  }, [category, language]);

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (item: NewsItem) => {
    if (!item.fileUrl) return;
    
    if (item.fileUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = item.fileUrl;
      link.download = item.fileName || 'vrsh-publikim.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(item.fileUrl, '_blank');
    }
  };

  const getTitle = () => {
    switch (category) {
      case 'media': return t('news.title.media');
      case 'latest': return t('news.title.latest');
      case 'reports': return t('news.title.reports');
      default: return t('news.title.all');
    }
  };

  const getIcon = (cat: string) => {
    if (cat === 'Media') return <Tv className="h-6 w-6 text-brand-orange" />;
    if (cat === 'Reports' || cat === 'Raportet') return <FileText className="h-6 w-6 text-brand-cyan" />;
    return <Newspaper className="h-6 w-6 text-brand-pink" />;
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-brand-pink tracking-[0.3em] block">{t('nav.news')}</span>
            <h1 className="text-5xl font-black text-brand-dark uppercase tracking-tighter leading-none">{getTitle()}</h1>
          </div>
          
          <div className="relative group max-w-xs w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 h-4 w-4 group-focus-within:text-brand-pink transition-colors" />
            <input 
              type="text" 
              placeholder={language === 'AL' ? "Kërko..." : "Search..."}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-3xl text-sm font-bold outline-none focus:ring-2 focus:ring-brand-pink shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className="bg-white p-20 rounded-[3.5rem] text-center border border-slate-100 shadow-sm animate-in fade-in">
            <Newspaper className="h-16 w-16 text-slate-100 mx-auto mb-6" />
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">{t('news.empty')}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white p-8 md:p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col md:flex-row md:items-start gap-8 group animate-in slide-in-from-bottom-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark group-hover:text-white transition-all duration-500">
                  {getIcon(item.category)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar className="h-3 w-3 mr-2" />
                      {item.datePosted}
                    </span>
                    <span className="px-3 py-1 bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-500 rounded-full">{item.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-brand-dark uppercase leading-tight mb-3 group-hover:text-brand-pink transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base italic line-clamp-2">
                    {item.content}
                  </p>
                  
                  {item.fileUrl && (
                    <div className="flex gap-4 mt-8">
                      {item.category === 'Reports' ? (
                        <button 
                          onClick={() => handleDownload(item)}
                          className="flex items-center space-x-3 bg-brand-cyan text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-cyan/20"
                        >
                          <Download className="h-4 w-4" />
                          <span>{t('news.download')}</span>
                        </button>
                      ) : (
                        <a 
                          href={item.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-3 bg-brand-orange text-white px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-brand-dark transition-all shadow-xl shadow-brand-orange/20"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>{t('news.source')}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
