import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTranslations, Translations } from "@/lib/i18n";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "fa";
  });

  const [t, setT] = useState<Translations>(getTranslations(language));

  useEffect(() => {
    localStorage.setItem("language", language);
    setT(getTranslations(language));
    
    // Set document direction based on language
    if (language === "fa") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "fa";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    }
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
