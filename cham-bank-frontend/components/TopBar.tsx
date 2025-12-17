'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Search, User, Monitor, Briefcase } from 'lucide-react';

export default function TopBar() {
    const { t, language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'ar' ? 'en' : 'ar');
    };

    return (
        <div className="bg-cham-navy border-b border-red-900 py-2 hidden md:block text-white transition-all duration-300">
            <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-white font-bold border-b-2 border-cham-gold pb-4 -mb-4 px-2 hover:text-cham-gold transition-colors">
                        {t.individuals || 'خدمات الأفراد'}
                    </Link>
                    <Link href="/corporate" className="text-gray-200 hover:text-cham-gold transition-colors font-medium px-2">
                        {t.corporate || 'خدمات الشركات'}
                    </Link>
                    <Link href="/sume" className="text-gray-200 hover:text-cham-gold transition-colors font-medium px-2">
                        {t.sme || 'المشاريع الصغيرة والمتوسطة'}
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="https://apps.chambank.com/careers/forms/Main" target="_blank" className="flex items-center gap-2 text-gray-200 cursor-pointer hover:text-cham-gold transition-transform hover:-translate-y-0.5">
                        <Briefcase size={16} />
                        <span>{language === 'ar' ? 'التوظيف' : 'Careers'}</span>
                    </a>
                    <span className="text-red-800">|</span>
                    <a href="https://ebank.chambank.com" target="_blank" className="flex items-center gap-2 text-gray-200 cursor-pointer hover:text-cham-gold transition-transform hover:-translate-y-0.5">
                        <Monitor size={16} />
                        <span>E-Bank</span>
                    </a>
                    <span className="text-red-800">|</span>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-gray-200 hover:text-cham-gold transition-colors"
                    >
                        <Globe size={16} />
                        <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                    </button>
                    <span className="text-red-800">|</span>
                    <button className="text-gray-200 hover:text-cham-gold transition-transform hover:scale-110">
                        <Search size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
