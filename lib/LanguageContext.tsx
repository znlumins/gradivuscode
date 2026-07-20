'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DICTIONARIES, Dictionary } from './dictionaries';

interface LanguageContextType {
  lang: string;
  changeLanguage: (lang: string) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState('id');

  // Load preferensi bahasa dari localStorage jika ada
  useEffect(() => {
    const savedLang = localStorage.getItem('gradivus_lang');
    if (savedLang) setLang(savedLang);
  }, []);

  const changeLanguage = (newLang: string) => {
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
