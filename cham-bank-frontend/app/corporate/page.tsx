'use client';

import Link from 'next/link';
import { Building2, FileText, Shield, Globe, Briefcase, Coins } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';

const IconMap: Record<string, any> = {
    Building2, FileText, Shield, Globe, Briefcase, Coins
};

export default function CorporatePage() {
    const { t, language } = useLanguage();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            const data = await strapiAPI.getProducts('corporate', language);
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === 'ar' ? 'خدمات الشركات' : 'Corporate Services'}</h1>
                    <p className="text-xl opacity-90">{language === 'ar' ? 'شريك استراتيجي لنمو أعمالك' : 'Strategic Partner for Your Business Growth'}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, idx) => {
                            const IconComponent = IconMap[service.attributes.icon] || Briefcase;
                            return (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="w-16 h-16 bg-blue-50 text-cham-navy rounded-xl flex items-center justify-center mb-6">
                                        <IconComponent size={40} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-cham-navy mb-4">{service.attributes.title}</h2>
                                    <p className="text-gray-600 mb-6 min-h-[50px]">
                                        {service.attributes.description}
                                    </p>
                                    <ul>
                                        <Link href="#" className="text-cham-red font-bold hover:underline flex items-center rtl:flex-row-reverse">
                                            {t.read_more || (language === 'ar' ? 'المزيد من التفاصيل' : 'More Details')}
                                            <span className="mx-2">&larr;</span>
                                        </Link>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
