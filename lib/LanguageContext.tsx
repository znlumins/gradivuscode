'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DICTIONARIES, Dictionary, Language } from './dictionaries';

interface LanguageContextType {
  lang: Language;
  changeLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('id');

  // Load preferensi bahasa dari localStorage jika ada
  useEffect(() => {
    const savedLang = localStorage.getItem('gradivus_lang') as Language;
    if (savedLang === 'id' || savedLang === 'en') setLang(savedLang);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('gradivus_lang', newLang);
  };

  const t = DICTIONARIES[lang] || DICTIONARIES['id']; // Fallback

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
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
