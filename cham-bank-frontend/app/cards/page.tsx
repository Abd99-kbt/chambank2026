'use client';

import Link from 'next/link';
import { CreditCard, ShoppingBag, Globe, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';

const IconMap: Record<string, any> = {
    CreditCard: CreditCard,
    ShoppingBag: ShoppingBag,
    Globe: Globe,
    ShieldCheck: ShieldCheck
};

export default function CardsPage() {
    const { t, language } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await strapiAPI.getProducts('cards', language);
            if (data?.data) {
                setProducts(data.data);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [language]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-cham-navy py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.card_title || (language === 'ar' ? 'البطاقات المصرفية' : 'Bank Cards')}</h1>
                    <p className="text-xl opacity-90">{t.card_desc || (language === 'ar' ? 'خيارك الذكي للدفع.. أينما كنت' : 'Your smart choice for payment.. wherever you are')}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, idx) => {
                            const IconComponent = IconMap[product.attributes.icon] || CreditCard;
                            const features = product.attributes.features ? product.attributes.features.split('\n') : [];

                            return (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="bg-gradient-to-r from-cham-navy to-cham-navy/90 p-6 flex justify-between items-start relative overflow-hidden h-48">
                                        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                                        <div className="relative z-10">
                                            <h3 className="text-white text-xl font-bold mb-1">{language === 'ar' ? 'بنك الشام' : 'Cham Bank'}</h3>
                                            <p className="text-white/80 text-sm">Islamic Bank</p>
                                        </div>
                                        <div className="relative z-10 text-white/90">
                                            <IconComponent size={32} />
                                        </div>
                                        <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                                            <p className="text-lg tracking-widest font-mono mb-2">**** **** **** 1234</p>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-xs text-white/70">Card Holder</p>
                                                    <p className="font-medium text-sm">YOUR NAME</p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <div className="w-8 h-5 bg-white/20 rounded-sm mb-1"></div>
                                                    <div className="w-8 h-5 bg-red-500/80 rounded-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-cham-navy mb-4">{product.attributes.title}</h2>
                                        <p className="text-gray-600 mb-6 text-sm min-h-[60px]">
                                            {product.attributes.description}
                                        </p>

                                        <div className="space-y-3 mb-8">
                                            {features.map((feature: string, fIdx: number) => (
                                                <div key={fIdx} className="flex items-center gap-3 text-sm text-gray-700">
                                                    <ShieldCheck size={16} className="text-cham-green shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link href="/contact" className="block w-full text-center px-4 py-2 bg-gray-50 text-cham-navy font-bold rounded-lg border border-gray-200 hover:bg-cham-navy hover:text-white transition-colors">
                                            {t.qa_card || (language === 'ar' ? 'طلب البطاقة' : 'Request Card')}
                                        </Link>
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
