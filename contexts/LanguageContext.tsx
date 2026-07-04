
import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    return storedLang || 'en';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
    }
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key, ...args) => {
    let translation = translations[language]?.[key] || translations['en'][key] || key;
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
