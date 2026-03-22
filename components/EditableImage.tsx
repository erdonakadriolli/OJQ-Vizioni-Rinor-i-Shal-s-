
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Edit2, Check, X, Upload } from 'lucide-react';

interface EditableImageProps {
  translationKey: string;
  user: User | null;
  className?: string;
  alt?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ 
  translationKey, 
  user, 
  className = "",
  alt = "" 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/seed/vibrant/1920/1080'); // Fallback image
  const isAdmin = user?.role === UserRole.ADMIN;

  const handleSave = () => {
    // In a real app, we would save this to a database
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isEditing && isAdmin) {
    return (
      <div className={`relative ${className} bg-slate-100 flex flex-col items-center justify-center p-8 border-2 border-dashed border-brand-pink rounded-[2.5rem]`}>
        <div className="text-center space-y-4">
          <Upload className="h-12 w-12 text-brand-pink mx-auto" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Ngarko imazh të ri</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="hidden" 
            id="image-upload"
          />
          <label 
            htmlFor="image-upload"
            className="inline-block px-6 py-3 bg-brand-pink text-white rounded-xl font-black uppercase text-[10px] tracking-widest cursor-pointer hover:bg-brand-dark transition-all"
          >
            Zgjidh skedarin
          </label>
        </div>
        <div className="absolute right-4 top-4 flex space-x-2">
          <button 
            onClick={handleSave}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg"
          >
            <Check className="h-4 w-4" />
          </button>
          <button 
            onClick={handleCancel}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className} overflow-hidden`}>
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      {isAdmin && (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 p-3 bg-brand-pink text-white rounded-full transition-all hover:scale-110 shadow-xl"
        >
          <Edit2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default EditableImage;
