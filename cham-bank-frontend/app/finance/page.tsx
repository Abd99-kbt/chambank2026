'use client';

import Link from 'next/link';
import { Home, Car, ShoppingBag, Briefcase } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';

// Map icon strings to components
const IconMap: Record<string, any> = {
    Home: Home,
    Car: Car,
    ShoppingBag: ShoppingBag,
    Briefcase: Briefcase
};

export default function FinancePage() {
    const { t, language } = useLanguage();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await strapiAPI.getProducts('finance', language);
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.loan_title}</h1>
                    <p className="text-xl opacity-90">{t.loan_desc}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {products.map((product, idx) => {
                            const IconComponent = IconMap[product.attributes.icon] || Home;
                            const features = product.attributes.features ? product.attributes.features.split('\n') : [];

                            return (
                                <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:border-cham-red/30 transition-all duration-300 group">
                                    <div className="p-8">
                                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-cham-red group-hover:bg-cham-red group-hover:text-white transition-colors duration-300">
                                            <IconComponent size={40} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-cham-navy mb-4">{product.attributes.title}</h2>
                                        <p className="text-gray-700 mb-6 leading-relaxed min-h-[80px]">
                                            {product.attributes.description}
                                        </p>
                                        <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                                            <h3 className="font-bold text-gray-900 mb-3 text-sm">{language === 'ar' ? 'أبرز المزايا:' : 'Key Features:'}</h3>
                                            <ul className="space-y-2">
                                                {features.map((feature: string, fIdx: number) => (
                                                    <li key={fIdx} className="flex items-center gap-2 text-gray-600 text-sm">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-cham-gold"></div>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Link href="/calculator" className="block w-full text-center px-6 py-3 border border-cham-red text-cham-red font-bold rounded-lg hover:bg-cham-red hover:text-white transition-all">
                                            {t.qa_calc || 'Calculate Installment'}
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
