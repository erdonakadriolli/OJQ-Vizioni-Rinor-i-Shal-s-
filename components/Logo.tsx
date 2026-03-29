import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Always use the local logo.png
  const logoUrl = '/logo.png';

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
