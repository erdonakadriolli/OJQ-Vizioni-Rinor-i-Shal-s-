
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
  multiline = false,
  className = "" 
}) => {
  const { t } = useLanguage();

  if (multiline) {
    return (
      <div className={`${className} whitespace-pre-wrap`}>
        {t(translationKey)}
      </div>
    );
  }

  return (
    <span className={className}>
      {t(translationKey)}
    </span>
  );
};

export default EditableText;
