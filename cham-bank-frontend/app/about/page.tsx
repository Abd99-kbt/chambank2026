'use client';

import Image from 'next/image';
import { ShieldCheck, Target, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Boxed Hero with Title */}
            <div className="bg-cham-red-dark py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.about_title}</h1>
                    <p className="text-xl opacity-90">{t.about_subtitle}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    {/* Introduction */}
                    <div className="mb-16 text-center max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Image src="/images/logo.svg" alt="Cham Bank" width={60} height={60} />
                        </div>
                        <h2 className="text-3xl font-bold text-cham-navy mb-6">{t.about_intro_title}</h2>
                        <p className="text-lg text-gray-700 leading-relaxed text-justify">
                            {t.about_intro_text}
                        </p>
                    </div>

                    {/* Vision & Mission Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-cham-red hover:shadow-lg transition-all duration-300 group">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 text-cham-red shadow-sm group-hover:scale-110 transition-transform">
                                <Target size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-cham-navy mb-4">{t.vision_title}</h3>
                            <p className="text-gray-600">
                                {t.vision_text}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-cham-red hover:shadow-lg transition-all duration-300 group">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 text-cham-red shadow-sm group-hover:scale-110 transition-transform">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-cham-navy mb-4">{t.mission_title}</h3>
                            <p className="text-gray-600">
                                {t.mission_text}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-cham-red hover:shadow-lg transition-all duration-300 group">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 text-cham-red shadow-sm group-hover:scale-110 transition-transform">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-cham-navy mb-4">{t.values_title}</h3>
                            <ul className="text-gray-600 space-y-2 list-disc list-inside">
                                <li>{t.value_sharia}</li>
                                <li>{t.value_transparency}</li>
                                <li>{t.value_innovation}</li>
                                <li>{t.value_responsibility}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Board of Directors Preview */}
                    <div className="bg-cham-gray rounded-2xl p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="md:w-2/3">
                                <h3 className="text-2xl font-bold text-cham-navy mb-4">{t.sharia_board_title}</h3>
                                <p className="text-gray-700 mb-6">
                                    {t.sharia_board_text}
                                </p>
                                <button className="bg-cham-red text-white px-6 py-3 rounded-lg font-bold hover:bg-cham-red-dark transition-colors">
                                    {t.sharia_board_btn}
                                </button>
                            </div>
                            <div className="md:w-1/3 flex justify-center">
                                <ShieldCheck size={120} className="text-cham-gold opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
