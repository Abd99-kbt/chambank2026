'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';
import { Scroll, CheckCircle } from 'lucide-react';

export default function ShariaPage() {
    const { t, language } = useLanguage();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await strapiAPI.getTeam('sharia', language);
            if (data?.data) {
                setMembers(data.data);
            }
            setLoading(false);
        };
        fetchData();
    }, [language]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-cham-navy py-16 text-white text-center">
                <h1 className="text-3xl font-bold">{language === 'ar' ? 'هيئة الرقابة الشرعية' : 'Sharia Supervisory Board'}</h1>
                <p className="mt-4 opacity-90">{language === 'ar' ? 'نلتزم بأعلى معايير الضوابط الشرعية في جميع معاملاتنا' : 'Committed to the highest Sharia standards in all our transactions'}</p>
            </div>
            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="w-8 h-8 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {members.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-6 bg-green-50 rounded-xl border border-green-100">
                                    <div className="bg-white p-3 rounded-full text-cham-green shadow-sm shrink-0">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-cham-navy">{member.attributes.name}</h3>
                                        <div className="text-sm text-gray-600 font-medium">{member.attributes.role}</div>
                                        <p className="text-xs text-gray-500 mt-1">{member.attributes.bio}</p>
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
