
import React, { useState } from 'react';
import { Pencil, Check, X, Type } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { User, UserRole } from '../types';

interface EditableTextProps {
  translationKey: string;
  user: User | null;
  className?: string;
  multiline?: boolean;
}

const FONTS = [
  { name: 'Standard (Sans)', value: 'font-sans' },
  { name: 'Elegant (Serif)', value: 'font-serif' },
  { name: 'Modern (Space)', value: 'font-space' },
  { name: 'Clean (Outfit)', value: 'font-outfit' },
  { name: 'Classic (Baskerville)', value: 'font-baskerville' },
  { name: 'Luxury (Cormorant)', value: 'font-cormorant' },
  { name: 'Bold (Anton)', value: 'font-anton' },
  { name: 'Technical (Mono)', value: 'font-mono' },
  { name: 'Strong (Montserrat)', value: 'font-montserrat' },
];

const EditableText: React.FC<EditableTextProps> = ({ 
  translationKey, 
  user, 
  className = '', 
  multiline = false 
}) => {
  const { t, getFont, updateTranslation, updateFont } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(t(translationKey));
  const [selectedFont, setSelectedFont] = useState(getFont(translationKey));
  const isAdmin = user?.role === UserRole.ADMIN;

  const handleSave = () => {
    updateTranslation(translationKey, value);
    updateFont(translationKey, selectedFont);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(t(translationKey));
    setSelectedFont(getFont(translationKey));
    setIsEditing(false);
  };

  const currentFontClass = getFont(translationKey);

  if (!isAdmin) {
    return <span className={`${currentFontClass} ${className}`}>{t(translationKey)}</span>;
  }

  if (isEditing) {
    return (
      <div className={`relative group inline-block w-full ${className}`}>
        <div className="mb-2 flex items-center space-x-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <Type className="h-3 w-3 text-brand-pink" />
          <select 
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            className="text-[10px] font-bold uppercase tracking-widest bg-transparent outline-none cursor-pointer text-slate-600"
          >
            {FONTS.map(f => (
              <option key={f.value} value={f.value}>{f.name}</option>
            ))}
          </select>
        </div>
        
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full p-3 border-2 border-brand-pink rounded-xl bg-white text-brand-dark focus:outline-none min-h-[120px] shadow-inner ${selectedFont}`}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full p-3 border-2 border-brand-pink rounded-xl bg-white text-brand-dark focus:outline-none shadow-inner ${selectedFont}`}
            autoFocus
          />
        )}
        
        <div className="absolute -top-12 right-0 flex space-x-2">
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg"
          >
            <Check className="h-3 w-3" />
            <span>Ruaj</span>
          </button>
          <button 
            onClick={handleCancel}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg"
          >
            <X className="h-3 w-3" />
            <span>Anulo</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <span className={`relative group inline-block ${currentFontClass} ${className}`}>
      {t(translationKey)}
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 bg-brand-pink text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 z-10"
      >
        <Pencil className="h-3 w-3" />
      </button>
    </span>
  );
};

export default EditableText;
