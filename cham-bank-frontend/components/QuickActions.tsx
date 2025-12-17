'use client';

import Link from 'next/link';
import { CreditCard, Landmark, MapPin, Calculator, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function QuickActions() {
    const { t } = useLanguage();

    const actions = [
        { name: t.qa_open_account, icon: <Landmark size={28} />, href: 'https://apps.chambank.com/KYC/HomeKycAccount' },
        { name: t.qa_card, icon: <CreditCard size={28} />, href: '/cards/apply' },
        { name: t.qa_branches, icon: <MapPin size={28} />, href: '/branches' },
        { name: t.qa_calc, icon: <Calculator size={28} />, href: '/calculator' },
        { name: t.qa_rates, icon: <RefreshCw size={28} />, href: '/rates' },
    ];

    return (
        <div className="container mx-auto px-4 relative z-20 -mt-16 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-wrap justify-between items-center gap-4">
                {actions.map((action, index) => {
                    const isExternal = action.href.startsWith('http');
                    const Component = isExternal ? 'a' : Link;
                    const linkProps = isExternal
                        ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                        : { href: action.href };

                    return (
                        <Component
                            key={index}
                            {...linkProps}
                            className="flex flex-col items-center gap-3 group text-center min-w-[80px] flex-1"
                        >
                            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-cham-red group-hover:bg-cham-red group-hover:text-white transition-all duration-300">
                                {action.icon}
                            </div>
                            <span className="text-sm font-bold text-gray-700 group-hover:text-cham-red transition-colors">
                                {action.name}
                            </span>
                        </Component>
                    );
                })}
            </div>
        </div>
    );
}
