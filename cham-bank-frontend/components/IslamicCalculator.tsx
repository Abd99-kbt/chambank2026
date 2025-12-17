'use client';

import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function IslamicCalculator() {
    const { language } = useLanguage();
    const [amount, setAmount] = useState(10000000);
    const [duration, setDuration] = useState(12); // months
    const [downPayment, setDownPayment] = useState(20); // percentage
    const [result, setResult] = useState({ monthly: 0, total: 0, profit: 0 });

    const profitRate = 0.08; // 8% annual flat rate (simplified for demo)

    useEffect(() => {
        const principal = amount * (1 - downPayment / 100);
        const totalProfit = principal * profitRate * (duration / 12);
        const totalAmount = principal + totalProfit;
        const monthlyInstallment = totalAmount / duration;

        setResult({
            monthly: Math.round(monthlyInstallment),
            total: Math.round(totalAmount),
            profit: Math.round(totalProfit)
        });
    }, [amount, duration, downPayment]);

    const labels = {
        ar: {
            title: 'حاسبة التمويل الإسلامي',
            amount: 'قيمة التمويل المطلوب',
            currency: 'ل.س',
            duration: 'مدة التمويل (أشهر)',
            downPayment: 'الدفعة الأولى',
            monthly: 'القسط الشهري التقريبي:',
            total: 'إجمالي المبلغ المستحق:',
            disclaimer: '* هذه الأرقام تقريبية ولغايات توضيحية فقط. تطبق الشروط والأحكام.',
        },
        en: {
            title: 'Islamic Finance Calculator',
            amount: 'Financing Amount',
            currency: 'SYP',
            duration: 'Duration (Months)',
            downPayment: 'Down Payment',
            monthly: 'Approximate Monthly Installment:',
            total: 'Total Amount Payable:',
            disclaimer: '* These figures are approximate and for illustrative purposes only. Terms and conditions apply.',
        }
    };

    const t = language === 'ar' ? labels.ar : labels.en;

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full">
            <div className="bg-cham-red-dark text-white p-4 flex items-center gap-3">
                <Calculator className="text-cham-gold" />
                <h3 className="text-lg font-bold">{t.title}</h3>
            </div>

            <div className="p-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.amount} ({t.currency})</label>
                    <input
                        type="range"
                        min="1000000"
                        max="500000000"
                        step="1000000"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cham-red"
                    />
                    <div className="mt-2 font-mono text-lg text-cham-red-dark font-bold text-center">
                        {amount.toLocaleString()} {t.currency}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.duration}</label>
                    <div className="flex justify-between gap-2">
                        {[12, 24, 36, 48, 60].map(m => (
                            <button
                                key={m}
                                onClick={() => setDuration(m)}
                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${duration === m ? 'bg-cham-red text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.downPayment} ({downPayment}%)</label>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="5"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cham-gold"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">{t.monthly}</span>
                        <span className="font-bold text-xl text-cham-red-dark font-mono">{result.monthly.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-px bg-gray-200"></div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{t.total}</span>
                        <span className="font-bold text-gray-800 font-mono">{result.total.toLocaleString()}</span>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-400">
                    {t.disclaimer}
                </p>
            </div>
        </div>
    );
}
