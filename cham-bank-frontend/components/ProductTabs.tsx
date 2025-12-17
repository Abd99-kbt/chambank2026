'use client';

import { useState } from 'react';
import { CreditCard, Wallet, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductTabs() {
    const { t, dir } = useLanguage();
    const [activeTab, setActiveTab] = useState('accounts');

    const tabs = [
        { id: 'accounts', name: t.tab_accounts, icon: <Wallet size={20} /> },
        { id: 'cards', name: t.tab_cards, icon: <CreditCard size={20} /> },
        { id: 'loans', name: t.tab_loans, icon: <Home size={20} /> },
    ];

    const content = {
        accounts: {
            title: t.acc_title,
            description: t.acc_desc,
            items: [
                { title: t.acc_current, desc: t.acc_current_desc, link: '/accounts/current' },
                { title: t.acc_savings, desc: t.acc_savings_desc, link: '/accounts/savings' },
                { title: t.acc_salary, desc: t.acc_salary_desc, link: '/accounts/salary' },
            ]
        },
        cards: {
            title: t.card_title,
            description: t.card_desc,
            items: [
                { title: t.card_gold, desc: t.card_gold_desc, link: '/cards/gold' },
                { title: t.card_purchases, desc: t.card_purchases_desc, link: '/cards/installments' },
                { title: t.card_travel, desc: t.card_travel_desc, link: '/cards/travel' },
            ]
        },
        loans: {
            title: t.loan_title,
            description: t.loan_desc,
            items: [
                { title: t.loan_home, desc: t.loan_home_desc, link: '/finance/home' },
                { title: t.loan_auto, desc: t.loan_auto_desc, link: '/finance/auto' },
                { title: t.loan_personal, desc: t.loan_personal_desc, link: '/finance/personal' },
            ]
        }
    };

    const activeContent = content[activeTab as keyof typeof content];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Tabs Menu */}
                    <div className="w-full md:w-1/4">
                        <h2 className={`text-2xl font-bold text-cham-navy mb-6 ${dir === 'rtl' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'} border-cham-red`}>{t.tab_title}</h2>
                        <div className="flex flex-col space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 p-4 transition-all duration-300 rounded-lg ${dir === 'rtl' ? 'text-right' : 'text-left'} ${activeTab === tab.id
                                        ? `bg-cham-red text-white shadow-md transform ${dir === 'rtl' ? 'translate-x-[-10px]' : 'translate-x-[10px]'}`
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-cham-red'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="font-bold">{tab.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="w-full md:w-3/4">
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 min-h-[400px]">
                            <h3 className="text-2xl font-bold text-cham-navy mb-2 animate-fade-in">{activeContent.title}</h3>
                            <p className="text-gray-600 mb-8 max-w-2xl animate-fade-in">{activeContent.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {activeContent.items.map((item, idx) => (
                                    <Link key={idx} href={item.link} className="group block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-cham-red border border-transparent transition-all duration-300 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                        <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-cham-red transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                                        <div className="flex items-center text-cham-red text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <span>{t.btn_details}</span>
                                            <ArrowLeft size={16} className={`mx-2 ${dir === 'ltr' ? 'rotate-180' : ''}`} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
