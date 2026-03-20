
import React, { useState, useRef } from 'react';
import { Pencil, Check, X, Image as ImageIcon, Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { User, UserRole } from '../types';

interface EditableImageProps {
  translationKey: string;
  user: User | null;
  className?: string;
  alt?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ 
  translationKey, 
  user, 
  className = '', 
  alt = '' 
}) => {
  const { t, updateTranslation } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(t(translationKey));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isAdmin = user?.role === UserRole.ADMIN;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Imazhi është shumë i madh (Max 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateTranslation(translationKey, previewUrl);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreviewUrl(t(translationKey));
    setIsEditing(false);
  };

  if (!isAdmin) {
    return (
      <img 
        src={t(translationKey)} 
        alt={alt} 
        className={className} 
        referrerPolicy="no-referrer" 
      />
    );
  }

  if (isEditing) {
    return (
      <div className={`relative group ${className} bg-slate-100 flex flex-col items-center justify-center p-6 border-2 border-dashed border-brand-pink rounded-[2.5rem] overflow-hidden`}>
        <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-3 px-6 py-3 bg-brand-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-pink transition-all shadow-lg"
            >
              <Upload className="h-4 w-4" />
              <span>Zgjidh Foto</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*"
            />
            <p className="mt-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Max 2MB (JPG, PNG)</p>
          </div>

          <div className="flex space-x-3">
            <button 
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-lg"
            >
              <Check className="h-4 w-4" />
              <span>Ruaj</span>
            </button>
            <button 
              onClick={handleCancel}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg"
            >
              <X className="h-4 w-4" />
              <span>Anulo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <img 
        src={t(translationKey)} 
        alt={alt} 
        className="w-full h-full object-cover" 
        referrerPolicy="no-referrer" 
      />
      <div className="absolute inset-0 bg-brand-pink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <button 
          onClick={() => setIsEditing(true)}
          className="pointer-events-auto p-4 bg-white text-brand-pink rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-all hover:bg-brand-pink hover:text-white"
        >
          <Pencil className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default EditableImage;
