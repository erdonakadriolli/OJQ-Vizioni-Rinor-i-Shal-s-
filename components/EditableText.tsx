
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
  className = "" 
}) => {
  const { t } = useLanguage();

  return (
    <span className={className}>
      {t(translationKey)}
    </span>
  );
};

export default EditableText;
