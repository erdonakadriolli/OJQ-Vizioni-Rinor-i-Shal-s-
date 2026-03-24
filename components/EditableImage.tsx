
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { Edit2, Check, X, Upload, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

interface EditableImageProps {
  translationKey: string;
  user: User | null;
  className?: string;
  alt?: string;
  defaultImage?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ 
  translationKey, 
  user, 
  className = "",
  alt = "",
  defaultImage = 'https://picsum.photos/seed/vibrant/1920/1080'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const isAdmin = user?.role === UserRole.ADMIN;

  useEffect(() => {
    const assetRef = doc(db, 'site_assets', translationKey);
    const unsubscribe = onSnapshot(assetRef, (docSnap) => {
      if (docSnap.exists()) {
        setImageUrl(docSnap.data().url);
      } else {
        setImageUrl(defaultImage);
      }
      setIsLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, `site_assets/${translationKey}`);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [translationKey, defaultImage]);

  const handleSave = async () => {
    if (!tempImageUrl) return;
    
    setIsSaving(true);
    try {
      const assetRef = doc(db, 'site_assets', translationKey);
      await setDoc(assetRef, {
        url: tempImageUrl,
        type: 'image'
      });
      setIsEditing(false);
      setTempImageUrl(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `site_assets/${translationKey}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempImageUrl(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-slate-50 ${className}`}>
        <Loader2 className="h-8 w-8 text-brand-pink animate-spin" />
      </div>
    );
  }

  if (isEditing && isAdmin) {
    return (
      <div className={`relative ${className} bg-slate-100 flex flex-col items-center justify-center p-8 border-2 border-dashed border-brand-pink rounded-[2.5rem]`}>
        {tempImageUrl ? (
          <img src={tempImageUrl} className="w-full h-full object-cover rounded-2xl opacity-50" alt="Preview" />
        ) : (
          <div className="text-center space-y-4">
            <Upload className="h-12 w-12 text-brand-pink mx-auto" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Ngarko imazh të ri</p>
          </div>
        )}
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="hidden" 
          id={`image-upload-${translationKey}`}
        />
        <label 
          htmlFor={`image-upload-${translationKey}`}
          className="mt-4 inline-block px-6 py-3 bg-brand-pink text-white rounded-xl font-black uppercase text-[10px] tracking-widest cursor-pointer hover:bg-brand-dark transition-all"
        >
          {tempImageUrl ? 'Ndrysho skedarin' : 'Zgjidh skedarin'}
        </label>

        <div className="absolute right-4 top-4 flex space-x-2">
          {tempImageUrl && (
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            </button>
          )}
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
