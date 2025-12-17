'use client';

import { FileText, Download, BarChart, ShieldCheck, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';
import Link from 'next/link';

const IconMap: Record<string, any> = {
    FileText, BarChart, ShieldCheck, TrendingUp
};

export default function InvestorRelationsPage() {
    const { t, language } = useLanguage();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            const data = await strapiAPI.getInvestorsData(language);
            if (data?.data) {
                setItems(data.data);
            }
            setLoading(false);
        };
        fetchItems();
    }, [language]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-cham-red-dark py-16 text-white text-center">
                <h1 className="text-3xl font-bold">{language === 'ar' ? 'علاقات المستثمرين' : 'Investor Relations'}</h1>
                <p className="mt-4 opacity-90">{language === 'ar' ? 'الشفافية والمصداقية في الإفصاح المالي' : 'Transparency and Credibility in Financial Disclosure'}</p>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-cham-navy mb-8">{language === 'ar' ? 'البيانات والتقارير' : 'Data & Reports'}</h2>

                    {loading ? (
                        <div className="text-center py-10">
                            <div className="w-8 h-8 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {items.map((item, idx) => {
                                const IconComponent = IconMap[item.attributes.icon] || FileText;
                                return (
                                    <div key={idx} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-white p-3 rounded-lg text-cham-red shadow-sm">
                                                <IconComponent size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-cham-navy text-lg">{item.attributes.title}</h3>
                                                <p className="text-sm text-gray-500">{item.attributes.description}</p>
                                            </div>
                                        </div>
                                        <Link href={item.attributes.link || '#'} className="flex items-center gap-2 text-cham-red font-bold hover:bg-white hover:shadow-md px-4 py-2 rounded-lg transition-all">
                                            {item.attributes.link ? <span>&rarr;</span> : <Download size={18} />}
                                            <span className="hidden md:inline">{item.attributes.link ? (language === 'ar' ? 'عرض' : 'View') : (language === 'ar' ? 'تحميل' : 'Download')}</span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-12 p-8 bg-blue-50 rounded-xl">
                        <h3 className="text-xl font-bold text-cham-navy mb-4">{language === 'ar' ? 'معلومات السهم' : 'Stock Information'}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <p className="text-gray-500 mb-1">{language === 'ar' ? 'يعادل' : 'Symbol'}</p>
                                <p className="text-xl font-bold text-cham-red">CHB</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">{language === 'ar' ? 'بورصة الإدراج' : 'Exchange'}</p>
                                <p className="text-xl font-bold text-cham-navy">DSE</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">{language === 'ar' ? 'آخر سعر إغلاق' : 'Last Close'}</p>
                                <p className="text-xl font-bold text-cham-navy">850 SYP</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">{language === 'ar' ? 'القيمة السوقية' : 'Market Cap'}</p>
                                <p className="text-xl font-bold text-cham-navy">--</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
