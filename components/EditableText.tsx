
import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { User, UserRole } from '../types';

interface EditableTextProps {
  translationKey: string;
  user: User | null;
  className?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  translationKey, 
  user, 
  className = '', 
  multiline = false 
}) => {
  const { t, updateTranslation } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(t(translationKey));
  const isAdmin = user?.role === UserRole.ADMIN;

  const handleSave = () => {
    updateTranslation(translationKey, value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(t(translationKey));
    setIsEditing(false);
  };

  if (!isAdmin) {
    return <span className={className}>{t(translationKey)}</span>;
  }

  if (isEditing) {
    return (
      <div className={`relative group inline-block w-full ${className}`}>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border-2 border-brand-pink rounded-lg bg-white text-brand-dark focus:outline-none min-h-[100px]"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border-2 border-brand-pink rounded-lg bg-white text-brand-dark focus:outline-none"
            autoFocus
          />
        )}
        <div className="absolute -top-10 right-0 flex space-x-2">
          <button 
            onClick={handleSave}
            className="p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            <Check className="h-4 w-4" />
          </button>
          <button 
            onClick={handleCancel}
            className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <span className={`relative group inline-block ${className}`}>
      {t(translationKey)}
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 bg-brand-pink text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
      >
        <Pencil className="h-3 w-3" />
      </button>
    </span>
  );
};

export default EditableText;
