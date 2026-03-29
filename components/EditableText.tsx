import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User } from '../types';

interface EditableTextProps {
  translationKey: string;
  user?: User | null;
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
