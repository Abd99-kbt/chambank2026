'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Rate {
    currency: string;
    buy: number;
    sell: number;
    trend?: 'up' | 'down' | 'stable';
}

// Map currency codes to FlagCDN country codes (2 letter, lowercase)
const currencyCountryCodes: Record<string, string> = {
    USD: 'us',
    EUR: 'eu',
    GBP: 'gb',
    SAR: 'sa',
    AED: 'ae',
    TRY: 'tr',
    KWD: 'kw',
    JOD: 'jo',
    SYP: 'sy'
};

const currencyNamesAr: Record<string, string> = {
    USD: 'دولار أمريكي',
    EUR: 'يورو',
    GBP: 'جنيه إسترليني',
    SAR: 'ريال سعودي',
    AED: 'درهم إماراتي',
    TRY: 'ليرة تركية',
    KWD: 'دينار كويتي',
    JOD: 'دينار أردني',
    SYP: 'ليرة سورية'
};

const currencyNamesEn: Record<string, string> = {
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    SAR: 'Saudi Riyal',
    AED: 'UAE Dirham',
    TRY: 'Turkish Lira',
    KWD: 'Kuwaiti Dinar',
    JOD: 'Jordanian Dinar',
    SYP: 'Syrian Pound'
};

export default function ExchangeRatesTable() {
    const { t, language } = useLanguage();
    const [rates, setRates] = useState<Rate[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState('');

    const fetchRates = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/rates');
            if (!res.ok) throw new Error('Failed to fetch rates');
            const data = await res.json();
            setRates(data.rates);
            setLastUpdate(new Date().toLocaleTimeString(language === 'ar' ? 'ar-SY' : 'en-US', { hour: '2-digit', minute: '2-digit' }));
        } catch (error) {
            console.error(error);
            // Fallback data
            setRates([
                { currency: 'USD', buy: 14500, sell: 14650, trend: 'stable' },
                { currency: 'EUR', buy: 15600, sell: 15800, trend: 'up' },
                { currency: 'AED', buy: 3950, sell: 3980, trend: 'stable' },
                { currency: 'SAR', buy: 3860, sell: 3900, trend: 'stable' },
                { currency: 'TRY', buy: 420, sell: 435, trend: 'down' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, [language]);

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-cham-navy via-cham-red-dark to-cham-navy text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                            </div>
                            <h3 className="text-xl font-bold">{t.rates_title}</h3>
                        </div>
                        <p className="text-white/80 text-sm font-medium pr-1">{language === 'ar' ? 'آخر تحديث' : 'Last Updated'}: {lastUpdate}</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-right" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className={`px-6 py-4 font-bold border-b border-gray-100 ${language === 'en' ? 'text-left' : ''}`}>{language === 'ar' ? 'العملة' : 'Currency'}</th>
                            <th className={`px-6 py-4 font-bold border-b border-gray-100 ${language === 'en' ? 'text-left' : ''}`}>{t.buy}</th>
                            <th className={`px-6 py-4 font-bold border-b border-gray-100 ${language === 'en' ? 'text-left' : ''}`}>{t.sell}</th>
                            <th className="px-6 py-4 font-bold border-b border-gray-100 text-center">{language === 'ar' ? 'المؤشر' : 'Trend'}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {rates.map((rate) => (
                            <tr key={rate.currency} className="hover:bg-red-50/30 transition-colors group">
                                <td className={`px-6 py-4 ${language === 'en' ? 'text-left' : ''}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-8 h-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] rounded overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            {/* Using standard img tag for external CDN reliability */}
                                            <img
                                                src={`https://flagcdn.com/w40/${currencyCountryCodes[rate.currency] || 'xx'}.png`}
                                                srcSet={`https://flagcdn.com/w80/${currencyCountryCodes[rate.currency] || 'xx'}.png 2x`}
                                                alt={rate.currency}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">{rate.currency}</div>
                                            <div className="text-xs text-gray-500">
                                                {language === 'ar' ? currencyNamesAr[rate.currency] : currencyNamesEn[rate.currency]}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className={`px-6 py-4 font-mono font-bold text-cham-navy ${language === 'en' ? 'text-left' : ''}`}>{rate.buy.toLocaleString()}</td>
                                <td className={`px-6 py-4 font-mono text-gray-600 ${language === 'en' ? 'text-left' : ''}`}>{rate.sell.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mx-auto ${rate.trend === 'up' ? 'bg-green-100/50 text-green-600' :
                                        rate.trend === 'down' ? 'bg-red-100/50 text-red-600' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {rate.trend === 'up' && <ArrowUp size={16} />}
                                        {rate.trend === 'down' && <ArrowDown size={16} />}
                                        {rate.trend === 'stable' && <div className="w-2 h-2 bg-gray-400 rounded-full"></div>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span>{language === 'ar' ? '* الأسعار بالليرة السورية' : '* Rates in Syrian Pounds'}</span>
                <button onClick={fetchRates} className="text-cham-red hover:text-cham-red-dark font-medium transition-colors">{language === 'ar' ? 'تحديث الآن' : 'Refresh Now'}</button>
            </div>
        </div>
    );
}
