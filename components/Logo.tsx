import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const [logoUrl, setLogoUrl] = useState<string>('/logo.png');

  useEffect(() => {
    const q = query(
      collection(db, 'site_assets'),
      where('key', '==', 'site_logo'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        if (data.url) {
          setLogoUrl(data.url);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Responsive height classes based on the size prop
  const sizeClasses = {
    sm: 'h-8 sm:h-10',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-20',
  };

  return (
    <div className={`inline-block transition-all duration-300 hover:scale-105 hover:rotate-1 active:scale-95 cursor-pointer ${className}`}>
      <img
        src={logoUrl}
        alt="Vizioni Logo"
        className={`${sizeClasses[size]} w-auto object-contain`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to a placeholder if logo.png is not found during development
          const target = e.target as HTMLImageElement;
          if (!target.src.includes('picsum.photos') && !target.src.includes('firebasestorage')) {
            target.src = 'https://picsum.photos/seed/vizioni-logo/400/120';
          }
        }}
      />
    </div>
  );
};

export default Logo;
