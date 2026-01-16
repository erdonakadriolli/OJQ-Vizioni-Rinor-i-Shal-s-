
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDb } from '../services/mockDb';
import { NewsItem } from '../types';
import { Calendar, Tag, ArrowRight, Newspaper, Tv, FileText } from 'lucide-react';

const News: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const db = getDb();
    let items = db.news || [];
    
    if (category) {
      const mapping: Record<string, string> = {
        'latest': 'Lajmet e fundit',
        'media': 'Media',
        'reports': 'Raportet'
      };
      const dbCategory = mapping[category];
      if (dbCategory) {
        items = items.filter(n => n.category === dbCategory);
      }
    }
    setNews(items);
  }, [category]);

  const getTitle = () => {
    switch (category) {
      case 'media': return 'Media & Intervista';
      case 'latest': return 'Lajmet e Fundit';
      case 'reports': return 'Raportet & Publikimet';
      default: return 'Të gjitha Lajmet';
    }
  };

  const getIcon = (cat: string) => {
    if (cat === 'Media') return <Tv className="h-5 w-5 text-brand-orange" />;
    if (cat === 'Raportet') return <FileText className="h-5 w-5 text-brand-cyan" />;
    return <Newspaper className="h-5 w-5 text-brand-pink" />;
  };

  return (
    <div className="py-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-black text-brand-dark uppercase tracking-tighter mb-4">{getTitle()}</h1>
          <div className="h-1.5 w-24 bg-brand-pink rounded-full"></div>
        </div>

        {news.length === 0 ? (
          <div className="bg-white p-20 rounded-[2.5rem] text-center border border-slate-100">
            <p className="text-slate-400 font-bold uppercase tracking-widest">Nuk u gjet asnjë lajm në këtë kategori.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {news.map((item) => (
              <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col md:flex-row md:items-center gap-8 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-pink group-hover:text-white transition-colors">
                  {getIcon(item.category)}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Calendar className="h-3 w-3 mr-1" />
                      {item.datePosted}
                    </span>
                    <span className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-500 uppercase tracking-widest rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark uppercase leading-tight mb-2 group-hover:text-brand-pink transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-medium line-clamp-2">
                    {item.content}
                  </p>
                </div>
                <button className="flex items-center justify-center w-12 h-12 bg-slate-50 rounded-full group-hover:bg-brand-dark group-hover:text-white transition-all">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
