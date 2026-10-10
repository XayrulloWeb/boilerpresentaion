import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('smart_boiler_lang') || 'RU';
    }
    return 'RU';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('smart_boiler_lang', newLang);
    }
  };

  const t = translations[lang] || translations.RU;

  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
