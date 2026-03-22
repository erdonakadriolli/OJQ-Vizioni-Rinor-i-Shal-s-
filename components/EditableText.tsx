
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, UserRole } from '../types';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  translationKey: string;
  user: User | null;
  multiline?: boolean;
  className?: string;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  translationKey, 
  user, 
  multiline = false,
  className = "" 
}) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(t(translationKey));
  const isAdmin = user?.role === UserRole.ADMIN;

  const handleSave = () => {
    // In a real app, we would save this to a database or update the translation context
    // For now, we'll just update the local state
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(t(translationKey));
    setIsEditing(false);
  };

  if (isEditing && isAdmin) {
    return (
      <div className={`relative inline-block w-full ${className}`}>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border border-brand-pink rounded-lg bg-white text-brand-dark focus:ring-2 focus:ring-brand-pink outline-none min-h-[100px]"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border border-brand-pink rounded-lg bg-white text-brand-dark focus:ring-2 focus:ring-brand-pink outline-none"
            autoFocus
          />
        )}
        <div className="absolute right-2 top-2 flex space-x-1">
          <button 
            onClick={handleSave}
            className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <Check className="h-3 w-3" />
          </button>
          <button 
            onClick={handleCancel}
            className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <span className={`group relative ${isAdmin ? 'cursor-pointer hover:outline hover:outline-1 hover:outline-brand-pink/30 hover:rounded px-1 -mx-1' : ''} ${className}`}>
      {t(translationKey)}
      {isAdmin && (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 bg-brand-pink text-white rounded-full transition-all hover:scale-110"
        >
          <Edit2 className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default EditableText;
