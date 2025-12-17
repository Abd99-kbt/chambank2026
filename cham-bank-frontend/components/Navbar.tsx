'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, Search, Monitor, Briefcase } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { key: 'home', href: '/' },
        { key: 'nav_products', href: '/products' }, // Using general products route
        { key: 'nav_services', href: '/services' },
        { key: 'branches', href: '/branches' },
        { key: 'news', href: '/news' },
        { key: 'contact', href: '/contact' },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-2'
                : 'bg-white py-3 border-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <Image
                                src="/images/logo.svg"
                                alt="Cham Bank Logo"
                                fill
                                className="object-contain animate-float"
                            />
                            {/* Pulse ring on hover */}
                            <div className="absolute inset-0 rounded-full bg-cham-red/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-cham-red-dark font-bold text-xl md:text-2xl leading-tight tracking-tight group-hover:text-cham-red transition-colors">
                                {language === 'ar' ? 'بنك الشام' : 'Cham Bank'}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {/* Mega Menu Items */}
                        <div className="flex items-center bg-gray-50 rounded-full px-6 py-2 border border-gray-100 shadow-inner">
                            {/* About Dropdown */}
                            <div className="relative group px-4">
                                <button className="flex items-center gap-1 text-gray-700 hover:text-cham-red font-bold text-base transition-colors py-2">
                                    {t.nav_about || 'عن البنك'}
                                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                <div className="absolute top-full right-[-50px] w-64 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <Link href="/about" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium mb-1">{t.nav_about_snapshot || 'لمحة عن البنك'}</Link>
                                    <Link href="/about/founders" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium mb-1">{t.nav_about_founders || 'المؤسسون'}</Link>
                                    <Link href="/about/board" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium mb-1">{t.nav_about_board || 'مجلس الإدارة'}</Link>
                                    <Link href="/about/sharia" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium mb-1">{t.nav_about_sharia || 'هيئة الرقابة الشرعية'}</Link>
                                    <Link href="/investor-relations" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium">{t.nav_about_reports || 'التقارير المالية'}</Link>
                                </div>
                            </div>

                            {/* Products Dropdown */}
                            <div className="relative group px-4 border-r border-gray-200">
                                <button className="flex items-center gap-1 text-gray-700 hover:text-cham-red font-bold text-base transition-colors py-2">
                                    {t.nav_products || 'المنتجات'}
                                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                <div className="absolute top-full right-[-50px] w-64 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <Link href="/accounts" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium mb-1">{t.nav_products_accounts || 'الحسابات'}</Link>
                                    <Link href="/finance" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium mb-1">{t.nav_products_finance || 'التمويل'}</Link>
                                    <Link href="/corporate" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium mb-1">{t.nav_products_corporate || 'خدمات الشركات'}</Link>
                                    <Link href="/cards" className="block px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-cham-red transition-all font-medium">{t.products || 'البطاقات'}</Link>
                                </div>
                            </div>

                            {/* Standard Links */}
                            <Link href="/services" className="px-4 text-gray-700 hover:text-cham-red font-bold text-base transition-colors border-r border-gray-200">
                                {t.nav_services || 'الخدمات'}
                            </Link>

                            <Link href="/news" className="px-4 text-gray-700 hover:text-cham-red font-bold text-base transition-colors border-r border-gray-200">
                                {t.news || 'الأخبار'}
                            </Link>
                        </div>
                    </div>


                    {/* Utils */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            href="https://apps.chambank.com/careers/forms/Main"
                            target="_blank"
                            className="flex items-center gap-2 text-cham-navy hover:text-cham-red font-medium transition-colors bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                        >
                            <Briefcase size={18} />
                            <span>{language === 'ar' ? 'التوظيف' : 'Careers'}</span>
                        </Link>

                        <button
                            onClick={() => toggleLanguage()}
                            className="flex items-center gap-2 text-cham-navy hover:text-cham-red font-medium transition-colors bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
                        >
                            <Globe size={18} />
                            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                        </button>

                        <Link
                            href="https://ebank.chambank.com"
                            target="_blank"
                            className="flex items-center gap-2 bg-cham-red hover:bg-cham-red-dark text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-900/20 hover:shadow-red-900/40 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <Monitor size={18} />
                            <span>{language === 'ar' ? 'E-Bank' : 'E-Bank'}</span>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-cham-navy p-2 bg-gray-50 rounded-lg"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col gap-4">
                        <Link href="/about" className="text-gray-800 font-bold py-3 border-b border-gray-50" onClick={() => setIsOpen(false)}>{t.nav_about}</Link>
                        <Link href="/products" className="text-gray-800 font-bold py-3 border-b border-gray-50" onClick={() => setIsOpen(false)}>{t.nav_products}</Link>
                        <Link href="/services" className="text-gray-800 font-bold py-3 border-b border-gray-50" onClick={() => setIsOpen(false)}>{t.nav_services}</Link>
                        <Link href="/news" className="text-gray-800 font-bold py-3 border-b border-gray-50" onClick={() => setIsOpen(false)}>{t.news}</Link>
                        <Link href="/contact" className="text-gray-800 font-bold py-3 border-b border-gray-50" onClick={() => setIsOpen(false)}>{t.contact}</Link>

                        <div className="flex flex-col gap-3 mt-4">
                            <Link href="https://apps.chambank.com/careers/forms/Main" className="bg-gray-50 text-gray-800 text-center py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-gray-100">
                                <Briefcase size={20} />
                                {language === 'ar' ? 'التوظيف' : 'Careers'}
                            </Link>
                            <Link href="https://ebank.chambank.com" className="bg-cham-red text-white text-center py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                <Monitor size={20} />
                                {language === 'ar' ? 'E-Bank' : 'E-Bank'}
                            </Link>
                            <button onClick={toggleLanguage} className="bg-gray-100 text-gray-800 py-3 rounded-xl font-bold">
                                {language === 'ar' ? 'English' : 'العربية'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
