'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';
import { Users } from 'lucide-react';

export default function FoundersPage() {
    const { t, language } = useLanguage();
    const [founders, setFounders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await strapiAPI.getTeam('founders', language);
            if (data?.data) {
                setFounders(data.data);
            }
            setLoading(false);
        };
        fetchData();
    }, [language]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-cham-navy py-16 text-white text-center">
                <h1 className="text-3xl font-bold">{language === 'ar' ? 'المؤسسون والشركاء' : 'Founders & Partners'}</h1>
            </div>
            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="w-8 h-8 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {founders.map((founder, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="bg-white p-3 rounded-full text-cham-navy shadow-sm shrink-0">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-cham-navy">{founder.attributes.name}</h3>
                                        <div className="text-sm text-cham-red font-bold mb-1">{founder.attributes.role}</div>
                                        <p className="text-gray-600 text-sm">{founder.attributes.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
