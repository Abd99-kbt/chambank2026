'use client';

import Link from 'next/link';
import { Smartphone, Monitor, CreditCard, MessageSquare, Briefcase } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';

// Map icon strings to components
const IconMap: Record<string, any> = {
    Smartphone: Smartphone,
    Monitor: Monitor,
    MessageSquare: MessageSquare,
    CreditCard: CreditCard,
    Briefcase: Briefcase
};

export default function ServicesPage() {
    const { t, language } = useLanguage();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const data = await strapiAPI.getServices(language);
            if (data?.data) {
                setServices(data.data);
            }
            setLoading(false);
        };
        fetchServices();
    }, [language]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.hero_btn_services || (language === 'ar' ? 'الخدمات الإلكترونية' : 'E-Services')}</h1>
                    <p className="text-xl opacity-90">{language === 'ar' ? 'تجربة مصرفية رقمية متكاملة.. أينما كنت' : 'Integrated digital banking experience.. wherever you are'}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, idx) => {
                            const IconComponent = IconMap[service.attributes.icon] || Monitor;
                            return (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group flex items-start gap-6 border border-gray-100">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-cham-navy group-hover:bg-cham-navy group-hover:text-white transition-colors duration-300 shrink-0">
                                        <IconComponent size={40} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-cham-red-dark mb-3">{service.attributes.title}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {service.attributes.description}
                                        </p>
                                        {(() => {
                                            const slug = service.attributes.slug;
                                            let href = '#';
                                            let isExternal = false;

                                            if (slug === 'mobile-banking') {
                                                href = 'https://ebanking.chambank.com/MobileApp';
                                                isExternal = true;
                                            } else if (slug === 'online-banking') {
                                                href = 'https://ebanking.chambank.com';
                                                isExternal = true;
                                            } else {
                                                href = `/services/${slug}`;
                                            }

                                            const linkContent = (
                                                <>
                                                    <span>{t.more_details}</span>
                                                    <svg className={`w-4 h-4 ${language === 'ar' ? 'rotate-0' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </>
                                            );

                                            return isExternal ? (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cham-navy font-bold hover:text-cham-red transition-colors flex items-center gap-2"
                                                >
                                                    {linkContent}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={href}
                                                    className="text-cham-navy font-bold hover:text-cham-red transition-colors flex items-center gap-2"
                                                >
                                                    {linkContent}
                                                </Link>
                                            );
                                        })()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
