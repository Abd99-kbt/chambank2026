'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';

export default function NewsPage() {
    const { t, language } = useLanguage();
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const data = await strapiAPI.getNews(10, language);
            if (data?.data) {
                setNewsItems(data.data);
            }
            setLoading(false);
        };
        fetchNews();
    }, [language]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{language === 'ar' ? 'الأخبار والفعاليات' : 'News & Activities'}</h1>
                    <p className="text-xl opacity-90">{language === 'ar' ? 'تابع آخر مستجداتنا وإعلاناتنا الرسمية' : 'Follow our latest updates and official announcements'}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsItems.map((item) => {
                                const imageUrl = item.attributes.image?.data?.attributes?.url || '/images/news1.jpg';
                                return (
                                    <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                                            <Image
                                                src={imageUrl}
                                                alt={item.attributes.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <Calendar size={16} className={`text-cham-red ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                                                {item.attributes.date}
                                            </div>
                                            <h2 className="text-xl font-bold text-cham-navy mb-3 group-hover:text-cham-red transition-colors line-clamp-2">
                                                {item.attributes.title}
                                            </h2>
                                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                                                {item.attributes.description}
                                            </p>
                                            <Link href={`#`} className="inline-flex items-center text-cham-red font-bold hover:underline mt-auto">
                                                <span>{t.read_more || (language === 'ar' ? 'اقرأ المزيد' : 'Read More')}</span>
                                                <ArrowLeft size={16} className={`mx-2 ${language === 'en' ? 'rotate-180' : ''}`} />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination (Visual Only) */}
                        <div className="flex justify-center mt-12 gap-2">
                            <button className="w-10 h-10 rounded-lg bg-cham-red text-white font-bold flex items-center justify-center shadow-md">1</button>
                            <button className="w-10 h-10 rounded-lg bg-white text-gray-600 hover:bg-gray-100 font-bold flex items-center justify-center border border-gray-200">2</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
