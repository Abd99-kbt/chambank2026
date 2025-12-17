'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
    const { t, language } = useLanguage();

    return (
        <footer className="relative bg-white text-gray-900 pt-20 pb-10 overflow-hidden border-t border-gray-200">
            {/* Islamic Pattern Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundSize: '60px 60px', backgroundImage: 'radial-gradient(circle, #8B0000 1px, transparent 1px)' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-16 h-16 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
                                <Image src="/images/logo.svg" alt="Cham Bank" fill className="object-contain p-1" />
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl text-gray-900">{t.home}</h3>
                                <p className="text-cham-gold text-sm tracking-wider">{language === 'ar' ? 'بنك إسلامي' : 'Islamic Bank'}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                            {t.footer_about}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-cham-red hover:text-white transition-all hover:-translate-y-1"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-cham-red hover:text-white transition-all hover:-translate-y-1"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-cham-red hover:text-white transition-all hover:-translate-y-1"><Linkedin size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-cham-red hover:text-white transition-all hover:-translate-y-1"><Instagram size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Link 1 */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-cham-red border-b border-cham-red/20 pb-2 inline-block">{t.footer_quick_links || 'Quick Links'}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-gray-600 hover:text-cham-red hover:translate-x-[-5px] transition-all flex items-center gap-2"><ArrowRight size={14} className="text-cham-red" /> {t.about}</Link></li>
                            <li><a href="https://apps.chambank.com/careers/forms/Main" target="_blank" className="text-gray-600 hover:text-cham-red hover:translate-x-[-5px] transition-all flex items-center gap-2"><ArrowRight size={14} className="text-cham-red" /> {language === 'ar' ? 'الوظائف' : 'Careers'}</a></li>
                        </ul>
                    </div>

                    {/* Quick Link 2 */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-cham-red border-b border-cham-red/20 pb-2 inline-block">{t.footer_products || 'Products'}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/accounts" className="text-gray-600 hover:text-cham-red hover:translate-x-[-5px] transition-all flex items-center gap-2"><ArrowRight size={14} className="text-cham-red" /> {t.nav_products_accounts}</Link></li>
                            <li><Link href="/finance" className="text-gray-600 hover:text-cham-red hover:translate-x-[-5px] transition-all flex items-center gap-2"><ArrowRight size={14} className="text-cham-red" /> {t.nav_products_finance}</Link></li>
                            <li><Link href="/cards" className="text-gray-600 hover:text-cham-red hover:translate-x-[-5px] transition-all flex items-center gap-2"><ArrowRight size={14} className="text-cham-red" /> {t.nav_products_cards}</Link></li>
                            <li><Link href="/services" className="text-gray-600 hover:text-cham-red hover:translate-x-[-5px] transition-all flex items-center gap-2"><ArrowRight size={14} className="text-cham-red" /> {t.services}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-cham-red border-b border-cham-red/20 pb-2 inline-block">{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="bg-red-50 p-2 rounded-lg text-cham-red"><MapPin size={20} /></div>
                                <div>
                                    <span className="block text-gray-900 font-bold text-sm">{language === 'ar' ? 'الإدارة العامة' : 'Headquarters'}</span>
                                    <span className="text-gray-600 text-sm">{language === 'ar' ? 'دمشق، سورية - تنظيم كفرسوسة' : 'Damascus, Syria - Kafarsouseh'}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-red-50 p-2 rounded-lg text-cham-red"><Phone size={20} /></div>
                                <div>
                                    <span className="block text-gray-900 font-bold text-sm">{language === 'ar' ? 'هاتف' : 'Phone'}</span>
                                    <span className="text-gray-600 text-sm dir-ltr">+963 11 9392</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-red-50 p-2 rounded-lg text-cham-red"><Mail size={20} /></div>
                                <div>
                                    <span className="block text-gray-900 font-bold text-sm">{language === 'ar' ? 'بريد إلكتروني' : 'Email'}</span>
                                    <a href="mailto:info@chambank.com" className="text-gray-600 text-sm hover:text-cham-red">info@chambank.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} {language === 'ar' ? 'بنك الشام الإسلامي. جميع الحقوق محفوظة.' : 'Cham Bank Islamic. All Rights Reserved.'}
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-cham-red transition-colors">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link>
                        <Link href="/terms" className="hover:text-cham-red transition-colors">{language === 'ar' ? 'شروط الاستخدام' : 'Terms of Use'}</Link>
                        <Link href="/security" className="hover:text-cham-red transition-colors">{language === 'ar' ? 'الأمان' : 'Security'}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
