
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-24 h-24 md:w-32 md:h-32'
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-4 h-4 md:w-6 md:h-6'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizes[size]} group ${className}`}>
      <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-slate-100 group-hover:border-transparent transition-all duration-500 rotate-45 group-hover:rotate-90"></div>
      <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-transparent transition-all duration-700 -rotate-12 group-hover:rotate-45"
           style={{ borderColor: 'rgb(225, 29, 116) rgb(243, 146, 55) rgb(149, 208, 58) rgb(0, 173, 181)' }}></div>
      <div className={`${dotSizes[size]} bg-brand-dark rounded-full shadow-lg group-hover:scale-125 transition-transform`}></div>
    </div>
  );
};

export default Logo;
