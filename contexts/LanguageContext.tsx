import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, ...args: any[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    return storedLang || 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
    }
  }, [language]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const t = (key: string, ...args: any[]) => {
    let translation = (translations as any)[language]?.[key] || (translations as any)['en'][key] || key;
    if (args.length > 0) {
      args.forEach((arg, index) => {
        const placeholder = new RegExp(`\\{${index}\\}`, 'g');
        translation = translation.replace(placeholder, String(arg));
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
