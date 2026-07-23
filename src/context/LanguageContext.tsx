import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '../lib/types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  isMr: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('sgmm_lang');
    return (saved as Language) || 'mr';
  });

  useEffect(() => {
    localStorage.setItem('sgmm_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);
  const toggle = () => setLangState((prev: Language) => (prev === 'mr' ? 'en' : 'mr'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, isMr: lang === 'mr' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
