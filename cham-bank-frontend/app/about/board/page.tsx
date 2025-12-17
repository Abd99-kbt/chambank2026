'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';
import { Users } from 'lucide-react';

export default function BoardPage() {
    const { t, language } = useLanguage();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await strapiAPI.getTeam('board', language);
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
                <h1 className="text-3xl font-bold">{language === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}</h1>
            </div>
            <div className="container mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="w-8 h-8 border-4 border-cham-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {members.map((member, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all border border-gray-100">
                                    <div className="w-16 h-16 bg-cham-navy/10 rounded-full flex items-center justify-center text-cham-navy shrink-0">
                                        <span className="text-xl font-bold">{member.attributes.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-cham-navy">{member.attributes.name}</h3>
                                        <p className="text-sm text-cham-red font-medium">{member.attributes.role}</p>
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
