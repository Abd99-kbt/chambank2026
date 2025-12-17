'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary, Language, Dictionary } from '@/lib/dictionary';

interface LanguageContextType {
    language: Language;
    t: Dictionary;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('ar');

    useEffect(() => {
        const savedLang = localStorage.getItem('cham-lang') as Language;
        if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('cham-lang', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };

    const toggleLanguage = () => {
        const newLang = language === 'ar' ? 'en' : 'ar';
        handleSetLanguage(newLang);
    };

    const value: LanguageContextType = {
        language,
        t: dictionary[language],
        setLanguage: handleSetLanguage,
        toggleLanguage,
        dir: language === 'ar' ? 'rtl' : 'ltr',
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
