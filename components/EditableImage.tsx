
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
  className = "",
  alt = "",
  defaultImage = 'https://picsum.photos/seed/vibrant/1920/1080'
}) => {
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-slate-50 ${className}`}>
        <Loader2 className="h-8 w-8 text-brand-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className={`group relative ${className} overflow-hidden`}>
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
  );
};

export default EditableImage;
